import React from 'react';

const HomeTest = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'yellow',
      color: 'black',
      padding: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center'
    }}>
      <h1>YELLOW TEST PAGE</h1>
      <p>If you see yellow, CSS is working</p>
      <p>If you see black text, content is rendering</p>
      <div style={{
        backgroundColor: 'green',
        color: 'white',
        padding: '20px',
        margin: '20px',
        borderRadius: '8px'
      }}>
        <h2>GREEN CONTENT BOX</h2>
        <p>This tests if nested content renders</p>
      </div>
    </div>
  );
};

export default HomeTest;
