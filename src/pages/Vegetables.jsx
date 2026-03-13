import React, { useState, useEffect } from "react";
import AdminFloatingButton from '../components/AdminFloatingButton';
import { getProducts, onProductsUpdate } from '../services/productService';

const Vegetables = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch products from Firebase
  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchInitialProducts();

    // Set up real-time listener for price updates
    const unsubscribe = onProductsUpdate((updatedProducts) => {
      setProducts(updatedProducts);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Filter products by category
  const vegetables = products.filter(product => product.category === 'vegetable');
  
  // WhatsApp number
  const whatsappNumber = "916201640686";

  // Product card component
  const ProductCard = ({ product }) => {
    // Format price from Firebase
    const formattedPrice = `₹${product.price}/${product.unit || 'kg'}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=I%20want%20to%20order%20${encodeURIComponent(product.name)}%20-%20${encodeURIComponent(formattedPrice)}`;

    return (
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-2xl font-black text-purple-600 mb-4">{formattedPrice}</p>
          <a 
            href={whatsappLink}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group hover:shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp mr-2 group-hover:animate-bounce"></i>
            Order on WhatsApp
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="vegetables-page min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fresh Vegetables
          </h1>

          <p className="text-xl">Farm-fresh vegetables delivered to your doorstep</p>
        </div>
      </section>

      {/* Vegetables Grid */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">All Vegetables</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl overflow-hidden shadow-lg p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {vegetables.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Order */}
      <section className="bg-gray-50 py-16 text-center">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-3xl font-bold mb-4 text-green-600">
            Quick Order
          </h2>
          <p className="text-lg mb-8 text-gray-600">
            Can't find what you're looking for? Message us on WhatsApp!
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hi I want to order vegetables`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition"
          >
            Order Custom Vegetables
          </a>
        </div>
      </section>
    </div>
  );
};

export default Vegetables;