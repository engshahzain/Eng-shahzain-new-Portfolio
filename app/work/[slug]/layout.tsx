import type { Metadata } from "next";
import { projects } from "../../components/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Case Study Not Found",
    };
  }

  const seoTitle = `${project.title} — ${project.category} Case Study`;
  const seoDescription = `${project.description} ${project.solution}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      project.title,
      project.category,
      project.role,
      "Engr Muhammad Shahzain",
      "Case Study",
      ...project.tech,
    ],
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${project.title} | Engineered by M. Shahzain`,
      description: project.overview,
      url: `/work/${project.slug}`,
      images: [
        {
          url: project.heroImage || project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} — ${project.category}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: project.description,
      images: [project.heroImage || project.image],
    },
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetailLayout({ children }: Props) {
  return <>{children}</>;
}
