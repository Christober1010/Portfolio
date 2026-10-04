import { metrics, profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="section" id="top" aria-labelledby="hero-title" style={{ paddingTop: "3.5rem" }}>
      <div className="shell">
        <p className="kicker rise" style={{ animationDelay: "40ms" }}>
          <span>00</span>
          {profile.location}
        </p>
        <h1 id="hero-title" className="display rise" style={{ animationDelay: "90ms" }}>
          {profile.name}
        </h1>
        <p className="role-line rise" style={{ animationDelay: "140ms" }}>
          {profile.role} — React, TypeScript, Next.js
        </p>
        <div className="sig rise" style={{ animationDelay: "180ms" }} aria-hidden="true" />
        <p className="lede rise" style={{ animationDelay: "200ms" }}>
          I ship production interfaces that stay fast when the product gets complicated —{" "}
          <em>workflow canvases past a hundred nodes</em>, token-by-token AI chat, and a reference
          platform of 1.8 million pages. Two years in, I still own the feature from the component
          to the API when it needs it.
        </p>
        <div className="hero-actions rise" style={{ animationDelay: "260ms" }}>
          <a className="btn btn-primary" href="#work">
            Selected work
          </a>
          <a className="btn btn-ghost" href="#contact">
            Start a conversation
          </a>
        </div>
        <dl className="metrics rise" style={{ animationDelay: "320ms" }}>
          {metrics.map((item) => (
            <div key={item.label}>
              <dd>{item.value}</dd>
              <dt>{item.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
