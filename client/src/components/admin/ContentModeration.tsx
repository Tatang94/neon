import { useState } from 'react';
import { Search, Play, Flag, Check, X, Eye, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import videoPlaceholder from '@/assets/video-placeholder.jpg';
import avatarPlaceholder from '@/assets/avatar-placeholder.jpg';

const ContentModeration = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');

  const videos = [
    {
      id: '1',
      thumbnail: videoPlaceholder,
      title: 'Amazing Dance Performance',
      username: '@dancequeen',
      avatar: avatarPlaceholder,
      uploadDate: '2024-01-20',
      duration: '0:45',
      views: 125000,
      reports: 3,
      violations: ['inappropriate'],
      status: 'pending'
    },
    {
      id: '2',
      thumbnail: videoPlaceholder,
      title: 'Tech Review: Latest Gadget',
      username: '@techreviewer',
      avatar: avatarPlaceholder,
      uploadDate: '2024-01-19',
      duration: '2:30',
      views: 89000,
      reports: 1,
      violations: ['spam'],
      status: 'flagged'
    },
    {
      id: '3',
      thumbnail: videoPlaceholder,
      title: 'Creative Art Process',
      username: '@creativevibe',
      avatar: avatarPlaceholder,
      uploadDate: '2024-01-18',
      duration: '1:15',
      views: 234000,
      reports: 0,
      violations: [],
      status: 'approved'
    },
    {
      id: '4',
      thumbnail: videoPlaceholder,
      title: 'Suspicious Content',
      username: '@spammer123',
      avatar: avatarPlaceholder,
      uploadDate: '2024-01-17',
      duration: '0:30',
      views: 1200,
      reports: 15,
      violations: ['nsfw', 'spam', 'harassment'],
      status: 'removed'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-success/20 text-success">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-warning/20 text-warning">Pending Review</Badge>;
      case 'flagged':
        return <Badge className="bg-destructive/20 text-destructive">Flagged</Badge>;
      case 'removed':
        return <Badge variant="destructive">Removed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getViolationBadges = (violations: string[]) => {
    if (violations.length === 0) return <span className="text-muted-foreground">No violations</span>;
    
    return (
      <div className="flex flex-wrap gap-1">
        {violations.map((violation, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {violation}
          </Badge>
        ))}
      </div>
    );
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const moderationStats = [
    { label: 'Pending Review', value: '1.2K', color: 'text-warning' },
    { label: 'Flagged Content', value: '89', color: 'text-destructive' },
    { label: 'Approved Today', value: '4.5K', color: 'text-success' },
    { label: 'Removed Today', value: '23', color: 'text-muted-foreground' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Content Moderation</h1>
        <p className="text-muted-foreground">Review and moderate user-generated content</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {moderationStats.map((stat, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Review */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Content Review Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search videos by title or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
                className={statusFilter === 'pending' ? 'gradient-primary text-white' : ''}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === 'flagged' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('flagged')}
                className={statusFilter === 'flagged' ? 'gradient-primary text-white' : ''}
              >
                Flagged
              </Button>
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
                className={statusFilter === 'all' ? 'gradient-primary text-white' : ''}
              >
                All
              </Button>
            </div>
          </div>

          {/* Videos Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-foreground">Video</TableHead>
                  <TableHead className="text-foreground">Creator</TableHead>
                  <TableHead className="text-foreground">Status</TableHead>
                  <TableHead className="text-foreground">Reports</TableHead>
                  <TableHead className="text-foreground">Violations</TableHead>
                  <TableHead className="text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((video) => (
                  <TableRow key={video.id} className="border-border hover:bg-card-hover">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-surface">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play className="w-4 h-4 text-white" />
                          </div>
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-foreground max-w-48 truncate">{video.title}</p>
                          <p className="text-sm text-muted-foreground">{formatNumber(video.views)} views</p>
                          <p className="text-xs text-muted-foreground">{video.uploadDate}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={video.avatar}
                          alt={video.username}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-foreground">{video.username}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(video.status)}</TableCell>
                    <TableCell>
                      {video.reports > 0 ? (
                        <div className="flex items-center gap-1">
                          <Flag className="w-4 h-4 text-destructive" />
                          <span className="text-destructive font-medium">{video.reports}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No reports</span>
                      )}
                    </TableCell>
                    <TableCell>{getViolationBadges(video.violations)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {video.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="sm" className="text-success hover:text-success">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        {video.status === 'approved' && (
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Ban className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentModeration;