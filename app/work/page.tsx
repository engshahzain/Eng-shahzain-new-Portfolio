"use client";

import { useState } from "react";
import Image from "next/image";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import ProjectSkillsParallax from "../components/project/ProjectSkillsParallax";
import Link from "next/link";
// Import your centralized data architecture
import { projects } from "../components/data/projects";

export type Kind = "stores" | "apps" | "engineering";

const filters: { id: "all" | Kind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "stores", label: "Stores and sites" },
  { id: "apps", label: "Shopify apps" },
  { id: "engineering", label: "Engineering" },
];

const PREVIEW_W = 380;
const PREVIEW_H = 285;

export default function ProjectsPage() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<"all" | Kind>("all");
  const [active, setActive] = useState<string | null>(null);

  // Cursor-following preview. Motion values update the transform directly,
  // so moving the mouse never re-renders React.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 30, mass: 0.5 });
  const y = useSpring(my, { stiffness: 260, damping: 30, mass: 0.5 });
  const tilt = useSpring(useTransform(useVelocity(x), [-1800, 1800], [-7, 7]), {
    stiffness: 200,
    damping: 20,
  });

  // Filter against the imported central projects array
  const visible =
    filter === "all" ? projects : projects.filter((p) => p.kind === filter);

  const handleMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    // Keep the preview on screen near the right edge
    mx.set(Math.min(e.clientX + 40, window.innerWidth - PREVIEW_W - 24));
    my.set(e.clientY - PREVIEW_H / 2);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-32 md:px-6 md:pt-40">
        {/* Header */}
        <header>
          <h1 className="overflow-hidden pb-2">
            <motion.span
              initial={reduce ? false : { y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[clamp(3.5rem,14vw,12rem)] font-semibold leading-[0.95] tracking-tighter"
            >
              Selected work
              <sup className="ml-3 align-super text-xl font-medium tracking-normal text-emerald-300 md:text-3xl">
                {projects.length}
              </sup>
            </motion.span>
          </h1>

          <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
              Client stores, published Shopify apps and the robot I built for my
              engineering degree. Hover a project to preview it, or open the
              case study.
            </p>

            <div
              role="group"
              aria-label="Filter projects"
              className="flex flex-wrap gap-2"
            >
              {filters.map((f) => {
                const count =
                  f.id === "all"
                    ? projects.length
                    : projects.filter((p) => p.kind === f.id).length;
                const pressed = filter === f.id;

                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => {
                      setFilter(f.id);
                      setActive(null);
                    }}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      pressed
                        ? "border-white bg-white text-black"
                        : "border-white/25 text-white/80 hover:border-white/60 hover:text-white"
                    }`}
                  >
                    {f.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Project index */}
        <ul
          className="mt-16 md:mt-24"
          onPointerMove={handleMove}
          onPointerLeave={() => setActive(null)}
        >
          {visible.map((p) => (
            <li
              key={p.id}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setActive(p.id);
              }}
              className={`group relative border-t border-white/10 py-8 transition-opacity duration-300 last:border-b md:py-12 ${
                active && active !== p.id ? "md:opacity-30" : ""
              }`}
            >
              <div className="grid gap-5 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-8">
                  <h2>
                    {/* Updated href to utilize Next.js dynamic routing slugs */}
                    <Link
                      href={`/work/${p.slug}`}
                      className="block text-4xl font-semibold leading-[1.05] tracking-tight transition-[transform,color] duration-500 after:absolute after:inset-0 group-hover:text-emerald-300 focus-visible:text-emerald-300 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-emerald-400 md:text-6xl md:group-hover:translate-x-3 lg:text-7xl motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    >
                      {p.title}
                      <span className="sr-only">, view case study</span>
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                    {p.description}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-3 md:col-span-4 md:pr-12">
                  <p className="text-sm font-medium text-emerald-300">
                    {p.category}
                  </p>
                  <p className="text-sm leading-relaxed text-white/60">
                    {p.tech.join(", ")}
                  </p>
                  {p.link !== "#" && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 mt-1 inline-flex items-center gap-2 text-sm font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      Visit live site
                      <ExternalLink size={14} aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Arrow, desktop only */}
              <ArrowUpRight
                aria-hidden
                className="absolute right-0 top-12 hidden h-8 w-8 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-300 md:block motion-reduce:transition-none"
              />

              {/* Phones and tablets have no hover, so the image sits inside the row */}
              <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-950 via-neutral-900 to-black md:hidden">
                <Image
                  src={p.image}
                  alt={`${p.title}, ${p.category}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover"
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Call to action */}
        <div className="mt-24 flex flex-col items-start gap-6 md:mt-32 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            Want something like this for your business?
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-8 py-4 text-lg font-semibold text-black transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Start a project
            <ArrowUpRight
              size={20}
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </div>

      {/* Full width, outside the padded container */}
      <ProjectSkillsParallax />

      {/* One shared preview that follows the cursor (mouse only, hidden on touch screens) */}
      <motion.div
        aria-hidden
        style={{ x, y, rotate: reduce ? 0 : tilt, width: PREVIEW_W }}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.92,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden will-change-transform md:block"
      >
        <div
          style={{ height: PREVIEW_H }}
          className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-emerald-950 via-neutral-900 to-black shadow-[0_30px_80px_-20px_rgba(16,185,129,0.4)]"
        >
          {projects.map((p) => (
            <Image
              key={p.id}
              src={p.image}
              alt=""
              fill
              sizes={`${PREVIEW_W}px`}
              className={`object-cover transition-opacity duration-300 ${
                active === p.id ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
