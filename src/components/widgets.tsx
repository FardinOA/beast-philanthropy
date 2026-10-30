"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { checkout } from "@/lib/content";
import type { Community, MediaVideo, Story, TreeProject, Update, WaterProject } from "@/lib/site";
import { still } from "@/lib/scroll";
import { cdn } from "./kit";
import { Modal, VideoModal } from "./modal";
import { ytId, ytThumb } from "@/lib/yt";
import { VideoGrid } from "./feed";
import { Comments, type QA } from "./questions";
import { ArrowUpRight, Heart, Play } from "./icons";

/* ---------------------------------------------------------------- impact stories */
export function StoryGrid({ stories }: { stories: Story[] }) {
  const [open, setOpen] = useState<Story | null>(null);
  return (
    <>
      <ul className="stories">
        {stories.map((s, i) => (
          <li key={s.imageUrl} data-reveal style={{ "--d": i % 4 } as React.CSSProperties}>
            <button className="story" onClick={() => setOpen(s)}>
              <span className="story__img">
                <img src={cdn(s.imageUrl, 700)} alt={s.alt} loading="lazy" />
                {s.kind === "video" && (
                  <span className="vcard__play" aria-hidden>
                    <Play />
                  </span>
                )}
              </span>
              <span className="story__body">
                {s.story ? (
                  <>
                    <b>{s.story.name}</b>
                    <span className="story__role">{s.story.role}</span>
                    <p>{s.story.impact}</p>
                    <span className="story__more">Read their story</span>
                  </>
                ) : (
                  <>
                    <b>Watch the story</b>
                    <span className="story__more">Play video</span>
                  </>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {open?.kind === "video" && open.videoUrl && <VideoModal id={ytId(open.videoUrl)} title={open.alt} onClose={() => setOpen(null)} />}
      {open?.story && (
        <Modal label={open.story.name} onClose={() => setOpen(null)}>
          <div className="sheet">
            <div className="sheet__img">
              <img src={cdn(open.imageUrl, 900)} alt={open.alt} />
            </div>
            <div className="sheet__body">
              <span className="story__role">{open.story.role}</span>
              <h2>{open.story.name}</h2>
              <p className="sheet__impact">{open.story.impact}</p>
              {open.story.body.split(/\n+/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <button className="btn3d btn3d--white btn3d--sm sheet__close" onClick={() => setOpen(null)} autoFocus>
                <span>Close</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

/* ---------------------------------------------------------------- media library */
const TOPIC = (t?: string) => (t ? t[0].toUpperCase() + t.slice(1) : "");

export function MediaLibrary({ videos }: { videos: MediaVideo[] }) {
  const topics = [...new Set(videos.map((v) => v.topic).filter(Boolean))] as string[];
  const [topic, setTopic] = useState<string | null>(null);
  const [shown, setShown] = useState(12);
  const list = videos.filter((v) => !topic || v.topic === topic);
  return (
    <>
      <div className="filters" role="radiogroup" aria-label="Filter by topic">
        <button role="radio" aria-checked={!topic} className={`chip ${!topic ? "is-on" : ""}`} onClick={() => (setTopic(null), setShown(12))}>
          All
        </button>
        {topics.map((t) => (
          <button key={t} role="radio" aria-checked={topic === t} className={`chip ${topic === t ? "is-on" : ""}`} onClick={() => (setTopic(t), setShown(12))}>
            {TOPIC(t)}
          </button>
        ))}
      </div>
      <VideoGrid key={topic ?? "all"} videos={list.slice(0, shown).map((v) => ({ id: v.youtubeId, title: v.title, channel: v.campaignTitle ?? undefined }))} />
      {shown < list.length && (
        <div className="more-row">
          <button className="btn3d btn3d--white" onClick={() => setShown((n) => n + 12)}>
            <span>Load more · {list.length - shown} left</span>
          </button>
        </div>
      )}
    </>
  );
}

/* ---------------------------------------------------------------- news updates */
export function Updates({ items }: { items: Update[] }) {
  const [open, setOpen] = useState<Update | null>(null);
  return (
    <>
      <ul className="updates">
        {items.map((u, i) => (
          <li key={u.href} className="ucard" data-reveal style={{ "--d": i % 4 } as React.CSSProperties}>
            <button className="vcard" onClick={() => setOpen(u)}>
              <span className="vcard__thumb">
                <img src={ytThumb(ytId(u.href))} alt="" loading="lazy" />
                <span className="vcard__play" aria-hidden>
                  <Play />
                </span>
                <span className="vcard__bar" aria-hidden>
                  <i />
                </span>
              </span>
              <time>{u.date}</time>
              <b>{u.title}</b>
              <p>{u.excerpt}</p>
            </button>
          </li>
        ))}
      </ul>
      {open && <VideoModal id={ytId(open.href)} title={open.title} onClose={() => setOpen(null)} />}
    </>
  );
}

/* ---------------------------------------------------------------- #TeamWater projects */
const WSTATUS: Record<string, string> = { "in-progress": "In progress", completed: "Completed" };

export function WaterProjects({ items }: { items: WaterProject[] }) {
  const [f, setF] = useState<string | null>(null);
  const list = items.filter((p) => !f || p.status === f);
  return (
    <>
      <div className="filters" role="radiogroup" aria-label="Filter by status">
        {[null, "in-progress", "completed"].map((s) => (
          <button key={s ?? "all"} role="radio" aria-checked={f === s} className={`chip ${f === s ? "is-on" : ""}`} onClick={() => setF(s)}>
            {s ? WSTATUS[s] : "All"} · {items.filter((p) => !s || p.status === s).length}
          </button>
        ))}
      </div>
      <ul className="wproj">
        {list.map((p, i) => (
          <li key={`${p.name}-${p.location}`}>
            <article className="wcard" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="wcard__top">
                {p.flag ? <img className="wcard__flag" src={p.flag} alt="" /> : <span className="wcard__flag" />}
                <div>
                  <h3>{p.name}</h3>
                  <span className="wcard__where">
                    {p.location} · {p.dates}
                  </span>
                </div>
              </div>
              <span className={`tline__status tline__status--${p.status === "completed" ? "done" : "live"}`} style={{ alignSelf: "flex-start" }}>
                {WSTATUS[p.status] ?? p.status}
              </span>
              <ul>
                {p.detail.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <span className="wcard__partner">Partner: {p.detail.partner}</span>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ---------------------------------------------------------------- #TeamTrees projects */
export function TreeProjects({ items }: { items: TreeProject[] }) {
  const continents = [...new Set(items.map((p) => p.continent))];
  const [c, setC] = useState(continents[0]);
  const [open, setOpen] = useState<TreeProject | null>(null);
  const list = items.filter((p) => p.continent === c);
  const trees = list.reduce((a, p) => a + p.treeCount, 0);
  return (
    <>
      <div className="filters" role="radiogroup" aria-label="Continent">
        {continents.map((x) => (
          <button key={x} role="radio" aria-checked={c === x} className={`chip ${c === x ? "is-on" : ""}`} onClick={() => setC(x)}>
            {x}
          </button>
        ))}
      </div>
      <p className="legend">
        {list.length} projects · {trees.toLocaleString("en-US")} trees in {c}
      </p>
      <ul className="tproj" key={c}>
        {list.map((p, i) => (
          <li key={`${p.title}-${p.place}`}>
            <article className="tcard2" style={{ animationDelay: `${(i % 9) * 45}ms` }}>
              <div className="tcard2__img">
                <img src={cdn(p.image, 700)} alt={p.imageAlt ?? `${p.place}, ${p.title}`} loading="lazy" />
                <span className="tcard2__count">{p.treeCount.toLocaleString("en-US")} trees</span>
              </div>
              <div className="tcard2__body">
                <span className="tcard2__place">
                  {p.status} · {p.place}
                </span>
                <b>{p.title}</b>
                <p>{p.desc}</p>
                {p.story && (
                  <button className="tcard2__more" onClick={() => setOpen(p)}>
                    Read the full story
                  </button>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
      {open && (
        <Modal label={open.title} onClose={() => setOpen(null)}>
          <div className="sheet">
            <div className="sheet__img">
              <img src={cdn(open.image, 900)} alt={open.imageAlt ?? open.place} />
            </div>
            <div className="sheet__body">
              <span className="story__role">
                {open.continent} · {open.status}
              </span>
              <h2>{open.title}</h2>
              <p className="sheet__impact">
                {open.place} · {open.treeCount.toLocaleString("en-US")} trees
              </p>
              {(open.story ?? "").split(/\n+/).map((x, i) => (
                <p key={i}>{x}</p>
              ))}
              <button className="btn3d btn3d--white btn3d--sm sheet__close" onClick={() => setOpen(null)} autoFocus>
                <span>Close</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

/* ---------------------------------------------------------------- Ghana communities */
type Part = { text: string; mark?: string };

export function Communities({ items }: { items: Community[] }) {
  const [i, setI] = useState(0);
  const groups: { label: string; meta: string; blurb: string; idx: number[] }[] = [];
  items.forEach((c, k) => {
    const g = c.group;
    if (g) groups.push({ ...g, idx: [k] });
    else groups[groups.length - 1]?.idx.push(k);
  });
  const c = items[i];
  const yearHead = c.table.byYearHeading;
  return (
    <div className="comm">
      <div className="comm__groups">
        {groups.map((g) => (
          <div className="comm__group" key={g.label}>
            <h3>{g.label}</h3>
            <p>
              {g.meta}. {g.blurb}
            </p>
            <div className="comm__chips" role="radiogroup" aria-label={g.label}>
              {g.idx.map((k) => (
                <button key={k} role="radio" aria-checked={k === i} className={k === i ? "is-on" : ""} onClick={() => setI(k)}>
                  {items[k].name.replace("Community ", "#")}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="comm__panel" key={i}>
        <span className="sticker">{c.status}</span>
        <h3 style={{ marginTop: 14 }}>{c.name}</h3>
        <p className="comm__meta">{c.meta}</p>
        <div className="legend">
          <span>
            <i className="mark mark--done">Achieved</i> Live now
          </span>
          <span>
            <i className="mark mark--planned">Planned</i> Not yet delivered
          </span>
        </div>
        <table className="ctable">
          <thead>
            <tr>
              <th scope="col">Area</th>
              <th scope="col">Day one, what we found</th>
              <th scope="col">{yearHead}</th>
            </tr>
          </thead>
          <tbody>
            {c.table.rows.map((r) => {
              const parts = (r as unknown as { byYearParts?: Part[] }).byYearParts;
              return (
                <tr key={r.area}>
                  <td>{r.area}</td>
                  <td className={r.dayOneMuted ? "is-muted" : ""}>{r.dayOne ?? "Same"}</td>
                  <td>
                    {parts
                      ? parts.map((p, k) => (
                          <span key={k} style={{ display: "block" }}>
                            {p.mark && <i className={`mark mark--${p.mark}`}>{p.mark === "done" ? "Live" : "Planned"}</i>}
                            {p.text}
                          </span>
                        ))
                      : (
                          <>
                            {r.mark && <i className={`mark mark--${r.mark}`}>{r.mark === "done" ? "Live" : "Planned"}</i>}
                            {r.byYear}
                          </>
                        )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="legend-note">
          &ldquo;Day one&rdquo; = each community&rsquo;s starting conditions. &ldquo;By year one&rdquo; = where that first year is designed to land. The
          three groups start at different times, so year one falls on a different date for each. Child-labor band (High · Very High · Extreme) is a
          severity guide relative to the regional norm, not a published figure.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- donate box */
const AMOUNTS = [25, 50, 100, 250, 500];

export function DonateBox() {
  const [monthly, setMonthly] = useState(false);
  const [amount, setAmount] = useState<number | "other">(50);
  const [other, setOther] = useState("");
  const [pressed, setPressed] = useState(false);
  const btn = useRef<HTMLAnchorElement>(null);
  const value = amount === "other" ? Number(other) || 0 : amount;
  const href = value > 0 ? checkout(value, monthly) : checkout(50, monthly);

  return (
    <div className="dbox" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
      <div>
        <h2>Choose your amount</h2>
        <div className="seg2" role="radiogroup" aria-label="Frequency" style={{ marginBottom: 18 }}>
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
          <label className={`dbox__other ${amount === "other" ? "is-on" : ""}`}>
            $
            <input
              inputMode="numeric"
              placeholder="Other"
              value={other}
              aria-label="Other amount in US dollars"
              onFocus={() => setAmount("other")}
              onChange={(e) => {
                setAmount("other");
                setOther(e.target.value.replace(/\D/g, "").slice(0, 6));
              }}
            />
          </label>
        </div>
      </div>
      <div className="dbox__side">
        <a
          ref={btn}
          className={`smash ${pressed ? "is-pressed" : ""}`}
          href={href}
          onClick={(e) => {
            if (still() || e.metaKey || e.ctrlKey) return;
            e.preventDefault();
            setPressed(true);
            const to = e.currentTarget.href;
            window.setTimeout(() => (window.location.href = to), 420);
          }}
        >
          <span className="smash__top">
            <Heart className="ico smash__heart" />
            <span className="smash__label">
              Donate {value > 0 ? `$${value.toLocaleString("en-US")}` : ""}
              {monthly ? <small>/month</small> : null}
            </span>
          </span>
        </a>
        <p className="dbox__note">
          Mentions of specific programs or campaigns are illustrative and do not restrict how your gift is used. Beast Philanthropy retains full
          discretion over the allocation of funds, including the ability to redirect them if a program is fully funded or discontinued.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- board letter */
export function Letter({ paragraphs, sign }: { paragraphs: string[]; sign: string[] }) {
  const [full, setFull] = useState(false);
  return (
    <div className="letter" data-reveal>
      <h3>Welcome</h3>
      <div className={full ? "" : "letter__fade"}>
        {paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
        <p className="letter__sign">
          {sign.map((s) => (
            <span key={s} style={{ display: "block" }}>
              {s}
            </span>
          ))}
        </p>
      </div>
      {!full && (
        <button className="btn3d btn3d--white letter__more" onClick={() => setFull(true)}>
          <span>Read more</span>
        </button>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- FAQ tabs */
export function FaqTabs({ cats }: { cats: { label: string; items: QA[] }[] }) {
  const [t, setT] = useState(0);
  return (
    <>
      <div className="filters" role="tablist" aria-label="FAQ categories">
        {cats.map((c, i) => (
          <button key={c.label} role="tab" aria-selected={t === i} className={`chip ${t === i ? "is-on" : ""}`} onClick={() => setT(i)}>
            {c.label} · {c.items.length}
          </button>
        ))}
      </div>
      <Comments key={t} items={cats[t].items} seed={2} />
    </>
  );
}

/* ---------------------------------------------------------------- a pantry journey step */
export function PantrySteps({ steps }: { steps: { copy: { text: string; bold: boolean }[]; imageUrl: string; alt: string; videoUrl?: string }[] }) {
  const [open, setOpen] = useState<{ id: string; title: string } | null>(null);
  return (
    <>
      <ol className="ccards" style={{ "--cols": 3 } as React.CSSProperties}>
        {steps.map((s, i) => (
          <li key={i} className={`ccard ccard--${["paper", "yellow", "cyan", "pink", "paper", "yellow"][i % 6]}`} data-slam style={{ "--r": `${i % 2 ? 8 : -8}deg`, "--rot": `${i % 2 ? 1.2 : -1.2}deg`, "--d": i % 3 } as React.CSSProperties}>
            <span className="ccard__img">
              <img src={s.imageUrl ? cdn(s.imageUrl, 700) : ytThumb(ytId(s.videoUrl ?? ""))} alt={s.alt} loading="lazy" />
            </span>
            <span className="ccard__n" style={{ marginBottom: 0 }}>
              {i + 1}
            </span>
            <div className="ccard__body">
              {s.copy.map((c, k) => (c.bold ? <b key={k}>{c.text}</b> : <span key={k}>{c.text}</span>))}
            </div>
            {s.videoUrl && ytId(s.videoUrl) && (
              <button className="link-arrow" style={{ alignSelf: "flex-start", border: 0, background: "none", cursor: "pointer" }} onClick={() => setOpen({ id: ytId(s.videoUrl!), title: s.alt })}>
                Watch <ArrowUpRight />
              </button>
            )}
          </li>
        ))}
      </ol>
      {open && <VideoModal id={open.id} title={open.title} onClose={() => setOpen(null)} />}
    </>
  );
}
