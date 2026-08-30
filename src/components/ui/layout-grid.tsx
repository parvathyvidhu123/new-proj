"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

// Clean and simple conditional class name merging utility
const cn = (...classes: unknown[]) => classes.filter(Boolean).join(" ");

type Card = {
  id: number;
  content: React.JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-6 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "aspect-[3/4] w-full relative")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              "relative overflow-hidden cursor-pointer w-full h-full rounded-xl transition-all duration-300",
              selected?.id === card.id
                ? "absolute inset-0 h-[60vh] w-[90vw] md:w-[60vw] max-w-4xl m-auto z-50 flex justify-center items-center flex-wrap flex-col shadow-2xl"
                : lastSelected?.id === card.id
                ? "z-40 bg-zinc-900 h-full w-full"
                : "bg-zinc-900 h-full w-full"
            )}
            layoutId={`card-${card.id}`}
            style={{
              position: selected?.id === card.id ? "fixed" : "relative",
            }}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} onClose={handleOutsideClick} />}
            <ImageComponent card={card} isSelected={selected?.id === card.id} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-all duration-300",
          selected?.id ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        animate={{ opacity: selected?.id ? 1 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({ card, isSelected }: { card: Card; isSelected: boolean }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      className={cn(
        "object-cover object-center absolute inset-0 h-full w-full transition duration-300",
        isSelected ? "brightness-[0.4]" : "hover:scale-105"
      )}
      alt="Tattoo Studio Ambience"
    />
  );
};

const SelectedCard = ({ selected, onClose }: { selected: Card | null; onClose: () => void }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-xl relative z-[60] p-6 md:p-10 overflow-y-auto no-scrollbar">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-[80] w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 40,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative z-[70] text-left"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
