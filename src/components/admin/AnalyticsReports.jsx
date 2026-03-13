import React, { useState, useEffect } from 'react';
import { getOrders, getProducts } from '../../services';

const AnalyticsReports = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersData, productsData] = await Promise.all([
        getOrders(),
        getProducts()
      ]);
      
      setOrders(ordersData.orders || []);
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate sales data from real orders
  const calculateSalesData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    return days.map((day, index) => {
      const dayDate = new Date(weekStart);
      dayDate.setDate(weekStart.getDate() + index);
      
      const dayOrders = orders.filter(order => {
        const orderDate = order.createdAt?.toDate ? order.createdAt.toDate() : new Date(order.createdAt);
        return orderDate.toDateString() === dayDate.toDateString();
      });
      
      const totalSales = dayOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      
      return {
        day: day.slice(0, 3),
        sales: totalSales,
        orders: dayOrders.length
      };
    });
  };

  // Calculate top products from real orders
  const calculateTopProducts = () => {
    const productSales = {};
    
    orders.forEach(order => {
      if (order.products) {
        const productName = order.products.split(' - ')[0]; // Extract product name
        if (productSales[productName]) {
          productSales[productName].sales += 1;
          productSales[productName].revenue += order.totalAmount || 0;
        } else {
          productSales[productName] = {
            sales: 1,
            revenue: order.totalAmount || 0
          };
        }
      }
    });
    
    return Object.entries(productSales)
      .map(([name, data]) => ({
        name,
        sales: data.sales,
        revenue: `₹${data.revenue.toLocaleString('en-IN')}`,
        growth: null // Remove hardcoded growth
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
  };

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

      {/* Sales Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
        <div className="space-y-4">
          {calculateSalesData().map((day, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-bar text-blue-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{day.day}</p>
                  <p className="text-xs text-gray-500">{day.orders} orders</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">₹{day.sales.toLocaleString('en-IN')}</p>
                <p className="text-xs text-gray-500">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
        <div className="space-y-3">
          {calculateTopProducts().map((product, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-box text-purple-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sales} sold</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{product.revenue}</p>
                <p className="text-xs text-gray-500">Revenue</p>
              </div>
            </div>
          ))}
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
