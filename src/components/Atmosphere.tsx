/** Slow-drifting colour fields behind the page plus a film-grain overlay on top of it. */
export function Atmosphere() {
  return (
    <>
      <div className="atmosphere" aria-hidden="true">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
