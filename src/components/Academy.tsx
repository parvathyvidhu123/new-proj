"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { GraduationCap, Award, ShieldCheck, PenTool, CheckCircle2, MessageCircle, Phone, ArrowUpRight } from "lucide-react";

export default function Academy() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const curriculum = [
    {
      number: "01",
      title: "Machine & Needle Mechanics",
      desc: "Rotary & coil machine dynamics, power supply tuning, stroke lengths, needle grouping calibration (liners, shaders, magnums), and vibration control.",
      icon: <PenTool className="w-5 h-5 text-gold-accent" />,
    },
    {
      number: "02",
      title: "Clinical Hygiene & Sterilization",
      desc: "Medical-grade aseptic protocols, bloodborne pathogen prevention, cross-contamination barriers, autoclave operation, and sterile workstation setup.",
      icon: <ShieldCheck className="w-5 h-5 text-gold-accent" />,
    },
    {
      number: "03",
      title: "Skin Canvas & Artistry",
      desc: "Skin anatomy & depth control, custom digital stencil drafting on iPad, precision fine-line execution, smooth greywash shading, and color blending.",
      icon: <Award className="w-5 h-5 text-gold-accent" />,
    },
    {
      number: "04",
      title: "Live Practicum & Certification",
      desc: "Intensive synthetic skin training progressing to supervised live model sessions, portfolio curation, client consultation etiquette, and studio certificate.",
      icon: <GraduationCap className="w-5 h-5 text-gold-accent" />,
    },
  ];

  const perks = [
    "1-on-1 Resident Master Mentorship",
    "Comprehensive Theory & Practical Syllabus",
    "Complete Starter Equipment Guidance",
    "Real-World Studio Apprenticeship",
    "Live Model Supervised Sessions",
    "Official Blackhole Certificate of Completion",
  ];

  const handleEnrollWhatsApp = () => {
    const phone = "919746695575";
    const msg = encodeURIComponent(
      "Hi Blackhole Tattoos! I am interested in joining the Blackhole Tattoo Academy training course. Please share the curriculum, upcoming batch dates, and fee structure."
    );
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${msg}`, "_blank");
  };

  return (
    <section
      id="academy"
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 bg-soft-bone dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-500"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-950/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Banner Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-zinc-900/95 via-zinc-950/95 to-black border border-gold-accent/25 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden p-8 md:p-14">
          
          {/* Subtle gold accent corner border glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-accent/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 pb-10 border-b border-zinc-800/80">
            <div className="max-w-3xl">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold-accent/10 border border-gold-accent/25 text-[10px] md:text-xs font-mono font-bold tracking-[0.25em] text-gold-accent uppercase mb-5">
                <span className="w-2 h-2 rounded-full bg-gold-accent animate-pulse" />
                ACADEMY & MENTORSHIP • PROFESSIONAL TATTOO EDUCATION
              </div>

              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                BLACKHOLE <br />
                <span className="font-serif italic font-light text-gold-accent tracking-wide">TATTOO ACADEMY</span>
              </h2>

              <p className="mt-5 font-sans text-sm md:text-base text-zinc-300 font-light leading-relaxed max-w-2xl">
                Master the timeless discipline of tattoo craftsmanship. From machine calibration and medical-grade hygiene protocols to intricate skin illustration and client consultation, learn directly under the mentorship of <strong className="text-white font-semibold">Manu Narayan</strong> and our master collective in Kottayam, Kerala.
              </p>
            </div>

            {/* Quick CTA cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={handleEnrollWhatsApp}
                className="px-7 py-4 text-xs font-bold tracking-widest bg-gold-accent hover:bg-gold-accent/90 text-black uppercase rounded-xl transition-all duration-300 shadow-[0_4px_25px_rgba(221,177,30,0.3)] hover:shadow-[0_6px_30px_rgba(221,177,30,0.45)] flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <MessageCircle size={16} className="text-black group-hover:scale-110 transition-transform" />
                <span>Enquire On WhatsApp</span>
                <ArrowUpRight size={14} className="text-black/80" />
              </button>

              <a
                href="tel:+919746695575"
                className="px-6 py-4 text-xs font-bold tracking-widest text-zinc-300 hover:text-white border border-zinc-700 hover:border-gold-accent/60 bg-zinc-900/60 rounded-xl uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone size={14} className="text-gold-accent" />
                <span>Call Studio</span>
              </a>
            </div>
          </div>

          {/* Two-Column Showcase: Left Curriculum & Perks, Right Real Studio Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: 4 Curriculum Pillars Grid */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <h3 className="font-display text-xs font-bold tracking-[0.25em] text-zinc-400 uppercase">
                CORE CURRICULUM MODULES
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {curriculum.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-gold-accent/30 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold text-gold-accent tracking-widest">
                          {item.number}
                        </span>
                        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-gold-accent group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                      </div>

                      <h4 className="font-display text-sm md:text-base font-bold text-white uppercase tracking-tight mb-2 group-hover:text-gold-accent transition-colors">
                        {item.title}
                      </h4>

                      <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Course Benefits Checklist */}
              <div className="mt-2 pt-6 border-t border-zinc-800/60">
                <h4 className="font-display text-[10px] font-bold tracking-[0.25em] text-zinc-400 uppercase mb-4">
                  PROGRAM PERKS & CERTIFICATION
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-300 font-medium">
                      <CheckCircle2 size={14} className="text-gold-accent shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Master Craftsmanship Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] w-full max-h-[520px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group bg-zinc-950">
                <Image
                  src="/assets/about_craftsmanship.webp"
                  alt="Tattoo Craftsmanship Instruction at Blackhole Tattoo Academy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                {/* Floating Admission Badge */}
                <div className="absolute top-5 left-5 right-5 glass p-4 rounded-xl border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] font-mono text-gold-accent font-bold uppercase tracking-widest">
                        Admissions Status
                      </span>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Limited Seats Per Batch
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest border border-green-500/30">
                      Open
                    </span>
                  </div>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-zinc-800">
                  <p className="text-xs font-serif italic text-zinc-200">
                    &ldquo;We don&apos;t just teach how to operate a machine. We teach how to respect the skin, master the sterile ritual, and create immortal art.&rdquo;
                  </p>
                  <span className="block mt-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gold-accent">
                    — Manu Narayan, Founder & Master Artist
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
