import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Monitor authentication changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
      }
    };

    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('rememberAdmin');
    sessionStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Header - Same as Website */}
      <Header />
      
      <div className="flex flex-1 relative">
        {/* Admin Sidebar */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content Area */}
        <div className="ml-[250px] flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet context={{ activeTab, setActiveTab }} />
        </div>
      </div>
      
      {/* Main Footer - Same as Website */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
