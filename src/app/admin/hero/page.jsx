"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { Image, Upload, Trash2, Loader2, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES_COLLECTION = "unopubli/content/slides";

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, SLIDES_COLLECTION));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => a.order - b.order);
      setSlides(data);
    } catch { /* collection may not exist */ }
    setLoading(false);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const fileName = `hero_${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `unopubli/slides/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", null, null, async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      const newSlideRef = doc(collection(db, SLIDES_COLLECTION));
      await setDoc(newSlideRef, { imageUrl: url, order: slides.length, title: "", subtitle: "" });
      await loadSlides();
      setUploading(false);
    });
  };

  const handleDelete = async (slide) => {
    try {
      await deleteDoc(doc(db, SLIDES_COLLECTION, slide.id));
      const oldPath = slide.imageUrl?.split("/o/")[1]?.split("?")[0];
      if (oldPath) {
        try { await deleteObject(ref(storage, decodeURIComponent(oldPath))); } catch {}
      }
      await loadSlides();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-bebas)] text-4xl text-gray-900 tracking-wide">
          Slides del Hero
        </h1>
        <p className="text-gray-400 text-sm font-bold mt-1">
          Administra las imágenes del carrusel principal
        </p>
      </div>

      <label
        className={`flex items-center justify-center gap-3 w-full py-5 px-6 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-uno-red hover:bg-uno-red/5 transition-all ${uploading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        {uploading ? (
          <Loader2 className="h-5 w-5 animate-spin text-uno-red" />
        ) : (
          <Upload className="h-5 w-5 text-uno-red" />
        )}
        <span className="text-sm font-bold text-gray-500">
          {uploading ? "Subiendo imagen..." : "Subir nueva imagen"}
        </span>
      </label>

      <div className="mt-8 space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-uno-red" />
          </div>
        ) : slides.length === 0 ? (
          <div className="text-center py-12">
            <Image className="h-12 w-12 mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 text-sm font-bold">No hay slides aún</p>
          </div>
        ) : (
          <AnimatePresence>
            {slides.map((slide, idx) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4"
              >
                <GripVertical className="h-5 w-5 text-gray-300 cursor-grab" />
                <div className="w-32 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={slide.imageUrl} alt={slide.title || `Slide ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">Slide #{idx + 1}</p>
                  <p className="text-xs text-gray-400 truncate">{slide.imageUrl}</p>
                </div>
                <button
                  onClick={() => handleDelete(slide)}
                  className="p-3 rounded-xl text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
