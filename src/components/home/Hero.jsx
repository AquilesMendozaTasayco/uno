"use client";

import { motion } from "framer-motion";
import { ArrowDown, Megaphone } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen bg-uno-red overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-uno-red via-uno-red to-uno-red-dark" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
          {/* LEFT — Billboard */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:flex-[0_0_55%]"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white/20">
              <div className="bg-gradient-to-br from-gray-100 to-white p-6 md:p-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-uno-red rounded-full p-2 md:p-3 shrink-0">
                    <Megaphone size={28} className="text-white md:w-9 md:h-9" />
                  </div>
                  <div>
                    <h1 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-uno-red leading-none tracking-wide">
                      ¡QUE TODOS
                    </h1>
                    <h1 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-uno-black leading-none tracking-wide">
                      TE VEAN!
                    </h1>
                  </div>
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
              </div>

              <div className="bg-uno-red py-3 px-6 md:px-10 flex items-center justify-between">
                <span className="text-white/80 text-xs font-bold tracking-widest">
                  PUBLICIDAD EXTERIOR
                </span>
                <span className="text-white/60 text-[10px] font-bold tracking-[0.2em]">
                  #somosuno
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Logo + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full md:flex-1 flex flex-col items-center md:items-start gap-6"
          >
            <div className="text-center md:text-left">
              <div className="font-[family-name:var(--font-bebas)] text-7xl sm:text-8xl md:text-9xl text-white leading-none tracking-wide">
                UNO
              </div>
              <div className="font-[family-name:var(--font-montserrat)] text-white font-light text-lg md:text-xl tracking-[0.3em] uppercase mt-1">
                PUBLICIDAD
              </div>
            </div>

            <p className="text-white/80 text-sm md:text-base max-w-xs text-center md:text-left leading-relaxed">
              Especialistas en soluciones gráficas con más de 10 años de experiencia.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a
                href="#quienes-somos"
                className="bg-white text-uno-red font-bold text-sm tracking-[0.1em] px-8 py-3 rounded-full hover:bg-white/90 transition-all text-center uppercase"
              >
                Conócenos
              </a>
              <a
                href="https://wa.me/51929786645"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white font-bold text-sm tracking-[0.1em] px-8 py-3 rounded-full hover:bg-white hover:text-uno-red transition-all text-center uppercase"
              >
                Cotiza Ahora
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#quienes-somos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60"
      >
        <ArrowDown size={24} />
      </motion.a>

      {/* URL watermarks */}
      <div className="absolute top-6 right-6 z-10 text-white/30 text-xs font-bold tracking-widest hidden md:block">
        www.unopubli.com
      </div>
    </section>
  );
}
