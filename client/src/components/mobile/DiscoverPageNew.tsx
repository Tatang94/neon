import { useState } from 'react';
import { Search, TrendingUp, Hash, Music, Users, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Video, User } from '../../../../shared/schema';
import VideoThumbnail from '@/components/ui/VideoThumbnail';
import AvatarPlaceholder from '@/components/ui/AvatarPlaceholder';

const DiscoverPageNew = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'trending' | 'users' | 'hashtags' | 'sounds'>('trending');

  // Fetch data from API
  const { data: videos = [] } = useQuery<Video[]>({
    queryKey: ['/api/videos'],
  });

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ['/api/users'],
  });

  // Filter data based on search
  const filteredVideos = videos.filter(video => 
    video.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const trendingHashtags = [
    { tag: '#neonvibes', posts: 1200000, trending: true },
    { tag: '#creative', posts: 890000, trending: true },
    { tag: '#dance', posts: 2300000, trending: false },
    { tag: '#tech', posts: 450000, trending: true },
    { tag: '#viral', posts: 3400000, trending: false },
  ];

  const trendingSounds = [
    { name: 'Electric Dreams - Synthwave Mix', videos: 25000, trending: true },
    { name: 'Upbeat Dance Mix - DJ Flow', videos: 18000, trending: true },
    { name: 'Tech Vibes - Electronic', videos: 12000, trending: false },
    { name: 'Neon Beats - Future Sound', videos: 8900, trending: true },
  ];

  const renderTrendingTab = () => (
    <div className="space-y-6">
      {/* Trending Videos Grid */}
      <div className="grid grid-cols-3 gap-2">
        {filteredVideos.slice(0, 9).map((video) => (
          <div key={video.id} className="relative aspect-[9/16] rounded-lg overflow-hidden">
            <VideoThumbnail className="w-full h-full" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1">
              <Heart className="w-4 h-4 text-white" />
              <span className="text-white text-xs">{formatNumber(video.likes)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div className="space-y-4">
      {filteredUsers.map((user) => (
        <div key={user.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-3">
            <AvatarPlaceholder 
              username={user.username}
              size="md"
            />
            <div>
              <h3 className="text-white font-semibold">{user.displayName}</h3>
              <p className="text-gray-400 text-sm">{user.username}</p>
              <p className="text-gray-400 text-xs">{formatNumber(user.followers)} followers</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
            Follow
          </Button>
        </div>
      ))}
    </div>
  );

  const renderHashtagsTab = () => (
    <div className="space-y-4">
      {trendingHashtags.map((hashtag, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Hash className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">{hashtag.tag}</h3>
              <p className="text-gray-400 text-sm">{formatNumber(hashtag.posts)} posts</p>
            </div>
          </div>
          {hashtag.trending && (
            <div className="flex items-center gap-1 text-yellow-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs">Trending</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderSoundsTab = () => (
    <div className="space-y-4">
      {trendingSounds.map((sound, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{sound.name}</h3>
              <p className="text-gray-400 text-sm">{formatNumber(sound.videos)} videos</p>
            </div>
          </div>
          {sound.trending && (
            <div className="flex items-center gap-1 text-yellow-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs">Trending</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'trending':
        return renderTrendingTab();
      case 'users':
        return renderUsersTab();
      case 'hashtags':
        return renderHashtagsTab();
      case 'sounds':
        return renderSoundsTab();
      default:
        return renderTrendingTab();
    }
  };

  return (
    <div className="h-full bg-black text-white p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Discover</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search users, sounds, hashtags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={activeTab === 'trending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('trending')}
            className={activeTab === 'trending' ? 'gradient-primary text-white' : 'border-white/20 text-white hover:bg-white/10'}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </Button>
          <Button
            variant={activeTab === 'users' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('users')}
            className={activeTab === 'users' ? 'gradient-primary text-white' : 'border-white/20 text-white hover:bg-white/10'}
          >
            <Users className="w-4 h-4 mr-2" />
            Users
          </Button>
          <Button
            variant={activeTab === 'hashtags' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('hashtags')}
            className={activeTab === 'hashtags' ? 'gradient-primary text-white' : 'border-white/20 text-white hover:bg-white/10'}
          >
            <Hash className="w-4 h-4 mr-2" />
            Tags
          </Button>
          <Button
            variant={activeTab === 'sounds' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('sounds')}
            className={activeTab === 'sounds' ? 'gradient-primary text-white' : 'border-white/20 text-white hover:bg-white/10'}
          >
            <Music className="w-4 h-4 mr-2" />
            Sounds
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default DiscoverPageNew;