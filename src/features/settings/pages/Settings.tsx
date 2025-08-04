import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/authentication/contexts/AuthContext';
import BottomNavigation from '@/components/ui/BottomNavigation';
import { cn } from '@/utils/cn';
import { LIFE_CATEGORIES } from '@/utils/constants';
import { pageContainer, pageItem } from '@/utils/animations';
import { validateEmail, validatePhone, formatPhoneNumber } from '@/utils/validation';

interface SettingsPageProps {
  className?: string;
}

const SettingsPage = ({ className }: SettingsPageProps) => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  
  // State management
    const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingUserId, setIsEditingUserId] = useState(false);
    const [emailValue, setEmailValue] = useState(user?.email || '');
  const [phoneValue, setPhoneValue] = useState(user?.phone || '');
  const [nameValue, setNameValue] = useState(user?.name || '');
  const [userIdValue, setUserIdValue] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [customUserId, setCustomUserId] = useState(''); // Store user's custom ID
    const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSubjectsModal, setShowSubjectsModal] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [tempSelectedSubjects, setTempSelectedSubjects] = useState<string[]>([]);



  // Handle back navigation
  const handleBack = () => {
    navigate('/profile');
  };

  // Handle name editing
  const handleNameClick = () => {
    setIsEditingName(true);
    setNameValue(user?.name || '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const handleNameBlur = () => {
    const trimmedName = nameValue.trim();
    if (trimmedName && trimmedName !== user?.name) {
      updateUser({ name: trimmedName });
    }
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameBlur();
    }
    if (e.key === 'Escape') {
      setNameValue(user?.name || '');
      setIsEditingName(false);
    }
  };

    // Handle email editing
  const handleEmailClick = () => {
    setIsEditingEmail(true);
    setEmailValue(user?.email || '');
    setEmailError('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  // Handle phone editing
  const handlePhoneClick = () => {
    setIsEditingPhone(true);
    setPhoneValue(user?.phone || '');
    setPhoneError('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(e.target.value);
    if (phoneError) {
      setPhoneError('');
    }
  };

  // Validate User ID (English only)
  const validateUserId = (id: string): { isValid: boolean; error?: string } => {
    const trimmedId = id.trim();

    if (!trimmedId) {
      return { isValid: false, error: 'شناسه کاربری نمی‌تواند خالی باشد' };
    }

    // Check for English characters only (a-z, A-Z, 0-9, underscore)
    const englishOnlyRegex = /^[a-zA-Z0-9_]+$/;
    if (!englishOnlyRegex.test(trimmedId)) {
      return { isValid: false, error: 'شناسه کاربری فقط باید شامل حروف انگلیسی باشد' };
    }

    return { isValid: true };
  };

  // Handle user ID editing
  const handleUserIdClick = () => {
    setIsEditingUserId(true);
    // Remove @ symbol for editing, will be added back on display
    const currentId = getUserId().replace('@', '');
    setUserIdValue(currentId);
    setUserIdError('');
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setUserIdValue(newValue);

    // Clear error when user starts typing
    if (userIdError) {
      setUserIdError('');
    }
  };

  const handleUserIdBlur = () => {
    const validation = validateUserId(userIdValue);

    if (!validation.isValid && userIdValue.trim()) {
      setUserIdError(validation.error || 'شناسه کاربری نامعتبر است');
      return;
    }

    const trimmedId = userIdValue.trim();
    if (trimmedId && trimmedId !== getUserId().replace('@', '')) {
      // Update the custom user ID
      setCustomUserId(trimmedId);
      console.log('User ID updated to:', `@${trimmedId}`);
      // TODO: Update user ID in backend when API is available
    }

    setIsEditingUserId(false);
    setUserIdError('');
  };

  const handleUserIdKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUserIdBlur();
    }
    if (e.key === 'Escape') {
      const currentId = getUserId().replace('@', '');
      setUserIdValue(currentId);
      setIsEditingUserId(false);
      setUserIdError('');
    }
  };

    const handleEmailBlur = () => {
    const validation = validateEmail(emailValue);

    if (!validation.isValid && emailValue.trim()) {
      setEmailError(validation.error || 'ایمیل نامعتبر است');
      return;
    }

    if (validation.isValid && emailValue.trim() !== user?.email) {
      updateUser({ email: emailValue.trim() });
    }

    setIsEditingEmail(false);
    setEmailError('');
  };

  const handlePhoneBlur = () => {
    const validation = validatePhone(phoneValue);

    if (!validation.isValid && phoneValue.trim()) {
      setPhoneError(validation.error || 'شماره تلفن نامعتبر است');
      return;
    }

    if (validation.isValid && phoneValue.trim() !== user?.phone) {
      updateUser({ phone: phoneValue.trim() });
    }

    setIsEditingPhone(false);
    setPhoneError('');
  };

    const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEmailBlur();
    }
    if (e.key === 'Escape') {
      setEmailValue(user?.email || '');
      setIsEditingEmail(false);
      setEmailError('');
    }
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePhoneBlur();
    }
    if (e.key === 'Escape') {
      setPhoneValue(user?.phone || '');
      setIsEditingPhone(false);
      setPhoneError('');
    }
  };

  // Handle logout
  const handleLogout = () => {
    if (!showLogoutConfirm) {
      setShowLogoutConfirm(true);
      return;
    }

    logout();
    navigate('/welcome');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Handle premium purchase
  const handlePremiumPurchaseClick = () => {
    navigate('/premium-subscription');
  };

  const handlePaymentHistoryClick = () => {
    navigate('/payment-history');
  };



  // Handle subjects modal
  const handleSubjectsClick = () => {
    setTempSelectedSubjects([...selectedSubjects]);
    setShowSubjectsModal(true);
  };

  const handleSubjectToggle = (subjectId: string) => {
    setTempSelectedSubjects(prev => {
      const isSelected = prev.includes(subjectId);
      return isSelected
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId];
    });
  };

  const handleSubjectsSave = () => {
    setSelectedSubjects([...tempSelectedSubjects]);
    setShowSubjectsModal(false);
    console.log('Subjects updated:', tempSelectedSubjects);
    // TODO: Save to backend when API is available
  };

  const handleSubjectsCancel = () => {
    setTempSelectedSubjects([...selectedSubjects]);
    setShowSubjectsModal(false);
  };

  // Get user ID for display (custom ID takes priority)
  const getUserId = () => {
    // If user has set a custom ID, use that
    if (customUserId) {
      return `@${customUserId}`;
    }

    // Otherwise, generate a mock ID based on user data or use a placeholder
    if (user?.id) {
      return `@user${user.id.slice(-6)}`;
    }
    return '@user123456'; // Placeholder for demo
  };

  // Get display value for contact info
  

  

  // Get display text for selected subjects
  const getSubjectsDisplayText = () => {
    if (selectedSubjects.length === 0) {
      return 'هیچ موضوعی انتخاب نشده';
    } else if (selectedSubjects.length === 1) {
      const subject = LIFE_CATEGORIES.find(s => s.id === selectedSubjects[0]);
      return subject?.title || 'موضوع انتخاب شده';
    } else {
      return `${selectedSubjects.length} موضوع انتخاب شده`;
    }
  };

  return (
    <div className={cn('min-h-screen bg-background', className)} dir="rtl">

      <motion.div
        className="pb-20"
        variants={pageContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Minimalistic Header */}
        <motion.header
          className="px-4 pt-12 pb-6"
          variants={pageItem}
        >
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleBack}
              aria-label="بازگشت"
              className={cn(
                'ml-3 p-3 -mr-2',
                'hover:opacity-70 transition-opacity'
              )}
            >
              <svg
                className="w-7 h-7 text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
            <h1 className={cn(
              'text-2xl font-semibold text-foreground',
              'font-persian'
            )}>
              تنظیمات
            </h1>
          </div>
        </motion.header>

        {/* User Information Section - Inline Editing */}
        <motion.div
          className="px-4 mb-8"
          variants={pageItem}
        >
          {/* User Name - Direct Click to Edit */}
          <div className="py-5">
            <h3 className={cn(
              'text-lg font-semibold text-foreground mb-2',
              'font-persian'
            )}>
              نام
            </h3>
            {!isEditingName ? (
              <button
                type="button"
                onClick={handleNameClick}
                className={cn(
                  'text-base text-muted text-right w-full py-1',
                  'font-persian hover:text-foreground transition-colors',
                  'cursor-text'
                )}
              >
                {user?.name || 'نام ثبت نشده'}
              </button>
            ) : (
              <input
                type="text"
                value={nameValue}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                onKeyDown={handleNameKeyDown}
                autoFocus
                className={cn(
                  'w-full text-base text-foreground bg-transparent py-1',
                  'font-persian border-none outline-none',
                  'focus:text-foreground'
                )}
                placeholder="نام خود را وارد کنید"
              />
            )}
          </div>

          {/* Subtle divider */}
          <div className="border-t border-gray-100" />

                    {/* Email Information */}
          <div className="py-5">
            <h3 className={cn('text-lg font-semibold text-foreground mb-2', 'font-persian')}>
              ایمیل
            </h3>
            {!isEditingEmail ? (
              <button
                type="button"
                onClick={handleEmailClick}
                className={cn(
                  'text-base text-muted text-right w-full py-1',
                  'font-persian hover:text-foreground transition-colors',
                  'cursor-text'
                )}
              >
                {user?.email || 'ایمیل ثبت نشده'}
              </button>
            ) : (
              <div>
                <input
                  type="email"
                  value={emailValue}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  onKeyDown={handleEmailKeyDown}
                  autoFocus
                  className={cn(
                    'w-full text-base text-foreground bg-transparent py-1',
                    'font-persian border-none outline-none',
                    'focus:text-foreground'
                  )}
                  placeholder="ایمیل خود را وارد کنید"
                />
                {emailError && <p className="text-sm text-red-500 mt-2">{emailError}</p>}
              </div>
            )}
          </div>

          {/* Subtle divider */}
          <div className="border-t border-gray-100" />

          {/* Phone Information */}
          <div className="py-5">
            <h3 className={cn('text-lg font-semibold text-foreground mb-2', 'font-persian')}>
              شماره تلفن
            </h3>
            {!isEditingPhone ? (
              <button
                type="button"
                onClick={handlePhoneClick}
                className={cn(
                  'text-base text-muted text-right w-full py-1',
                  'font-persian hover:text-foreground transition-colors',
                  'cursor-text'
                )}
              >
                {user?.phone ? formatPhoneNumber(user.phone) : 'شماره تلفن ثبت نشده'}
              </button>
            ) : (
              <div>
                <input
                  type="tel"
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  onKeyDown={handlePhoneKeyDown}
                  autoFocus
                  className={cn(
                    'w-full text-base text-foreground bg-transparent py-1',
                    'font-persian border-none outline-none',
                    'focus:text-foreground'
                  )}
                  placeholder="مثال: 09123456789"
                />
                {phoneError && <p className="text-sm text-red-500 mt-2">{phoneError}</p>}
              </div>
            )}
          </div>

          {/* Subtle divider */}
          <div className="border-t border-gray-100" />



          {/* User ID - Direct Click to Edit */}
          <div className="py-4">
            <h3 className={cn(
              'text-base font-medium text-foreground mb-1',
              'font-persian'
            )}>
              شناسه کاربری
            </h3>
            {!isEditingUserId ? (
              <button
                type="button"
                onClick={handleUserIdClick}
                className={cn(
                  'text-sm text-muted text-right w-full',
                  'font-persian hover:text-foreground transition-colors',
                  'cursor-text'
                )}
              >
                {getUserId()}
              </button>
            ) : (
              <div>
                <input
                  type="text"
                  value={userIdValue}
                  onChange={handleUserIdChange}
                  onBlur={handleUserIdBlur}
                  onKeyDown={handleUserIdKeyDown}
                  autoFocus
                  className={cn(
                    'w-full text-sm text-foreground bg-transparent',
                    'font-persian border-none outline-none',
                    'focus:text-foreground'
                  )}
                  placeholder="@شناسه کاربری"
                />
                {userIdError && (
                  <p className={cn(
                    'text-xs text-destructive mt-1',
                    'font-persian'
                  )}>
                    {userIdError}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Section divider */}
          <div className="border-t border-gray-200 mt-4" />
        </motion.div>

        {/* Subscription Section */}
        <motion.div
          className="px-4 mb-8"
          variants={pageItem}
        >
          <div className="py-5">
            <button
              type="button"
              onClick={handlePremiumPurchaseClick}
              className={cn(
                'w-full bg-gradient-to-r from-primary-500 to-primary-600',
                'text-white rounded-xl p-5',
                'hover:from-primary-600 hover:to-primary-700',
                'transition-all duration-200',
                'shadow-lg hover:shadow-xl',
                'transform hover:scale-[1.02]'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-3xl ml-4">⭐</span>
                  <div className="text-right">
                    <h3 className={cn(
                      'text-lg font-bold text-white',
                      'font-persian'
                    )}>
                      خرید اشتراک ویژه
                    </h3>
                    <p className={cn(
                      'text-base text-white/80 mt-2',
                      'font-persian'
                    )}>
                      دسترسی به تمام امکانات پیشرفته
                    </p>
                  </div>
                </div>
                <div className="text-white/80">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          {/* Section divider */}
          <div className="border-t border-gray-200 mt-6" />
        </motion.div>



        {/* App Settings Section - No Edit Buttons */}
        <motion.div
          className="px-4 mb-8"
          variants={pageItem}
        >
          {/* Favorite Subjects */}
          <div className="py-5">
            <button
              type="button"
              onClick={handleSubjectsClick}
              className={cn(
                'w-full flex items-center justify-between text-right',
                'hover:opacity-70 transition-opacity'
              )}
            >
              <div className="flex items-center">
                <span className="text-2xl ml-4">📚</span>
                <div>
                  <h3 className={cn(
                    'text-lg font-semibold text-foreground',
                    'font-persian'
                  )}>
                    موضوعات مورد علاقه
                  </h3>
                  <p className={cn(
                    'text-base text-muted mt-2',
                    'font-persian'
                  )}>
                    {getSubjectsDisplayText()}
                  </p>
                </div>
              </div>
              <div className="text-muted">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </button>
          </div>

          {/* Section divider */}
          <div className="border-t border-gray-200 mt-6" />
        </motion.div>

        {/* Payment History Section */}
        <motion.div
          className="px-4 mb-8"
          variants={pageItem}
        >
          <div className="py-5">
            <button
              type="button"
              onClick={handlePaymentHistoryClick}
              className={cn(
                'w-full flex items-center justify-between text-right',
                'hover:opacity-70 transition-opacity'
              )}
            >
              <div className="flex items-center">
                <span className="text-2xl ml-4">📜</span>
                <div>
                  <h3 className={cn(
                    'text-lg font-semibold text-foreground',
                    'font-persian'
                  )}>
                    تاریخچه پرداخت
                  </h3>
                  <p className={cn(
                    'text-base text-muted mt-2',
                    'font-persian'
                  )}>
                    مشاهده تاریخچه پرداخت‌ها
                  </p>
                </div>
              </div>
              <div className="text-muted">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </button>
          </div>
          <div className="border-t border-gray-200 mt-6" />
        </motion.div>

        {/* Support & Help Section */}
        <motion.div
          className="px-4 mb-8"
          variants={pageItem}
        >
          {/* Help */}
          <div className="py-5">
            <button
              type="button"
              onClick={() => {/* TODO: Navigate to help */}}
              className={cn(
                'w-full flex items-center text-right',
                'hover:opacity-70 transition-opacity'
              )}
            >
              <span className="text-2xl ml-4">❓</span>
              <h3 className={cn(
                'text-lg font-semibold text-foreground',
                'font-persian'
              )}>
                راهنما
              </h3>
            </button>
          </div>

          {/* Subtle divider */}
          <div className="border-t border-gray-100" />

          {/* Report Problem */}
          <div className="py-5">
            <button
              type="button"
              onClick={() => {/* TODO: Navigate to report problem */}}
              className={cn(
                'w-full flex items-center text-right',
                'hover:opacity-70 transition-opacity'
              )}
            >
              <span className="text-2xl ml-4">📝</span>
              <h3 className={cn(
                'text-lg font-semibold text-foreground',
                'font-persian'
              )}>
                گزارش مشکل
              </h3>
            </button>
          </div>

          {/* Section divider */}
          <div className="border-t border-gray-200 mt-6" />
        </motion.div>

        {/* Account Actions Section */}
        <motion.div
          className="px-4 mb-8"
          variants={pageItem}
        >
          {/* Logout */}
          <div className="py-6">
            <button
              type="button"
              onClick={handleLogout}
              className={cn(
                'w-full flex items-center text-right',
                'hover:opacity-70 transition-opacity'
              )}
            >
              <h3 className={cn(
                'text-lg font-semibold text-destructive',
                'font-persian'
              )}>
                خروج از حساب
              </h3>
            </button>
          </div>

          {/* Section divider */}
          <div className="border-t border-gray-200 mt-6" />
        </motion.div>

        {/* App Info Section */}
        <motion.div
          className="px-6 mb-8"
          variants={pageItem}
        >
          <p className={cn(
            'text-sm text-muted text-center',
            'font-persian'
          )}>
            نسخه ۱.۰.۰
          </p>
        </motion.div>
      </motion.div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Confirmation Modal */}
            <motion.div
              className={cn(
                'fixed inset-0 z-50 flex items-center justify-center p-4',
                'pointer-events-none'
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div
                className={cn(
                  'bg-soft-white rounded-card p-6',
                  'border border-soft-neutral-200 shadow-xl',
                  'max-w-sm w-full mx-4',
                  'pointer-events-auto'
                )}
                dir="rtl"
              >
              <p className={cn(
                'text-base text-foreground text-center mb-8',
                'font-persian'
              )}>
                آیا مطمئن هستید که می‌خواهید خارج شوید؟
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={cancelLogout}
                  className={cn(
                    'flex-1 py-3 text-center',
                    'text-muted font-medium font-persian',
                    'hover:text-foreground transition-colors'
                  )}
                >
                  انصراف
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={cn(
                    'flex-1 py-3 text-center',
                    'text-destructive font-medium font-persian',
                    'hover:text-red-700 transition-colors'
                  )}
                >
                  خروج
                </button>
              </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Subjects Selection Modal */}
      <AnimatePresence>
        {showSubjectsModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className={cn(
                'fixed inset-0 z-50 flex items-center justify-center p-4',
                'pointer-events-none'
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div
                className={cn(
                  'bg-soft-white rounded-card p-6',
                  'border border-soft-neutral-200 shadow-xl',
                  'max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto',
                  'pointer-events-auto'
                )}
                dir="rtl"
              >
                {/* Header */}
                <div className="mb-6">
                  <h2 className={cn(
                    'text-lg font-bold text-foreground text-center',
                    'font-persian'
                  )}>
                    موضوعات مورد علاقه
                  </h2>
                  <p className={cn(
                    'text-sm text-muted text-center mt-2',
                    'font-persian'
                  )}>
                    موضوعاتی که علاقه‌مند به مطالعه آن‌ها هستید را انتخاب کنید
                  </p>
                </div>

                {/* Subjects Grid */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {LIFE_CATEGORIES.map((subject) => {
                    const isSelected = tempSelectedSubjects.includes(subject.id);
                    return (
                      <motion.div
                        key={subject.id}
                        className={cn(
                          'p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
                          'flex items-center gap-3',
                          isSelected
                            ? 'border-primary-400 bg-soft-primary-100'
                            : 'border-gray-200 bg-soft-white hover:border-primary-300'
                        )}
                        onClick={() => handleSubjectToggle(subject.id)}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Icon */}
                        <span className="text-2xl">{subject.icon}</span>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className={cn(
                            'text-sm font-medium',
                            'font-persian',
                            isSelected ? 'text-primary-600' : 'text-foreground'
                          )}>
                            {subject.title}
                          </h3>
                          <p className={cn(
                            'text-xs mt-1',
                            'font-persian',
                            isSelected ? 'text-primary-500' : 'text-muted'
                          )}>
                            {subject.description}
                          </p>
                        </div>

                        {/* Selection indicator */}
                        {isSelected && (
                          <motion.div
                            className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleSubjectsCancel}
                    className={cn(
                      'flex-1 py-3 text-center',
                      'text-muted font-medium font-persian',
                      'hover:text-foreground transition-colors'
                    )}
                  >
                    انصراف
                  </button>
                  <button
                    type="button"
                    onClick={handleSubjectsSave}
                    className={cn(
                      'flex-1 py-3 text-center',
                      'bg-primary-500 text-white font-medium font-persian',
                      'hover:bg-primary-600 transition-colors',
                      'rounded-lg'
                    )}
                  >
                    ذخیره
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNavigation />
    </div>
  );
};

export default SettingsPage;
