import React, { useState, useEffect } from "react";
import AdminFloatingButton from '../components/AdminFloatingButton';
import tomatoImage from '../assets/vegetables/tomato.webp';
import potatoImage from '../assets/vegetables/potato.webp';
import carrotImage from '../assets/vegetables/carrot .webp';
import cucumberImage from '../assets/vegetables/cucumber.webp';
import spinachImage from '../assets/vegetables/spianch.webp';
import onionImage from '../assets/vegetables/onion.webp';
import cauliflowerImage from '../assets/vegetables/cauliflower.webp';
import brinjalImage from '../assets/vegetables/brinjle.webp';
import redChilliImage from '../assets/vegetables/red chilli.webp';
import cabbageImage from '../assets/vegetables/cabbage.webp';
import greenPeasImage from '../assets/vegetables/green pea .webp';
import pumpkinImage from '../assets/vegetables/pumpkin.webp';

const Vegetables = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const whatsappNumber = "919876543210";

  const vegetables = [
    {
      id: 1,
      name: "Tomato",
      price: "₹20/kg",
      image: tomatoImage
    },
    {
      id: 2,
      name: "Potato",
      price: "₹18/kg",
      image: potatoImage
    },
    {
      id: 3,
      name: "Carrot",
      price: "₹25/kg",
      image: carrotImage
    },
    {
      id: 4,
      name: "Cucumber",
      price: "₹15/kg",
      image: cucumberImage
    },
    {
      id: 5,
      name: "Spinach",
      price: "₹12/bunch",
      image: spinachImage
    },
    {
      id: 6,
      name: "Onion",
      price: "₹22/kg",
      image: onionImage
    },
    {
      id: 7,
      name: "Cauliflower",
      price: "₹30/pc",
      image: cauliflowerImage
    },
    {
      id: 8,
      name: "Brinjal",
      price: "₹28/kg",
      image: brinjalImage
    },
    {
      id: 9,
      name: "Red Chilli",
      price: "₹35/kg",
      image: redChilliImage
    },
    {
      id: 10,
      name: "Cabbage",
      price: "₹20/pc",
      image: cabbageImage
    },
    {
      id: 11,
      name: "Green Peas",
      price: "₹45/kg",
      image: greenPeasImage
    },
    {
      id: 12,
      name: "Pumpkin",
      price: "₹15/kg",
      image: pumpkinImage
    }
  ];

  return (
    <div className="vegetables-page" style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <section style={{ 
        backgroundColor: '#10b981', 
        color: 'white', 
        padding: '96px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
            Fresh Vegetables
          </h1>

          <p style={{ fontSize: '20px' }}>Farm-fresh vegetables delivered to your doorstep</p>
        </div>
      </section>

      {/* Vegetables Grid */}
      <section style={{ backgroundColor: 'white', padding: '64px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px', color: '#1f2937' }}>All Vegetables</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>

            {vegetables.map((vegetable, index) => {
              const message = `I want to order ${vegetable.name} - ${vegetable.price}`;
              const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

              return (
                <div key={vegetable.id} style={{
                  backgroundColor: '#f3f4f6', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ height: '200px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={vegetable.image} 
                      alt={vegetable.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '24px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                      {vegetable.name}
                    </h3>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#059669', marginBottom: '16px' }}>
                      {vegetable.price}
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
            href={`https://wa.me/${whatsappNumber}?text=Hi I want to order vegetables`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition"
          >
            Order Custom Vegetables
          </a>

        </div>
      </section>
      
      {/* Floating Admin Button */}
      <AdminFloatingButton />
    </div>
  );
};

export default Vegetables;