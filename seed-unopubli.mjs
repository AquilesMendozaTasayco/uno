import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, doc, setDoc, serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:            "AIzaSyDeUj1uFTnL7phoIonxNfFgGc92JyGPEI0",
  authDomain:        "biol-e7bb5.firebaseapp.com",
  projectId:         "biol-e7bb5",
  storageBucket:     "biol-e7bb5.firebasestorage.app",
  messagingSenderId: "411684854051",
  appId:             "1:411684854051:web:f417606bda53b548429496",
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

const slides = [
  { id: "slide-0", title: "¡QUE TODOS TE VEAN!", subtitle: "GIGANTOGRAFÍAS · LETREROS · LETRAS 3D · VINILES · ROLL SCREEN · BANNERS", imageUrl: "/banner1.jpg", order: 0 },
  { id: "slide-1", title: "BANNERS PUBLICITARIOS", subtitle: "Impresión de alta calidad en gran formato", imageUrl: "/banner2.jpg", order: 1 },
  { id: "slide-2", title: "LETRAS 3D", subtitle: "Corte digital de alta precisión", imageUrl: "/banner3.jpg", order: 2 },
];

const galeria = [
  // Banners / Viniles
  { id: "gal-ban-1", section: "banners-viniles", imageUrl: "/banner1.jpg", order: 0, title: "Banners publicitarios" },
  { id: "gal-ban-2", section: "banners-viniles", imageUrl: "/banner2.jpg", order: 1, title: "Vinil adhesivo" },
  { id: "gal-ban-3", section: "banners-viniles", imageUrl: "/banner3.jpg", order: 2, title: "Letras 3D" },
  { id: "gal-ban-4", section: "banners-viniles", imageUrl: "/banner4.jpg", order: 3, title: "Letreros luminosos" },
  { id: "gal-ban-5", section: "banners-viniles", imageUrl: "/banner5.jpg", order: 4, title: "Paneles y vallas" },

  // Letras 3D
  { id: "gal-3d-1", section: "letras-3d", imageUrl: "/3d1.jpg", order: 0, title: "Letrero 3D" },
  { id: "gal-3d-2", section: "letras-3d", imageUrl: "/3d2.jpg", order: 1, title: "Letrero luminoso" },
  { id: "gal-3d-3", section: "letras-3d", imageUrl: "/3d3.jpg", order: 2, title: "Backing iluminado" },
  { id: "gal-3d-4", section: "letras-3d", imageUrl: "/3d4.jpg", order: 3, title: "Letrero en altura" },

  // Vinil Vehicular
  { id: "gal-vin-1", section: "vinil-vehicular", imageUrl: "/vinil1.jpg", order: 0, title: "Flota vehicular" },
  { id: "gal-vin-2", section: "vinil-vehicular", imageUrl: "/vinil2.jpg", order: 1, title: "Vinil ventanas" },
  { id: "gal-vin-3", section: "vinil-vehicular", imageUrl: "/vinil3.jpg", order: 2, title: "Mamparas pavonadas" },
  { id: "gal-vin-4", section: "vinil-vehicular", imageUrl: "/vinil4.jpg", order: 3, title: "Instalación profesional" },
  { id: "gal-vin-5", section: "vinil-vehicular", imageUrl: "/vinil5.jpg", order: 4, title: "Acabados de alta exigencia" },

  // Display / Ruletas
  { id: "gal-rul-1", section: "display-ruletas", imageUrl: "/ruletas1.jpg", order: 0, title: "Roll screen" },
  { id: "gal-rul-2", section: "display-ruletas", imageUrl: "/ruletas2.jpg", order: 1, title: "Ruletas para activaciones" },
  { id: "gal-rul-3", section: "display-ruletas", imageUrl: "/ruletas3.jpg", order: 2, title: "Módulos comerciales" },
  { id: "gal-rul-4", section: "display-ruletas", imageUrl: "/ruletas4.jpg", order: 3, title: "Vallas publicitarias" },

  // Quiénes Somos
  { id: "gal-qs-1", section: "quienes-somos", imageUrl: "/quienes-somos.png", order: 0, title: "Quiénes Somos" },
];

const configData = {
  phone: "929 786 645",
  email: "jparedes@unopubli.com",
  address: "Av. España 1325 - Trujillo",
  whatsapp: "51929786645",
  facebook: "",
  instagram: "",
  tiktok: "",
};

async function seed() {
  console.log("\n UNO Publicidad — Seed de datos\n");

  // ── Slides ──
  console.log(" Insertando slides...");
  for (const s of slides) {
    const { id, ...data } = s;
    await setDoc(doc(collection(db, "unopubli", "content", "slides"), id), {
      ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
    });
    console.log(`   ✅ ${s.title}`);
  }

  // ── Galería ──
  console.log("\n Insertando imágenes de galería...");
  for (const g of galeria) {
    const { id, ...data } = g;
    await setDoc(doc(collection(db, "unopubli", "content", "galeria"), id), {
      ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
    });
    console.log(`   ✅ [${g.section}] ${g.title}`);
  }

  // ── Config ──
  console.log("\n Insertando configuración...");
  await setDoc(doc(db, "unopubli", "config"), {
    ...configData, createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
  console.log("   ✅ Configuración de contacto guardada");

  console.log("\n✨ Seed completado.\n");
  process.exit(0);
}

seed();
