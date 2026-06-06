"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Ubicanos() {
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
            <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-md h-48 md:h-64 flex items-center justify-center">
              <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">
                Foto del local
              </span>
            </div>
            <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-md h-36 md:h-48 flex items-center justify-center">
              <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">
                Fachada frente
              </span>
            </div>
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

            <div className="flex-1 bg-gray-200 rounded-2xl overflow-hidden shadow-md min-h-[300px] md:min-h-[400px] flex items-center justify-center">
              <div className="text-center p-6">
                <MapPin size={40} className="text-uno-red/40 mx-auto mb-2" />
                <span className="text-gray-400 text-sm font-bold uppercase tracking-wider block">
                  Mapa interactivo
                </span>
                <span className="text-gray-300 text-xs mt-1 block">
                  Av. España 1325 - Trujillo
                </span>

                <div className="mt-4 bg-white rounded-xl p-4 shadow-sm inline-block">
                  <div className="text-left text-xs text-gray-500 space-y-1">
                    <p className="font-bold text-gray-700">Referencias:</p>
                    <p>📍 Colegio Modelo (Norte)</p>
                    <p>📍 Colegio Belaunde (Este)</p>
                    <p>📍 Jr. Independencia (Oeste)</p>
                    <p>📍 Plazuela el Recreo (Sur)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
