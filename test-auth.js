import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

// Test Firebase authentication
const testAuth = async () => {
  try {
    console.log('Testing Firebase auth...');
    console.log('Auth object:', auth);
    
    // Test with your credentials
    const email = "faijankhan123@gmail.com";
    const password = "admin123"; // Try this password
    
    console.log('Attempting login with:', email);
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Login successful:', userCredential.user);
    console.log('User email:', userCredential.user.email);
    console.log('User UID:', userCredential.user.uid);
    
  } catch (error) {
    console.error('Firebase auth error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'auth/user-not-found') {
      console.log('User does not exist. You need to create this user in Firebase Console.');
    } else if (error.code === 'auth/wrong-password') {
      console.log('Wrong password. Try a different password.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('Invalid email format.');
    }
  }
};

// Run the test
testAuth();
