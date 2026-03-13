import React, { useState } from 'react';
import { trackWhatsAppOrder } from '../services';

const WhatsAppOrderTracker = ({ product, children, className }) => {
  const [tracking, setTracking] = useState(false);

  const handleWhatsAppClick = async (e) => {
    e.preventDefault();
    
    if (tracking) return;
    
    try {
      setTracking(true);
      
      console.log('WhatsAppOrderTracker: Click detected for product:', product);
      
      // Get the WhatsApp message from the href
      const href = e.currentTarget.href;
      const message = href.split('text=')[1]?.replace(/%20/g, ' ') || '';
      
      console.log('WhatsAppOrderTracker: Message:', message);
      console.log('WhatsAppOrderTracker: Tracking order...');
      
      // Track the order in Firebase
      const orderId = await trackWhatsAppOrder(product, message);
      console.log('WhatsAppOrderTracker: Order tracked with ID:', orderId);
      
      // Open WhatsApp after tracking
      console.log('WhatsAppOrderTracker: Opening WhatsApp...');
      window.open(href, '_blank');
      
    } catch (error) {
      console.error('WhatsAppOrderTracker: Error tracking WhatsApp order:', error);
      // Still open WhatsApp even if tracking fails
      window.open(e.currentTarget.href, '_blank');
    } finally {
      setTracking(false);
    }
  };

  return (
    <div className={className}>
      {React.cloneElement(children, {
        onClick: handleWhatsAppClick,
        style: { ...children.props.style, cursor: tracking ? 'wait' : 'pointer' }
      })}
    </div>
  );
};

export default WhatsAppOrderTracker;
