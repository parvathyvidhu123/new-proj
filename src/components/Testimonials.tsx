"use client";

import React, { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: "Rahul R. Kurup",
      role: "Software Engineer",
      location: "Kottayam",
      quote: "Got my first custom forearm tattoo here. The line work and details are extremely clean, and the artists are highly skilled. Best tattoo studio in Kottayam, highly recommended!",
      rating: 5,
    },
    {
      name: "Sruthy Mohan",
      role: "College Student",
      location: "Kalathipady",
      quote: "Had my nose pierced at Blackhole. I was super nervous, but they made me feel so comfortable. The process was sterile, quick, and almost completely painless. Healing has been great!",
      rating: 5,
    },
    {
      name: "Thomas K. Varghese",
      role: "Business Owner",
      location: "Kottayam",
      quote: "Very professional team. They spent a lot of time helping me refine my ideas during the initial consult. The studio is pristine, hygienic, and has a great aesthetic vibe.",
      rating: 5,
    },
    {
      name: "Devika Suresh",
      role: "Content Creator",
      location: "Kochi",
      quote: "Visited them for a custom fine-line tattoo. The artists here are creative genius and pay great attention to detail. Hygiene standards are 100% sterile. Exceptional service!",
      rating: 5,
    },
  ];

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      className="relative w-full py-24 md:py-36 bg-warm-white dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-500"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight">
            TESTIMONIALS OF <br />
            <span className="font-serif italic font-light text-gold-accent tracking-wide">TRUST & EXCELLENCE</span>
          </h2>
        </div>

        {/* Carousel Window */}
        <div className="relative">
          
          {/* Main Slide Card */}
          <div className="glass-premium bg-white/90 dark:bg-zinc-900/90 p-8 md:p-16 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 shadow-2xl relative overflow-hidden transition-all duration-500 min-h-[350px] md:min-h-[300px] flex flex-col justify-between">
            
            {/* Soft decorative quotes */}
            <span className="absolute top-8 right-12 font-serif text-zinc-300/40 dark:text-zinc-800/50 text-[10rem] leading-none select-none pointer-events-none">
              “
            </span>

            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-8">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-gold-accent text-gold-accent animate-pulse-slow" />
                ))}
              </div>

              {/* Review Quote */}
              <p className="font-serif text-lg md:text-2xl font-light italic text-zinc-700 dark:text-zinc-200 leading-relaxed mb-8 md:mb-12">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </p>
            </div>

            {/* Author Metadata */}
            <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800/60 pt-6">
              <div>
                <h4 className="font-sans text-sm font-bold tracking-widest text-zinc-900 dark:text-zinc-100 uppercase">
                  {testimonials[activeIndex].name}
                </h4>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block font-light">
                  {testimonials[activeIndex].role} • {testimonials[activeIndex].location}
                </span>
              </div>

              {/* Manual Nav Buttons inside card */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-red-600 bg-white dark:bg-zinc-950 hover:bg-red-600 dark:hover:bg-red-600 hover:text-white dark:hover:text-white text-zinc-600 dark:text-zinc-400 transition-all duration-300 cursor-pointer"
                  aria-label="Previous Slide"
                  data-cursor-text="Prev"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-red-600 bg-white dark:bg-zinc-950 hover:bg-red-600 dark:hover:bg-red-600 hover:text-white dark:hover:text-white text-zinc-600 dark:text-zinc-400 transition-all duration-300 cursor-pointer"
                  aria-label="Next Slide"
                  data-cursor-text="Next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeIndex === index ? "w-8 bg-red-600" : "w-1.5 bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400 dark:hover:bg-zinc-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
