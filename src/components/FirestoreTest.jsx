import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

const FirestoreTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const testFirestoreWrite = async () => {
    setLoading(true);
    setResult('');

    try {
      console.log('Testing Firestore write...');
      
      // Test with a simple document
      const testData = {
        test: true,
        message: 'Test document',
        timestamp: new Date()
      };
      
      console.log('Test data:', testData);
      
      const docRef = await addDoc(collection(db, 'test_collection'), testData);
      
      console.log('Test successful! Document ID:', docRef.id);
      setResult(`✅ Test successful! Document ID: ${docRef.id}`);
      
    } catch (error) {
      console.error('Test failed:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      setResult(`❌ Test failed: ${error.message} (Code: ${error.code})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <h3 className="font-bold text-sm mb-2">Firestore Test</h3>
      <button
        onClick={testFirestoreWrite}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Write'}
      </button>
      {result && (
        <div className="mt-2 text-xs" style={{ whiteSpace: 'pre-wrap' }}>
          {result}
        </div>
      )}
    </div>
  );
};

export default FirestoreTest;
