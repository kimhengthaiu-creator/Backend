import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { SafeAuthContext } from '../../context/AuthContext';

export const ClerkAuthBridge = ({ children }) => {
  const auth = useAuth();
  return (
    <SafeAuthContext.Provider value={auth}>
      {children}
    </SafeAuthContext.Provider>
  );
};

export const FallbackAuthProvider = ({ children }) => {
  const fallbackAuth = {
    getToken: async () => null,
    userId: 'user_demo_learner',
    isSignedIn: true,
    isLoaded: true,
  };

  return (
    <SafeAuthContext.Provider value={fallbackAuth}>
      {children}
    </SafeAuthContext.Provider>
  );
};
