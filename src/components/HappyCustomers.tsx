"use client";

import React from "react";
import Image from "next/image";
import { Star, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface CustomerSession {
  id: number;
  name: string;
  location: string;
  service: string;
  quote: string;
  image: string;
  rating: number;
}

export default function HappyCustomers() {
  const sessions: CustomerSession[] = [
    {
      id: 1,
      name: "Rahul Kurup",
      location: "Kottayam",
      service: "Bio-Mechanical Sleeve by Vikram",
      quote: "Obessively detailed sleeve. The transition of metallic cables into skin looks completely unreal!",
      image: "/assets/media__1782481912436.png",
      rating: 5,
    },
    {
      id: 2,
      name: "Sruthy Mohan",
      location: "Kalathipady",
      service: "Daith & Lobe Piercing by Rahul",
      quote: "Completely sterile and painless. The ear curation looks so balanced and healed perfectly.",
      image: "/assets/media__1782481680893.jpg",
      rating: 5,
    },
    {
      id: 3,
      name: "Thomas Varghese",
      location: "Kottayam",
      service: "Sovereign Dragon by Rahul Nair",
      quote: "Incredible bold lines and shading. The dragon has a beautiful traditional Japanese flow.",
      image: "/assets/media__1782481875936.jpg",
      rating: 5,
    },
    {
      id: 4,
      name: "Devika Suresh",
      location: "Kochi",
      service: "Crimson Botanica Forearm by Ananya",
      quote: "The fine-line flower detail is so delicate. The red pigment pops beautifully on my skin.",
      image: "/assets/media__1782481900360.png",
      rating: 5,
    },
    {
      id: 5,
      name: "Arjun Das",
      location: "Kumarakom",
      service: "Nine-Tails Calf Tattoo by Vikram",
      quote: "Absolute masterpiece. The shading and anime styling are exactly what I envisioned.",
      image: "/assets/media__1782481888671.png",
      rating: 5,
    },
    {
      id: 6,
      name: "Meera Nair",
      location: "Kottayam",
      service: "Triple Lobe Piercing by Rahul",
      quote: "Super hygienic piercing sanctuary. Used high-grade titanium jewelry that never irritated.",
      image: "/assets/media__1782481731065.png",
      rating: 5,
    }
  ];

  return (
    <section className="relative w-full py-24 md:py-36 bg-matte-black text-zinc-100 overflow-hidden border-t border-zinc-900/50">
      {/* Decorative red/gold blur elements */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gold-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-xs font-bold tracking-[0.4em] text-gold-accent uppercase mb-4 block">
            06 // HAPPY COLLECTORS
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
            CLIENTS OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">BLACKHOLE</span> <br />
            <span className="font-serif italic font-light text-gold-accent tracking-wide">SHARING THEIR</span> CHRONICLES
          </h2>
        </div>

        {/* Customer Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((session, idx) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-premium rounded-2xl overflow-hidden border border-white/5 group hover:border-gold-accent/30 transition-all duration-500 shadow-xl flex flex-col justify-between"
            >
              {/* Client session photo */}
              <div className="relative aspect-square w-full overflow-hidden bg-zinc-950">
                <Image
                  src={session.image}
                  alt={session.service}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.8] group-hover:brightness-100"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                
                {/* Verified Customer Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-bold tracking-widest text-zinc-100 uppercase">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  Verified Art
                </div>
              </div>

              {/* Client testimonial content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-zinc-950/30">
                <div>
                  {/* Rating & Service */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {Array.from({ length: session.rating }).map((_, i) => (
                        <Star key={i} size={12} className="fill-gold-accent text-gold-accent" />
                      ))}
                    </div>
                    <span className="text-[9px] font-bold text-red-500 tracking-wider uppercase">
                      {session.service.split("by")[1]?.trim() ? `By ${session.service.split("by")[1]}` : ""}
                    </span>
                  </div>

                  {/* Service type description */}
                  <p className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-3">
                    {session.service.split("by")[0]?.trim()}
                  </p>

                  {/* Review quote */}
                  <p className="font-sans text-xs md:text-sm font-light text-zinc-300 italic leading-relaxed mb-6">
                    &ldquo;{session.quote}&rdquo;
                  </p>
                </div>

                {/* Customer footer metadata */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <h4 className="font-sans text-xs font-bold tracking-widest text-zinc-200 uppercase">
                      {session.name}
                    </h4>
                    <span className="text-[10px] text-zinc-500 mt-0.5 block font-light">
                      Collector • {session.location}
                    </span>
                  </div>
                  <Heart size={14} className="text-red-500 fill-red-500/20 group-hover:scale-125 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
