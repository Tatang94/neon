import { useState } from 'react';

interface Toast {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, variant = 'default' }: Toast) => {
    // For now, just use a simple alert - in a real app you'd have a proper toast system
    if (variant === 'destructive') {
      console.error(`Error: ${title}${description ? ` - ${description}` : ''}`);
    } else {
      console.log(`Success: ${title}${description ? ` - ${description}` : ''}`);
    }

    // You could also implement a proper toast notification system here
    const newToast = { title, description, variant };
    setToasts(prev => [...prev, newToast]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t !== newToast));
    }, 3000);
  };

  return { toast, toasts };
};