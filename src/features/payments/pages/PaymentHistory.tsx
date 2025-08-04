import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { usePayments } from '../hooks/usePayments';
import TransactionList from '../components/TransactionList';
import BottomNavigation from '@/components/ui/BottomNavigation';

interface PaymentHistoryProps {
  className?: string;
}

const PaymentHistory = ({ className }: PaymentHistoryProps) => {
  const {
    transactions,
    error,
  } = usePayments();
  
  const navigate = useNavigate();
  
  // Calculate total amount of completed transactions
  const totalAmount = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Calculate total number of completed transactions
  const completedTransactions = transactions.filter(t => t.status === 'completed').length;

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Remove loading state entirely
  if (error) {
    return (
      <div className={cn("min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center", className)}>
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-6"
      >
        {/* Back Button */}
        <div className="mb-6">
          <button 
            type="button" 
            aria-label="بازگشت" 
            onClick={handleGoBack}
            className="p-2 hover:opacity-70 transition-opacity"
          >
            <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
            </svg>
          </button>
        </div>

        {/* Page Title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            تاریخچه پرداخت
          </h1>
          <p className="text-muted text-sm">
            مشاهده سوابق پرداخت و خریدهای شما
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="flex flex-row gap-4 mb-8">
          <div className="bg-soft-white rounded-card p-4 border border-soft-neutral-200 flex-1">
            <h3 className="text-lg font-bold text-foreground mb-1 font-persian">
              مقدار پرداخت شده کل
            </h3>
            <p className="text-xl font-bold text-primary-600 font-persian">
              {new Intl.NumberFormat('fa-IR').format(totalAmount)} تومان
            </p>
            <p className="text-muted text-xs mt-1 font-persian">
              در مجموع
            </p>
          </div>
          <div className="bg-soft-white rounded-card p-4 border border-soft-neutral-200 flex-1">
            <h3 className="text-lg font-bold text-foreground mb-1 font-persian">
              تعداد تراکنش‌های موفق
            </h3>
            <p className="text-2xl font-bold text-primary-600 font-persian">
              {completedTransactions}
            </p>
            <p className="text-muted text-xs mt-1 font-persian">
              تراکنش
            </p>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <TransactionList 
            transactions={transactions}
          />
        </div>
      </motion.div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default PaymentHistory;
