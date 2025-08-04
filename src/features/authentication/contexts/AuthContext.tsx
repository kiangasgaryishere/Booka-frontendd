import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email?: string;
  name?: string;
  phone?: string;
  authMethod: 'google' | 'email' | 'phone'; // All non-Google auth is now passwordless
  isGoogleUser: boolean;
  googleEmail?: string; // Store Google email separately
  hasCompletedEmailPhoneStep?: boolean; // Track if user has completed email/phone input
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: Partial<User>) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setGoogleAuth: (googleData: { email: string; name: string }) => void;
  shouldSkipEmailPhoneInput: () => boolean;
  markEmailPhoneCompleted: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('booka_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('booka_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('booka_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('booka_user');
    }
  }, [user]);

  const login = (userData: Partial<User>) => {
    const newUser: User = {
      id: userData.id || Date.now().toString(),
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      authMethod: userData.authMethod || 'email',
      isGoogleUser: userData.authMethod === 'google',
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('booka_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    } else {
      // Create new user if none exists (for regular users starting onboarding)
      const newUser: User = {
        id: userData.id || Date.now().toString(),
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        authMethod: userData.authMethod || 'email',
        isGoogleUser: userData.isGoogleUser || false,
        hasCompletedEmailPhoneStep: userData.hasCompletedEmailPhoneStep || false,
        googleEmail: userData.googleEmail,
      };
      setUser(newUser);
    }
  };

  const setGoogleAuth = (googleData: { email: string; name: string }) => {
    const newUser: User = {
      id: Date.now().toString(),
      email: googleData.email,
      googleEmail: googleData.email,
      name: googleData.name,
      authMethod: 'google',
      isGoogleUser: true,
      hasCompletedEmailPhoneStep: true, // Google users automatically complete this step
    };
    setUser(newUser);
  };

  const shouldSkipEmailPhoneInput = () => {
    return !!(user?.isGoogleUser && user?.hasCompletedEmailPhoneStep);
  };

  const markEmailPhoneCompleted = () => {
    if (user) {
      setUser({ ...user, hasCompletedEmailPhoneStep: true });
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
    setGoogleAuth,
    shouldSkipEmailPhoneInput,
    markEmailPhoneCompleted,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
