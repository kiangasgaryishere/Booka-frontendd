import { motion } from 'framer-motion';
import BottomNavigation from '@/components/ui/BottomNavigation';
import { cn } from '@/utils/cn';
import { pageContainer, pageItem } from '@/utils/animations';

interface ReadingPageProps {
  className?: string;
}

const ReadingPage = ({ className }: ReadingPageProps) => {
  return (
    <div className={cn('min-h-screen bg-background', className)} dir="rtl">
      <motion.div
        className="pb-20"
        variants={pageContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.header
          className="px-6 pt-12 pb-8"
          variants={pageItem}
        >
          <h1 className={cn(
            'text-2xl font-bold text-foreground',
            'font-persian'
          )}>
            مطالعه 📖
          </h1>
        </motion.header>

        <motion.div
          className="px-6"
          variants={pageItem}
        >
          <div className={cn(
            'bg-soft-white rounded-card p-8',
            'border border-soft-neutral-200',
            'text-center'
          )}>
            <div className="text-6xl mb-4">📖</div>
            <h2 className={cn(
              'text-lg font-bold text-foreground mb-2',
              'font-persian'
            )}>
              شروع مطالعه
            </h2>
            <p className={cn(
              'text-muted text-sm',
              'font-persian'
            )}>
              اینجا می‌توانید کتاب‌ها را مطالعه کنید و آزمون بدهید
            </p>
          </div>
        </motion.div>
      </motion.div>

      <BottomNavigation />
    </div>
  );
};

export default ReadingPage;
