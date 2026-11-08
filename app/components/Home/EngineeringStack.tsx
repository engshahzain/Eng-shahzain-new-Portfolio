import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Group = {
  title: string;
  text: string;
  tech: string[];
};

// Groups follow the Core Skills section of the CV, plus an AI group from the projects
const groups: Group[] = [
  {
    title: "Shopify",
    text: "Custom Liquid themes, landing, product and collection pages, and custom apps that take a store beyond what a theme can do.",
    tech: [
      "Liquid",
      "Custom Shopify apps",
      "Storefront customization",
      "Admin GraphQL API",
    ],
  },
  {
    title: "Frontend",
    text: "Responsive interfaces that work the same in every browser.",
    tech: [
      "React.js",
      "Next.js (App Router)",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Webflow",
    ],
  },
  {
    title: "Backend",
    text: "The APIs and data behind a store or an app.",
    tech: ["Node.js", "MongoDB", "Mongoose", "Prisma"],
  },
  {
    title: "Accessibility",
    text: "Manual and automated audits, so client stores meet WCAG and more customers can use them.",
    tech: ["Manual audits", "Automated testing", "WCAG compliance"],
  },
  {
    title: "AI",
    text: "Connecting language models to real products, like my Enigma AI Alt Text app on the Shopify App Store.",
    tech: ["Google Gemini API", "Anthropic Claude API"],
  },
  {
    title: "Tools and hosting",
    text: "Git for every project, Vercel for deployment, and my own Linux servers when a client needs full control.",
    tech: ["Git", "GitHub", "Vercel", "VS Code", "Ubuntu Linux", "PM2"],
  },
];

export default function EngineeringStack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="relative scroll-mt-24 border-t border-white/10 bg-black px-4 py-24 text-white md:px-6 md:py-40"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <h2
            id="stack-heading"
            className="text-4xl font-semibold leading-[1.05] tracking-tight md:col-span-7 md:text-6xl"
          >
            The tools I build with.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white/70 md:col-span-5 md:text-lg">
            Shopify comes first, then the full stack behind it: React and
            Next.js in front, Node.js and MongoDB behind. Every build is checked
            for accessibility.
          </p>
        </div>

        {/* Skill groups */}
        <ul className="mt-14 md:mt-24">
          {groups.map((group) => (
            <li
              key={group.title}
              className="group relative grid gap-4 border-t border-white/10 py-8 last:border-b md:grid-cols-12 md:gap-10 md:py-12"
            >
              {/* Emerald line draws across the top on hover */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 bg-emerald-400 transition-[width] duration-500 group-hover:w-full motion-reduce:transition-none"
              />

              <h3 className="text-3xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-emerald-300 md:col-span-5 md:text-5xl motion-reduce:transition-none">
                {group.title}
              </h3>

              <div className="md:col-span-7">
                <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                  {group.text}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-base font-medium text-white/60 transition-colors duration-300 group-hover:text-white/90 md:text-lg motion-reduce:transition-none">
                  {group.tech.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        {/* Link to the full page */}
        <div className="mt-12 md:mt-16">
          <Link
            href="/stack"
            className="group/link inline-flex items-center gap-2 text-xl font-semibold transition-colors hover:text-emerald-300 focus-visible:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 md:text-2xl"
          >
            See how it all fits together
            <ArrowUpRight
              size={24}
              aria-hidden
              className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
