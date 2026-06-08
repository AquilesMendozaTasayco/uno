"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import {
  Image, Upload, Trash2, Loader2, ChevronUp, ChevronDown,
  Edit3, X, Check, Eye, EyeOff,
} from "lucide-react";
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
  const [editImage, setEditImage] = useState(null);
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
    (async () => {
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
    })();
  }, [activeSection]);

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
      await setDoc(newDocRef, { imageUrl: url, section: activeSection, order: images.length, title: "", active: true });
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

  const handleToggleActive = async (img) => {
    try {
      await setDoc(doc(db, GALERIA_COLLECTION, img.id), { active: !img.active }, { merge: true });
      await loadImages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReorder = async (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= images.length) return;

    const batch = writeBatch(db);
    const a = images[idx];
    const b = images[targetIdx];
    batch.update(doc(db, GALERIA_COLLECTION, a.id), { order: b.order });
    batch.update(doc(db, GALERIA_COLLECTION, b.id), { order: a.order });
    await batch.commit();
    await loadImages();
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editImage) return;
    setSaving(true);
    try {
      await setDoc(doc(db, GALERIA_COLLECTION, editImage.id), {
        title: editImage.title,
        active: editImage.active,
      }, { merge: true });
      setEditImage(null);
      await loadImages();
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence>
            {images.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group relative bg-white border rounded-2xl overflow-hidden ${
                  !img.active ? "border-gray-200 opacity-60" : "border-gray-100"
                }`}
              >
                <div className="flex items-stretch">
                  <div className="flex flex-col items-center justify-center gap-1 px-2 bg-gray-50 border-r border-gray-100">
                    <button
                      onClick={() => handleReorder(idx, -1)}
                      disabled={idx === 0}
                      className="p-1 rounded text-gray-300 hover:text-uno-red hover:bg-gray-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <span className="text-[10px] font-bold text-gray-400">{idx + 1}</span>
                    <button
                      onClick={() => handleReorder(idx, 1)}
                      disabled={idx === images.length - 1}
                      className="p-1 rounded text-gray-300 hover:text-uno-red hover:bg-gray-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>

                  <div className="w-28 h-24 shrink-0 overflow-hidden">
                    <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 p-3 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">{img.title || "Sin título"}</p>
                    <p className="text-[10px] text-gray-400 truncate mt-0.5">{img.imageUrl?.split("/").pop()}</p>
                  </div>
                </div>

                <div className="flex border-t border-gray-100 divide-x divide-gray-100">
                  <button
                    onClick={() => handleToggleActive(img)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold transition-all ${
                      img.active
                        ? "text-green-600 hover:bg-green-50"
                        : "text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {img.active ? <Eye size={13} /> : <EyeOff size={13} />}
                    {img.active ? "Activo" : "Inactivo"}
                  </button>
                  <button
                    onClick={() => setEditImage({ ...img })}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-gray-400 hover:bg-blue-50 hover:text-blue-500 transition-all"
                  >
                    <Edit3 size={13} />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(img)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={13} />
                    Eliminar
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {editImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setEditImage(null)}
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
                  Editar Imagen
                </h2>
                <button
                  onClick={() => setEditImage(null)}
                  className="p-2 rounded-xl text-gray-300 hover:bg-gray-100 hover:text-gray-600 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-5">
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 mb-1">
                  <img src={editImage.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">
                    Título
                  </label>
                  <input
                    value={editImage.title || ""}
                    onChange={(e) => setEditImage({ ...editImage, title: e.target.value })}
                    placeholder="Ej: Banners publicitarios"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-uno-red focus:bg-white transition-all"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Activo</span>
                    <button
                      type="button"
                      onClick={() => setEditImage({ ...editImage, active: !editImage.active })}
                      className={`relative w-11 h-6 rounded-full transition-all ${
                        editImage.active ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        editImage.active ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setEditImage(null)}
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
