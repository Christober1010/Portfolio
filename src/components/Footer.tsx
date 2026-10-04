import { profile } from "@/content/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell footer-bar">
        <p>
          {profile.name} · {profile.role}
        </p>
        <p>© {year}</p>
      </div>
    </footer>
  );
}
