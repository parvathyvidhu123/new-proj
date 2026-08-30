"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
}

interface SocialCardsProps {
  cards: CardItem[];
}

export default function SocialCards({ cards }: SocialCardsProps) {
  const totalCards = cards.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setTimeout(() => setWindowWidth(window.innerWidth), 0);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!totalCards) return null;

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isSmallMobile = windowWidth < 400;

  // Responsive dimensions in rem
  const cardWidth = isMobile ? (isSmallMobile ? 6.5 : 8.5) : (isTablet ? 12 : 16);
  const cardHeight = isMobile ? (isSmallMobile ? 9.5 : 12) : (isTablet ? 17 : 22.5);
  const xStep = isMobile ? (isSmallMobile ? 3.5 : 4.8) : (isTablet ? 9.5 : 13.5);
  const yStep = isMobile ? (isSmallMobile ? 0.3 : 0.4) : (isTablet ? 0.7 : 0.9);
  const rotStep = 4.5;

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setHoveredIndex(null);
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setHoveredIndex(null);
    setActiveIndex((prev) => (prev + 1) % totalCards);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const getDiff = (index: number) => {
    let diff = index - activeIndex;
    if (diff < -totalCards / 2) diff += totalCards;
    if (diff > totalCards / 2) diff -= totalCards;
    return diff;
  };

  return (
    <div className="w-full flex flex-col items-center select-none overflow-visible">
      {/* Cards container */}
      <div className="relative flex justify-center items-center w-full h-[18rem] md:h-[32rem] overflow-visible">
        {cards.map((card, index) => {
          const diff = getDiff(index);
          const absDiff = Math.abs(diff);
          const isVisible = absDiff <= 2; // Show 5 cards at a time

          // Calculate transforms based on position slot
          let targetX = diff * xStep;
          let targetY = absDiff * absDiff * yStep;
          let targetRot = diff * rotStep;
          let targetScale = 1 - absDiff * 0.08;
          let targetZIndex = 10 - absDiff;
          const targetOpacity = isVisible ? 1 : 0;

          // Adjust positions when a card is hovered (disabled during layout transition)
          if (hoveredIndex !== null && isVisible && !isTransitioning) {
            const hoverDiff = index - hoveredIndex;
            if (index === hoveredIndex) {
              targetY -= isMobile ? 1.5 : 3.0; // Lift active card
              targetScale *= 1.08; // scale up
              targetZIndex = 20; // Bring to front
            } else if (hoverDiff < 0) {
              targetX -= isMobile ? 1.5 : 3.5; // Shift left neighbors left
              targetRot -= 3;
            } else if (hoverDiff > 0) {
              targetX += isMobile ? 1.5 : 3.5; // Shift right neighbors right
              targetRot += 3;
            }
          }

          const cardContent = (
            <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-zinc-900">
              <img
                src={card.imgUrl}
                alt={card.alt || `Moment ${index}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          );

          return (
            <motion.div
              key={index}
              className="absolute cursor-pointer origin-bottom"
              style={{
                width: `${cardWidth}rem`,
                height: `${cardHeight}rem`,
              }}
              animate={{
                x: `${targetX}rem`,
                y: `${targetY}rem`,
                rotate: targetRot,
                scale: targetScale,
                zIndex: targetZIndex,
                opacity: targetOpacity,
                pointerEvents: isVisible ? "auto" : "none",
              }}
              transition={{
                type: "spring",
                stiffness: 120, // smooth, natural spring stiffness
                damping: 22,    // smooth, bounce-free damping
              }}
              onMouseEnter={() => isVisible && !isTransitioning && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => isVisible && !isTransitioning && index !== activeIndex && setActiveIndex(index)}
            >
              {card.linkUrl ? (
                <a
                  href={card.linkUrl}
                  target={card.linkUrl.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="w-full h-full block"
                >
                  {cardContent}
                </a>
              ) : (
                cardContent
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-6 mt-8 md:mt-16 z-30">
        <button
          onClick={handlePrev}
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-800 bg-zinc-950/60 backdrop-blur-md text-zinc-400 hover:text-white hover:border-gold-accent/40 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        
        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-gold-accent"
                  : "w-2 bg-zinc-800 hover:bg-zinc-600"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-800 bg-zinc-950/60 backdrop-blur-md text-zinc-400 hover:text-white hover:border-gold-accent/40 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
}
