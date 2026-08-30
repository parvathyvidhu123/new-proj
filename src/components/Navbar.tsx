"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrolled(window.scrollY > 40);

      // Scrollspy for homepage sections
      if (pathname === "/") {
        const sections = ["home", "gallery", "services", "booking", "contact"];
        let currentActive = "";
        
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            // If the section top is near the top of the viewport
            if (rect.top <= 160 && rect.bottom >= 160) {
              currentActive = section;
              break;
            }
          }
        }
        setActiveSection(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger scrollspy once on mount in case we are already scrolled
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/#home" || href === "#home") {
      return pathname === "/" && (activeSection === "home" || activeSection === "");
    }
    if (href.startsWith("/#") || href.startsWith("#")) {
      const section = href.includes("#") ? href.split("#")[1] : href;
      return pathname === "/" && activeSection === section;
    }
    return pathname === href;
  };

  const menuItems = [
    { label: "Gallery", href: "/#gallery" },
    { label: "Services", href: "/#services" },
    { label: "Artists", href: "/artists" },
    { label: "Studio", href: "/studio" },
    { label: "Aftercare", href: "/aftercare" },
    { label: "Booking", href: "/#booking" },
    { label: "Contact", href: "/#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") || href.startsWith("#")) {
      const hash = href.includes("#") ? "#" + href.split("#")[1] : href;
      if (pathname === "/") {
        e.preventDefault();
        setMobileMenuOpen(false);
        const element = document.querySelector(hash);
        if (element) {
          const offset = 80; // height of navbar
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else {
        setMobileMenuOpen(false);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-black/60 dark:bg-black/60 border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 xl:px-12 flex items-center justify-between">
          
          {/* LEFT: Logo */}
          <Link
            href="/#home"
            scroll={false}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScrollTo(e, "/#home")}
            className="flex items-center gap-3 group"
          >
            <div 
              className="relative w-10 h-10 transition-all duration-300 group-hover:rotate-12 navbar-logo shrink-0"
              style={{
                opacity: scrollY >= 280 ? 1 : 0,
                transform: `scale(${scrollY >= 280 ? 1 : 0.7})`,
                pointerEvents: scrollY >= 280 ? "auto" : "none"
              }}
            >
              <Image
                src="/assets/logo_transparent.png"
                alt="BLACKHOLE Logo"
                fill
                sizes="40px"
                className="object-contain drop-shadow-[0_0_8px_rgba(234,179,8,0.45)]"
              />
            </div>
            <span className="font-sans text-lg font-black tracking-[0.25em] text-zinc-100 dark:text-zinc-100 group-hover:text-gold-accent transition-colors duration-300">
              BLACKHOLE
            </span>
          </Link>

          {/* CENTER: Menu Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  scroll={false}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScrollTo(e, item.href)}
                  className={`relative text-xs font-semibold tracking-widest uppercase py-2 transition-colors duration-300 group ${
                    active ? "text-gold-accent" : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {item.label}
                  {/* Animated underline */}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-gold-accent transition-transform duration-300 origin-left ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Quick Action Icons, Switch & Book Button */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">

            {/* Book Consultation */}
            <Link
              href="/#booking"
              scroll={false}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScrollTo(e, "/#booking")}
              className="relative px-6 py-2.5 text-[11px] font-bold tracking-widest text-white uppercase border border-red-800/50 rounded-full bg-red-950/20 hover:text-white transition-all duration-500 overflow-hidden group"
              data-cursor-text="Book"
            >
              <span className="relative z-10">Book Consultation</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0" />
            </Link>
          </div>

          {/* Hamburger Menu & Mobile Theme (Mobile Only) */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-100 hover:text-red-500 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-start px-12 md:px-24 py-28 overflow-y-auto no-scrollbar ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6 text-left">
          {menuItems.map((item, index) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                scroll={false}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScrollTo(e, item.href)}
                className={`font-sans text-2xl sm:text-3xl font-black tracking-wider uppercase transition-colors duration-300 ${
                  active ? "text-gold-accent" : "text-zinc-100 hover:text-gold-accent"
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: mobileMenuOpen ? 1 : 0,
                  transition: "all 0.4s ease",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div
          className="mt-12 pt-8 border-t border-zinc-800 flex flex-col gap-6"
          style={{
            transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
            opacity: mobileMenuOpen ? 1 : 0,
            transition: "all 0.4s ease 300ms",
          }}
        >


          <Link
            href="/#booking"
            scroll={false}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScrollTo(e, "/#booking")}
            className="w-full text-center py-4 text-xs font-black tracking-widest bg-red-600 text-white rounded-full uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(191,10,10,0.3)] hover:bg-red-700"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </>
  );
}
