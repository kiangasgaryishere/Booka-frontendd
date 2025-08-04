import { cn } from '@/utils/cn';
import { useAvatar } from '@/features/profile/contexts/AvatarContext';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

const Avatar = ({ size = 'md', className, onClick }: AvatarProps) => {
  const { selectedAvatar, getAvatarEmoji } = useAvatar();
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl'
  };

  const avatarEmoji = getAvatarEmoji(selectedAvatar);
  const isDefaultAvatar = selectedAvatar === 'default';

  return (
    <div className="relative">
      <button
        onClick={onClick}
        disabled={!onClick}
        className={cn(
          'rounded-full flex items-center justify-center font-bold transition-all duration-200',
          sizeClasses[size],
          isDefaultAvatar 
            ? 'bg-primary-500 text-white' 
            : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 border-2 border-white shadow-sm',
          onClick && 'hover:scale-105 cursor-pointer',
          !onClick && 'cursor-default',
          className
        )}
      >
        {isDefaultAvatar ? 'K' : (
          <span className={cn(
            size === 'sm' && 'text-lg',
            size === 'md' && 'text-xl', 
            size === 'lg' && 'text-2xl',
            size === 'xl' && 'text-3xl'
          )}>
            {avatarEmoji}
          </span>
        )}
      </button>
      

    </div>
  );
};

export default Avatar;
