"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("indian"), href: "/indian" },
    { name: t("grills"), href: "/grills" },
    { name: t("seafood"), href: "/seafood" },
    { name: t("pasta"), href: "/pastapizza" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-gray-900/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className={`p-2 rounded-lg flex items-center justify-center ${isScrolled
              ? 'bg-white/95'
              : 'bg-white/90'
              } transition-all duration-300 shadow-lg`}>
              <img
                src="/logo.jpg"
                alt="Sherbrooke Grill & Pizza /Resto Cabasyl Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors duration-200 font-medium ${isScrolled
                  ? 'text-white hover:text-[#BF9040]'
                  : 'text-white hover:text-[#BF9040]'
                  }`}>
                {item.name}
              </Link>
            ))}
            
            {/* Language Toggle & Delivery Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              {/* Language Toggle Button */}
              {/* <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-200 flex items-center space-x-2">
                <Globe size={16} />
                <span className="text-sm">{language === "en" ? "FR" : "EN"}</span>
              </motion.button> */}

              {/* Uber Eats Button */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-800 flex items-center justify-center space-x-2 w-32 cursor-pointer">
                <Image
                  src="/uber-eats.png"
                  alt="Uber Eats"
                  width={20}
                  height={20}
                  className="w-6 h-6 object-contain"
                />
                <span className="text-sm">{t("orderUberEats")}</span>
              </motion.a>

              {/* DoorDash Button */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-red-700 flex items-center justify-center space-x-2 w-32 cursor-pointer">
                <div className="bg-white p-0.5 rounded flex items-center justify-center w-5 h-5">
                  <Image
                    src="/doorDash.png"
                    alt="DoorDash"
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                  />
                </div>
                <span className="text-sm">{t("orderDoorDash")}</span>
              </motion.a>

              {/* Call Button */}
              <motion.a
                href="tel:14383734444"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-green-700 flex items-center justify-center space-x-2 w-32 cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm">Call Now</span>
              </motion.a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-lg shadow-lg transition-all duration-200 cursor-pointer">
            {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-6 mx-4 mt-4 bg-gray-900/95 backdrop-blur-md shadow-lg rounded-2xl">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 px-6 text-gray-100 hover:text-[#BF9040] hover:bg-gray-800/50 transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Language Toggle & Delivery Buttons */}
            <div className="flex flex-col items-center space-y-3 mt-6 pt-6 border-t border-gray-700">
              {/* Language Toggle Button Mobile */}
              {/* <motion.button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 hover:bg-gray-200">
                <Globe size={18} />
                <span>{language === "en" ? "Français" : "English"}</span>
              </motion.button> */}

              {/* Uber Eats Button Mobile */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center hover:bg-gray-800 w-48 space-x-2 cursor-pointer"
                onClick={() => setIsOpen(false)}>
                <Image
                  src="/uber-eats.png"
                  alt="Uber Eats"
                  width={24}
                  height={24}
                  className="w-7 h-7 object-contain"
                />
                <span>{t("orderUberEats")}</span>
              </motion.a>

              {/* DoorDash Button Mobile */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center hover:bg-red-700 w-48 space-x-2 cursor-pointer"
                onClick={() => setIsOpen(false)}>
                <div className="bg-white p-0.5 rounded flex items-center justify-center w-6 h-6">
                  <Image
                    src="/doorDash.png"
                    alt="DoorDash"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <span>{t("orderDoorDash")}</span>
              </motion.a>

              {/* Call Button Mobile */}
              <motion.a
                href="tel:14383734444"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center hover:bg-green-700 w-48 space-x-2 cursor-pointer"
                onClick={() => setIsOpen(false)}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Call Now</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
