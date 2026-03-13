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
  onSnapshot
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getProductImage } from "../data/productImages";

/**
 * Product CRUD Service
 * Handles all product operations with Firestore
 */

const PRODUCTS_COLLECTION = "products";

/**
 * Get all products from Firestore
 * @returns {Promise<Array>} Array of products
 */
export const getProducts = async () => {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      image: getProductImage(doc.data().name)
    }));
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

/**
 * Add new product to Firestore
 * @param {Object} product - Product data
 * @param {string} product.name - Product name
 * @param {number} product.price - Product price
 * @param {string} product.unit - Product unit (kg, dozen, etc.)
 * @param {string} product.category - Product category (vegetable, fruit)
 * @param {string} product.imageUrl - Product image URL
 * @returns {Promise<string>} New product document ID
 */
export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

/**
 * Update existing product
 * @param {string} id - Product document ID
 * @param {Object} data - Updated product data
 * @returns {Promise<void>}
 */
export const updateProduct = async (id, data) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

/**
 * Delete product from Firestore
 * @param {string} id - Product document ID
 * @returns {Promise<void>}
 */
export const deleteProduct = async (id) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

/**
 * Get single product by ID
 * @param {string} id - Product document ID
 * @returns {Promise<Object>} Product data
 */
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
};

/**
 * Get products by category
 * @param {string} category - Product category
 * @returns {Promise<Array>} Array of products
 */
export const getProductsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION), 
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting products by category:", error);
    throw error;
  }
};

// Real-time products listener
export const onProductsUpdate = (callback) => {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        image: getProductImage(doc.data().name)
      }));
      
      callback(products);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error("Error setting up products listener:", error);
    return () => {};
  }
};

// Real-time products by category listener
export const onProductsByCategoryUpdate = (category, callback) => {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        image: getProductImage(doc.data().name)
      })).filter(product => product.category === category);
      
      callback(products);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error(`Error setting up ${category} products listener:`, error);
    return () => {};
  }
};
