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
 * Review System Service
 * Handles customer reviews management with Firestore
 */

const REVIEWS_COLLECTION = "reviews";

/**
 * Submit new review
 * @param {Object} review - Review data
 * @param {string} review.name - Reviewer name
 * @param {number} review.rating - Rating (1-5)
 * @param {string} review.comment - Review comment
 * @param {string} review.email - Reviewer email (optional)
 * @returns {Promise<string>} New review document ID
 */
export const submitReview = async (review) => {
  try {
    console.log('Review service: Starting review submission...');
    console.log('Review service: Input data:', review);
    
    // Clean up undefined fields
    const cleanedReview = {
      name: review.name,
      email: review.email || null,
      rating: review.rating,
      comment: review.comment,
      status: "pending",
      createdAt: new Date()
    };
    
    // Only include productId and productName if they exist
    if (review.productId) {
      cleanedReview.productId = review.productId;
    }
    if (review.productName) {
      cleanedReview.productName = review.productName;
    }
    
    console.log('Review service: Cleaned data:', cleanedReview);
    console.log('Review service: Collection path:', REVIEWS_COLLECTION);
    
    const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), cleanedReview);
    
    console.log('Review service: Document created with ID:', docRef.id);
    console.log('Review service: Review submitted successfully!');
    
    return docRef.id;
  } catch (error) {
    console.error("Review service: Error submitting review:", error);
    console.error("Review service: Error code:", error.code);
    console.error("Review service: Error message:", error.message);
    console.error("Review service: Full error:", error);
    throw error;
  }
};

/**
 * Get all approved reviews
 * @returns {Promise<Array>} Array of approved reviews
 */
export const getApprovedReviews = async () => {
  try {
    const q = query(
      collection(db, REVIEWS_COLLECTION), 
      where("status", "==", "approved"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting approved reviews:", error);
    throw error;
  }
};

/**
 * Get all reviews (including pending ones for admin)
 * @returns {Promise<Array>} Array of all reviews
 */
export const getAllReviews = async () => {
  try {
    const q = query(collection(db, REVIEWS_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting all reviews:", error);
    throw error;
  }
};

/**
 * Approve a review
 * @param {string} id - Review document ID
 * @returns {Promise<void>}
 */
export const approveReview = async (id) => {
  try {
    const docRef = doc(db, REVIEWS_COLLECTION, id);
    await updateDoc(docRef, {
      status: "approved",
      approvedAt: new Date()
    });
  } catch (error) {
    console.error("Error approving review:", error);
    throw error;
  }
};

/**
 * Delete a review
 * @param {string} id - Review document ID
 * @returns {Promise<void>}
 */
export const deleteReview = async (id) => {
  try {
    const docRef = doc(db, REVIEWS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

/**
 * Get single review by ID
 * @param {string} id - Review document ID
 * @returns {Promise<Object>} Review data
 */
export const getReviewById = async (id) => {
  try {
    const docRef = doc(db, REVIEWS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting review:", error);
    throw error;
  }
};

/**
 * Get pending reviews count
 * @returns {Promise<number>} Number of pending reviews
 */
export const getPendingReviewsCount = async () => {
  try {
    const q = query(collection(db, REVIEWS_COLLECTION), where("status", "==", "pending"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error getting pending reviews count:", error);
    throw error;
  }
};
