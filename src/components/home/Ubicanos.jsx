"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import Lightbox from "@/components/Lightbox";

export default function Ubicanos() {
  const [lightboxImg, setLightboxImg] = useState(null);
  return (
    <section id="ubicanos" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* LEFT — Photos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <button onClick={() => setLightboxImg("/local.png")} className="bg-gray-200 rounded-2xl overflow-hidden shadow-md h-64 md:h-80 w-full">
              <img src="/local.png" alt="Foto del local" className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300" />
            </button>
            <button onClick={() => setLightboxImg("/local-frente.png")} className="bg-gray-200 rounded-2xl overflow-hidden shadow-md h-52 md:h-64 w-full">
              <img src="/local-frente.png" alt="Fachada frente" className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300" />
            </button>
          </motion.div>

          {/* RIGHT — Map + Address */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl lg:text-6xl text-uno-black tracking-wide leading-none">
                Ubícanos
              </h2>
              <div className="flex items-center gap-2 mt-3">
                <MapPin size={18} className="text-uno-red shrink-0" />
                <span className="text-gray-600 text-sm md:text-base font-bold">
                  Av. España 1325 - Trujillo
                </span>
              </div>
            </div>

            <button onClick={() => setLightboxImg("/mapa.png")} className="flex-1 bg-gray-200 rounded-2xl overflow-hidden shadow-md min-h-[300px] md:min-h-[400px] w-full">
              <img src="/mapa.png" alt="Mapa de ubicación" className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {lightboxImg && <Lightbox src={lightboxImg} onClose={() => setLightboxImg(null)} />}
      </AnimatePresence>
    </section>
  );
}
