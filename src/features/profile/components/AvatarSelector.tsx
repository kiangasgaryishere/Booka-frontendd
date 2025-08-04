import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAvatar } from '../contexts/AvatarContext';
import { useState } from 'react';
import { Button } from '@/components/ui';
import { cn } from '@/utils/cn';

interface AvatarSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const avatarOptions = [
    { key: 'fox', emoji: '🦊' },
    { key: 'lion', emoji: '🦁' },
    { key: 'panda', emoji: '🐼' },
    { key: 'bear', emoji: '🐨' },
    { key: 'frog', emoji: '🐸' },
    { key: 'unicorn', emoji: '🦄' }
  ];

export const AvatarSelector = ({ isOpen, onClose }: AvatarSelectorProps) => {
  const { selectedAvatar, setSelectedAvatar } = useAvatar();
  const [tempAvatar, setTempAvatar] = useState(selectedAvatar);

  const handleSelect = () => {
    if (tempAvatar) {
      setSelectedAvatar(tempAvatar);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">انتخاب آواتار</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="my-6 grid grid-cols-3 gap-4">
              {avatarOptions.map((avatar) => (
                <div
                  key={avatar.key}
                  onClick={() => setTempAvatar(avatar.key)}
                  className={cn(
                    'flex cursor-pointer items-center justify-center rounded-xl border-2 p-4 transition-all',
                    tempAvatar === avatar.key
                      ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500 dark:bg-primary-900/50'
                      : 'border-gray-200 bg-gray-50 hover:border-primary-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-700',
                  )}
                >
                  <span className="text-4xl">{avatar.emoji}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
               <Button onClick={handleSelect} className="w-full">
                تایید
              </Button>
              <Button variant="ghost" onClick={onClose} className="w-full">
                انصراف
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
