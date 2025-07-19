import { useState } from 'react';
import { Settings, Share, Heart, MessageCircle, MoreHorizontal, Grid, List, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { apiRequest, CURRENT_USER_ID } from '@/lib/queryClient';
import { User, Video } from '../../../../shared/schema';
import VideoThumbnail from '@/components/ui/VideoThumbnail';
import AvatarPlaceholder from '@/components/ui/AvatarPlaceholder';

const ProfilePageNew = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'videos' | 'liked' | 'saved'>('videos');

  // Fetch current user data
  const { data: currentUser } = useQuery<User>({
    queryKey: ['/api/users', CURRENT_USER_ID],
    queryFn: () => apiRequest<User>(`/api/users/${CURRENT_USER_ID}`),
  });

  // Fetch user's videos
  const { data: allVideos = [] } = useQuery<Video[]>({
    queryKey: ['/api/videos'],
  });

  // Filter videos by current user
  const userVideos = allVideos.filter(video => 
    video.username === (currentUser?.username || '@creativevibe')
  );

  // Mock liked and saved videos (in real app, these would come from separate endpoints)
  const likedVideos = allVideos.filter(video => video.isLiked);
  const savedVideos = allVideos.slice(0, 2); // Mock saved videos

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getDisplayVideos = () => {
    switch (activeTab) {
      case 'videos':
        return userVideos;
      case 'liked':
        return likedVideos;
      case 'saved':
        return savedVideos;
      default:
        return userVideos;
    }
  };

  const displayVideos = getDisplayVideos();

  const renderVideoGrid = () => (
    <div className="grid grid-cols-3 gap-1">
      {displayVideos.map((video) => (
        <div key={video.id} className="relative aspect-[9/16] rounded-lg overflow-hidden">
          <VideoThumbnail className="w-full h-full" />
          <div className="absolute bottom-2 left-2 flex items-center gap-1">
            <Heart className="w-4 h-4 text-white" />
            <span className="text-white text-xs">{formatNumber(video.likes)}</span>
          </div>
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            <MessageCircle className="w-4 h-4 text-white" />
            <span className="text-white text-xs">{formatNumber(video.comments)}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderVideoList = () => (
    <div className="space-y-4">
      {displayVideos.map((video) => (
        <div key={video.id} className="flex gap-3 p-3 bg-gray-800/30 rounded-lg">
          <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <VideoThumbnail className="w-full h-full" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm mb-2 line-clamp-2">{video.caption}</p>
            <div className="flex items-center gap-4 text-gray-400 text-xs">
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>{formatNumber(video.likes)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                <span>{formatNumber(video.comments)}</span>
              </div>
              <span>{formatNumber(video.views)} views</span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </Button>
        </div>
      ))}
    </div>
  );

  if (!currentUser) {
    return (
      <div className="h-full bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="h-full bg-black text-white overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">{currentUser.username}</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Share className="w-5 h-5 text-white" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <AvatarPlaceholder 
            username={currentUser.username}
            size="lg"
            className="w-20 h-20 border-2 border-purple-500"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">{currentUser.displayName}</h2>
            <div className="flex gap-6 text-center">
              <div>
                <div className="font-bold text-lg">{formatNumber(currentUser.followers)}</div>
                <div className="text-gray-400 text-sm">Followers</div>
              </div>
              <div>
                <div className="font-bold text-lg">{formatNumber(currentUser.following)}</div>
                <div className="text-gray-400 text-sm">Following</div>
              </div>
              <div>
                <div className="font-bold text-lg">{formatNumber(currentUser.totalLikes)}</div>
                <div className="text-gray-400 text-sm">Likes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        {currentUser.bio && (
          <div className="mb-4">
            <p className="text-white leading-relaxed">{currentUser.bio}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button className="flex-1 gradient-primary text-white font-semibold">
            Edit Profile
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Share Profile
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="border-t border-gray-800">
        <div className="flex">
          <Button
            variant="ghost"
            className={`flex-1 py-4 ${activeTab === 'videos' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('videos')}
          >
            <Grid className="w-5 h-5 mr-2" />
            Videos ({userVideos.length})
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 py-4 ${activeTab === 'liked' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('liked')}
          >
            <Heart className="w-5 h-5 mr-2" />
            Liked ({likedVideos.length})
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 py-4 ${activeTab === 'saved' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('saved')}
          >
            <Bookmark className="w-5 h-5 mr-2" />
            Saved ({savedVideos.length})
          </Button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-end px-4 py-2 border-b border-gray-800">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'text-white' : 'text-gray-400'}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'text-white' : 'text-gray-400'}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {displayVideos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                {activeTab === 'videos' && <Grid className="w-8 h-8" />}
                {activeTab === 'liked' && <Heart className="w-8 h-8" />}
                {activeTab === 'saved' && <Bookmark className="w-8 h-8" />}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {activeTab === 'videos' && 'No videos yet'}
                {activeTab === 'liked' && 'No liked videos'}
                {activeTab === 'saved' && 'No saved videos'}
              </h3>
              <p className="text-sm text-center">
                {activeTab === 'videos' && 'Start creating videos to see them here'}
                {activeTab === 'liked' && 'Videos you like will appear here'}
                {activeTab === 'saved' && 'Videos you save will appear here'}
              </p>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? renderVideoGrid() : renderVideoList()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePageNew;