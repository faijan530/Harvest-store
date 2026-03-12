import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

// Public Pages
import Home from './pages/Home.jsx';
import Vegetables from './pages/Vegetables.jsx';
import Fruits from './pages/Fruits.jsx';
import Contact from './pages/Contact.jsx';
import Prices from './pages/Prices.jsx';

// Admin Pages
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboardFixed.jsx';

// Admin Route Protection
import AdminRoute from './components/AdminRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - Nested structure */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="vegetables" element={<Vegetables />} />
          <Route path="fruits" element={<Fruits />} />
          <Route path="contact" element={<Contact />} />
          <Route path="today-prices" element={<Prices />} />
        </Route>

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
          <Route path="settings" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
