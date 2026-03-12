import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import DashboardOverview from '../components/admin/DashboardOverview.jsx';
import OrderManagement from '../components/admin/OrderManagement.jsx';
import CustomerManagement from '../components/admin/CustomerManagement.jsx';
import AnalyticsReports from '../components/admin/AnalyticsReports.jsx';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [specialOffers, setSpecialOffers] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  // Get activeTab from context
  const { activeTab, setActiveTab } = useOutletContext() || { activeTab: 'dashboard', setActiveTab: () => {} };

  // Load initial data
  useEffect(() => {
    setProducts([
      { id: 1, name: 'Tomato', price: '₹20/kg', category: 'vegetable', image: 'tomato.webp' },
      { id: 2, name: 'Potato', price: '₹18/kg', category: 'vegetable', image: 'potato.webp' },
      { id: 3, name: 'Apple', price: '₹120/kg', category: 'fruit', image: 'apple.webp' },
      { id: 4, name: 'Banana', price: '₹40/dozen', category: 'fruit', image: 'banana.webp' },
      { id: 5, name: 'Orange', price: '₹60/kg', category: 'fruit', image: 'orange.webp' },
      { id: 6, name: 'Mango', price: '₹80/kg', category: 'fruit', image: 'mango.webp' },
    ]);

    setReviews([
      { id: 1, name: 'Rahul', rating: 5, text: 'Very fresh vegetables every day. Best quality in the area!', approved: true },
      { id: 2, name: 'Priya', rating: 5, text: 'Excellent service and fresh fruits. Highly recommended!', approved: true },
      { id: 3, name: 'Amit', rating: 4, text: 'Good quality but delivery was late.', approved: false },
    ]);

    setTestimonials([
      { id: 1, name: 'Rahul', rating: 5, text: 'Very fresh vegetables every day. Best quality in the area!', featured: true },
      { id: 2, name: 'Priya', rating: 5, text: 'Excellent service and fresh fruits. Highly recommended!', featured: false },
    ]);

    setSpecialOffers([
      { id: 1, title: 'Special Offer', product: 'Potato', price: '₹15/kg', originalPrice: '₹18/kg', active: true },
    ]);
  }, []);

  const updateProductPrice = (productId, newPrice) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, price: newPrice } : product
    ));
    setEditingProduct(null);
  };

  const approveReview = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, approved: true } : review
    ));
  };

  const deleteReview = (reviewId) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  const toggleTestimonial = (testimonialId) => {
    setTestimonials(testimonials.map(testimonial => 
      testimonial.id === testimonialId ? { ...testimonial, featured: !testimonial.featured } : testimonial
    ));
  };

  const addNewProduct = (newProduct) => {
    const product = {
      id: products.length + 1,
      ...newProduct
    };
    setProducts([...products, product]);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('rememberAdmin');
    sessionStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Render content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'products':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
              <button
                onClick={() => addNewProduct({ name: 'New Product', price: '₹0/kg', category: 'vegetable' })}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <i className="fas fa-plus mr-2"></i>
                Add New Product
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-carrot text-gray-600"></i>
                          </div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingProduct === product.id ? (
                          <input
                            type="text"
                            defaultValue={product.price}
                            onBlur={(e) => updateProductPrice(product.id, e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && updateProductPrice(product.id, e.target.value)}
                            className="w-24 px-2 py-1 border border-gray-300 rounded"
                            autoFocus
                          />
                        ) : (
                          <span className="text-gray-900">{product.price}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setEditingProduct(editingProduct === product.id ? null : product.id)}
                          className="text-purple-600 hover:text-purple-900 mr-3"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Reviews</h2>
            <div className="grid gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="font-semibold text-gray-800 mr-3">{review.name}</h3>
                        <div className="flex text-yellow-500">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.text}</p>
                      <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                        review.approved 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {review.approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {!review.approved && (
                        <button
                          onClick={() => approveReview(review.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'orders':
        return <OrderManagement />;
      case 'customers':
        return <CustomerManagement />;
      case 'analytics':
        return <AnalyticsReports />;
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Store Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                      <input type="text" defaultValue="24*7 Fresh Store" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input type="text" defaultValue="+91 98765 43210" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input type="text" defaultValue="NH-75 Highway, Kundi Shankha, Madhya Pradesh" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
            <DashboardOverview />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Debug Info */}
      <div className="bg-blue-500 text-white p-4 rounded-lg shadow mb-6">
        <h1 className="text-xl font-bold">DEBUG: Admin Dashboard</h1>
        <p>Active Tab: {activeTab}</p>
        <p>Component is rendering</p>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;
