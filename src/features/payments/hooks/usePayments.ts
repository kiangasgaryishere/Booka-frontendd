import { useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  planName: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
  currency: string;
  description?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  popular?: boolean;
  recommended?: boolean;
  description: string;
  maxBooks?: number;
  supportType: string;
}

export interface Subscription {
  planId: string;
  planName: string;
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  nextBillingDate?: string;
  billingCycle: 'monthly' | 'yearly';
  amount: number;
}

export const usePayments = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 99000,
      planName: 'پلن طلایی',
      paymentMethod: 'کارت بانکی',
      status: 'completed',
      currency: 'تومان',
      description: 'تمدید اشتراک سالانه'
    },
    {
      id: '2',
      date: '2023-12-15',
      amount: 49000,
      planName: 'پلن نقره‌ای',
      paymentMethod: 'کیف پول',
      status: 'completed',
      currency: 'تومان',
      description: 'ارتقا از پلن پایه'
    },
    {
      id: '3',
      date: '2023-11-20',
      amount: 29000,
      planName: 'پلن برنزی',
      paymentMethod: 'کارت بانکی',
      status: 'failed',
      currency: 'تومان',
      description: 'خرید اولیه اشتراک'
    },
    {
      id: '4',
      date: '2023-10-10',
      amount: 19000,
      planName: 'پلن پایه',
      paymentMethod: 'کارت بانکی',
      status: 'completed',
      currency: 'تومان',
      description: 'اولین خرید'
    }
  ];

  const mockPlans: Plan[] = [
    {
      id: 'basic',
      name: 'پلن پایه',
      price: { monthly: 19000, yearly: 190000 },
      description: 'برای شروع مطالعه',
      maxBooks: 100,
      supportType: 'ایمیل',
      features: [
        'دسترسی به ۱۰۰ کتاب',
        'پشتیبانی ایمیل',
        'گزارش پیشرفت پایه',
        'دسترسی موبایل',
        'یادداشت‌برداری ساده'
      ]
    },
    {
      id: 'silver',
      name: 'پلن نقره‌ای',
      price: { monthly: 49000, yearly: 490000 },
      description: 'برای مطالعه منظم',
      popular: true,
      maxBooks: 500,
      supportType: 'چت زنده',
      features: [
        'دسترسی به ۵۰۰ کتاب',
        'پشتیبانی چت زنده',
        'گزارش پیشرفت کامل',
        'دسترسی آفلاین',
        'گروه‌های مطالعه',
        'یادداشت‌برداری پیشرفته',
        'نشانک‌گذاری هوشمند'
      ]
    },
    {
      id: 'gold',
      name: 'پلن طلایی',
      price: { monthly: 99000, yearly: 990000 },
      description: 'برای مطالعه حرفه‌ای',
      recommended: true,
      supportType: 'پشتیبانی اولویت‌دار',
      features: [
        'دسترسی نامحدود به کتاب‌ها',
        'پشتیبانی اولویت‌دار ۲۴/۷',
        'تحلیل هوشمند مطالعه',
        'دسترسی به کتاب‌های صوتی',
        'مربی شخصی',
        'گروه‌های VIP',
        'دانلود نامحدود',
        'محتوای اختصاصی',
        'گزارش‌های تفصیلی',
        'API دسترسی برای توسعه‌دهندگان'
      ]
    }
  ];

  const mockSubscription: Subscription = {
    planId: 'gold',
    planName: 'پلن طلایی',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    nextBillingDate: '2025-01-15',
    billingCycle: 'yearly',
    amount: 990000
  };

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setTransactions(mockTransactions);
        setPlans(mockPlans);
        setCurrentSubscription(mockSubscription);
        setError(null);
      } catch (err) {
        setError('خطا در بارگذاری اطلاعات');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const purchasePlan = async (planId: string, billingCycle: 'monthly' | 'yearly') => {
    try {
      setLoading(true);
      
      // Simulate API call for purchase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const plan = plans.find(p => p.id === planId);
      if (!plan) throw new Error('پلن یافت نشد');

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        amount: plan.price[billingCycle],
        planName: plan.name,
        paymentMethod: 'کارت بانکی',
        status: 'completed',
        currency: 'تومان',
        description: `خرید ${plan.name} - ${billingCycle === 'monthly' ? 'ماهانه' : 'سالانه'}`
      };

      setTransactions(prev => [newTransaction, ...prev]);
      
      // Update subscription
      const newSubscription: Subscription = {
        planId,
        planName: plan.name,
        status: 'active',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + (billingCycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        nextBillingDate: new Date(Date.now() + (billingCycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        billingCycle,
        amount: plan.price[billingCycle]
      };

      setCurrentSubscription(newSubscription);
      
      return { success: true, transaction: newTransaction };
    } catch (err) {
      setError('خطا در خرید پلن');
      return { success: false, error: 'خطا در خرید پلن' };
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async () => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (currentSubscription) {
        setCurrentSubscription({
          ...currentSubscription,
          status: 'cancelled'
        });
      }
      
      return { success: true };
    } catch (err) {
      setError('خطا در لغو اشتراک');
      return { success: false, error: 'خطا در لغو اشتراک' };
    } finally {
      setLoading(false);
    }
  };

  const exportTransactions = (format: 'csv' | 'pdf' = 'csv') => {
    try {
      if (format === 'csv') {
        const csvContent = [
          ['تاریخ', 'مبلغ', 'پلن', 'روش پرداخت', 'وضعیت', 'توضیحات'].join(','),
          ...transactions.map(t => [
            new Date(t.date).toLocaleDateString('fa-IR'),
            t.amount.toString(),
            t.planName,
            t.paymentMethod,
            t.status === 'completed' ? 'تکمیل شده' : t.status === 'pending' ? 'در انتظار' : 'ناموفق',
            t.description || ''
          ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `payment-history-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
      }
      
      return { success: true };
    } catch (err) {
      setError('خطا در دانلود فایل');
      return { success: false, error: 'خطا در دانلود فایل' };
    }
  };

  const getDiscountPercentage = (billingCycle: 'monthly' | 'yearly', plan: Plan) => {
    if (billingCycle === 'yearly') {
      const monthlyTotal = plan.price.monthly * 12;
      const yearlyPrice = plan.price.yearly;
      return Math.round(((monthlyTotal - yearlyPrice) / monthlyTotal) * 100);
    }
    return 0;
  };

  return {
    transactions,
    plans,
    currentSubscription,
    loading,
    error,
    purchasePlan,
    cancelSubscription,
    exportTransactions,
    getDiscountPercentage
  };
};
