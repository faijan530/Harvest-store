import React from 'react';

const HomeSimpleTest = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ff0000', 
      color: '#ffffff',
      padding: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1>TEST: HOME PAGE IS WORKING!</h1>
      <p>If you can see this, React is mounting properly</p>
      <div style={{ backgroundColor: '#ffffff', color: '#000000', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>Content Section Test</h2>
        <p>This should be visible if the page is rendering correctly.</p>
      </div>
    </div>
  );
};

export default HomeSimpleTest;
