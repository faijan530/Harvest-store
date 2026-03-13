import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import DashboardOverview from '../components/admin/DashboardOverview';
import OrderManagement from '../components/admin/OrderManagement';
import AnalyticsReports from '../components/admin/AnalyticsReports';
import CustomerManagement from '../components/admin/CustomerManagement';
import AdminReviewsManagement from '../components/admin/AdminReviewsManagement';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';
import { getOrders, getOrderStatistics } from '../services/orderService';
import { getCustomers, getCustomerStatistics } from '../services/customerService';
import { getApprovedReviews } from '../services/reviewService';
import { getActiveOffers } from '../services/offerService';
import { productImages } from '../data/productImages';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [offers, setOffers] = useState([]);
  const [orderStats, setOrderStats] = useState(null);
  const [customerStats, setCustomerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Get activeTab from context with proper error handling
  const context = useOutletContext();
  const { activeTab: contextActiveTab = 'dashboard', setActiveTab: contextSetActiveTab = () => {} } = context || {};
  
  // URL-based tab detection
  const getTabFromPath = () => {
    const path = location.pathname;
    
    // Handle nested admin routes
    if (path.startsWith('/admin/')) {
      const pathParts = path.split('/');
      const lastPart = pathParts[pathParts.length - 1];
      
      // Handle empty path (/admin or /admin/)
      if (lastPart === 'admin' || lastPart === '') {
        return 'dashboard';
      }
      
      // Return the last part as the tab
      return lastPart;
    }
    
    return 'dashboard'; // Default to dashboard
  };

  const activeTab = contextActiveTab || getTabFromPath();
  const setActiveTab = (tab) => {
    contextSetActiveTab(tab);
    // Navigate to the correct URL
    navigate(`/admin/${tab === 'dashboard' ? '' : tab}`);
  };

  const [editingProduct, setEditingProduct] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProductData, setEditedProductData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Dynamic product data - no hardcoded values
  const [productCategories, setProductCategories] = useState([]);
  const [productUnits, setProductUnits] = useState(['kg', 'pc', 'dozen', 'bunch', 'packet', 'liter']);

  // Get available product names from productImages
  const availableProductNames = Object.keys(productImages);

  // Handle add product
  const handleAddProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.price || !newProduct.category) {
        alert('Please fill in all required fields');
        return;
      }

      const productData = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        unit: newProduct.unit,
        category: newProduct.category,
        createdAt: new Date()
      };

      await addProduct(productData);
      
      // Reset form
      setNewProduct({
        name: '',
        price: '',
        unit: 'kg',
        category: 'vegetable',
        imageUrl: ''
      });
      setShowAddProductForm(false);
      
      // Refresh products
      const productsData = await getProducts();
      setProducts(productsData);
      
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  };

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    unit: 'kg',
    category: 'vegetable',
    imageUrl: ''
  });

  // Load data from Firebase with smart features
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load all data in parallel for better performance
        const [
          productsData, 
          ordersResult, 
          customersData, 
          reviewsData, 
          offersData,
          orderStatsData,
          customerStatsData
        ] = await Promise.all([
          getProducts(),
          getOrders(),
          getCustomers(),
          getApprovedReviews(),
          getActiveOffers(),
          getOrderStatistics(),
          getCustomerStatistics()
        ]);

        setProducts(productsData || []);
        setOrders(ordersResult.orders || []); // Extract orders array from result
        setCustomers(customersData || []);
        setReviews(reviewsData || []);
        setOffers(offersData || []);
        setOrderStats(orderStatsData);
        setCustomerStats(customerStatsData);

        // Extract dynamic categories from products
        const categories = [...new Set(productsData?.map(p => p.category).filter(Boolean) || [])];
        setProductCategories(categories);

        // Generate smart notifications
        generateSmartNotifications(ordersResult.orders, productsData, customersData);
        
      } catch (error) {
        console.error('Error loading admin dashboard data:', error);
        setNotifications([{
          id: Date.now(),
          type: 'error',
          message: 'Failed to load dashboard data',
          timestamp: new Date()
        }]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Smart notification system
  const generateSmartNotifications = (orders, products, customers) => {
    const newNotifications = [];
    
    // Low stock alerts
    const lowStockProducts = products?.filter(p => p.stock < 10) || [];
    if (lowStockProducts.length > 0) {
      newNotifications.push({
        id: Date.now() + 1,
        type: 'warning',
        message: `${lowStockProducts.length} products are low in stock`,
        timestamp: new Date()
      });
    }

    // New orders alert
    const recentOrders = orders?.filter(o => {
      const orderDate = o.createdAt?.toDate();
      return orderDate && (Date.now() - orderDate.getTime()) < 3600000; // Last hour
    }) || [];
    
    if (recentOrders.length > 0) {
      newNotifications.push({
        id: Date.now() + 2,
        type: 'success',
        message: `${recentOrders.length} new orders received`,
        timestamp: new Date()
      });
    }

    setNotifications(newNotifications);
  };

  // Product management functions

  // Real Firebase operations
  const updateProductPrice = async (productId, newPrice) => {
    try {
      await updateProduct(productId, { price: newPrice });
      // Refresh products data
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const addNewProduct = async () => {
    try {
      await addProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
        createdAt: new Date()
      });
      // Refresh products data
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
      // Reset form and close it
      setNewProduct({
        name: '',
        price: '',
        unit: 'kg',
        category: 'vegetable',
        imageUrl: ''
      });
      setShowAddProductForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProductItem = async (productId) => {
    try {
      await deleteProduct(productId);
      // Refresh products data
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setEditedProductData({
      name: product.name || '',
      price: product.price || 0,
      unit: product.unit || 'kg'
      // Category is immutable - not included in editable data
    });
  };

  const handleSaveProduct = async () => {
    try {
      await updateProduct(editingProductId, editedProductData);
      // Refresh products data
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
      // Reset edit state
      setEditingProductId(null);
      setEditedProductData({});
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleCancelProductEdit = () => {
    setEditingProductId(null);
    setEditedProductData({});
  };

  const approveReviewItem = async (reviewId) => {
    try {
      await approveReview(reviewId);
      // Refresh reviews data
      const updatedReviews = await getApprovedReviews();
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const deleteReviewItem = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      // Refresh reviews data
      const updatedReviews = await getApprovedReviews();
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const toggleTestimonial = (testimonialId) => {
    // This function can be removed or implemented with Firebase if needed
    console.log('Toggle testimonial:', testimonialId);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('rememberAdmin');
    sessionStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Render content based on active tab
  // Refresh customers function
  const handleCustomerDeleted = async (deletedCustomerId) => {
    console.log('Refreshing customers after deletion:', deletedCustomerId);
    try {
      const customersData = await getCustomers();
      setCustomers(customersData || []);
    } catch (error) {
      console.error('Error refreshing customers:', error);
    }
  };

  const renderContent = () => {
    console.log('renderContent called with activeTab:', activeTab);
    console.log('URL pathname:', location.pathname);
    
    switch(activeTab) {
      case 'dashboard':
        return (
          <div>
            <DashboardOverview 
              products={products}
              orders={orders}
              customers={customers}
              reviews={reviews}
              offers={offers}
              orderStats={orderStats}
              customerStats={customerStats}
              loading={loading}
            />
            {/* Quick Links Widget - Only on Dashboard */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                <a 
                  href="/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                      <i className="fas fa-external-link-alt text-white text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">View Store</p>
                      <p className="text-xs text-gray-600">Public website</p>
                    </div>
                  </div>
                  <i className="fas fa-arrow-right text-green-600 group-hover:translate-x-1 transition-transform"></i>
                </a>
                
                <a 
                  href="/admin/settings" 
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <i className="fas fa-cog text-white text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Settings</p>
                      <p className="text-xs text-gray-600">Admin config</p>
                    </div>
                  </div>
                  <i className="fas fa-arrow-right text-blue-600 group-hover:translate-x-1 transition-transform"></i>
                </a>
                
                <button className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-lg transition-all duration-200 group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                      <i className="fas fa-question-circle text-white text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Help Guide</p>
                      <p className="text-xs text-gray-600">Documentation</p>
                    </div>
                  </div>
                  <i className="fas fa-arrow-right text-purple-600 group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Product Management</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your store inventory</p>
              </div>
              <button
                onClick={() => setShowAddProductForm(true)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <i className="fas fa-plus"></i>
                <span>Add New Product</span>
              </button>
            </div>

            {/* Modern Add Product Form */}
            {showAddProductForm && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Add New Product</h3>
                  <button
                    onClick={() => setShowAddProductForm(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value, name: ''})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Category</option>
                      <option value="vegetable">Vegetable</option>
                      <option value="fruit">Fruit</option>
                      <option value="beverage">Beverage</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <select
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Select a product</option>
                      {availableProductNames.map(item => (
                        <option key={item} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="kg">kg</option>
                      <option value="dozen">dozen</option>
                      <option value="piece">piece</option>
                      <option value="bunch">bunch</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowAddProductForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProduct}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            )}

            {/* Products List */}
            {loading ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.length > 0 ? (
                        products.map((product) => (
                          <tr key={product.id}>
                            <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                                  <i className="fas fa-box text-gray-600"></i>
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  {editingProductId === product.id ? (
                                    <input
                                      type="text"
                                      value={editedProductData.name}
                                      onChange={(e) => setEditedProductData({...editedProductData, name: e.target.value})}
                                      className="px-2 py-1 border border-gray-300 rounded text-sm w-32"
                                    />
                                  ) : (
                                    product.name
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                              {editingProductId === product.id ? (
                                <input
                                  type="number"
                                  value={editedProductData.price}
                                  onChange={(e) => setEditedProductData({...editedProductData, price: e.target.value})}
                                  className="px-2 py-1 border border-gray-300 rounded text-sm w-20"
                                />
                              ) : (
                                <span className="text-sm text-gray-900">{product.price}</span>
                              )}
                            </td>
                            <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {product.category}
                              </span>
                            </td>
                            <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {editingProductId === product.id ? (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={handleSaveProduct}
                                    className="text-green-600 hover:text-green-900 font-medium px-3 py-2 border border-green-300 rounded text-xs bg-green-50"
                                  >
                                    💾 Save
                                  </button>
                                  <button
                                    onClick={handleCancelProductEdit}
                                    className="text-gray-600 hover:text-gray-900 font-medium px-3 py-2 border border-gray-300 rounded text-xs bg-gray-50"
                                  >
                                    ❌ Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleEditProduct(product)}
                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => deleteProductItem(product.id)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-3 lg:px-6 py-8 text-center text-gray-500">
                            No products found. Add some products to get started.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
      case 'orders':
        console.log('Orders case triggered - orders:', orders, 'loading:', loading);
        return <OrderManagement orders={orders} loading={loading} />;
      case 'customers':
        return <CustomerManagement customers={customers} loading={loading} onCustomerDeleted={handleCustomerDeleted} />;
      case 'reviews':
        return <AdminReviewsManagement />;
      case 'analytics':
        return <AnalyticsReports />;
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
            <DashboardOverview 
              products={products}
              orders={orders}
              customers={customers}
              reviews={reviews}
              offers={offers}
              orderStats={orderStats}
              customerStats={customerStats}
              loading={loading}
            />
          </div>
        );
    }
  };

  return (
    <div className={`w-full ${darkMode ? 'dark' : ''}`}>
      {/* Modern Header with Search and Notifications */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Smart Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search products, orders, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Toggle dark mode"
            >
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-gray-600 dark:text-gray-300`}></i>
            </button>
            
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
                title="Notifications"
              >
                <i className="fas fa-bell text-gray-600 dark:text-gray-300"></i>
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-gray-500 dark:text-gray-400 text-center">
                        No new notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'success' ? 'bg-green-500' :
                              notification.type === 'warning' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {new Date(notification.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white text-sm"></i>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <div className="space-y-6">
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
