"use client";

import { useRef, useState } from "react";
import { checkout } from "@/lib/content";
import { still } from "@/lib/scroll";
import { Heart } from "./icons";

const AMOUNTS = [10, 25, 50, 100, 250];
const COLORS = ["#EE357D", "#00BCE7", "#FFD23F", "#22B060", "#111114", "#FFFFFF"];

/** Canvas confetti from a point. No library; runs ~1.6s then clears itself. */
function burst(canvas: HTMLCanvasElement, x: number, y: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = Math.min(2, devicePixelRatio || 1);
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);
  const bits = Array.from({ length: 160 }, () => {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1;
    const v = 7 + Math.random() * 11;
    return { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4, w: 6 + Math.random() * 8, h: 4 + Math.random() * 6, c: COLORS[(Math.random() * COLORS.length) | 0] };
  });
  const t0 = performance.now();
  const frame = (now: number) => {
    const t = now - t0;
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    for (const b of bits) {
      b.vy += 0.38;
      b.vx *= 0.985;
      b.x += b.vx;
      b.y += b.vy;
      b.r += b.vr;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.r);
      ctx.globalAlpha = Math.max(0, 1 - t / 1700);
      ctx.fillStyle = b.c;
      ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h * Math.abs(Math.cos(b.r * 2)));
      ctx.restore();
    }
    if (t < 1700) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  };
  requestAnimationFrame(frame);
}

/** The close: pick an amount, then smash the button. It presses, bursts, and hands off to the real donation page. */
export function Donate() {
  const [monthly, setMonthly] = useState(false);
  const [amount, setAmount] = useState(50);
  const [pressed, setPressed] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);

  const smash = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (still() || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    const c = canvas.current;
    const r = e.currentTarget.getBoundingClientRect();
    const cr = c?.getBoundingClientRect();
    if (c && cr) burst(c, r.left - cr.left + r.width / 2, r.top - cr.top + r.height * 0.3);
    setPressed(true);
    const href = e.currentTarget.href;
    window.setTimeout(() => (window.location.href = href), 1100);
  };

  return (
    <section className="stage stage--pink donate" id="donate" aria-labelledby="donate-h">
      <canvas className="donate__confetti" ref={canvas} aria-hidden />
      <h2 id="donate-h" className="donate__title xt" data-slam style={{ "--r": "-6deg" } as React.CSSProperties}>
        You did this.
      </h2>
      <p className="donate__lede" data-reveal>
        You make this possible. Every time you watch, share, or engage, you&rsquo;re funding real impact for real people around the world.
        Want to go further?
      </p>

      <div className="donate__pick" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
        <div className="seg2" role="radiogroup" aria-label="Frequency">
          <button role="radio" aria-checked={!monthly} className={!monthly ? "is-on" : ""} onClick={() => setMonthly(false)}>
            One time
          </button>
          <button role="radio" aria-checked={monthly} className={monthly ? "is-on" : ""} onClick={() => setMonthly(true)}>
            Monthly
          </button>
        </div>
        <div className="chips2" role="radiogroup" aria-label="Amount">
          {AMOUNTS.map((a) => (
            <button key={a} role="radio" aria-checked={amount === a} className={`chip2 ${amount === a ? "is-on" : ""}`} onClick={() => setAmount(a)}>
              ${a}
            </button>
          ))}
        </div>
      </div>

      <a className={`smash ${pressed ? "is-pressed" : ""}`} href={checkout(amount, monthly)} onClick={smash} data-slam style={{ "--r": "0deg", "--d": 2 } as React.CSSProperties}>
        <span className="smash__top">
          <Heart className="ico smash__heart" />
          <span className="smash__label">
            Donate ${amount}
            {monthly ? <small>/month</small> : null}
          </span>
        </span>
      </a>
      <p className="donate__note">Continues on our secure Donorbox checkout. Tax deductible · EIN 85-2067214</p>
    </section>
  );
}
