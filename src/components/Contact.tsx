"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Phone, MessageCircle, Instagram, MapPin, Clock, Send, CheckCircle2, Navigation, AlertCircle, ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";

type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const serviceLabel = data.service === "tattoo" 
        ? "Custom Tattooing" 
        : data.service === "piercing" 
        ? "Precision Piercing" 
        : data.service === "microblading"
        ? "Microblading Brow Styling"
        : "General Consultation / Enquiry";

      // 1. Submit to local SQLite database via API
      try {
        const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          message: `[Service Interested In: ${serviceLabel}] ${data.message}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn("API returned non-200, proceeding with direct WhatsApp transmission:", errorData);
      }
    } catch (err) {
      console.warn("Local API call failed, continuing with WhatsApp direct connect:", err);
    }

    // 2. Format and redirect to WhatsApp
    let messageText = `*BLACKHOLE TATTOO STUDIO - GENERAL ENQUIRY*\n\n`;
    messageText += `👤 *Name:* ${data.name}\n`;
    messageText += `📞 *Phone:* ${data.phone}\n`;
    messageText += `📧 *Email:* ${data.email}\n`;
    messageText += `✨ *Service Interested In:* ${serviceLabel}\n`;
    messageText += `📝 *Message:* ${data.message}\n`;
    
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919746695575&text=${encodedMessage}`;
    
    try {
      window.open(whatsappUrl, "_blank");
    } catch (popErr) {
      console.log("Popup blocked", popErr);
    }

    // 3. Success feedback
    setSubmitted(true);
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#bf0a0a", "#ffffff"],
    });

    setTimeout(() => {
      reset();
    }, 1000);

    setIsSubmitting(false);
  };

  const businessHours = [
    { days: "Monday – Saturday", hours: "11:00 AM – 07:30 PM" },
    { days: "Sunday", hours: "12:00 PM – 07:30 PM" },
  ];

  return (
    <section
      id="contact"
      className="relative w-full py-16 md:py-24 bg-soft-bone dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight">
            ESTABLISH <br />
            <span className="font-serif italic font-light text-gold-accent tracking-wide">CREATIVE LIASON</span>
          </h2>
          <p className="mt-6 font-sans text-zinc-400 font-light max-w-lg">
            Have questions about a custom design or scheduling? Drop us a line or visit our studio gallery in Kottayam.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
          
          {/* LEFT: Contact details, business profile & custom styled map (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Studio Coordinates */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <MapPin size={14} className="text-gold-accent" /> Studio Location
                </h3>
                <p className="font-sans text-sm font-light text-zinc-300 leading-relaxed">
                  <strong className="font-bold">BLACKHOLE TATTOOS & PIERCING</strong> <br />
                  Kottayam - Kumily Rd, Kalathipady, <br />
                  Kottayam, Kerala 686010
                </p>
              </div>

              {/* Business Hours */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                  <Clock size={14} className="text-gold-accent" /> Operating Hours
                </h3>
                <div className="space-y-2 text-sm font-light text-zinc-300">
                  {businessHours.map((bh, i) => (
                    <div key={i} className="flex justify-between border-b border-zinc-800/40 pb-1.5 max-w-[280px]">
                      <span className="font-semibold">{bh.days}</span>
                      <span className="text-zinc-400 font-mono text-xs">{bh.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="https://api.whatsapp.com/send?phone=919746695575"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-green-950/20 hover:bg-green-600 border border-green-800 text-white font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all duration-300"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a
                href="https://www.instagram.com/blackholetattoos"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-red-950/20 hover:bg-gold-accent/90 text-black border border-gold-accent text-white font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all duration-300"
              >
                <Instagram size={16} /> Instagram
              </a>
              <a
                href="tel:+919746695575"
                className="px-6 py-3 rounded-lg bg-blue-950/20 hover:bg-blue-600 border border-blue-800 text-white font-sans text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all duration-300"
              >
                <Phone size={16} /> +91 97466 95575
              </a>
            </div>

            {/* Custom Google Map Embed with cinematic dark theme filters */}
            <div className="relative rounded-xl overflow-hidden border border-zinc-800/80 aspect-video w-full h-[250px] shadow-2xl group">
              <iframe
                title="BLACKHOLE Tattoos Kottayam Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.0794532265004!2d76.5507241!3d9.588419799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062bedcbb769df%3A0xe23ae1013966882f!2sBlackhole%20Tattoos%20%7C%20Kottayam!5e0!3m2!1sen!2sin!4v1789759070725!5m2!1sen!2sin"
                className="w-full h-full border-none transition-all duration-700 filter invert-[90%] hue-rotate-[180deg] brightness-[85%] contrast-[95%] dark:invert-[90%] dark:hue-rotate-[180deg] dark:brightness-[85%] group-hover:filter-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Floating Directions Button */}
              <a
                href="https://maps.google.com/?cid=16301648057279318063"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-10 glass px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-zinc-200 hover:bg-gold-accent hover:text-white hover:border-gold-accent transition-all duration-300 shadow-lg"
                data-cursor-text="MAP"
              >
                <Navigation size={12} /> Directions
              </a>
            </div>

          </div>

          {/* RIGHT: High-end Contact Form (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="glass-premium bg-white/90 dark:bg-zinc-900/90 p-8 md:p-10 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
              <h3 className="font-display text-xs font-bold tracking-[0.25em] text-gold-accent uppercase pb-4 border-b border-zinc-200 dark:border-zinc-800/60 mb-6">
                FORM <span className="text-red-500">{"//"}</span> EXPRESS INQUIRY
              </h3>

              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-red-950/30 border border-gold-accent/20 flex items-center justify-center text-gold-accent mb-6 animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-display text-xl font-black uppercase text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
                    MESSAGE DELIVERED
                  </h4>
                  <p className="font-sans text-xs font-light text-zinc-650 dark:text-zinc-400 leading-relaxed mb-6">
                    Your transmission has been logged. Our booking manager will respond to you directly within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 text-[10px] font-bold tracking-widest text-zinc-700 dark:text-zinc-300 border border-zinc-250 dark:border-zinc-800 hover:border-gold-accent hover:text-white rounded-full uppercase transition-all duration-300 bg-transparent cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-name" className="text-[9px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                      Name
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      placeholder="Your Name"
                      {...register("name", { required: true })}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all"
                    />
                    {errors.name && <span className="text-[9px] text-gold-accent">Name is required</span>}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-phone" className="text-[9px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                      Phone Number
                    </label>
                    <input
                      id="c-phone"
                      type="tel"
                      placeholder="Your Phone Number"
                      {...register("phone", { required: true })}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all"
                    />
                    {errors.phone && <span className="text-[9px] text-gold-accent">Phone number is required</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-email" className="text-[9px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                      Email Address
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      placeholder="Your Email Address"
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all"
                    />
                    {errors.email && <span className="text-[9px] text-gold-accent">Please enter a valid email</span>}
                  </div>

                  {/* Service Interested In */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-service" className="text-[9px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                      Service Interested In
                    </label>
                    <div className="relative">
                      <select
                        id="c-service"
                        {...register("service", { required: true })}
                        className="w-full px-4 py-3 pr-10 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all appearance-none cursor-pointer"
                        defaultValue="tattoo"
                      >
                        <option value="tattoo">Custom Tattooing</option>
                        <option value="piercing">Precision Piercing</option>
                        <option value="microblading">Microblading Brow Styling</option>
                        <option value="general">General Consultation / Enquiry</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-650">
                        <ChevronDown size={14} />
                      </div>
                    </div>
                    {errors.service && <span className="text-[9px] text-gold-accent">Service is required</span>}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-message" className="text-[9px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                      Your Message
                    </label>
                    <textarea
                      id="c-message"
                      rows={4}
                      placeholder="Write your message here..."
                      {...register("message", { required: true })}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-gold-accent font-sans text-sm transition-all resize-none"
                    />
                    {errors.message && <span className="text-[9px] text-gold-accent">Message is required</span>}
                  </div>

                  {submitError && (
                    <div className="text-gold-accent text-xs font-semibold flex items-center gap-1.5 justify-center mt-2">
                      <AlertCircle size={12} /> {submitError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 text-[10px] font-bold tracking-[0.25em] bg-gold-accent hover:bg-gold-accent/90 text-black disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white uppercase rounded-lg transition-all duration-300 shadow-[0_4px_20px_rgba(245,158,11,0.15)] flex items-center justify-center gap-2 cursor-pointer group"
                    data-cursor-text={isSubmitting ? "WAIT" : "SEND"}
                  >
                    <span>{isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE"}</span>
                    <Send size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
