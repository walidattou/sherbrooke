"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    grills: "Grills",
    seafood: "Seafood",
    indian: "Indian",
    
    // Hero
    welcome: "Welcome to",
    heroSubtitle: "Experience the perfect fusion of Indian cuisine, grilled specialties, fresh seafood, and authentic pasta dishes in the heart of Montreal.",
    
    // Buttons
    orderUberEats: "Uber Eats",
    orderDoorDash: "DoorDash",
    exploreMenu: "Explore Our Menu",
    meetChef: "Meet Our Chef",
    exploreVision: "Explore Our Vision",
    
    // Sections
    flavorsTitle: "Flavors That Tell a Story",
    ourPhilosophy: "Our Philosophy",
    ourStory: "Our Story",
    whatIs: "What is Sherbrooke Grill & Pizza?",
    hungryNow: "Hungry Now?",
    
    // Descriptions
    flavorsDescription: "From the heart of India to the soul of Montreal – we serve history on a plate.",
    storyDescription: "Every dish at Sherbrooke Grill & Pizza carries the whispers of ancient spice routes, the warmth of family recipes passed down through generations, and the innovative spirit of contemporary culinary artistry.",
    restaurantDescription: "Born from a passion for culinary fusion, Sherbrooke Grill & Pizza represents the bridge between traditional Indian flavors and modern gastronomy. Our name reflects our commitment to creating extraordinary dining experiences that honor heritage while embracing innovation.",
    
    // About page
    aboutTitle: "About Sherbrooke Grill & Pizza",
    aboutSubtitle: "A culinary journey that bridges cultures and flavors",
    aboutDescription1: "At Sherbrooke Grill & Pizza, we believe that food is a universal language that brings people together. Our restaurant was born from a passion for creating unique culinary experiences that celebrate the rich traditions of Indian cuisine while embracing modern culinary techniques.",
    aboutDescription2: "Located in the heart of Montreal, we specialize in Indian fusion cuisine that combines traditional spices and cooking methods with contemporary presentations. Our menu features expertly grilled meats, fresh seafood preparations, innovative pasta dishes, and authentic Indian specialties.",
    aboutDescription3: "Every dish at Sherbrooke Grill & Pizza is prepared with fresh, high-quality ingredients and a dedication to authenticity that honors both traditional Indian flavors and the diverse culinary landscape of Montreal. We invite you to join us for an unforgettable dining experience.",
    
    // Footer
    contactInfo: "Contact Information",
    orderOnline: "Order Online",
    copyright: "© 2025 Sherbrooke Grill & Pizza. All rights reserved.",
    
    // Menu categories
    grillsTitle: "Grills",
    grillsDescription: "Tender grilled meats and vegetables marinated in aromatic spices and cooked to perfection",
    seafoodTitle: "Seafood",
    seafoodDescription: "Fresh seafood prepared with traditional Indian spices and contemporary cooking techniques",
    indianTitle: "Indian Specials",
    indianDescription: "Authentic Indian dishes with rich curries, aromatic rice, and traditional spices",
  },
  fr: {
    // Navigation
    home: "Accueil",
    about: "À propos",
    grills: "Grillades",
    seafood: "Fruits de mer",
    indian: "Spécialités indiennes",
    
    // Hero
    welcome: "Bienvenue chez",
    heroSubtitle: "Découvrez la fusion parfaite de la cuisine indienne, des spécialités grillées, des fruits de mer frais et des plats de pâtes authentiques au cœur de Montréal.",
    
    // Buttons
    orderUberEats: "Uber Eats",
    orderDoorDash: "DoorDash",
    exploreMenu: "Explorez notre menu",
    meetChef: "Rencontrez notre chef",
    exploreVision: "Explorez notre vision",
    
    // Sections
    flavorsTitle: "Des saveurs qui racontent une histoire",
    ourPhilosophy: "Notre philosophie",
    ourStory: "Notre histoire",
    whatIs: "Qu'est-ce que Sherbrooke Grill & Pizza ?",
    hungryNow: "Faim maintenant ?",
    
    // Descriptions
    flavorsDescription: "Du cœur de l'Inde à l'âme de Montréal – nous servons l'histoire dans une assiette.",
    storyDescription: "Chaque plat chez Sherbrooke Grill & Pizza porte les murmures des anciennes routes des épices, la chaleur des recettes familiales transmises de génération en génération, et l'esprit innovant de l'art culinaire contemporain.",
    restaurantDescription: "Né d'une passion pour la fusion culinaire, Sherbrooke Grill & Pizza représente le pont entre les saveurs indiennes traditionnelles et la gastronomie moderne. Notre nom reflète notre engagement à créer des expériences culinaires extraordinaires qui honorent l'héritage tout en embrassant l'innovation.",
    
    // About page
    aboutTitle: "À propos de Sherbrooke Grill & Pizza",
    aboutSubtitle: "Un voyage culinaire qui relie les cultures et les saveurs",
    aboutDescription1: "Chez Sherbrooke Grill & Pizza, nous croyons que la nourriture est un langage universel qui rassemble les gens. Notre restaurant est né d'une passion pour créer des expériences culinaires uniques qui célèbrent les riches traditions de la cuisine indienne tout en embrassant les techniques culinaires modernes.",
    aboutDescription2: "Situé au cœur de Montréal, nous nous spécialisons dans la cuisine fusion indienne qui combine les épices traditionnelles et les méthodes de cuisson avec des présentations contemporaines. Notre menu comprend des viandes grillées expertement, des préparations de fruits de mer frais, des plats de pâtes innovants et des spécialités indiennes authentiques.",
    aboutDescription3: "Chaque plat chez Sherbrooke Grill & Pizza est préparé avec des ingrédients frais de haute qualité et un dévouement à l'authenticité qui honore à la fois les saveurs indiennes traditionnelles et le paysage culinaire diversifié de Montréal. Nous vous invitons à nous rejoindre pour une expérience culinaire inoubliable.",
    
    // Footer
    contactInfo: "Informations de contact",
    orderOnline: "Commander en ligne",
    copyright: "© 2025 Sherbrooke Grill & Pizza. Tous droits réservés.",
    
    // Menu categories
    grillsTitle: "Grillades",
    grillsDescription: "Viandes et légumes grillés tendres marinés dans des épices aromatiques et cuits à la perfection",
    seafoodTitle: "Fruits de mer",
    seafoodDescription: "Fruits de mer frais préparés avec des épices indiennes traditionnelles et des techniques de cuisson contemporaines",
    indianTitle: "Spécialités indiennes",
    indianDescription: "Plats indiens authentiques avec des currys riches, du riz aromatique et des épices traditionnelles",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get initial language from localStorage or default to "en"
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "fr" : "en";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 