import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ui/ScrollProgress";
import LoadingScreen from "@/components/ui/LoadingScreen";
import BgGrid from "@/components/ui/BgGrid";
import SmoothScroll from "@/components/ui/SmoothScroll";
import GlowTracker from "@/components/ui/GlowTracker";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Développeur Full Stack Freelance — React, Next.js & Node.js",
  description:
    "Développeur freelance full stack spécialisé React, Next.js et Node.js. Je conçois et développe des applications web performantes pour startups et PME.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t===null&&d))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-[--background] text-[--foreground]`}
      >
        <SmoothScroll />
        <GlowTracker />
        <LoadingScreen />
        <BgGrid />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
