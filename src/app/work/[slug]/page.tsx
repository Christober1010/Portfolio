import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { demos } from "@/components/demos";
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
      <div className="read-progress" data-progress="" aria-hidden="true" />
      <article className="section case" aria-labelledby="case-title" style={{ paddingTop: "3rem" }}>
        <div className="shell">
          <Link className="back-link" href="/#work" data-intro="fade">
            ← All work
          </Link>
          <p className="kicker" style={{ marginTop: "2.5rem" }} data-intro="fade">
            <span>{project.index}</span>
            Case study
          </p>
          <h1 id="case-title" className="case-title" data-intro="chars">
            {project.title}
          </h1>
          <p className="role-line" data-intro="fade">
            {project.subtitle}
          </p>

          <dl className="case-meta" data-intro="fade">
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

          <div className="case-visual">
            <ViewTransition name={`visual-${project.slug}`} share="morph" default="none">
              <Visual />
            </ViewTransition>
          </div>

          <div className="case-body">
            <div className="case-row" data-rule="">
              <h2 className="case-label" data-anim="">
                Context
              </h2>
              <div>
                <p className="lede" data-anim="">
                  {project.context}
                </p>
                <p className="lede" style={{ marginTop: "1rem" }} data-anim="">
                  {project.summary}
                </p>
              </div>
            </div>

            <section className="case-demos" aria-labelledby="demos-title">
              <div className="case-row" data-rule="">
                <h2 id="demos-title" className="case-label" data-anim="">
                  In motion
                </h2>
              </div>
              <div className="demo-grid">
                {project.demos.map((demo, index) => {
                  const Demo = demos[demo.id];
                  return (
                    <figure key={demo.id} className="demo" data-anim="">
                      <div className="demo-frame">
                        <Demo />
                      </div>
                      <figcaption>
                        <p className="demo-index">{String(index + 1).padStart(2, "0")}</p>
                        <h3>{demo.title}</h3>
                        <p>{demo.caption}</p>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </section>

            <div className="case-row" data-rule="">
              <h2 className="case-label" data-anim="">
                What I built
              </h2>
              <ul className="case-list">
                {project.built.map((item) => (
                  <li key={item} data-anim="">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="case-row" data-rule="">
              <h2 className="case-label" data-anim="">
                Results
              </h2>
              <ul className="case-results">
                {project.results.map((item) => (
                  <li key={item} data-anim="">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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
