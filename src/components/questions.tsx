"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { QUESTIONS } from "@/lib/content";
import { still } from "@/lib/scroll";
import { Arrow, Heart, Send, Verified } from "./icons";

export type QA = { q: string; a: string; link?: { label: string; href: string } };
type Thread = QA & { key: number; typed: number; stage: "asked" | "typing" | "done" };

const STOP = new Set("a an the is are do does how what where who why you your to of in on for and it i my can".split(" "));
const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));

/** Best FAQ match for a typed question, by shared words. */
function match(text: string, items: QA[]) {
  const ask = new Set(words(text));
  let best = -1, score = 0;
  items.forEach((item, i) => {
    const pool = new Set([...words(item.q), ...words(item.a)]);
    const n = [...ask].filter((w) => pool.has(w) || [...pool].some((p) => p.startsWith(w) || w.startsWith(p))).length;
    if (n > score) [best, score] = [i, n];
  });
  return best;
}

const FALLBACK = {
  a: "Good one. That isn't covered here yet, but our FAQ goes deeper on donations, financials and every campaign.",
  link: { label: "Open the full FAQ", href: "/faq" },
};

/** The FAQ as a comment section: ask, and the pinned creator reply types in under your comment. */
export function Comments({ items, seed = 1 }: { items: QA[]; seed?: number }) {
  const first = Math.min(seed, items.length);
  const [threads, setThreads] = useState<Thread[]>(() => items.slice(0, first).reverse().map((it, k) => ({ key: k, ...it, typed: it.a.length, stage: "done" })));
  const [asked, setAsked] = useState<Set<number>>(() => new Set(items.slice(0, first).map((_, i) => i)));
  const [draft, setDraft] = useState("");
  const seq = useRef(first);

  // Type out the newest reply.
  const pending = threads.find((t) => t.stage !== "done");
  useEffect(() => {
    if (!pending) return;
    const calm = still();
    if (pending.stage === "asked") {
      const id = setTimeout(() => setThreads((ts) => ts.map((t) => (t.key === pending.key ? { ...t, stage: "typing", typed: calm ? t.a.length : 0 } : t))), calm ? 0 : 650);
      return () => clearTimeout(id);
    }
    const id = setTimeout(
      () =>
        setThreads((ts) =>
          ts.map((t) => {
            if (t.key !== pending.key) return t;
            const typed = Math.min(t.a.length, t.typed + 4);
            return { ...t, typed, stage: typed >= t.a.length ? "done" : "typing" };
          }),
        ),
      16,
    );
    return () => clearTimeout(id);
  }, [pending]);

  const post = (q: string, i: number) => {
    const item = i >= 0 ? items[i] : FALLBACK;
    setThreads((ts) => [{ key: seq.current++, q, a: item.a, link: item.link, typed: 0, stage: "asked" }, ...ts]);
    if (i >= 0) setAsked((s) => new Set(s).add(i));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = draft.trim();
    if (!q || pending) return;
    post(q, match(q, items));
    setDraft("");
  };

  const open = items.map((q, i) => ({ ...q, i })).filter((q) => !asked.has(q.i));

  return (
    <div className="comments" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
      <div className="comments__head">
        <b>
          {threads.length} {threads.length === 1 ? "question" : "questions"}
        </b>
        <span>Sorted by newest</span>
      </div>

      <form className="composer" onSubmit={submit}>
        <span className="avatar avatar--you" aria-hidden>
          You
        </span>
        <label className="sr" htmlFor={`ask-${items[0]?.q.length ?? 0}`}>
          Ask Beast Philanthropy a question
        </label>
        <input id={`ask-${items[0]?.q.length ?? 0}`} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a question…" autoComplete="off" />
        <button type="submit" className="composer__send" disabled={!draft.trim() || !!pending} aria-label="Post question">
          <Send />
        </button>
      </form>

      <div className="suggest" aria-label="Suggested questions">
        {open.length ? (
          open.map((q) => (
            <button key={q.i} className="suggest__chip" onClick={() => post(q.q, q.i)} disabled={!!pending}>
              {q.q}
            </button>
          ))
        ) : (
          <span className="suggest__done">That&rsquo;s every question in this list.</span>
        )}
      </div>

      <ol className="threads" aria-live="polite">
        {threads.map((t) => (
          <li key={t.key} className="thread">
            <div className="comment">
              <span className="avatar avatar--you" aria-hidden>
                You
              </span>
              <div className="comment__body">
                <span className="comment__who">
                  @you <em>just now</em>
                </span>
                <p>{t.q}</p>
                {t.stage === "done" && (
                  <span className="comment__heart">
                    <Heart className="ico ico--xs" /> by Beast Philanthropy
                  </span>
                )}
              </div>
            </div>
            {t.stage !== "asked" ? (
              <div className="comment comment--reply">
                <img className="avatar" src="/media/avatar.png" alt="" />
                <div className="comment__body">
                  <span className="comment__who">
                    @BeastPhilanthropy <Verified className="ico ico--xs" />
                    <em className="comment__pin">Creator</em>
                  </span>
                  <p>
                    {t.a.slice(0, t.typed)}
                    {t.stage === "typing" && <span className="caret" aria-hidden />}
                  </p>
                  {t.stage === "done" && t.link && (
                    <a className="comment__link" href={t.link.href}>
                      {t.link.label} <Arrow className="ico ico--xs" />
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="comment comment--reply comment--wait" aria-label="Beast Philanthropy is replying">
                <img className="avatar" src="/media/avatar.png" alt="" />
                <span className="dots">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Section wrapper: headline and note on the left, the thread on the right. */
export function Questions({
  items = QUESTIONS,
  title = (
    <>
      Ask it in
      <br />
      the comments.
    </>
  ),
  note = "Every answer here comes straight from our FAQ. Pick a question or type your own.",
  more = true,
  id,
}: {
  items?: QA[];
  title?: ReactNode;
  note?: ReactNode;
  more?: boolean;
  id?: string;
}) {
  return (
    <section className="stage stage--paper questions" id={id} aria-label="Questions">
      <div className="questions__copy">
        <h2 className="h2 xt xt--sm" data-slam style={{ "--r": "4deg" } as React.CSSProperties}>
          {title}
        </h2>
        <p data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          {note}
        </p>
        {more && (
          <a className="link-arrow" href="/faq" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
            Read the full FAQ <Arrow />
          </a>
        )}
      </div>
      <Comments items={items} />
    </section>
  );
}
