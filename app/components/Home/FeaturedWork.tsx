"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Server, Search, Download } from "lucide-react";

// Import your centralized projects data
import { projects } from "../data/projects";

// Pick the top 3 featured projects for the homepage
const featuredSlugs = ["enigma-alt-text-generator", "puregrubs"];
// Note: You can add an enigma-erp slug to your projects.ts array if you want it featured here too,
// or select any 3 items from your central list.

export default function FeaturedWork() {
  // Filter or take the first 3 projects from your central data file
  const featuredProjects = projects.slice(0, 3);

  return (
    <section
      className="relative w-full bg-black text-white py-32 px-6"
      id="work"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-emerald-500"></div>
              <span className="text-emerald-400 text-sm font-semibold tracking-[0.2em] uppercase">
                Selected Architecture
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Featured Case Studies
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm md:text-right text-sm md:text-base leading-relaxed">
            A look at how I translate complex engineering challenges into
            scalable, high-performance software solutions.
          </p>
        </motion.div>

        {/* Project Rows */}
        <div className="flex flex-col gap-32">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Project Image (50% width) */}
              <div className="w-full lg:w-1/2">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group bg-white/5">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle overlay for contrast */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>

              {/* Project Content (50% width) */}
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <span className="text-gray-500 font-mono text-xl mb-4">
                  {project.id}
                </span>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-emerald-400 font-medium tracking-wide text-sm uppercase">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-8">
                  {project.title}
                </h3>

                {/* Problem vs Solution Block */}
                <div className="flex flex-col gap-6 mb-8 w-full">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
                      The Bottleneck
                    </h4>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                    <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
                      The Solution
                    </h4>
                    <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 border border-white/20 rounded-full text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Case Study Link pointing to dynamic /work/[slug] route */}
                <Link
                  href={`/work/${project.slug}`}
                  className="group flex items-center gap-2 text-white font-semibold hover:text-emerald-400 transition-colors"
                >
                  Read Full Case Study
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
