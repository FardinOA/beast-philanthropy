import type { Metadata, Viewport } from "next";
import { Inter_Tight, Rubik } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Reveal } from "@/components/reveal";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Beast Philanthropy · Make kindness viral",
  description:
    "Real projects. Verified impact. Funded by the world's largest YouTube audience and deployed through rigorous partnerships across 5 continents.",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${interTight.variable} ${rubik.variable} antialiased`}>
      <head>
        {/* Mark the page as scripted before paint, so reveals can start hidden without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <SmoothScroll />
        <Reveal />
      </body>
    </html>
  );
}
