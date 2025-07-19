import { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import videoPlaceholder from '@/assets/video-placeholder.jpg';
import avatarPlaceholder from '@/assets/avatar-placeholder.jpg';

interface VideoData {
  id: string;
  username: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isFollowing: boolean;
  music: string;
}

const sampleVideos: VideoData[] = [
  {
    id: '1',
    username: '@creativevibe',
    caption: 'Creating magic with neon lights ✨ #neonvibes #creative #art',
    likes: 12500,
    comments: 342,
    shares: 1200,
    isLiked: false,
    isFollowing: false,
    music: 'Electric Dreams - Synthwave Mix'
  },
  {
    id: '2',
    username: '@dancequeen',
    caption: 'New dance trend! Who else is trying this? 💃 #dance #trending',
    likes: 8900,
    comments: 156,
    shares: 890,
    isLiked: true,
    isFollowing: true,
    music: 'Beat Drop - DJ Neon'
  },
  {
    id: '3',
    username: '@techreviewer',
    caption: 'Mind-blowing gadget review! Link in bio 🔥 #tech #gadgets',
    likes: 15600,
    comments: 892,
    shares: 2100,
    isLiked: false,
    isFollowing: false,
    music: 'Futuristic Beats - Electronic'
  }
];

const VideoFeed = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videos, setVideos] = useState(sampleVideos);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleLike = (videoId: string) => {
    setVideos(videos.map(video => 
      video.id === videoId 
        ? { 
            ...video, 
            isLiked: !video.isLiked,
            likes: video.isLiked ? video.likes - 1 : video.likes + 1
          }
        : video
    ));
  };

  const handleFollow = (videoId: string) => {
    setVideos(videos.map(video => 
      video.id === videoId 
        ? { ...video, isFollowing: !video.isFollowing }
        : video
    ));
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

  const video = videos[currentVideo];

  return (
    <div 
      className="relative h-full overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${videoPlaceholder})` }}
      />
      
      {/* Video Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Video Actions (Right Side) */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6">
        {/* Profile Picture */}
        <div className="relative">
          <img 
            src={avatarPlaceholder} 
            alt="Profile"
            className="w-14 h-14 rounded-full border-3 border-white"
          />
          {!video.isFollowing && (
            <Button
              size="sm"
              onClick={() => handleFollow(video.id)}
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
            onClick={() => handleLike(video.id)}
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
          <button className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-all hover:scale-110">
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
      <div className="absolute bottom-24 left-4 right-20 z-10">
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

export default VideoFeed;