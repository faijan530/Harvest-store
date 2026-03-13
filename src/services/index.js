/**
 * Firebase Backend Services Index
 * Central export point for all Firebase services
 */

// Authentication Services
export {
  loginAdmin,
  logoutAdmin,
  getCurrentUser,
  onAuthStateChangedListener
} from './authService.js';

// Product Services
export {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductsByCategory
} from './productService.js';

// Review Services
export {
  submitReview,
  getApprovedReviews,
  getAllReviews,
  approveReview,
  deleteReview,
  getReviewById,
  getPendingReviewsCount
} from './reviewService.js';

// Storage Services
export {
  uploadProductImage,
  deleteImage,
  uploadMultipleProductImages,
  getFileExtension,
  validateImageFile
} from './storageService.js';

// Offer Services
export {
  getActiveOffers,
  getAllOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  toggleOfferStatus,
  getOfferById,
  getActiveOffersCount
} from './offerService.js';

// FAQ Services
export {
  getFAQs,
  addFAQ,
  updateFAQ,
  deleteFAQ,
  getFAQById,
  reorderFAQs,
  getFAQsByCategory,
  getFAQCategories
} from './faqService.js';

// Order Services
export {
  getOrders,
  createOrder,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrdersByStatus,
  getOrdersByCustomer,
  getOrderStatistics,
  trackWhatsAppOrder
} from './orderService.js';

// Customer Services
export {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomerByPhone,
  getCustomerByEmail,
  searchCustomers,
  getCustomerStatistics,
  updateCustomerOrderCount
} from './customerService.js';

// Firebase Config
export { db, auth, storage } from '../firebase/firebase.js';
