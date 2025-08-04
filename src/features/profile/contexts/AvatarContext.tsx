import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AvatarContextType {
  selectedAvatar: string;
  setSelectedAvatar: (avatar: string) => void;
  getAvatarEmoji: (avatarId: string) => string;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

// Avatar mapping for easy access
const AVATAR_MAP = {
  'cat': '🐱',
  'dog': '🐶',
  'fox': '🦊',
  'lion': '🦁',
  'panda': '🐼',
  'bear': '🐨',
  'frog': '🐸',
  'unicorn': '🦄',
  'default': 'K' // Fallback to initial "K"
};

interface AvatarProviderProps {
  children: ReactNode;
}

export const AvatarProvider = ({ children }: AvatarProviderProps) => {
  const [selectedAvatar, setSelectedAvatarState] = useState<string>('default');

  // Load saved avatar from localStorage on mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar && AVATAR_MAP[savedAvatar as keyof typeof AVATAR_MAP]) {
      setSelectedAvatarState(savedAvatar);
    }
  }, []);

  // Save avatar to localStorage when it changes
  const setSelectedAvatar = (avatar: string) => {
    setSelectedAvatarState(avatar);
    localStorage.setItem('userAvatar', avatar);
  };

  // Get emoji for avatar ID
  const getAvatarEmoji = (avatarId: string): string => {
    return AVATAR_MAP[avatarId as keyof typeof AVATAR_MAP] || AVATAR_MAP.default;
  };

  const value: AvatarContextType = {
    selectedAvatar,
    setSelectedAvatar,
    getAvatarEmoji,
  };

  return (
    <AvatarContext.Provider value={value}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = (): AvatarContextType => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};
