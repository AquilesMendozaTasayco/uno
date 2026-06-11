"use client";

import { useEffect, useState } from "react";
import { MapPin, Mail, Phone, Globe } from "lucide-react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const defaultConfig = {
  phone: "929 786 645",
  email: "jparedes@unopubli.com",
  whatsapp: "51929786645",
  address: "Av. España 1325 - Trujillo",
};

export default function Footer() {
  const [config, setConfig] = useState(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const snap = await getDoc(doc(db, "unopubli", "config"));
        if (snap.exists()) setConfig({ ...defaultConfig, ...snap.data() });
      } catch {}
      setLoading(false);
    };
    fetchConfig();
  }, []);

  return (
    <footer className="bg-uno-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div>
            <div className="mb-4">
              <img src="/logo_uno.png" alt="UNO Publicidad" className="h-12 w-auto" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Especialistas en soluciones gráficas con más de 10 años de experiencia en Trujillo, Perú.
            </p>
            <p className="text-gray-500 text-xs mt-3 italic">
              &ldquo;¡Que todos te vean!&rdquo;
            </p>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-wide mb-4">
              Enlaces
            </h3>
            <div className="flex flex-col gap-2">
              {[
                ["Inicio", "#inicio"],
                ["Quiénes Somos", "#quienes-somos"],
                ["Servicios", "#servicios"],
                ["Galería", "#galeria"],
                ["Contacto", "#contacto"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-wide mb-4">
              Contacto
            </h3>
            <div className="flex flex-col gap-3">
              {loading ? (
                <>
                  <div className="h-5 w-44 bg-white/5 rounded animate-pulse" />
                  <div className="h-5 w-52 bg-white/5 rounded animate-pulse" />
                  <div className="h-5 w-36 bg-white/5 rounded animate-pulse" />
                  <div className="h-5 w-48 bg-white/5 rounded animate-pulse" />
                </>
              ) : (
                <>
                  <a
                    href={`https://wa.me/${config.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    <Phone size={16} className="text-uno-red shrink-0" />
                    {config.phone}
                  </a>
                  <a
                    href={`mailto:${config.email}`}
                    className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    <Mail size={16} className="text-uno-red shrink-0" />
                    {config.email}
                  </a>
                  <a
                    href="https://www.unopubli.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    <Globe size={16} className="text-uno-red shrink-0" />
                    www.unopubli.com
                  </a>
                  <span className="flex items-center gap-3 text-gray-400 text-sm">
                    <MapPin size={16} className="text-uno-red shrink-0" />
                    {config.address}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} UNO Publicidad. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-xs">
            &ldquo;¡QUE TODOS TE VEAN!&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
