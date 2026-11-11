import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Initialize Project — Hire Full-Stack & Shopify Architect",
  description:
    "Contact Engr. Muhammad Shahzain (Enigma Systems) for custom ERP systems, Shopify Plus development, AI app integrations, and international software engineering contracts.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Initialize Project | Contact Engr. Muhammad Shahzain",
    description:
      "Available for global software engineering contracts, custom Shopify architecture, and enterprise web applications.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
