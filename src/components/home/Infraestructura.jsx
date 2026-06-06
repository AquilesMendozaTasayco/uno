"use client";

import { motion } from "framer-motion";

const equipos = [
  { nombre: "Equipo de corte láser", colspan: "md:col-span-1" },
  { nombre: "Equipo de corte router", colspan: "md:col-span-1" },
  { nombre: "Impresora de gran formato", colspan: "md:col-span-1" },
  { nombre: "Impresora de alta resolución en vinil", colspan: "md:col-span-1" },
  { nombre: "Equipos de acabados — Termosellado — Ojalillos", colspan: "md:col-span-2" },
];

export default function Infraestructura() {
  return (
    <section id="infraestructura" className="bg-uno-red py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-14"
        >
          <span className="font-[family-name:var(--font-montserrat)] text-white/60 text-sm font-light tracking-[0.2em] uppercase">
            Nuestra
          </span>
          <h2 className="font-[family-name:var(--font-bebas)] text-white text-4xl md:text-5xl lg:text-6xl tracking-wide leading-none mt-1">
            Infraestructura
          </h2>
          <div className="w-16 h-1 bg-white/30 mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {equipos.map((eq, i) => (
            <motion.div
              key={eq.nombre}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className={`bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 ${eq.colspan} ${
                i === equipos.length - 1 ? "lg:col-span-3" : ""
              }`}
            >
              <div className="h-32 md:h-40 bg-white/5 flex items-center justify-center">
                <span className="text-white/30 text-xs font-bold uppercase tracking-wider">
                  {eq.nombre}
                </span>
              </div>
              <div className="p-4">
                <p className="text-white text-sm font-bold tracking-wide">
                  {eq.nombre}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
