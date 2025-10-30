import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./lib/LanguageContext";
import { Inter } from "next/font/google";
import Script from "next/script";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LabSpaces",
  description: "🧬 Find a lab space for your biotech startup in France - simple, free, and community-driven!",
  openGraph: {
    title: "LabSpaces",
    description: "🧬 Find a lab space for your biotech startup in France - simple, free, and community-driven!",
    url: "https://labspaces.fr", // update with your actual URL
    siteName: "LabSpaces",
    images: [
      {
        url: "https://labspaces.fr/lablogo.svg", // path to your image
        width: 600,
        height: 600,
        alt: "LabSpaces - Find biotech lab spaces in France",
      },
    ],
    locale: "en_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LabSpaces",
    description: "🧬 Find a lab space for your biotech startup in France - simple, free, and community-driven!",
    images: ["https://labspaces.fr/lablogo.svg"], // same or different image
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          strategy="lazyOnload"
          src={`https://www.bugherd.com/sidebarv2.js?apikey=${process.env.NEXT_PUBLIC_BUGHERD_API_KEY}`}
          async
        />
        <LanguageProvider>
        <Navbar /> {/* ✅ Show on all pages */}

          {children}
          <Footer/>
          </LanguageProvider>
      </body>
    </html>
  );
}
