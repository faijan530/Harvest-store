import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

// Public Pages
import Home from './pages/Home.jsx';
import Vegetables from './pages/Vegetables.jsx';
import Fruits from './pages/Fruits.jsx';
import Beverages from './pages/Beverages.jsx';
import Contact from './pages/Contact.jsx';
import Prices from './pages/Prices.jsx';

// Admin Pages
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboardFixed.jsx';
import FirebaseDemo from './pages/FirebaseDemo.jsx';

// Admin Route Protection
import AdminRoute from './components/AdminRoute.jsx';
import KeyboardShortcutListener from './components/KeyboardShortcutListener.jsx';

function App() {
  console.log('App component is rendering...');
  return (
    <AuthProvider>
      <Router>
        <KeyboardShortcutListener />
        <Routes>
          {/* Public Routes - Nested structure */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="vegetables" element={<Vegetables />} />
            <Route path="fruits" element={<Fruits />} />
            <Route path="beverages" element={<Beverages />} />
            <Route path="contact" element={<Contact />} />
            <Route path="today-prices" element={<Prices />} />
          </Route>

          {/* Firebase Demo Route */}
          <Route path="/firebase-demo" element={<FirebaseDemo />} />

          {/* Admin Login - Standalone page */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes - Nested structure with protection */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminDashboard />} />
            <Route path="customers" element={<AdminDashboard />} />
            <Route path="reviews" element={<AdminDashboard />} />
            <Route path="analytics" element={<AdminDashboard />} />
            <Route path="settings" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
