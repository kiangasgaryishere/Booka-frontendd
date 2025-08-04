import { motion } from 'framer-motion';
import BottomNavigation from '@/components/ui/BottomNavigation';
import { cn } from '@/utils/cn';
import { pageContainer, pageItem } from '@/utils/animations';
import { Trophy, Clock, Users } from 'lucide-react';

interface GroupPageProps {
  className?: string;
}

// Mock leaderboard data - in real app this would come from API
const leaderboardData = [
  { rank: 1, name: 'آناپرا', xp: 1612, avatar: '👤', isCurrentUser: false },
  { rank: 2, name: 'پی:زدزدای', xp: 602, avatar: '👤', isCurrentUser: false },
  { rank: 3, name: 'توی لاو', xp: 486, avatar: '👤', isCurrentUser: false },
  { rank: 4, name: 'جودی', xp: 486, avatar: '👤', isCurrentUser: true }, // Current user
  { rank: 5, name: 'منسی', xp: 375, avatar: '👤', isCurrentUser: false },
  { rank: 6, name: 'رونگ ترن ون', xp: 318, avatar: '👤', isCurrentUser: false },
  { rank: 7, name: 'الکساندر', xp: 317, avatar: '👤', isCurrentUser: false },
];

const GroupPage = ({ className }: GroupPageProps) => {
  return (
    <div className={cn('min-h-screen bg-gray-50', className)} dir="rtl">
      <motion.div
        className="pb-20"
        variants={pageContainer}
        initial="hidden"
        animate="visible"
      >
        {/* League Header */}
        <motion.div
          className="bg-white px-6 pt-12 pb-6"
          variants={pageItem}
        >
          {/* League Badges Row */}
          <div className="flex justify-center items-center gap-3 mb-6">
            {/* Previous leagues - grayed out */}
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center opacity-50">
              <Trophy className="w-6 h-6 text-gray-400" />
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center opacity-50">
              <Trophy className="w-6 h-6 text-gray-400" />
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center opacity-50">
              <Trophy className="w-6 h-6 text-gray-400" />
            </div>
            
            {/* Current Bronze League - highlighted */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-amber-200 to-amber-300 flex items-center justify-center border-2 border-amber-400 shadow-lg">
              <Trophy className="w-8 h-8 text-amber-700" />
            </div>
            
            {/* Future leagues - grayed out */}
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center opacity-50">
              <Trophy className="w-6 h-6 text-gray-400" />
            </div>
          </div>

          {/* League Title and Info */}
          <div className="text-center">
            <h1 className={cn('text-2xl font-bold text-gray-800 mb-2', 'font-persian')}>لیگ برنز</h1>
            <p className={cn('text-gray-600 text-sm mb-3', 'font-persian')}>۲۰ نفر برتر به لیگ بعدی صعود می‌کنند</p>
            <div className="flex items-center justify-center gap-1 text-amber-600">
              <Clock className="w-4 h-4" />
              <span className={cn('text-sm font-medium', 'font-persian')}>۳ روز</span>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          className="px-6"
          variants={pageItem}
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {leaderboardData.map((player) => (
              <div
                key={player.rank}
                className={cn(
                  'flex items-center px-4 py-4 border-b border-gray-100 last:border-b-0',
                  player.isCurrentUser && 'bg-green-50 border-green-200'
                )}
              >
                {/* Rank - Far right in RTL */}
                <div className="w-8 text-center">
                  <span className={cn(
                    'text-lg font-semibold',
                    player.isCurrentUser ? 'text-green-600' : 'text-gray-600'
                  )}>
                    {player.rank}
                  </span>
                </div>

                {/* League Badge */}
                <div className="mx-3">
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center',
                    player.rank <= 3 
                      ? 'bg-gradient-to-b from-amber-200 to-amber-300 border border-amber-400'
                      : 'bg-gradient-to-b from-gray-200 to-gray-300 border border-gray-400'
                  )}>
                    <Trophy className={cn(
                      'w-4 h-4',
                      player.rank <= 3 ? 'text-amber-700' : 'text-gray-600'
                    )} />
                  </div>
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ml-3">
                  <span className="text-lg">{player.avatar}</span>
                </div>

                {/* Name - Right side in RTL */}
                <div className="flex-1">
                  <span className={cn(
                    'font-medium font-persian',
                    player.isCurrentUser ? 'text-green-700' : 'text-gray-800'
                  )}>
                    {player.name}
                  </span>
                </div>

                {/* XP - Left side in RTL */}
                <div className="text-left">
                  <span className={cn(
                    'text-sm font-semibold font-persian',
                    player.isCurrentUser ? 'text-green-600' : 'text-gray-600'
                  )}>
                    {player.xp} امتیاز
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <Users className="w-4 h-4" />
              <span className="font-persian">شما در حال حاضر رتبه ۴ از ۵۰ بازیکن هستید</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <BottomNavigation />
    </div>
  );
};

export default GroupPage;
