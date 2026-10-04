"use client";

import { FormEvent, useState } from "react";
import { profile } from "@/content/profile";

type Fields = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "mailto";

const empty: Fields = { name: "", email: "", message: "", company: "" };

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.name.trim().length < 2) errors.name = "Add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Use a valid email so I can reply.";
  }
  if (fields.message.trim().length < 12) {
    errors.message = "A sentence or two is enough.";
  }
  return errors;
}

function mailtoHref(fields: Fields) {
  const subject = encodeURIComponent(`Portfolio note from ${fields.name.trim()}`);
  const body = encodeURIComponent(
    `${fields.message.trim()}\n\n— ${fields.name.trim()}\n${fields.email.trim()}`,
  );
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

export function Contact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    const firstInvalid = (["name", "email", "message"] as const).find((key) => nextErrors[key]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    if (fields.company.trim()) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          message: fields.message.trim(),
          _subject: `Portfolio note from ${fields.name.trim()}`,
          _template: "table",
          _captcha: "false",
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Form request failed");
      setStatus("sent");
      setFields(empty);
    } catch {
      setStatus("mailto");
      window.location.href = mailtoHref(fields);
    } finally {
      window.clearTimeout(timer);
    }
  }

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="shell contact-layout">
        <div>
          <p className="kicker">
            <span>04</span>
            Contact
          </p>
          <h2 id="contact-title" className="section-title">
            Tell me what you’re building.
          </h2>
          <p className="lede" style={{ marginTop: "1rem" }}>
            Roles, collaborations, or a closer look at the work. The note comes straight to my
            inbox. Email and phone are here if you would rather skip the form.
          </p>
          <ul className="contact-list">
            <li>
              <span>Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <span>Phone</span>
              <a href={`tel:${profile.phone}`}>{profile.phoneDisplay}</a>
            </li>
            <li>
              <span>LinkedIn</span>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                christoberceciledward
              </a>
            </li>
            <li>
              <span>Based</span>
              {profile.location}
            </li>
          </ul>
        </div>

        {status === "sent" ? (
          <div className="notice" role="status">
            <h3>Note sent.</h3>
            <p>I’ll reply to the address you left. If it is urgent, email me directly.</p>
            <button type="button" className="btn btn-ghost" onClick={() => setStatus("idle")}>
              Send another
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="hp" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={fields.company}
                onChange={(event) => update("company", event.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  value={fields.name}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  onChange={(event) => update("name", event.target.value)}
                />
                {errors.name ? (
                  <p id="name-error" className="field-error" role="alert">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@company.com"
                  value={fields.email}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  onChange={(event) => update("email", event.target.value)}
                />
                {errors.email ? (
                  <p id="email-error" className="field-error" role="alert">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">Note</label>
              <textarea
                id="message"
                name="message"
                placeholder="What should we talk about?"
                maxLength={2000}
                value={fields.message}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "message-error" : undefined}
                onChange={(event) => update("message", event.target.value)}
              />
              {errors.message ? (
                <p id="message-error" className="field-error" role="alert">
                  {errors.message}
                </p>
              ) : null}
            </div>
            {status === "mailto" ? (
              <p className="form-note" role="status">
                The form service didn’t respond, so your email app should open with this note. If
                it doesn’t, write to {profile.email}.
              </p>
            ) : (
              <p className="form-note">
                Notes are emailed to me. If that route is unavailable, your mail app opens with the
                message ready.
              </p>
            )}
            <div>
              <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending" : "Send note"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
