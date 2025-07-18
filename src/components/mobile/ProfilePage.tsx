import { useState } from 'react';
import { Settings, MoreHorizontal, Heart, Lock, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import avatarPlaceholder from '@/assets/avatar-placeholder.jpg';
import videoPlaceholder from '@/assets/video-placeholder.jpg';

const ProfilePage = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const profileData = {
    username: '@creativevibe',
    displayName: 'Creative Vibe ✨',
    bio: 'Digital artist & content creator 🎨\nCreating magic with neon vibes ✨\nCollab: creativevibe@email.com',
    followers: 125000,
    following: 890,
    likes: 2500000,
    verified: true,
  };

  const userVideos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    thumbnail: videoPlaceholder,
    views: Math.floor(Math.random() * 1000000) + 10000,
    likes: Math.floor(Math.random() * 50000) + 1000,
    isLiked: Math.random() > 0.7,
  }));

  const likedVideos = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    thumbnail: videoPlaceholder,
    views: Math.floor(Math.random() * 1000000) + 10000,
    likes: Math.floor(Math.random() * 50000) + 1000,
    creator: `@user${i + 1}`,
  }));

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">{profileData.username}</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6">
        {/* Avatar and Stats */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={avatarPlaceholder}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-primary/20"
            />
            {profileData.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-bold text-foreground">{profileData.displayName}</h2>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="stat-item">
                <div className="stat-number">{formatNumber(profileData.followers)}</div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{formatNumber(profileData.following)}</div>
                <div className="stat-label">Following</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{formatNumber(profileData.likes)}</div>
                <div className="stat-label">Likes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {profileData.bio}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button
            className={`flex-1 ${
              isFollowing 
                ? 'bg-surface text-foreground border border-border hover:bg-card-hover' 
                : 'gradient-primary text-white'
            }`}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
          <Button variant="outline" className="flex-1 border-border hover:border-primary/50">
            Message
          </Button>
          <Button variant="outline" size="sm" className="border-border hover:border-primary/50">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="videos" className="flex-1">
        <TabsList className="w-full bg-surface rounded-none border-b border-border h-12">
          <TabsTrigger 
            value="videos" 
            className="flex-1 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            <Grid className="w-4 h-4 mr-2" />
            Videos
          </TabsTrigger>
          <TabsTrigger 
            value="liked" 
            className="flex-1 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            <Heart className="w-4 h-4 mr-2" />
            Liked
          </TabsTrigger>
          <TabsTrigger 
            value="private" 
            className="flex-1 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            <Lock className="w-4 h-4 mr-2" />
            Private
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="p-4">
          <div className="grid grid-cols-3 gap-1">
            {userVideos.map((video) => (
              <div
                key={video.id}
                className="relative aspect-[3/4] bg-card rounded-lg overflow-hidden border border-border group cursor-pointer"
              >
                <img 
                  src={video.thumbnail} 
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                
                {/* Stats */}
                <div className="absolute bottom-1 left-1 right-1">
                  <div className="flex justify-between items-end text-white text-xs">
                    <span className="bg-black/50 backdrop-blur-sm px-1 py-0.5 rounded">
                      {formatNumber(video.views)}
                    </span>
                    {video.isLiked && (
                      <Heart className="w-3 h-3 text-primary fill-primary" />
                    )}
                  </div>
                </div>

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-0 h-0 border-l-3 border-l-white border-y-2 border-y-transparent ml-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="liked" className="p-4">
          <div className="grid grid-cols-3 gap-1">
            {likedVideos.map((video) => (
              <div
                key={video.id}
                className="relative aspect-[3/4] bg-card rounded-lg overflow-hidden border border-border group cursor-pointer"
              >
                <img 
                  src={video.thumbnail} 
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                
                {/* Creator Badge */}
                <div className="absolute top-1 left-1">
                  <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm text-white text-xs">
                    {video.creator}
                  </Badge>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                
                {/* Stats */}
                <div className="absolute bottom-1 right-1">
                  <Heart className="w-4 h-4 text-primary fill-primary" />
                </div>

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-0 h-0 border-l-3 border-l-white border-y-2 border-y-transparent ml-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="private" className="p-8">
          <div className="text-center">
            <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Private Videos</h3>
            <p className="text-muted-foreground">Videos you've set to private will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;