import { useState } from 'react';
import { MessageCircle, Heart, UserPlus, Bell, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import avatarPlaceholder from '@/assets/avatar-placeholder.jpg';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: string;
  avatar: string;
  content: string;
  time: string;
  isNew: boolean;
}

const InboxPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', label: 'All', icon: Bell },
    { id: 'likes', label: 'Likes', icon: Heart },
    { id: 'comments', label: 'Comments', icon: MessageCircle },
    { id: 'follows', label: 'Follows', icon: UserPlus },
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'like',
      user: '@creativevibe',
      avatar: avatarPlaceholder,
      content: 'liked your video "Neon Dance Moves"',
      time: '2m ago',
      isNew: true,
    },
    {
      id: '2',
      type: 'comment',
      user: '@dancequeen',
      avatar: avatarPlaceholder,
      content: 'commented: "This is absolutely amazing! 🔥"',
      time: '5m ago',
      isNew: true,
    },
    {
      id: '3',
      type: 'follow',
      user: '@techreviewer',
      avatar: avatarPlaceholder,
      content: 'started following you',
      time: '10m ago',
      isNew: true,
    },
    {
      id: '4',
      type: 'like',
      user: '@artlover',
      avatar: avatarPlaceholder,
      content: 'liked your video "Digital Art Process"',
      time: '15m ago',
      isNew: false,
    },
    {
      id: '5',
      type: 'mention',
      user: '@musicmaker',
      avatar: avatarPlaceholder,
      content: 'mentioned you in a comment',
      time: '30m ago',
      isNew: false,
    },
    {
      id: '6',
      type: 'comment',
      user: '@viewer123',
      avatar: avatarPlaceholder,
      content: 'commented: "Tutorial please! 🙏"',
      time: '1h ago',
      isNew: false,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-primary" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-secondary" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-accent" />;
      case 'mention':
        return <Bell className="w-4 h-4 text-warning" />;
      default:
        return <Bell className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'likes') return notification.type === 'like';
    if (activeTab === 'comments') return notification.type === 'comment';
    if (activeTab === 'follows') return notification.type === 'follow';
    return true;
  });

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            Inbox
          </h1>
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-surface border-border rounded-full"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap ${
                  isActive 
                    ? 'gradient-primary text-white' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Bell className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No notifications yet</h3>
            <p className="text-muted-foreground">When people interact with your content, you'll see it here</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-smooth hover:bg-card-hover cursor-pointer ${
                  notification.isNew 
                    ? 'bg-card border-primary/20' 
                    : 'bg-surface border-border'
                }`}
              >
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={notification.avatar}
                    alt={notification.user}
                    className="w-10 h-10 rounded-full"
                  />
                  {/* Icon Badge */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-surface border border-background rounded-full flex items-center justify-center">
                    {getIcon(notification.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{notification.user}</span>
                    {notification.isNew && (
                      <Badge variant="secondary" className="bg-primary/20 text-primary text-xs px-1.5 py-0.5">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{notification.content}</p>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>

                {/* Action Button */}
                {notification.type === 'follow' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-border hover:border-primary/50 text-xs"
                  >
                    Follow Back
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;