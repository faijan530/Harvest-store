import React, { useState } from 'react';
import { 
  addProduct, 
  getProducts, 
  createOrder, 
  submitReview,
  addCustomer,
  getActiveOffers,
  getFAQs
} from '../services';

const FirebaseDemo = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [testData, setTestData] = useState({
    productName: 'Test Product',
    productPrice: 50,
    productCategory: 'vegetable',
    customerName: 'Test Customer',
    customerPhone: '+919876543210',
    reviewName: 'Test Reviewer',
    reviewRating: 5,
    reviewComment: 'Great product!'
  });

  const testAddProduct = async () => {
    setLoading(true);
    try {
      const productId = await addProduct({
        name: testData.productName,
        price: testData.productPrice,
        unit: 'kg',
        category: testData.productCategory,
        imageUrl: 'https://example.com/test.jpg'
      });
      setResult(`✅ Product added successfully! ID: ${productId}`);
    } catch (error) {
      setResult(`❌ Error adding product: ${error.message}`);
    }
    setLoading(false);
  };

  const testGetProducts = async () => {
    setLoading(true);
    try {
      const products = await getProducts();
      setResult(`✅ Products retrieved successfully! Count: ${products.length}`);
      console.log('Products:', products);
    } catch (error) {
      setResult(`❌ Error getting products: ${error.message}`);
    }
    setLoading(false);
  };

  const testCreateOrder = async () => {
    setLoading(true);
    try {
      const orderId = await createOrder({
        customerName: testData.customerName,
        customerPhone: testData.customerPhone,
        items: ['Tomato (2kg)', 'Potato (1kg)'],
        totalAmount: 100,
        status: 'pending',
        deliveryAddress: 'Test Address'
      });
      setResult(`✅ Order created successfully! ID: ${orderId}`);
    } catch (error) {
      setResult(`❌ Error creating order: ${error.message}`);
    }
    setLoading(false);
  };

  const testSubmitReview = async () => {
    setLoading(true);
    try {
      const reviewId = await submitReview({
        name: testData.reviewName,
        rating: testData.reviewRating,
        comment: testData.reviewComment,
        email: 'test@example.com'
      });
      setResult(`✅ Review submitted successfully! ID: ${reviewId}`);
    } catch (error) {
      setResult(`❌ Error submitting review: ${error.message}`);
    }
    setLoading(false);
  };

  const testAddCustomer = async () => {
    setLoading(true);
    try {
      const customerId = await addCustomer({
        name: testData.customerName,
        phone: testData.customerPhone,
        email: 'test@example.com',
        address: 'Test Address'
      });
      setResult(`✅ Customer added successfully! ID: ${customerId}`);
    } catch (error) {
      setResult(`❌ Error adding customer: ${error.message}`);
    }
    setLoading(false);
  };

  const testGetOffers = async () => {
    setLoading(true);
    try {
      const offers = await getActiveOffers();
      setResult(`✅ Offers retrieved successfully! Count: ${offers.length}`);
      console.log('Offers:', offers);
    } catch (error) {
      setResult(`❌ Error getting offers: ${error.message}`);
    }
    setLoading(false);
  };

  const testGetFAQs = async () => {
    setLoading(true);
    try {
      const faqs = await getFAQs();
      setResult(`✅ FAQs retrieved successfully! Count: ${faqs.length}`);
      console.log('FAQs:', faqs);
    } catch (error) {
      setResult(`❌ Error getting FAQs: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Firebase Backend Demo</h1>
          <p className="text-gray-600">Test the Firebase backend services for 24*7 Fresh Store</p>
        </div>

        {/* Test Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                value={testData.productName}
                onChange={(e) => setTestData({...testData, productName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Price</label>
              <input
                type="number"
                value={testData.productPrice}
                onChange={(e) => setTestData({...testData, productPrice: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input
                type="text"
                value={testData.customerName}
                onChange={(e) => setTestData({...testData, customerName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Phone</label>
              <input
                type="text"
                value={testData.customerPhone}
                onChange={(e) => setTestData({...testData, customerPhone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <button
            onClick={testAddProduct}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Add Product'}
          </button>
          <button
            onClick={testGetProducts}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Get Products'}
          </button>
          <button
            onClick={testCreateOrder}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Create Order'}
          </button>
          <button
            onClick={testSubmitReview}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Submit Review'}
          </button>
          <button
            onClick={testAddCustomer}
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Add Customer'}
          </button>
          <button
            onClick={testGetOffers}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Get Offers'}
          </button>
          <button
            onClick={testGetFAQs}
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Get FAQs'}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Result</h3>
            <div className={`p-4 rounded-lg ${result.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <pre className="whitespace-pre-wrap">{result}</pre>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📝 Instructions</h3>
          <ul className="text-blue-800 space-y-1">
            <li>• Make sure Firebase is properly configured in firebase.js</li>
            <li>• Check browser console for detailed error messages</li>
            <li>• Verify Firebase rules allow read/write access</li>
            <li>• Test each operation individually</li>
            <li>• Check Firebase Console for data persistence</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FirebaseDemo;
