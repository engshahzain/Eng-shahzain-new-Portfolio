"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

// Simplified and meaningful routing as requested
const navLinks = [
  { name: "Selected Work", href: "/work" },
  { name: "Stack & Expertise", href: "/stack" },
  { name: "The Architect", href: "/about" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-lg border-b border-white/10 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo - Interlocking Geometric Design for Engineering */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md"
          aria-label="Home - M. Shahzain"
        >
          <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden">
            {/* Abstract geometric 'S' representing Shahzain / Systems */}
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-emerald-400 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
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
          {/* Optional subtle text for brand reinforcement, hidden on smallest mobile screens */}
          <span className="hidden sm:block font-bold tracking-widest text-sm uppercase text-white/90">
            Enigma Systems
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-2 py-1"
            >
              {link.name}
              {/* Subtle hover underline */}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTA Button (Desktop) */}
        <div className="hidden md:block">
          <Link href="/contact" tabIndex={-1}>
            <motion.button
              whileHover="hover"
              className="flex items-center cursor-p gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Initialize Project
              <motion.span
                variants={{
                  hover: { x: 4 },
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-black/95 border-b border-white/10"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-bold tracking-tight text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-4 flex items-center cursor-pointer justify-center gap-2 bg-white text-black px-5 py-4 rounded-xl text-base font-bold w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Initialize Project <ArrowRight size={18} />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
