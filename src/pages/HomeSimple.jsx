import React from 'react';

const HomeSimple = () => {
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
    </div>
  );
};

export default HomeSimple;
