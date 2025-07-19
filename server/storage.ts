import { Video, User, Comment, Notification, InsertVideo, InsertUser, InsertComment, InsertNotification } from '../shared/schema';

export interface IStorage {
  // Video operations
  getVideos(): Promise<Video[]>;
  getVideoById(id: string): Promise<Video | null>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(id: string, updates: Partial<Video>): Promise<Video | null>;
  deleteVideo(id: string): Promise<boolean>;
  likeVideo(videoId: string, userId: string): Promise<Video | null>;
  unlikeVideo(videoId: string, userId: string): Promise<Video | null>;
  incrementViews(videoId: string): Promise<Video | null>;

  // User operations
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | null>;
  followUser(followerId: string, followingId: string): Promise<boolean>;
  unfollowUser(followerId: string, followingId: string): Promise<boolean>;
  
  // Comment operations
  getCommentsByVideoId(videoId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  likeComment(commentId: string, userId: string): Promise<Comment | null>;
  unlikeComment(commentId: string, userId: string): Promise<Comment | null>;
  deleteComment(id: string): Promise<boolean>;

  // Notification operations
  getNotificationsByUserId(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: string): Promise<boolean>;
  markAllNotificationsAsRead(userId: string): Promise<boolean>;
}

class MemoryStorage implements IStorage {
  private videos: Video[] = [];
  private users: User[] = [];
  private comments: Comment[] = [];
  private notifications: Notification[] = [];
  private videoLikes: Map<string, Set<string>> = new Map();
  private commentLikes: Map<string, Set<string>> = new Map();
  private followers: Map<string, Set<string>> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Create sample users
    const sampleUsers: User[] = [
      {
        id: '1',
        username: '@creativevibe',
        displayName: 'Creative Vibe ✨',
        bio: 'Digital artist & content creator 🎨\nCreating magic with neon vibes ✨',
        avatar: '/placeholder-avatar.svg',
        followers: 125000,
        following: 890,
        totalLikes: 2500000,
        verified: true,
        createdAt: new Date(),
      },
      {
        id: '2',
        username: '@dancequeen',
        displayName: 'Dance Queen',
        bio: 'Professional dancer & choreographer 💃',
        avatar: '/placeholder-avatar.svg',
        followers: 89000,
        following: 245,
        totalLikes: 1200000,
        verified: false,
        createdAt: new Date(),
      },
      {
        id: '3',
        username: '@techreviewer',
        displayName: 'Tech Reviewer',
        bio: 'Latest tech reviews & tutorials 📱',
        avatar: '/placeholder-avatar.svg',
        followers: 156000,
        following: 178,
        totalLikes: 890000,
        verified: true,
        createdAt: new Date(),
      }
    ];

    // Create sample videos
    const sampleVideos: Video[] = [
      {
        id: '1',
        username: '@creativevibe',
        caption: 'Creating magic with neon lights ✨ This took me hours but totally worth it! #neonvibes #creative #art',
        music: 'Electric Dreams - Neon Beats',
        thumbnail: '/placeholder-video.svg',
        videoUrl: '/placeholder-video.svg',
        likes: 15420,
        comments: 342,
        shares: 89,
        views: 128000,
        isLiked: false,
        isFollowing: false,
        createdAt: new Date(),
      },
      {
        id: '2',
        username: '@dancequeen',
        caption: 'New dance routine! What do you think? 💃 #dance #choreography #viral',
        music: 'Upbeat Dance Mix - DJ Flow',
        thumbnail: '/placeholder-video.svg',
        videoUrl: '/placeholder-video.svg',
        likes: 23100,
        comments: 567,
        shares: 234,
        views: 245000,
        isLiked: true,
        isFollowing: true,
        createdAt: new Date(),
      },
      {
        id: '3',
        username: '@techreviewer',
        caption: 'iPhone 15 Pro Max review! Is it worth the upgrade? 📱 #tech #review #iphone',
        music: 'Tech Vibes - Electronic',
        thumbnail: '/placeholder-video.svg',
        videoUrl: '/placeholder-video.svg',
        likes: 8930,
        comments: 445,
        shares: 156,
        views: 89000,
        isLiked: false,
        isFollowing: false,
        createdAt: new Date(),
      }
    ];

    this.users = sampleUsers;
    this.videos = sampleVideos;
  }

  // Video operations
  async getVideos(): Promise<Video[]> {
    return [...this.videos].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getVideoById(id: string): Promise<Video | null> {
    return this.videos.find(v => v.id === id) || null;
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const newVideo: Video = {
      ...video,
      id: Date.now().toString(),
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      createdAt: new Date(),
    };
    this.videos.push(newVideo);
    return newVideo;
  }

  async updateVideo(id: string, updates: Partial<Video>): Promise<Video | null> {
    const index = this.videos.findIndex(v => v.id === id);
    if (index === -1) return null;
    
    this.videos[index] = { ...this.videos[index], ...updates };
    return this.videos[index];
  }

  async deleteVideo(id: string): Promise<boolean> {
    const index = this.videos.findIndex(v => v.id === id);
    if (index === -1) return false;
    
    this.videos.splice(index, 1);
    return true;
  }

  async likeVideo(videoId: string, userId: string): Promise<Video | null> {
    const video = await this.getVideoById(videoId);
    if (!video) return null;

    if (!this.videoLikes.has(videoId)) {
      this.videoLikes.set(videoId, new Set());
    }

    const likes = this.videoLikes.get(videoId)!;
    if (!likes.has(userId)) {
      likes.add(userId);
      video.likes++;
      video.isLiked = true;
    }

    return video;
  }

  async unlikeVideo(videoId: string, userId: string): Promise<Video | null> {
    const video = await this.getVideoById(videoId);
    if (!video) return null;

    const likes = this.videoLikes.get(videoId);
    if (likes && likes.has(userId)) {
      likes.delete(userId);
      video.likes = Math.max(0, video.likes - 1);
      video.isLiked = false;
    }

    return video;
  }

  async incrementViews(videoId: string): Promise<Video | null> {
    const video = await this.getVideoById(videoId);
    if (!video) return null;

    video.views++;
    return video;
  }

  // User operations
  async getUsers(): Promise<User[]> {
    return [...this.users];
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.users.find(u => u.username === username) || null;
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      followers: 0,
      following: 0,
      totalLikes: 0,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    this.users[index] = { ...this.users[index], ...updates };
    return this.users[index];
  }

  async followUser(followerId: string, followingId: string): Promise<boolean> {
    if (followerId === followingId) return false;

    if (!this.followers.has(followingId)) {
      this.followers.set(followingId, new Set());
    }

    const followers = this.followers.get(followingId)!;
    if (!followers.has(followerId)) {
      followers.add(followerId);
      
      // Update follower counts
      const follower = await this.getUserById(followerId);
      const following = await this.getUserById(followingId);
      
      if (follower) follower.following++;
      if (following) following.followers++;
      
      return true;
    }

    return false;
  }

  async unfollowUser(followerId: string, followingId: string): Promise<boolean> {
    const followers = this.followers.get(followingId);
    if (followers && followers.has(followerId)) {
      followers.delete(followerId);
      
      // Update follower counts
      const follower = await this.getUserById(followerId);
      const following = await this.getUserById(followingId);
      
      if (follower) follower.following = Math.max(0, follower.following - 1);
      if (following) following.followers = Math.max(0, following.followers - 1);
      
      return true;
    }

    return false;
  }

  // Comment operations
  async getCommentsByVideoId(videoId: string): Promise<Comment[]> {
    return this.comments.filter(c => c.videoId === videoId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      likes: 0,
      createdAt: new Date(),
    };
    this.comments.push(newComment);

    // Increment comment count on video
    const video = await this.getVideoById(comment.videoId);
    if (video) video.comments++;

    return newComment;
  }

  async likeComment(commentId: string, userId: string): Promise<Comment | null> {
    const comment = this.comments.find(c => c.id === commentId);
    if (!comment) return null;

    if (!this.commentLikes.has(commentId)) {
      this.commentLikes.set(commentId, new Set());
    }

    const likes = this.commentLikes.get(commentId)!;
    if (!likes.has(userId)) {
      likes.add(userId);
      comment.likes++;
      comment.isLiked = true;
    }

    return comment;
  }

  async unlikeComment(commentId: string, userId: string): Promise<Comment | null> {
    const comment = this.comments.find(c => c.id === commentId);
    if (!comment) return null;

    const likes = this.commentLikes.get(commentId);
    if (likes && likes.has(userId)) {
      likes.delete(userId);
      comment.likes = Math.max(0, comment.likes - 1);
      comment.isLiked = false;
    }

    return comment;
  }

  async deleteComment(id: string): Promise<boolean> {
    const index = this.comments.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    const comment = this.comments[index];
    this.comments.splice(index, 1);

    // Decrement comment count on video
    const video = await this.getVideoById(comment.videoId);
    if (video) video.comments = Math.max(0, video.comments - 1);

    return true;
  }

  // Notification operations
  async getNotificationsByUserId(userId: string): Promise<Notification[]> {
    return this.notifications.filter(n => n.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    this.notifications.push(newNotification);
    return newNotification;
  }

  async markNotificationAsRead(id: string): Promise<boolean> {
    const notification = this.notifications.find(n => n.id === id);
    if (!notification) return false;
    
    notification.isRead = true;
    return true;
  }

  async markAllNotificationsAsRead(userId: string): Promise<boolean> {
    this.notifications
      .filter(n => n.userId === userId)
      .forEach(n => n.isRead = true);
    return true;
  }
}

export const storage = new MemoryStorage();