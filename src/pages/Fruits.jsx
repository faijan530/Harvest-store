import React, { useState, useEffect } from "react";
import AdminFloatingButton from '../components/AdminFloatingButton';
import appleImage from '../assets/fruits/apple.webp';
import bananaImage from '../assets/fruits/banana.webp';
import orangeImage from '../assets/fruits/orange.webp';
import grapesImage from '../assets/fruits/grapes.webp';
import mangoImage from '../assets/fruits/mango.webp';
import pineappleImage from '../assets/fruits/pineapple.webp';
import pomegranateImage from '../assets/fruits/pomegranate.webp';
import guavaImage from '../assets/fruits/guava.webp';
import papayaImage from '../assets/fruits/papaya.webp';
import jamunImage from '../assets/fruits/jamun.webp';
import sweetlimeImage from '../assets/fruits/sweetlime.webp';
import watermelonImage from '../assets/fruits/watermelon.webp';

const Fruits = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const whatsappNumber = "919876543210";

  const fruits = [
    {
      id: 1,
      name: "Apple",
      price: "₹120/kg",
      image: appleImage
    },
    {
      id: 2,
      name: "Banana",
      price: "₹40/dozen",
      image: bananaImage
    },
    {
      id: 3,
      name: "Orange",
      price: "₹60/kg",
      image: orangeImage
    },
    {
      id: 4,
      name: "Grapes",
      price: "₹100/kg",
      image: grapesImage
    },
    {
      id: 5,
      name: "Mango",
      price: "₹80/kg",
      image: mangoImage
    },
    {
      id: 6,
      name: "Pineapple",
      price: "₹45/pc",
      image: pineappleImage
    },
    {
      id: 7,
      name: "Pomegranate",
      price: "₹150/kg",
      image: pomegranateImage
    },
    {
      id: 8,
      name: "Guava",
      price: "₹50/kg",
      image: guavaImage
    },
    {
      id: 9,
      name: "Papaya",
      price: "₹35/pc",
      image: papayaImage
    },
    {
      id: 10,
      name: "Jamun",
      price: "₹80/kg",
      image: jamunImage
    },
    {
      id: 11,
      name: "Sweet Lime",
      price: "₹40/kg",
      image: sweetlimeImage
    },
    {
      id: 12,
      name: "Watermelon",
      price: "₹25/pc",
      image: watermelonImage
    }
  ];

  return (
    <div className="fruits-page" style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <section style={{ 
        backgroundColor: '#10b981', 
        color: 'white', 
        padding: '96px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
            Fresh Fruits
          </h1>

          <p style={{ fontSize: '20px' }}>Seasonal and fresh fruits delivered daily</p>
        </div>
      </section>

      {/* Fruits Grid */}
      <section style={{ backgroundColor: 'white', padding: '64px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px', color: '#1f2937' }}>All Fruits</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>

            {fruits.map((fruit, index) => {
              const message = `I want to order ${fruit.name} - ${fruit.price}`;
              const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

              return (
                <div key={fruit.id} style={{
                  backgroundColor: '#f3f4f6', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ height: '200px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={fruit.image} 
                      alt={fruit.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '24px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                      {fruit.name}
                    </h3>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#059669', marginBottom: '16px' }}>
                      {fruit.price}
                    </p>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: '#10b981',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'inline-block',
                        transition: 'backgroundColor 0.3s ease'
                      }}
                    >
                      Order on WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Order */}
      <section className="bg-gray-50 py-16 text-center">
        <div className="max-w-7xl mx-auto px-5">

          <h2 className="text-3xl font-bold mb-4 text-green-600">
            Quick Order
          </h2>

          <p className="text-lg mb-8 text-gray-600">
            Can't find what you're looking for? Message us on WhatsApp!
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}?text=Hi I want to order fruits`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition"
          >
            Order Custom Fruits
          </a>

        </div>
      </section>
      
      {/* Floating Admin Button */}
      <AdminFloatingButton />
    </div>
  );
};

export default Fruits;