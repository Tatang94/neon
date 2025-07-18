import { useState } from 'react';
import { Search, TrendingUp, Hash, Music, Flame } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import videoPlaceholder from '@/assets/video-placeholder.jpg';

const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('trending');

  const categories = [
    { id: 'trending', icon: TrendingUp, label: 'Trending' },
    { id: 'hashtags', icon: Hash, label: 'Hashtags' },
    { id: 'music', icon: Music, label: 'Music' },
    { id: 'viral', icon: Flame, label: 'Viral' },
  ];

  const trendingTags = [
    '#neonvibes', '#dance', '#creative', '#tech', '#art', '#music',
    '#fashion', '#comedy', '#food', '#travel', '#fitness', '#diy'
  ];

  const videos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    thumbnail: videoPlaceholder,
    views: Math.floor(Math.random() * 1000000) + 10000,
    likes: Math.floor(Math.random() * 50000) + 1000,
  }));

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-10 p-4">
        <h1 className="text-2xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
          Discover
        </h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search videos, users, sounds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-surface border-border rounded-full"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap ${
                  isActive 
                    ? 'gradient-primary text-white' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Trending Tags */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-foreground">Trending Hashtags</h2>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-surface hover:bg-card-hover text-foreground border border-border hover:border-primary/50 transition-smooth cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 gap-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-smooth group cursor-pointer"
            >
              <div className="aspect-[3/4] relative">
                <img 
                  src={video.thumbnail} 
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                
                {/* Stats */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="flex justify-between items-end text-white text-xs">
                    <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                      {formatNumber(video.views)} views
                    </span>
                    <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                      ❤️ {formatNumber(video.likes)}
                    </span>
                  </div>
                </div>

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 text-center">
          <Button variant="outline" className="border-border hover:border-primary/50">
            Load More Videos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;