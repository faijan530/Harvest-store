import React, { useState, useEffect } from 'react';
import { getProducts } from '../services';
import ReviewSection from '../components/ReviewSection';
import FloatingReviewButton from '../components/FloatingReviewButton';
import WhatsAppOrderTracker from '../components/WhatsAppOrderTracker';

const Prices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('vegetables');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await getProducts();
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter products by category
  const vegetables = products.filter(product => product.category === 'vegetable').map(product => ({
    name: product.name,
    price: `₹${product.price}`,
    unit: `/${product.unit || 'kg'}`,
    whatsappLink: `https://wa.me/916201640686?text=I%20want%20to%20order%20${product.name}%20-%20₹${product.price}/${product.unit || 'kg'}`
  }));

  const fruits = products.filter(product => product.category === 'fruit').map(product => ({
    name: product.name,
    price: `₹${product.price}`,
    unit: `/${product.unit || 'kg'}`,
    whatsappLink: `https://wa.me/916201640686?text=I%20want%20to%20order%20${product.name}%20-%20₹${product.price}/${product.unit || 'kg'}`
  }));

  const beverages = products.filter(product => product.category === 'beverage').map(product => ({
    name: product.name,
    price: `₹${product.price}`,
    unit: `/${product.unit || 'ml'}`,
    whatsappLink: `https://wa.me/916201640686?text=I%20want%20to%20order%20${product.name}%20-%20₹${product.price}/${product.unit || 'ml'}`
  }));

  const allProducts = products.map(product => ({
    name: product.name,
    price: `₹${product.price}`,
    unit: `/${product.unit || 'kg'}`,
    whatsappLink: `https://wa.me/916201640686?text=I%20want%20to%20order%20${product.name}%20-%20₹${product.price}/${product.unit || 'kg'}`
  }));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTable = (data, showCategory = false) => (
    <div className="overflow-x-auto rounded-xl shadow-lg">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-fresh-green text-white">
            <th className="px-6 py-4 text-left font-semibold">Product</th>
            {showCategory && <th className="px-6 py-4 text-left font-semibold">Category</th>}
            <th className="px-6 py-4 text-left font-semibold">Price</th>
            <th className="px-6 py-4 text-left font-semibold">Unit</th>
            <th className="px-6 py-4 text-left font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">{item.name}</td>
              {showCategory && <td className="px-6 py-4">{item.category}</td>}
              <td className="px-6 py-4 font-bold text-fresh-green">{item.price}</td>
              <td className="px-6 py-4">{item.unit}</td>
              <td className="px-6 py-4">
                <WhatsAppOrderTracker product={item.name}>
                  <a 
                    href={item.whatsappLink} 
                    className="bg-whatsapp hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-all" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp mr-1"></i> Order
                  </a>
                </WhatsAppOrderTracker>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="prices-page">
      {/* Page Header */}
      <section className="page-header bg-gradient-to-r from-fresh-green to-light-green text-white py-32 text-center">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className={`text-5xl font-bold mb-4 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Today's Prices
          </h1>
          <p className="text-xl mb-2">Fresh and affordable prices updated daily</p>
          <p className="last-updated text-lg opacity-90">
            Last updated: <span>{new Date().toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </p>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fresh-green"></div>
          <p className="ml-4 text-gray-600">Loading latest prices...</p>
        </div>
      )}

      {/* Prices Table Section */}
      {!loading && (
      <section className="prices-section bg-white py-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex justify-center gap-4 mb-8">
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'vegetables' 
                  ? 'bg-fresh-green text-white border-fresh-green' 
                  : 'bg-gray-100 hover:bg-fresh-green hover:text-white'
              }`}
              onClick={() => handleTabChange('vegetables')}
            >
              Vegetables
            </button>
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'fruits' 
                  ? 'bg-fresh-green text-white border-fresh-green' 
                  : 'bg-gray-100 hover:bg-fresh-green hover:text-white'
              }`}
              onClick={() => handleTabChange('fruits')}
            >
              Fruits
            </button>
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'beverages' 
                  ? 'bg-fresh-green text-white border-fresh-green' 
                  : 'bg-gray-100 hover:bg-fresh-green hover:text-white'
              }`}
              onClick={() => handleTabChange('beverages')}
            >
              Beverages
            </button>
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'all' 
                  ? 'bg-fresh-green text-white border-fresh-green' 
                  : 'bg-gray-100 hover:bg-fresh-green hover:text-white'
              }`}
              onClick={() => handleTabChange('all')}
            >
              All Products
            </button>
          </div>

          {/* Tab Content */}
          <div className={`transition-all duration-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {activeTab === 'vegetables' && renderTable(vegetables)}
            {activeTab === 'fruits' && renderTable(fruits)}
            {activeTab === 'beverages' && renderTable(beverages)}
            {activeTab === 'all' && renderTable(allProducts, true)}
          </div>
        </div>
      </section>
      )}

      {/* Customer Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <ReviewSection />
        </div>
      </section>

      {/* Floating Review Button */}
      <FloatingReviewButton />

      {/* Quick Order Section */}
      <section className="py-16 bg-fresh-green text-center">
        <div className="max-w-7xl mx-auto px-5">
          <div className="quick-order-content">
            <h2 className="text-3xl font-bold mb-4 text-fresh-green">Bulk Order?</h2>
            <p className="text-lg mb-8 text-gray-600">Planning to order in bulk? Get special discounts!</p>
            <WhatsAppOrderTracker product="Bulk Order">
              <a 
                href="https://wa.me/916201640686?text=Hi%20I%20want%20to%20place%20a%20bulk%20order" 
                className="bg-fresh-green hover:bg-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:-translate-y-1" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp mr-2"></i> Bulk Order Inquiry
              </a>
            </WhatsAppOrderTracker>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Prices;
