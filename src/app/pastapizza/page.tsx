"use client";

import { useState, useMemo } from "react";
import PageWrapper from "@/components/PageWrapper";
import { pastaData, pizzaData } from "@/data/pastaPizza";
import { motion } from "framer-motion";
import Image from "next/image";
import DishCard from "@/components/DishCard";
import FilterBar from "@/components/FilterBar";
import CarouselHighlights from "@/components/CarouselHighlights";

interface PastaDish {
  id: number;
  name: string;
  description: string;
  price: string;
  category: 'pasta';
}

interface PizzaDish {
  id: number;
  name: string;
  description: string;
  price?: string;
  sizes?: { size: string; price: string }[];
  options?: { pizzas: string; price: string }[];
  isCombo?: boolean;
  category: 'pizza';
}

type CombinedDish = PastaDish | PizzaDish;

export default function PastaPizza() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 70]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'pasta' | 'pizza'>('all');

  // Combine pasta and pizza data with category labels
  const allDishes = useMemo((): CombinedDish[] => {
    const pastaWithCategory: PastaDish[] = pastaData.map(dish => ({ ...dish, category: 'pasta' as const }));
    const pizzaWithCategory: PizzaDish[] = pizzaData.map(dish => ({ ...dish, category: 'pizza' as const }));
    return [...pastaWithCategory, ...pizzaWithCategory];
  }, []);

  // Type guard functions
  const isPastaDish = (dish: CombinedDish): dish is PastaDish => dish.category === 'pasta';
  const isPizzaDish = (dish: CombinedDish): dish is PizzaDish => dish.category === 'pizza';

  // Filter dishes based on current filters
  const filteredDishes = useMemo(() => {
    return allDishes.filter(dish => {
      // Category filter
      if (categoryFilter !== 'all' && dish.category !== categoryFilter) return false;

      // Price filter - handle both single price and sizes array
      if (isPastaDish(dish)) {
        const price = parseFloat(dish.price.replace('$', ''));
        if (price < priceRange[0] || (priceRange[1] < 70 && price > priceRange[1])) return false;
      } else if (isPizzaDish(dish)) {
        if (dish.price) {
          const price = parseFloat(dish.price.replace('$', ''));
          if (price < priceRange[0] || (priceRange[1] < 70 && price > priceRange[1])) return false;
        } else if (dish.sizes) {
          const prices = dish.sizes.map((size: { size: string; price: string }) => parseFloat(size.price.replace('$', '')));
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          if (maxPrice < priceRange[0] || (priceRange[1] < 70 && minPrice > priceRange[1])) return false;
        }
      }

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
        
        const matchesTags = selectedTags.some(tag => {
          switch (tag) {
            case 'combo':
              return isPizzaDish(dish) && dish.isCombo;
            case 'vegetarian':
              return dishName.includes('vegetarian') || dishName.includes('veggie') || 
                     dishName.includes('paneer') || dishName.includes('vegetable') ||
                     dishDesc.includes('vegetarian') || dishDesc.includes('veggie') ||
                     dishDesc.includes('paneer') || dishDesc.includes('vegetable');
            case 'chicken':
              return dishName.includes('chicken') || dishDesc.includes('chicken');
            case 'special':
              return dishName.includes('special') || dishName.includes('sherbrooke') ||
                     dishName.includes('deluxe') || dishName.includes('premium');
            case 'spicy':
              return dishName.includes('tikka') || dishName.includes('masala') ||
                     dishDesc.includes('spicy') || dishDesc.includes('hot');
            default:
              return false;
          }
        });
        
        if (!matchesTags) return false;
      }

      return true;
    });
  }, [allDishes, searchTerm, priceRange, selectedTags, categoryFilter]);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative overflow-hidden h-[500px] flex items-center justify-center">
          <Image
            src="/PizzaPage.png"
            alt="Pasta and Pizza"
            fill
            className="object-cover"
            priority
          />
          {/* Enhanced gradient overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-6"
          >
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-white tracking-wide">
              Pasta & Pizza
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
              Fusion pasta and pizza dishes with Indian flavors and fresh ingredients for a unique culinary experience
            </p>
            
            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-12"
            >
              <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-3 bg-white/70 rounded-full mt-2"
                />
              </div>
              <p className="text-white/70 text-sm mt-2">Scroll to explore menu</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Complete <span className="text-[#BF9040]">Menu</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover our authentic Italian pasta and Indian fusion pizza selections, crafted with traditional recipes and fresh ingredients.
            </p>
          </motion.div>

          {/* Category Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  categoryFilter === 'all'
                    ? 'bg-[#BF9040] text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                All Items ({allDishes.length})
              </button>
              <button
                onClick={() => setCategoryFilter('pasta')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  categoryFilter === 'pasta'
                    ? 'bg-[#BF9040] text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                Pasta Only ({pastaData.length})
              </button>
              <button
                onClick={() => setCategoryFilter('pizza')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  categoryFilter === 'pizza'
                    ? 'bg-[#BF9040] text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                Pizza Only ({pizzaData.length})
              </button>
            </div>
          </motion.div>

          {/* Filter Bar */}
          <FilterBar
            onSearch={setSearchTerm}
            onPriceFilter={setPriceRange}
            onTagFilter={setSelectedTags}
            totalItems={allDishes.length}
            filteredItems={filteredDishes.length}
          />

          {/* Chef's Highlights Carousel */}
          {(() => {
            const highlights = [
              {
                title: "Chicken Greek Pasta",
                desc: "Greek-style pasta with chicken, mushrooms, sun-dried tomatoes, Kalamata olives, feta and arugula",
                price: "$15.99",
                image: "/categories_im/pasta.png"
              },
              {
                title: "Special Sherbrooke Pizza",
                desc: "Pepperoni, bacon, kofta, mushrooms, green peppers, tomato, onions, black olive",
                price: "$19.99",
                image: "/categories_im/pizza.png"
              },
              {
                title: "Mushroom Pizza",
                desc: "Mushroom pizza",
                price: "$14.99",
                image: "/categories_im/mushroom pizza.png"
              },
              {
                title: "Chicken Greek Pasta",
                desc: "Greek-style pasta with chicken, mushrooms, sun-dried tomatoes, Kalamata olives, feta and arugula",
                price: "$15.99",
                image: "/categories_im/Chicken Greek Pasta.png"
              }
            ];
            
            // Carousel for first 4
            const carouselItems = highlights.slice(0, 4);
            // Static cards for additional highlights
            const staticItems = highlights.slice(4);
            
            return (
              <>
                {carouselItems.length > 0 && (
                  <CarouselHighlights 
                    sectionTitle="Pasta & Pizza Chef's Highlights" 
                    highlights={carouselItems} 
                  />
                )}
                {staticItems.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                      <span className="text-[#BF9040]">Additional</span> Highlights
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {staticItems.map((item, idx) => (
                        <DishCard
                          key={`static-highlight-${item.title}`}
                          dish={{ id: idx, name: item.title, description: item.desc, price: item.price }}
                          index={idx}
                          isSpecial={true}
                          isPopular={true}
                          variant="featured"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Chef's Special Section */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    <span className="text-[#BF9040]">Chef's</span> Special
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <DishCard
                      key="butter-chicken-pizza-special"
                      dish={{
                        id: 9998,
                        name: "Butter Chicken 'INDIAN' Pizza",
                        description: "Butter chicken sauce, chicken, cheese",
                        price: "$19.99"
                      }}
                      index={0}
                      isSpecial={true}
                      isPopular={false}
                      variant="featured"
                    />
                    <DishCard
                      key="beef-greek-pasta-special"
                      dish={{
                        id: 9999,
                        name: "Beef Greek Pasta",
                        description: "Greek-style pasta with beef, mushrooms, sun-dried tomatoes, Kalamata olives, feta and arugula",
                        price: "$15.99"
                      }}
                      index={1}
                      isSpecial={true}
                      isPopular={false}
                      variant="featured"
                    />
                  </div>
                </div>
              </>
            );
          })()}

          {/* Menu Items */}
          {filteredDishes.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Pasta Section */}
              {filteredDishes.filter(dish => dish.category === 'pasta').length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    <span className="text-[#BF9040]">Fusion</span> Pasta
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDishes
                      .filter(dish => dish.category === 'pasta')
                      .map((dish, index) => (
                        <DishCard
                          key={`pasta-${dish.id}`}
                          dish={dish}
                          index={index}
                          variant="compact"
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Regular Pizza Section */}
              {filteredDishes.filter(dish => dish.category === 'pizza' && !isPizzaDish(dish) || (isPizzaDish(dish) && !dish.isCombo)).length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    <span className="text-[#BF9040]">Artisan</span> Pizza
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDishes
                      .filter(dish => dish.category === 'pizza' && (!isPizzaDish(dish) || !dish.isCombo))
                      .map((dish, index) => (
                        <motion.div
                          key={`pizza-${dish.id}`}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-[#BF9040]/50 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-lg font-bold text-white leading-tight">{dish.name}</h4>
                          </div>
                          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                            {dish.description}
                          </p>
                          
                          {/* Single Price */}
                          {dish.price && (
                            <div className="text-2xl font-bold text-[#BF9040]">
                              {dish.price}
                            </div>
                          )}
                          
                          {/* Size Options */}
                          {isPizzaDish(dish) && dish.sizes && (
                            <div className="space-y-2">
                              {dish.sizes.map((size, idx) => (
                                <div key={idx} className="flex justify-between items-center">
                                  <span className="text-gray-300 text-sm">{size.size}</span>
                                  <span className="text-[#BF9040] font-bold">{size.price}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Combo Options */}
                          {isPizzaDish(dish) && dish.options && (
                            <div className="space-y-2">
                              {dish.options.map((option, idx) => (
                                <div key={idx} className="flex justify-between items-center">
                                  <span className="text-gray-300 text-sm">{option.pizzas}</span>
                                  <span className="text-[#BF9040] font-bold">{option.price}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}

              {/* Pizza Combo Deals Section */}
              {filteredDishes.filter(dish => dish.category === 'pizza' && isPizzaDish(dish) && dish.isCombo).length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    <span className="text-[#BF9040]">Combo</span> Deals & Specials
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDishes
                      .filter(dish => dish.category === 'pizza' && isPizzaDish(dish) && dish.isCombo)
                      .map((dish, index) => (
                        <motion.div
                          key={`combo-${dish.id}`}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="bg-gradient-to-br from-orange-900/20 to-gray-900 rounded-xl p-6 border border-[#BF9040]/30 hover:border-[#BF9040]/60 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-lg font-bold text-white leading-tight">{dish.name}</h4>
                            <span className="bg-[#BF9040] text-black text-xs font-bold px-2 py-1 rounded-full">
                              COMBO
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                            {dish.description}
                          </p>
                          
                          {/* Single Price */}
                          {dish.price && (
                            <div className="text-2xl font-bold text-[#BF9040]">
                              {dish.price}
                            </div>
                          )}
                          
                          {/* Combo Options */}
                          {isPizzaDish(dish) && dish.options && (
                            <div className="space-y-2">
                              {dish.options.map((option: { pizzas: string; price: string }, idx: number) => (
                                <div key={idx} className="flex justify-between items-center">
                                  <span className="text-gray-300 text-sm">{option.pizzas}</span>
                                  <span className="text-[#BF9040] font-bold">{option.price}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}
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
                  setCategoryFilter('all');
                }}
                className="px-6 py-3 bg-[#BF9040] hover:bg-[#D4A853] text-black font-semibold rounded-lg transition-colors"
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
