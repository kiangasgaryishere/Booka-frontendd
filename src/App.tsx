import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './features/authentication/contexts/AuthContext';
import { AvatarProvider } from './features/profile/contexts/AvatarContext';
import { LoadingPage } from './features/core/pages';
import { DashboardPage } from './features/dashboard/pages';
import { LibraryPage } from './features/library/pages';
import { GroupPage } from './features/group/pages';
import { SettingsPage } from './features/settings/pages';
import { ProfilePage } from './features/profile/pages';
import PaymentHistory from './features/payments/pages/PaymentHistory';
import PremiumSubscription from './features/subscription/pages/PremiumSubscription';
import PaymentConfirmation from './features/subscription/pages/PaymentConfirmation';
import AchievementsPage from './features/achievements/pages/Achievements';
import {
  WelcomePage,
  LifeImprovementPage,
  DailyReadingTimePage,
  NameInputPage,
  AgeSelectionPage,
  EmailInputPage,
  PlatformDiscoveryPage,
  LoginPage,
  OTPVerificationPage,
  SignupOTPVerificationPage,
  SignupSuccessPage
} from './features/authentication/pages';
import { ButtonComparisonTest } from './components/ui';

function App() {
  return (
    <AuthProvider>
      <AvatarProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LoadingPage />} />
              <Route path="/loading" element={<LoadingPage />} />

              {/* Authentication Routes */}
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/life-improvement" element={<LifeImprovementPage />} />
              <Route path="/daily-reading-time" element={<DailyReadingTimePage />} />
              <Route path="/name-input" element={<NameInputPage />} />
              <Route path="/age-selection" element={<AgeSelectionPage />} />
              <Route path="/email-input" element={<EmailInputPage />} />
              <Route path="/platform-discovery" element={<PlatformDiscoveryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/otp-verification" element={<OTPVerificationPage />} />
              <Route path="/signup-otp-verification" element={<SignupOTPVerificationPage />} />
              <Route path="/signup-success" element={<SignupSuccessPage />} />

              {/* Main App Routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/league" element={<GroupPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/payment-history" element={<PaymentHistory />} />
              <Route path="/premium-subscription" element={<PremiumSubscription />} />
              <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
              <Route path="/achievements" element={<AchievementsPage />} />

              {/* Test Routes */}
              <Route path="/button-test" element={<ButtonComparisonTest />} />
            </Routes>
          </div>
        </Router>
      </AvatarProvider>
    </AuthProvider>
  );
}

export default App;
