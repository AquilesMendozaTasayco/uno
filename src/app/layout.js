import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "UNO Publicidad",
  description: "Brochure digital UNO Publicidad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${montserrat.variable}`}>
      <body className="font-[family-name:var(--font-montserrat)] antialiased">
        {children}
      </body>
    </html>
  );
}
