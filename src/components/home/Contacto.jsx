"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ArrowRight, Send, Loader2, Check } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const defaultConfig = {
  phone: "929 786 645",
  email: "jparedes@unopubli.com",
  address: "Av. España 1325 - Trujillo",
  whatsapp: "51929786645",
};

export default function Contacto() {
  const [config, setConfig] = useState(defaultConfig);
  const [configLoading, setConfigLoading] = useState(true);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const snap = await getDoc(doc(db, "unopubli", "config"));
        if (snap.exists()) setConfig({ ...defaultConfig, ...snap.data() });
      } catch {}
      setConfigLoading(false);
    };
    fetchConfig();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setSent(true);
      setForm({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="relative bg-uno-red py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-uno-red/80 to-uno-red-dark/80" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="text-white/50 text-sm font-bold tracking-[0.3em] uppercase mb-2">
              #somosuno
            </p>
            <h2 className="font-[family-name:var(--font-bebas)] text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide leading-none">
              ¡QUE TODOS
            </h2>
            <h2 className="font-[family-name:var(--font-bebas)] text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide leading-none mt-1">
              TE VEAN!
            </h2>

            <div className="my-8">
              <div className="font-[family-name:var(--font-bebas)] text-white text-5xl md:text-6xl tracking-wide">
                UNO
              </div>
              <div className="font-[family-name:var(--font-montserrat)] text-white font-light text-sm tracking-[0.3em] uppercase">
                PUBLICIDAD
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3 mb-8">
              {configLoading ? (
                <>
                  <div className="h-10 w-48 bg-white/10 rounded-full animate-pulse" />
                  <div className="h-10 w-56 bg-white/10 rounded-full animate-pulse" />
                  <div className="h-10 w-44 bg-white/10 rounded-full animate-pulse" />
                </>
              ) : (
                <>
                  <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3 text-white hover:bg-white/20 transition-all text-sm w-fit">
                    <Phone size={16} />
                    <span className="font-bold">{config.phone}</span>
                  </a>
                  <a href={`mailto:${config.email}`}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3 text-white hover:bg-white/20 transition-all text-sm w-fit">
                    <Mail size={16} />
                    <span>{config.email}</span>
                  </a>
                  <span className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3 text-white text-sm w-fit">
                    <MapPin size={16} />
                    <span>{config.address}</span>
                  </span>
                </>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="font-[family-name:var(--font-bebas)] text-white text-2xl tracking-wide mb-2">
                Escríbenos
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="nombre" placeholder="Nombre *" value={form.nombre} onChange={handleChange} required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 outline-none focus:border-white focus:bg-white/20 transition-all" />
                <input name="email" type="email" placeholder="Correo *" value={form.email} onChange={handleChange} required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 outline-none focus:border-white focus:bg-white/20 transition-all" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 outline-none focus:border-white focus:bg-white/20 transition-all" />
                <input name="asunto" placeholder="Asunto *" value={form.asunto} onChange={handleChange} required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 outline-none focus:border-white focus:bg-white/20 transition-all" />
              </div>

              <textarea name="mensaje" placeholder="Mensaje *" value={form.mensaje} onChange={handleChange} required rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 outline-none focus:border-white focus:bg-white/20 transition-all resize-none" />

              {error && (
                <p className="text-white/80 text-xs font-bold text-center">{error}</p>
              )}

              <div className="flex items-center gap-3">
                <button type="submit" disabled={sending || sent}
                  className="flex items-center gap-2 bg-white text-uno-red font-bold text-sm tracking-[0.1em] px-8 py-3.5 rounded-full hover:bg-white/90 transition-all uppercase disabled:opacity-50">
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : sent ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {sending ? "Enviando..." : sent ? "¡Enviado!" : "Enviar Mensaje"}
                </button>
                <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 font-bold text-sm tracking-[0.1em] px-6 py-3.5 rounded-full hover:bg-white/10 transition-all uppercase">
                  Cotiza por WhatsApp
                  <ArrowRight size={14} />
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
