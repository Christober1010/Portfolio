import { Marquee } from "@/components/Marquee";
import { skillGroups } from "@/content/profile";
import { Reveal } from "@/components/Reveal";

export function Skills() {
  const all = skillGroups.flatMap((group) => group.items);
  const half = Math.ceil(all.length / 2);

  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="shell">
        <div className="section-head">
          <p className="kicker" data-anim="">
            <span>04</span>
            Skills
          </p>
          <h2 id="skills-title" className="section-title" data-split="">
            The tools the work <em>actually</em> runs on.
          </h2>
        </div>
      </div>
      <div className="skill-marquees" data-anim="">
        <Marquee items={all.slice(0, half)} small speed="36s" />
        <Marquee items={all.slice(half)} small reverse speed="44s" />
      </div>
      <div className="shell">
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <Reveal key={group.label}>
              <div className="glass skill-group">
                <h3>{group.label}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
