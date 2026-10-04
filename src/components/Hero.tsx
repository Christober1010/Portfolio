import { metrics, profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="section hero" id="top" aria-labelledby="hero-title" style={{ paddingTop: "3.5rem" }}>
      <div className="shell">
        <p className="kicker" data-intro="fade">
          <span>00</span>
          {profile.location}
        </p>
        <h1 id="hero-title" className="display" data-intro="chars" data-parallax="0.18">
          {profile.name}
        </h1>
        <p className="role-line" data-intro="fade">
          {profile.role} — React, TypeScript, Next.js
        </p>
        <div className="sig" data-intro="rule" aria-hidden="true" />
        <p className="lede" data-intro="lines">
          I ship production interfaces that stay fast when the product gets complicated —{" "}
          <em>workflow canvases past a hundred nodes</em>, token-by-token AI chat, and a reference
          platform of 1.8 million pages. Two years in, I still own the feature from the component
          to the API when it needs it.
        </p>
        <div className="hero-actions" data-intro="fade">
          <a className="btn btn-primary" href="#work" data-magnetic="">
            Selected work
          </a>
          <a className="btn btn-ghost" href="#contact" data-magnetic="">
            Start a conversation
          </a>
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
    </section>
  );
}
