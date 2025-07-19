"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import DishCard from "./DishCard";
import FilterBar from "./FilterBar";
import LoadingSpinner from "./LoadingSpinner";

interface Dish {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface MenuContainerProps {
  dishes: Dish[];
  title: string;
  description?: string;
  specialDishes?: string[];
  popularDishes?: string[];
}

export default function MenuContainer({ 
  dishes, 
  title, 
  description,
  specialDishes = [], 
  popularDishes = [] 
}: MenuContainerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 70]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [displayCount, setDisplayCount] = useState(30); // Start with 30 items
  const [isLoading, setIsLoading] = useState(true);

  // Show loading for a brief moment to improve perceived performance
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Default special and popular dishes if not provided
  const defaultSpecialDishes = [
    "Sherbrooke Special",
    "Amira Special", 
    "Mixed Grill Deluxe",
    "Sherbrooke Seafood",
    "Sherbrooke Land & Sea",
    "Sherbrooke #2",
    "Sherbrooke #3", 
    "Sherbrooke #4"
  ];

  const defaultPopularDishes = [
    "Mixed Grill Platter",
    "Whole Chicken",
    "Lamb Chops (4 pcs)",
    "Chicken Wings (20 pcs)",
    "Grilled Salmon",
    "Tandoori Chicken",
    "Chicken Skewers (2 pcs)",
    "Beef Skewers",
    "Filet Mignon Skewer"
  ];

  // Use provided arrays or defaults
  const finalSpecialDishes = specialDishes.length > 0 ? specialDishes : defaultSpecialDishes;
  const finalPopularDishes = popularDishes.length > 0 ? popularDishes : defaultPopularDishes;

  // Filter dishes based on current filters
  const filteredDishes = useMemo(() => {
    return dishes.filter(dish => {
      // Price filter
      const price = parseFloat(dish.price.replace('$', ''));
      if (price < priceRange[0] || (priceRange[1] < 70 && price > priceRange[1])) return false;

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (!dish.name.toLowerCase().includes(searchLower) && 
            !dish.description.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Tag filters
      if (selectedTags.length > 0) {
        const dishName = dish.name.toLowerCase();
        const dishDesc = dish.description.toLowerCase();
        const price = parseFloat(dish.price.replace('$', ''));
        
        const matchesTags = selectedTags.some(tag => {
          switch (tag) {
            case 'popular':
              return finalPopularDishes.some(popular => dish.name.includes(popular));
            case 'special':
              return finalSpecialDishes.some(special => dish.name.includes(special));
            case 'premium':
              return price > 30;
            case 'chicken':
              return dishName.includes('chicken') || dishDesc.includes('chicken');
            case 'lamb':
              return dishName.includes('lamb') || dishDesc.includes('lamb');
            case 'seafood':
              return dishName.includes('fish') || dishName.includes('salmon') || 
                     dishName.includes('shrimp') || dishName.includes('seafood') ||
                     dishDesc.includes('fish') || dishDesc.includes('salmon') || 
                     dishDesc.includes('shrimp') || dishDesc.includes('seafood');
            case 'vegetarian':
              return (dishName.includes('vegetable') || dishName.includes('veggie') ||
                     dishDesc.includes('vegetable') || dishDesc.includes('veggie')) &&
                     !dishName.includes('chicken') && !dishName.includes('beef') &&
                     !dishName.includes('lamb') && !dishName.includes('fish');
            default:
              return false;
          }
        });
        
        if (!matchesTags) return false;
      }

      return true;
    });
  }, [dishes, searchTerm, priceRange, selectedTags, finalSpecialDishes, finalPopularDishes]);

  // Callbacks for filter updates
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setDisplayCount(30); // Reset to show first batch when filtering
  }, []);
  const handlePriceFilter = useCallback((range: number[]) => {
    setPriceRange(range);
    setDisplayCount(30);
  }, []);
  const handleTagFilter = useCallback((tags: string[]) => {
    setSelectedTags(tags);
    setDisplayCount(30);
  }, []);

  // Check if dish is special or popular
  const isDishSpecial = useCallback((dish: Dish) => finalSpecialDishes.some(special => dish.name.includes(special)), [finalSpecialDishes]);
  const isDishPopular = useCallback((dish: Dish) => finalPopularDishes.some(popular => dish.name.includes(popular)), [finalPopularDishes]);

  // Show loading spinner initially
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title} <span className="text-[#BF9040]">Menu</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {description || "Discover our premium selection of expertly crafted dishes, crafted with the finest ingredients and traditional techniques."}
          </p>
        </motion.div>

        {/* Filter Bar */}
        <FilterBar
          onSearch={handleSearch}
          onPriceFilter={handlePriceFilter}
          onTagFilter={handleTagFilter}
          totalItems={dishes.length}
          filteredItems={filteredDishes.length}
        />

        {/* Featured Dishes Hero Section */}
        {filteredDishes.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            {/* Featured Premium Dishes */}
            {filteredDishes.filter(dish => isDishSpecial(dish) || isDishPopular(dish)).length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  <span className="text-[#BF9040]">Chef&apos;s Highlights</span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filteredDishes
                    .filter(dish => isDishSpecial(dish) || isDishPopular(dish))
                    .slice(0, 4)
                    .map((dish, index) => (
                      <DishCard
                        key={`featured-${dish.id}`}
                        dish={dish}
                        index={index}
                        isSpecial={isDishSpecial(dish)}
                        isPopular={isDishPopular(dish)}
                        variant="featured"
                      />
                    ))}
                </div>
              </div>
            )}

            {/* All Dishes in Magazine Layout */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white text-center mb-6">
                Complete <span className="text-[#BF9040]">Menu Selection</span>
              </h2>
              
              {/* Group dishes by sections for better visual flow */}
              <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
                {filteredDishes.slice(0, displayCount).map((dish, index) => (
                  <div key={dish.id} className="break-inside-avoid mb-6">
                    <DishCard
                      dish={dish}
                      index={index}
                      isSpecial={isDishSpecial(dish)}
                      isPopular={isDishPopular(dish)}
                      variant="compact"
                    />
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {filteredDishes.length > displayCount && (
                <div className="text-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDisplayCount(prev => prev + 30)}
                    className="px-8 py-4 bg-[#BF9040] hover:bg-[#D4A853] text-black font-bold rounded-xl transition-all duration-200 shadow-lg"
                  >
                    Load More Dishes ({filteredDishes.length - displayCount} remaining)
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No dishes found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search criteria or filters to find more dishes.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm("");
                setPriceRange([0, 70]);
                setSelectedTags([]);
              }}
              className="px-6 py-3 bg-[#BF9040] hover:bg-[#D4A853] text-black font-semibold rounded-lg transition-colors"
            >
              Clear All Filters
            </motion.button>
          </motion.div>
        )}

        {/* Featured Section for Special Dishes */}
        {searchTerm === "" && selectedTags.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 p-8 bg-gradient-to-r from-[#BF9040]/10 to-transparent rounded-xl border border-[#BF9040]/20"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              <span className="text-[#BF9040]">Sherbrooke</span> Signature Specialties
            </h2>
            <p className="text-gray-300 mb-6">
              Experience our chef&apos;s most celebrated creations, featuring premium ingredients 
              and time-honored cooking techniques.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dishes
                .filter(dish => isDishSpecial(dish))
                .slice(0, 3)
                .map((dish) => (
                  <div key={dish.id} className="p-4 bg-gray-800/50 rounded-lg border border-[#BF9040]/30">
                    <h4 className="font-semibold text-[#BF9040] mb-2">{dish.name}</h4>
                    <p className="text-sm text-gray-300 mb-2">{dish.description}</p>
                    <span className="text-lg font-bold text-white">{dish.price}</span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 