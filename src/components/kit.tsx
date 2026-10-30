/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { VERIFIED } from "@/lib/content";
import { Arrow, ArrowUpRight, Check } from "./icons";

type Tone = "paper" | "yellow" | "cyan" | "pink" | "ink" | "leaf" | "mist";
const css = (v: Record<string, string | number>) => v as React.CSSProperties;

/** Sanity CDN images resized for the slot they fill. */
export const cdn = (src: string | undefined, w = 1400) => (!src ? "" : src.includes("cdn.sanity.io/images") ? `${src}?w=${w}&auto=format&q=78` : src);

/*
  Page hero. Never a split: the title stacks across the page, the lede and
  actions sit in one row under it, and the page's own photo hangs below as
  a wide, slightly tilted thumbnail with stickers on it.
*/
export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
  tone = "paper",
  photo,
  stickers,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  tone?: Tone;
  photo?: { src: string; alt: string };
  stickers?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={`phero stage stage--${tone}`}>
      <span className="sticker phero__eyebrow" data-slam style={css({ "--r": "-12deg", "--rot": "-4deg" })}>
        {eyebrow}
      </span>
      <h1 className="phero__title xt">{title}</h1>
      {(lede || actions) && (
        <div className="phero__row" data-reveal style={css({ "--d": 2 })}>
          {lede && <div className="phero__lede">{lede}</div>}
          {actions && <div className="phero__actions">{actions}</div>}
        </div>
      )}
      {photo && (
        <figure className="phero__photo" data-slam style={css({ "--r": "4deg", "--rot": "-1.2deg", "--d": 3 })}>
          <img src={cdn(photo.src, 2000)} alt={photo.alt} fetchPriority="high" />
          {stickers}
        </figure>
      )}
      {children}
    </section>
  );
}

/** Section head: a thumbnail-type headline that slams in, with an optional side note. */
export function Head({ title, lede, light, r = -4, id }: { title: ReactNode; lede?: ReactNode; light?: boolean; r?: number; id?: string }) {
  return (
    <div className="shead">
      <h2 id={id} className={`h2 xt xt--sm ${light ? "xt--light" : ""}`} data-slam style={css({ "--r": `${r}deg` })}>
        {title}
      </h2>
      {lede && (
        <div className="shead__lede" data-reveal style={css({ "--d": 1 })}>
          {lede}
        </div>
      )}
    </div>
  );
}

export function Stage({ tone = "paper", children, id, className = "", label }: { tone?: Tone; children: ReactNode; id?: string; className?: string; label?: string }) {
  return (
    <section id={id} className={`stage stage--${tone} ${className}`} aria-label={label}>
      {children}
    </section>
  );
}

/** Chunky cards that slam in on alternating tilts. */
export function Cards({ items, cols = 3 }: { items: { n?: string; title: ReactNode; body?: ReactNode; tone?: Tone; extra?: ReactNode }[]; cols?: number }) {
  return (
    <ol className="ccards" style={css({ "--cols": cols })}>
      {items.map((c, i) => {
        const rot = [-2, 1.5, -1, 2][i % 4];
        return (
          <li key={i} className={`ccard ccard--${c.tone ?? "paper"}`} data-slam style={css({ "--r": `${rot * -4}deg`, "--rot": `${rot}deg`, "--d": i })}>
            {c.n && <span className="ccard__n">{c.n}</span>}
            <h3 className="ccard__title">{c.title}</h3>
            {c.body && <div className="ccard__body">{c.body}</div>}
            {c.extra}
          </li>
        );
      })}
    </ol>
  );
}

/** A cycle drawn as chunky chips joined by arrows, popping in one after another. */
export function Chain({ steps, loop }: { steps: string[]; loop?: boolean }) {
  return (
    <ol className="chain" aria-label={steps.join(", then ")}>
      {steps.map((s, i) => (
        <li key={s} data-slam style={css({ "--r": `${i % 2 ? 8 : -8}deg`, "--rot": `${i % 2 ? 1.5 : -1.5}deg`, "--d": i })}>
          <span className="chain__chip">{s}</span>
          {(i < steps.length - 1 || loop) && (
            <span className="chain__arrow" aria-hidden>
              {i < steps.length - 1 ? "→" : "↺"}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

export type TimelineItem = { status: string; date: string; title: string; body?: ReactNode; foot?: ReactNode };

/** Campaign journey: a thick ink spine with status stickers. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  const tone = (s: string) => (/complete/i.test(s) ? "done" : /progress|live/i.test(s) ? "live" : "ahead");
  return (
    <ol className="tline">
      {items.map((t, i) => (
        <li key={i} className={`tline__item tline__item--${tone(t.status)}`} data-reveal style={css({ "--d": i % 3 })}>
          <span className="tline__dot" aria-hidden>
            {tone(t.status) === "done" ? <Check /> : null}
          </span>
          <div className="tline__card">
            <div className="tline__meta">
              <span className={`tline__status tline__status--${tone(t.status)}`}>{t.status}</span>
              <time>{t.date}</time>
            </div>
            <h3>{t.title}</h3>
            {t.body && <div className="tline__body">{t.body}</div>}
            {t.foot && <div className="tline__foot">{t.foot}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** The three watchdog seals, as chunky chips. */
export function Seals({ heading = "Verified by:" }: { heading?: string }) {
  return (
    <div className="seals3" data-reveal>
      <span className="seals3__h">{heading}</span>
      <ul className="seals2">
        {VERIFIED.map((v) => (
          <li key={v.name}>
            <a href={v.href} target="_blank" rel="noopener">
              <img src={v.img} alt="" />
              <span>
                <b>{v.name}</b>
                {v.note}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Big-number stat that isn't counted (ratios, years, "$1"). */
export function BigStat({ value, label, tone = "paper", i = 0 }: { value: string; label: ReactNode; tone?: Tone; i?: number }) {
  return (
    <div className={`bstat bstat--${tone}`} data-slam style={css({ "--r": `${i % 2 ? 6 : -6}deg`, "--d": i })}>
      <span className="bstat__v xt xt--sm">{value}</span>
      <span className="bstat__l">{label}</span>
    </div>
  );
}

export function StatRow({ children, cols = 4 }: { children: ReactNode; cols?: number }) {
  return (
    <div className="statrow" style={css({ "--cols": cols })}>
      {children}
    </div>
  );
}

export function TextLink({ href, children, light, external }: { href: string; children: ReactNode; light?: boolean; external?: boolean }) {
  const ext = external ?? /^https?:/.test(href);
  return (
    <a className={`link-arrow ${light ? "link-arrow--light" : ""}`} href={href} {...(ext ? { target: "_blank", rel: "noopener" } : {})}>
      {children} {ext ? <ArrowUpRight /> : <Arrow />}
    </a>
  );
}

export function Btn({ href, children, tone = "pink", external }: { href: string; children: ReactNode; tone?: "pink" | "white"; external?: boolean }) {
  const ext = external ?? /^https?:/.test(href);
  return (
    <a className={`btn3d btn3d--${tone}`} href={href} {...(ext ? { target: "_blank", rel: "noopener" } : {})}>
      <span>{children}</span>
    </a>
  );
}

/** Prose block for long copy: comfortable measure, bold lead-ins allowed. */
export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`prose ${className}`} data-reveal>
      {children}
    </div>
  );
}

/** A chunky photo with an optional caption sticker. */
export function Photo({ src, alt, tilt = 0, caption, ratio = "4 / 3", w = 1200 }: { src: string; alt: string; tilt?: number; caption?: string; ratio?: string; w?: number }) {
  return (
    <figure className="cphoto" data-slam style={css({ "--rot": `${tilt}deg`, "--r": `${tilt * -3}deg`, "--ratio": ratio })}>
      <img src={cdn(src, w)} alt={alt} loading="lazy" />
      {caption && <figcaption className="sticker">{caption}</figcaption>}
    </figure>
  );
}
