"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const statement =
  "I started at the hardware level, with embedded systems and servers. Now I bring that discipline to the web, building fast, reliable software for businesses.";

const principles = [
  {
    title: "Control the whole stack.",
    text: "I do not like black boxes. I build custom Node.js and Next.js systems and host them on my own Linux servers when it makes sense, so clients get good performance and keep control of their data.",
  },
  {
    title: "Build to a global standard.",
    text: "I use TypeScript for reliable code, proven patterns, and WCAG accessibility checks, so what I ship holds up for any customer, anywhere.",
  },
];

const path = [
  {
    when: "2025 to now",
    current: true,
    title: "Shopify Developer, Enigma Systems",
    text: "I build custom Shopify themes and apps for client stores, and test them against WCAG. I also build my own software, including Enigma ERP and the Enigma AI Alt Text app.",
  },
  {
    when: "2022 to 2026",
    current: false,
    title: "BSc Computer Engineering, Bahauddin Zakariya University",
    text: "Systems, algorithms and hardware. My final year project is BZU-ARIA, a voice-controlled robot that answers university questions.",
  },
];

const offTheClock = [
  {
    title: "Giving old hardware a second life",
    text: "I walk the electronics markets in Multan and repurpose legacy hardware.",
  },
  {
    title: "Cinematic history",
    text: "I produce cinematic videos about historical stories.",
  },
  {
    title: "Open source",
    text: "I build developer tools and share them with the wider engineering community.",
  },
];

/** One word of the statement. Only opacity changes, so it is cheap to animate. */
function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0.18, 1],
  );
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

function ScrollStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = statement.split(" ");
  const className =
    "mx-auto max-w-6xl text-3xl font-semibold leading-[1.15] tracking-tight md:text-6xl";

  if (reduce) {
    return <p className={className}>{statement}</p>;
  }

  return (
    <p ref={ref} className={className} aria-label={statement}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          word={word}
          index={i}
          total={words.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

export default function AboutPage() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Scroll depth: the big name drifts more slowly than the page
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0px", "0px"] : ["0px", "160px"],
  );

  // Minimal 3D: the mouse position (-0.5 to 0.5) tilts the portrait a few degrees
  // and shifts each layer by a different amount, so the layers separate in depth.
  // Touch devices and reduced-motion users get the static version.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 110, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 110, damping: 20, mass: 0.4 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const nameX = useTransform(sx, [-0.5, 0.5], [22, -22]); // furthest back, moves most
  const archX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const glowX = useTransform(sx, [-0.5, 0.5], [-28, 28]);

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-black text-white selection:bg-emerald-400 selection:text-black">
      {/* Hero: name and arch sit behind the portrait */}
      <header
        ref={heroRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-24"
      >
        {/* Soft light behind the person */}
        <motion.div
          aria-hidden
          style={{ x: reduce ? 0 : glowX }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_55%_at_50%_45%,rgba(16,185,129,0.32),transparent_70%)]"
        />

        {/* Sized by the portrait, so the name always lines up with the head */}
        <div className="relative mx-auto aspect-[1088/1445] h-[min(80svh,130vw)]">
          {/* Layer 1 (back): arch. A light backdrop so the black gown does not melt into the page */}
          <motion.div
            aria-hidden
            style={{ x: reduce ? 0 : archX }}
            className="absolute inset-x-[4%] bottom-0 top-[9%] z-0 rounded-t-full border border-white/10 bg-gradient-to-b from-emerald-400/25 via-emerald-500/10 to-transparent"
          />

          {/* Layer 2: the name. The outer div centres it, the inner one moves */}
          <div className="absolute inset-x-0 top-[20%] z-[1] flex -translate-y-1/2 justify-center">
            <motion.div
              style={{ x: reduce ? 0 : nameX, y: nameY }}
              className="will-change-transform"
            >
              <motion.h1
                initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="whitespace-nowrap text-[clamp(5rem,18vw,17rem)] font-semibold leading-none tracking-tighter"
              >
                <span className="sr-only">M. </span>
                Shahzain
              </motion.h1>
            </motion.div>
          </div>

          {/* Layer 3 (front): the portrait, tilting with the mouse */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-10"
          >
            <motion.div
              style={
                reduce
                  ? undefined
                  : { rotateX, rotateY, transformPerspective: 1100 }
              }
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src="https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/shahzain-cutout.webp"
                alt="M. Shahzain, computer engineer, in his graduation gown and cap, holding his diploma"
                fill
                priority
                sizes="(max-width: 768px) 85vw, 560px"
                className="object-contain object-bottom"
              />
            </motion.div>
          </motion.div>

          {/* Fades the cropped bottom of the portrait into the page */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 z-20 h-[18%] bg-gradient-to-t from-black to-transparent"
          />
        </div>

        {/* Corner captions, desktop only */}
        <p className="absolute bottom-8 left-6 z-30 hidden max-w-[14rem] text-sm leading-relaxed text-white/70 md:block">
          Computer engineer
          <br />
          Multan, Pakistan
        </p>
        <p className="absolute bottom-8 right-6 z-30 hidden max-w-[14rem] text-right text-sm leading-relaxed text-white/70 md:block">
          Shopify developer
          <br />
          Enigma Systems
        </p>
      </header>

      {/* Statement: words light up as you scroll */}
      <section aria-label="In short" className="px-4 py-24 md:px-6 md:py-44">
        <ScrollStatement />
      </section>

      {/* Story */}
      <section
        aria-labelledby="story-heading"
        className="mx-auto grid w-full max-w-7xl gap-8 border-t border-white/10 px-4 py-16 md:px-6 md:py-28 lg:grid-cols-12 lg:gap-12"
      >
        <h2
          id="story-heading"
          className="text-xl font-medium text-white/60 lg:sticky lg:top-28 lg:col-span-4 lg:self-start"
        >
          How I got here
        </h2>
        <div className="max-w-3xl space-y-8 text-xl leading-relaxed text-white/75 md:text-2xl md:leading-relaxed lg:col-span-8">
          <p>
            I am <span className="font-medium text-white">M. Shahzain</span>, a
            computer engineer from Multan, Pakistan. I did not start by dragging
            web components around. I started with how computers actually work:
            the physics of computation, embedded systems and bare-metal servers.
          </p>
          <p>
            Today I use that discipline on the web. I build Shopify stores and
            apps, AI-powered software and business systems, including an ERP,
            that take slow, manual work off a company&apos;s plate. I work
            remotely, with clients worldwide.
          </p>
        </div>
      </section>

      {/* How I work */}
      <section
        aria-labelledby="work-heading"
        className="mx-auto w-full max-w-7xl px-4 md:px-6"
      >
        <h2
          id="work-heading"
          className="mb-10 text-xl font-medium text-white/60 md:mb-14"
        >
          How I work
        </h2>
        <ul>
          {principles.map((p) => (
            <li
              key={p.title}
              className="grid gap-4 border-t border-white/10 py-10 last:border-b md:py-16 lg:grid-cols-12 lg:gap-12"
            >
              <h3 className="text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:col-span-7">
                {p.title}
              </h3>
              <p className="text-base leading-relaxed text-white/70 md:text-xl lg:col-span-5">
                {p.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Path */}
      <section
        aria-labelledby="path-heading"
        className="mx-auto mt-24 w-full max-w-7xl px-4 md:mt-40 md:px-6"
      >
        <h2
          id="path-heading"
          className="mb-10 text-xl font-medium text-white/60 md:mb-14"
        >
          My path so far
        </h2>
        <ul>
          {path.map((item) => (
            <li
              key={item.title}
              className="grid gap-3 border-t border-white/10 py-10 last:border-b md:py-14 lg:grid-cols-12 lg:gap-12"
            >
              <p className="flex items-center gap-2 text-base font-medium text-white/70 lg:col-span-3">
                {item.current && (
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full bg-emerald-400"
                  />
                )}
                {item.when}
              </p>
              <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-4xl lg:col-span-5">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-white/70 md:text-lg lg:col-span-4">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Off the clock */}
      <section
        aria-labelledby="off-heading"
        className="mx-auto mt-24 w-full max-w-7xl px-4 md:mt-40 md:px-6"
      >
        <h2
          id="off-heading"
          className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
        >
          Away from the screen.
        </h2>
        <ul className="mt-12 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
          {offTheClock.map((item) => (
            <li
              key={item.title}
              className="border-t border-emerald-400/60 pt-5"
            >
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/70">
                {item.text}
              </p>
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
