"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { Image, Upload, Trash2, Loader2, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { key: "quienes-somos", label: "Quiénes Somos", folder: "quienes-somos" },
  { key: "banners-viniles", label: "Banners / Viniles", folder: "banners-viniles" },
  { key: "letras-3d", label: "Letras 3D", folder: "letras-3d" },
  { key: "vinil-vehicular", label: "Vinil Vehicular", folder: "vinil-vehicular" },
  { key: "display-ruletas", label: "Display / Ruletas", folder: "display-ruletas" },
  { key: "instalaciones", label: "Instalaciones", folder: "instalaciones" },
  { key: "ubicacion", label: "Ubicación", folder: "ubicacion" },
];

const GALERIA_COLLECTION = "unopubli/content/galeria";

export default function GaleriaPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].key);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadImages();
  }, [activeSection]);

  const loadImages = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, GALERIA_COLLECTION));
      const filtered = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(d => d.section === activeSection)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      setImages(filtered);
    } catch { setImages([]); }
    setLoading(false);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const fileName = `${activeSection}_${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `unopubli/galeria/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", null, null, async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      const newDocRef = doc(collection(db, GALERIA_COLLECTION));
      await setDoc(newDocRef, { imageUrl: url, section: activeSection, order: images.length });
      await loadImages();
      setUploading(false);
    });
  };

  const handleDelete = async (img) => {
    try {
      await deleteDoc(doc(db, GALERIA_COLLECTION, img.id));
      const oldPath = img.imageUrl?.split("/o/")[1]?.split("?")[0];
      if (oldPath) {
        try { await deleteObject(ref(storage, decodeURIComponent(oldPath))); } catch {}
      }
      await loadImages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-bebas)] text-4xl text-gray-900 tracking-wide">
          Galería de Imágenes
        </h1>
        <p className="text-gray-400 text-sm font-bold mt-1">
          Administra las imágenes por sección
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {SECTIONS.map((sec) => (
          <button
            key={sec.key}
            onClick={() => setActiveSection(sec.key)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeSection === sec.key
                ? "bg-uno-red text-white shadow-lg shadow-uno-red/20"
                : "bg-white text-gray-500 border border-gray-200 hover:border-uno-red hover:text-uno-red"
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      <label
        className={`flex items-center justify-center gap-3 w-full py-5 px-6 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-uno-red hover:bg-uno-red/5 transition-all mb-8 ${uploading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        {uploading ? (
          <Loader2 className="h-5 w-5 animate-spin text-uno-red" />
        ) : (
          <Upload className="h-5 w-5 text-uno-red" />
        )}
        <span className="text-sm font-bold text-gray-500">
          {uploading ? "Subiendo..." : `Subir imagen a ${SECTIONS.find(s => s.key === activeSection)?.label}`}
        </span>
      </label>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-uno-red" />
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12">
          <Image className="h-12 w-12 mx-auto text-gray-200 mb-4" />
          <p className="text-gray-400 text-sm font-bold">No hay imágenes en esta sección</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {images.map((img) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={img.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <button
                  onClick={() => handleDelete(img)}
                  className="absolute top-2 right-2 p-2 rounded-xl bg-white/90 backdrop-blur-sm text-gray-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
