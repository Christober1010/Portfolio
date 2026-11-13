import Link from "next/link";
import { ViewTransition } from "react";
import { projects, type Project } from "@/content/profile";
import { Reveal } from "@/components/Reveal";
import { visuals } from "@/components/Visuals";

function ProjectCard({ project, variant }: { project: Project; variant: "feature" | "wide" | "tile" }) {
  const Visual = visuals[project.visual];

  return (
    <article className={`glass card project project-${variant} card-hover`} data-cursor="view">
      <div className="project-visual">
        <ViewTransition name={`visual-${project.slug}`} share="morph" default="none">
          <Visual />
        </ViewTransition>
        <span className="project-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="project-body">
        <div className="card-top">
          <p className="index-no">No. {project.index}</p>
          <p className="year">{project.year}</p>
        </div>
        <div>
          <h3>
            <Link className="stretch" href={`/work/${project.slug}/`}>
              {project.title}
            </Link>
          </h3>
          <p className="sub">{project.subtitle}</p>
        </div>
        <p className="lede" style={{ fontSize: variant === "feature" ? undefined : "1rem" }}>
          {project.summary}
        </p>
        <p className="outcome">{project.outcome}</p>
        {project.metrics.length > 0 ? (
          <dl className="project-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd data-count="">{metric.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <ul className="tags">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="read-more" aria-hidden="true">
          Read case study
          <span className="btn-arrow">→</span>
        </p>
      </div>
    </article>
  );
}

export function Work() {
  const [feature, ...rest] = projects;

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="shell">
        <div className="section-head">
          <p className="kicker" data-anim="">
            <span>01</span>
            Selected work
          </p>
          <h2 id="work-title" className="section-title" data-split="">
            Interfaces operations teams use <em>every day.</em>
          </h2>
          <p className="lede" data-anim="">
            Four products from the last two years. The through-line is the same: a UI that stays
            legible when the data, the graph, or the page count gets large.
          </p>
        </div>

        <div className="work-list">
          <Reveal>
            <ProjectCard project={feature} variant="feature" />
          </Reveal>

          <div className="work-list work-split">
            {rest.map((project, index) => {
              const wide = index === rest.length - 1;
              return (
                <Reveal key={project.slug} className={wide ? "span-all" : undefined}>
                  <ProjectCard project={project} variant={wide ? "wide" : "tile"} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
