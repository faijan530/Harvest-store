import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  loginAdmin, 
  logoutAdmin, 
  getCurrentUser, 
  onAuthStateChangedListener 
} from '../services';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setUser(user);
      setAuthLoading(false);
      setAuthError(null);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      console.log('AuthContext: Starting login with email:', email);
      setAuthLoading(true);
      setAuthError(null);
      
      const userCredential = await loginAdmin(email, password);
      console.log('AuthContext: Firebase login successful:', userCredential);
      
      setUser(userCredential.user);
      return userCredential;
    } catch (error) {
      console.error('AuthContext: Login failed:', error);
      setAuthError(error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      setAuthLoading(true);
      await logoutAdmin();
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const value = {
    user,
    loading: authLoading,
    error: authError,
    login,
    logout,
    isAuthenticated: !!user
  };

  console.log('AuthContext: Providing context with login function:', typeof login);
  console.log('AuthContext: login function exists:', typeof login === 'function');

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
