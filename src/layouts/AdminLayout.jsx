import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminSidebar from '../components/AdminSidebar.jsx';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication
  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Admin Sidebar - Responsive */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-[250px] 
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
      
      {/* Main Content Container */}
      <div className="flex flex-col flex-1 min-w-0 lg:ml-0">
        {/* Smart Admin Header */}
        <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-xl border-b border-purple-800/30 backdrop-blur-sm z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Left side - Mobile Menu Toggle and Brand */}
              <div className="flex items-center space-x-4">
                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                </button>
                
                {/* Dynamic Logo and Brand */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <i className="fas fa-store text-white text-sm"></i>
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-lg font-bold text-white">24*7 Fresh Store</h1>
                    <p className="text-xs text-purple-200">Admin Panel</p>
                  </div>
                </div>
              </div>

              {/* Center - Quick Stats Bar */}
              <div className="hidden md:flex items-center space-x-6 px-6">
                <div className="flex items-center space-x-2 bg-purple-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-purple-200 font-medium">System Online</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-800/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <i className="fas fa-shopping-bag text-blue-300 text-xs"></i>
                  <span className="text-xs text-blue-200 font-medium">Orders</span>
                </div>
                <div className="flex items-center space-x-2 bg-green-800/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <i className="fas fa-rupee-sign text-green-300 text-xs"></i>
                  <span className="text-xs text-green-200 font-medium">Revenue</span>
                </div>
              </div>

              {/* Right side - Smart Actions */}
              <div className="flex items-center space-x-3">
                {/* Mobile Search Toggle */}
                <button className="md:hidden p-2 text-purple-200 hover:text-white">
                  <i className="fas fa-search"></i>
                </button>
                
                {/* Smart Notifications */}
                <div className="relative group">
                  <button className="relative p-2.5 text-purple-200 hover:text-white hover:bg-purple-800/30 rounded-full transition-all duration-200">
                    <i className="fas fa-bell text-lg"></i>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  
                  {/* Notification Dropdown */}
                  <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-xl shadow-2xl border border-purple-700/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-purple-200 mb-3">Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-3 p-2 bg-purple-800/30 rounded-lg hover:bg-purple-800/50 transition-colors cursor-pointer">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-shopping-cart text-white text-xs"></i>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-purple-200 font-medium">New Order #ORD004</p>
                            <p className="text-xs text-purple-400">2 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-2 bg-purple-800/30 rounded-lg hover:bg-purple-800/50 transition-colors cursor-pointer">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-user-plus text-white text-xs"></i>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-purple-200 font-medium">New Customer Registration</p>
                            <p className="text-xs text-purple-400">15 minutes ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Smart User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-3 p-2 hover:bg-purple-800/30 rounded-full transition-all duration-200">
                    <div className="hidden sm:block text-right">
                      <p className="text-sm font-semibold text-purple-200">Admin User</p>
                      <p className="text-xs text-purple-400">admin@freshstore.com</p>
                    </div>
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-white"></i>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
                    </div>
                  </button>
                  
                  {/* User Dropdown */}
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-xl shadow-2xl border border-purple-700/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100">
                    <div className="p-2">
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-800/50 rounded-lg transition-colors">
                        <i className="fas fa-user-cog text-purple-300"></i>
                        <span className="text-sm text-purple-200">Profile Settings</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-800/50 rounded-lg transition-colors">
                        <i className="fas fa-shield-alt text-purple-300"></i>
                        <span className="text-sm text-purple-200">Security</span>
                      </button>
                      <div className="border-t border-purple-700/30 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 p-3 hover:bg-red-800/30 rounded-lg transition-colors text-red-300"
                      >
                        <i className="fas fa-sign-out-alt"></i>
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content Area - Scrollable Only */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            <Outlet context={{ activeTab, setActiveTab }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
