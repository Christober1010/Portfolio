import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { visuals } from "@/components/Visuals";
import { profile, projects } from "@/content/profile";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = findProject(slug);
  if (!project) return {};

  const title = `${project.title} — ${profile.name}`;
  return {
    title,
    description: project.summary,
    openGraph: { title, description: project.summary, type: "article" },
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = findProject(slug);
  if (!project) notFound();

  const position = projects.indexOf(project);
  const next = projects[(position + 1) % projects.length];
  const Visual = visuals[project.visual];

  return (
    <main id="content">
      <article className="section case" aria-labelledby="case-title" style={{ paddingTop: "3rem" }}>
        <div className="shell">
          <Link className="back-link rise" href="/#work">
            ← All work
          </Link>
          <p className="kicker rise" style={{ animationDelay: "40ms", marginTop: "2.5rem" }}>
            <span>{project.index}</span>
            Case study
          </p>
          <h1 id="case-title" className="case-title rise" style={{ animationDelay: "90ms" }}>
            {project.title}
          </h1>
          <p className="role-line rise" style={{ animationDelay: "140ms" }}>
            {project.subtitle}
          </p>

          <dl className="case-meta rise" style={{ animationDelay: "200ms" }}>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>
                <ul className="tags">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <div className="case-visual rise" style={{ animationDelay: "260ms" }}>
            <Visual />
          </div>

          <div className="case-body">
            <Reveal className="case-row">
              <h2 className="case-label">Context</h2>
              <div>
                <p className="lede">{project.context}</p>
                <p className="lede" style={{ marginTop: "1rem" }}>
                  {project.summary}
                </p>
              </div>
            </Reveal>

            <Reveal className="case-row">
              <h2 className="case-label">What I built</h2>
              <ul className="case-list">
                {project.built.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="case-row">
              <h2 className="case-label">Results</h2>
              <ul className="case-results">
                {project.results.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal>
            <Link className="card card-link next-case" href={`/work/${next.slug}/`}>
              <p className="kicker" style={{ margin: 0 }}>
                <span>{next.index}</span>
                Next project
              </p>
              <h3>{next.title} →</h3>
              <p className="sub">{next.subtitle}</p>
            </Link>
          </Reveal>
        </div>
      </article>
    </main>
  );
}
