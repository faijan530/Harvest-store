import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * KeyboardShortcutListener Component
 * 
 * Handles global keyboard shortcuts for admin access
 * 
 * Shortcut: Ctrl + Shift + A
 * Action: Navigate to /admin/login
 */
const KeyboardShortcutListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Ctrl + Shift + A
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        console.log('Admin shortcut triggered: Ctrl + Shift + A');
        navigate('/admin/login');
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  // This component doesn't render anything
  return null;
};

export default KeyboardShortcutListener;
