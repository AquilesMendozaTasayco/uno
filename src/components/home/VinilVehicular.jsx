"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Lightbox from "@/components/Lightbox";

const items = [
  "Ventanas con vista exterior e interior",
  "Mamparas pavonadas",
  "Autos, combis, buses, camiones, etc",
];

export default function VinilVehicular() {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, "unopubli", "content", "galeria"), where("section", "==", "vinil-vehicular"));
        const snap = await getDocs(q);
        const data = snap.docs.map(d => d.data()).filter(d => d.active !== false).sort((a, b) => a.order - b.order);
        if (data.length) setImages(data);
      } catch {}
      setLoading(false);
    };
    fetchImages();
  }, []);

  const defaultImages = [
    { imageUrl: "/vinil1.jpg" },
    { imageUrl: "/vinil2.jpg" },
    { imageUrl: "/vinil3.jpg" },
    { imageUrl: "/vinil4.jpg" },
    { imageUrl: "/vinil5.jpg" },
  ];

  const display = images || defaultImages;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
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
                Vinil para flota
              </h3>
              <h4 className="font-[family-name:var(--font-bebas)] text-2xl md:text-3xl text-uno-black tracking-wide mb-6">
                Vehicular y ventanas
              </h4>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {loading ? (
                <>
                  <div className="col-span-2 row-span-2 bg-gray-200 rounded-xl animate-pulse h-40 md:h-56" />
                  {[1,2,3,4].map(i => <div key={i} className="bg-gray-200 rounded-xl animate-pulse h-24 md:h-32" />)}
                </>
              ) : (
                display.map((item, i) => (
                  <motion.div
                    key={item.imageUrl || i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                    className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 ${
                      i === 0 ? "col-span-2 row-span-2" : ""
                    }`}
                  >
                    <div className={`bg-gray-200 flex items-center justify-center ${i === 0 ? "h-40 md:h-56" : "h-24 md:h-32"}`}>
                      {item.imageUrl ? (
                        <button onClick={() => setLightbox(item.imageUrl)} className="w-full h-full">
                          <img src={item.imageUrl} alt={item.title || `Proyecto ${i + 1}`} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300" />
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                          Proyecto {i + 1}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
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
                Impresión de alta resolución y con laminado para una mayor protección.
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
                  Instalación profesional, de alta precisión con acabados de alta exigencia.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </section>
  );
}
