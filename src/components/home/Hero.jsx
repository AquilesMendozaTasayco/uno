"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const snap = await getDocs(collection(db, "unopubli", "content", "slides"));
        const data = snap.docs.map(d => d.data()).filter(d => d.active !== false).sort((a, b) => a.order - b.order);
        if (data.length) setSlides(data);
      } catch {}
      setLoading(false);
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (paused || !slides.length) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused, slides.length]);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  if (loading) {
    return (
      <section className="relative min-h-screen bg-gray-100 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="w-full max-w-lg">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden border-4 border-white/30">
              <div className="p-6 md:p-10 space-y-4">
                <div className="h-12 md:h-16 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-12 md:h-16 bg-gray-200 rounded-lg animate-pulse w-3/4" />
                <div className="flex gap-2 mt-4">
                  {[1,2,3,4].map(i => <div key={i} className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />)}
                </div>
              </div>
              <div className="bg-gray-200 py-3 px-6 md:px-10 h-10 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!slides.length) return null;

  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden flex items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.imageUrl}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.imageUrl}
            alt={`Slide ${i + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-0">
        <div className="flex items-start justify-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-lg"
          >
            <div className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border-4 border-white/30">
              <div className="p-6 md:p-10">
                <div className="mb-4">
                  <h1 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-uno-red leading-none tracking-wide">
                    ¡QUE TODOS
                  </h1>
                  <h1 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-uno-black leading-none tracking-wide">
                    TE VEAN!
                  </h1>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 md:mt-6">
                  {[
                    "GIGANTOGRAFÍAS",
                    "LETREROS",
                    "LETRAS 3D",
                    "VINILES",
                    "ROLL SCREEN",
                    "BANNERS",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="bg-uno-red/10 text-uno-red text-[10px] md:text-xs font-bold px-3 py-1 rounded-full tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  <a
                    href="#quienes-somos"
                    className="bg-uno-red text-white font-bold text-xs tracking-[0.1em] px-6 py-2.5 rounded-full hover:bg-uno-red-dark transition-all uppercase"
                  >
                    Conócenos
                  </a>
                  <a
                    href="https://wa.me/51929786645"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-uno-red text-uno-red font-bold text-xs tracking-[0.1em] px-6 py-2.5 rounded-full hover:bg-uno-red hover:text-white transition-all uppercase"
                  >
                    Cotiza Ahora
                  </a>
                </div>
              </div>

              <div className="bg-uno-red py-3 px-6 md:px-10 flex items-center justify-between">
                <span className="text-white/80 text-xs font-bold tracking-widest">
                  PUBLICIDAD EXTERIOR
                </span>
                <div className="flex gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === current ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white/60 text-[10px] font-bold tracking-[0.2em]">
                  #somosuno
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center hover:bg-white/40 transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center hover:bg-white/40 transition-all"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-0 left-0 z-20 h-1 w-full bg-white/10">
        <motion.div
          key={current}
          className="h-full bg-white/60"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
        />
      </div>

      <motion.a
        href="#quienes-somos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/60"
      >
        <ArrowDown size={24} />
      </motion.a>

      <div className="absolute top-6 right-6 z-10 text-white/30 text-xs font-bold tracking-widest hidden md:block">
        www.unopubli.com
      </div>
    </section>
  );
}
