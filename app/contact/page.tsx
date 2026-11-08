"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Loader2 } from "lucide-react";

// --- Edit these ---
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"; // Paste your Web3Forms access key
const EMAIL = "engmuhammadshahzain@gmail.com"; // Use the address you really read
const REPLY_TIME = "24 hours"; // Only promise what you will keep
const AVAILABLE = true; // Set to false to hide the "taking new projects" line
const socials = [
  { name: "LinkedIn", href: "" }, // Paste your profile URLs. Empty ones are hidden.
  { name: "GitHub", href: "" },
];

const projectTypes = [
  "A Shopify store",
  "A Shopify app",
  "A web app or ERP",
  "AI in my product",
  "Something else",
];

const titleWords = [
  "Tell",
  "me",
  "what",
  "is",
  "slow,",
  "manual",
  "or",
  "broken.",
];

type Status = "idle" | "submitting" | "success" | "error";

/** An input that sits inside a sentence and grows as you type */
function InlineInput({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  autoComplete,
  disabled,
  minCh = 8,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  label: string;
  type?: string;
  autoComplete?: string;
  disabled?: boolean;
  minCh?: number;
}) {
  return (
    <span
      className="relative inline-block max-w-full overflow-hidden align-baseline"
      style={{ minWidth: `${minCh}ch` }}
    >
      {/* Invisible copy of the text sets the width */}
      <span aria-hidden className="invisible block whitespace-pre px-1">
        {value || placeholder}
      </span>
      <input
        type={type}
        required
        aria-label={label}
        autoComplete={autoComplete}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="absolute inset-0 w-full border-b-2 border-white/30 bg-transparent px-1 text-emerald-300 placeholder:text-white/30 transition-colors focus:border-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400 disabled:opacity-60"
      />
    </span>
  );
}

export default function ContactPage() {
  const reduce = useReducedMotion();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState(""); // Hidden field that only bots fill in
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState({ name: "", email: "" });
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trap) {
      // A bot filled the hidden field: pretend it worked and send nothing
      setStatus("success");
      return;
    }
    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New project inquiry from ${name}`,
          from_name: name,
          email,
          project_type: projectType,
          message,
        }),
      });

      if (response.ok) {
        setSentTo({ name: name.split(" ")[0], email });
        setStatus("success");
        setName("");
        setEmail("");
        setProjectType("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* The link above still works if copying is blocked */
    }
  };

  const visibleSocials = socials.filter((s) => s.href);
  const submitting = status === "submitting";

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white selection:bg-emerald-400 selection:text-black">
      {/* Soft light (static gradient, no blur filter) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[70vmin] w-[120vmin] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.16),transparent_65%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-32 md:px-6 md:pt-40">
        {/* Header */}
        <header>
          {AVAILABLE && (
            <p className="mb-8 flex items-center gap-3 text-base font-medium text-white/80">
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-full bg-emerald-400"
              />
              Taking on new projects
            </p>
          )}

          {/* One orchestrated moment: each word slides up from behind a mask */}
          <h1 className="max-w-6xl text-[clamp(3rem,9vw,8.5rem)] font-semibold leading-[0.98] tracking-tighter">
            {titleWords.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom"
              >
                <motion.span
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:mt-12 md:text-2xl md:leading-relaxed">
            Stores, apps, ERP systems or AI features: if software can solve it,
            I want to hear about it. I reply to every message within{" "}
            {REPLY_TIME}.
          </p>
        </header>

        {/* The form, written as a sentence */}
        <section
          aria-label="Contact form"
          className="mt-20 border-t border-white/10 pt-16 md:mt-32 md:pt-24"
        >
          {status === "success" ? (
            <div role="status" className="max-w-3xl">
              <p className="flex items-center gap-3 text-base font-medium text-emerald-300">
                <Check size={20} aria-hidden />
                Message sent
              </p>
              <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
                Thank you{sentTo.name ? `, ${sentTo.name}` : ""}.
              </h2>
              <p className="mt-6 text-xl leading-relaxed text-white/70 md:text-2xl">
                Your message is in. I will reply
                {sentTo.email ? ` to ${sentTo.email}` : ""} within {REPLY_TIME}.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-10 text-base font-semibold text-emerald-300 underline decoration-emerald-300/40 underline-offset-4 transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-5xl">
              {/* Hidden trap for bots. People never see or reach it. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              {/* 1. Who */}
              <p className="text-2xl font-medium leading-[1.6] md:text-5xl md:leading-[1.5]">
                Hi Shahzain, I am{" "}
                <InlineInput
                  value={name}
                  onChange={setName}
                  placeholder="your name"
                  label="Your name or company"
                  autoComplete="name"
                  disabled={submitting}
                />{" "}
                and you can reach me at{" "}
                <InlineInput
                  value={email}
                  onChange={setEmail}
                  placeholder="you@company.com"
                  label="Your email address"
                  type="email"
                  autoComplete="email"
                  disabled={submitting}
                  minCh={14}
                />
                .
              </p>

              {/* 2. What kind of project */}
              <fieldset className="mt-12 md:mt-16" disabled={submitting}>
                <legend className="text-2xl font-medium md:text-5xl">
                  I need help with
                </legend>
                <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
                  {projectTypes.map((type, i) => (
                    <label key={type} className="cursor-pointer">
                      <input
                        type="radio"
                        name="projectType"
                        value={type}
                        required={i === 0}
                        checked={projectType === type}
                        onChange={() => setProjectType(type)}
                        className="peer sr-only"
                      />
                      <span className="inline-block rounded-full border border-white/25 px-5 py-3 text-base font-medium text-white/85 transition-colors hover:border-white/60 peer-checked:border-emerald-400 peer-checked:bg-emerald-400 peer-checked:text-black peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black md:px-6 md:py-3.5 md:text-lg">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* 3. The problem */}
              <div className="mt-12 md:mt-16">
                <label
                  htmlFor="message"
                  className="block text-2xl font-medium md:text-5xl"
                >
                  Here is what is slow, manual or broken:
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  disabled={submitting}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your business, your goal and your timeline."
                  className="mt-6 w-full resize-none border-b-2 border-white/30 bg-transparent px-1 pb-3 text-xl leading-relaxed text-emerald-300 placeholder:text-white/30 transition-colors focus:border-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400 disabled:opacity-60 md:text-3xl"
                />
              </div>

              {/* Errors */}
              <div aria-live="polite">
                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-8 max-w-2xl rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-base leading-relaxed text-red-200"
                  >
                    Your message did not go through. Please try again, or email
                    me directly at{" "}
                    <a
                      href={`mailto:${EMAIL}`}
                      className="font-semibold underline underline-offset-4"
                    >
                      {EMAIL}
                    </a>
                    .
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-emerald-400 px-9 py-5 text-lg font-semibold text-black transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-70 md:mt-14"
              >
                {submitting ? (
                  <>
                    <Loader2 size={22} aria-hidden className="animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowUpRight
                      size={22}
                      aria-hidden
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </>
                )}
              </button>
            </form>
          )}
        </section>

        {/* Prefer email */}
        <section
          aria-labelledby="email-heading"
          className="mt-24 border-t border-white/10 pt-16 md:mt-40 md:pt-24"
        >
          <h2 id="email-heading" className="text-xl font-medium text-white/60">
            Prefer to write directly?
          </h2>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-4 block break-all text-[clamp(1.5rem,5.2vw,4.5rem)] font-semibold leading-tight tracking-tight transition-colors hover:text-emerald-300 focus-visible:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {copied ? (
              <Check size={16} aria-hidden className="text-emerald-300" />
            ) : (
              <Copy size={16} aria-hidden />
            )}
            {copied ? "Copied" : "Copy email"}
          </button>
          <span role="status" className="sr-only">
            {copied ? "Email address copied" : ""}
          </span>

          <dl className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-8">
            <div className="border-t border-white/15 pt-5">
              <dt className="text-sm text-white/60">Based in</dt>
              <dd className="mt-2 text-xl font-medium">Multan, Pakistan</dd>
              <dd className="mt-1 text-base text-white/65">
                Working remotely with clients worldwide
              </dd>
            </div>
            <div className="border-t border-white/15 pt-5">
              <dt className="text-sm text-white/60">Reply time</dt>
              <dd className="mt-2 text-xl font-medium">Within {REPLY_TIME}</dd>
            </div>
            {visibleSocials.length > 0 && (
              <div className="border-t border-white/15 pt-5">
                <dt className="text-sm text-white/60">Elsewhere</dt>
                <dd className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xl font-medium">
                  {visibleSocials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      {s.name}
                      <ArrowUpRight size={16} aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </section>
      </div>
    </div>
  );
}
