"use client";

import { useEffect, type RefObject } from "react";

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Map v from [a, b] to [0, 1], clamped. */
export const span = (v: number, a: number, b: number) => clamp((v - a) / (b - a));
export const ease = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export const still = () =>
  typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const reduced = () =>
  typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Calls `onFrame` with the element's scroll progress while it is near the viewport.
 * mode "pin": 0 when its top meets the viewport top, 1 when its bottom meets the viewport bottom.
 * mode "pass": 0 when its top enters from below, 1 when its top reaches the viewport top.
 * mode "travel": 0 when its top enters from below, 1 when its bottom leaves at the top.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onFrame: (p: number) => void,
  mode: "pin" | "pass" | "travel" = "pin",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = false;
    let raf = 0;
    let last = -1;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "20% 0px" });
    io.observe(el);
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible && last !== -1) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p =
        mode === "pin"
          ? clamp(-r.top / Math.max(1, r.height - vh))
          : mode === "travel"
            ? clamp((vh - r.top) / (vh + r.height))
            : clamp((vh - r.top) / vh);
      if (Math.abs(p - last) < 0.0004) return;
      last = p;
      onFrame(p);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [ref, onFrame, mode]);
}
