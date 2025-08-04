import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  AlertTriangle,
  X,
  Calendar,
  CreditCard,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Subscription } from '../hooks/usePayments';

interface SubscriptionStatusProps {
  subscription: Subscription | null;
  onCancel?: () => void;
  onRenew?: () => void;
  className?: string;
}

const SubscriptionStatus = ({ 
  subscription, 
  onCancel, 
  onRenew, 
  className 
}: SubscriptionStatusProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  const getStatusInfo = (status: Subscription['status']) => {
    switch (status) {
      case 'active':
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          text: 'فعال',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'expired':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
          text: 'منقضی شده',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200'
        };
      case 'cancelled':
        return {
          icon: <X className="w-6 h-6 text-red-500" />,
          text: 'لغو شده',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
    }
  };

  const getDaysUntilExpiry = () => {
    if (!subscription?.endDate) return 0;
    const today = new Date();
    const endDate = new Date(subscription.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (!subscription) {
    return (
      <div className={cn("bg-white rounded-xl p-6 shadow-sm border border-gray-200", className)}>
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <CreditCard className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            هیچ اشتراک فعالی ندارید
          </h3>
          <p className="text-gray-600 mb-4">
            برای استفاده از امکانات کامل، یکی از پلن‌ها را انتخاب کنید
          </p>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(subscription.status);
  const daysUntilExpiry = getDaysUntilExpiry();
  const isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm border-2",
        statusInfo.borderColor,
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {statusInfo.icon}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              وضعیت اشتراک فعلی
            </h2>
            <p className={cn("text-sm font-medium", statusInfo.color)}>
              {statusInfo.text}
            </p>
          </div>
        </div>
        
        {subscription.status === 'active' && isExpiringSoon && (
          <div className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-medium">
            {daysUntilExpiry} روز تا انقضا
          </div>
        )}
      </div>

      {/* Subscription Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={cn("text-center p-4 rounded-lg", statusInfo.bgColor)}>
          <p className="text-sm text-gray-600 mb-1">پلن فعلی</p>
          <p className="text-lg font-semibold text-gray-900">
            {subscription.planName}
          </p>
        </div>
        
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">
            {subscription.status === 'active' ? 'تاریخ تمدید' : 'تاریخ انقضا'}
          </p>
          <p className="text-lg font-semibold text-blue-600">
            {formatDate(subscription.endDate)}
          </p>
        </div>
        
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">
            {subscription.billingCycle === 'monthly' ? 'مبلغ ماهانه' : 'مبلغ سالانه'}
          </p>
          <p className="text-lg font-semibold text-purple-600">
            {formatPrice(subscription.amount)} تومان
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">تاریخ شروع:</span>
          <span className="font-medium">{formatDate(subscription.startDate)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">دوره پرداخت:</span>
          <span className="font-medium">
            {subscription.billingCycle === 'monthly' ? 'ماهانه' : 'سالانه'}
          </span>
        </div>
      </div>

      {/* Next Billing Info */}
      {subscription.status === 'active' && subscription.nextBillingDate && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-5 h-5 text-blue-500" />
            <h4 className="font-medium text-blue-900">پرداخت بعدی</h4>
          </div>
          <p className="text-sm text-blue-700">
            مبلغ {formatPrice(subscription.amount)} تومان در تاریخ {formatDate(subscription.nextBillingDate)} از حساب شما کسر خواهد شد.
          </p>
        </div>
      )}

      {/* Expiry Warning */}
      {subscription.status === 'active' && isExpiringSoon && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h4 className="font-medium text-orange-900">هشدار انقضا</h4>
          </div>
          <p className="text-sm text-orange-700">
            اشتراک شما در {daysUntilExpiry} روز آینده منقضی خواهد شد. برای ادامه استفاده از خدمات، اشتراک خود را تمدید کنید.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {subscription.status === 'active' && onCancel && (
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            لغو اشتراک
          </button>
        )}
        
        {(subscription.status === 'expired' || subscription.status === 'cancelled') && onRenew && (
          <button
            onClick={onRenew}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            تمدید اشتراک
          </button>
        )}
        
        {subscription.status === 'active' && (isExpiringSoon || subscription.billingCycle === 'monthly') && onRenew && (
          <button
            onClick={onRenew}
            className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            ارتقا پلن
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default SubscriptionStatus;
