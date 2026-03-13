import { collection, addDoc } from 'firebase/firestore';
import { db } from './src/firebase/firebase.js';

// Sample beverages data
const sampleBeverages = [
  {
    name: "Coca Cola",
    price: "40",
    unit: "ml",
    category: "beverage",
    image: "Coca Cola",
    status: "active",
    description: "Classic cola drink"
  },
  {
    name: "Pepsi",
    price: "40",
    unit: "ml",
    category: "beverage",
    image: "Pepsi",
    status: "active",
    description: "Refreshing cola drink"
  },
  {
    name: "Sprite",
    price: "40",
    unit: "ml",
    category: "beverage",
    image: "Sprite",
    status: "active",
    description: "Lemon-lime soft drink"
  },
  {
    name: "Mountain Dew",
    price: "45",
    unit: "ml",
    category: "beverage",
    image: "Mountain Dew",
    status: "active",
    description: "Citrus flavored soft drink"
  },
  {
    name: "Mango Drink",
    price: "50",
    unit: "ml",
    category: "beverage",
    image: "Mango Drink",
    status: "active",
    description: "Sweet mango beverage"
  },
  {
    name: "Frooti",
    price: "35",
    unit: "ml",
    category: "beverage",
    image: "Frooti",
    status: "active",
    description: "Mango fruit drink"
  },
  {
    name: "Limca",
    price: "40",
    unit: "ml",
    category: "beverage",
    image: "Limca",
    status: "active",
    description: "Lemon flavored soft drink"
  },
  {
    name: "Mazza",
    price: "45",
    unit: "ml",
    category: "beverage",
    image: "Mazza",
    status: "active",
    description: "Mango fruit drink"
  },
  {
    name: "Campa",
    price: "35",
    unit: "ml",
    category: "beverage",
    image: "Campa",
    status: "active",
    description: "Cola soft drink"
  },
  {
    name: "Fenta",
    price: "30",
    unit: "ml",
    category: "beverage",
    image: "Fenta",
    status: "active",
    description: "Orange flavored drink"
  },
  {
    name: "Cherry",
    price: "50",
    unit: "ml",
    category: "beverage",
    image: "Cherry",
    status: "active",
    description: "Cherry flavored drink"
  },
  {
    name: "Chocolate",
    price: "60",
    unit: "ml",
    category: "beverage",
    image: "Chocolate",
    status: "active",
    description: "Chocolate beverage"
  },
  {
    name: "Vanilla",
    price: "55",
    unit: "ml",
    category: "beverage",
    image: "Vanilla",
    status: "active",
    description: "Vanilla flavored drink"
  }
];

async function addSampleBeverages() {
  console.log('🎯 Adding sample beverages to Firebase...');
  
  try {
    const productsRef = collection(db, 'products');
    
    for (const beverage of sampleBeverages) {
      const beverageData = {
        ...beverage,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const docRef = await addDoc(productsRef, beverageData);
      console.log(`✅ Added: ${beverage.name} (ID: ${docRef.id})`);
    }
    
    console.log('\n🎉 All sample beverages added successfully!');
    console.log('📝 Total beverages added:', sampleBeverages.length);
    console.log('🚀 Now you can see them on the Home page and /beverages page');
    
  } catch (error) {
    console.error('❌ Error adding beverages:', error);
  }
}

// Run the function
addSampleBeverages();
