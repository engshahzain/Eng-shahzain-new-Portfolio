// data/projects.ts

export type Kind = "stores" | "apps" | "engineering";

export interface Project {
  id: string;
  slug: string;
  kind: Kind;
  title: string;
  category: string;
  client: string;
  role: string;
  year: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  tech: string[];
  link: string;
  image: string;
  heroImage: string;
  gallery: string[];
  // Optional portrait showcase photo (only the FYP uses it for now)
  showcaseImage?: string;
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "enigma-erp",
    kind: "engineering",
    title: "Enigma ERP System",
    category: "Full-Stack Enterprise Architecture & Cloud Infrastructure",
    client: "Enigma Systems Enterprise",
    role: "Lead Full-Stack Architect",
    year: "2026",
    description:
      "A centralized, high-performance ERP built to eliminate data silos and accelerate resource planning.",
    overview:
      "Architected and deployed a centralized, high-performance enterprise resource planning platform engineered to unify fragmented business operations and data streams.",
    problem:
      "Mid-sized enterprises bleed operational efficiency through fragmented software stacks, disjointed SaaS tools, and severe data silos that cripple real-time resource planning.",
    solution:
      "Architected and deployed a lightning-fast, centralized ERP built with Next.js and Node.js. Hosted on a self-managed Ubuntu VPS with PM2 process management to guarantee 99.9% uptime and absolute data sovereignty.",
    tech: ["Next.js", "Node.js", "MongoDB", "Ubuntu/PM2"],
    link: "https://erp.enigmasystems.io/",
    image:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/screencapture-erp-enigmasystems-io-dashboard-2026-11-08-21_26_28.png",
    heroImage:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_b2mx17b2mx17b2mx.jpg",
    gallery: [
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/screencapture-erp-enigmasystems-io-dashboard-2026-11-08-21_26_28.png",
    ],
  },
  {
    id: "02",
    slug: "enigma-alt-text-generator",
    kind: "apps",
    title: "AI Alt Text Generator",
    category: "Shopify Public App / AI Integration",
    client: "Shopify App Store",
    role: "Full-Stack Engineer",
    year: "2026",
    description:
      "An AI-powered Shopify application that generates automated, highly optimized image alt text for massive product catalogs.",
    overview:
      "Developed an AI-powered Shopify application that generates automated, highly optimized image alt text for massive product catalogs.",
    problem:
      "High-volume e-commerce merchants lose thousands in organic search traffic because manually writing SEO-compliant ALT text across thousands of catalog images is practically impossible.",
    solution:
      "Engineered a high-performance Shopify app using React Router and Prisma, seamlessly bridging the Shopify Admin GraphQL API with the Google Gemini API to automate intelligent, high-converting ALT text generation at scale.",
    tech: ["Shopify Admin API", "Gemini API", "React", "Prisma"],
    link: "https://apps.shopify.com/enigma-alt-text-generator",
    image:
      "https://res.cloudinary.com/u9q4reia/image/upload/f_auto/q_auto/Gemini_Generated_Image_3a6hvg3a6hvg3a6h.jpg",
    heroImage:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_3a6hvg3a6hvg3a6h.jpg",
    gallery: [
      "/placeholders/enigma-alt-1.png",
      "/placeholders/enigma-alt-2.png",
    ],
  },
  {
    id: "03",
    slug: "puregrubs",
    kind: "stores",
    title: "PureGrubs",
    category: "Shopify Development / eCommerce",
    client: "PureGrubs",
    role: "Shopify Developer",
    year: "2026",
    description:
      "A sustainable animal nutrition eCommerce experience featuring black soldier fly larvae products.",
    overview:
      "Developed a sustainable animal nutrition eCommerce experience featuring black soldier fly larvae products. Designed to handle high-volume transactions while maintaining a premium brand aesthetic.",
    problem:
      "The brand required a high-stakes pivot from an agricultural commodity supplier to a premium, direct-to-consumer lifestyle brand without degrading mobile checkout conversion rates.",
    solution:
      "Crafted an immersive, conversion-optimized Shopify storefront featuring custom Liquid architecture and educational storytelling sections. Streamlined the media delivery pipeline to slash mobile payload by 65% and accelerate transaction speeds.",
    tech: ["Shopify", "Liquid", "Frontend Optimization", "eCommerce"],
    link: "https://puregrubs.com/",
    image:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_onfhs5onfhs5onfh.jpg",
    heroImage:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/puregrubs-mockup.webp",
    gallery: [
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_onfhs5onfhs5onfh.jpg",
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_39ahk839ahk839ah.jpg",
    ],
  },
  {
    id: "04",
    slug: "dalstrong-studios",
    kind: "stores",
    title: "Dalstrong Studios",
    category: "Website Development / Creative Business",
    client: "Dalstrong Studios",
    role: "Web Developer",
    year: "2026",
    description:
      "A creative production website showcasing video production, photography, CGI, and visual content services.",
    overview:
      "Architected a creative production website showcasing video production, photography, CGI, and visual content services.",
    problem:
      "The creative agency needed an immersive digital platform to showcase high-end visual content, requiring bold imagery, cinematic sections, and premium editorial typography without sacrificing load speed.",
    solution:
      "Built an immersive creative agency website optimized for high-resolution media delivery, featuring cinematic scroll sections and premium editorial typography to highlight their visual content services.",
    tech: ["Web Development", "UI/UX", "CMS"],
    link: "https://www.dalstrongstudios.com/",
    image:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_xfv10xxfv10xxfv1.jpg",
    heroImage:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_xfv10xxfv10xxfv1.jpg",
    gallery: [
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/screencapture-dalstrongstudios-2026-11-08-20_58_17.png",
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/screencapture-dalstrongstudios-2026-11-08-20_58_17_1.png",
    ],
  },
  {
    id: "05",
    slug: "basic-b-body",
    kind: "stores",
    title: "Basic B Body",
    category: "Shopify Development / Beauty & Wellness",
    client: "Basic B Body",
    role: "Shopify Developer",
    year: "2026",
    description:
      "An Australian body-care eCommerce storefront showcasing skincare and self-care products.",
    overview:
      "Developed an Australian body-care eCommerce storefront showcasing skincare and self-care products with a focus on modern product presentation.",
    problem:
      "The brand required an elegant beauty eCommerce interface with refined product cards that could seamlessly handle high traffic and showcase their self-care products.",
    solution:
      "Delivered a highly optimized Shopify storefront featuring an elegant beauty interface, refined product cards, and a modern product presentation tailored for the Australian market.",
    tech: ["Shopify", "Liquid", "Frontend"],
    link: "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_oizgtroizgtroizg.jpg",
    image:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_oizgtroizgtroizg.jpg",
    heroImage:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_oizgtroizgtroizg.jpg",
    gallery: [
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_oizgtroizgtroizg.jpg",
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_7ctohg7ctohg7cto.jpg",
    ],
  },
  {
    id: "06",
    slug: "1body",
    kind: "stores",
    title: "1Body",
    category: "Shopify Development / Health & Wellness",
    client: "1Body",
    role: "Shopify Developer",
    year: "2026",
    description:
      "A nutritional supplements eCommerce storefront focused on product discovery and online shopping.",
    overview:
      "Architected a nutritional supplements eCommerce storefront focused on product discovery and seamless online shopping.",
    problem:
      "The client needed a modern health and wellness storefront with sophisticated product presentation to drive product discovery in a highly competitive market.",
    solution:
      "Engineered a custom Shopify experience utilizing advanced eCommerce features to create a modern health and wellness storefront with sophisticated product presentation and streamlined checkout.",
    tech: ["Shopify", "Custom Development", "eCommerce"],
    link: "https://1body.com/",
    image:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_1ynejw1ynejw1yne.jpg",
    heroImage:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_1ynejw1ynejw1yne.jpg",
    gallery: [
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Gemini_Generated_Image_1ynejw1ynejw1yne.jpg",
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/screencapture-1body-products-best-thyroid-support-supplement-2026-11-08-21_12_00.png",
    ],
  },
  {
    id: "07",
    slug: "great-river-milling",
    kind: "stores",
    title: "Great River Milling",
    category: "Shopify Development / Food & Agriculture",
    client: "Great River Milling",
    role: "Shopify Developer",
    year: "2026",
    description:
      "An eCommerce storefront for flour, oats, whole grains, popcorn and wholesale products.",
    overview:
      "Built an eCommerce storefront for flour, oats, whole grains, popcorn and wholesale agricultural products.",
    problem:
      "The business required an elegant food eCommerce interface capable of handling complex product categories, collections, and dual B2C/B2B shopping experiences.",
    solution:
      "Developed a comprehensive Shopify solution featuring an elegant food eCommerce interface, dynamic product categories, and robust shopping experiences for both retail and wholesale customers.",
    tech: ["Shopify", "B2B / Wholesale", "eCommerce"],
    link: "https://greatrivermilling.com/",
    image:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/screencapture-greatrivermilling-2026-11-08-21_19_12.png",
    heroImage:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/screencapture-greatrivermilling-2026-11-08-21_19_12.png",
    gallery: [
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/screencapture-greatrivermilling-2026-11-08-21_19_12.png",
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/screencapture-greatrivermilling-blogs-recipes-2026-11-08-21_20_11.png",
    ],
  },

  {
    id: "08",
    slug: "ai-robotic-assistant",
    kind: "engineering",
    title: "AI Robotic Assistant",
    category: "Computer Engineering / Final Year Project",
    client: "Academic Project",
    role: "Computer Engineer",
    year: "2026",
    description:
      "An AI-powered robotic assistant developed as my BSc Computer Engineering final-year project.",
    overview:
      "Engineered an AI-powered robotic assistant developed as a comprehensive BSc Computer Engineering final-year project.",
    problem:
      "Required the integration of complex hardware systems with advanced artificial intelligence to create a responsive, physical robotic assistant.",
    solution:
      "Developed an immersive 3D robotics environment and AI interaction interface, successfully bridging hardware execution with intelligent software processing.",
    tech: ["Hardware Integration", "AI", "Robotics", "Systems Engineering"],
    link: "#",
    image:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/1777813052213.png",
    heroImage:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/1777813052213.png",
    // Portrait photo shown in its own section on the detail page
    showcaseImage:
      "https://res.cloudinary.com/dfqfl4scd/image/upload/f_auto/q_auto/Robotic_Assistant_Project_Showcase.png",
    // Empty on purpose: ai-robot-1.png / ai-robot-2.png don't exist yet
    gallery: [],
  },
];
