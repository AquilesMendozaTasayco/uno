"use client";

import { motion } from "framer-motion";
import { Shield, Users, Target } from "lucide-react";

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* LEFT — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-[family-name:var(--font-bebas)] text-uno-red text-lg tracking-[0.2em] uppercase">
              Conócenos
            </span>
            <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl lg:text-6xl text-uno-black leading-none mt-1 tracking-wide">
              Quiénes <br />
              <span className="text-uno-red">Somos</span>
            </h2>

            <div className="w-16 h-1 bg-uno-red mt-4 mb-6" />

            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
              <p>
                Somos una empresa trujillana, especialistas en brindar soluciones
                gráficas, contando con la tecnología que exige el mercado, equipos
                de gran formato, de alta calidad, personal profesional y técnico,
                capaz de cumplir con éxito la demanda en distintos formatos que su
                proyecto publicitario necesite.
              </p>
              <p>
                Contamos con más de{" "}
                <strong className="text-uno-black">10 años de experiencia</strong>{" "}
                en el sector publicitario adaptándonos a las necesidades de nuestros
                clientes ya sean pequeñas, medianas o grandes empresas.
              </p>
              <p>
                Nuestro objetivo es ser un aliado estratégico comprometido para
                alcanzar sus metas empresariales.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: Shield, label: "Calidad garantizada" },
                { icon: Users, label: "Equipo profesional" },
                { icon: Target, label: "Aliado estratégico" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl p-4 text-center"
                >
                  <div className="bg-uno-red/10 rounded-full p-2.5">
                    <Icon size={20} className="text-uno-red" />
                  </div>
                  <span className="text-xs font-bold text-uno-black uppercase tracking-wider">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-xl max-w-sm mx-auto">
              <img
                src="/quienes-somos.png"
                alt="UNO Publicidad - Quiénes Somos"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>

            <div className="absolute -bottom-4 -right-4 bg-uno-red text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg tracking-wider">
              +10 años de experiencia
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
