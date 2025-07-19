import { useState } from 'react';
import { Home, Search, Plus, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import VideoFeed from './VideoFeedNew';
import DiscoverPage from './DiscoverPageNew';
import CreatePage from './CreatePageNew';
import InboxPage from './InboxPageNew';
import ProfilePage from './ProfilePageNew';

const MobileApp = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Search, label: 'Discover' },
    { id: 'create', icon: Plus, label: 'Create' },
    { id: 'inbox', icon: MessageCircle, label: 'Inbox' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <VideoFeed />;
      case 'discover':
        return <DiscoverPage />;
      case 'create':
        return <CreatePage />;
      case 'inbox':
        return <InboxPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <VideoFeed />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Main Content */}
      <div className="h-full pb-32 overflow-hidden">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border px-6 py-4 safe-area-inset-bottom">
        <div className="flex justify-between items-center w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'flex flex-col items-center justify-center p-3 rounded-xl transition-all',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.id === 'create' ? (
                  <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center glow-pink hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                ) : (
                  <>
                    <Icon className={cn(
                      'w-7 h-7 mb-1',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )} />
                    <span className={cn(
                      'text-sm font-medium',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}>
                      {item.label}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobileApp;