"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import DishCard from "./DishCard";
import FilterBar from "./FilterBar";
import LoadingSpinner from "./LoadingSpinner";
import CarouselHighlights from './CarouselHighlights';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: string;
  category?: string;
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
  const [displayCount, setDisplayCount] = useState(45); // Start with 45 items
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
                {/* Chef's Highlights Carousel for all sections */}
                {(() => {
                  let highlights: { title: string; desc: string; price: string; image: string }[] = [];
                  let sectionTitle = '';
                  if (title === 'Grills') {
                    highlights = [
                      {
                        title: "Lamb Chops (4 pcs)",
                        desc: "Four pieces of juicy, flame-grilled lamb chops, marinated in aromatic spices and cooked until tender with a smoky finish.",
                        price: "$35.99",
                        image: "/categories_im/A.png"
                      },
                      {
                        title: "Mixed Grill Platter",
                        desc: "A delicious trio of tandoori chicken, tender lamb tikka, and succulent shrimp, all grilled to perfection. Served with fragrant basmati rice and a side of fresh garden salad.",
                        price: "$19.95",
                        image: "/categories_im/B.png"
                      },
                      {
                        title: "Chicken pita",
                        desc: "Chicken pita sandwich.",
                        price: "$5.99",
                        image: "/categories_im/sandwichs pitas.png"
                      },
                      {
                        title: "Veggie Sub",
                        desc: "Green peppers, green olives, Kalamata olives.",
                        price: '$9.99 - "10" / $12.99 - "14"',
                        image: "/categories_im/veggie sub.png"
                      }
                    ];
                    sectionTitle = "Grills Chef's Highlights";
                  } else if (title === 'Indian') {
                    highlights = [
                      {
                        title: "Chicken Vindaloo",
                        desc: "Very spicy curry with potatoes, glazed onions, garlic, ginger and hot peppers",
                        price: "$13.95",
                        image: "/categories_im/indian1.png"
                      },
                      {
                        title: "Lamb Tikka Masala",
                        desc: "Lamb cooked in a creamy tomato sauce",
                        price: "$14.95",
                        image: "/categories_im/indian2.png"
                      },
                      {
                        title: "Butter Chicken",
                        desc: "Chicken breast pieces, roasted and simmered in a creamy sauce",
                        price: "$15.95",
                        image: "/categories_im/butter chicken.png"
                      },
                      {
                        title: "Daal Soup",
                        desc: "Lightly spiced red lentil soup",
                        price: "$3.95",
                        image: "/categories_im/daal.png"
                      },
            
            
                    ];
                    sectionTitle = "Indian Chef's Highlights";
                  } else if (title === 'Seafood') {
                    highlights = [
                      {
                        title: "Mediterranean Seafood (1 person)",
                        desc: "Mediterranean sea bass",
                        price: "$35.99",
                        image: "/categories_im/sea-bass.png"
                      },
                      {
                        title: "Fillet of Sole",
                        desc: "Fillet of sole",
                        price: "$17.95",
                        image: "/categories_im/seafood2.png"
                      },
                      {
                        title: "Mix Grill Platter",
                        desc: "Selection of chicken, lamb chop, shrimps, mushrooms and peppers",
                        price: "$59.95",
                        image: "/categories_im/seafood1.png"
                      },
                      {
                        title: "Salmon",
                        desc: "Salmon",
                        price: "$22.99 - single",
                        image: "/categories_im/salmon.png"
                      }
                    ];
                    sectionTitle = "Seafood Chef's Highlights";
                  }
                  // Carousel for first 2
                  const carouselItems = highlights.slice(0, 4);
                  // Static cards for any additional highlights
                  const staticItems = highlights.slice(4);
                  return (
                    <>
                      {carouselItems.length > 0 && (
                        <CarouselHighlights sectionTitle={sectionTitle} highlights={carouselItems} />
                      )}
                      {staticItems.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
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
                      )}
                    </>
                  );
                })()}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                  {title === 'Grills' ? (
                    // For Grills, show dishes 2-4 (since 0-1 are in carousel)
                    filteredDishes
                      .filter(dish => isDishSpecial(dish) || isDishPopular(dish))
                      .slice(2, 4)
                      .map((dish, index) => (
                        <DishCard
                          key={`featured-${dish.id}`}
                          dish={dish}
                          index={index + 2}
                          isSpecial={isDishSpecial(dish)}
                          isPopular={isDishPopular(dish)}
                          variant="featured"
                        />
                      ))
                  ) : (
                    // For other sections (Indian, Seafood), show all 4 dishes, but filter out highlights for Indian and specific items for Seafood
                    filteredDishes
                      .filter(dish => {
                        if (title === 'Indian') {
                          // Do not filter out any dishes for Indian section
                          return true;
                        }
                        if (title === 'Seafood') {
                          // Remove Grilled Jumbo Shrimps, Grilled Jumbo Shrimps (4 pcs), and Sherbrooke Seafood Platter
                          return !["Grilled Jumbo Shrimps", "Grilled Jumbo Shrimps (4 pcs)", "Sherbrooke Seafood Platter"].includes(dish.name);
                        }
                        return true;
                      })
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
                      ))
                  )}
                  
                  {/* Additional Chef's Special dishes - Show different dishes based on menu type */}
                  {title === 'Seafood' ? (
                    <>
                      <DishCard
                        key="mediterranean-sea-bass-special"
                        dish={{ 
                          id: 997, 
                          name: "Mediterranean Sea Bass", 
                          description: "Fresh Mediterranean sea bass grilled to perfection with herbs and lemon.", 
                          price: "$35.99" 
                        }}
                        index={0}
                        isSpecial={true}
                        isPopular={false}
                        variant="featured"
                      />
                      
                      <DishCard
                        key="grilled-salmon-special"
                        dish={{ 
                          id: 996, 
                          name: "Grilled Salmon", 
                          description: "Fresh Atlantic salmon grilled with herbs and served with seasonal vegetables.", 
                          price: "$22.99" 
                        }}
                        index={1}
                        isSpecial={true}
                        isPopular={false}
                        variant="featured"
                      />
                    </>
                  ) : title === 'Grills' ? (
                    <>
                      <DishCard
                        key="whole-chicken-special"
                        dish={{ 
                          id: 999, 
                          name: "Whole Chicken", 
                          description: "Juicy whole chicken marinated in spices and grilled to perfection.", 
                          price: "$24.99" 
                        }}
                        index={0}
                        isSpecial={true}
                        isPopular={false}
                        variant="featured"
                      />
                      
                      <DishCard
                        key="chicken-wings-special"
                        dish={{ 
                          id: 998, 
                          name: "Chicken Wings (20 pcs)", 
                          description: "Twenty pieces of spicy grilled chicken wings.", 
                          price: "$19.99" 
                        }}
                        index={1}
                        isSpecial={true}
                        isPopular={false}
                        variant="featured"
                      />
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {/* All Dishes in Magazine Layout */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white text-center mb-6">
                Complete <span className="text-[#BF9040]">Menu Selection</span>
              </h2>
              {/* For Indian menu, show Soups, then Curry, then others in order */}
              {title === 'Indian' ? (
                (() => {
                  const categoryOrder = ['Soups', 'Curry'];
                  // Get all unique categories, but put Soups and Curry first
                  const allCategories = Array.from(new Set(filteredDishes.map(d => typeof d.category === 'string' ? d.category : null).filter((c): c is string => Boolean(c))));
                  const orderedCategories = [
                    ...categoryOrder.filter(cat => allCategories.includes(cat)),
                    ...allCategories.filter(cat => !categoryOrder.includes(cat))
                  ];
                  
                  // Show all dishes in each category, but limit the number of categories shown
                  const categoriesToShow = Math.ceil(displayCount / 6); // Show 6 dishes per category
                  
                  return (
                    <div className="space-y-12">
                      {orderedCategories.filter(Boolean).slice(0, categoriesToShow).map(category => {
                        const categoryDishes = filteredDishes.filter(d => d.category === category);
                        
                                                  return (
                            <div key={category}>
                              <h3 className="text-xl font-bold text-[#BF9040] mb-4 mt-8 text-center">{category}</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                              {categoryDishes.map((dish, index) => (
                                <div key={dish.id}>
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
                          </div>
                        );
                      })}
                    </div>
                  );
                })()
              ) : (
                // Default grouping for other menus
                (() => {
                  const categories = Array.from(new Set(filteredDishes.map(d => d.category).filter(Boolean)));
                  
                  if (categories.length > 0) {
                    // Show all dishes in each category, but limit the number of categories shown
                    const categoriesToShow = Math.ceil(displayCount / 6); // Show 6 dishes per category
                    
                    return (
                      <div className="space-y-12">
                        {categories.slice(0, categoriesToShow).map(category => {
                          const categoryDishes = filteredDishes.filter(d => d.category === category);
                          
                          return (
                            <div key={category}>
                              <h3 className="text-xl font-bold text-[#BF9040] mb-4 mt-8 text-center">{category}</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {categoryDishes.map((dish, index) => (
                                  <div key={dish.id}>
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
                            </div>
                          );
                        })}
                      </div>
                    );
                  } else {
                    // No categories - show all dishes in a single grid
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDishes.slice(0, displayCount).map((dish, index) => (
                          <div key={dish.id}>
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
                    );
                  }
                })()
              )}

              {/* Load More Button - Only show if there are more dishes to load */}
              {(() => {
                const totalDisplayed = Math.min(displayCount, filteredDishes.length);
                const remaining = filteredDishes.length - totalDisplayed;
                
                return remaining > 0 ? (
                <div className="text-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                      onClick={() => setDisplayCount(prev => prev + 45)}
                    className="px-8 py-4 bg-[#BF9040] hover:bg-[#D4A853] text-black font-bold rounded-xl transition-all duration-200 shadow-lg"
                  >
                      Load More Dishes ({remaining} remaining)
                  </motion.button>
                </div>
                ) : null;
              })()}
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
              {/* Existing special dishes */}
              {dishes
                .filter(dish => isDishSpecial(dish) && dish.name !== "Sherbrooke Seafood Platter")
                .slice(0, 3)
                .map((dish) => (
                  <div key={dish.id} className="p-4 bg-gray-800/50 rounded-lg border border-[#BF9040]/30">
                    <h4 className="font-semibold text-[#BF9040] mb-2">{dish.name}</h4>
                    <p className="text-sm text-gray-300 mb-2">{dish.description}</p>
                    <span className="text-lg font-bold text-white">{dish.price}</span>
                  </div>
                ))}
              
              {/* Additional Chef's Special dishes */}
              <div className="p-4 bg-gray-800/50 rounded-lg border border-[#BF9040]/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-[#BF9040] text-black text-xs font-bold rounded">Chef&apos;s Special</span>
                </div>
                <h4 className="font-semibold text-[#BF9040] mb-2">Whole Chicken</h4>
                <p className="text-sm text-gray-300 mb-2">Juicy whole chicken marinated in spices and grilled to perfection.</p>
                <span className="text-lg font-bold text-white">$24.99</span>
              </div>
              
              <div className="p-4 bg-gray-800/50 rounded-lg border border-[#BF9040]/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-[#BF9040] text-black text-xs font-bold rounded">Chef&apos;s Special</span>
                </div>
                <h4 className="font-semibold text-[#BF9040] mb-2">Chicken Wings (20 pcs)</h4>
                <p className="text-sm text-gray-300 mb-2">Twenty pieces of spicy grilled chicken wings.</p>
                <span className="text-lg font-bold text-white">$19.99</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 

 