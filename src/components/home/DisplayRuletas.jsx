"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const items = [
  "Roll screen",
  "Parantes de fierro",
  "Ruletas para activaciones",
  "Módulos comerciales",
  "Paneles en gran altura",
  "Vallas publicitarias",
];

export default function DisplayRuletas() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          <div className="lg:col-span-3">
            <div className="bg-uno-red rounded-2xl p-6 sticky top-24">
              <div className="space-y-1">
                {[
                  "Banners publicitarios",
                  "Vinil adhesivo",
                  "Letras 3D",
                  "Letreros luminosos",
                  "Vinil vehicular, ventanas y mamparas",
                  "Ruletas publicitarias",
                  "Display corporativo",
                  "Paneles y vallas publicitarias",
                ].map((s) => (
                  <div
                    key={s}
                    className="text-white/70 text-xs font-bold uppercase tracking-wider py-1.5 border-b border-white/10 last:border-0"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-[family-name:var(--font-bebas)] text-3xl md:text-4xl text-uno-red tracking-wide">
                Display, ruletas
              </h3>
              <h4 className="font-[family-name:var(--font-bebas)] text-2xl md:text-3xl text-uno-black tracking-wide mb-6">
                paneles publicitarios
              </h4>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { src: "/ruletas1.jpg", span: true },
                { src: "/ruletas2.jpg", span: true },
                { src: "/ruletas3.jpg", span: false },
                { src: "/ruletas4.jpg", span: false },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 ${
                    item.span ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <div className={`bg-gray-100 flex items-center justify-center ${item.span ? "h-36 md:h-48" : "h-24 md:h-32"}`}>
                    {item.src ? (
                      <img src={item.src} alt={`Proyecto ${i + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                        Proyecto {i + 1}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
            >
              <p className="text-uno-black font-bold text-lg md:text-xl italic mb-4">
                Confección de módulos y display para publicidad interior y exterior.
              </p>

              <ul className="space-y-2.5 mb-6">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <Check size={16} className="text-uno-red shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="bg-uno-red/5 rounded-xl p-4 border-l-4 border-uno-red">
                <p className="text-uno-red font-bold text-sm italic">
                  Display de fábrica con finos acabados, paneles y tótems de gran seguridad.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
