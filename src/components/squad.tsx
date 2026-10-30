"use client";

import { useState } from "react";
import { PARTNERS } from "@/lib/content";

const TONES = ["pink", "white", "yellow", "leaf", "ink", "cyan"];

const initials = (name: string) =>
  name
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, name.startsWith("The ") ? 3 : 2)
    .map((w) => w[0])
    .join("");

/** Partners as trading cards. Hover or tap flips a card to its real role. */
export function Squad() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setFlipped((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  return (
    <section className="stage stage--cyan squad" aria-labelledby="squad-h">
      <div className="squad__head">
        <h2 id="squad-h" className="h2 xt xt--sm" data-slam style={{ "--r": "-5deg" } as React.CSSProperties}>
          The squad
        </h2>
        <p data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          From globally recognized NGOs to grassroots groups. What they share: a clear plan, a commitment to results, and the trust of the
          people they serve.
        </p>
      </div>
      <ul className="cards">
        {PARTNERS.map((p, i) => (
          <li key={p.name} data-slam style={{ "--r": `${i % 2 ? 10 : -10}deg`, "--rot": `${(i % 3) - 1}deg`, "--d": i } as React.CSSProperties}>
            <button className={`tcard ${flipped.has(i) ? "is-flipped" : ""}`} onClick={() => toggle(i)} aria-pressed={flipped.has(i)} aria-label={`${p.name}: ${p.role}, ${p.program}`}>
              <span className={`tcard__face tcard__front tcard--${TONES[i]}`}>
                <span className="tcard__no">#{String(i + 1).padStart(2, "0")}</span>
                <span className="tcard__mono">{initials(p.name)}</span>
                <span className="tcard__name">{p.name}</span>
                <span className="tcard__prog">{p.program}</span>
              </span>
              <span className="tcard__face tcard__back">
                <span className="tcard__k">Role</span>
                <span className="tcard__role">{p.role}</span>
                <span className="tcard__k">Campaign</span>
                <span className="tcard__role tcard__role--sm">{p.program}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
