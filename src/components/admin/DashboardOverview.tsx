import { 
  Users, 
  Video, 
  DollarSign, 
  TrendingUp, 
  Eye,
  Heart,
  MessageCircle,
  Share,
  Smartphone,
  Monitor
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardOverview = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1.2M",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Daily Active Users",
      value: "284K",
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      title: "Total Videos",
      value: "8.4M",
      change: "+18%",
      trend: "up",
      icon: Video,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Monthly Revenue",
      value: "$45.2K",
      change: "+25%",
      trend: "up",
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  const videoUploadsData = [
    { name: 'Mon', videos: 1200 },
    { name: 'Tue', videos: 1400 },
    { name: 'Wed', videos: 1100 },
    { name: 'Thu', videos: 1600 },
    { name: 'Fri', videos: 1900 },
    { name: 'Sat', videos: 2200 },
    { name: 'Sun', videos: 1800 },
  ];

  const userGrowthData = [
    { name: 'Jan', users: 45000 },
    { name: 'Feb', users: 52000 },
    { name: 'Mar', users: 61000 },
    { name: 'Apr', users: 75000 },
    { name: 'May', users: 89000 },
    { name: 'Jun', users: 103000 },
  ];

  const deviceData = [
    { name: 'Android', value: 65, color: '#00ff88' },
    { name: 'iOS', value: 30, color: '#0099ff' },
    { name: 'Web', value: 5, color: '#ff0099' },
  ];

  const engagementData = [
    { name: 'Likes', value: 2400000, icon: Heart, color: 'text-primary' },
    { name: 'Comments', value: 890000, icon: MessageCircle, color: 'text-secondary' },
    { name: 'Shares', value: 450000, icon: Share, color: 'text-accent' },
    { name: 'Views', value: 12500000, icon: Eye, color: 'text-success' },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your platform's performance and key metrics</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-border hover:border-primary/20 transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className={`text-xs ${stat.color} flex items-center gap-1`}>
                      <TrendingUp className="w-3 h-3" />
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video Uploads Chart */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Video Uploads (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={videoUploadsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="videos" fill="url(#videoGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="videoGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Growth Chart */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">User Growth (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="hsl(var(--secondary))" 
                  fill="url(#userGradient)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Device Distribution & Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Distribution */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {deviceData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Engagement Metrics */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {engagementData.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.name} className="flex items-center justify-between p-3 rounded-lg bg-surface">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${metric.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{metric.name}</p>
                        <p className="text-sm text-muted-foreground">This month</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      {formatNumber(metric.value)}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;