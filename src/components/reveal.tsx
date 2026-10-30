"use client";

import { useEffect } from "react";

/** Adds `.in` to every `[data-reveal]` / `[data-slam]` once it scrolls into view. */
export function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal], [data-slam]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

/** One short stage shake, for the moment a big number lands. */
export function shake(el: Element | null) {
  if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  el.classList.remove("is-shake");
  void (el as HTMLElement).offsetWidth;
  el.classList.add("is-shake");
}
