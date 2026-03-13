import React, { useState, useEffect } from 'react';
import { getProducts, onProductsUpdate } from '../services/productService';

const Beverages = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up real-time listener for price updates
    const unsubscribe = onProductsUpdate((updatedProducts) => {
      setProducts(updatedProducts || []);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Filter beverages and remove duplicates
  const beverages = products.filter(product => product.category === 'beverage');
  
  // Remove duplicates by product name
  const uniqueBeverages = beverages.filter((beverage, index, self) =>
    index === self.findIndex((b) => b.name === beverage.name)
  );
  
  console.log('All products:', products.length);
  console.log('Filtered beverages:', beverages.length);
  console.log('Unique beverages:', uniqueBeverages.length);
  console.log('Beverage names:', uniqueBeverages.map(b => b.name));
  const whatsappNumber = "916201640686";

  const BeverageCard = ({ beverage }) => {
    const formattedPrice = `₹${beverage.price}/${beverage.unit || 'unit'}`;
    
    return (
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
        <div className="relative overflow-hidden">
          <img 
            src={beverage.image} 
            alt={beverage.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full text-xs font-bold">
            New
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{beverage.name}</h3>
          <p className="text-2xl font-black text-blue-600 mb-4">{formattedPrice}</p>
          <button 
            onClick={() => window.open(`https://wa.me/916201640686?text=I%20want%20to%20order%20${encodeURIComponent(beverage.name)}%20-%20${encodeURIComponent(formattedPrice)}`, '_blank')}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group hover:shadow-lg"
          >
            <i className="fab fa-whatsapp mr-2 group-hover:animate-bounce"></i>
            Order on WhatsApp
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-cyan-900 text-white py-32 text-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-indigo-400 to-blue-400 opacity-30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 left-1/3 w-56 h-56 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-44 h-44 bg-gradient-to-r from-indigo-300 to-cyan-300 opacity-25 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative z-10">
          <div className="hero-content transition-all duration-1000 transform translate-y-0 opacity-100">
            <div className="mb-8">
              <div className="mb-6">
                <h1 className="text-5xl md:text-8xl font-black mb-4 drop-shadow-3xl text-transparent bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-200 bg-clip-text animate-pulse">
                  Refreshing Beverages
                </h1>
                <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
                  Cool, Fresh & Delicious Drinks
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {loading ? (
                // Loading skeleton
                [1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))
              ) : (
                uniqueBeverages.map((beverage) => (
                  <BeverageCard key={beverage.id} beverage={beverage} />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Beverages;
