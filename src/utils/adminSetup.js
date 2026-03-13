import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

/**
 * Create first admin user for 24*7 Fresh Store
 * This function should only be run once to create the initial admin account
 */
export const createFirstAdmin = async (email = "admin@harveststore.com", password = "admin123") => {
  try {
    console.log("Creating first admin user...");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Admin user created successfully!", userCredential.user.email);
    return userCredential;
  } catch (error) {
    console.error("Error creating admin user:", error);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log("Admin user already exists!");
    }
    
    throw error;
  }
};

/**
 * Quick setup function - run this in browser console to create admin
 */
export const quickAdminSetup = async () => {
  try {
    await createFirstAdmin();
    alert("Admin user created! You can now login with:\nEmail: admin@harveststore.com\nPassword: admin123");
  } catch (error) {
    alert("Admin user might already exist or there was an error. Check console for details.");
  }
};
