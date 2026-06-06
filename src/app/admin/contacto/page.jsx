"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Phone, Mail, MapPin, Globe, Save, Loader2, Check, ExternalLink, Camera, MessageCircle } from "lucide-react";

const CONFIG_DOC = "unopubli/config";

const defaultData = {
  phone: "929 786 645",
  email: "jparedes@unopubli.com",
  address: "Av. España 1325 - Trujillo",
  whatsapp: "51929786645",
  facebook: "",
  instagram: "",
  tiktok: "",
};

export default function ContactoPage() {
  const [form, setForm] = useState({ ...defaultData });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const snap = await getDoc(doc(db, CONFIG_DOC));
      if (snap.exists()) {
        setForm({ ...defaultData, ...snap.data() });
      }
    } catch {}
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, CONFIG_DOC), form, { merge: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const Field = ({ icon: Icon, label, field, type = "text", placeholder }) => (
    <div>
      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
        <Icon size={14} />
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[field]}
        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-800 outline-none focus:border-uno-red focus:bg-white transition-all"
      />
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-uno-red" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-bebas)] text-4xl text-gray-900 tracking-wide">
          Contacto y Redes Sociales
        </h1>
        <p className="text-gray-400 text-sm font-bold mt-1">
          Actualiza la información de contacto y enlaces a redes sociales
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
          <h2 className="font-[family-name:var(--font-bebas)] text-xl text-gray-800 tracking-wide">
            Información de Contacto
          </h2>
          <Field icon={Phone} label="Teléfono" field="phone" placeholder="929 786 645" />
          <Field icon={MessageCircle} label="WhatsApp (con código de país)" field="whatsapp" placeholder="51929786645" />
          <Field icon={Mail} label="Correo Electrónico" field="email" type="email" placeholder="jparedes@unopubli.com" />
          <Field icon={MapPin} label="Dirección" field="address" placeholder="Av. España 1325 - Trujillo" />
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
          <h2 className="font-[family-name:var(--font-bebas)] text-xl text-gray-800 tracking-wide">
            Redes Sociales
          </h2>
          <Field icon={ExternalLink} label="Facebook (URL completa)" field="facebook" placeholder="https://facebook.com/unopubli" />
          <Field icon={Camera} label="Instagram (URL completa)" field="instagram" placeholder="https://instagram.com/unopubli" />
          <Field icon={Globe} label="TikTok (URL completa)" field="tiktok" placeholder="https://tiktok.com/@unopubli" />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-uno-red text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-uno-red-dark transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-uno-red/20"
        >
          {saving ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : saved ? (
            <Check className="h-5 w-5" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          {saving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
}
