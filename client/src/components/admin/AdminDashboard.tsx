import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Video, 
  Music, 
  Flag, 
  DollarSign, 
  Settings,
  Menu,
  Bell,
  Search,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import DashboardOverview from './DashboardOverview';
import UserManagement from './UserManagement';
import ContentModeration from './ContentModeration';
import MusicLibrary from './MusicLibrary';
import ReportedContent from './ReportedContent';
import MonetizationPayouts from './MonetizationPayouts';
import AdminSettings from './AdminSettings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'content', label: 'Content Moderation', icon: Video },
    { id: 'music', label: 'Music Library', icon: Music },
    { id: 'reports', label: 'Reported Content', icon: Flag },
    { id: 'monetization', label: 'Monetization', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'content':
        return <ContentModeration />;
      case 'music':
        return <MusicLibrary />;
      case 'reports':
        return <ReportedContent />;
      case 'monetization':
        return <MonetizationPayouts />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className={cn(
        "bg-surface border-r border-border transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">VI</span>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="font-bold text-lg gradient-primary bg-clip-text text-transparent">
                  ViralVids
                </h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth text-left",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-surface border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users, content, reports..."
                  className="pl-10 w-80 bg-background border-border"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </Button>
              
              <div className="flex items-center gap-2 pl-3 border-l border-border">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-medium text-sm">AD</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Admin User</p>
                  <p className="text-muted-foreground text-xs">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;