/* eslint-disable @next/next/no-img-element */
import { REACH, STEPS } from "@/lib/content";

/** How a video becomes a project, in three cards that slam in, over a tilted reach ticker. */
export function Challenge() {
  const ticker = REACH.map((r) => `${r.value} ${r.label}`);
  return (
    <section className="stage stage--yellow challenge" aria-labelledby="challenge-h">
      <div className="challenge__head">
        <h2 id="challenge-h" className="h2 xt xt--sm" data-slam style={{ "--r": "5deg" } as React.CSSProperties}>
          How a video
          <br />
          becomes a well
        </h2>
        <figure className="founder2" data-slam style={{ "--r": "-8deg", "--rot": "4deg", "--d": 2 } as React.CSSProperties}>
          <img src="/media/jimmy-crowd.jpg" alt="Jimmy Donaldson, MrBeast, with a crowd of schoolchildren" loading="lazy" />
          <figcaption>
            <b>Founded by Jimmy Donaldson</b>
            MrBeast, the world&rsquo;s #1 YouTube creator
          </figcaption>
        </figure>
      </div>

      <ol className="steps">
        {STEPS.map((s, i) => (
          <li
            key={s.n}
            className={`step step--${s.tone}`}
            data-slam
            style={{ "--r": `${s.rot * -3}deg`, "--rot": `${s.rot}deg`, "--d": i + 1 } as React.CSSProperties}
          >
            <span className="step__n">{s.n}</span>
            <h3 className="step__title">{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="tape" aria-label={ticker.join(", ")}>
        <div className="tape__track" aria-hidden>
          {[0, 1].map((k) => (
            <span key={k} className="tape__run">
              {ticker.map((t) => (
                <span key={t}>
                  {t} <i>★</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
