"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  LayoutDashboard, LogOut, Image, FolderOpen, Phone, Globe,
} from "lucide-react";

const items = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Slides Hero", href: "/admin/hero", icon: Image },
  { label: "Galería", href: "/admin/galeria", icon: FolderOpen },
  { label: "Contacto y Redes", href: "/admin/contacto", icon: Phone },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  return (
    <aside className="sticky top-0 h-screen w-[260px] flex-shrink-0 bg-white border-r border-gray-100 flex flex-col z-50">
      <div className="px-6 pt-8 pb-6 border-b border-gray-100">
        <Link href="/admin" className="font-[family-name:var(--font-bebas)] text-3xl text-uno-red tracking-wide">
          UNO
        </Link>
        <p className="text-[9px] text-gray-300 font-bold uppercase tracking-[0.2em] mt-0.5">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((it) => {
          const active = it.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(it.href);
          const Icon = it.icon;

          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                active
                  ? "bg-uno-red/5 text-uno-red"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <Icon size={18} />
              {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4 border-t border-gray-100 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
