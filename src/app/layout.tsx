import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import CursorAndOverlay from "@/components/CursorAndOverlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gonzalo Calderón | Desarrollador Full Stack",
  description:
    "Portfolio de Gonzalo Calderón, Desarrollador Full Stack especializado en Frontend. React, Next.js, Node.js, NestJS, PostgreSQL. Mendoza, Argentina.",
  keywords:
    "desarrollador full stack, frontend, react, next.js, nestjs, node.js, portfolio, web developer, mendoza argentina",
  authors: [{ name: "Gonzalo Calderón" }],
  openGraph: {
    title: "Gonzalo Calderón | Desarrollador Full Stack",
    description:
      "Portfolio profesional de Gonzalo Calderón — React, Next.js, NestJS",
    url: "https://gjcalderonportfolio.netlify.app/",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${anton.variable} antialiased`}>
      <body className="bg-bgDark text-textMain min-h-screen font-sans overflow-x-hidden">
        <CursorAndOverlay>
          {children}
        </CursorAndOverlay>
      </body>
    </html>
  );
}
