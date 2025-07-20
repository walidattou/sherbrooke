"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function DishCard({ dish, index, isPopular = false, isSpecial = false, variant = "default" }) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine if this is a high-value/premium dish
  const priceValue = parseFloat(dish.price.replace('$', ''));
  const isPremium = priceValue > 30;

  // Different styles based on variant
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  if (isFeatured) {
    // Featured Card - Large, prominent design
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.6,
          delay: Math.min(index * 0.1, 0.4),
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{ scale: 1.02, y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative"
      >
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 rounded-2xl p-8 hover:border-[#BF9040]/50 hover:shadow-2xl hover:shadow-[#BF9040]/20 transition-all duration-500">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-50 rounded-2xl" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23BF9040' fill-opacity='0.03'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          {/* Badge */}
          <div className="absolute top-4 right-4 z-10">
            {isSpecial && (
              <span className="px-3 py-2 bg-gradient-to-r from-[#BF9040] to-[#D4A853] text-black text-sm font-bold rounded-full uppercase tracking-wide">
                Chef's Special
              </span>
            )}
            {isPopular && !isSpecial && (
              <span className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full uppercase tracking-wide">
                Most Popular
              </span>
            )}
          </div>

          <div className="relative z-10">
            {/* Show image only for Lamb Chops (4 pcs) in featured variant, under title, full width */}
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-[#BF9040] transition-colors duration-300">
                {dish.name}
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-[#BF9040] to-transparent rounded-full mb-4" />
              {isFeatured && dish.name === "Lamb Chops (4 pcs)" && (
                <div className="w-full flex justify-center mb-4">
                  <img
                    src="/categories_im/Lamb chops.webp"
                    alt="Lamb Chops"
                    className="rounded-2xl shadow-2xl border-4 border-[#BF9040]/80 w-full max-w-xl h-72 object-cover object-center"
                    style={{ background: '#222' }}
                  />
                </div>
              )}
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {dish.description}
            </p>
            <div className="flex justify-start">
              <motion.span
                animate={{ scale: isHovered ? 1.1 : 1 }}
                className="text-4xl font-bold text-[#BF9040]"
              >
                {dish.price}
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (isCompact) {
    // Compact Card - Small, clean design for masonry layout
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.3,
          delay: Math.min(index * 0.01, 0.3),
        }}
        whileHover={{ y: -3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative"
      >
        <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/40 rounded-xl p-5 hover:border-[#BF9040]/40 transition-all duration-300">
          {/* Badges */}
          {(isSpecial || isPopular || isPremium) && (
            <div className="flex gap-1 mb-3">
              {isSpecial && <span className="px-2 py-1 bg-[#BF9040] text-black text-xs font-bold rounded">Special</span>}
              {isPopular && <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">Popular</span>}
              {isPremium && !isSpecial && <span className="px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded">Premium</span>}
            </div>
          )}

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-lg font-semibold text-white group-hover:text-[#BF9040] transition-colors duration-300 flex-1 pr-2">
                {dish.name}
              </h4>
              <span className="text-xl font-bold text-[#BF9040] flex-shrink-0">
                {dish.price}
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {dish.description}
            </p>

                         <div className="flex items-center">
               <span className="text-xs text-gray-500 flex items-center gap-1">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                 Available
               </span>
             </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default Card - Original design
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.4,
        delay: Math.min(index * 0.02, 0.5),
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ x: 8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative p-6 border-b border-gray-700/30 hover:border-[#BF9040]/40 transition-all duration-300">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-[#BF9040]/5 to-transparent rounded-lg"
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-white group-hover:text-[#BF9040] transition-colors duration-300">
                  {dish.name}
                </h3>
                
                <div className="flex gap-2">
                  {isSpecial && (
                    <span className="px-2 py-1 bg-[#BF9040] text-black text-xs font-bold rounded-md uppercase tracking-wide">
                      Special
                    </span>
                  )}
                  {isPopular && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-md uppercase tracking-wide">
                      Popular
                    </span>
                  )}
                  {isPremium && !isSpecial && (
                    <span className="px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-md uppercase tracking-wide">
                      Premium
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center mb-3">
                <div className="flex-1 border-b border-dotted border-gray-600 group-hover:border-[#BF9040]/50 transition-colors duration-300" />
              </div>
            </div>

            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <span className="text-2xl font-bold text-[#BF9040] relative">
                {dish.price}
                {isHovered && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -inset-2 bg-[#BF9040]/20 rounded-lg blur -z-10"
                  />
                )}
              </span>
            </motion.div>
          </div>

          <p className="text-gray-300 text-base leading-relaxed mb-4 pr-8">
            {dish.description}
          </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Available
              </span>
              
              <span className="text-gray-400">
              {dish.name.toLowerCase().includes('chicken') && 'Chicken'}
              {dish.name.toLowerCase().includes('lamb') && 'Lamb'}
              {dish.name.toLowerCase().includes('beef') && 'Beef'}
              {(dish.name.toLowerCase().includes('fish') || dish.name.toLowerCase().includes('salmon') || dish.name.toLowerCase().includes('shrimp')) && 'Seafood'}
              {dish.name.toLowerCase().includes('vegetable') && 'Vegetarian'}
              </span>
            </div>
        </div>

        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#BF9040] to-[#D4A853] origin-top"
        />
      </div>
    </motion.div>
  );
} 