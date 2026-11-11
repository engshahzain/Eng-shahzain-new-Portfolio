import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Stack, Cloud DevOps & Open Source Tooling",
  description:
    "Explore the engineering stack of Engr. Muhammad Shahzain: Next.js 15, React 19, TypeScript, Node.js, Shopify Admin GraphQL API, Google Gemini AI, Ubuntu Linux VPS, PM2, and ZainUI.",
  alternates: {
    canonical: "/stack",
  },
  openGraph: {
    title: "Technical Stack & Expertise | Engr. Muhammad Shahzain",
    description:
      "Frontend architecture, bare-metal Linux DevOps, Shopify Plus engineering, and AI integrations.",
    url: "/stack",
  },
};

export default function StackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
