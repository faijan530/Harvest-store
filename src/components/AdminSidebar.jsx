import React from 'react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  console.log('AdminSidebar - activeTab:', activeTab, 'setActiveTab:', typeof setActiveTab);
  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      description: 'Overview & Statistics',
      badge: null
    },
    {
      id: 'products',
      name: 'Products',
      icon: 'fas fa-box',
      description: 'Manage Products & Prices',
      badge: '6'
    },
    {
      id: 'orders',
      name: 'Orders',
      icon: 'fas fa-shopping-cart',
      description: 'Order Management',
      badge: '3'
    },
    {
      id: 'customers',
      name: 'Customers',
      icon: 'fas fa-users',
      description: 'Customer Management',
      badge: null
    },
    {
      id: 'reviews',
      name: 'Reviews',
      icon: 'fas fa-star',
      description: 'Customer Reviews',
      badge: '2'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: 'fas fa-chart-line',
      description: 'Sales & Reports',
      badge: null
    }
  ];

  return (
    <div className="h-full w-full flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 lg:p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <i className="fas fa-user-shield text-white text-sm lg:text-base"></i>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base lg:text-lg font-bold truncate">Admin Panel</h2>
            <p className="text-xs text-gray-400 hidden lg:block">24*7 Fresh Store</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 lg:px-4 py-4 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                console.log('Sidebar clicked - setting activeTab to:', item.id);
                setActiveTab(item.id);
              }}
              className={`w-full text-left p-2 lg:p-3 rounded-lg transition-all duration-200 group relative ${
                activeTab === item.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'hover:bg-gray-700 text-gray-300 hover:text-white'
              }`}
            >
              <div className="flex items-start space-x-2 lg:space-x-3">
                <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activeTab === item.id
                    ? 'bg-purple-500'
                    : 'bg-gray-600 group-hover:bg-purple-500'
                }`}>
                  <i className={`${item.icon} text-xs lg:text-sm`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-xs lg:text-sm truncate">{item.name}</div>
                    {item.badge && (
                      <span className={`px-1 lg:px-2 py-0.5 lg:py-1 text-xs rounded-full flex-shrink-0 ${
                        activeTab === item.id
                          ? 'bg-white text-purple-600'
                          : 'bg-purple-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs opacity-75 mt-0.5 lg:mt-1 hidden lg:block">{item.description}</div>
                </div>
              </div>
              
              {/* Hover Effect */}
              {activeTab !== item.id && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/20 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-3 lg:p-4 border-t border-gray-700">
        {/* System Status */}
        <div className="bg-gray-800 rounded-lg p-2 lg:p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300 hidden sm:block">System Status</span>
              <span className="text-xs text-gray-300 sm:hidden">Status</span>
            </div>
            <span className="text-xs text-green-400">Online</span>
          </div>
          <div className="text-xs text-gray-400 space-y-1 hidden lg:block">
            <div className="flex justify-between">
              <span>Server:</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex justify-between">
              <span>Last sync:</span>
              <span>Just now</span>
            </div>
            <div className="flex justify-between">
              <span>Database:</span>
              <span className="text-green-400">Connected</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm transition-colors flex items-center justify-center">
            <i className="fas fa-sync-alt mr-1 lg:mr-2 text-xs lg:text-sm"></i>
            <span className="hidden sm:inline">Sync Data</span>
            <span className="sm:hidden">Sync</span>
          </button>
          <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm transition-colors flex items-center justify-center">
            <i className="fas fa-download mr-1 lg:mr-2 text-xs lg:text-sm"></i>
            <span className="hidden sm:inline">Backup</span>
            <span className="sm:hidden">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
