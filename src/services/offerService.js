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
 * Offers Management Service
 * Handles special offers and promotions
 */

const OFFERS_COLLECTION = "offers";

/**
 * Get all active offers
 * @returns {Promise<Array>} Array of active offers
 */
export const getActiveOffers = async () => {
  try {
    const q = query(
      collection(db, OFFERS_COLLECTION), 
      where("active", "==", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting active offers:", error);
    throw error;
  }
};

/**
 * Get all offers (including inactive ones for admin)
 * @returns {Promise<Array>} Array of all offers
 */
export const getAllOffers = async () => {
  try {
    const q = query(collection(db, OFFERS_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting all offers:", error);
    throw error;
  }
};

/**
 * Create new offer
 * @param {Object} offer - Offer data
 * @param {string} offer.title - Offer title
 * @param {number} offer.price - Offer price
 * @param {string} offer.unit - Price unit (kg, dozen, etc.)
 * @param {string} offer.description - Offer description (optional)
 * @param {boolean} offer.active - Active status
 * @param {string} offer.productName - Related product name
 * @returns {Promise<string>} New offer document ID
 */
export const createOffer = async (offer) => {
  try {
    const docRef = await addDoc(collection(db, OFFERS_COLLECTION), {
      ...offer,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating offer:", error);
    throw error;
  }
};

/**
 * Update existing offer
 * @param {string} id - Offer document ID
 * @param {Object} data - Updated offer data
 * @returns {Promise<void>}
 */
export const updateOffer = async (id, data) => {
  try {
    const docRef = doc(db, OFFERS_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error("Error updating offer:", error);
    throw error;
  }
};

/**
 * Delete offer
 * @param {string} id - Offer document ID
 * @returns {Promise<void>}
 */
export const deleteOffer = async (id) => {
  try {
    const docRef = doc(db, OFFERS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting offer:", error);
    throw error;
  }
};

/**
 * Toggle offer active status
 * @param {string} id - Offer document ID
 * @param {boolean} active - New active status
 * @returns {Promise<void>}
 */
export const toggleOfferStatus = async (id, active) => {
  try {
    const docRef = doc(db, OFFERS_COLLECTION, id);
    await updateDoc(docRef, {
      active,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error("Error toggling offer status:", error);
    throw error;
  }
};

/**
 * Get single offer by ID
 * @param {string} id - Offer document ID
 * @returns {Promise<Object>} Offer data
 */
export const getOfferById = async (id) => {
  try {
    const docRef = doc(db, OFFERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting offer:", error);
    throw error;
  }
};

/**
 * Get active offers count
 * @returns {Promise<number>} Number of active offers
 */
export const getActiveOffersCount = async () => {
  try {
    const q = query(collection(db, OFFERS_COLLECTION), where("active", "==", true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error getting active offers count:", error);
    throw error;
  }
};
