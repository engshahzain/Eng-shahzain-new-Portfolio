import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://enigmasystems.io";

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Engr. Muhammad Shahzain | Full-Stack Software Architect & Shopify Engineer",
    template: "%s | Engr. Muhammad Shahzain",
  },
  description:
    "Official engineering portfolio of Engr. Muhammad Shahzain (Enigma Systems). Computer Engineer specializing in Next.js 15 enterprise architecture, custom Shopify Plus development, AI integrations, and WCAG 2.2 accessibility.",
  keywords: [
    "Engr Muhammad Shahzain",
    "Muhammad Shahzain",
    "Enigma Systems",
    "Full-Stack Software Engineer",
    "Computer Engineer Pakistan",
    "Shopify App Developer",
    "Shopify Plus Developer",
    "Next.js 15 Architect",
    "AI Integration Engineer",
    "WCAG Accessibility Specialist",
    "ERP System Developer",
  ],
  authors: [{ name: "Engr. Muhammad Shahzain", url: siteUrl }],
  creator: "Engr. Muhammad Shahzain",
  publisher: "Enigma Systems",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Engr. Muhammad Shahzain — Enigma Systems",
    title:
      "Engr. Muhammad Shahzain | Full-Stack Software Architect & AI Engineer",
    description:
      "Architecting high-performance Next.js enterprise applications, custom Shopify Plus storefronts, and AI-powered software solutions.",
    images: [
      {
        url: "https://res.cloudinary.com/dfqfl4scd/image/upload/v1794236136/Robotic_Assistant_Project_Showcase.png",
        width: 1200,
        height: 630,
        alt: "Engr. Muhammad Shahzain — Enigma Systems Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engr. Muhammad Shahzain | Systems Architect & Shopify Engineer",
    description:
      "Full-Stack Engineer & Computer Engineer building scalable Next.js systems, AI apps, and high-converting Shopify storefronts.",
    images: [
      "https://res.cloudinary.com/dfqfl4scd/image/upload/v1794236136/Robotic_Assistant_Project_Showcase.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured Data (JSON-LD) for Google Knowledge Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Engr. Muhammad Shahzain",
    jobTitle: "Full-Stack Software Architect & Computer Engineer",
    url: siteUrl,
    worksFor: {
      "@type": "Organization",
      name: "Enigma Systems",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "BSc Computer Engineering",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Shopify App Development",
      "Shopify Liquid",
      "Artificial Intelligence",
      "WCAG 2.2 Web Accessibility",
      "Enterprise Resource Planning (ERP)",
      "Linux Server Administration",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
