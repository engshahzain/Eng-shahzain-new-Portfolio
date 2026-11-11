import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work & Engineering Case Studies",
  description:
    "Explore production case studies by Engr. Muhammad Shahzain: Enigma ERP System, AI Shopify SEO Optimizer, PureGrubs, custom Shopify Plus storefronts, and full-stack web architectures.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Selected Work & Case Studies | Engr. Muhammad Shahzain",
    description:
      "Production case studies across full-stack ERP systems, public Shopify AI apps, and high-converting eCommerce storefronts.",
    url: "/work",
    images: [
      "https://res.cloudinary.com/dfqfl4scd/image/upload/v1794236136/Robotic_Assistant_Project_Showcase.png",
    ],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
