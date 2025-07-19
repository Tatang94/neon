import { useState } from 'react';
import { Heart, MessageCircle, Users, Bell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient, CURRENT_USER_ID } from '@/lib/queryClient';
import { Notification } from '../../../../shared/schema';
import { useToast } from '@/hooks/use-toast';
import avatarPlaceholder from '@/assets/avatar-placeholder.jpg';

const InboxPageNew = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'likes' | 'comments' | 'followers'>('all');
  const { toast } = useToast();

  // Fetch notifications
  const { data: notifications = [], isLoading } = useQuery<Notification[]>({
    queryKey: ['/api/notifications', CURRENT_USER_ID],
    queryFn: () => apiRequest<Notification[]>(`/api/notifications/${CURRENT_USER_ID}`),
  });

  // Mark notification as read
  const markAsReadMutation = useMutation({
    mutationFn: (notificationId: string) => 
      apiRequest(`/api/notifications/${notificationId}/read`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notifications', CURRENT_USER_ID] });
    },
  });

  // Mark all as read
  const markAllAsReadMutation = useMutation({
    mutationFn: () => 
      apiRequest(`/api/notifications/mark-all-read`, { 
        method: 'POST',
        body: JSON.stringify({ userId: CURRENT_USER_ID })
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notifications', CURRENT_USER_ID] });
      toast({
        title: "Success",
        description: "All notifications marked as read",
      });
    },
  });

  const handleMarkAsRead = (notificationId: string) => {
    markAsReadMutation.mutate(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(date).getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 1) return 'just now';
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-6 h-6 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-6 h-6 text-blue-500" />;
      case 'follow':
        return <Users className="w-6 h-6 text-green-500" />;
      default:
        return <Bell className="w-6 h-6 text-gray-400" />;
    }
  };

  const getNotificationMessage = (notification: Notification) => {
    switch (notification.type) {
      case 'like':
        return `${notification.fromUsername} liked your video`;
      case 'comment':
        return `${notification.fromUsername} commented on your video`;
      case 'follow':
        return `${notification.fromUsername} started following you`;
      case 'mention':
        return `${notification.fromUsername} mentioned you`;
      default:
        return notification.content;
    }
  };

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'likes') return notification.type === 'like';
    if (activeTab === 'comments') return notification.type === 'comment';
    if (activeTab === 'followers') return notification.type === 'follow';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Mock notifications for demonstration since we don't have them in storage yet
  const mockNotifications = [
    {
      id: '1',
      type: 'like' as const,
      fromUsername: '@dancequeen',
      fromAvatar: avatarPlaceholder,
      content: 'liked your video',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    },
    {
      id: '2',
      type: 'comment' as const,
      fromUsername: '@techreviewer',
      fromAvatar: avatarPlaceholder,
      content: 'commented on your video: "This is amazing! 🔥"',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: '3',
      type: 'follow' as const,
      fromUsername: '@newuser123',
      fromAvatar: avatarPlaceholder,
      content: 'started following you',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
      id: '4',
      type: 'like' as const,
      fromUsername: '@artist_vibes',
      fromAvatar: avatarPlaceholder,
      content: 'liked your video',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
  ];

  const displayNotifications = filteredNotifications.length > 0 ? filteredNotifications : mockNotifications;

  if (isLoading) {
    return (
      <div className="h-full bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="h-full bg-black text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Inbox</h1>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={markAllAsReadMutation.isPending}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Check className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'gradient-primary text-white' : 'border-white/20 text-white hover:bg-white/10'}
          >
            All {unreadCount > 0 && `(${unreadCount})`}
          </Button>
          <Button
            variant={activeTab === 'likes' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('likes')}
            className={activeTab === 'likes' ? 'gradient-primary text-white' : 'border-white/20 text-white hover:bg-white/10'}
          >
            <Heart className="w-4 h-4 mr-2" />
            Likes
          </Button>
          <Button
            variant={activeTab === 'comments' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('comments')}
            className={activeTab === 'comments' ? 'gradient-primary text-white' : 'border-white/20 text-white hover:bg-white/10'}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Comments
          </Button>
          <Button
            variant={activeTab === 'followers' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('followers')}
            className={activeTab === 'followers' ? 'gradient-primary text-white' : 'border-white/20 text-white hover:bg-white/10'}
          >
            <Users className="w-4 h-4 mr-2" />
            Followers
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {displayNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Bell className="w-16 h-16 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
            <p className="text-sm text-center">When someone interacts with your videos,<br />you'll see it here</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {displayNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all hover:bg-gray-800/50 ${
                  !notification.isRead ? 'bg-gray-800/30 border-l-4 border-purple-500' : 'bg-gray-800/10'
                }`}
                onClick={() => notification.isRead || handleMarkAsRead(notification.id)}
              >
                <img
                  src={notification.fromAvatar || avatarPlaceholder}
                  alt={notification.fromUsername}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getNotificationIcon(notification.type)}
                    <p className="text-white">
                      <span className="font-semibold">{notification.fromUsername}</span>{' '}
                      {notification.type === 'like' && 'liked your video'}
                      {notification.type === 'comment' && 'commented on your video'}
                      {notification.type === 'follow' && 'started following you'}
                      {notification.type === 'mention' && 'mentioned you'}
                    </p>
                  </div>
                  {notification.content && notification.type === 'comment' && (
                    <p className="text-gray-400 text-sm">"{notification.content.split(': ')[1] || notification.content}"</p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">{formatTimeAgo(notification.createdAt)}</p>
                </div>
                {!notification.isRead && (
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPageNew;