import { skillGroups } from "@/content/profile";
import { Reveal } from "@/components/Reveal";

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title" style={{ paddingTop: 0 }}>
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <p className="kicker">
              <span>03</span>
              Skills
            </p>
            <h2 id="skills-title" className="section-title">
              The tools the work actually runs on.
            </h2>
          </div>
        </Reveal>
        <div className="skill-grid">
          {skillGroups.map((group, index) => (
            <Reveal key={group.label} className="skill-group" delay={(index % 4) * 50}>
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
