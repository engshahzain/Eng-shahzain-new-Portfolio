"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Layer = {
  title: string;
  description: string;
  technologies: string[];
};

// The stack, from what people see down to where it runs
const layers: Layer[] = [
  {
    title: "Interfaces",
    description:
      "Interactive screens that feel fast and meet WCAG accessibility standards.",
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
    ],
  },
  {
    title: "Servers and data",
    description:
      "Custom APIs, data pipelines and secure servers, managed from the command line.",
    technologies: [
      "Node.js",
      "Express",
      "Prisma",
      "MongoDB",
      "SQLite",
      "RESTful APIs",
      "WebSockets",
    ],
  },
  {
    title: "Stores",
    description:
      "Native and headless Shopify storefronts, built to handle large product catalogs.",
    technologies: [
      "Shopify Plus",
      "Liquid",
      "Storefront API",
      "Admin GraphQL API",
      "Shopify App CLI",
    ],
  },
  {
    title: "AI and hardware",
    description:
      "Connecting language models and hardware to dependable web applications.",
    technologies: [
      "Google Gemini API",
      "Anthropic Claude API",
      "Hardware Integration",
      "Desktop Apps (Electron)",
    ],
  },
  {
    title: "Hosting",
    description:
      "I set up and run my own servers, so clients keep full control of their data.",
    technologies: [
      "Ubuntu Linux",
      "PM2 Process Management",
      "Oracle Cloud (VPS)",
      "Contabo VPS",
      "Git & GitHub Actions",
      "VS Code",
    ],
  },
];

const tools = [
  {
    name: "Enigma AI Alt Text",
    status: "Live on the Shopify App Store",
    live: true,
    description:
      "A production Shopify app that connects the Shopify Admin API to Gemini AI and writes SEO-friendly image alt text for large catalogs.",
    href: "https://apps.shopify.com/enigma-alt-text-generator",
    cta: "View on the App Store",
  },
  {
    name: "vscode-ghost",
    status: "In development",
    live: false,
    description:
      "A VS Code extension that suggests code as you type, using the Anthropic Claude API, with support for many languages.",
    note: "Repository not public yet",
  },
  {
    name: "ZainUI",
    status: "In development",
    live: false,
    description:
      "A customizable React component library built with Tailwind CSS and React-Icons, with built-in Prism syntax highlighting.",
    note: "Documentation coming soon",
  },
];

// Scroll layout of the pinned stage: the first 15% opens the stack,
// the remaining 85% is shared equally between the layers.
const OPEN_END = 0.15;

/** One plate in the stack. Only transform changes while scrolling. */
function Plate({
  index,
  total,
  gap,
  active,
}: {
  index: number;
  total: number;
  gap: MotionValue<number>;
  active: boolean;
}) {
  const y = useTransform(gap, (g) => `${g * index}svh`);

  return (
    <motion.div
      aria-hidden
      style={{ y, zIndex: total - index }}
      className="absolute inset-x-0 top-0 flex justify-center will-change-transform"
    >
      <div
        className={`transition-transform duration-500 ease-out motion-reduce:transition-none ${
          active ? "-translate-y-[2.5svh]" : ""
        }`}
      >
        <div
          style={{ transform: "perspective(1000px) rotateX(58deg)" }}
          className={`h-[24svh] w-[min(78vw,440px)] rounded-2xl border transition-[border-color,background-color,box-shadow] duration-500 motion-reduce:transition-none ${
            active
              ? "border-emerald-400 bg-emerald-950 shadow-[0_0_60px_-10px_rgba(52,211,153,0.6)]"
              : "border-white/20 bg-neutral-950"
          }`}
        />
      </div>
    </motion.div>
  );
}

function PinnedStack() {
  const stageRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // Space between plates grows as the stack opens
  const gap = useTransform(scrollYProgress, [0, OPEN_END], [1.6, 11.5]);

  // State changes only when the layer changes (5 times in total), not on every scroll frame
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const raw = Math.floor(((v - OPEN_END) / (1 - OPEN_END)) * layers.length);
    const next = Math.min(layers.length - 1, Math.max(0, raw));
    setActive((prev) => (prev === next ? prev : next));
  });

  const goTo = (i: number) => {
    const el = stageRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const target =
      top + travel * (OPEN_END + ((i + 0.5) / layers.length) * (1 - OPEN_END));
    window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      ref={stageRef}
      aria-label="The stack, layer by layer"
      className="relative h-[600svh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-4 pb-6 pt-20 md:px-6">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-4 lg:grid-cols-12 lg:gap-12">
          {/* The stack of plates */}
          <div className="relative h-[34svh] lg:col-span-5 lg:h-[62svh]">
            <div className="absolute inset-x-0 top-0 h-[62svh] origin-top scale-[0.55] lg:scale-100">
              {layers.map((layer, i) => (
                <Plate
                  key={layer.title}
                  index={i}
                  total={layers.length}
                  gap={gap}
                  active={i === active}
                />
              ))}
            </div>
          </div>

          {/* Details of the active layer */}
          <div className="lg:col-span-7">
            <nav aria-label="Jump to a layer" className="mb-8 hidden lg:block">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {layers.map((layer, i) => (
                  <li key={layer.title}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active ? "true" : undefined}
                      className={`text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                        i === active
                          ? "text-emerald-300"
                          : "text-white/55 hover:text-white"
                      }`}
                    >
                      {layer.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="mb-3 text-sm font-medium text-emerald-300 lg:hidden">
              Layer {active + 1} of {layers.length}
            </p>

            {/* All five panels stay in the page, stacked in one cell. Only the active one is visible. */}
            <div className="grid">
              {layers.map((layer, i) => (
                <div
                  key={layer.title}
                  className={`col-start-1 row-start-1 transition-[opacity,transform] duration-500 motion-reduce:transition-none ${
                    i === active
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                >
                  <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                    {layer.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 md:text-xl">
                    {layer.description}
                  </p>
                  <ul className="mt-6 grid grid-cols-2 gap-x-6 md:mt-10">
                    {layer.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="border-t border-white/15 py-2.5 text-base font-medium md:py-3.5 md:text-2xl"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Reduced motion: the same content as a plain list, no pinning */
function StaticStack() {
  return (
    <section
      aria-label="The stack, layer by layer"
      className="mx-auto w-full max-w-7xl px-4 md:px-6"
    >
      {layers.map((layer) => (
        <div
          key={layer.title}
          className="grid gap-8 border-t border-white/10 py-16 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-5">
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              {layer.title}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
              {layer.description}
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 self-start lg:col-span-7">
            {layer.technologies.map((tech) => (
              <li
                key={tech}
                className="border-t border-white/15 py-3 text-lg font-medium md:text-2xl"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export default function StackPage() {
  const reduce = useReducedMotion();
  const titleWords = ["Stack", "and", "expertise"];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-400 selection:text-black">
      {/* Header */}
      <header className="mx-auto w-full max-w-7xl px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-40">
        {/* One orchestrated moment: each word slides up from behind a mask */}
        <h1 className="text-[clamp(3.25rem,12vw,11rem)] font-semibold leading-[0.95] tracking-tighter">
          {titleWords.map((word, i) => (
            <span
              key={word}
              className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom"
            >
              <motion.span
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12 md:items-end">
          <p className="max-w-2xl text-lg leading-relaxed text-white/70 md:col-span-8 md:text-2xl md:leading-relaxed">
            I am a computer engineer, so I work across the whole stack: the
            screen, the server, the store and the machine it all runs on.
          </p>
          <p className="text-sm text-white/55 md:col-span-4 md:text-right">
            Scroll to open the stack, one layer at a time.
          </p>
        </div>
      </header>

      {/* The stack: pinned and scroll-driven, or a plain list for reduced motion */}
      {reduce ? <StaticStack /> : <PinnedStack />}

      {/* Software and tools */}
      <section
        aria-labelledby="tools-heading"
        className="mx-auto mt-24 w-full max-w-7xl px-4 md:mt-40 md:px-6"
      >
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <h2
            id="tools-heading"
            className="text-4xl font-semibold leading-[1.05] tracking-tight md:col-span-8 md:text-6xl"
          >
            Software I ship, and tools I am building.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white/70 md:col-span-4 md:text-lg">
            One is already used by real stores. The others are still in
            progress.
          </p>
        </div>

        <ul className="mt-14 md:mt-20">
          {tools.map((tool) => (
            <li
              key={tool.name}
              className="group relative border-t border-white/10 py-8 last:border-b md:py-12"
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 bg-emerald-400 transition-[width] duration-500 group-hover:w-full group-focus-within:w-full motion-reduce:transition-none"
              />
              <div className="grid gap-4 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-5">
                  <p className="mb-3 flex items-center gap-2 text-sm font-medium text-white/70">
                    <span
                      aria-hidden
                      className={`h-2 w-2 rounded-full ${
                        tool.live ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                    {tool.status}
                  </p>
                  <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">
                    {tool.name}
                  </h3>
                </div>

                <div className="md:col-span-7">
                  <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-xl">
                    {tool.description}
                  </p>
                  {tool.live && tool.href ? (
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 font-semibold text-emerald-300 transition-colors after:absolute after:inset-0 hover:text-emerald-200 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-emerald-400"
                    >
                      {tool.cta}
                      <ArrowUpRight size={18} aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <p className="mt-5 text-sm text-white/55">{tool.note}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Call to action */}
      <Link
        href="/contact"
        className="group relative mt-24 block border-t border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400 md:mt-40"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-4 py-20 md:flex-row md:items-end md:px-6 md:py-32">
          <div>
            <p className="mb-4 text-base font-medium text-white/60">
              Have a project in mind?
            </p>
            <p className="text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.95] tracking-tighter transition-colors duration-500 group-hover:text-emerald-300 motion-reduce:transition-none">
              Start a project
            </p>
          </div>
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors duration-500 group-hover:border-emerald-400 group-hover:bg-emerald-400 motion-reduce:transition-none md:h-20 md:w-20">
            <ArrowUpRight
              size={28}
              aria-hidden
              className="text-white transition-colors duration-500 group-hover:text-black"
            />
          </span>
        </div>
      </Link>
    </div>
  );
}
