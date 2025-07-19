import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, Bookmark, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient, CURRENT_USER_ID } from '@/lib/queryClient';
import { Video } from '../../../../shared/schema';
import { useToast } from '@/hooks/use-toast';
import VideoThumbnail from '@/components/ui/VideoThumbnail';
import AvatarPlaceholder from '@/components/ui/AvatarPlaceholder';

const VideoFeedNew = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const { toast } = useToast();

  // Fetch videos from API
  const { data: videos = [], isLoading, error } = useQuery<Video[]>({
    queryKey: ['/api/videos'],
    queryFn: () => apiRequest<Video[]>('/api/videos'),
  });

  // Like video mutation
  const likeMutation = useMutation({
    mutationFn: async ({ videoId, isLiked }: { videoId: string; isLiked: boolean }) => {
      const endpoint = isLiked ? `/api/videos/${videoId}/unlike` : `/api/videos/${videoId}/like`;
      return apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify({ userId: CURRENT_USER_ID }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive",
      });
    },
  });

  // Follow user mutation
  const followMutation = useMutation({
    mutationFn: async ({ userId, isFollowing }: { userId: string; isFollowing: boolean }) => {
      const endpoint = isFollowing ? `/api/users/${userId}/unfollow` : `/api/users/${userId}/follow`;
      return apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify({ followerId: CURRENT_USER_ID }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
      toast({
        title: "Success",
        description: "Follow status updated",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update follow status",
        variant: "destructive",
      });
    },
  });

  // Share functionality
  const shareMutation = useMutation({
    mutationFn: async (videoId: string) => {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this video!',
          url: `${window.location.origin}/video/${videoId}`,
        });
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}/video/${videoId}`);
        toast({
          title: "Link copied!",
          description: "Video link copied to clipboard",
        });
      }
      return { success: true };
    },
  });

  // Increment view count when video changes
  useEffect(() => {
    if (videos.length > 0) {
      const video = videos[currentVideo];
      if (video) {
        apiRequest(`/api/videos/${video.id}/view`, { method: 'POST' })
          .catch(() => {}); // Silent fail for view tracking
      }
    }
  }, [currentVideo, videos]);

  const handleLike = (videoId: string, isLiked: boolean) => {
    likeMutation.mutate({ videoId, isLiked });
  };

  const handleFollow = (username: string, isFollowing: boolean) => {
    // Find user ID from username (in real app, this would be handled differently)
    const userId = username === '@creativevibe' ? '1' : username === '@dancequeen' ? '2' : '3';
    followMutation.mutate({ userId, isFollowing });
  };

  const handleShare = (videoId: string) => {
    shareMutation.mutate(videoId);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe && currentVideo < videos.length - 1) {
      setCurrentVideo(currentVideo + 1);
    }
    if (isDownSwipe && currentVideo > 0) {
      setCurrentVideo(currentVideo - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading videos...</div>
      </div>
    );
  }

  if (error || videos.length === 0) {
    return (
      <div className="h-full bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-lg mb-2">No videos available</p>
          <p className="text-sm text-white/60">Check your connection and try again</p>
        </div>
      </div>
    );
  }

  const video = videos[currentVideo];

  return (
    <div 
      className="relative h-full overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video Background */}
      <VideoThumbnail className="absolute inset-0" showPlayButton={false} />
      
      {/* Video Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Video Actions (Right Side) */}
      <div className="absolute right-4 bottom-40 flex flex-col items-center gap-6">
        {/* Profile Picture */}
        <div className="relative">
          <AvatarPlaceholder 
            username={video.username}
            size="lg"
            className="border-3 border-white"
          />
          {!video.isFollowing && (
            <Button
              size="sm"
              onClick={() => handleFollow(video.username, video.isFollowing)}
              disabled={followMutation.isPending}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-7 h-7 rounded-full gradient-primary text-white text-sm font-bold hover:scale-110 transition-transform"
            >
              +
            </Button>
          )}
        </div>

        {/* Like Button */}
        <div className="flex flex-col items-center">
          <button 
            className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-all hover:scale-110"
            onClick={() => handleLike(video.id, video.isLiked)}
            disabled={likeMutation.isPending}
          >
            <Heart 
              className={`w-7 h-7 ${video.isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} 
            />
          </button>
          <span className="text-white text-sm font-medium mt-2">
            {formatNumber(video.likes)}
          </span>
        </div>

        {/* Comment Button */}
        <div className="flex flex-col items-center">
          <button className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-all hover:scale-110">
            <MessageCircle className="w-7 h-7 text-white" />
          </button>
          <span className="text-white text-sm font-medium mt-2">
            {formatNumber(video.comments)}
          </span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center">
          <button 
            className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-all hover:scale-110"
            onClick={() => handleShare(video.id)}
            disabled={shareMutation.isPending}
          >
            <Share className="w-7 h-7 text-white" />
          </button>
          <span className="text-white text-sm font-medium mt-2">
            {formatNumber(video.shares)}
          </span>
        </div>

        {/* Save Button */}
        <button className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-all hover:scale-110">
          <Bookmark className="w-7 h-7 text-white" />
        </button>
      </div>

      {/* Video Info (Bottom Left) */}
      <div className="absolute bottom-32 left-4 right-20 z-10">
        <div className="text-white">
          <h3 className="font-bold text-xl mb-3">{video.username}</h3>
          <p className="text-base mb-4 leading-relaxed">{video.caption}</p>
          
          {/* Music Info */}
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
            <Music className="w-5 h-5" />
            <span className="text-sm truncate max-w-56">{video.music}</span>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex flex-col gap-3">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideo(index)}
            className={`w-3 h-8 rounded-full transition-all hover:scale-110 ${
              index === currentVideo ? 'bg-white shadow-lg' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Swipe to navigate hint */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-white text-sm">Swipe ↑↓ untuk video lain</span>
        </div>
      </div>
    </div>
  );
};

export default VideoFeedNew;