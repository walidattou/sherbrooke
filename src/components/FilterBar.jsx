"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export default function FilterBar({ 
  onSearch, 
  onPriceFilter, 
  onTagFilter, 
  totalItems = 0,
  filteredItems = 0 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 70]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const tags = [
    { id: "popular", label: "Popular", color: "bg-red-500" },
    { id: "special", label: "Special", color: "bg-[#BF9040]" },
    { id: "premium", label: "Premium", color: "bg-purple-600" },
    { id: "chicken", label: "Chicken", color: "bg-orange-500" },
    { id: "lamb", label: "Lamb", color: "bg-amber-600" },
    { id: "seafood", label: "Seafood", color: "bg-blue-500" },
    { id: "vegetarian", label: "Vegetarian", color: "bg-green-500" }
  ];

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  // Price filter effect
  useEffect(() => {
    onPriceFilter(priceRange);
  }, [priceRange, onPriceFilter]);

  // Tag filter effect
  useEffect(() => {
    onTagFilter(selectedTags);
  }, [selectedTags, onTagFilter]);

  const handleTagToggle = (tagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 70]);
    setSelectedTags([]);
  };

  const hasActiveFilters = searchTerm || priceRange[0] > 0 || priceRange[1] < 70 || selectedTags.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-8"
    >
      {/* Top Row - Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#BF9040] focus:ring-1 focus:ring-[#BF9040] transition-colors"
          />
        </div>

        {/* Filter Toggle & Results */}
        <div className="flex items-center gap-4">
                      <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={hasActiveFilters && !isFilterOpen ? {
                boxShadow: [
                  "0 0 2px 0 rgba(191, 144, 64, 0.1), inset 0 0 2px 0 rgba(191, 144, 64, 0.1)",
                  "0 0 20px 4px rgba(191, 144, 64, 0.7), inset 0 0 7px 1px rgba(191, 144, 64, 0.5)",
                  "0 0 2px 0 rgba(191, 144, 64, 0.1), inset 0 0 2px 0 rgba(191, 144, 64, 0.1)"
                ],
                scale: [1, 1.02, 1]
              } : {}}
              transition={{
                boxShadow: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 ${
                isFilterOpen 
                  ? 'bg-[#BF9040] border-[#BF9040] text-black shadow-[0_0_20px_4px_rgba(191,144,64,0.6)] ring-2 ring-[#BF9040]' 
                  : hasActiveFilters
                    ? 'bg-gray-800 border-[#BF9040] text-white ring-2 ring-[#BF9040]/50'
                    : 'bg-gray-800 border-gray-600 text-white hover:border-[#BF9040] hover:ring-1 hover:ring-[#BF9040]/20'
              }`}
            >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
            Filters
          </motion.button>

          <div className="text-sm text-gray-400">
            Showing <span className="text-[#BF9040] font-semibold">{filteredItems}</span> of {totalItems} dishes
          </div>
        </div>
      </div>

      {/* Expandable Filters */}
      <motion.div
        initial={false}
        animate={{ height: isFilterOpen ? "auto" : 0, opacity: isFilterOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-4 border-t border-gray-700/50 space-y-6">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Price Range: ${priceRange[0]} - ${priceRange[1]}+
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="70"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm text-gray-400 w-12">to</span>
              <input
                type="range"
                min="0"
                max="70"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Categories</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <motion.button
                  key={tag.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTagToggle(tag.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag.id)
                      ? `${tag.color} text-white shadow-lg`
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {tag.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAllFilters}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Clear All Filters
            </motion.button>
          )}
        </div>
      </motion.div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #BF9040;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(191, 144, 64, 0.5);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #BF9040;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(191, 144, 64, 0.5);
        }
      `}</style>
    </motion.div>
  );
} 