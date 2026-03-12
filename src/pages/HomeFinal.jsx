import React from 'react';

// Import vegetable images
import tomatoImage from '../assets/vegetables/tomato.webp';
import potatoImage from '../assets/vegetables/potato.webp';
import onionImage from '../assets/vegetables/onion.webp';

// Import fruit images
import appleImage from '../assets/fruits/apple.webp';
import bananaImage from '../assets/fruits/banana.webp';
import orangeImage from '../assets/fruits/orange.webp';

const HomeFinal = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to 24*7 Fresh Store
          </h1>
          <p className="text-xl mb-8">
            Fresh Vegetables & Fruits Delivered Daily
          </p>
          <div className="flex justify-center gap-4">
            <a href="/vegetables" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Shop Vegetables
            </a>
            <a href="/fruits" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Shop Fruits
            </a>
          </div>
        </div>
      </section>

      {/* Featured Vegetables */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-center mb-12">Fresh Vegetables</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                <img src={tomatoImage} alt="Tomato" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tomato</h3>
              <p className="text-gray-600">Fresh and juicy</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                <img src={potatoImage} alt="Potato" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Potato</h3>
              <p className="text-gray-600">Farm fresh</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                <img src={onionImage} alt="Onion" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Onion</h3>
              <p className="text-gray-600">Premium quality</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href="/vegetables" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              View All Vegetables
            </a>
          </div>
        </div>
      </section>

      {/* Featured Fruits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-center mb-12">Fresh Fruits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg">
              <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                <img src={appleImage} alt="Apple" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apple</h3>
              <p className="text-gray-600">Crispy and sweet</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                <img src={bananaImage} alt="Banana" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Banana</h3>
              <p className="text-gray-600">Ripe and tasty</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                <img src={orangeImage} alt="Orange" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Orange</h3>
              <p className="text-gray-600">Juicy and fresh</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href="/fruits" className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
              View All Fruits
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👩‍💼</span>
              </div>
              <p className="text-gray-600 mb-4">"Amazing quality vegetables delivered right to my door. Freshness guaranteed!"</p>
              <h4 className="font-semibold">- Priya Sharma</h4>
              <p className="text-sm text-gray-500">Regular Customer</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍🌾</span>
              </div>
              <p className="text-gray-600 mb-4">"Best fruits I've ever tasted. Always fresh and perfectly ripe."</p>
              <h4 className="font-semibold">- Ramesh Kumar</h4>
              <p className="text-sm text-gray-500">Fruit Lover</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👩‍🍳</span>
              </div>
              <p className="text-gray-600 mb-4">"24/7 service is incredible. Great for busy professionals like me."</p>
              <h4 className="font-semibold">- Anita Patel</h4>
              <p className="text-sm text-gray-500">Working Mom</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-600">How fresh are your products?</h3>
              <p className="text-gray-600">All our vegetables and fruits are sourced daily from local farms and delivered fresh to your doorstep within hours of harvest.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-600">What are your delivery hours?</h3>
              <p className="text-gray-600">We offer 24/7 delivery service. Orders placed before 8 PM are delivered the same day.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-600">Do you offer bulk orders?</h3>
              <p className="text-gray-600">Yes! We cater to restaurants, hotels, and events. Contact us for bulk pricing and special arrangements.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-600">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept cash on delivery, online payments via WhatsApp, and all major digital payment methods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-600">NH-75 Highway, Kundi Shankha, MP</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hours</h3>
              <p className="text-gray-600">24/7 Service Available</p>
            </div>
          </div>
          <a href="/contact" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomeFinal;
