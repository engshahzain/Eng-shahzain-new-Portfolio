"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Tilt strength in degrees. Lower = more subtle.
const MAX_TILT = 4;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  // Motion values update transforms directly (no React re-renders = no lag)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 140, damping: 22, mass: 0.4 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]);
  // Person shifts a few px opposite to the tilt for a soft parallax feel
  const personX = useTransform(sx, [-0.5, 0.5], [10, -10]);

  const canTilt = (e: React.PointerEvent) =>
    !reduceMotion && e.pointerType === "mouse";

  const handleEnter = (e: React.PointerEvent) => {
    if (!canTilt(e)) return;
    rectRef.current = cardRef.current?.getBoundingClientRect() ?? null;
  };

  const handleMove = (e: React.PointerEvent) => {
    const rect = rectRef.current;
    if (!rect || !canTilt(e)) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
    rectRef.current = null;
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-4 pb-12 pt-28 text-white md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl [perspective:1400px]"
      >
        <motion.div
          ref={cardRef}
          onPointerEnter={handleEnter}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          style={{
            rotateX: reduceMotion ? 0 : rotateX,
            rotateY: reduceMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative h-[calc(100svh-9rem)] max-h-[780px] min-h-[660px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_40px_120px_-30px_rgba(16,185,129,0.35)] will-change-transform"
        >
          {/* Soft emerald light behind the person (static CSS, no cost) */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_50%_30%,rgba(16,185,129,0.35),transparent_70%)]"
          />

          {/* Person: transparent cutout, anchored to the top so the face is always clear */}
          <motion.div
            style={{ x: reduceMotion ? 0 : personX }}
            className="absolute inset-x-0 top-0 h-[78%]"
          >
            <Image
              src="/shahzain-cutout.webp"
              alt="M. Shahzain, Computer Engineer"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain object-top"
            />
          </motion.div>

          {/* Fade into black so the text sits on a calm, readable area */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-black via-black/90 to-transparent"
          />

          {/* Text floats slightly in front of the photo for subtle depth */}
          <div
            style={{ transform: "translateZ(40px)" }}
            className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-8 text-center md:px-12 md:pb-10"
          >
            <p className="mb-3 text-sm font-medium text-emerald-300 md:text-base">
              M. Shahzain, Computer Engineer
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              I engineer scalable systems
            </h1>

            <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-white/75 md:text-lg">
              I turn business bottlenecks into fast web applications, using
              Next.js, AI integrations and headless Shopify.
            </p>

            <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <a
                href="/work"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-7 py-3.5 font-semibold text-black transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
              >
                View Projects
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="/stack"
                className="w-full rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-center font-semibold text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
              >
                Explore stack
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
