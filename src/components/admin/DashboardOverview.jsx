import React from 'react';

const DashboardOverview = () => {
  const stats = [
    { title: 'Total Products', value: '23', change: '+2', icon: 'fas fa-box', color: 'bg-blue-500' },
    { title: 'Active Orders', value: '12', change: '+5', icon: 'fas fa-shopping-cart', color: 'bg-green-500' },
    { title: 'Total Revenue', value: '₹8,450', change: '+12%', icon: 'fas fa-rupee-sign', color: 'bg-purple-500' },
    { title: 'Customers', value: '156', change: '+8', icon: 'fas fa-users', color: 'bg-orange-500' }
  ];

  const recentActivity = [
    { id: 1, type: 'order', message: 'New order received - 2kg Tomatoes', time: '2 mins ago', icon: 'fas fa-shopping-cart' },
    { id: 2, type: 'review', message: 'New review from Priya - 5 stars', time: '15 mins ago', icon: 'fas fa-star' },
    { id: 3, type: 'product', message: 'Price updated for Potatoes', time: '1 hour ago', icon: 'fas fa-edit' },
    { id: 4, type: 'customer', message: 'New customer registration', time: '2 hours ago', icon: 'fas fa-user-plus' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-2">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <i className={`${stat.icon} text-white text-lg`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className={`${activity.icon} text-gray-600 text-sm`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <i className="fas fa-plus text-blue-600 text-xl mb-2"></i>
              <p className="text-sm text-gray-700">Add Product</p>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <i className="fas fa-tag text-green-600 text-xl mb-2"></i>
              <p className="text-sm text-gray-700">Create Offer</p>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <i className="fas fa-chart-line text-purple-600 text-xl mb-2"></i>
              <p className="text-sm text-gray-700">View Reports</p>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <i className="fas fa-bullhorn text-orange-600 text-xl mb-2"></i>
              <p className="text-sm text-gray-700">Send Notice</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
