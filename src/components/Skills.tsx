import { skillGroups } from "@/content/profile";
import { Reveal } from "@/components/Reveal";

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title" style={{ paddingTop: 0 }}>
      <div className="shell">
        <div className="section-head">
          <p className="kicker" data-anim="">
            <span>03</span>
            Skills
          </p>
          <h2 id="skills-title" className="section-title" data-split="">
            The tools the work actually runs on.
          </h2>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <Reveal key={group.label} className="skill-group">
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
