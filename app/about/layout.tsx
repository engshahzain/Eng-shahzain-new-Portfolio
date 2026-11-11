import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Engr. Muhammad Shahzain — Computer Engineer & Architect",
  description:
    "Biography and engineering philosophy of Engr. Muhammad Shahzain, a BSc Computer Engineering graduate and Full-Stack Software Architect operating out of Punjab, Pakistan with global reach.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "profile",
    title:
      "About Engr. Muhammad Shahzain | Computer Engineer & Systems Architect",
    description:
      "Engineer by degree, Architect by trade. Discover the background and full-stack philosophy of Engr. Muhammad Shahzain.",
    url: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
