import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PremiumSubscriptionProps {
  className?: string;
}

interface PlanProps {
  id: string;
  title: string;
  price: string;
  subtitle?: string;
  isPopular?: boolean;
  onSelect: (id: string) => void;
}

const Feature = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="text-center">
    <div className="inline-block bg-primary-100 p-3 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed px-4">
      {description}
    </p>
  </div>
);

const Plan = ({ id, title, price, subtitle, isPopular, onSelect }: PlanProps) => (
  <div 
    onClick={() => onSelect(id)}
    className='p-4 border rounded-lg cursor-pointer transition-all bg-white border-gray-200 hover:border-primary-500 hover:bg-primary-50 relative h-28 flex flex-col justify-center'
  >
    {isPopular && <div className="absolute -top-3 left-4 bg-[#fea14c] text-white text-xs font-bold px-3 py-1 rounded-full">محبوب ترین</div>}
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-bold text-gray-800">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center">
        <p className="font-bold text-lg text-primary-600 ml-4">{price}</p>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    </div>
  </div>
);

const PremiumSubscription = ({ className }: PremiumSubscriptionProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePlanSelect = (planId: string) => {
    navigate('/payment-confirmation', { state: { planId } });
  };

  return (
    <div className={cn('min-h-screen bg-gray-50 font-persian relative', className)}>
      {/* Back Button */}
      <button onClick={handleGoBack} className="absolute top-6 right-4 p-2 z-10">
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      <main className="p-4 pt-20">
        {/* Subscription Plans */}
        <div className="space-y-4 mb-12">
          <Plan id="1-month" title="اشتراک یک ماهه" price="۸۹,۰۰۰ تومان" onSelect={handlePlanSelect} />
          <Plan id="3-month" title="اشتراک سه ماهه" price="۵۹,۰۰۰ تومان" subtitle="ماهانه" isPopular onSelect={handlePlanSelect} />
          <Plan id="12-month" title="اشتراک یکساله" price="۴۹,۰۰۰ تومان" subtitle="ماهانه" onSelect={handlePlanSelect} />
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">مزایای خرید بوکا</h2>
        </div>

        <div className="space-y-10 mb-12">
          <Feature 
            icon={<svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path></svg>}
            title="دسترسی نامحدود به کلیه کتاب‌ها"
            description="با خرید اشتراک می‌توانید به خلاصه فارسی صدها کتاب دسترسی داشته باشید و کتابخانه شخصی خود را بسازید."
          />
          <Feature 
            icon={<svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v4.303"></path></svg>}
            title="دسترسی به فایل‌های صوتی"
            description="شما می‌توانید خلاصه کتاب‌های ارزشمند دنیا را با روایت بهترین گوینده‌ها از اپلیکیشن بوکاپو بشنوید."
          />
          <Feature 
            icon={<svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path></svg>}
            title="مطالعه آفلاین خلاصه کتاب‌ها"
            description="با استفاده از اپلیکیشن بوکاپو خلاصه متنی و صوتی کتاب‌ها را دانلود کرده و به شکل آفلاین از آنها استفاده کنید."
          />
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-10 flex justify-center items-center">
            <svg className="w-8 h-8 text-gray-800 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800">سوالات متداول</h2>
          </div>
          <div className="space-y-4">
            <AccordionItem
              question="با خرید اشتراک ویژه چه چیزی بدست می آورم؟"
              answer="با خرید اشتراک ویژه بوکا، به صدها خلاصه کتاب متنی و صوتی، کتابخانه شخصی، و امکان مطالعه آفلاین دسترسی خواهید داشت."
            />
            <AccordionItem
              question="سرویس اشتراک بوکا چطور کار میکند؟"
              answer="شما با انتخاب یکی از پلان‌های اشتراک و پرداخت هزینه، برای مدت زمان مشخص شده به تمامی امکانات ویژه اپلیکیشن دسترسی پیدا می‌کنید."
            />
            <AccordionItem
              question="چه تعداد «خلاصه کتاب» در بوکا وجود دارد؟"
              answer="در حال حاضر بیش از ۳۰۰ خلاصه کتاب در بوکا وجود دارد و این تعداد به صورت هفتگی افزایش پیدا می‌کند."
            />
            <AccordionItem
              question="شرایط گارانتی بازگشت وجه چیست؟"
              answer="در صورت عدم رضایت از سرویس تا ۷ روز پس از خرید، می‌توانید با پشتیبانی تماس گرفته و تمام وجه خود را دریافت کنید."
            />
            <AccordionItem
              question="آیا کتاب فیزیکی هم در بوکا به فروش می رسد؟"
              answer="خیر، بوکا در حال حاضر تنها در زمینه ارائه خلاصه کتاب‌های متنی و صوتی فعالیت دارد و فروش کتاب فیزیکی جزو خدمات ما نیست."
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200/80 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 text-right flex justify-between items-center hover:bg-gray-50/50 transition-colors duration-200"
      >
        <span className="font-semibold text-gray-700">{question}</span>
        <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300">
          <motion.svg
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
          </motion.svg>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-2 text-gray-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumSubscription;
