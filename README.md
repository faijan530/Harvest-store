# 24*7 Fresh Store - React.js Application

A modern, responsive React.js web application for a vegetable and fruit shop located at NH-75 Highway, Kundi Shankha, Madhya Pradesh.

## 📋 Project Overview

**Project Name:** 24*7 Fresh Store  
**Type:** React.js Web Application  
**Purpose:** Promote vegetable & fruit shop and allow customers to order through WhatsApp  
**Location:** NH-75 Highway, Kundi Shankha, Madhya Pradesh  
**Technology Stack:** React.js, Tailwind CSS, React Router

## 🎯 Features

### Phase 1 - Basic Website (Landing + Products)
- ✅ **Home Page** with hero section, today's fresh picks, fruits section, special offers, location map, and contact info
- ✅ **Vegetables Page** with product cards and WhatsApp ordering
- ✅ **Fruits Page** with product cards and WhatsApp ordering  
- ✅ **Today's Prices Page** with table format and filtering options
- ✅ **Responsive Design** that works on all devices
- ✅ **WhatsApp Integration** for easy ordering
- ✅ **Modern UI** with smooth animations and interactions

## 📁 Project Structure

```
Harvest Store/
├── public/
│   └── index.html                 # Main HTML file
├── src/
│   ├── components/
│   │   ├── Header.js              # Navigation header component
│   │   └── Footer.js              # Footer component
│   ├── pages/
│   │   ├── Home.js               # Home page component
│   │   ├── Vegetables.js         # Vegetables catalog page
│   │   ├── Fruits.js             # Fruits catalog page
│   │   └── Prices.js             # Prices page with tabs
│   ├── hooks/
│   │   └── useWhatsApp.js         # Custom WhatsApp hook
│   ├── utils/
│   │   └── animations.js         # Animation utilities
│   ├── App.js                    # Main App component with routing
│   ├── index.css                 # Global styles
│   └── index.js                  # Entry point
├── package.json                  # Dependencies and scripts
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📱 Key Features

### React Components
- **Header Component** - Responsive navigation with mobile menu
- **Footer Component** - Consistent footer across all pages
- **Page Components** - Modular, reusable page components

### WhatsApp Integration
- Custom `useWhatsApp` hook for WhatsApp functionality
- Pre-filled messages with product details
- Direct communication with shop owner

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Tablet and desktop optimized
- Touch-friendly interface

### Modern UI/UX
- Clean, professional design with Tailwind CSS
- Smooth animations and transitions
- Component-based architecture

### Product Catalog
- Organized vegetables and fruits sections
- Clear pricing display
- High-quality placeholder images
- Easy ordering process

### Price Table
- Tabbed interface (Vegetables/Fruits/All)
- Sortable and filterable
- Mobile-responsive tables

## 🎨 Design System

### Color Scheme
- **Primary:** #2c7a2c (Fresh Green)
- **Secondary:** #4CAF50 (Light Green)  
- **Accent:** #25D366 (WhatsApp Green)
- **Background:** #f8f9fa (Light Gray)

### Typography
- **Font Family:** System fonts (Segoe UI, Roboto, etc.)
- **Headings:** Bold and prominent
- **Body Text:** Clean and readable

### Icons
- Font Awesome 6.0 for all icons
- Consistent icon usage throughout

## 📞 Contact Information

**Phone:** +91 98765 43210  
**WhatsApp:** +91 98765 43210  
**Location:** NH-75 Highway, Kundi Shankha, Madhya Pradesh  
**Hours:** Open 24/7

## 🔧 Customization

### Updating Products
Edit the data arrays in respective page components:
- `vegetables` array in `Vegetables.js`
- `fruits` array in `Fruits.js`
- Price data in `Prices.js`

### Changing Contact Info
Update the `phoneNumber` in `src/hooks/useWhatsApp.js`

### Branding
- Update logo and brand names in `Header.js`
- Modify business name in `Footer.js`
- Update colors in Tailwind config in `public/index.html`

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 Notes

- All images are currently using placeholder URLs
- Replace with actual product photos
- Update WhatsApp number with real business number
- Add Google Maps embed with actual location
- Consider adding testimonials and reviews in future phases

## 🔄 Future Enhancements (Phase 2+)

- Customer testimonials section
- Reviews and ratings
- FAQ page
- Admin login for price updates
- Online payment integration
- Delivery tracking
- Customer accounts
- Email newsletters

## 🛠️ Technologies Used

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome** - Icon library
- **Create React App** - Build tool

---

**Built with ❤️ for 24*7 Fresh Store**
