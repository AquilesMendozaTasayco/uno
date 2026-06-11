"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Quiénes Somos", href: "#quienes-somos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Galería", href: "#galeria" },
  { label: "Infraestructura", href: "#infraestructura" },
  { label: "Ubícanos", href: "#ubicanos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#inicio" className="flex items-center gap-2">
          <img
            src="/logo_uno.png"
            alt="UNO Publicidad"
            className={`h-10 md:h-12 w-auto ${
              scrolled ? "filter-logo-red" : ""
            }`}
          />
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-lg group ${
                scrolled
                  ? "text-uno-black hover:text-uno-red"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <span className="relative z-10">{l.label}</span>
              <span
                className={`absolute inset-0 rounded-lg transition-all duration-300 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 ${
                  scrolled ? "bg-uno-red/5" : "bg-white/10"
                }`}
              />
              <span
                className={`absolute bottom-1 left-3 right-3 h-0.5 rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100 ${
                  scrolled ? "bg-uno-red" : "bg-white"
                }`}
              />
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 ${
            open
              ? "text-uno-red bg-uno-red/5"
              : scrolled
                ? "text-uno-black hover:bg-gray-100"
                : "text-white hover:bg-white/10"
          }`}
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xl">
          <div className="flex flex-col px-4 py-4 gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="relative text-uno-black text-sm font-bold uppercase tracking-[0.1em] px-4 py-3 rounded-xl hover:text-uno-red hover:bg-uno-red/5 transition-all duration-200 active:scale-[0.98]"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
