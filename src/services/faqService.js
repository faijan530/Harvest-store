import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase/firebase";

/**
 * FAQ Management Service
 * Handles frequently asked questions
 */

const FAQ_COLLECTION = "faq";

/**
 * Get all FAQs
 * @returns {Promise<Array>} Array of FAQs
 */
export const getFAQs = async () => {
  try {
    const q = query(collection(db, FAQ_COLLECTION), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting FAQs:", error);
    throw error;
  }
};

/**
 * Add new FAQ
 * @param {Object} faq - FAQ data
 * @param {string} faq.question - FAQ question
 * @param {string} faq.answer - FAQ answer
 * @param {number} faq.order - Display order (optional)
 * @param {string} faq.category - FAQ category (optional)
 * @returns {Promise<string>} New FAQ document ID
 */
export const addFAQ = async (faq) => {
  try {
    const docRef = await addDoc(collection(db, FAQ_COLLECTION), {
      ...faq,
      order: faq.order || 0,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding FAQ:", error);
    throw error;
  }
};

/**
 * Update existing FAQ
 * @param {string} id - FAQ document ID
 * @param {Object} data - Updated FAQ data
 * @returns {Promise<void>}
 */
export const updateFAQ = async (id, data) => {
  try {
    const docRef = doc(db, FAQ_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    throw error;
  }
};

/**
 * Delete FAQ
 * @param {string} id - FAQ document ID
 * @returns {Promise<void>}
 */
export const deleteFAQ = async (id) => {
  try {
    const docRef = doc(db, FAQ_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    throw error;
  }
};

/**
 * Get single FAQ by ID
 * @param {string} id - FAQ document ID
 * @returns {Promise<Object>} FAQ data
 */
export const getFAQById = async (id) => {
  try {
    const docRef = doc(db, FAQ_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting FAQ:", error);
    throw error;
  }
};

/**
 * Reorder FAQs
 * @param {Array} faqUpdates - Array of FAQ updates with id and order
 * @returns {Promise<void>}
 */
export const reorderFAQs = async (faqUpdates) => {
  try {
    const updatePromises = faqUpdates.map(({ id, order }) => 
      updateDoc(doc(db, FAQ_COLLECTION, id), { order })
    );
    await Promise.all(updatePromises);
  } catch (error) {
    console.error("Error reordering FAQs:", error);
    throw error;
  }
};

/**
 * Get FAQs by category
 * @param {string} category - FAQ category
 * @returns {Promise<Array>} Array of FAQs in category
 */
export const getFAQsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, FAQ_COLLECTION), 
      where("category", "==", category),
      orderBy("order", "asc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting FAQs by category:", error);
    throw error;
  }
};

/**
 * Get FAQ categories
 * @returns {Promise<Array>} Array of unique categories
 */
export const getFAQCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, FAQ_COLLECTION));
    const categories = new Set();
    
    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.category) {
        categories.add(data.category);
      }
    });
    
    return Array.from(categories);
  } catch (error) {
    console.error("Error getting FAQ categories:", error);
    throw error;
  }
};
