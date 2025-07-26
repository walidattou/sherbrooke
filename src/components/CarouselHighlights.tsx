"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselHighlightsProps {
  highlights: { title: string; desc: string; price: string; image: string }[];
  sectionTitle: string;
}

export default function CarouselHighlights({ highlights, sectionTitle }: CarouselHighlightsProps) {
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handlePrev = () => {
    setSlideDirection('left');
    setTimeout(() => {
      setCarouselIndex((carouselIndex - 1 + highlights.length) % highlights.length);
      setSlideDirection(null);
    }, 300);
  };
  
  const handleNext = () => {
    setSlideDirection('right');
    setTimeout(() => {
      setCarouselIndex((carouselIndex + 1) % highlights.length);
      setSlideDirection(null);
    }, 300);
  };
  
  return (
    <div className="mb-12 flex flex-col md:flex-row items-center gap-8 bg-gray-900/80 rounded-2xl p-4 md:p-8 border border-[#BF9040]/30 shadow-lg">
      {/* Left: Text */}
      <div className="flex-1 w-full md:w-auto mb-6 md:mb-0">
        <h3 className="text-3xl font-bold text-[#BF9040] mb-2">{sectionTitle}</h3>
        <div className="mb-6 min-h-[8.5rem] flex items-center justify-center md:justify-start">
          <div
            key={carouselIndex}
            className={`transition-opacity duration-500 ease-in-out w-full ${slideDirection ? 'opacity-0' : 'opacity-100'}`}
          >
            <span className="block text-xl md:text-2xl font-semibold text-white mb-2">{highlights[carouselIndex].title}</span>
            <span className="block text-gray-300 mb-2 md:text-base text-sm leading-relaxed">{highlights[carouselIndex].desc}</span>
            <span className="block text-2xl font-bold text-[#BF9040]">{highlights[carouselIndex].price}</span>
          </div>
        </div>
      </div>
      {/* Right: Carousel */}
      <div className="flex-1 w-full md:w-auto flex flex-col items-center">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-56 sm:h-72 md:h-80 flex items-center justify-center overflow-hidden" style={{ minHeight: '20rem', minWidth: '16rem' }}>
          <button
            onClick={handlePrev}
            className="absolute left-2 z-10 bg-black/60 hover:bg-[#BF9040]/80 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md border border-[#BF9040]/40"
            aria-label="Previous"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <ChevronLeft size={24} />
          </button>
          <div
            className={`absolute w-full h-full transition-transform duration-500 ${slideDirection === 'left' ? '-translate-x-full' : ''} ${slideDirection === 'right' ? 'translate-x-full' : ''}`}
            key={carouselIndex}
          >
            <Image
              src={highlights[carouselIndex].image}
              alt={highlights[carouselIndex].title}
              fill
              className={`object-contain rounded-xl`}
              style={{ 
                transition: 'transform 0.3s',
                objectPosition: 'center center',
                transform: highlights[carouselIndex].image.includes('sandwichs pitas.png') ? 'scale(1.2)' : 
                          highlights[carouselIndex].image.includes('veggie sub.png') ? 'scale(1.4)' :
                          highlights[carouselIndex].image.includes('daal.png') ? 'scale(1.4)' :
                          highlights[carouselIndex].image.includes('butter chicken.png') ? 'scale(1.4)' :
                          highlights[carouselIndex].image.includes('sea-bass.png') ? 'scale(1.5)' :
                          highlights[carouselIndex].image.includes('salmon.png') ? 'scale(1.5)' :
                          highlights[carouselIndex].image.includes('Chicken Greek Pasta.png') ? 'scale(1.6)' :
                          highlights[carouselIndex].image.includes('mushroom pizza.png') ? 'scale(1.6)' :
                          highlights[carouselIndex].image.includes('pasta.png') ? 'scale(1.6)' : 'scale(1)'
              }}
            />
          </div>
          <button
            onClick={handleNext}
            className="absolute right-2 z-10 bg-black/60 hover:bg-[#BF9040]/80 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md border border-[#BF9040]/40"
            aria-label="Next"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
} 