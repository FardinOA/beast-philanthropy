"use client";

import { useEffect, useRef, useState } from "react";
import { SCORE } from "@/lib/content";
import { still } from "@/lib/scroll";
import { shake } from "./reveal";
import { ArrowUpRight, Check } from "./icons";
import { Seals } from "./kit";

const DIGITS = "0123456789".split("");

/** Odometer: each digit is a reel that rolls to its value. */
export function Odometer({ n, prefix = "", plus = false, run }: { n: number; prefix?: string; plus?: boolean; run: boolean }) {
  const text = n.toLocaleString("en-US");
  let reel = 0;
  return (
    <span className="odo" aria-label={`${prefix}${text}${plus ? "+" : ""}`}>
      {prefix && <span className="odo__sym" aria-hidden>{prefix}</span>}
      {text.split("").map((ch, i) => {
        if (ch === ",") return <span key={i} className="odo__comma" aria-hidden>,</span>;
        const d = Number(ch);
        const k = reel++;
        return (
          <span key={i} className="odo__cell" aria-hidden>
            <span className="odo__reel" style={{ "--d": run ? d + 10 : 0, "--k": k } as React.CSSProperties}>
              {DIGITS.concat(DIGITS).map((x, j) => (
                <span key={j}>{x}</span>
              ))}
            </span>
          </span>
        );
      })}
      {plus && <span className="odo__sym" aria-hidden>+</span>}
    </span>
  );
}

export type StatProps = { n: number; label: string; by?: string; prefix?: string; plus?: boolean; tone?: string; href?: string };

/** Game-show panel: the odometer rolls when it scrolls in, then a VERIFIED stamp slams on. */
export function StatPanel({ s, i = 0 }: { s: StatProps; i?: number }) {
  const ref = useRef<HTMLDivElement & HTMLAnchorElement>(null);
  const [run, setRun] = useState(false);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t1 = 0, t2 = 0;
    if (still()) {
      t1 = window.setTimeout(() => {
        setRun(true);
        setLanded(true);
      });
      return () => clearTimeout(t1);
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        t1 = window.setTimeout(() => setRun(true), 120 + (i % 4) * 140);
        t2 = window.setTimeout(() => {
          setLanded(true);
          shake(el);
        }, 120 + (i % 4) * 140 + 1900);
      },
      { rootMargin: "0px 0px -18% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [i]);

  const body = (
    <>
      {s.by && <span className="panel__by">{s.by}</span>}
      <Odometer n={s.n} prefix={s.prefix} plus={s.plus} run={run} />
      <span className="panel__label">{s.label}</span>
      <span className={`panel__stamp ${landed ? "is-on" : ""}`} aria-hidden>
        <Check /> Verified
      </span>
      {s.href && <ArrowUpRight className="ico panel__go" />}
    </>
  );
  const cls = `panel panel--${s.tone ?? "pink"} ${run ? "is-run" : ""}`;
  return s.href ? (
    <a ref={ref} href={s.href} className={cls}>
      {body}
    </a>
  ) : (
    <div ref={ref} className={cls}>
      {body}
    </div>
  );
}

export function Scoreboard() {
  return (
    <section className="stage stage--paper score" id="impact" aria-labelledby="score-h">
      <div className="score__head">
        <h2 id="score-h" className="h2 xt xt--sm" data-slam style={{ "--r": "-4deg" } as React.CSSProperties}>
          The scoreboard
        </h2>
        <p data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          Every number is exact, documented and published. Outcomes are never assumed.
        </p>
      </div>

      <div className="panels">
        {SCORE.map((s, i) => (
          <StatPanel key={s.by} s={{ ...s }} i={i} />
        ))}
      </div>

      <Seals heading="" />
    </section>
  );
}
