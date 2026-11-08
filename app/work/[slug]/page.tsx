"use client";

import { use, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";

// Import your centralized data
import { projects } from "../../components/data/projects";

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

/**
 * EFFECT 1: Expanding reveal.
 * The image starts as a framed card and opens up to fill the whole screen while
 * the picture inside zooms out slightly. The section is pinned (CSS sticky) for
 * the length of the effect. Only clip-path and transform change, no layout work.
 */
function HeroReveal({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const clip = useTransform(
    scrollYProgress,
    [0, 0.75],
    ["inset(24% 2% 24% 2% round 32px)", "inset(0% 0% 0% 0% round 0px)"],
  );
  const zoom = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  // No motion: show a normal framed image
  if (reduce) {
    return (
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-950 via-neutral-900 to-black md:aspect-[21/9]">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          style={{ clipPath: clip }}
          className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-neutral-900 to-black will-change-[clip-path]"
        >
          <motion.div
            style={{ scale: zoom }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * EFFECT 2: Stacked gallery.
 * Each image pins to the screen. The next one slides over it while the one
 * underneath shrinks and darkens a little, like a deck of cards.
 * Only transform and opacity change.
 */
function StackCard({
  src,
  alt,
  index,
  total,
  progress,
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const target = 1 - (total - 1 - index) * 0.05; // the last card stays full size
  const scale = useTransform(progress, [index / total, 1], [1, target]);
  const dim = useTransform(
    progress,
    [index / total, 1],
    [0, index === total - 1 ? 0 : 0.55],
  );

  return (
    <div className="sticky top-0 flex h-[100svh] items-center justify-center px-4 md:px-6">
      <motion.div
        style={{ scale, top: `calc(-2svh + ${index * 24}px)` }}
        className="relative h-[72svh] w-full max-w-[1400px] origin-top overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-950 via-neutral-900 to-black will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1400px) 100vw, 1400px"
          className="object-cover"
        />
        <motion.div
          aria-hidden
          style={{ opacity: dim }}
          className="absolute inset-0 bg-black"
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white/80">
          {index + 1} of {total}
        </span>
      </motion.div>
    </div>
  );
}

function StackGallery({ title, images }: { title: string; images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // No motion: a plain list of images
  if (reduce) {
    return (
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 md:px-6">
        {images.map((img, i) => (
          <div
            key={`${img}-${i}`}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 md:aspect-[16/9]"
          >
            <Image
              src={img}
              alt={`${title}, image ${i + 1} of ${images.length}`}
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref}>
      {images.map((img, i) => (
        <StackCard
          key={`${img}-${i}`}
          src={img}
          alt={`${title}, image ${i + 1} of ${images.length}`}
          index={i}
          total={images.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

export default function ProjectDetail({ params }: ProjectDetailProps) {
  // Unwrap params (Next.js 15)
  const resolvedParams = use(params);
  const reduce = useReducedMotion();

  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  // EFFECT 3: the title drifts up slower than the page, so it sits "behind" the image
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(
    headerProgress,
    [0, 1],
    reduce ? ["0px", "0px"] : ["0px", "90px"],
  );

  const projectIndex = projects.findIndex(
    (p) => p.slug === resolvedParams.slug,
  );
  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];

  // Loop back to the first project after the last one
  const nextProject =
    projects[projectIndex === projects.length - 1 ? 0 : projectIndex + 1];

  const titleWords = project.title.split(" ");

  return (
    <article className="min-h-screen bg-black text-white selection:bg-emerald-400 selection:text-black">
      {/* Reading progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: reduce ? 0 : progress }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-emerald-400"
      />

      {/* Back link */}
      <nav className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pt-8 md:px-6">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <ArrowLeft
            size={16}
            aria-hidden
            className="transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
          />
          All projects
        </Link>
      </nav>

      {/* Title and key facts */}
      <header
        ref={headerRef}
        className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-16 md:px-6 md:pb-24 md:pt-24"
      >
        <p className="mb-6 text-base font-medium text-emerald-300 md:text-lg">
          {project.category}
        </p>

        <motion.div style={{ y: titleY }} className="will-change-transform">
          {/* One orchestrated moment: each word slides up from behind a mask */}
          <h1 className="text-[clamp(3rem,11vw,10rem)] font-semibold leading-[0.95] tracking-tighter">
            {titleWords.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom"
              >
                <motion.span
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-16 md:grid-cols-4">
          <div className="border-t border-white/20 pt-4">
            <dt className="text-sm text-white/60">Client</dt>
            <dd className="mt-1 text-lg font-medium">{project.client}</dd>
          </div>
          <div className="border-t border-white/20 pt-4">
            <dt className="text-sm text-white/60">My role</dt>
            <dd className="mt-1 text-lg font-medium">{project.role}</dd>
          </div>
          <div className="border-t border-white/20 pt-4">
            <dt className="text-sm text-white/60">Year</dt>
            <dd className="mt-1 text-lg font-medium">{project.year}</dd>
          </div>
          <div className="border-t border-white/20 pt-4">
            <dt className="text-sm text-white/60">Live site</dt>
            <dd className="mt-1 text-lg font-medium">
              {project.link !== "#" ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-emerald-300 transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  Visit the site
                  <ExternalLink
                    size={16}
                    aria-hidden
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <span className="text-white/60">Not online</span>
              )}
            </dd>
          </div>
        </dl>
      </header>

      {/* Effect 1: the image opens up to full screen */}
      <HeroReveal src={project.heroImage} alt={`${project.title} overview`} />

      {/* Story */}
      <div className="mx-auto w-full max-w-[1400px] px-4 pt-16 md:px-6 md:pt-24">
        <section
          aria-labelledby="overview-heading"
          className="grid gap-8 border-t border-white/10 py-16 md:py-24 lg:grid-cols-12 lg:gap-12"
        >
          <h2
            id="overview-heading"
            className="text-xl font-medium text-white/60 lg:sticky lg:top-28 lg:col-span-3 lg:self-start"
          >
            Overview
          </h2>
          <p className="text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl lg:col-span-9">
            {project.overview}
          </p>
        </section>

        <section
          aria-labelledby="problem-heading"
          className="grid gap-8 border-t border-white/10 py-16 md:py-24 lg:grid-cols-12 lg:gap-12"
        >
          <h2
            id="problem-heading"
            className="text-xl font-medium text-white/60 lg:sticky lg:top-28 lg:col-span-3 lg:self-start"
          >
            The problem
          </h2>
          <p className="max-w-3xl text-xl leading-relaxed text-white/70 md:text-3xl md:leading-snug lg:col-span-9">
            {project.problem}
          </p>
        </section>

        <section
          aria-labelledby="solution-heading"
          className="grid gap-8 border-t border-white/10 py-16 md:py-24 lg:grid-cols-12 lg:gap-12"
        >
          <h2
            id="solution-heading"
            className="text-xl font-medium text-emerald-300 lg:sticky lg:top-28 lg:col-span-3 lg:self-start"
          >
            What I built
          </h2>
          <p className="max-w-3xl border-l-2 border-emerald-400 pl-6 text-xl leading-relaxed text-white md:pl-8 md:text-3xl md:leading-snug lg:col-span-9">
            {project.solution}
          </p>
        </section>
      </div>

      {/* Effect 2: gallery as a stack of cards */}
      {project.gallery && project.gallery.length > 0 && (
        <section
          aria-label={`${project.title} gallery`}
          className="mt-8 md:mt-16"
        >
          <StackGallery title={project.title} images={project.gallery} />
        </section>
      )}

      {/* Tech */}
      <section
        aria-labelledby="tech-heading"
        className="mx-auto mt-24 w-full max-w-[1400px] px-4 md:mt-40 md:px-6"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <h2
            id="tech-heading"
            className="text-xl font-medium text-white/60 lg:col-span-3"
          >
            Built with
          </h2>
          <ul className="grid grid-cols-2 gap-x-6 md:grid-cols-3 lg:col-span-9">
            {project.tech.map((technology) => (
              <li
                key={technology}
                className="border-t border-white/15 py-4 text-lg font-medium md:text-2xl"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Call to action */}
      <section className="mx-auto mt-24 w-full max-w-[1400px] px-4 md:mt-40 md:px-6">
        <div className="flex flex-col items-start gap-6 border-t border-white/10 pt-16 md:flex-row md:items-center md:justify-between md:pt-24">
          <p className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            Want a result like this for your business?
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
      </section>

      {/* Next project: its image fades in behind the title on hover */}
      <Link
        href={`/work/${nextProject.slug}`}
        className="group relative mt-24 block overflow-hidden border-t border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400 md:mt-40"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-30 group-focus-visible:opacity-30 motion-reduce:transition-none"
        >
          <Image
            src={nextProject.heroImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-8 px-4 py-20 md:flex-row md:items-end md:px-6 md:py-32">
          <div>
            <p className="mb-4 text-base font-medium text-white/60">
              Next project
            </p>
            <p className="text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.95] tracking-tighter transition-colors duration-500 group-hover:text-emerald-300 motion-reduce:transition-none">
              {nextProject.title}
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
    </article>
  );
}
