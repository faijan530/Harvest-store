import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

/**
 * Admin Authentication Service
 * Handles admin login, logout, and user session management
 */

/**
 * Login admin with email and password
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 * @returns {Promise<Object>} User credential
 */
export const loginAdmin = async (email, password) => {
  try {
    console.log('authService: Starting login for email:', email);
    console.log('authService: Auth object:', auth);
    
    if (!auth) {
      console.error('authService: Auth object is null/undefined');
      throw new Error('Firebase auth not initialized');
    }
    
    console.log('authService: Calling signInWithEmailAndPassword...');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('authService: Login successful:', userCredential);
    return userCredential;
  } catch (error) {
    console.error('authService: Admin login error:', error);
    console.error('authService: Error code:', error.code);
    console.error('authService: Error message:', error.message);
    throw error;
  }
};

/**
 * Logout admin user
 * @returns {Promise<void>}
 */
export const logoutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Admin logout error:", error);
    throw error;
  }
};

/**
 * Get current authenticated user
 * @returns {Object|null} Current user or null
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Listen to auth state changes
 * @param {Function} callback - Callback function for auth state changes
 * @returns {Function} Unsubscribe function
 */
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
