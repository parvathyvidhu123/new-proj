"use client";

import React from "react";
import { LayoutGrid } from "../../components/ui/layout-grid";
import SocialCards from "../../components/ui/card-fan-carousel";

export default function StudioPage() {
  const momentCards = [
    { imgUrl: "/assets/moment_1.webp", alt: "Happy Moment 1" },
    { imgUrl: "/assets/moment_2.webp", alt: "Happy Moment 2" },
    { imgUrl: "/assets/moment_3.webp", alt: "Happy Moment 3" },
    { imgUrl: "/assets/moment_6.webp", alt: "Happy Moment 6" },
    { imgUrl: "/assets/moment_7.webp", alt: "Happy Moment 7" },
    { imgUrl: "/assets/moment_8.webp", alt: "Happy Moment 8" },
    { imgUrl: "/assets/moment_9.webp", alt: "Happy Moment 9" },
    { imgUrl: "/assets/moment_10.webp", alt: "Happy Moment 10" },
    { imgUrl: "/assets/moment_11.webp", alt: "Happy Moment 11" },
    { imgUrl: "/assets/moment_12.webp", alt: "Happy Moment 12" },
    { imgUrl: "/assets/moment_13.webp", alt: "Happy Moment 13" },
    { imgUrl: "/assets/moment_14.webp", alt: "Happy Moment 14" },
    { imgUrl: "/assets/moment_15.webp", alt: "Happy Moment 15" },
  ];
  return (
    <div className="w-full min-h-screen bg-matte-black text-zinc-100 flex flex-col pt-32 pb-20 relative overflow-hidden">
      {/* Decorative background blur elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Page Title & Intro */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center mb-12 md:mb-16">
        <span className="text-xs font-bold tracking-[0.3em] text-gold-accent uppercase mb-3 block">
          Behind the Lens
        </span>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">STUDIO</span> <span className="text-stroke">AMBIENCE</span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-zinc-400 leading-relaxed font-sans">
          Step into our creative sanctuary in Kottayam. A fusion of clinical sterility, premium comfort, and dark avant-garde aesthetics designed to inspire both artist and collector.
        </p>
      </div>

      {/* LayoutGrid Component */}
      <div className="flex-1 w-full flex items-center justify-center mb-16">
        <LayoutGrid cards={cards} />
      </div>

      {/* Customer Moments Section */}
      <section className="w-full py-20 bg-matte-black relative overflow-visible border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center mb-8">
          <span className="text-xs font-bold tracking-[0.3em] text-red-500 uppercase mb-3 block">
            Studio Vibes
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-zinc-100 mb-6">
            Happy <span className="text-stroke">Moments</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xs md:text-sm text-zinc-400 leading-relaxed font-sans">
            Real customer smiles, shared laughter, and fresh art. Glimpse into the daily life, comfort, and positive vibes inside the Blackhole studio.
          </p>
        </div>
        <div className="w-full relative overflow-visible py-10">
          <SocialCards cards={momentCards} />
        </div>
      </section>

      {/* Pet Friendly Section */}
      <section className="w-full py-20 bg-gradient-to-b from-matte-black to-zinc-950 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle_at_bottom_right,rgba(234,179,8,0.03),transparent_50%) pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Col: Pet friendly image */}
            <div className="relative aspect-[2/3] w-full max-w-[320px] mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="/assets/studio_pets.webp"
                alt="Pet Friendly Blackhole Studio"
                className="object-cover absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent opacity-80" />
            </div>

            {/* Right Col: Content text */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-gold-accent/10 border border-gold-accent/20 rounded-full text-gold-accent text-[9px] font-bold tracking-[0.25em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-accent animate-pulse" />
                100% Pet Friendly
              </div>
              
              <h3 className="font-display text-3xl md:text-5xl font-black uppercase text-zinc-100 tracking-tight leading-none">
                PAWS, CLAWS & <br />
                <span className="text-stroke">FRESH INK</span>
              </h3>
              
              <p className="text-sm text-zinc-400 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                We believe tattoos and body curations require a relaxed, safe, and positive environment. Blackhole is proudly **100% pet-friendly**! Your furry companions are always welcome to lounge, keep you company, and support you from our waiting areas.
              </p>

              <div className="border-t border-white/5 pt-6 space-y-4 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-start gap-4 text-left">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 text-gold-accent">
                    🐾
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">Comfort Zones</h4>
                    <p className="text-xs text-zinc-500 mt-1">Cozy designated spots in our waiting lounge so your pets can relax and wait with you comfortably.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 text-left">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 text-red-500">
                    🏥
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">Clinical Separation</h4>
                    <p className="text-xs text-zinc-500 mt-1">For safety and hygiene, our tattooing and piercing bays are kept strictly sterile and isolated from animals.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

// Skeletons for Expandable Cards
const SkeletonOne = () => (
  <div>
    <p className="font-display font-bold md:text-3xl text-xl text-white uppercase tracking-wider mb-2">
      The Sterile Vault
    </p>
    <p className="font-bold text-xs text-gold-accent tracking-widest uppercase mb-4">
      Safety & Sterilization
    </p>
    <p className="font-sans font-normal text-sm text-neutral-300 leading-relaxed max-w-xl">
      Our uncompromising standard of clinical hygiene. Featuring hospital-grade autoclaves, medical disinfectants like Bacillol 25, ultrasonic cleaners, and 100% single-use membrane needle cartridges. Every procedure is sterile and sealed.
    </p>
  </div>
);

const SkeletonTwo = () => (
  <div>
    <p className="font-display font-bold md:text-3xl text-xl text-white uppercase tracking-wider mb-2">
      Creative Lounge
    </p>
    <p className="font-bold text-xs text-gold-accent tracking-widest uppercase mb-4">
      Vibe & Comfort
    </p>
    <p className="font-sans font-normal text-sm text-neutral-300 leading-relaxed max-w-xl">
      We believe in setting the perfect mood. An acoustic corner with customizable vinyl playlists, vintage audio decks, and warm lighting keeps the vibes relaxed during design reviews and long sessions.
    </p>
  </div>
);

const SkeletonThree = () => (
  <div>
    <p className="font-display font-bold md:text-3xl text-xl text-white uppercase tracking-wider mb-2">
      Tattooing Bays
    </p>
    <p className="font-bold text-xs text-gold-accent tracking-widest uppercase mb-4">
      Ergonomic Focus
    </p>
    <p className="font-sans font-normal text-sm text-neutral-300 leading-relaxed max-w-xl">
      Where the magic happens. Dedicated tattooing workspaces with custom adjustable heavy-duty leather beds, ultra-high lumen ring lights for precise ink application, and clean workspaces.
    </p>
  </div>
);

const SkeletonFour = () => (
  <div>
    <p className="font-display font-bold md:text-3xl text-xl text-white uppercase tracking-wider mb-2">
      Waiting Lounge
    </p>
    <p className="font-bold text-xs text-gold-accent tracking-widest uppercase mb-4">
      Premium Welcome
    </p>
    <p className="font-sans font-normal text-sm text-neutral-300 leading-relaxed max-w-xl">
      Relax in style before your session. Our main waiting area is outfitted with deep yellow leather tufted Chesterfield sofas, modern lighting, and a selection of curated flash artwork files to browse.
    </p>
  </div>
);

const SkeletonFive = () => (
  <div>
    <p className="font-display font-bold md:text-3xl text-xl text-white uppercase tracking-wider mb-2">
      Piercing Setup
    </p>
    <p className="font-bold text-xs text-gold-accent tracking-widest uppercase mb-4">
      Clinical Precision
    </p>
    <p className="font-sans font-normal text-sm text-neutral-300 leading-relaxed max-w-xl">
      Precision piercing requires precision tools. Fully sterilized surgical steel tools, single-use piercing needles, and custom titanium jewelry laid out on sterile drapes ready for procedure.
    </p>
  </div>
);

const SkeletonSix = () => (
  <div>
    <p className="font-display font-bold md:text-3xl text-xl text-white uppercase tracking-wider mb-2">
      Live Session
    </p>
    <p className="font-bold text-xs text-gold-accent tracking-widest uppercase mb-4">
      Artistic Collaboration
    </p>
    <p className="font-sans font-normal text-sm text-neutral-300 leading-relaxed max-w-xl">
      Watch custom designs come to life. Our resident artists focus on client comfort and high-contrast skin detailing using top-shelf rotary machines and dynamic black inks.
    </p>
  </div>
);

const SkeletonSeven = () => (
  <div>
    <p className="font-display font-bold md:text-3xl text-xl text-white uppercase tracking-wider mb-2">
      Studio Greenery
    </p>
    <p className="font-bold text-xs text-gold-accent tracking-widest uppercase mb-4">
      Clean Air Vibe
    </p>
    <p className="font-sans font-normal text-sm text-neutral-300 leading-relaxed max-w-xl">
      Lively ZZ plants and monstera slots line the studio, improving air quality and offering a refreshing, clean contrast to the bold matte black walls.
    </p>
  </div>
);

const SkeletonEight = () => (
  <div>
    <p className="font-display font-bold md:text-3xl text-xl text-white uppercase tracking-wider mb-2">
      Kottayam Overview
    </p>
    <p className="font-bold text-xs text-gold-accent tracking-widest uppercase mb-4">
      Opera House Location
    </p>
    <p className="font-sans font-normal text-sm text-neutral-300 leading-relaxed max-w-xl">
      Located on the second floor of the Grand Opera Building. The massive glass windows look out directly onto the busy street, filling the studio with gorgeous natural light during daytime hours.
    </p>
  </div>
);

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "col-span-1",
    thumbnail: "/assets/studio_ambience_8.webp",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: "/assets/studio_ambience_3.webp",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail: "/assets/studio_ambience_4.webp",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "col-span-1",
    thumbnail: "/assets/studio_ambience_7.webp",
  },
  {
    id: 5,
    content: <SkeletonFive />,
    className: "col-span-1",
    thumbnail: "/assets/studio_ambience_5.webp",
  },
  {
    id: 6,
    content: <SkeletonSix />,
    className: "col-span-1",
    thumbnail: "/assets/studio_ambience_2.webp",
  },
  {
    id: 7,
    content: <SkeletonSeven />,
    className: "col-span-1",
    thumbnail: "/assets/studio_ambience_6.webp",
  },
  {
    id: 8,
    content: <SkeletonEight />,
    className: "col-span-1",
    thumbnail: "/assets/studio_ambience_1.webp",
  },
];
