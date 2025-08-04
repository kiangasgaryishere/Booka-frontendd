import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';

const achievements = [
  { icon: '🌱', title: 'کاشتن اولین بذر', description: 'اولین کتاب خود را شروع کنید', unlocked: true },
  { icon: '🔥', title: 'آتش افروز', description: 'حفظ پیوستگی برای ۳ روز', unlocked: true },
  { icon: '🌟', title: 'ستاره درخشان', description: 'رسیدن به امتیاز ۱۰۰۰', unlocked: true },
  { icon: '🦉', title: 'جغد شب', description: 'مطالعه بعد از ساعت ۱۰ شب', unlocked: false },
  { icon: '☀️', title: 'سحرخیز', description: 'مطالعه قبل از ساعت ۸ صبح', unlocked: false },
  { icon: '📚', title: 'کتابخانه کوچک', description: 'تمام کردن ۱۰ کتاب', unlocked: false },
  { icon: '🏆', title: 'قهرمان لیگ', description: 'قرار گرفتن در لیگ طلا', unlocked: false },
];

const AchievementsPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={cn('min-h-screen bg-background pb-20')} dir="rtl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="absolute top-4 right-4 z-10">
          <button onClick={handleGoBack} className="p-2 hover:opacity-70 transition-opacity">
            <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">دستاوردها</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'rounded-2xl p-5 text-center transition-all duration-300',
                achievement.unlocked ? 'bg-white border-2 border-yellow-400 shadow-lg' : 'bg-gray-100 border-2 border-gray-300'
              )}
            >
              <div className={cn('text-6xl mb-4', !achievement.unlocked && 'opacity-40 filter grayscale')}>
                {achievement.icon}
              </div>
              <h3 className={cn('text-lg font-bold mb-1', achievement.unlocked ? 'text-foreground' : 'text-gray-600')}>
                {achievement.title}
              </h3>
              <p className={cn('text-sm', achievement.unlocked ? 'text-muted-foreground' : 'text-gray-500')}>
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementsPage;
