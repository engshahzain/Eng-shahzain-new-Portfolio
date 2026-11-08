"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProjectSkillsParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll position of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to horizontal movement (X-axis)
  // Row 1 moves Right to Left
  const x1 = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);
  // Row 2 moves Left to Right
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);
  // Row 3 moves Right to Left (Faster)
  const x3 = useTransform(scrollYProgress, [0, 1], ["15%", "-25%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 md:py-48 bg-black overflow-hidden border-t border-white/5 flex flex-col gap-4 md:gap-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 pointer-events-none"></div>

      {/* Row 1 */}
      <motion.div
        style={{ x: x1 }}
        className="flex whitespace-nowrap gap-8 md:gap-16 w-max"
      >
        {[
          "NEXT.JS",
          "SHOPIFY",
          "REACT",
          "LIQUID",
          "TYPESCRIPT",
          "MONGODB",
          "NEXT.JS",
          "SHOPIFY",
        ].map((skill, i) => (
          <span
            key={i}
            className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter text-white/5"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
          >
            {skill}{" "}
            <span className="text-emerald-500 text-5xl md:text-7xl">✦</span>
          </span>
        ))}
      </motion.div>

      {/* Row 2 */}
      <motion.div
        style={{ x: x2 }}
        className="flex whitespace-nowrap gap-8 md:gap-16 w-max"
      >
        {[
          "E-COMMERCE",
          "AI INTEGRATION",
          "SYSTEM ARCHITECTURE",
          "GRAPHQL",
          "E-COMMERCE",
          "AI INTEGRATION",
        ].map((skill, i) => (
          <span
            key={i}
            className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter text-gray-300"
          >
            {skill}{" "}
            <span className="text-emerald-500 text-5xl md:text-7xl">✦</span>
          </span>
        ))}
      </motion.div>

      {/* Row 3 */}
      <motion.div
        style={{ x: x3 }}
        className="flex whitespace-nowrap gap-8 md:gap-16 w-max"
      >
        {[
          "TAILWIND CSS",
          "NODE.JS",
          "PRISMA",
          "HARDWARE",
          "ROBOTICS",
          "TAILWIND CSS",
          "NODE.JS",
        ].map((skill, i) => (
          <span
            key={i}
            className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter text-transparent"
            style={{ WebkitTextStroke: "2px rgba(52, 211, 153, 0.4)" }} // Emerald outline
          >
            {skill}{" "}
            <span className="text-white/20 text-5xl md:text-7xl">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
