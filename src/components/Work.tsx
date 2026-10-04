import Link from "next/link";
import { projects, type Project } from "@/content/profile";
import { Reveal } from "@/components/Reveal";
import { visuals } from "@/components/Visuals";

function ProjectCard({ project, className }: { project: Project; className: string }) {
  const Visual = visuals[project.visual];
  const featured = className.includes("card-feature");

  return (
    <article className={`${className} card-hover`} style={{ height: "100%" }}>
      <div>
        <div className="card-top">
          <p className="index-no">{project.index}</p>
          <p className="year">{project.year}</p>
        </div>
        <h3>
          <Link className="stretch" href={`/work/${project.slug}/`}>
            {project.title}
          </Link>
        </h3>
        <p className="sub">{project.subtitle}</p>
        <p className="lede" style={{ marginTop: "1rem", fontSize: featured ? undefined : "1rem" }}>
          {project.summary}
        </p>
        <p className="outcome" style={{ marginTop: "1rem" }}>
          {project.outcome}
        </p>
        <ul className="tags" style={{ marginTop: "1.2rem" }}>
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="read-more" aria-hidden="true">
          Read case study →
        </p>
      </div>
      <Visual />
    </article>
  );
}

export function Work() {
  const [feature, ...rest] = projects;

  return (
    <section className="section" id="work" aria-labelledby="work-title" style={{ paddingTop: 0 }}>
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <p className="kicker">
              <span>01</span>
              Selected work
            </p>
            <h2 id="work-title" className="section-title">
              Interfaces operations teams use every day.
            </h2>
            <p className="lede">
              Four products from the last two years. The through-line is the same: a UI that stays
              legible when the data, the graph, or the page count gets large.
            </p>
          </div>
        </Reveal>

        <div className="work-list">
          <Reveal>
            <ProjectCard project={feature} className="card card-feature" />
          </Reveal>

          <div className="work-list work-split">
            {rest.map((project, index) => {
              const wide = index === rest.length - 1;
              return (
                <Reveal
                  key={project.slug}
                  className={wide ? "span-all" : undefined}
                  delay={index * 60}
                >
                  <ProjectCard project={project} className={wide ? "card card-wide" : "card"} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
