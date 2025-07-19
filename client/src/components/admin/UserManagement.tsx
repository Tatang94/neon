import { useState } from 'react';
import { Search, Filter, MoreHorizontal, Ban, Shield, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import avatarPlaceholder from '@/assets/avatar-placeholder.jpg';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const users = [
    {
      id: '1',
      username: '@creativevibe',
      email: 'creative@email.com',
      status: 'active',
      role: 'user',
      joinDate: '2024-01-15',
      followers: 125000,
      videos: 45,
      reports: 0
    },
    {
      id: '2',
      username: '@dancequeen',
      email: 'dance@email.com',
      status: 'active',
      role: 'creator',
      joinDate: '2024-02-20',
      followers: 89000,
      videos: 78,
      reports: 1
    },
    {
      id: '3',
      username: '@techreviewer',
      email: 'tech@email.com',
      status: 'banned',
      role: 'user',
      joinDate: '2024-03-10',
      followers: 15600,
      videos: 12,
      reports: 5
    },
    {
      id: '4',
      username: '@musicmaker',
      email: 'music@email.com',
      status: 'active',
      role: 'admin',
      joinDate: '2024-01-05',
      followers: 230000,
      videos: 156,
      reports: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success/20 text-success">Active</Badge>;
      case 'banned':
        return <Badge className="bg-destructive/20 text-destructive">Banned</Badge>;
      case 'suspended':
        return <Badge className="bg-warning/20 text-warning">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-primary/20 text-primary">Admin</Badge>;
      case 'creator':
        return <Badge className="bg-secondary/20 text-secondary">Creator</Badge>;
      default:
        return <Badge variant="outline">User</Badge>;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage user accounts, roles, and permissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">1.2M</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">284K</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">1.2K</p>
              <p className="text-sm text-muted-foreground">Suspended</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">89</p>
              <p className="text-sm text-muted-foreground">Banned</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">User Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by username or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
                className={statusFilter === 'all' ? 'gradient-primary text-white' : ''}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
                className={statusFilter === 'active' ? 'gradient-primary text-white' : ''}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === 'banned' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('banned')}
                className={statusFilter === 'banned' ? 'gradient-primary text-white' : ''}
              >
                Banned
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-foreground">User</TableHead>
                  <TableHead className="text-foreground">Status</TableHead>
                  <TableHead className="text-foreground">Role</TableHead>
                  <TableHead className="text-foreground">Joined</TableHead>
                  <TableHead className="text-foreground">Stats</TableHead>
                  <TableHead className="text-foreground">Reports</TableHead>
                  <TableHead className="text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-border hover:bg-card-hover">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={avatarPlaceholder}
                          alt={user.username}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-foreground">{user.username}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-foreground">{formatNumber(user.followers)} followers</p>
                        <p className="text-muted-foreground">{user.videos} videos</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.reports > 0 ? (
                        <Badge variant="destructive" className="bg-destructive/20 text-destructive">
                          {user.reports} reports
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">No reports</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Ban className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-success hover:text-success">
                            <Shield className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
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

export default UserManagement;