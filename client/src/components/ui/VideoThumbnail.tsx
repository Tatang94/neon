import { Play } from 'lucide-react';

interface VideoThumbnailProps {
  className?: string;
  showPlayButton?: boolean;
}

const VideoThumbnail = ({ className = "", showPlayButton = true }: VideoThumbnailProps) => {
  return (
    <div className={`relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 ${className}`}>
      <svg
        viewBox="0 0 200 300"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background pattern */}
        <rect width="200" height="300" fill="url(#neonGradient)" opacity="0.8"/>
        
        {/* Neon lines */}
        <path d="M20 50 Q100 30 180 50" stroke="#00FFFF" strokeWidth="2" fill="none" filter="url(#glow)" opacity="0.7"/>
        <path d="M20 150 Q100 130 180 150" stroke="#FF00FF" strokeWidth="2" fill="none" filter="url(#glow)" opacity="0.7"/>
        <path d="M20 250 Q100 230 180 250" stroke="#FFFF00" strokeWidth="2" fill="none" filter="url(#glow)" opacity="0.7"/>
        
        {/* Geometric shapes */}
        <circle cx="60" cy="100" r="15" fill="#00FFFF" opacity="0.6" filter="url(#glow)"/>
        <rect x="120" y="180" width="30" height="30" fill="#FF00FF" opacity="0.6" filter="url(#glow)" rx="5"/>
        <polygon points="150,80 170,120 130,120" fill="#FFFF00" opacity="0.6" filter="url(#glow)"/>
      </svg>
      
      {showPlayButton && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-6 h-6 text-white ml-1" fill="white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoThumbnail;