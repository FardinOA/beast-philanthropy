"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, type ReactNode } from "react";
import { SOCIALS, VIDEOS } from "@/lib/content";
import { ArrowUpRight, Play, Verified } from "./icons";
import { VideoModal } from "./modal";
import { ytThumb } from "@/lib/yt";

export type Video = { id: string; title: string; channel?: string };

/** One video card: lifts and tilts on hover, a preview bar runs, click plays the real embed. */
export function VideoCard({ v, lead, onPlay }: { v: Video; lead?: boolean; onPlay: (v: Video) => void }) {
  return (
    <button className="vcard" onClick={() => onPlay(v)}>
      <span className="vcard__thumb">
        <img src={ytThumb(v.id, lead ? "maxresdefault" : "hqdefault")} alt="" loading="lazy" />
        <span className="vcard__play" aria-hidden>
          <Play />
        </span>
        <span className="vcard__bar" aria-hidden>
          <i />
        </span>
      </span>
      <span className="vcard__meta">
        <img className="vcard__avatar" src="/media/avatar.png" alt="" />
        <span>
          <b>{v.title}</b>
          <span className="vcard__ch">
            {v.channel ?? "Beast Philanthropy"} <Verified className="ico ico--xs" />
          </span>
        </span>
      </span>
    </button>
  );
}

/** A grid of videos that share one modal player. */
export function VideoGrid({ videos, lead = false }: { videos: Video[]; lead?: boolean }) {
  const [open, setOpen] = useState<Video | null>(null);
  return (
    <>
      <ul className="vgrid">
        {videos.map((x, i) => (
          <li key={`${x.id}-${i}`} className={lead && i === 0 ? "vgrid__lead" : ""} data-reveal style={{ "--d": i % 4 } as React.CSSProperties}>
            <VideoCard v={x} lead={lead && i === 0} onPlay={setOpen} />
          </li>
        ))}
      </ul>
      {open && <VideoModal id={open.id} title={open.title} onClose={() => setOpen(null)} />}
    </>
  );
}

/** "Up next" on home, "Check out our latest work" on campaign pages. */
export function Feed({ title = "Up next", videos = VIDEOS, id = "media" }: { title?: ReactNode; videos?: readonly Video[]; id?: string }) {
  return (
    <section className="stage stage--ink feed" id={id} aria-label="Latest videos">
      <div className="feed__head">
        <h2 className="h2 xt xt--sm xt--light" data-slam style={{ "--r": "4deg" } as React.CSSProperties}>
          {title}
        </h2>
        <a className="link-arrow link-arrow--light" href={SOCIALS[0].href} target="_blank" rel="noopener">
          Every film on YouTube <ArrowUpRight />
        </a>
      </div>
      <VideoGrid videos={[...videos]} lead />
    </section>
  );
}
