import { motion } from 'framer-motion';
import { CheckCircle, Star } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Plan } from '../hooks/usePayments';

interface PlanCardProps {
  plan: Plan;
  billingCycle: 'monthly' | 'yearly';
  isSelected: boolean;
  onSelect: (planId: string) => void;
  discountPercentage?: number;
  className?: string;
}

const PlanCard = ({ 
  plan, 
  billingCycle, 
  isSelected, 
  onSelect, 
  discountPercentage = 0,
  className 
}: PlanCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative bg-white rounded-xl p-6 shadow-sm border-2 transition-all cursor-pointer",
        isSelected
          ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
          : "border-transparent hover:border-gray-200 hover:shadow-md",
        className
      )}
      onClick={() => onSelect(plan.id)}
    >
      {/* Badges */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {plan.popular && (
          <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            محبوب
          </span>
        )}
        {plan.recommended && (
          <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
            <Star className="w-3 h-3" />
            پیشنهادی
          </span>
        )}
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {plan.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {plan.description}
        </p>
        
        {/* Pricing */}
        <div className="mb-4">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(plan.price[billingCycle])}
          </span>
          <span className="text-gray-600 mr-2">
            تومان / {billingCycle === 'monthly' ? 'ماه' : 'سال'}
          </span>
        </div>
        
        {/* Discount Info */}
        {billingCycle === 'yearly' && discountPercentage > 0 && (
          <div className="bg-green-50 text-green-700 text-sm px-3 py-2 rounded-lg mb-4">
            <p className="font-medium">
              {discountPercentage}% تخفیف نسبت به پرداخت ماهانه
            </p>
            <p className="text-xs mt-1">
              صرفه‌جویی: {formatPrice((plan.price.monthly * 12) - plan.price.yearly)} تومان
            </p>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">پشتیبانی</p>
            <p className="font-medium text-gray-900">{plan.supportType}</p>
          </div>
          {plan.maxBooks && (
            <div>
              <p className="text-gray-500 mb-1">تعداد کتاب</p>
              <p className="font-medium text-gray-900">
                {plan.maxBooks === Infinity ? 'نامحدود' : plan.maxBooks.toLocaleString('fa-IR')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-5 rounded-xl pointer-events-none" />
      )}
      
      {/* Selection Checkmark */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PlanCard;
