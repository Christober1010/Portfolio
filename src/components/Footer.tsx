import { nav, profile } from "@/content/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell">
        <p className="wordmark" aria-hidden="true">
          {profile.name}
        </p>
        <div className="footer-bar">
          <div>
            <p style={{ margin: 0, color: "var(--bone)" }}>
              {profile.name} · {profile.role}
            </p>
            <p style={{ margin: "0.25rem 0 0" }}>
              {profile.location} · © {year}
            </p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            {nav.map((item) => (
              <a key={item.id} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="footer-top" href="#top">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
