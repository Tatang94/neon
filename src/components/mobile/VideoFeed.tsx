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

  const video = videos[currentVideo];

  return (
    <div className="video-card">
      {/* Video Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${videoPlaceholder})` }}
      />
      
      {/* Video Overlay Gradient */}
      <div className="absolute inset-0 video-overlay-gradient" />

      {/* Video Actions (Right Side) */}
      <div className="video-actions">
        {/* Profile Picture */}
        <div className="relative">
          <img 
            src={avatarPlaceholder} 
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          {!video.isFollowing && (
            <Button
              size="sm"
              onClick={() => handleFollow(video.id)}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full gradient-primary text-white text-xs font-bold"
            >
              +
            </Button>
          )}
        </div>

        {/* Like Button */}
        <button 
          className="action-btn"
          onClick={() => handleLike(video.id)}
        >
          <Heart 
            className={`w-6 h-6 ${video.isLiked ? 'text-primary fill-primary' : 'text-white'}`} 
          />
        </button>
        <span className="text-white text-xs font-medium text-center">
          {formatNumber(video.likes)}
        </span>

        {/* Comment Button */}
        <button className="action-btn">
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
        <span className="text-white text-xs font-medium text-center">
          {formatNumber(video.comments)}
        </span>

        {/* Share Button */}
        <button className="action-btn">
          <Share className="w-6 h-6 text-white" />
        </button>
        <span className="text-white text-xs font-medium text-center">
          {formatNumber(video.shares)}
        </span>

        {/* Save Button */}
        <button className="action-btn">
          <Bookmark className="w-6 h-6 text-white" />
        </button>

        {/* More Options */}
        <button className="action-btn">
          <MoreHorizontal className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Video Info (Bottom Left) */}
      <div className="absolute bottom-20 left-4 right-20 z-10">
        <div className="text-white">
          <h3 className="font-bold text-lg mb-2">{video.username}</h3>
          <p className="text-sm mb-4 leading-relaxed">{video.caption}</p>
          
          {/* Music Info */}
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-2 w-fit">
            <Music className="w-4 h-4" />
            <span className="text-xs truncate max-w-48">{video.music}</span>
          </div>
        </div>
      </div>

      {/* Swipe Indicators */}
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 flex flex-col gap-2">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-8 rounded-full transition-smooth ${
              index === currentVideo ? 'bg-primary' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;