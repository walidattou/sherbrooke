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
    { name: t("grills"), href: "/grills" },
    { name: t("seafood"), href: "/seafood" },
    { name: t("indian"), href: "/indian" },
    { name: t("pasta"), href: "/pasta" },
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
            <div className={`p-1 rounded-md ${isScrolled
              ? 'bg-white/90'
              : 'bg-white/80'
              } transition-all duration-300`}>
              <Image
                src="/Logo.svg"
                alt="Sherbrooke Grill & Pizza Logo"
                width={120}
                height={60}
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
                className="bg-black text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-800">
                <span className="text-sm">{t("orderUberEats")}</span>
              </motion.a>

              {/* DoorDash Button */}
              <motion.a
                href="https://wa.me/15144344466"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-red-700">
                <span className="text-sm">{t("orderDoorDash")}</span>
              </motion.a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden py-4 border-t ${isScrolled ? 'border-gray-700' : 'border-white/20'
              }`}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-white hover:text-[#BF9040] transition-colors duration-200"
                onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Language Toggle & Delivery Buttons */}
            <div className={`flex flex-col space-y-3 mt-4 pt-4 border-t ${isScrolled ? 'border-gray-700' : 'border-white/20'
              }`}>
              {/* Language Toggle Button Mobile */}
              <motion.button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 hover:bg-gray-200">
                <Globe size={18} />
                <span>{language === "en" ? "Français" : "English"}</span>
              </motion.button>

              {/* Uber Eats Button Mobile */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-black text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center hover:bg-gray-800"
                onClick={() => setIsOpen(false)}>
                <span>{t("orderUberEats")}</span>
              </motion.a>

              {/* DoorDash Button Mobile */}
              <motion.a
                href="https://wa.me/15144344466"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-red-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center hover:bg-red-700"
                onClick={() => setIsOpen(false)}>
                <span>{t("orderDoorDash")}</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
