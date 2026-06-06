"use client";

import { motion } from "framer-motion";
import {
  Image,
  Sticker,
  Lightbulb,
  Cuboid as Cube,
  Truck,
  CircleDot,
  Monitor,
  LayoutPanelLeft,
} from "lucide-react";

const servicios = [
  { icon: Image, label: "Banners publicitarios" },
  { icon: Sticker, label: "Vinil adhesivo" },
  { icon: Lightbulb, label: "Letreros luminosos" },
  { icon: Cube, label: "Letras 3D" },
  { icon: Truck, label: "Vinil vehicular" },
  { icon: CircleDot, label: "Ruletas publicitarias" },
  { icon: Monitor, label: "Display corporativo" },
  { icon: LayoutPanelLeft, label: "Paneles y vallas publicitarias" },
];

export default function Servicios() {
  return (
    <section id="servicios" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="font-[family-name:var(--font-bebas)] text-uno-red text-lg tracking-[0.2em] uppercase">
            Nuestros
          </span>
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl lg:text-6xl text-uno-black leading-none mt-1 tracking-wide">
            Servicios
          </h2>
          <div className="w-16 h-1 bg-uno-red mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {servicios.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="group relative bg-white border border-gray-100 rounded-xl p-6 md:p-8 text-center hover:shadow-xl hover:border-uno-red/20 transition-all duration-300"
            >
              <div className="bg-uno-red/5 group-hover:bg-uno-red/10 rounded-full p-3 md:p-4 inline-flex mb-4 transition-colors">
                <s.icon size={28} className="text-uno-red md:w-8 md:h-8" />
              </div>
              <span className="block text-sm md:text-base font-bold text-uno-black group-hover:text-uno-red transition-colors">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
