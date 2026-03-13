import React from 'react';

const DashboardOverview = ({ 
  products = [], 
  orders = [], 
  customers = [], 
  reviews = [], 
  offers = [], 
  orderStats = null,
  customerStats = null,
  loading = false 
}) => {
  // Debug logging
  console.log('DashboardOverview - Data types:', {
    orders: typeof orders,
    isArray: Array.isArray(orders),
    ordersValue: orders
  });

  // Ensure all data are arrays
  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeProducts = Array.isArray(products) ? products : [];
  const safeCustomers = Array.isArray(customers) ? customers : [];
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const safeOffers = Array.isArray(offers) ? offers : [];

  // Calculate stats from real data
  const stats = [
    { 
      title: 'Total Products', 
      value: safeProducts.length || 0, 
      change: null, // Remove hardcoded change
      icon: 'fas fa-box', 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Active Orders', 
      value: orderStats?.pendingOrders || safeOrders.filter(o => o.status === 'pending').length || 0, 
      change: null, // Remove hardcoded change
      icon: 'fas fa-shopping-cart', 
      color: 'bg-green-500' 
    },
    { 
      title: 'Total Revenue', 
      value: orderStats?.totalRevenue ? `₹${orderStats.totalRevenue.toLocaleString('en-IN')}` : '₹0', 
      change: null, // Remove hardcoded change
      icon: 'fas fa-rupee-sign', 
      color: 'bg-purple-500' 
    },
    { 
      title: 'Customers', 
      value: customerStats?.totalCustomers || safeCustomers.length || 0, 
      change: null, // Remove hardcoded change
      icon: 'fas fa-users', 
      color: 'bg-orange-500' 
    }
  ];

  // Recent activity from real data
  const recentActivity = [
    ...(safeOrders.slice(0, 2).map(order => ({
      id: order.id,
      type: 'order',
      message: `New order #${order.orderNumber || order.id} from ${order.customerName || 'Customer'}`,
      time: order.createdAt ? new Date(order.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now',
      icon: 'fas fa-shopping-cart'
    }))),
    ...(safeReviews.slice(0, 2).map(review => ({
      id: review.id,
      type: 'review',
      message: `${review.name} rated ${review.rating} stars`,
      time: review.createdAt ? new Date(review.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now',
      icon: 'fas fa-star'
    })))
  ].slice(0, 4);

  return (
    <div className="w-full">
      {loading ? (
        // Loading skeleton
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4 lg:p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm text-gray-600 truncate">{stat.title}</p>
                    <p className="text-lg lg:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    {stat.change && (
                      <p className="text-xs lg:text-sm text-green-600 mt-1 lg:mt-2">{stat.change}</p>
                    )}
                  </div>
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0 ml-3`}>
                    <i className={`${stat.icon} text-white text-sm lg:text-base`}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mt-6 lg:mt-8">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4 lg:p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <i className={`${activity.icon} text-gray-600`}></i>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm lg:text-base text-gray-900 font-medium">{activity.message}</p>
                          <p className="text-xs lg:text-sm text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No recent activity
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Charts & Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
            {/* Quick Actions */}
            <div className="xl:col-span-2 bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                <button className="p-3 lg:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <i className="fas fa-plus text-blue-600 text-lg lg:text-xl mb-2"></i>
                  <p className="text-xs lg:text-sm text-gray-700">Add Product</p>
                </button>
                <button className="p-3 lg:p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <i className="fas fa-tag text-green-600 text-lg lg:text-xl mb-2"></i>
                  <p className="text-xs lg:text-sm text-gray-700">Create Offer</p>
                </button>
                <button className="p-3 lg:p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <i className="fas fa-chart-line text-purple-600 text-lg lg:text-xl mb-2"></i>
                  <p className="text-xs lg:text-sm text-gray-700">View Reports</p>
                </button>
                <button className="p-3 lg:p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                  <i className="fas fa-bullhorn text-orange-600 text-lg lg:text-xl mb-2"></i>
                  <p className="text-xs lg:text-sm text-gray-700">Send Notice</p>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardOverview;
