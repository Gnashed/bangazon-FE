// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { auth } from '../client'; // Initialized Firebase auth instance
import { onAuthStateChanged, User } from 'firebase/auth';

// Need an interface here to define the shape of the AuthContext state
interface AuthContextType {
  user: User | null;
  userLoading: boolean;
}

// Set a default value to createContext
const AuthContext = createContext<AuthContextType>({
  user: null,
  userLoading: true,
});
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [ user, setUser ] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts.
  }, []);

  const value = useMemo(() => ({
    user,
    userLoading: loading,
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () : AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
