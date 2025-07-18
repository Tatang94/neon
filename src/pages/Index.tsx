import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Monitor } from 'lucide-react';
import MobileApp from '@/components/mobile/MobileApp';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const [activeView, setActiveView] = useState<'hero' | 'mobile'>('hero');
  const navigate = useNavigate();

  if (activeView === 'mobile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-center mb-8">
          <Button 
            onClick={() => setActiveView('hero')}
            variant="outline"
            className="mb-4 border-white/20 text-white hover:bg-white/10"
          >
            ← Back to Home
          </Button>
          <MobileApp />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="gradient-primary bg-clip-text text-transparent">VIRAL</span>
            <span className="gradient-secondary bg-clip-text text-transparent">VIDS</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            The ultimate short video social platform with neon vibes ✨
          </p>
          
          <p className="text-lg mb-12 text-gray-300 max-w-xl mx-auto">
            Create, discover, and share amazing content with our Gen Z-focused mobile app and powerful admin dashboard
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setActiveView('mobile')}
              className="gradient-primary text-white px-8 py-4 text-lg font-semibold glow-pink hover:scale-105 transition-bounce"
            >
              <Smartphone className="w-6 h-6 mr-2" />
              View Mobile App
            </Button>
            
            <Button
              size="lg"
              onClick={() => navigate('/admin')}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold hover:scale-105 transition-bounce backdrop-blur-sm"
            >
              <Monitor className="w-6 h-6 mr-2" />
              Admin Dashboard
            </Button>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/20 blur-xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-secondary/20 blur-xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/6 w-16 h-16 rounded-full bg-accent/20 blur-xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Features Preview */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-primary bg-clip-text text-transparent">
            Platform Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Mobile Features */}
            <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-smooth">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Smartphone className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Mobile Experience</h3>
                </div>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Vertical video feed with smooth swipe gestures
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    Advanced discovery with trending hashtags
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    Creative tools with filters and music
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Real-time notifications and messaging
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    Creator profiles with detailed analytics
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Admin Features */}
            <Card className="border-border bg-card/50 backdrop-blur-sm hover:border-secondary/30 transition-smooth">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Monitor className="w-8 h-8 text-secondary" />
                  <h3 className="text-2xl font-bold text-foreground">Admin Dashboard</h3>
                </div>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    Comprehensive analytics and user insights
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    Advanced content moderation tools
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    User management and role permissions
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    Music library and content management
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    Monetization and creator payout system
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
