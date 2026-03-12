import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Check both localStorage and sessionStorage for admin token
  const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
  
  // Debug logging
  console.log('AdminRoute - Token check:', { 
    localStorage: localStorage.getItem('adminToken'),
    sessionStorage: sessionStorage.getItem('adminToken'),
    token: token 
  });
  
  if (!token) {
    console.log('AdminRoute - Redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }
  
  console.log('AdminRoute - Access granted, rendering children');
  return children;
};

export default AdminRoute;
