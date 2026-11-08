"use client";

import Link from "next/link";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState("");

  // Simple clock to show your local time (Pakistan Standard Time)
  useEffect(() => {
    const updateTime = () => {
      const pKTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(pKTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative w-full bg-black text-white pt-24 pb-8 px-6 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Top Section: Links & Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-24">
          {/* Column 1: Brand & Status */}
          <div className="flex flex-col items-start">
            {/* Geometric SVG Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex items-center justify-center w-8 h-8 overflow-hidden">
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-emerald-400"
                >
                  <path
                    d="M12 28L20 20L12 12"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M28 12L20 20L28 28"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 4V12"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 28V36"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-widest uppercase text-white">
                Enigma Systems
              </span>
            </div>

            <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-6">
              Computer Engineer specializing in high-performance web
              applications, AI integrations, and full-stack architecture.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-emerald-400" />
                <span>Punjab, PK</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-400" />
                <span>{time || "Loading..."} (PKT)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col items-start md:items-center">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-xs">
              Directory
            </h4>
            <div className="flex flex-col gap-4 text-gray-400">
              <Link
                href="/work"
                className="hover:text-white hover:translate-x-1 transition-all"
              >
                Selected Work
              </Link>
              <Link
                href="/stack"
                className="hover:text-white hover:translate-x-1 transition-all"
              >
                Stack & Expertise
              </Link>
              <Link
                href="/about"
                className="hover:text-white hover:translate-x-1 transition-all"
              >
                The Architect
              </Link>
              <Link
                href="/contact"
                className="hover:text-white hover:translate-x-1 transition-all"
              >
                Initialize Project
              </Link>
            </div>
          </div>

          {/* Column 3: Social & Network */}
          <div className="flex flex-col items-start md:items-end">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-xs">
              Network
            </h4>
            <div className="flex flex-col gap-4 text-gray-400 items-start md:items-end">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 hover:text-white transition-colors"
              >
                GitHub{" "}
                <ArrowUpRight
                  size={14}
                  className="group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 hover:text-white transition-colors"
              >
                LinkedIn{" "}
                <ArrowUpRight
                  size={14}
                  className="group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 hover:text-white transition-colors"
              >
                Twitter / X{" "}
                <ArrowUpRight
                  size={14}
                  className="group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Tech Badge */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 text-gray-500 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span>
              © {new Date().getFullYear()} Enigma Systems / Engr Muhammmad
              Shahzain
            </span>
            <span className="hidden md:inline">All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2 uppercase tracking-widest">
            <span>Engineered in</span>
            <span className="text-white font-semibold border border-white/20 px-2 py-1 rounded bg-white/5">
              Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
