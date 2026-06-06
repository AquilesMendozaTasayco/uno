"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  LayoutDashboard, Image, FolderOpen, Phone, TrendingUp,
} from "lucide-react";

const statCards = [
  { label: "Slides Hero", icon: Image, href: "/admin/hero", color: "bg-blue-50 text-blue-600" },
  { label: "Imágenes Galería", icon: FolderOpen, href: "/admin/galeria", color: "bg-purple-50 text-purple-600" },
  { label: "Contacto y Redes", icon: Phone, href: "/admin/contacto", color: "bg-green-50 text-green-600" },
  { label: "Sitio Web", icon: TrendingUp, href: "/", color: "bg-orange-50 text-orange-600" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ slides: 0, galeria: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const slidesSnap = await getDocs(collection(db, "unopubli", "content", "slides"));
        const galeriaSnap = await getDocs(collection(db, "unopubli", "content", "galeria"));
        setCounts({ slides: slidesSnap.size, galeria: galeriaSnap.size });
      } catch {
        // Firebase may not be set up yet
      }
    };
    fetchCounts();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-bebas)] text-4xl text-gray-900 tracking-wide">
          Panel de Control
        </h1>
        <p className="text-gray-400 text-sm font-bold mt-1">
          Administra el contenido de UNO Publicidad
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.href}
              href={card.href}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color}`}>
                <Icon size={22} />
              </div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{card.label}</p>
              <p className="text-2xl font-black text-gray-900 mt-1">
                {card.href === "/admin/hero" ? counts.slides : card.href === "/admin/galeria" ? counts.galeria : "—"}
              </p>
            </a>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-gray-900 tracking-wide mb-4">
          Accesos Rápidos
        </h2>
        <div className="space-y-3">
          <a
            href="/admin/hero"
            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-uno-red/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Image size={18} className="text-uno-red" />
              <span className="text-sm font-bold text-gray-700">Cambiar imágenes del Hero</span>
            </div>
            <span className="text-xs font-bold text-uno-red opacity-0 group-hover:opacity-100 transition-opacity">Ir →</span>
          </a>
          <a
            href="/admin/galeria"
            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-uno-red/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <FolderOpen size={18} className="text-uno-red" />
              <span className="text-sm font-bold text-gray-700">Gestionar galería de imágenes</span>
            </div>
            <span className="text-xs font-bold text-uno-red opacity-0 group-hover:opacity-100 transition-opacity">Ir →</span>
          </a>
          <a
            href="/admin/contacto"
            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-uno-red/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-uno-red" />
              <span className="text-sm font-bold text-gray-700">Editar contacto y redes sociales</span>
            </div>
            <span className="text-xs font-bold text-uno-red opacity-0 group-hover:opacity-100 transition-opacity">Ir →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
