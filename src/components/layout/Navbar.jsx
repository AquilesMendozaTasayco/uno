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
          <span
            className={`font-[family-name:var(--font-bebas)] text-2xl md:text-3xl tracking-wide ${
              scrolled ? "text-uno-red" : "text-white"
            }`}
          >
            UNO <span className="font-[family-name:var(--font-montserrat)] font-light text-sm md:text-base">PUBLICIDAD</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 hover:text-uno-red ${
                scrolled ? "text-uno-black" : "text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 ${scrolled ? "text-uno-black" : "text-white"}`}
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="flex flex-col px-4 py-4 gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-uno-black text-sm font-bold uppercase tracking-[0.1em] py-2 hover:text-uno-red transition-colors"
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
