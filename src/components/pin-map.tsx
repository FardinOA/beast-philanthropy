"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { LAND, MAP, SPOTS, type Spot } from "@/data/geo";
import { VideoModal } from "./modal";
import { ytThumb } from "@/lib/yt";
import { ArrowUpRight, Play } from "./icons";

/*
  "Explore our work": the live site's own 60 project pins on real Natural
  Earth land. Pins that share a place open as one card with
  Project n / total, the way the live map does.
*/
export function PinMap({ country, caption = "Click the pins to explore our work" }: { country?: string; caption?: string }) {
  const spots = country ? SPOTS.filter((s) => s.country === country) : SPOTS;
  const [open, setOpen] = useState<number | null>(country ? 0 : null);
  const [n, setN] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [play, setPlay] = useState<{ id: string; title: string } | null>(null);
  const spot: Spot | null = open === null ? null : spots[open];
  const p = spot?.projects[n];
  const total = spots.reduce((a, s) => a + s.projects.length, 0);

  const pick = (i: number) => {
    setOpen(i === open ? null : i);
    setN(0);
  };

  return (
    <div className="pmap">
      <div className="pmap__stage" data-reveal>
        <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} role="img" aria-label={`World map with ${total} Beast Philanthropy project pins`}>
          <path d={LAND} className="pmap__land" />
          {spots.map((s, i) => (
            <g
              key={`${s.x},${s.y}`}
              className={`pmap__pin ${open === i ? "is-on" : ""}`}
              transform={`translate(${s.x} ${s.y})`}
              style={{ "--d": i % 12 } as React.CSSProperties}
              onClick={() => pick(i)}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              role="button"
              tabIndex={0}
              aria-label={`${s.country}: ${s.projects.map((x) => x.title).join("; ")}`}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), pick(i))}
            >
              <circle r="11" className="pmap__ring" />
              <circle r="6.5" className="pmap__dot" />
              {s.projects.length > 1 && (
                <text className="pmap__count" y="2.6">
                  {s.projects.length}
                </text>
              )}
            </g>
          ))}
        </svg>
        {hover !== null && hover !== open && (
          <span className="pmap__tip" style={{ left: `${(spots[hover].x / MAP.width) * 100}%`, top: `${(spots[hover].y / MAP.height) * 100}%` }}>
            {spots[hover].country}
          </span>
        )}

        {spot && p && (
          <div
            className={`pmap__card ${spot.x > MAP.width * 0.62 ? "is-left" : ""}`}
            style={{ "--x": `${(spot.x / MAP.width) * 100}%`, "--y": `${(spot.y / MAP.height) * 100}%` } as React.CSSProperties}
            key={`${open}-${n}`}
          >
            <button className="pmap__thumb" onClick={() => setPlay({ id: p.ytId, title: p.title })} aria-label={`Play ${p.title}`}>
              <img src={ytThumb(p.ytId)} alt="" />
              <span className="pmap__play" aria-hidden>
                <Play />
              </span>
            </button>
            <div className="pmap__body">
              <span className="sticker">{p.country}</span>
              <b>{p.title}</b>
              {spot.projects.length > 1 && (
                <div className="pmap__pager">
                  <button onClick={() => setN((n + spot.projects.length - 1) % spot.projects.length)} aria-label="Previous project">
                    ‹
                  </button>
                  <span>
                    Project {n + 1} / {spot.projects.length}
                  </span>
                  <button onClick={() => setN((n + 1) % spot.projects.length)} aria-label="Next project">
                    ›
                  </button>
                </div>
              )}
              <div className="pmap__links">
                <a href={`https://www.youtube.com/watch?v=${p.ytId}`} target="_blank" rel="noopener" className="link-arrow">
                  Watch on YouTube <ArrowUpRight />
                </a>
                {!country && (
                  <button className="pmap__clear" onClick={() => setOpen(null)}>
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <p className="pmap__caption">
        {caption} · <b>{total}</b> {total === 1 ? "project" : "projects"}
      </p>
      {play && <VideoModal id={play.id} title={play.title} onClose={() => setPlay(null)} />}
    </div>
  );
}

/** The home and Who We Are section around the map. */
export function ExploreWork() {
  return (
    <section className="stage stage--paper explore" aria-labelledby="explore-h">
      <h2 id="explore-h" className="h2 xt xt--sm explore__title" data-slam style={{ "--r": "-4deg" } as React.CSSProperties}>
        Explore <span className="explore__pink">our work</span>
      </h2>
      <PinMap />
    </section>
  );
}
