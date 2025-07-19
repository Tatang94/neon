import { z } from 'zod';

// Video Schema
export const videoSchema = z.object({
  id: z.string(),
  username: z.string(),
  caption: z.string(),
  music: z.string(),
  thumbnail: z.string(),
  videoUrl: z.string(),
  likes: z.number().default(0),
  comments: z.number().default(0),
  shares: z.number().default(0),
  views: z.number().default(0),
  isLiked: z.boolean().default(false),
  isFollowing: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

export const insertVideoSchema = videoSchema.omit({ 
  id: true, 
  likes: true, 
  comments: true, 
  shares: true, 
  views: true,
  createdAt: true 
});

export type Video = z.infer<typeof videoSchema>;
export type InsertVideo = z.infer<typeof insertVideoSchema>;

// User Schema
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  displayName: z.string(),
  bio: z.string().optional(),
  avatar: z.string(),
  followers: z.number().default(0),
  following: z.number().default(0),
  totalLikes: z.number().default(0),
  verified: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

export const insertUserSchema = userSchema.omit({ 
  id: true, 
  followers: true, 
  following: true, 
  totalLikes: true,
  createdAt: true 
});

export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Comment Schema
export const commentSchema = z.object({
  id: z.string(),
  videoId: z.string(),
  userId: z.string(),
  username: z.string(),
  avatar: z.string(),
  content: z.string(),
  likes: z.number().default(0),
  isLiked: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

export const insertCommentSchema = commentSchema.omit({ 
  id: true, 
  likes: true,
  createdAt: true 
});

export type Comment = z.infer<typeof commentSchema>;
export type InsertComment = z.infer<typeof insertCommentSchema>;

// Notification Schema
export const notificationSchema = z.object({
  id: z.string(),
  type: z.enum(['like', 'comment', 'follow', 'mention']),
  userId: z.string(),
  fromUserId: z.string(),
  fromUsername: z.string(),
  fromAvatar: z.string(),
  content: z.string(),
  videoId: z.string().optional(),
  isRead: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

export const insertNotificationSchema = notificationSchema.omit({ 
  id: true,
  createdAt: true 
});

export type Notification = z.infer<typeof notificationSchema>;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;

// API Response Types
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
});

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};