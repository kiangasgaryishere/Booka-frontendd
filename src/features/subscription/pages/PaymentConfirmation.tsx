import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';

interface PaymentConfirmationProps {
  className?: string;
}

const planDetails: { [key: string]: { name: string; price: string } } = {
  '1-month': { name: 'اشتراک یک ماهه', price: '۸۹,۰۰۰ تومان' },
  '3-month': { name: 'اشتراک سه ماهه', price: '۵۹,۰۰۰ تومان' },
  '12-month': { name: 'اشتراک یکساله', price: '۴۹,۰۰۰ تومان' },
};

const PaymentConfirmation = ({ className }: PaymentConfirmationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { planId } = location.state || { planId: '1-month' }; // Default to 1-month plan if state is not passed

  const selectedPlan = planDetails[planId];

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePayment = () => {
    alert('در حال انتقال به درگاه پرداخت...');
  };

  return (
    <div className={cn('min-h-screen bg-gray-50 font-persian relative', className)}>
      {/* Back Button */}
      <button onClick={handleGoBack} className="absolute top-4 right-4 p-2 z-10">
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      <main className="p-4 max-w-md mx-auto pt-16">
        <div className="text-center my-8">
            <div className="inline-block bg-gray-100 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{`خرید ${selectedPlan.name}`}</h2>
        </div>

        {/* Payment Details */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-5 mb-6">
            <div className="flex justify-between items-center text-gray-700">
                <p>قیمت</p>
                <p className="font-semibold">{selectedPlan.price}</p>
            </div>
            <div className="flex justify-between items-center text-gray-800 font-bold text-lg">
                <p>کل مبلغ قابل پرداخت</p>
                <p>{selectedPlan.price}</p>
            </div>
        </div>

        {/* Notice */}
        <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 mb-8">
            <h4 className="font-bold text-yellow-800">توجه!</h4>
            <p className="text-yellow-700 mt-1">
            قبل از کلیک روی دکمه پرداخت از خاموش بودن فیلترشکن خود به منظور عدم اختلال در کارکرد صفحه بانک اطمینان حاصل کنید!
            </p>
        </div>

        {/* CTA Button */}
        <button 
          onClick={handlePayment}
          className="w-full bg-primary-500 text-white font-bold py-4 rounded-lg hover:bg-primary-600 transition-colors text-lg"
        >
          پرداخت
        </button>

        {/* Footer Guarantee */}
        <div className="text-center mt-8 flex items-center justify-center text-gray-500">
            <svg className="w-5 h-5 text-blue-500 ml-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            <p className="text-sm">اگر به هر دلیلی از خرید منصرف شدید، وجه پرداختی بازگردانده می‌شود.</p>
        </div>
      </main>
    </div>
  );
};

export default PaymentConfirmation;
