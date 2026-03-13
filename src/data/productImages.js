// Static imports for browser compatibility
import tomato from "../assets/vegetables/tomato.webp";
import potato from "../assets/vegetables/potato.webp";
import onion from "../assets/vegetables/onion.webp";
import cabbage from "../assets/vegetables/cabbage.webp";
import brinjal from "../assets/vegetables/brinjle.webp";
import carrot from "../assets/vegetables/carrot .webp";
import cucumber from "../assets/vegetables/cucumber.webp";
import spinach from "../assets/vegetables/spianch.webp";
import cauliflower from "../assets/vegetables/cauliflower.webp";
import redChilli from "../assets/vegetables/red chilli.webp";
import greenPeas from "../assets/vegetables/green pea .webp";
import pumpkin from "../assets/vegetables/pumpkin.webp";

import apple from "../assets/fruits/apple.webp";
import banana from "../assets/fruits/banana.webp";
import orange from "../assets/fruits/orange.webp";
import papaya from "../assets/fruits/papaya.webp";
import mango from "../assets/fruits/mango.webp";
import grapes from "../assets/fruits/grapes.webp";
import pineapple from "../assets/fruits/pineapple.webp";
import pomegranate from "../assets/fruits/pomegranate.webp";
import guava from "../assets/fruits/guava.webp";
import jamun from "../assets/fruits/jamun.webp";
import sweetlime from "../assets/fruits/sweetlime.webp";
import watermelon from "../assets/fruits/watermelon.webp";

// Beverages
import campa from "../assets/beverages/campa.png";
import cherry from "../assets/beverages/cherry.png";
import choclate from "../assets/beverages/choclate.png";
import cocacola from "../assets/beverages/coca cola.png";
import fenta from "../assets/beverages/fenta.png";
import frooti from "../assets/beverages/frooti.png";
import limca from "../assets/beverages/limca.png";
import mangoDrink from "../assets/beverages/mango .png";
import mazza from "../assets/beverages/mazza.png";
import mountaindev from "../assets/beverages/mountain dev.png";
import pepsi from "../assets/beverages/pepsi.png";
import sprite from "../assets/beverages/sprite.png";
import vanila from "../assets/beverages/vanila.png";

export const productImages = {
  // Vegetables
  tomato,
  potato,
  onion,
  cabbage,
  brinjal,
  carrot,
  cucumber,
  spinach,
  cauliflower,
  "red chilli": redChilli,
  "green pea": greenPeas,
  pumpkin,
  
  // Fruits
  apple,
  banana,
  orange,
  papaya,
  mango,
  grapes,
  pineapple,
  pomegranate,
  guava,
  jamun,
  sweetlime,
  watermelon,
  
  // Beverages
  Campa: campa,
  Cherry: cherry,
  Chocolate: choclate,
  "Coca Cola": cocacola,
  Fenta: fenta,
  Frooti: frooti,
  Limca: limca,
  "Mango Drink": mangoDrink,
  Mazza: mazza,
  "Mountain Dew": mountaindev,
  Pepsi: pepsi,
  Sprite: sprite,
  Vanilla: vanila,
  
  // Fallback
  default: tomato
};

// Helper function to get product image
export const getProductImage = (productName) => {
  return productImages[productName] || productImages.default;
};
