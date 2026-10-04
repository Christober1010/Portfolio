/** One span per character, for typing effects. Spaces are kept so `white-space: pre` lays out naturally. */
export function Chars({ text, className = "ch" }: { text: string; className?: string }) {
  return (
    <>
      {Array.from(text).map((char, index) => (
        <span key={index} className={className}>
          {char}
        </span>
      ))}
    </>
  );
}

/** One span per word, with the whitespace between words left as plain text, for streaming tokens. */
export function Tokens({ text, className = "tok" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/(\s+)/).map((part, index) =>
        /^\s+$/.test(part) || part === "" ? (
          part
        ) : (
          <span key={index} className={className}>
            {part}
          </span>
        ),
      )}
    </>
  );
}
