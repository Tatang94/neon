# ViralVids - Social Media Platform

## Overview
ViralVids is a modern short video social platform with neon-themed design, featuring both a mobile app interface and admin dashboard. The project has been successfully migrated from Lovable to Replit with full compatibility.

## Project Architecture
- **Frontend**: React with TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js with TypeScript
- **Routing**: Wouter for SPA routing
- **State Management**: TanStack Query for data fetching
- **UI Components**: shadcn/ui with custom neon theming
- **Storage**: In-memory storage (MemStorage) for development

## Recent Changes (Migration)
### January 19, 2025
- ✓ Migrated project from Lovable to Replit environment
- ✓ Fixed routing system from react-router-dom to wouter for Replit compatibility
- ✓ Resolved CSS configuration issues with Tailwind and custom classes
- ✓ Fixed import order for CSS files (Google Fonts import moved before Tailwind)
- ✓ Added proper color definitions for custom surface classes
- ✓ Improved mobile app container sizing with fixed height (600px)
- ✓ Updated query client setup for proper API communication

## User Preferences
- Language: Indonesian (user communicated in Indonesian)
- Focus: Layout optimization and proper component sizing
- Design priority: Maintaining neon aesthetic and mobile-first approach

## Key Features
### Mobile App
- Vertical video feed with smooth navigation
- Bottom navigation with 5 tabs (Home, Discover, Create, Inbox, Profile)
- Neon-themed UI with glowing effects
- Responsive mobile container design

### Admin Dashboard  
- Comprehensive analytics and user management
- Content moderation tools
- Music library management
- Monetization and payout systems
- Dark-themed interface with sidebar navigation

## Technical Notes
- Server runs on port 5000 (required for Replit)
- Uses Vite for development with HMR
- Custom CSS gradients and glow effects for neon theme
- Proper client/server separation for security
- TypeScript throughout for type safety

## Current Status
Project successfully migrated and running on Replit. All core functionality preserved with improved compatibility and proper responsive sizing.