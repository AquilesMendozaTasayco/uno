import { Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "UNO Publicidad — ¡Que todos te vean!",
  description:
    "Especialistas en soluciones gráficas: gigantografías, letreros luminosos, letras 3D, viniles, banners y más. Más de 10 años de experiencia en Trujillo, Perú.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${bebas.variable} ${montserrat.variable}`}>
      <body className="font-[family-name:var(--font-montserrat)] antialiased bg-white text-uno-black">
        {children}
      </body>
    </html>
  );
}
