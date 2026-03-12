import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Test if React is mounting
console.log('React is about to mount...');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('React mounted successfully!');
