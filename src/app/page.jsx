import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Hero from "@/components/home/Hero";
import QuienesSomos from "@/components/home/QuienesSomos";
import PorQueElegirnos from "@/components/home/PorQueElegirnos";
import Servicios from "@/components/home/Servicios";
import BannersViniles from "@/components/home/BannersViniles";
import Letras3D from "@/components/home/Letras3D";
import VinilVehicular from "@/components/home/VinilVehicular";
import DisplayRuletas from "@/components/home/DisplayRuletas";
import Infraestructura from "@/components/home/Infraestructura";
import Ubicanos from "@/components/home/Ubicanos";
import Contacto from "@/components/home/Contacto";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <QuienesSomos />
      <PorQueElegirnos />
      <Servicios />
      <BannersViniles />
      <Letras3D />
      <VinilVehicular />
      <DisplayRuletas />
      <Infraestructura />
      <Ubicanos />
      <Contacto />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
