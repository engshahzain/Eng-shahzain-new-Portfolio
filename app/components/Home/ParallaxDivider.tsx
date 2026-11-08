"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const principles = [
  {
    title: "High-Performance Speed",
    text: "Blazing load times and optimized database pipelines engineered to scale effortlessly as your enterprise traffic surges.",
  },
  {
    title: "Clean Architecture",
    text: "Strictly typed, modular codebases and clean documentation, ensuring your in-house team can scale or maintain systems seamlessly.",
  },
  {
    title: "Universal Accessibility",
    text: "Rigorously audited against WCAG standards to maximize user retention, legal compliance, and market reach.",
  },
];

const rowOne = [
  "Next.js 15",
  "Shopify Plus",
  "AI Integrations",
  "WCAG Accessibility",
];
const rowTwo = ["Node.js", "MongoDB", "Prisma ORM", "Cloud Infrastructure"];

// Three copies so the row never runs out of text while it slides
function MovingRow({
  words,
  outlineFirst,
}: {
  words: string[];
  outlineFirst?: boolean;
}) {
  return (
    <div
      className="flex w-max items-center gap-8 whitespace-nowrap md:gap-14"
      aria-hidden
    >
      {[0, 1, 2].map((copy) =>
        words.map((word, i) => {
          const outlined = (i % 2 === 0) === !!outlineFirst;
          return (
            <span
              key={`${copy}-${word}`}
              className="flex items-center gap-8 md:gap-14"
            >
              <span
                className="text-6xl font-semibold tracking-tight md:text-[8.5rem] md:leading-none"
                style={
                  outlined
                    ? {
                        color: "transparent",
                        WebkitTextStroke: "1.5px rgba(255,255,255,0.35)",
                      }
                    : { color: "rgba(255,255,255,0.92)" }
                }
              >
                {word}
              </span>
              <span className="h-3 w-3 rounded-full bg-emerald-400 md:h-4 md:w-4" />
            </span>
          );
        }),
      )}
    </div>
  );
}

export default function ParallaxSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const k = reduce ? 0 : 1; // 0 turns every movement off

  // Progress goes 0 to 1 while the section travels across the screen
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Only transform values are animated: the browser can do this on the GPU, so it stays smooth
  const rowOneX = useTransform(scrollYProgress, [0, 1], ["0%", `${-30 * k}%`]);
  const rowTwoX = useTransform(scrollYProgress, [0, 1], [`${-30 * k}%`, "0%"]);
  const gridY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-8 * k}%`, `${8 * k}%`],
  );
  const orbA = useTransform(
    scrollYProgress,
    [0, 1],
    [`${60 * k}px`, `${-120 * k}px`],
  );
  const orbB = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-40 * k}px`, `${140 * k}px`],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${30 * k}px`, `${-30 * k}px`],
  );

  return (
    <section
      ref={ref}
      id="approach"
      aria-labelledby="approach-heading"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-black py-28 text-white md:py-44"
    >
      {/* Layer 1, the slowest: faint grid */}
      <motion.div
        aria-hidden
        style={{
          y: gridY,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        className="pointer-events-none absolute -inset-y-[12%] inset-x-0 will-change-transform"
      />

      {/* Static vignette: fades the grid out toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000_85%)]"
      />

      {/* Layer 2: two soft emerald lights moving at different speeds */}
      <motion.div
        aria-hidden
        style={{ y: orbA }}
        className="pointer-events-none absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.28),transparent_65%)] will-change-transform"
      />
      <motion.div
        aria-hidden
        style={{ y: orbB }}
        className="pointer-events-none absolute -right-24 bottom-1/4 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_65%)] will-change-transform"
      />

      <div className="relative">
        {/* Layer 3: big words sliding left */}
        <motion.div style={{ x: rowOneX }} className="will-change-transform">
          <MovingRow words={rowOne} outlineFirst />
        </motion.div>

        {/* Layer 4, the content */}
        <motion.div
          style={{ y: contentY }}
          className="relative mx-auto my-20 w-full max-w-6xl px-4 will-change-transform md:my-32 md:px-6"
        >
          <h2
            id="approach-heading"
            className="mx-auto max-w-4xl text-center text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
          >
            Engineered for speed, structured for scale, accessible to all.
          </h2>

          <ul className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
            {principles.map((p) => (
              <li key={p.title} className="border-t border-emerald-400/60 pt-5">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/70">
                  {p.text}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Layer 3: big words sliding right */}
        <motion.div style={{ x: rowTwoX }} className="will-change-transform">
          <MovingRow words={rowTwo} />
        </motion.div>
      </div>
    </section>
  );
}
