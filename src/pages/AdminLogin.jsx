import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple authentication (in production, use proper backend)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      console.log('AdminLogin - Authentication successful');
      // Store auth token
      if (rememberMe) {
        localStorage.setItem('adminToken', 'authenticated');
        localStorage.setItem('rememberAdmin', 'true');
        console.log('AdminLogin - Token stored in localStorage');
      } else {
        sessionStorage.setItem('adminToken', 'authenticated');
        console.log('AdminLogin - Token stored in sessionStorage');
      }
      navigate('/admin/dashboard');
    } else {
      console.log('AdminLogin - Authentication failed');
      setError('Invalid credentials. Use admin/admin123 for demo');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i className="fas fa-user-shield text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-gray-600">24*7 Fresh Store Admin Panel</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <i className="fas fa-lock mr-1"></i>
            <span>Secure Access Required</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-user text-gray-400"></i>
              </div>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-400"></i>
              </div>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Additional Options */}
          <div className="mt-6 flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
              />
              Remember me
            </label>
            <a
              href="#"
              className="text-sm text-primary hover:text-primary-dark transition-colors"
            >
              Forgot password?
            </a>
          </div>
        </form>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <i className="fas fa-info text-white text-sm"></i>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials</p>
              <div className="bg-white rounded p-3 border border-blue-200">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Username:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-blue-600">admin</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Password:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-blue-600">admin123</code>
                  </div>
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                <i className="fas fa-lock mr-1"></i>
                In production, replace with secure credentials
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
