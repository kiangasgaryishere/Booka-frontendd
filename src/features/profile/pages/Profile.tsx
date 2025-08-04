import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/authentication/contexts/AuthContext';
import BottomNavigation from '@/components/ui/BottomNavigation';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { pageContainer, pageItem } from '@/utils/animations';
import { Avatar, AvatarSelector } from '../components';
import { useAvatar } from '../contexts/AvatarContext.tsx';

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { user, logout } = useAuth();
  const { selectedAvatar } = useAvatar();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  const handleLogout = () => {
    if (!showLogoutConfirm) {
      setShowLogoutConfirm(true);
      return;
    }

    logout();
    navigate('/welcome');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleAchievementsClick = () => {
    navigate('/achievements');
  };

  const handleAvatarClick = () => {
    setShowAvatarSelector(true);
  };

  const handleCloseAvatarSelector = () => {
    setShowAvatarSelector(false);
  };



  return (
    <div className={cn('min-h-screen bg-background relative', className)} dir="rtl">
      <motion.div
        className="pb-20"
        variants={pageContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Top Navigation Bar */}
        <motion.header
          className="px-6 pt-12 pb-6"
          variants={pageItem}
        >
          <div className="flex items-center justify-between">
            {/* User Info - Top Left */}
            <div className="flex items-center">
              {/* Profile Avatar - Clickable with edit functionality */}
              <div className="ml-3">
                <Avatar 
                  size="md" 
                  onClick={handleAvatarClick}
                  className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                />
              </div>

              {/* User Name */}
              <div>
                <h2 className={cn(
                  'text-base font-bold text-foreground',
                  'font-persian'
                )}>
                  {user?.name || 'کاربر عزیز'}
                </h2>
                
              </div>
            </div>

            {/* Settings Icon - Top Right */}
            <motion.button
              onClick={handleSettingsClick}
              className={cn(
                'w-10 h-10 rounded-full bg-soft-white border border-soft-neutral-200',
                'flex items-center justify-center',
                'transition-colors hover:bg-soft-neutral-50'
              )}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">⚙️</span>
            </motion.button>
          </div>
        </motion.header>



        {/* User Statistics - Primary Focus */}
        <motion.div
          className="px-4 mb-8 mt-6"
          variants={pageItem}
        >
          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            {/* Streak */}
            <div className={cn('bg-white rounded-2xl py-4 px-5', 'border-2 border-[#D3D3D3]', 'shadow-sm')}>
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">🔥</div>
                <div className={cn('text-3xl font-bold text-black', 'font-sans leading-none')}>405</div>
                <div className={cn('text-sm text-gray-600 font-medium mt-2', 'font-persian')}>پیوستگی</div>
              </div>
            </div>

            {/* XP */}
            <div className={cn('bg-white rounded-2xl py-4 px-5', 'border-2 border-[#D3D3D3]', 'shadow-sm')}>
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">✨</div>
                <div className={cn('text-3xl font-bold text-black', 'font-sans leading-none')}>1250</div>
                <div className={cn('text-sm text-gray-600 font-medium mt-2', 'font-persian')}>امتیاز</div>
              </div>
            </div>

            {/* Achievements */}
            <div onClick={handleAchievementsClick} className={cn('bg-white rounded-2xl py-4 px-5', 'border-2 border-[#D3D3D3]', 'shadow-sm', 'cursor-pointer', 'hover:bg-gray-50', 'transition-colors')}>
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">🏅</div>
                <div className={cn('text-3xl font-bold text-black', 'font-sans leading-none')}>12</div>
                <div className={cn('text-sm text-gray-600 font-medium mt-2', 'font-persian')}>دستاوردها</div>
              </div>
            </div>

            {/* League */}
            <div 
              onClick={() => navigate('/league')}
              className={cn('bg-white rounded-2xl py-4 px-5', 'border-2 border-[#D3D3D3]', 'shadow-sm', 'cursor-pointer', 'hover:bg-gray-50', 'transition-colors')}
            >
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">🏆</div>
                <div className={cn('text-3xl font-bold text-black', 'font-sans leading-none')}>طلا</div>
                <div className={cn('text-sm text-gray-600 font-medium mt-2', 'font-persian')}>لیگ</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Joined Groups Section */}
        <motion.div
          className="px-4 mb-8"
          variants={pageItem}
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className={cn('text-lg font-bold text-foreground', 'font-persian')}>
              گروه‌های من
            </h2>
            <button className={cn('text-sm font-medium text-primary-600 hover:underline', 'font-persian')}>
              مشاهده همه
            </button>
          </div>
          <div className="space-y-3">
            {/* Group Item 1 */}
            <div className={cn('bg-white rounded-2xl p-4 flex items-center gap-4', 'border-2 border-soft-neutral-200 shadow-sm', 'hover:bg-soft-neutral-50 transition-colors cursor-pointer')}>
              <div className="bg-primary-100 text-primary-600 rounded-full h-12 w-12 flex-shrink-0 flex items-center justify-center text-2xl">📚</div>
              <div className="flex-grow">
                <p className="font-bold text-foreground font-persian">کتاب‌خواران حرفه‌ای</p>
                <p className="text-sm text-muted-foreground font-persian">۱۴ عضو</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </div>
            {/* Group Item 2 */}
            <div className={cn('bg-white rounded-2xl p-4 flex items-center gap-4', 'border-2 border-soft-neutral-200 shadow-sm', 'hover:bg-soft-neutral-50 transition-colors cursor-pointer')}>
              <div className="bg-green-100 text-green-600 rounded-full h-12 w-12 flex-shrink-0 flex items-center justify-center text-2xl">🧠</div>
              <div className="flex-grow">
                <p className="font-bold text-foreground font-persian">عاشقان فلسفه</p>
                <p className="text-sm text-muted-foreground font-persian">۸ عضو</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </div>
            {/* Group Item 3 */}
            <div className={cn('bg-white rounded-2xl p-4 flex items-center gap-4', 'border-2 border-soft-neutral-200 shadow-sm', 'hover:bg-soft-neutral-50 transition-colors cursor-pointer')}>
              <div className="bg-red-100 text-red-600 rounded-full h-12 w-12 flex-shrink-0 flex items-center justify-center text-2xl">📜</div>
              <div className="flex-grow">
                <p className="font-bold text-foreground font-persian">باشگاه رمان‌های کلاسیک</p>
                <p className="text-sm text-muted-foreground font-persian">۲۱ عضو</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* Avatar Selection Modal */}
      <AvatarSelector
        isOpen={showAvatarSelector}
        onClose={handleCloseAvatarSelector}
      />

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Confirmation Modal */}
            <motion.div
              className={cn(
                'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50',
                'bg-soft-white rounded-card p-6 mx-6',
                'border border-soft-neutral-200 shadow-xl',
                'max-w-sm w-full'
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              dir="rtl"
            >
              <p className={cn(
                'text-base text-foreground text-center mb-6',
                'font-persian'
              )}>
                آیا مطمئن هستید که می‌خواهید خارج شوید؟
              </p>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={cancelLogout}
                  className={cn(
                    'flex-1 font-persian',
                    'text-muted hover:bg-soft-neutral-100'
                  )}
                >
                  انصراف
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleLogout}
                  className={cn(
                    'flex-1 font-persian',
                    'bg-destructive hover:bg-red-600'
                  )}
                >
                  خروج
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;
