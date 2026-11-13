"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, profile } from "@/content/profile";

function useLocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const id = window.setInterval(update, 15000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [section, setSection] = useState("");
  const active = onHome ? section : pathname.startsWith("/work") ? "work" : "";
  const time = useLocalTime();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Tuck the bar away while reading down; bring it back on any upward scroll.
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 160);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <header className="nav" data-scrolled={scrolled} data-hidden={hidden}>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className="nav-pill">
        <Link className="mark" href="/#top" aria-label={onHome ? "Back to top" : "Home"}>
          CE
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-side">
          <p className="nav-time" aria-label="Local time in Chennai">
            Chennai <b>{time || "--:--"}</b>
          </p>
          <a className="btn btn-primary btn-sm nav-mail" href={`mailto:${profile.email}`} data-magnetic="">
            Email
          </a>
        </div>
      </div>
    </header>
  );
}
