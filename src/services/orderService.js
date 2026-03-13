import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  startAfter
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { addCustomer } from './customerService';

/**
 * Order Management Service
 * Handles customer orders and order management
 */

const ORDERS_COLLECTION = "orders";

/**
 * Get all orders
 * @param {number} pageSize - Number of orders per page (optional)
 * @param {Object} lastDoc - Last document for pagination (optional)
 * @returns {Promise<Object>} Orders array and last document
 */
export const getOrders = async (pageSize = 50, lastDoc = null) => {
  try {
    let q = query(
      collection(db, ORDERS_COLLECTION), 
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );
    
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return {
      orders,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] || null
    };
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
};

/**
 * Create new order
 * @param {Object} order - Order data
 * @param {string} order.customerName - Customer name
 * @param {string} order.customerPhone - Customer phone
 * @param {string} order.customerEmail - Customer email (optional)
 * @param {Array} order.items - Order items
 * @param {number} order.totalAmount - Total amount
 * @param {string} order.deliveryAddress - Delivery address
 * @param {string} order.status - Order status
 * @returns {Promise<string>} New order document ID
 */
export const createOrder = async (order) => {
  try {
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      ...order,
      status: "pending",
      createdAt: new Date(),
      orderNumber: generateOrderNumber()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

/**
 * Update order status
 * @param {string} id - Order document ID
 * @param {string} status - New status
 * @returns {Promise<void>}
 */
export const updateOrderStatus = async (id, status) => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

/**
 * Update order
 * @param {string} id - Order document ID
 * @param {Object} data - Updated order data
 * @returns {Promise<void>}
 */
export const updateOrder = async (id, data) => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

/**
 * Delete order
 * @param {string} id - Order document ID
 * @returns {Promise<void>}
 */
export const deleteOrder = async (id) => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

/**
 * Get single order by ID
 * @param {string} id - Order document ID
 * @returns {Promise<Object>} Order data
 */
export const getOrderById = async (id) => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting order:", error);
    throw error;
  }
};

/**
 * Get orders by status
 * @param {string} status - Order status
 * @returns {Promise<Array>} Array of orders
 */
export const getOrdersByStatus = async (status) => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION), 
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting orders by status:", error);
    throw error;
  }
};

/**
 * Get orders by customer
 * @param {string} customerPhone - Customer phone number
 * @returns {Promise<Array>} Array of orders
 */
export const getOrdersByCustomer = async (customerPhone) => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION), 
      where("customerPhone", "==", customerPhone),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting orders by customer:", error);
    throw error;
  }
};

/**
 * Get order statistics
 * @returns {Promise<Object>} Order statistics
 */
export const getOrderStatistics = async () => {
  try {
    const [allOrders, pendingOrders, completedOrders] = await Promise.all([
      getDocs(collection(db, ORDERS_COLLECTION)),
      getDocs(query(collection(db, ORDERS_COLLECTION), where("status", "==", "pending"))),
      getDocs(query(collection(db, ORDERS_COLLECTION), where("status", "==", "delivered")))
    ]);

    const totalRevenue = allOrders.docs.reduce((total, doc) => {
      return total + (doc.data().totalAmount || 0);
    }, 0);

    return {
      totalOrders: allOrders.size,
      pendingOrders: pendingOrders.size,
      completedOrders: completedOrders.size,
      totalRevenue
    };
  } catch (error) {
    console.error("Error getting order statistics:", error);
    throw error;
  }
};

/**
 * Generate unique order number
 * @returns {string} Order number
 */
const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD${timestamp}${random}`;
};

/**
 * Track WhatsApp order click
 * @param {string} product - Product name
 * @param {string} message - WhatsApp message content
 * @returns {Promise<string>} Order tracking ID
 */
export const trackWhatsAppOrder = async (product, message) => {
  try {
    console.log('orderService: trackWhatsAppOrder called');
    console.log('orderService: Product:', product);
    console.log('orderService: Message:', message);
    
    // Extract phone number from message if available
    // Handle various phone formats: +91XXXXXXXXXX, 91XXXXXXXXXX, XXXXXXXXXX
    const phonePatterns = [
      /(\+91\s?\d{10})/g,           // +91 followed by 10 digits
      /(\d{10})/g,                  // 10 digits
      /(91\s?\d{10})/g              // 91 followed by 10 digits
    ];
    
    let customerPhone = null;
    for (const pattern of phonePatterns) {
      const match = message.match(pattern);
      if (match) {
        customerPhone = match[0].replace(/\s/g, ''); // Remove spaces
        break;
      }
    }
    
    // Extract total amount from message if available
    // Handle various price formats: ₹112, %E2%82%B9112, 112, Rs.112
    let totalAmount = 0;
    
    // Try to decode URL encoded message first
    let decodedMessage = message;
    try {
      decodedMessage = decodeURIComponent(message);
    } catch (e) {
      // Keep original message if decoding fails
    }
    
    console.log('orderService: Decoded message:', decodedMessage);
    
    const pricePatterns = [
      /₹(\d+(?:\.\d{1,2})?)/g,           // ₹112
      /%E2%82%B9(\d+(?:\.\d{1,2})?)/g,   // %E2%82%B9112 (URL encoded ₹)
      /Rs\.?\s*(\d+(?:\.\d{1,2})?)/gi,   // Rs.112 or Rs 112
      /(\d+(?:\.\d{1,2})?)\s*\/\s*kg/gi, // 112/kg
      /(\d+(?:\.\d{1,2})?)/g              // Any number (fallback)
    ];
    
    for (const pattern of pricePatterns) {
      const matches = decodedMessage.match(pattern);
      if (matches) {
        // Extract the first number from the match
        const numberMatch = matches[0].match(/(\d+(?:\.\d{1,2})?)/);
        if (numberMatch) {
          totalAmount = parseFloat(numberMatch[1]);
          break;
        }
      }
    }
    
    console.log('orderService: Extracted phone:', customerPhone);
    console.log('orderService: Extracted total:', totalAmount);
    
    // Create or update customer if phone number is available
    if (customerPhone) {
      try {
        // Check if customer already exists
        const customersRef = collection(db, 'customers');
        const q = query(customersRef, where('phone', '==', customerPhone));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          // Create new customer
          const customerData = {
            name: 'WhatsApp Customer',
            phone: customerPhone,
            email: null,
            address: null,
            status: 'active',
            totalOrders: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          const customerDocRef = await addDoc(customersRef, customerData);
          console.log('orderService: New customer created with ID:', customerDocRef.id);
        } else {
          // Update existing customer's order count
          const customerDoc = querySnapshot.docs[0];
          const customerRef = doc(db, 'customers', customerDoc.id);
          await updateDoc(customerRef, {
            totalOrders: (customerDoc.data().totalOrders || 0) + 1,
            updatedAt: new Date()
          });
          console.log('orderService: Existing customer updated:', customerDoc.id);
        }
      } catch (error) {
        console.error('orderService: Error creating/updating customer:', error);
        // Continue with order creation even if customer creation fails
      }
    } else {
      // Create Guest Customer for orders without phone numbers
      try {
        const guestCustomerData = {
          name: 'Guest Customer',
          phone: null,
          email: null,
          address: null,
          status: 'guest',
          totalOrders: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const guestCustomerRef = await addDoc(collection(db, 'customers'), guestCustomerData);
        console.log('orderService: Guest customer created with ID:', guestCustomerRef.id);
      } catch (error) {
        console.error('orderService: Error creating guest customer:', error);
      }
    }
    
    const orderData = {
      orderNumber: generateOrderNumber(),
      customerName: customerPhone ? 'WhatsApp Customer' : 'Guest Customer',
      customerPhone: customerPhone,
      products: product,
      message: message,
      source: 'whatsapp',
      orderType: 'whatsapp',
      status: 'pending',
      totalAmount: totalAmount, // Use extracted amount
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('orderService: Creating order with data:', orderData);
    
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderData);
    console.log('orderService: WhatsApp order tracked with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("orderService: Error tracking WhatsApp order:", error);
    throw error;
  }
};
