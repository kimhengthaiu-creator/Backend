import { createContext, useContext } from 'react';

export const SafeAuthContext = createContext({
  getToken: async () => null,
  userId: 'user_demo_learner',
  isSignedIn: true,
  isLoaded: true,
});

export const useSafeAuth = () => useContext(SafeAuthContext);
