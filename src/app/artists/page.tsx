"use client";

import React from "react";
import Image from "next/image";

interface Artist {
  id: number;
  name: string;
  role: string;
  experience: string;
  style: string[];
  bio: string;
  avatar: string;
  instagram: string;
  certifications: string[];
  portfolio: { title: string; src: string; placement: string }[];
  objectPosition?: string;
}

export default function ArtistsPage() {

  const artists: Artist[] = [
    {
      id: 1,
      name: "Manu Narayan",
      role: "Founder & Lead Tattoo Artist",
      experience: "10 Years",
      style: ["Japanese Irezumi", "Bold Traditional", "Heavy Blackwork"],
      bio: "Manu Narayan is the founder of Blackhole Tattoos. With a decade of dedicated skin illustration experience, he has pioneered contemporary blackwork and custom traditional body layouts in Kerala. His sessions blend deep aesthetic collaboration with clinical precision.",
      avatar: "/assets/artist_manu.webp",
      instagram: "https://instagram.com/manu.narayan.ink",
      certifications: ["Red Cross Bloodborne Pathogens Standard", "First Aid & CPR Certified", "Preventative Cross-Contamination Certification"],
      portfolio: [
        { title: "Bio-Mechanical Sleeve", src: "/assets/media__1782481912436.png", placement: "Full Sleeve" },
        { title: "Spartan Valor", src: "/assets/media__1782481960530.jpg", placement: "Shoulder" },
        { title: "Mechanical Spark Plug", src: "/assets/media__1782481991198.jpg", placement: "Upper Arm" }
      ],
      objectPosition: "center"
    },
    {
      id: 2,
      name: "Jaison",
      role: "Guest / Freelance Artist",
      experience: "7 Years",
      style: ["All Styles", "Hyper-Realism", "Portrait Realism", "Dark Surrealism"],
      bio: "Jaison specializes in high-fidelity hyper-realism and sharp portraits. Capable of executing diverse styling parameters, his ability to render delicate lighting and soft shadows on the skin makes his works look completely lifelike.",
      avatar: "/assets/artist_jaison.png",
      instagram: "https://instagram.com/jaison.realism.art",
      certifications: ["Red Cross Bloodborne Pathogens Standard", "Sterilization Vault Protocols Expert"],
      portfolio: [
        { title: "Baphomet & Earth", src: "/assets/media__1782481858355.jpg", placement: "Shoulder" },
        { title: "Nine-Tails Spirit (Kurama)", src: "/assets/media__1782481888671.png", placement: "Calf" },
        { title: "Angel Wings & Halo", src: "/assets/media__1782482003979.png", placement: "Nape of Neck" }
      ],
      objectPosition: "center"
    },
    {
      id: 3,
      name: "Amal",
      role: "Fine-Line & Illustrative Specialist",
      experience: "5 Years",
      style: ["Fine-Line", "Geometric Mandalas", "Dotwork / Stippling"],
      bio: "Amal channels natural botany and abstract illustration into custom fine-line designs. Known for his steady hand and geometric layouts, he delivers crisp, elegant, and minimally complex details.",
      avatar: "/assets/artist_amal.png",
      instagram: "https://instagram.com/amal.fineline",
      certifications: ["Red Cross Bloodborne Pathogens Standard", "APP Safety Guidelines Compliant"],
      portfolio: [
        { title: "Daith & Lobe Curation", src: "/assets/media__1782481680893.jpg", placement: "Ear Piercing" },
        { title: "Helix Piercing & Blessed script", src: "/assets/media__1782481697243.jpg", placement: "Ear & Neck" },
        { title: "Triple Lobe Piercing", src: "/assets/media__1782481731065.png", placement: "Ear" }
      ],
      objectPosition: "center"
    },
    {
      id: 4,
      name: "Athul",
      role: "Guest / Freelance Artist",
      experience: "6 Years",
      style: ["All Styles", "Black & Grey Realism", "Custom Designs"],
      bio: "Athul is a versatile guest artist at Blackhole. Proficient across all design categories, his fluid adaptability allows him to transition seamlessly between bold lines, delicate shading, and custom concepts.",
      avatar: "/assets/artist_athul.webp",
      instagram: "https://instagram.com/athul.ink",
      certifications: [],
      portfolio: [],
      objectPosition: "center"
    },
    {
      id: 5,
      name: "Divya",
      role: "Guest / Freelance Artist",
      experience: "5 Years",
      style: ["All Styles", "Bespoke Illustration", "Fine-Line & Dotwork"],
      bio: "Divya is an accomplished freelance artist who brings a versatile multi-disciplinary approach to Blackhole. Capable of executing all design styles, she excels at translating complex personal stories into clean illustrations.",
      avatar: "/assets/artist_divya.webp",
      instagram: "https://instagram.com/divya.art",
      certifications: [],
      portfolio: [],
      objectPosition: "center"
    },
    {
      id: 6,
      name: "Akhil",
      role: "Guest / Freelance Artist",
      experience: "7 Years",
      style: ["All Styles", "Neo-Traditional", "Heavy Contrast Blackwork"],
      bio: "Akhil is a highly skilled freelance artist who joins the Blackhole collective for custom sessions. Proficient across all styling methodologies, his work is characterized by high contrast and absolute versatility.",
      avatar: "/assets/artist_akhil.webp",
      instagram: "https://instagram.com/akhil.ink",
      certifications: [],
      portfolio: [],
      objectPosition: "center"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-matte-black text-zinc-100 flex flex-col pt-32 pb-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Page Title & Intro */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-16">
        <span className="text-xs font-bold tracking-[0.3em] text-gold-accent uppercase mb-3 block">
          Creative Collective
        </span>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          THE ARTISTS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">BEHIND THE</span> <span className="text-stroke">NEEDLE</span>
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-zinc-400 leading-relaxed font-sans">
          Meet the resident specialists and guest artists at Blackhole. From custom large-scale traditional irezumi to versatile modern illustrative concepts, our collective delivers absolute artistic mastery.
        </p>
      </div>

      {/* Artists Directory Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="glass-premium rounded-2xl overflow-hidden flex flex-col group border border-white/5 hover:border-gold-accent/30 transition-all duration-500"
          >
            {/* Avatar image container */}
            <div className="relative aspect-[4/3] w-full bg-zinc-950 overflow-hidden">
              <Image
                src={artist.avatar}
                alt={artist.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.85] group-hover:brightness-100"
                style={{ objectPosition: artist.objectPosition || "center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
            </div>

            {/* Profile Info */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase text-zinc-100">
                      {artist.name}
                    </h3>
                    <span className="text-xs font-bold text-gold-accent tracking-wider block mt-0.5">
                      {artist.role}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full uppercase">
                    {artist.experience} Exp
                  </span>
                </div>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {artist.style.map((sty, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-zinc-900 border border-white/5 text-[9px] font-bold tracking-widest text-zinc-400 uppercase rounded-full"
                    >
                      {sty}
                    </span>
                  ))}
                </div>

                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans mb-6">
                  {artist.bio}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
