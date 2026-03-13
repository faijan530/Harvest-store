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

/**
 * Beverage Management Service
 * Handles beverage data and management
 */

const BEVERAGES_COLLECTION = "beverages";

/**
 * Get all beverages
 * @returns {Promise<Array>} Array of beverages
 */
export const getBeverages = async () => {
  try {
    const q = query(collection(db, BEVERAGES_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting beverages:", error);
    throw error;
  }
};

/**
 * Add new beverage
 * @param {Object} beverage - Beverage data
 * @param {string} beverage.name - Beverage name
 * @param {string} beverage.price - Beverage price
 * @param {string} beverage.image - Beverage image URL
 * @param {string} beverage.category - Beverage category (always "beverage")
 * @param {string} beverage.unit - Unit (e.g., "ml", "l", "bottle")
 * @returns {Promise<string>} New beverage document ID
 */
export const addBeverage = async (beverage) => {
  try {
    const beverageData = {
      ...beverage,
      category: "beverage",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, BEVERAGES_COLLECTION), beverageData);
    console.log("Beverage added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding beverage:", error);
    throw error;
  }
};

/**
 * Update existing beverage
 * @param {string} id - Beverage ID
 * @param {Object} beverage - Updated beverage data
 * @returns {Promise<void>}
 */
export const updateBeverage = async (id, beverage) => {
  try {
    const beverageRef = doc(db, BEVERAGES_COLLECTION, id);
    await updateDoc(beverageRef, {
      ...beverage,
      category: "beverage",
      updatedAt: new Date()
    });
    console.log("Beverage updated:", id);
  } catch (error) {
    console.error("Error updating beverage:", error);
    throw error;
  }
};

/**
 * Delete beverage
 * @param {string} id - Beverage ID
 * @returns {Promise<void>}
 */
export const deleteBeverage = async (id) => {
  try {
    const beverageRef = doc(db, BEVERAGES_COLLECTION, id);
    await deleteDoc(beverageRef);
    console.log("Beverage deleted:", id);
  } catch (error) {
    console.error("Error deleting beverage:", error);
    throw error;
  }
};

/**
 * Get beverage by ID
 * @param {string} id - Beverage ID
 * @returns {Promise<Object|null>} Beverage data or null
 */
export const getBeverageById = async (id) => {
  try {
    const beverageRef = doc(db, BEVERAGES_COLLECTION, id);
    const beverageDoc = await getDoc(beverageRef);
    
    if (beverageDoc.exists()) {
      return {
        id: beverageDoc.id,
        ...beverageDoc.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting beverage:", error);
    throw error;
  }
};

/**
 * Get beverages statistics
 * @returns {Promise<Object>} Statistics object
 */
export const getBeverageStatistics = async () => {
  try {
    const q = query(collection(db, BEVERAGES_COLLECTION));
    const querySnapshot = await getDocs(q);
    
    const beverages = querySnapshot.docs.map(doc => doc.data());
    const totalBeverages = beverages.length;
    const totalValue = beverages.reduce((sum, beverage) => {
      const price = parseFloat(beverage.price) || 0;
      return sum + price;
    }, 0);
    
    return {
      totalBeverages,
      totalValue,
      averagePrice: totalBeverages > 0 ? (totalValue / totalBeverages).toFixed(2) : 0
    };
  } catch (error) {
    console.error("Error getting beverage statistics:", error);
    throw error;
  }
};
