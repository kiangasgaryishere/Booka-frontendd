import { motion } from 'framer-motion';
import { useAuth } from '@/features/authentication/contexts/AuthContext';
import Dana from '@/components/mascot/Dana';
import BottomNavigation from '@/components/ui/BottomNavigation';
import { cn } from '@/utils/cn';
import { pageContainer, pageItem } from '@/utils/animations';

interface DashboardPageProps {
  className?: string;
}

const DashboardPage = ({ className }: DashboardPageProps) => {
  const { user } = useAuth();

  return (
    <div className={cn('min-h-screen bg-background', className)} dir="rtl">
      {/* Main content */}
      <motion.div
        className="pb-20" // Bottom padding to account for navigation
        variants={pageContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header
          className="px-6 pt-12 pb-8"
          variants={pageItem}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={cn(
                'text-2xl font-bold text-foreground mb-2',
                'font-persian'
              )}>
                سلام {user?.name || 'کاربر عزیز'}! 👋
              </h1>
              <p className={cn(
                'text-muted text-sm',
                'font-persian'
              )}>
                آماده یادگیری جدید هستید؟
              </p>
            </div>
            <Dana size="md" animated={false} />
          </div>
        </motion.header>

        {/* Welcome Section - Minimalistic */}
        <motion.div
          className="px-6 mb-12"
          variants={pageItem}
        >
          <div className="text-center">
            <h2 className={cn(
              'text-lg font-medium text-foreground mb-3',
              'font-persian'
            )}>
              به بوکا خوش آمدید!
            </h2>
            <p className={cn(
              'text-muted text-sm mb-6',
              'font-persian leading-relaxed'
            )}>
              شما با موفقیت وارد شدید. حالا می‌توانید شروع به یادگیری کنید.
            </p>
            <button
              type="button"
              className={cn(
                'bg-primary-500 text-white px-6 py-3 rounded-lg',
                'text-sm font-medium font-persian',
                'hover:bg-primary-600 transition-colors'
              )}
            >
              شروع مطالعه
            </button>
          </div>
        </motion.div>

        {/* Quick Stats - Minimalistic Style */}
        <motion.div
          className="px-6 mb-12"
          variants={pageItem}
        >
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className={cn(
                'text-3xl font-bold text-foreground mb-1',
                'font-sans'
              )}>
                ۰
              </div>
              <div className={cn(
                'text-sm text-muted',
                'font-persian'
              )}>
                کتاب مطالعه شده
              </div>
            </div>
            <div className="text-center">
              <div className={cn(
                'text-3xl font-bold text-foreground mb-1',
                'font-sans'
              )}>
                ۰
              </div>
              <div className={cn(
                'text-sm text-muted',
                'font-persian'
              )}>
                دقیقه مطالعه
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recommended Books Section - Minimalistic */}
        <motion.div
          className="px-6 mb-8"
          variants={pageItem}
        >
          <h3 className={cn(
            'text-base font-medium text-foreground mb-6',
            'font-persian'
          )}>
            کتاب‌های پیشنهادی
          </h3>
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📖</div>
            <p className={cn(
              'text-muted text-sm',
              'font-persian'
            )}>
              به زودی کتاب‌های جدید اضافه خواهند شد
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default DashboardPage;
