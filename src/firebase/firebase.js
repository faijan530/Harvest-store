import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM1RaDHtQ2BD-2qrpN5Q1bwJVAHcGspDg",
  authDomain: "harvest-store-8d206.firebaseapp.com",
  projectId: "harvest-store-8d206",
  storageBucket: "harvest-store-8d206.firebasestorage.app",
  messagingSenderId: "609383793374",
  appId: "1:609383793374:web:32dab2e27ccfdf7c5cb84f",
  measurementId: "G-8WN8YSV45E"
};

// Initialize Firebase
console.log('firebase.js: Initializing Firebase...');
console.log('firebase.js: Config:', firebaseConfig);

const app = initializeApp(firebaseConfig);
console.log('firebase.js: Firebase app initialized:', app);

const analytics = getAnalytics(app);
console.log('firebase.js: Analytics initialized');

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

console.log('firebase.js: Firestore initialized:', db);
console.log('firebase.js: Auth initialized:', auth);
console.log('firebase.js: Storage initialized:', storage);

export default app;
