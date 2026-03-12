import React from 'react';

const FooterSimple = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">24*7 Fresh Store</h3>
            <p className="text-gray-300">Fresh vegetables and fruits delivered daily to your doorstep.</p>
            <div className="mt-4">
              <p className="text-gray-300">📍 NH-75 Highway, Kundi Shankha, Madhya Pradesh</p>
              <p className="text-gray-300">📞 +91 98765 43210</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition">Home</a></li>
              <li><a href="/vegetables" className="text-gray-300 hover:text-white transition">Vegetables</a></li>
              <li><a href="/fruits" className="text-gray-300 hover:text-white transition">Fruits</a></li>
              <li><a href="/today-prices" className="text-gray-300 hover:text-white transition">Today's Prices</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Business Hours</h3>
            <p className="text-gray-300">Monday - Sunday: 6:00 AM - 10:00 PM</p>
            <p className="text-gray-300 mt-2">24/7 Delivery Available</p>
            <div className="mt-4 flex space-x-4">
              <a href="tel:+919876543210" className="text-gray-300 hover:text-white transition">
                📞 Call Now
              </a>
              <a href="https://wa.me/919876543210" className="text-gray-300 hover:text-white transition">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 24*7 Fresh Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSimple;
