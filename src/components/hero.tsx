"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import { DONATE, VIDEOS } from "@/lib/content";
import { ease, span, still, useScrollProgress } from "@/lib/scroll";
import { scrollToY } from "./smooth-scroll";
import { Heart, Play } from "./icons";

const ROWS = [VIDEOS.slice(0, 4).concat(VIDEOS.slice(4)), VIDEOS.slice(3).concat(VIDEOS.slice(0, 3)), VIDEOS.slice(5).concat(VIDEOS.slice(0, 5))];
const STAMPS = ["2,000,000 people.", "Clean water.", "For decades."];

/*
  Hero: the charity's own films drift past as a tilted wall, the newest is
  "now playing". The wall leans toward the pointer and the headline's ink
  extrusion swings away from it. Scroll plays the film: the card goes
  fullscreen, cuts from thumbnail to footage, and three lines stamp in.
*/
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const rest = useRef({ x: 0, y: 0, w: 1, h: 1 });
  const [stamped, setStamped] = useState(0);

  // Where the card sits at rest, so the dive can grow it to cover the viewport.
  useEffect(() => {
    const measure = () => {
      const c = card.current, p = pin.current;
      if (!c || !p) return;
      const prev = c.style.transform;
      c.style.transform = "none";
      const r = c.getBoundingClientRect(), pr = p.getBoundingClientRect();
      c.style.transform = prev;
      rest.current = { x: r.left - pr.left + r.width / 2, y: r.top - pr.top + r.height / 2, w: r.width, h: r.height };
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const apply = useCallback((p: number) => {
    const el = pin.current, c = card.current;
    if (!el || !c) return;
    const e = ease(span(p, 0.04, 0.5));
    const { x, y, w, h } = rest.current;
    const vw = el.clientWidth, vh = el.clientHeight;
    const cover = Math.max(vw / w, vh / h) * 1.04;
    const s = 1 + (cover - 1) * e;
    c.style.transform = `translate(${((vw / 2 - x) * e).toFixed(1)}px, ${((vh / 2 - y) * e).toFixed(1)}px) scale(${s.toFixed(4)}) rotate(${(-3 * (1 - e)).toFixed(2)}deg)`;
    el.style.setProperty("--e", e.toFixed(4));
    el.style.setProperty("--cut", span(p, 0.32, 0.5).toFixed(4));
    const n = p > 0.82 ? 3 : p > 0.7 ? 2 : p > 0.58 ? 1 : 0;
    setStamped((cur) => (cur === n ? cur : n));
  }, []);
  useScrollProgress(root, apply);

  // Pointer: wall leans toward it, extrusion swings away. Fast, obvious.
  useEffect(() => {
    const el = pin.current;
    if (!el || still()) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: PointerEvent) => {
      tx = (e.clientX / innerWidth) * 2 - 1;
      ty = (e.clientY / innerHeight) * 2 - 1;
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  const play = () => {
    const el = root.current;
    if (el) scrollToY(el.offsetTop + (el.offsetHeight - innerHeight) * 0.86);
  };

  return (
    <section className="hero" id="top" ref={root} aria-label="Make kindness viral">
      <div className="hero__pin" ref={pin}>
        <div className="wall" aria-hidden>
          <div className="wall__tilt">
            {ROWS.map((row, r) => (
              <div key={r} className={`wall__row wall__row--${r}`}>
                {[...row, ...row].map((v, i) => (
                  <span key={`${v.id}-${i}`} className="wall__tile">
                    <img src={`/media/yt-${v.id}.jpg`} alt="" loading={r === 1 ? "eager" : "lazy"} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <h1 className="hero__title xt">
          <span className="hero__line">Make kindness</span>
          <span className="hero__line">
            <span className="hero__viral">viral</span>
          </span>
        </h1>

        <div className="now" ref={card}>
          <button className="now__frame" onClick={play} aria-label="Play: 2,000,000 People Get Clean Water For The First Time">
            <img className="now__thumb" src="/media/yt-Z4hVGCWH1Kc.jpg" alt="" />
            <img className="now__footage" src="/media/water-pump.jpg" alt="Students drinking from a new school water tap" />
            <span className="now__play" aria-hidden>
              <Play />
            </span>
            <span className="now__bar" aria-hidden>
              <i />
            </span>
          </button>
          <span className="now__tag sticker" aria-hidden>
            Now playing
          </span>
        </div>

        <div className="hero__side hero__side--l">
          <p>
            Real projects. Verified impact. Funded by the world&rsquo;s largest YouTube audience across 5 continents.
          </p>
        </div>
        <div className="hero__side hero__side--r">
          <a className="btn3d btn3d--pink" href={DONATE}>
            <span>
              <Heart className="ico ico--beat" /> Donate
            </span>
          </a>
          <button className="btn3d btn3d--white" onClick={play}>
            <span>
              <Play /> Watch
            </span>
          </button>
        </div>

        <div className="stamps" aria-live="polite">
          {STAMPS.map((s, i) => (
            <p key={s} className={`stamp xt ${i < stamped ? "is-on" : ""}`} style={{ "--i": i } as React.CSSProperties}>
              {s}
            </p>
          ))}
          <p className={`stamps__src ${stamped >= 3 ? "is-on" : ""}`}>#TeamWater · $40M+ raised in 31 days by 15K+ creators</p>
        </div>
      </div>
    </section>
  );
}
