import { Marquee } from "@/components/Marquee";
import { marquee, metrics, profile } from "@/content/profile";

export function Hero() {
  return (
    <>
      <section className="section hero" id="top" aria-labelledby="hero-title">
        <div className="shell">
          <div className="hero-grid">
            <div>
              <p className="status" data-intro="fade">
                <i aria-hidden="true" />
                Open to new conversations · {profile.location}
              </p>
              <h1 id="hero-title" className="display" data-intro="chars" data-parallax="0.18">
                {profile.name}
              </h1>
              <p className="hero-headline" data-intro="lines">
                Frontend engineer building interfaces that stay <em>fast</em> when the product gets
                complicated.
              </p>
              <p className="lede" data-intro="lines">
                Workflow canvases past a hundred nodes, token-by-token AI chat, and a reference
                platform of 1.8 million pages. Two years in, I still own the feature from the
                component to the API when it needs it.
              </p>
              <div className="hero-actions" data-intro="fade">
                <a className="btn btn-primary" href="#work" data-magnetic="">
                  Selected work
                  <span className="btn-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
                <a className="btn btn-ghost" href="#contact" data-magnetic="">
                  Start a conversation
                </a>
              </div>
            </div>

            <aside className="glass hero-card" data-intro="fade" aria-label="Currently">
              <dl>
                <div>
                  <dt>Currently</dt>
                  <dd className="big">{profile.role}</dd>
                  <dd>
                    {profile.companyShort} · {profile.tenure}
                  </dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>React, TypeScript, Next.js, real-time and AI surfaces</dd>
                </div>
                <div>
                  <dt>Working on</dt>
                  <dd>An AI-assisted EDI workflow builder used daily by operations teams</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>
                    <ul className="tags">
                      {["React", "Next.js", "TypeScript", "WebSockets", "OpenAI"].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          <dl className="metrics" data-intro="fade">
            {metrics.map((item) => (
              <div key={item.label}>
                <dd data-count="">{item.value}</dd>
                <dt>{item.label}</dt>
              </div>
            ))}
          </dl>
        </div>
        <p className="scroll-cue" aria-hidden="true">
          Scroll
        </p>
      </section>
      <Marquee items={marquee} />
    </>
  );
}
