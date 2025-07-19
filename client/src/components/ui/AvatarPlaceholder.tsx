import { User } from 'lucide-react';

interface AvatarPlaceholderProps {
  className?: string;
  username?: string;
  size?: 'sm' | 'md' | 'lg';
}

const AvatarPlaceholder = ({ className = "", username = "@user", size = 'md' }: AvatarPlaceholderProps) => {
  const initials = username.slice(1, 3).toUpperCase();
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`avatarGradient-${username}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <filter id="avatarGlow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <circle cx="20" cy="20" r="20" fill={`url(#avatarGradient-${username})`}/>
        <circle cx="20" cy="15" r="6" fill="white" opacity="0.9"/>
        <path d="M10 30 Q20 25 30 30" stroke="white" strokeWidth="3" fill="none" opacity="0.9"/>
        
        <text x="20" y="25" textAnchor="middle" className="text-xs font-bold fill-white" filter="url(#avatarGlow)">
          {initials}
        </text>
      </svg>
    </div>
  );
};

export default AvatarPlaceholder;