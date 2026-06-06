"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";

export default function Contacto() {
  return (
    <section id="contacto" className="relative bg-uno-red py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-uno-red/80 to-uno-red-dark/80" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-white/50 text-sm font-bold tracking-[0.3em] uppercase mb-2">
            #somosuno
          </p>
          <h2 className="font-[family-name:var(--font-bebas)] text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-wide leading-none">
            ¡QUE TODOS
          </h2>
          <h2 className="font-[family-name:var(--font-bebas)] text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-wide leading-none mt-1">
            TE VEAN!
          </h2>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="my-8 md:my-10"
        >
          <div className="font-[family-name:var(--font-bebas)] text-white text-6xl md:text-7xl tracking-wide">
            UNO
          </div>
          <div className="font-[family-name:var(--font-montserrat)] text-white font-light text-sm md:text-base tracking-[0.3em] uppercase">
            PUBLICIDAD
          </div>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-8"
        >
          <a
            href="https://wa.me/51929786645"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3 text-white hover:bg-white/20 transition-all text-sm"
          >
            <Phone size={16} />
            <span className="font-bold">929 786 645</span>
          </a>
          <a
            href="mailto:jparedes@unopubli.com"
            className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3 text-white hover:bg-white/20 transition-all text-sm"
          >
            <Mail size={16} />
            <span>jparedes@unopubli.com</span>
          </a>
          <span className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3 text-white text-sm">
            <MapPin size={16} />
            <span>Av. España 1325 - Trujillo</span>
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="https://wa.me/51929786645"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-uno-red font-bold text-sm tracking-[0.1em] px-8 py-3.5 rounded-full hover:bg-white/90 transition-all uppercase"
          >
            Cotiza Ahora
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
