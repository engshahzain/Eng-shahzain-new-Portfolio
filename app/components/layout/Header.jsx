"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

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
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-md"
          aria-label="Home - Muhammad Shahzain"
        >
          <div className="relative w-11 h-11 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/android-chrome-192x192.png"
              alt="Shahzain Logo"
              fill
              priority
              sizes="44px"
              className="object-contain"
            />
          </div>

          <span className="text-lg font-semibold tracking-tight text-white">
            Shahzain<span className="text-purple-400">.</span>
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
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-md px-2 py-1"
            >
              {link.name}

              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="group flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            Initialize Project
            <motion.span
              className="inline-flex"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
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
                className="mt-4 flex items-center justify-center gap-2 bg-white text-black px-5 py-4 rounded-xl text-base font-bold w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Initialize Project
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
