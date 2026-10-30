"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { FOOTER_LINKS, SOCIALS } from "@/lib/content";
import { Arrow } from "./icons";

export function Footer() {
  const [sent, setSent] = useState(false);

  return (
    <footer className="footer">
      <div className="marquee" aria-hidden>
        <div className="marquee__track">
          {[0, 1].map((k) => (
            <span key={k} className="marquee__run">
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i}>
                  Make kindness viral <i>★</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <div className="footer__top">
        <div className="footer__brand">
          <img src="/media/logo.webp" alt="Beast Philanthropy" width={900} height={208} className="footer__logo" />
          <p>Creating lasting change by channeling the world&rsquo;s largest platform into real, measurable impact across 25+ countries and 5 continents.</p>
        </div>

        <form
          className="subscribe"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label htmlFor="sub-email">Stay updated</label>
          {sent ? (
            <p className="subscribe__done" role="status">
              You&rsquo;re on the list. See you in the next video.
            </p>
          ) : (
            <div className="subscribe__row">
              <input id="sub-email" type="email" required placeholder="you@email.com" autoComplete="email" />
              <button type="submit" className="btn btn--pink">
                Subscribe <Arrow />
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="footer__cols">
        {FOOTER_LINKS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <nav aria-label="Social">
          <h3>Follow</h3>
          <ul>
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer__base">
        <p>© 2026 Beast Philanthropy, Inc. All rights reserved. 501(c)(3) nonprofit organization.</p>
        <ul className="footer__legal">
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/cookie-policy">Cookie Policy</a>
          </li>
          <li>
            <a href="/disclosure-statement">Disclosure Statement</a>
          </li>
        </ul>
      </div>
      <p className="footer__credit">
        Redesign concept, not the official Beast Philanthropy site. Created by{" "}
        <a href="https://fardin.website" target="_blank" rel="noopener">
          Fardin Omor Afnan
        </a>
      </p>
    </footer>
  );
}
