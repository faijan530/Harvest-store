import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { storage } from "../firebase/firebase";

/**
 * Storage Service
 * Handles file uploads to Firebase Storage
 */

/**
 * Upload product image to Firebase Storage
 * @param {File} file - Image file to upload
 * @param {string} fileName - Custom filename (optional)
 * @returns {Promise<string>} Download URL of uploaded image
 */
export const uploadProductImage = async (file, fileName = null) => {
  try {
    // Generate unique filename if not provided
    const uniqueFileName = fileName || `${Date.now()}_${file.name}`;
    
    // Create storage reference in /products/ folder
    const storageRef = ref(storage, `products/${uniqueFileName}`);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading product image:", error);
    throw error;
  }
};

/**
 * Delete image from Firebase Storage
 * @param {string} imageUrl - Full URL of the image to delete
 * @returns {Promise<void>}
 */
export const deleteImage = async (imageUrl) => {
  try {
    // Extract file path from URL
    const url = new URL(imageUrl);
    const filePath = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);
    
    // Create storage reference
    const storageRef = ref(storage, filePath);
    
    // Delete file
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

/**
 * Upload multiple product images
 * @param {File[]} files - Array of image files
 * @returns {Promise<Array>} Array of download URLs
 */
export const uploadMultipleProductImages = async (files) => {
  try {
    const uploadPromises = files.map(file => uploadProductImage(file));
    const downloadURLs = await Promise.all(uploadPromises);
    return downloadURLs;
  } catch (error) {
    console.error("Error uploading multiple images:", error);
    throw error;
  }
};

/**
 * Get file extension from filename
 * @param {string} filename - File name
 * @returns {string} File extension
 */
export const getFileExtension = (filename) => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {boolean} True if valid image file
 */
export const validateImageFile = (file) => {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return false;
  }
  
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return false;
  }
  
  return true;
};
