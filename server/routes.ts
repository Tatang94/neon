import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { storage } from './storage';
import { insertVideoSchema, insertCommentSchema, ApiResponse } from '../shared/schema';

const router = Router();

// Helper function for API responses
const apiResponse = <T>(data?: T, error?: string): ApiResponse<T> => ({
  success: !error,
  data,
  error,
});

// Video routes
router.get('/api/videos', async (req: Request, res: Response) => {
  try {
    const videos = await storage.getVideos();
    res.json(apiResponse(videos));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch videos'));
  }
});

router.get('/api/videos/:id', async (req: Request, res: Response) => {
  try {
    const video = await storage.getVideoById(req.params.id);
    if (!video) {
      return res.status(404).json(apiResponse(undefined, 'Video not found'));
    }
    res.json(apiResponse(video));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch video'));
  }
});

router.post('/api/videos', async (req: Request, res: Response) => {
  try {
    const videoData = insertVideoSchema.parse(req.body);
    const video = await storage.createVideo(videoData);
    res.status(201).json(apiResponse(video));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(apiResponse(undefined, 'Invalid video data'));
    }
    res.status(500).json(apiResponse(undefined, 'Failed to create video'));
  }
});

router.post('/api/videos/:id/like', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json(apiResponse(undefined, 'User ID required'));
    }

    const video = await storage.likeVideo(req.params.id, userId);
    if (!video) {
      return res.status(404).json(apiResponse(undefined, 'Video not found'));
    }

    res.json(apiResponse(video));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to like video'));
  }
});

router.post('/api/videos/:id/unlike', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json(apiResponse(undefined, 'User ID required'));
    }

    const video = await storage.unlikeVideo(req.params.id, userId);
    if (!video) {
      return res.status(404).json(apiResponse(undefined, 'Video not found'));
    }

    res.json(apiResponse(video));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to unlike video'));
  }
});

router.post('/api/videos/:id/view', async (req: Request, res: Response) => {
  try {
    const video = await storage.incrementViews(req.params.id);
    if (!video) {
      return res.status(404).json(apiResponse(undefined, 'Video not found'));
    }

    res.json(apiResponse(video));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to increment views'));
  }
});

// User routes
router.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await storage.getUsers();
    res.json(apiResponse(users));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch users'));
  }
});

router.get('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await storage.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json(apiResponse(undefined, 'User not found'));
    }
    res.json(apiResponse(user));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch user'));
  }
});

router.post('/api/users/:id/follow', async (req: Request, res: Response) => {
  try {
    const { followerId } = req.body;
    if (!followerId) {
      return res.status(400).json(apiResponse(undefined, 'Follower ID required'));
    }

    const success = await storage.followUser(followerId, req.params.id);
    if (!success) {
      return res.status(400).json(apiResponse(undefined, 'Cannot follow user'));
    }

    res.json(apiResponse({ success: true }));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to follow user'));
  }
});

router.post('/api/users/:id/unfollow', async (req: Request, res: Response) => {
  try {
    const { followerId } = req.body;
    if (!followerId) {
      return res.status(400).json(apiResponse(undefined, 'Follower ID required'));
    }

    const success = await storage.unfollowUser(followerId, req.params.id);
    if (!success) {
      return res.status(400).json(apiResponse(undefined, 'Cannot unfollow user'));
    }

    res.json(apiResponse({ success: true }));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to unfollow user'));
  }
});

// Comment routes
router.get('/api/videos/:videoId/comments', async (req: Request, res: Response) => {
  try {
    const comments = await storage.getCommentsByVideoId(req.params.videoId);
    res.json(apiResponse(comments));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch comments'));
  }
});

router.post('/api/videos/:videoId/comments', async (req: Request, res: Response) => {
  try {
    const commentData = insertCommentSchema.parse({
      ...req.body,
      videoId: req.params.videoId,
    });
    const comment = await storage.createComment(commentData);
    res.status(201).json(apiResponse(comment));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(apiResponse(undefined, 'Invalid comment data'));
    }
    res.status(500).json(apiResponse(undefined, 'Failed to create comment'));
  }
});

router.post('/api/comments/:id/like', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json(apiResponse(undefined, 'User ID required'));
    }

    const comment = await storage.likeComment(req.params.id, userId);
    if (!comment) {
      return res.status(404).json(apiResponse(undefined, 'Comment not found'));
    }

    res.json(apiResponse(comment));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to like comment'));
  }
});

// Notification routes
router.get('/api/notifications/:userId', async (req: Request, res: Response) => {
  try {
    const notifications = await storage.getNotificationsByUserId(req.params.userId);
    res.json(apiResponse(notifications));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to fetch notifications'));
  }
});

router.post('/api/notifications/:id/read', async (req: Request, res: Response) => {
  try {
    const success = await storage.markNotificationAsRead(req.params.id);
    if (!success) {
      return res.status(404).json(apiResponse(undefined, 'Notification not found'));
    }

    res.json(apiResponse({ success: true }));
  } catch (error) {
    res.status(500).json(apiResponse(undefined, 'Failed to mark notification as read'));
  }
});

export default router;