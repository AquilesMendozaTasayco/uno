"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import {
  Image, Upload, Trash2, Loader2, GripVertical,
  ChevronUp, ChevronDown, Edit3, X, Check, Eye, EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES_COLLECTION = "unopubli/content/slides";

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editSlide, setEditSlide] = useState(null);
  const [saving, setSaving] = useState(false);
  const [replacingImage, setReplacingImage] = useState(false);

  const loadSlides = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, SLIDES_COLLECTION));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => a.order - b.order);
      setSlides(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, SLIDES_COLLECTION));
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => a.order - b.order);
        setSlides(data);
      } catch {}
      setLoading(false);
    })();
  }, []);

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
      await setDoc(newSlideRef, {
        imageUrl: url, order: slides.length, title: "", subtitle: "", active: true,
      });
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

  const handleToggleActive = async (slide) => {
    try {
      await setDoc(doc(db, SLIDES_COLLECTION, slide.id), { active: !slide.active }, { merge: true });
      await loadSlides();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReorder = async (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= slides.length) return;

    const batch = writeBatch(db);
    const a = slides[idx];
    const b = slides[targetIdx];
    batch.update(doc(db, SLIDES_COLLECTION, a.id), { order: b.order });
    batch.update(doc(db, SLIDES_COLLECTION, b.id), { order: a.order });
    await batch.commit();
    await loadSlides();
  };

  const handleReplaceImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editSlide) return;
    setReplacingImage(true);

    const fileName = `hero_${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `unopubli/slides/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", null, null, async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      setEditSlide({ ...editSlide, imageUrl: url, _newImage: true });
      setReplacingImage(false);
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editSlide) return;
    setSaving(true);
    try {
      const data = {
        title: editSlide.title,
        subtitle: editSlide.subtitle,
      };
      if (editSlide._newImage && editSlide.imageUrl) {
        data.imageUrl = editSlide.imageUrl;
      }
      await setDoc(doc(db, SLIDES_COLLECTION, editSlide.id), data, { merge: true });
      if (editSlide._newImage && editSlide._oldImageUrl) {
        const oldPath = editSlide._oldImageUrl?.split("/o/")[1]?.split("?")[0];
        if (oldPath) {
          try { await deleteObject(ref(storage, decodeURIComponent(oldPath))); } catch {}
        }
      }
      setEditSlide(null);
      await loadSlides();
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
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
                className={`flex items-center gap-4 bg-white border rounded-2xl p-4 ${
                  !slide.active ? "border-gray-200 opacity-60" : "border-gray-100"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => handleReorder(idx, -1)}
                    disabled={idx === 0}
                    className="p-1 rounded text-gray-300 hover:text-uno-red hover:bg-gray-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <span className="text-[10px] font-bold text-gray-400">{idx + 1}</span>
                  <button
                    onClick={() => handleReorder(idx, 1)}
                    disabled={idx === slides.length - 1}
                    className="p-1 rounded text-gray-300 hover:text-uno-red hover:bg-gray-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>

                <div className="w-32 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={slide.imageUrl} alt={slide.title || `Slide ${idx + 1}`} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {slide.title || `Slide #${idx + 1}`}
                  </p>
                  {slide.subtitle && (
                    <p className="text-xs text-gray-400 truncate">{slide.subtitle}</p>
                  )}
                </div>

                <button
                  onClick={() => handleToggleActive(slide)}
                  className={`p-2.5 rounded-xl transition-all ${
                    slide.active
                      ? "bg-green-50 text-green-600 hover:bg-green-100"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  }`}
                  title={slide.active ? "Activo — desactivar" : "Inactivo — activar"}
                >
                  {slide.active ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>

                <button
                  onClick={() => setEditSlide({ ...slide, _oldImageUrl: slide.imageUrl })}
                  className="p-2.5 rounded-xl text-gray-300 hover:bg-blue-50 hover:text-blue-500 transition-all"
                >
                  <Edit3 size={16} />
                </button>

                <button
                  onClick={() => handleDelete(slide)}
                  className="p-2.5 rounded-xl text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <AnimatePresence>
        {editSlide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setEditSlide(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-gray-900 tracking-wide">
                  Editar Slide
                </h2>
                <button
                  onClick={() => setEditSlide(null)}
                  className="p-2 rounded-xl text-gray-300 hover:bg-gray-100 hover:text-gray-600 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-5">
                <div className="relative aspect-[16/6] rounded-xl overflow-hidden bg-gray-100 mb-1 group">
                  <img src={editSlide.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <label className={`absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity ${replacingImage ? "opacity-100" : ""}`}>
                    <input type="file" accept="image/*" className="hidden" onChange={handleReplaceImage} disabled={replacingImage} />
                    {replacingImage ? (
                      <Loader2 className="h-6 w-6 animate-spin text-white" />
                    ) : (
                      <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-black/50 px-4 py-2 rounded-full">
                        <Upload size={14} />
                        Cambiar imagen
                      </span>
                    )}
                  </label>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">
                    Título
                  </label>
                  <input
                    value={editSlide.title || ""}
                    onChange={(e) => setEditSlide({ ...editSlide, title: e.target.value })}
                    placeholder="Ej: ¡QUE TODOS TE VEAN!"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-uno-red focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">
                    Subtítulo
                  </label>
                  <input
                    value={editSlide.subtitle || ""}
                    onChange={(e) => setEditSlide({ ...editSlide, subtitle: e.target.value })}
                    placeholder="Ej: GIGANTOGRAFÍAS · LETREROS · LETRAS 3D"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-uno-red focus:bg-white transition-all"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Activo</span>
                    <button
                      type="button"
                      onClick={() => setEditSlide({ ...editSlide, active: !editSlide.active })}
                      className={`relative w-11 h-6 rounded-full transition-all ${
                        editSlide.active ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        editSlide.active ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setEditSlide(null)}
                      className="px-6 py-3 rounded-xl text-sm font-bold text-gray-400 hover:bg-gray-100 transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 bg-uno-red text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-uno-red-dark transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-uno-red/20"
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      {saving ? "Guardando..." : "Guardar"}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
