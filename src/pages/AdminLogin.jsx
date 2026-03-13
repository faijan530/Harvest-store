import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);
  const { login, user, loading: authLoading, error: authError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Smart login attempt tracking
  useEffect(() => {
    const savedAttempts = localStorage.getItem('loginAttempts');
    const savedLockTime = localStorage.getItem('lockTime');
    
    if (savedAttempts) setLoginAttempts(parseInt(savedAttempts));
    if (savedLockTime) setLockTime(parseInt(savedLockTime));
  }, []);

  // Check if account is locked
  useEffect(() => {
    if (lockTime > Date.now()) {
      setIsLocked(true);
      const timer = setTimeout(() => {
        setIsLocked(false);
        setLoginAttempts(0);
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('lockTime');
      }, lockTime - Date.now());
      
      return () => clearTimeout(timer);
    } else if (lockTime > 0) {
      setIsLocked(false);
      setLoginAttempts(0);
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('lockTime');
    }
  }, [lockTime]);

  // Smart form validation
  const validateForm = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return false;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Account locked. Try again in ${Math.ceil((lockTime - Date.now()) / 60000)} minutes`);
      return;
    }
    
    if (!validateForm()) return;
    
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      
      // Reset login attempts on successful login
      setLoginAttempts(0);
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('lockTime');
      
      // Remember me functionality
      if (rememberMe) {
        localStorage.setItem('adminEmail', email);
      } else {
        localStorage.removeItem('adminEmail');
      }
      
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      
      // Smart error messages
      const errorMessage = error.message.toLowerCase();
      if (errorMessage.includes('user-not-found') || errorMessage.includes('wrong-password')) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem('loginAttempts', newAttempts.toString());
        
        // Lock account after 3 failed attempts
        if (newAttempts >= 3) {
          const lockDuration = 15 * 60 * 1000; // 15 minutes
          const unlockTime = Date.now() + lockDuration;
          setLockTime(unlockTime);
          setIsLocked(true);
          localStorage.setItem('lockTime', unlockTime.toString());
          setError('Account locked due to too many failed attempts. Try again in 15 minutes.');
        } else {
          setError(`Invalid credentials. ${3 - newAttempts} attempts remaining.`);
        }
      } else if (errorMessage.includes('too-many-requests')) {
        setError('Too many login attempts. Please try again later.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Load saved email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('adminEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Smart password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, color: 'bg-gray-300', text: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
    const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    
    return {
      strength,
      color: colors[Math.min(strength, 4)],
      text: texts[Math.min(strength, 4)]
    };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Security Warning Banner */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-2 text-sm z-50 backdrop-blur-sm">
        <div className="flex items-center justify-center space-x-2">
          <i className="fas fa-shield-alt"></i>
          <span>🔒 SECURE ADMIN ACCESS - All login attempts are monitored and logged</span>
          <i className="fas fa-shield-alt"></i>
        </div>
      </div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <i className="fas fa-shield-alt text-white text-3xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
            <p className="text-gray-600">24*7 Fresh Store Management System</p>
            <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800 font-semibold flex items-center justify-center">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                Restricted Area - Authorized Personnel Only
              </p>
            </div>
          </div>

          {/* Login Status Indicator */}
          {isLocked && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <i className="fas fa-lock text-red-600 text-xl"></i>
                <div>
                  <p className="text-red-800 font-semibold">Account Locked</p>
                  <p className="text-red-600 text-sm">
                    Try again in {Math.ceil((lockTime - Date.now()) / 60000)} minutes
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <i className="fas fa-exclamation-circle text-red-600"></i>
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  placeholder="admin@example.com"
                  disabled={isLocked}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your password"
                  disabled={isLocked}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLocked}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 hover:text-gray-600`}></i>
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Password Strength</span>
                    <span className="text-xs font-medium" style={{ color: passwordStrength.color.replace('bg-', '#').replace('500', '600') }}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  disabled={isLocked}
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              
              <button
                type="button"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                disabled={isLocked}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isLocked}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Security Features */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-green-600"></i>
                </div>
                <span className="text-xs text-gray-600">Secure Login</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-shield-alt text-blue-600"></i>
                </div>
                <span className="text-xs text-gray-600">Protected</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-lock text-purple-600"></i>
                </div>
                <span className="text-xs text-gray-600">Encrypted</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              © 2024 24*7 Fresh Store. All rights reserved.
            </p>
            <div className="mt-2 flex items-center justify-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1"
              >
                <i className="fas fa-arrow-left"></i>
                <span>Back to Store</span>
              </button>
              <span className="text-xs text-gray-400">|</span>
              <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                Need Help?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
