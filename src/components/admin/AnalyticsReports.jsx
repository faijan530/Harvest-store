import React, { useState } from 'react';

const AnalyticsReports = () => {
  const [timeRange, setTimeRange] = useState('week');

  const salesData = [
    { day: 'Mon', sales: 1200, orders: 8 },
    { day: 'Tue', sales: 1800, orders: 12 },
    { day: 'Wed', sales: 1500, orders: 10 },
    { day: 'Thu', sales: 2200, orders: 15 },
    { day: 'Fri', sales: 2800, orders: 18 },
    { day: 'Sat', sales: 3200, orders: 22 },
    { day: 'Sun', sales: 2100, orders: 14 }
  ];

  const topProducts = [
    { name: 'Tomato', sales: 45, revenue: '₹900', growth: '+12%' },
    { name: 'Potato', sales: 38, revenue: '₹684', growth: '+8%' },
    { name: 'Apple', sales: 25, revenue: '₹3,000', growth: '+15%' },
    { name: 'Banana', sales: 32, revenue: '₹1,280', growth: '+5%' },
    { name: 'Mango', sales: 18, revenue: '₹1,440', growth: '+22%' }
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
          <p className="text-gray-600 mt-1">Track your business performance</p>
        </div>
        <div className="flex space-x-2">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <i className="fas fa-download mr-2"></i>
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">₹14,800</p>
              <p className="text-sm text-green-600 mt-1">+15% from last week</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fas fa-rupee-sign text-green-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-blue-600">89</p>
              <p className="text-sm text-blue-600 mt-1">+8% from last week</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="fas fa-shopping-cart text-blue-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-purple-600">₹166</p>
              <p className="text-sm text-purple-600 mt-1">+5% from last week</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <i className="fas fa-chart-line text-purple-600"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-orange-600">3.2%</p>
              <p className="text-sm text-orange-600 mt-1">+0.5% from last week</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <i className="fas fa-percentage text-orange-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
          <div className="space-y-4">
            {salesData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 w-8">{data.day}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-6 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${(data.sales / 3200) * 100}%` }}
                    >
                      <span className="text-xs text-white font-medium">₹{data.sales}</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500 w-12 text-right">{data.orders} orders</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
                  <p className="text-xs text-green-600">{product.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <i className="fas fa-file-pdf text-red-500 text-2xl"></i>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <h4 className="font-medium text-gray-900">Daily Sales Report</h4>
              <p className="text-sm text-gray-600 mt-1">March 12, 2024</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <i className="fas fa-file-excel text-green-500 text-2xl"></i>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
              <h4 className="font-medium text-gray-900">Weekly Analytics</h4>
              <p className="text-sm text-gray-600 mt-1">March 6-12, 2024</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <i className="fas fa-file-chart-line text-blue-500 text-2xl"></i>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
              <h4 className="font-medium text-gray-900">Monthly Summary</h4>
              <p className="text-sm text-gray-600 mt-1">February 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;
