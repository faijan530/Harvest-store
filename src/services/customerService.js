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
  where
} from "firebase/firestore";
import { db } from "../firebase/firebase";

/**
 * Customer Management Service
 * Handles customer data and management
 */

const CUSTOMERS_COLLECTION = "customers";

/**
 * Get all customers
 * @returns {Promise<Array>} Array of customers
 */
export const getCustomers = async () => {
  try {
    const q = query(collection(db, CUSTOMERS_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting customers:", error);
    throw error;
  }
};

/**
 * Add new customer
 * @param {Object} customer - Customer data
 * @param {string} customer.name - Customer name
 * @param {string} customer.phone - Customer phone
 * @param {string} customer.email - Customer email (optional)
 * @param {string} customer.address - Customer address
 * @returns {Promise<string>} New customer document ID
 */
export const addCustomer = async (customer) => {
  try {
    const docRef = await addDoc(collection(db, CUSTOMERS_COLLECTION), {
      ...customer,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};

/**
 * Update existing customer
 * @param {string} id - Customer document ID
 * @param {Object} data - Updated customer data
 * @returns {Promise<void>}
 */
export const updateCustomer = async (id, data) => {
  try {
    const docRef = doc(db, CUSTOMERS_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

/**
 * Delete customer
 * @param {string} id - Customer document ID
 * @returns {Promise<void>}
 */
export const deleteCustomer = async (id) => {
  try {
    const docRef = doc(db, CUSTOMERS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};

/**
 * Get single customer by ID
 * @param {string} id - Customer document ID
 * @returns {Promise<Object>} Customer data
 */
export const getCustomerById = async (id) => {
  try {
    const docRef = doc(db, CUSTOMERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting customer:", error);
    throw error;
  }
};

/**
 * Get customer by phone number
 * @param {string} phone - Customer phone number
 * @returns {Promise<Object|null>} Customer data or null
 */
export const getCustomerByPhone = async (phone) => {
  try {
    const q = query(collection(db, CUSTOMERS_COLLECTION), where("phone", "==", phone));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error getting customer by phone:", error);
    throw error;
  }
};

/**
 * Get customer by email
 * @param {string} email - Customer email
 * @returns {Promise<Object|null>} Customer data or null
 */
export const getCustomerByEmail = async (email) => {
  try {
    const q = query(collection(db, CUSTOMERS_COLLECTION), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error getting customer by email:", error);
    throw error;
  }
};

/**
 * Search customers by name or phone
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Array of matching customers
 */
export const searchCustomers = async (searchTerm) => {
  try {
    // Get all customers and filter client-side (Firestore doesn't support OR queries)
    const querySnapshot = await getDocs(collection(db, CUSTOMERS_COLLECTION));
    
    const customers = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(customer => 
        customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone?.includes(searchTerm)
      );
    
    return customers;
  } catch (error) {
    console.error("Error searching customers:", error);
    throw error;
  }
};

/**
 * Get customer statistics
 * @returns {Promise<Object>} Customer statistics
 */
export const getCustomerStatistics = async () => {
  try {
    const [allCustomers, recentCustomers] = await Promise.all([
      getDocs(collection(db, CUSTOMERS_COLLECTION)),
      getDocs(query(
        collection(db, CUSTOMERS_COLLECTION), 
        where("createdAt", ">", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // Last 30 days
      ))
    ]);

    return {
      totalCustomers: allCustomers.size,
      newCustomers: recentCustomers.size
    };
  } catch (error) {
    console.error("Error getting customer statistics:", error);
    throw error;
  }
};

/**
 * Update customer order count
 * @param {string} customerId - Customer ID
 * @param {number} increment - Number to increment by
 * @returns {Promise<void>}
 */
export const updateCustomerOrderCount = async (customerId, increment = 1) => {
  try {
    const customerRef = doc(db, CUSTOMERS_COLLECTION, customerId);
    const customerSnap = await getDoc(customerRef);
    
    if (customerSnap.exists()) {
      const currentOrders = customerSnap.data().totalOrders || 0;
      await updateDoc(customerRef, {
        totalOrders: currentOrders + increment,
        lastOrderAt: new Date()
      });
    }
  } catch (error) {
    console.error("Error updating customer order count:", error);
    throw error;
  }
};
