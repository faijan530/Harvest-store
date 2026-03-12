import React from 'react';
import { Link } from 'react-router-dom';

const AdminFloatingButton = () => {
  return (
    <Link
      to="/admin/login"
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
      title="Admin Panel"
    >
      <div className="relative">
        <i className="fas fa-user-shield text-xl"></i>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      </div>
      <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Admin Panel
      </span>
    </Link>
  );
};

export default AdminFloatingButton;
