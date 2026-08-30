"use client";

import React, { useState } from "react";
import { 
  HelpCircle, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Activity, 
  Droplets, 
  Sparkles,
  ChevronDown,
  Info
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function AftercarePage() {
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const timelineSteps = [
    {
      title: "The Weeping Stage",
      days: "Days 1 - 3",
      stageTag: "Initial Phase",
      statusLabel: "ACTIVE HEALING",
      stageColor: "from-red-500/10 to-transparent border-red-500/20 text-red-400",
      glowColor: "shadow-[0_0_50px_rgba(239,68,68,0.06)]",
      hoverBorder: "hover:border-red-500/30",
      activeBorder: "border-red-500/40 bg-zinc-900/80 shadow-[0_8px_30px_rgba(239,68,68,0.08)]",
      progress: 15,
      tagline: "Securing the initial seal and cleaning raw skin tissue",
      icon: <Droplets className="w-5 h-5 text-red-400" />,
      criticalWarning: "Keep the initial medical wrap (second-skin) dry and sealed. If fluid leaks outside the plastic edge, remove it immediately to avoid trapping bacteria.",
      instructions: [
        "Leave your medical wrap (second-skin) on for 24-48 hours unless directed otherwise or if fluid leaks out.",
        "When removing, wash hands thoroughly first. Gently peel the film off under lukewarm running water to release the adhesive.",
        "Clean the tattoo using only a fragrance-free, antibacterial liquid soap. Use only clean fingers, never washcloths or sponges.",
        "Pat completely dry with a fresh, clean paper towel. Do not rub.",
        "Apply an ultra-thin layer of specialized tattoo balm (like Aquaphor or Hustle Butter). The tattoo should not look shiny or wet."
      ]
    },
    {
      title: "The Peeling Stage",
      days: "Days 4 - 14",
      stageTag: "Regeneration Phase",
      statusLabel: "PEEL & MOISTURIZE",
      stageColor: "from-gold-accent/10 to-transparent border-gold-accent/20 text-gold-accent",
      glowColor: "shadow-[0_0_50px_rgba(234,179,8,0.06)]",
      hoverBorder: "hover:border-gold-accent/30",
      activeBorder: "border-gold-accent/40 bg-zinc-900/80 shadow-[0_8px_30px_rgba(234,179,8,0.08)]",
      progress: 60,
      tagline: "Resisting intense itching while dead skin cells shed",
      icon: <Activity className="w-5 h-5 text-gold-accent" />,
      criticalWarning: "NEVER scratch, peel, or pull off flaking skin. Forcefully peeling skin pulls the ink directly out of the deeper dermis, causing patchiness.",
      instructions: [
        "Your tattoo will begin to flake, peel, and resemble a sunburn. This is completely normal and means it is healing.",
        "DO NOT pick, scratch, or peel the flaking skin. Let it shed naturally. Picking will pull ink out, leaving patchy spots.",
        "If it itches intensely, slap the area gently or apply an unscented water-based lotion. Do not scratch with fingernails.",
        "Wash the tattoo 1-2 times daily, and apply a thin layer of unscented, alcohol-free moisturizing lotion (like Cetaphil or Lubriderm)."
      ]
    },
    {
      title: "Cellular Shield Stage",
      days: "Days 15 - 30",
      stageTag: "Lock & Protect",
      statusLabel: "SUN PROTECTION",
      stageColor: "from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400",
      glowColor: "shadow-[0_0_50px_rgba(16,185,129,0.06)]",
      hoverBorder: "hover:border-emerald-500/30",
      activeBorder: "border-emerald-500/40 bg-zinc-900/80 shadow-[0_8px_30px_rgba(16,185,129,0.08)]",
      progress: 100,
      tagline: "Locking in deep color pigments and defending against UV rays",
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      criticalWarning: "UV rays will break down tattoo pigment particles over time. Protect your investment by applying SPF 50+ broad-spectrum sunscreen daily.",
      instructions: [
        "The superficial layers are healed, but the deeper dermis is still rebuilding. The tattoo might look slightly dull or shiny.",
        "Continue moisturizing daily to prevent dry skin and ensure maximum clarity of the pigments.",
        "Now that the skin is closed, you MUST protect it from UV rays. Apply a broad-spectrum mineral sunscreen (SPF 50+) whenever outdoors.",
        "Avoid tanning beds and direct prolonged sun exposure forever to prevent the details from fading over time."
      ]
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: "Is it normal for my tattoo to leak colored fluid or look swollen?",
      answer: "Yes, during the first 24-48 hours, it is normal to experience 'weeping.' This is a mixture of excess ink, plasma, and white blood cells escaping. Swelling and slight redness are also normal inflammatory responses."
    },
    {
      question: "Can I go swimming, take a bath, or work out?",
      answer: "No. Absolutely avoid swimming pools, hot tubs, oceans, and bathtubs for at least 3 weeks. Submerging your healing tattoo in water introduces bacteria and can cause severe infections or fade the ink. Showers are fine. Limit strenuous workouts that cause excessive sweating for the first week."
    },
    {
      question: "What should I do if I suspect my tattoo is infected?",
      answer: "Signs of infection include red streaks, extreme warmth radiating from the tattoo, pus drainage, fever, or increasing pain after day 3. If you experience these symptoms, contact a healthcare professional immediately and inform the studio."
    },
    {
      question: "How long does it take for a body piercing to heal?",
      answer: "Piercings heal from the outside in. Lobes take 6-8 weeks; cartilage (helix, nose, conch) takes 6-12 months. Keep cartilage dry, do not touch or twist the jewelry, and clean it 2x daily using only sterile saline spray."
    }
  ];



  return (
    <div className="w-full min-h-screen bg-matte-black text-zinc-100 flex flex-col pt-32 pb-20 relative print:bg-white print:text-black print:pt-4 print:pb-4">
      {/* Premium Decorative Glow Elements wrapped to avoid breaking sticky layout */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 print:hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-950/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-accent/5 rounded-full blur-[160px]" />
      </div>

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-16 text-center print:text-left print:mb-8">
        <div className="flex items-center justify-center gap-3 mb-5 print:hidden">
          <span className="text-xs font-bold tracking-[0.4em] text-gold-accent uppercase bg-gold-accent/15 border border-gold-accent/20 px-3.5 py-1.5 rounded-full">
            Essential Care Protocol
          </span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-6 print:text-3xl print:mb-2 print:text-black">
          AFTERCARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-gold-accent to-yellow-500 print:text-black">CHRONICLES</span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-zinc-400 leading-relaxed font-sans print:text-zinc-700 print:text-xs">
          A fresh tattoo is an open wound. The quality and longevity of your artwork depend 50% on the artist, and 50% on your healing routine. Follow this professional recovery timeline to lock in colors.
        </p>
      </div>

      {/* Dynamic Healing Dashboard */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 print:block print:mb-8">
        
        {/* Left Panel: Phase Selector Cards (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start print:hidden">
          <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase px-2 mb-1 flex items-center gap-2">
            <Clock size={12} /> Healing Timeline
          </div>
          {timelineSteps.map((step, idx) => {
            const isActive = activeTimelineStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTimelineStep(idx)}
                className={`w-full text-left rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                  isActive 
                    ? `${step.activeBorder}` 
                    : `bg-zinc-950/20 border-white/5 hover:bg-zinc-950/40 ${step.hoverBorder}`
                }`}
              >
                {/* Active side indicator pill */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-red-500 to-gold-accent" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold tracking-widest text-gold-accent uppercase">
                    Phase 0{idx + 1}
                  </span>
                  <span className={`text-[9px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full border bg-gradient-to-r ${step.stageColor}`}>
                    {step.statusLabel}
                  </span>
                </div>

                <h3 className="font-display text-lg font-black uppercase text-zinc-100 group-hover:text-gold-accent transition-colors duration-300 mb-1">
                  {step.title}
                </h3>
                <p className="text-[11px] text-zinc-400 mb-4 line-clamp-1">
                  {step.tagline}
                </p>

                {/* Progress bar */}
                <div className="w-full flex items-center justify-between gap-3 mt-auto">
                  <span className="text-[10px] font-mono text-zinc-500">{step.days}</span>
                  <div className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-gold-accent rounded-full transition-all duration-1000"
                      style={{ width: `${step.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-300 font-bold">{step.progress}%</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Panel: Detailed Timeline Status Panel (8 Columns) */}
        <div className="lg:col-span-8 print:block">
          <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase px-2 mb-2 hidden lg:flex items-center gap-2 print:hidden">
            <Info size={12} /> Detailed Directives
          </div>
          
          <div className={`glass-premium rounded-3xl p-6 md:p-10 border border-white/5 transition-all duration-700 relative overflow-hidden ${timelineSteps[activeTimelineStep].glowColor} print:border-black print:p-2 print:shadow-none`}>
            
            {/* Background Risk Indicator Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-xl pointer-events-none" />

            {/* Header info inside detail panel */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-8 print:border-black print:pb-2">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/5 text-zinc-100 print:border-black print:p-1">
                  {timelineSteps[activeTimelineStep].icon}
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-gold-accent uppercase">
                    {timelineSteps[activeTimelineStep].stageTag}
                  </div>
                  <h2 className="font-display text-2xl font-black uppercase text-white print:text-black print:text-lg">
                    {timelineSteps[activeTimelineStep].title}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono bg-zinc-950/60 border border-white/5 px-3 py-1.5 rounded-lg text-zinc-300 print:text-black print:border-black print:p-0.5">
                  Duration: <strong className="text-white print:text-black">{timelineSteps[activeTimelineStep].days}</strong>
                </span>
              </div>
            </div>

            {/* Sub-text summary */}
            <p className="text-xs md:text-sm text-zinc-400 mb-8 leading-relaxed italic print:text-zinc-600 print:text-[11px] print:mb-4">
              &ldquo;{timelineSteps[activeTimelineStep].tagline}&rdquo;
            </p>

            {/* Step list rendering */}
            <div className="space-y-4 mb-8 print:mb-4">
              {timelineSteps[activeTimelineStep].instructions.map((inst, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-zinc-950/15 hover:bg-zinc-950/35 hover:border-gold-accent/20 hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300 print:border-transparent print:p-0 print:gap-2 print:mb-2"
                >
                  <span className="w-6 h-6 rounded-full bg-zinc-900 border border-white/10 text-gold-accent flex items-center justify-center text-[11px] font-mono shrink-0 mt-0.5 print:border-black print:text-black print:w-5 print:h-5">
                    {idx + 1}
                  </span>
                  <p className="text-zinc-300 text-xs md:text-sm leading-relaxed font-sans print:text-zinc-800 print:text-xs">
                    {inst}
                  </p>
                </div>
              ))}
            </div>

            {/* Advisory Disclaimer Box */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/20 p-5 flex items-start gap-4 shadow-md print:border-black print:p-2">
              <Info className="text-gold-accent w-5 h-5 shrink-0 mt-0.5 print:text-black" />
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold-accent mb-1.5 print:text-black">
                  ADVISORY DISCLAIMER
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed print:text-zinc-700 font-sans">
                  These healing instructions are general guidelines. Optimal aftercare protocols can vary depending on your local climate, environment, individual skin types, and the specific placement of your tattoo. Always consult your artist for personalized care.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Modern High-Contrast Bento Do's & Don'ts */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 print:grid-cols-1 print:gap-4 print:mb-8">
        
        {/* DOs list */}
        <div className="glass-premium rounded-3xl p-6 md:p-8 border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:border-emerald-500/20 hover:shadow-[0_0_50px_rgba(16,185,129,0.03)] hover:scale-[1.01] hover:-translate-y-1 transition-all duration-500 print:border-black print:p-4">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6 print:border-black">
            <div className="p-2 rounded-xl bg-emerald-950/30 text-emerald-500 print:bg-transparent print:p-0">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-display text-2xl font-black uppercase text-zinc-100 print:text-black">
              The Do&apos;s
            </h3>
          </div>
          
          <ul className="space-y-4">
            <li className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed print:text-zinc-800">
                <strong className="text-zinc-100 print:text-black font-semibold block mb-0.5">Wash Hands:</strong> Always sanitize your hands thoroughly with antibacterial soap before cleanups.
              </p>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed print:text-zinc-800">
                <strong className="text-zinc-100 print:text-black font-semibold block mb-0.5">Loose Clothing:</strong> Wear loose, breathable cotton clothes over your healing tattoo to avoid friction.
              </p>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed print:text-zinc-800">
                <strong className="text-zinc-100 print:text-black font-semibold block mb-0.5">Stay Hydrated:</strong> Drink plenty of water and eat well to help your skin cells recover faster.
              </p>
            </li>
          </ul>
        </div>

        {/* DONTs list */}
        <div className="glass-premium rounded-3xl p-6 md:p-8 border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:border-red-500/20 hover:shadow-[0_0_50px_rgba(239,68,68,0.03)] hover:scale-[1.01] hover:-translate-y-1 transition-all duration-500 print:border-black print:p-4">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6 print:border-black">
            <div className="p-2 rounded-xl bg-red-950/30 text-red-500 print:bg-transparent print:p-0">
              <ShieldAlert size={24} />
            </div>
            <h3 className="font-display text-2xl font-black uppercase text-zinc-100 print:text-black">
              The Don&apos;ts
            </h3>
          </div>
          
          <ul className="space-y-4">
            <li className="flex gap-3">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed print:text-zinc-800">
                <strong className="text-zinc-100 print:text-black font-semibold block mb-0.5">Do Not Pick:</strong> Never scratch, pick, or rub at peeling skin or dry scabs. It voids the color.
              </p>
            </li>
            <li className="flex gap-3">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed print:text-zinc-800">
                <strong className="text-zinc-100 print:text-black font-semibold block mb-0.5">No Soaking:</strong> Avoid baths, swimming pools, oceans, beaches, and hot tubs for at least 3 weeks.
              </p>
            </li>
            <li className="flex gap-3">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-1" />
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed print:text-zinc-800">
                <strong className="text-zinc-100 print:text-black font-semibold block mb-0.5">No Direct Sun:</strong> Avoid sunlight exposure without SPF 50 sunscreen until fully healed.
              </p>
            </li>
          </ul>
        </div>

      </div>

      {/* Grid-Based Visual FAQ (Hidden in Print) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full print:hidden">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="text-gold-accent w-6 h-6" />
          <h2 className="font-display text-3xl font-black uppercase text-zinc-100">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`glass border rounded-2xl overflow-hidden transition-all duration-500 flex flex-col ${
                  isOpen ? "bg-zinc-900/40 border-zinc-700 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" : "bg-zinc-950/10 border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center text-zinc-100 hover:text-gold-accent transition-colors font-sans text-sm md:text-base font-semibold tracking-wide cursor-pointer"
                >
                  <span className="leading-tight">{faq.question}</span>
                  <ChevronDown 
                    size={16} 
                    className={`ml-4 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180 text-gold-accent" : "text-zinc-500"}`} 
                  />
                </button>
                
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[200px] opacity-100 border-t border-white/5" : "max-h-0 opacity-0 pointer-events-none"
                  } overflow-hidden`}
                >
                  <p className="p-6 text-xs md:text-sm leading-relaxed text-zinc-400 font-sans">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
