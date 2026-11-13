import { approach } from "@/content/profile";
import { Reveal } from "@/components/Reveal";

export function Approach() {
  return (
    <section className="section" id="approach" aria-labelledby="approach-title">
      <div className="shell">
        <div className="section-head">
          <p className="kicker" data-anim="">
            <span>02</span>
            How I work
          </p>
          <h2 id="approach-title" className="section-title" data-split="">
            Three things I hold onto, <em>whatever</em> the product is.
          </h2>
        </div>
        <div className="approach-grid">
          {approach.map((item, index) => (
            <Reveal key={item.title}>
              <div className="glass approach">
                <p className="no">0{index + 1}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
