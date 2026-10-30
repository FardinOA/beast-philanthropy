"use client";

import { useCallback, useEffect, useRef } from "react";
import { ease, span, useScrollProgress } from "@/lib/scroll";

const MAX_ZOOM = 70;

/*
  Glyph dive: the camera pushes into the stroke of the last "0" until its
  pink is the whole screen, which is where the approach stage begins.
*/
export function Hundred() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const zero = useRef<HTMLSpanElement>(null);

  const place = useCallback(() => {
    const w = word.current, z = zero.current;
    if (!w || !z) return;
    const wr = w.getBoundingClientRect(), zr = z.getBoundingClientRect();
    const sx = w.offsetWidth / Math.max(1, wr.width);
    // The left stroke of the "0" sits about 14% into its advance, halfway down the glyph box.
    const ox = (zr.left - wr.left + zr.width * 0.14) * sx;
    const oy = (zr.top - wr.top + zr.height * 0.52) * sx;
    w.style.transformOrigin = `${ox.toFixed(1)}px ${oy.toFixed(1)}px`;
  }, []);

  const apply = useCallback((p: number) => {
    const el = pin.current;
    if (!el) return;
    const z = ease(span(p, 0.1, 0.9));
    el.style.setProperty("--zoom", Math.exp(Math.log(MAX_ZOOM) * z * z).toFixed(3));
    el.style.setProperty("--words", (1 - span(p, 0.06, 0.3)).toFixed(4));
    el.style.setProperty("--flood", span(p, 0.8, 0.95).toFixed(4));
  }, []);

  useScrollProgress(root, apply);

  useEffect(() => {
    const run = () => {
      const w = word.current;
      if (!w) return;
      const prev = w.style.transform;
      w.style.transform = "none";
      place();
      w.style.transform = prev;
    };
    run();
    document.fonts?.ready.then(run);
    window.addEventListener("resize", run);
    return () => window.removeEventListener("resize", run);
  }, [place]);

  return (
    <section className="hundred" ref={root} aria-labelledby="hundred-h">
      <div className="hundred__pin" ref={pin}>
        <p className="hundred__cap hundred__cap--a">
          Every dollar of revenue from Beast Philanthropy&rsquo;s YouTube channel goes directly to funding the charity.
        </p>
        <h2 id="hundred-h" className="hundred__word xt">
          <span ref={word}>
            10<span ref={zero}>0</span>%<span className="sr"> of YouTube revenue, deployed</span>
          </span>
        </h2>
        <p className="hundred__cap hundred__cap--b">
          You watch.
          <br />
          The channel earns.
          <br />
          <b>The work gets funded.</b>
        </p>
        <span className="hundred__flood" aria-hidden />
      </div>
    </section>
  );
}
