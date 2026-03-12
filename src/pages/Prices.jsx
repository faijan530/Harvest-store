import React, { useState, useEffect } from 'react';

const Prices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('vegetables');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const vegetables = [
    { name: 'Tomato', price: '₹20', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Tomato%20-%20₹20/kg' },
    { name: 'Potato', price: '₹18', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Potato%20-%20₹18/kg' },
    { name: 'Onion', price: '₹22', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Onion%20-%20₹22/kg' },
    { name: 'Carrot', price: '₹25', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Carrot%20-%20₹25/kg' },
    { name: 'Cucumber', price: '₹15', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Cucumber%20-%20₹15/kg' },
    { name: 'Spinach', price: '₹12', unit: '/bunch', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Spinach%20-%20₹12/bunch' },
    { name: 'Cauliflower', price: '₹30', unit: '/pc', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Cauliflower%20-%20₹30/pc' },
    { name: 'Cabbage', price: '₹20', unit: '/pc', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Cabbage%20-%20₹20/pc' },
    { name: 'Brinjal', price: '₹28', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Brinjal%20-%20₹28/kg' },
    { name: 'Green Peas', price: '₹45', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Green%20Peas%20-%20₹45/kg' }
  ];

  const fruits = [
    { name: 'Apple', price: '₹120', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Apple%20-%20₹120/kg' },
    { name: 'Banana', price: '₹40', unit: '/dozen', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Banana%20-%20₹40/dozen' },
    { name: 'Orange', price: '₹60', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Orange%20-%20₹60/kg' },
    { name: 'Grapes', price: '₹100', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Grapes%20-%20₹100/kg' },
    { name: 'Mango', price: '₹80', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Mango%20-%20₹80/kg' },
    { name: 'Pineapple', price: '₹45', unit: '/pc', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Pineapple%20-%20₹45/pc' },
    { name: 'Pomegranate', price: '₹150', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Pomegranate%20-%20₹150/kg' },
    { name: 'Guava', price: '₹50', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Guava%20-%20₹50/kg' },
    { name: 'Papaya', price: '₹35', unit: '/pc', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Papaya%20-%20₹35/pc' },
    { name: 'Watermelon', price: '₹25', unit: '/pc', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Watermelon%20-%20₹25/pc' }
  ];

  const allProducts = [
    { name: 'Tomato', category: 'Vegetable', price: '₹20', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Tomato%20-%20₹20/kg' },
    { name: 'Apple', category: 'Fruit', price: '₹120', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Apple%20-%20₹120/kg' },
    { name: 'Potato', category: 'Vegetable', price: '₹18', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Potato%20-%20₹18/kg' },
    { name: 'Banana', category: 'Fruit', price: '₹40', unit: '/dozen', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Banana%20-%20₹40/dozen' },
    { name: 'Onion', category: 'Vegetable', price: '₹22', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Onion%20-%20₹22/kg' },
    { name: 'Orange', category: 'Fruit', price: '₹60', unit: '/kg', whatsappLink: 'https://wa.me/919876543210?text=I%20want%20to%20order%20Orange%20-%20₹60/kg' }
  ];

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
                <a 
                  href={item.whatsappLink} 
                  className="bg-whatsapp hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-all" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp mr-1"></i> Order
                </a>
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

      {/* Prices Table Section */}
      <section className="prices-section bg-white py-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex justify-center gap-4 mb-8">
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'vegetables' 
                  ? 'bg-fresh-green text-white border-fresh-green' 
                  : 'bg-gray-100 border-2 border-gray-200 hover:bg-fresh-green hover:text-white hover:border-fresh-green'
              }`}
              onClick={() => handleTabChange('vegetables')}
            >
              Vegetables
            </button>
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'fruits' 
                  ? 'bg-fresh-green text-white border-fresh-green' 
                  : 'bg-gray-100 border-2 border-gray-200 hover:bg-fresh-green hover:text-white hover:border-fresh-green'
              }`}
              onClick={() => handleTabChange('fruits')}
            >
              Fruits
            </button>
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'all' 
                  ? 'bg-fresh-green text-white border-fresh-green' 
                  : 'bg-gray-100 border-2 border-gray-200 hover:bg-fresh-green hover:text-white hover:border-fresh-green'
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
            {activeTab === 'all' && renderTable(allProducts, true)}
          </div>
        </div>
      </section>

      {/* Quick Order Section */}
      <section className="quick-order bg-gray-50 py-16 text-center">
        <div className="max-w-7xl mx-auto px-5">
          <div className="quick-order-content">
            <h2 className="text-3xl font-bold mb-4 text-fresh-green">Bulk Order?</h2>
            <p className="text-lg mb-8 text-gray-600">Planning to order in bulk? Get special discounts!</p>
            <a 
              href="https://wa.me/919876543210?text=Hi%20I%20want%20to%20place%20a%20bulk%20order" 
              className="bg-fresh-green hover:bg-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:-translate-y-1" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp mr-2"></i> Bulk Order Inquiry
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Prices;
