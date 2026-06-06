"use client";

import { motion } from "framer-motion";
import { Handshake, MessageCircle, CheckCircle, ShieldCheck, Award } from "lucide-react";

const razones = [
  {
    icon: Handshake,
    text: "Personal técnico capacitado garantiza trabajos de calidad sin errores.",
  },
  {
    icon: MessageCircle,
    text: "Atención personalizada y asesoría inmediata.",
  },
  {
    icon: CheckCircle,
    text: "Garantía en la impresión y durabilidad de materiales y tintas.",
  },
  {
    icon: ShieldCheck,
    text: "Instalación con todos los protocolos de seguridad.",
  },
  {
    icon: Award,
    text: "Respaldo de múltiples empresas que confían en la calidad del servicio.",
  },
];

export default function PorQueElegirnos() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src="/banner1.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-uno-red/95 via-uno-red/90 to-uno-red-dark/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* LEFT — Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl md:text-6xl lg:text-7xl leading-none tracking-wide">
              ¿Por qué
            </h2>
            <h2 className="font-[family-name:var(--font-montserrat)] text-4xl md:text-5xl lg:text-6xl font-light leading-none mt-2">
              elegirnos?
            </h2>
            <div className="w-20 h-1 bg-white/50 mt-6" />
          </motion.div>

          {/* RIGHT — Reasons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            {razones.map((r, i) => (
              <motion.div
                key={r.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/10"
              >
                <div className="bg-white/20 rounded-full p-2.5 shrink-0">
                  <r.icon size={20} className="text-white" />
                </div>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  {r.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
