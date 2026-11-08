"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";

// --- Edit these ---
// Put your Web3Forms key in .env.local as NEXT_PUBLIC_WEB3FORMS_KEY=your-key
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const EMAIL = "engmuhammadshahzain@gmail.com"; // Use the address you really read
const REPLY_TIME = "24 hours"; // Only promise what you will keep
const AVAILABLE = true; // Set to false to hide the "taking new projects" line

const projectTypes = [
  "A Shopify store",
  "A Shopify app",
  "A web app or ERP",
  "AI in my product",
  "Something else",
];

const facts = [
  {
    label: "Studied",
    value:
      "BSc Computer Engineering, Bahauddin Zakariya University, 2022 to 2026",
  },
  {
    label: "Based in",
    value: "Multan, Pakistan, working remotely with clients worldwide",
  },
  {
    label: "Right now",
    value: "Shopify Developer at Enigma Systems",
  },
];

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full border-b-2 border-white/30 bg-transparent px-1 py-3 text-xl text-white placeholder:text-white/30 transition-colors focus:border-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400 disabled:opacity-60 md:text-2xl";

export default function ContactCTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState(""); // Hidden field that only bots fill in
  const [status, setStatus] = useState<Status>("idle");
  const [sentName, setSentName] = useState("");

  const submitting = status === "submitting";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trap) {
      // A bot filled the hidden field: pretend it worked and send nothing
      setStatus("success");
      return;
    }
    if (!WEB3FORMS_KEY) {
      setStatus("error");
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
        setSentName(name.split(" ")[0]);
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

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-black px-4 pb-16 pt-24 text-white md:px-6 md:pb-24 md:pt-40"
    >
      {/* Soft light at the bottom (static gradient, no blur filter) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[50vmin] w-[110vmin] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.16),transparent_65%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        {/* About, short version */}
        <div
          aria-labelledby="about-heading"
          role="group"
          className="grid gap-8 lg:grid-cols-12 lg:gap-12"
        >
          <h2
            id="about-heading"
            className="text-xl font-medium text-white/60 lg:col-span-3"
          >
            Behind the code
          </h2>
          <div className="lg:col-span-9">
            <p className="max-w-4xl text-2xl font-medium leading-[1.25] tracking-tight md:text-4xl">
              I am Engr Muhammad Shahzain, a computer engineer who builds
              Shopify stores, apps and web software for businesses. I want it
              fast, I want it to work for every customer, and I want it to keep
              working after I hand it over.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Outside client work I build developer tools, including a VS Code
              extension and a React component library.
            </p>

            <dl className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
              {facts.map((fact) => (
                <div key={fact.label} className="border-t border-white/15 pt-4">
                  <dt className="text-sm text-white/60">{fact.label}</dt>
                  <dd className="mt-2 text-base leading-relaxed md:text-lg">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-2 text-lg font-semibold transition-colors hover:text-emerald-300 focus-visible:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              More about me
              <ArrowUpRight
                size={20}
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-24 grid gap-14 border-t border-white/10 pt-16 md:mt-40 md:pt-24 lg:grid-cols-12 lg:gap-12">
          {/* Left: the pitch */}
          <div className="lg:col-span-5">
            {AVAILABLE && (
              <p className="mb-6 flex items-center gap-3 text-base font-medium text-white/80">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rounded-full bg-emerald-400"
                />
                Taking on new projects
              </p>
            )}
            <h2
              id="contact-heading"
              className="text-5xl font-semibold leading-[0.98] tracking-tighter md:text-7xl"
            >
              Have something slow, manual or broken?
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
              Tell me about it. I reply to every message within {REPLY_TIME}.
            </p>
            <p className="mt-10 text-sm text-white/60">Prefer email?</p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-1 block break-all text-xl font-medium underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 md:text-2xl"
            >
              {EMAIL}
            </a>
          </div>

          {/* Right: the form */}
          <div className="lg:col-span-7">
            {status === "success" ? (
              <div role="status" className="max-w-xl">
                <p className="flex items-center gap-3 text-base font-medium text-emerald-300">
                  <Check size={20} aria-hidden />
                  Message sent
                </p>
                <h3 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                  Thank you{sentName ? `, ${sentName}` : ""}.
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-white/70 md:text-xl">
                  Your message is in. I will reply within {REPLY_TIME}.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-base font-semibold text-emerald-300 underline decoration-emerald-300/40 underline-offset-4 transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-9">
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

                <div className="grid gap-9 md:grid-cols-2 md:gap-8">
                  <div>
                    <label
                      htmlFor="cta-name"
                      className="text-base font-medium text-white/70"
                    >
                      Your name or company
                    </label>
                    <input
                      id="cta-name"
                      type="text"
                      required
                      autoComplete="name"
                      disabled={submitting}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Smith"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cta-email"
                      className="text-base font-medium text-white/70"
                    >
                      Your email
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      required
                      autoComplete="email"
                      disabled={submitting}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <fieldset disabled={submitting}>
                  <legend className="text-base font-medium text-white/70">
                    I need help with
                  </legend>
                  <div className="mt-4 flex flex-wrap gap-2.5">
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
                        <span className="inline-block rounded-full border border-white/25 px-4 py-2.5 text-base font-medium text-white/85 transition-colors hover:border-white/60 peer-checked:border-emerald-400 peer-checked:bg-emerald-400 peer-checked:text-black peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor="cta-message"
                    className="text-base font-medium text-white/70"
                  >
                    What is slow, manual or broken?
                  </label>
                  <textarea
                    id="cta-message"
                    required
                    rows={4}
                    disabled={submitting}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your business, your goal and your timeline."
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                <div aria-live="polite">
                  {status === "error" && (
                    <p
                      role="alert"
                      className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-base leading-relaxed text-red-200"
                    >
                      Your message did not go through. Please try again, or
                      email me directly at{" "}
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

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center gap-3 rounded-full bg-emerald-400 px-9 py-4 text-lg font-semibold text-black transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          size={22}
                          aria-hidden
                          className="animate-spin"
                        />
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
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
