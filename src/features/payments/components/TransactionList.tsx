import { motion } from 'framer-motion';
import { 
  Calendar, 
  CreditCard,
  CheckCircle,
  X,
  Clock
} from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Transaction } from '../hooks/usePayments';

interface TransactionListProps {
  transactions: Transaction[];
  className?: string;
}

const TransactionList = ({ transactions, className }: TransactionListProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <X className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'تکمیل شده';
      case 'pending':
        return 'در انتظار';
      case 'failed':
        return 'ناموفق';
    }
  };

  if (transactions.length === 0) {
    return (
      <div className={cn("bg-white rounded-xl shadow-sm p-8 text-center", className)}>
        <div className="text-gray-400 mb-4">
          <CreditCard className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          هیچ تراکنشی یافت نشد
        </h3>
        <p className="text-gray-600">
          تاریخچه پرداخت‌های شما در اینجا نمایش داده خواهد شد
        </p>
      </div>
    );
  }

  return (
    <div className={cn("bg-white rounded-xl shadow-sm overflow-hidden", className)}>
      {/* Transaction List */}
      <div className="divide-y divide-gray-200">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 border-b border-gray-100 last:border-b-0 hover:bg-blue-50/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(transaction.status)}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-lg font-bold text-gray-900 truncate">
                    {transaction.planName}
                  </h4>
                  {transaction.description && (
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {transaction.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4" />
                      {new Date(transaction.date).toLocaleDateString('fa-IR')}
                    </span>
                    <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                      <CreditCard className="w-4 h-4" />
                      شناسه تراکنش: {transaction.id}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-left flex-shrink-0 mr-4">
                <p className="text-xl font-bold text-gray-900">
                  {formatPrice(transaction.amount)} {transaction.currency}
                </p>
                <p className={cn("text-sm font-bold mt-2 px-3 py-1 rounded-full inline-block", 
                  transaction.status === 'completed' ? "bg-green-100 text-green-800" :
                  transaction.status === 'pending' ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800")}>
                  {getStatusText(transaction.status)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
