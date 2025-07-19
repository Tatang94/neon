import { useState } from 'react';
import { Home, Search, Plus, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import VideoFeed from './VideoFeed';
import DiscoverPage from './DiscoverPage';
import CreatePage from './CreatePage';
import InboxPage from './InboxPage';
import ProfilePage from './ProfilePage';

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
    <div className="relative w-full max-w-md mx-auto bg-background overflow-hidden border border-border rounded-2xl shadow-2xl" style={{ height: '700px', minHeight: '700px' }}>
      {/* Main Content */}
      <div className="h-full pb-24 overflow-hidden">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3">
        <div className="flex justify-between items-center max-w-sm mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'flex flex-col items-center justify-center p-2 rounded-xl transition-all',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.id === 'create' ? (
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center glow-pink hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <>
                    <Icon className={cn(
                      'w-6 h-6 mb-1',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )} />
                    <span className={cn(
                      'text-xs font-medium',
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