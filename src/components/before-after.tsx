"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { BEFORE_AFTER } from "@/lib/content";
import { clamp, still } from "@/lib/scroll";

/** MrBeast's own format: drag the split from BEFORE to AFTER. Demonstrates itself once on entry. */
export function BeforeAfter() {
  const [tab, setTab] = useState(0);
  const [split, setSplit] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [vert, setVert] = useState(false);
  const item = BEFORE_AFTER[tab];

  // Phones split top/bottom so neither caption is cut mid-word.
  useEffect(() => {
    const mq = matchMedia("(max-width: 760px)");
    const sync = () => setVert(mq.matches);
    const id = setTimeout(sync);
    mq.addEventListener("change", sync);
    return () => {
      clearTimeout(id);
      mq.removeEventListener("change", sync);
    };
  }, []);

  // One wiggle when it first comes into view, so people know it moves.
  useEffect(() => {
    const el = frame.current;
    if (!el || still()) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const t = (now - t0) / 1600;
          if (dragging.current || t >= 1) return setSplit((s) => (dragging.current ? s : 50));
          setSplit(50 + Math.sin(t * Math.PI * 2) * 28 * (1 - t));
          raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const at = (e: React.PointerEvent) => {
    const r = frame.current?.getBoundingClientRect();
    if (!r) return;
    const t = vert ? (e.clientY - r.top) / r.height : (e.clientX - r.left) / r.width;
    setSplit(clamp(t * 100, 4, 96));
  };

  return (
    <section className="ba" aria-labelledby="ba-h">
      <div className="ba__head">
        <h2 id="ba-h" className="h2 xt xt--sm ba__title">
          <span className="ba__word ba__word--before">Before</span>
          <span className="ba__arrow" aria-hidden>
            →
          </span>
          <span className="ba__word ba__word--after">After</span>
        </h2>
        <div className="ba__tabs" role="tablist" aria-label="Campaign">
          {BEFORE_AFTER.map((b, i) => (
            <button key={b.id} role="tab" aria-selected={tab === i} className={`ba__tab ${tab === i ? "is-on" : ""}`} onClick={() => setTab(i)}>
              {b.tab}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`ba__frame ${vert ? "is-vert" : ""}`}
        ref={frame}
        style={{ "--split": `${split}%` } as React.CSSProperties}
        onPointerDown={(e) => {
          // On touch, only the handle drags, so the page still scrolls.
          if (e.pointerType !== "mouse" && !(e.target as HTMLElement).closest(".ba__handle")) return;
          dragging.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          at(e);
        }}
        onPointerMove={(e) => dragging.current && at(e)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <div className="ba__after" key={`a-${item.id}`}>
          <img src={item.after.img} alt={item.after.alt} />
          <div className="ba__copy ba__copy--after">
            <span className="ba__label sticker">After</span>
            <p className="ba__big xt">{item.after.big}</p>
            <p className="ba__line">{item.after.line}</p>
            <p className="ba__body">{item.after.body}</p>
          </div>
        </div>
        <div className="ba__before" key={`b-${item.id}`}>
          <div className="ba__copy">
            <span className="ba__label sticker sticker--ink">Before</span>
            <p className="ba__big xt">{item.before.big}</p>
            <p className="ba__line">{item.before.line}</p>
            <p className="ba__body">{item.before.body}</p>
          </div>
        </div>
        <div
          className="ba__handle"
          role="slider"
          tabIndex={0}
          aria-label="Before and after split"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(split)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") setSplit((s) => clamp(s - 5, 4, 96));
            if (e.key === "ArrowRight" || e.key === "ArrowDown") setSplit((s) => clamp(s + 5, 4, 96));
          }}
        >
          <span>
            <i>‹</i>
            <i>›</i>
          </span>
        </div>
      </div>
      <p className="ba__note">Drag to compare. Figures from each campaign page on beastphilanthropy.org.</p>
    </section>
  );
}
