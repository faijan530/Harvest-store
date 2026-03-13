import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log('main.jsx is executing...');

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log('About to render React app...');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('React app rendered!');
