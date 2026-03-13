import React, { useState, useEffect } from 'react';
import AdminFloatingButton from '../components/AdminFloatingButton';
import ReviewSection from '../components/ReviewSection';
import FloatingReviewButton from '../components/FloatingReviewButton';
import WhatsAppOrderTracker from '../components/WhatsAppOrderTracker';
import { getProducts, onProductsUpdate } from '../services/productService';

const Badge = ({ text, color }) => (
    <span className={`absolute top-2 right-2 ${color} text-white text-xs px-2 py-1 rounded-full text-xs font-bold`}>
      {text}
    </span>
  );

const ProductCard = ({ product, type, whatsappNumber }) => {
  // Format price from Firebase
  const formattedPrice = `₹${product.price}/${product.unit || 'kg'}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=I%20want%20to%20order%20${encodeURIComponent(product.name)}%20-%20${encodeURIComponent(formattedPrice)}`;

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            console.log('Image failed to load:', product.name, e);
            e.target.src = 'https://via.placeholder.com/300x200/cccccc/666666?text=Product+Image';
          }}
          onLoad={() => {
            console.log('Image loaded successfully:', product.name);
          }}
        />
        <Badge text="Fresh" color="bg-green-500" />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-xl sm:text-2xl font-black text-purple-600 mb-4">{formattedPrice}</p>
        <WhatsAppOrderTracker product={product.name}>
          <a 
            href={whatsappLink}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-colors duration-300 flex items-center justify-center text-sm sm:text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            <span className="hidden sm:inline">Order on WhatsApp</span>
            <span className="sm:hidden">Order</span>
          </a>
        </WhatsAppOrderTracker>
      </div>
    </div>
  );
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
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
  const fruits = products.filter(product => product.category === 'fruit');
  const beveragesData = products.filter(product => product.category === 'beverage');
  
  // WhatsApp number
  const whatsappNumber = "916201640686";

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: 'Do you deliver?',
      answer: 'Yes, we deliver fresh vegetables and fruits within 5km radius of our shop. Free delivery for orders above ₹500.'
    },
    {
      id: 2,
      question: 'Where is your shop located?',
      answer: 'We are located at Garhwa - Rajhara Rd, Jharkhand 822124. Easy to find and accessible!'
    },
    {
      id: 3,
      question: 'What are your opening hours?',
      answer: 'We are open 24/7! You can visit us anytime or order through WhatsApp for home delivery.'
    }
  ];

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 text-white py-32 text-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 left-1/3 w-56 h-56 bg-gradient-to-r from-pink-400 to-purple-400 opacity-30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-44 h-44 bg-gradient-to-r from-indigo-300 to-pink-300 opacity-25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-r from-purple-300 to-indigo-300 opacity-20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="relative z-10">
          <div className="hero-content transition-all duration-1000 transform translate-y-0 opacity-100">
            <div className="mb-8">
              <div className="mb-6">
                <h1 className="text-5xl md:text-8xl font-black mb-4 drop-shadow-3xl text-transparent bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text animate-pulse">
                  Fresh Vegetables & Fruits
                </h1>
                <h2 className="text-4xl md:text-7xl font-bold mb-6 drop-shadow-2xl text-white">
                  Delivered Daily
                </h2>
              </div>
              <p className="text-xl md:text-3xl mb-8 drop-shadow-xl text-purple-100 font-bold bg-gradient-to-r from-black/50 to-purple-900/50 px-8 py-4 rounded-full backdrop-blur-md max-w-3xl mx-auto">
                📍 Serving fresh produce near Kundi Rehla, Palamu, Jharkhand 822124
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <a href="tel:+916201640686" className="group relative bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 hover:from-yellow-500 hover:via-orange-500 hover:to-pink-500 text-purple-900 px-12 py-6 rounded-full font-black text-xl transition-all duration-500 transform hover:-translate-y-4 hover:shadow-3xl border-4 border-yellow-300/50 hover:scale-110 backdrop-blur-sm">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <span className="relative z-10 flex items-center">
                  <i className="fas fa-phone-alt mr-4 group-hover:animate-bounce text-2xl"></i> 
                  <span className="group-hover:text-purple-900">Call Now</span>
                </span>
              </a>
              <WhatsAppOrderTracker product="Fresh Vegetables and Fruits">
                <a href="https://wa.me/916201640686?text=Hi%20I%20want%20to%20order%20fresh%20vegetables%20and%20fruits" 
                   className="group relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white px-12 py-6 rounded-full font-black text-xl transition-all duration-500 transform hover:-translate-y-4 hover:shadow-3xl border-4 border-green-400/50 hover:scale-110 backdrop-blur-sm" target="_blank" rel="noopener noreferrer">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <span className="relative z-10 flex items-center">
                    <i className="fab fa-whatsapp mr-4 group-hover:animate-bounce text-2xl"></i> 
                    <span className="group-hover:text-yellow-200">Order on WhatsApp</span>
                  </span>
                </a>
              </WhatsAppOrderTracker>
            </div>
          </div>
        </div>
      </section>

      {/* Vegetables Section */}
      <section id="vegetables" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">Fresh Vegetables</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Farm-fresh vegetables delivered daily to your doorstep</p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {vegetables.map((vegetable) => (
                <ProductCard key={vegetable.id} product={vegetable} type="vegetable" whatsappNumber={whatsappNumber} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Fruits Section */}
      <section id="fruits" className="py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">Fresh Fruits</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Sweet and juicy fruits from the best orchards</p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {fruits.map((fruit) => (
                <ProductCard key={fruit.id} product={fruit} type="fruit" whatsappNumber={whatsappNumber} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Beverages Section */}
      <section id="beverages" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">Refreshing Beverages</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Quench your thirst with our premium selection of drinks</p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {beveragesData.map((beverage) => (
                <ProductCard key={beverage.id} product={beverage} type="beverage" whatsappNumber={whatsappNumber} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Today's Prices Section */}
      <section id="prices" className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">Today's Prices</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Fresh produce at the best prices in town</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
              <h3 className="text-2xl font-bold text-center">Daily Price List</h3>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-8 py-4 text-left font-bold text-gray-800 text-lg">Item</th>
                      <th className="px-8 py-4 text-left font-bold text-gray-800 text-lg">Price/kg</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.slice(0, 8).map((product, index) => (
                      <tr key={index} className="hover:bg-purple-50 transition-colors duration-200">
                        <td className="px-8 py-4 text-gray-800 font-medium text-lg">{product.name}</td>
                        <td className="px-8 py-4 text-purple-600 font-black text-xl">₹{product.price}/{product.unit || 'kg'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-gradient-to-br from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">Customer Reviews</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">What our customers say about us</p>
          </div>
          <ReviewSection />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to know about our service</p>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.id} className="mb-4 bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-purple-50 transition-colors duration-200"
                >
                  <span className="font-bold text-gray-800 text-lg">{faq.question}</span>
                  <i className={`fas fa-chevron-down text-purple-600 transition-transform duration-300 ${expandedFAQ === faq.id ? 'rotate-180' : ''}`}></i>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedFAQ === faq.id ? 'max-h-40' : 'max-h-0'}`}>
                  <div className="px-6 py-4 text-gray-600 bg-purple-50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <i className="fas fa-map-marker-alt text-4xl mb-4 text-yellow-300"></i>
              <h3 className="text-2xl font-bold mb-2">Location</h3>
              <p className="text-lg">Kundi Rehla, Palamu<br />Jharkhand 822124</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <i className="fas fa-phone text-4xl mb-4 text-yellow-300"></i>
              <h3 className="text-2xl font-bold mb-2">Phone</h3>
              <p className="text-lg">+91 6201640686</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <i className="fab fa-whatsapp text-4xl mb-4 text-yellow-300"></i>
              <h3 className="text-2xl font-bold mb-2">WhatsApp</h3>
              <a href="https://wa.me/916201640686" className="text-lg hover:text-yellow-300 transition-colors">Order on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us Section */}
      <section id="location" className="location bg-white py-16">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-fresh-green transition-all duration-1000 transform translate-y-0 opacity-100">
            📍 Find Us
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="card-enhanced rounded-xl overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8974!2d83.9305209!3d24.2140513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398c12aa80613f05:0x6b2ca4f274492e41!2s6W7H%2BWC%2C%20Sankha%2C%20Jharkhand%20815313!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%" 
                height="300" 
                style={{ border: '0' }} 
                allowFullScreen="" 
                loading="lazy"
                title="Store Location"
                className="rounded-xl"
              />
            </div>
            <div className="location-info p-6">
              <h3 className="text-2xl font-semibold mb-4 text-fresh-green">24*7 Fresh Store</h3>
              <div className="space-y-3">
                <p className="flex items-center text-lg">
                  <i className="fas fa-map-marker-alt mr-3 text-fresh-green"></i> 
                  6W7H+WC, Sankha, Jharkhand 815313
                </p>
                <p className="flex items-center text-lg">
                  <i className="fas fa-phone mr-3 text-fresh-green"></i> 
                  +91 6201640686
                </p>
                <p className="flex items-center text-lg">
                  <i className="fas fa-clock mr-3 text-fresh-green"></i> 
                  Open 24/7
                </p>
              </div>
              <a href="https://maps.google.com/?q=6W7H%2BWC%2C%20Sankha%2C%20Jharkhand%20815313" 
                 className="btn-enhanced bg-fresh-green hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-map-marked-alt mr-2"></i> View Location
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-fresh-green transition-all duration-1000 transform translate-y-0 opacity-100">
            📞 Contact Us
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-enhanced p-6 text-center hover-lift">
                <i className="fas fa-phone text-4xl text-fresh-green mb-3"></i>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                  <p className="text-gray-600 text-lg">+91 6201640686</p>
                </div>
              </div>
              <div className="card-enhanced p-6 text-center hover-lift">
                <i className="fab fa-whatsapp text-4xl text-whatsapp mb-3"></i>
                <div>
                  <h3 className="text-lg font-semibold mb-1">WhatsApp</h3>
                  <p className="text-gray-600 text-lg">+91 6201640686</p>
                </div>
              </div>
              <div className="card-enhanced p-6 text-center hover-lift">
                <i className="fas fa-envelope text-4xl text-fresh-green mb-3"></i>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <p className="text-gray-600 text-lg">freshstore@example.com</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a href="tel:+916201640686" className="btn-enhanced bg-fresh-green hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <i className="fas fa-phone mr-2"></i> Call Now
              </a>
              <a href="https://wa.me/916201640686" className="btn-enhanced bg-whatsapp hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp mr-2"></i> Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Floating Review Button */}
      <FloatingReviewButton />
      
      {/* Floating Admin Button */}
      <AdminFloatingButton />
    </div>
  );
};

export default Home;
