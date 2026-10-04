import { experience, profile } from "@/content/profile";
import { Reveal } from "@/components/Reveal";

export function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="shell experience-layout">
        <Reveal className="experience-aside">
          <div className="role-card">
            <p className="kicker">
              <span>02</span>
              Experience
            </p>
            <p className="company">{profile.companyShort}</p>
            <p className="meta">
              {profile.role}
              <br />
              {profile.tenure}
              <br />
              {profile.location}
            </p>
          </div>
        </Reveal>

        <div>
          <h2 id="experience-title" className="section-title" data-split="">
            End-to-end ownership on a workflow platform.
          </h2>
          <p className="lede" style={{ marginTop: "1rem" }} data-anim="">
            {profile.company}. Architecture, the canvas, the AI surface, and the release path.
          </p>
          <div className="beats" style={{ marginTop: "1.75rem" }}>
            {experience.map((item) => (
              <div key={item.lead} className="beat" data-anim="" data-rule="">
                <strong>{item.lead}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="education" data-anim="">
            <p>
              <strong>Bachelor of Science</strong>
              <span> · Pondicherry University</span>
            </p>
            <p>2023</p>
          </div>
        </div>
      </div>
    </section>
  );
}
