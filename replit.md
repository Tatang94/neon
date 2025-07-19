# ViralVids - Social Media Platform

## Overview
A modern short video social platform with neon-themed design, featuring a mobile app interface and admin dashboard. Successfully migrated from Lovable to Replit environment with proper client/server separation and security practices.

## Project Architecture
- **Frontend**: React with TypeScript, Tailwind CSS with custom neon theme
- **Backend**: Express.js server with in-memory storage
- **Routing**: Wouter for SPA routing (Replit compatible)
- **State Management**: TanStack Query for data fetching
- **UI Components**: Shadcn/ui components with custom styling

## Key Features
- Mobile app simulation with video feed, discovery, create, inbox, and profile pages
- Admin dashboard accessible at `/admin` route
- Neon-themed design with gradients and glow effects
- Responsive layout with proper sizing constraints

## Recent Changes
- **2025-01-19**: Successfully migrated from Lovable to Replit
  - Fixed routing system to use wouter instead of react-router-dom
  - Resolved Tailwind CSS configuration issues
  - Updated mobile app sizing from 600px to 700px for better visibility
  - Removed admin dashboard access from landing page per user request
  - Admin dashboard now only accessible via direct `/admin` URL
  - Enhanced mobile video feed with larger touch targets and better UI scaling
  - Added touch gesture support for video navigation
  - Improved button sizes and spacing for better mobile experience
  - **MAJOR UPDATE**: Removed all mock data and implemented real API functionality
  - All buttons now functional with proper backend API endpoints
  - Created custom SVG components to replace placeholder images
  - Improved bottom navigation layout for better mobile experience
  - Implemented real video feed, discover, inbox, profile, and create pages

## User Preferences
- Admin dashboard should be hidden from main landing page
- Admin access only through `/admin` URL
- Mobile app view should use full screen (h-screen) for better mobile experience
- Clean, organized layout without unnecessary elements
- Larger touch targets and buttons for better mobile usability

## Technical Notes
- Server runs on port 5000 as required by Replit
- CSS uses HSL color variables for theming
- Custom utility classes defined for neon effects and animations
- Components are properly organized in feature-based directories

## Migration Status
✅ All checklist items completed - project ready for development