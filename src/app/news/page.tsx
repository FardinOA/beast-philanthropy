/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Btn, Head, PageHero, Stage, cdn } from "@/components/kit";
import { Updates } from "@/components/widgets";
import { ArrowUpRight, Play } from "@/components/icons";
import { PODCASTS, PRESS, UPDATES } from "@/lib/site";

export const metadata: Metadata = { title: "News & Updates | Beast Philanthropy" };

export default function News() {
  return (
    <main>
      <PageHero
        eyebrow="Press & coverage"
        tone="yellow"
        title={
          <>
            News &amp; media <span className="hl">coverage</span>
          </>
        }
        lede={<p>News and media coverage about Beast Philanthropy and its work around the world.</p>}
      >
        <div className="strip-wrap" aria-hidden>
          <div className="strip" style={{ animationDuration: "50s", alignItems: "center" }}>
            {[...PRESS, ...PRESS].map((p, i) => (
              <span key={i} className="plogo" style={{ width: 200, height: 84, flex: "none", boxShadow: "5px 5px 0 var(--ink)" }}>
                <img src={cdn(p.logoUrl, 400)} alt="" style={{ aspectRatio: "auto", width: "auto", border: 0, boxShadow: "none", transform: "none", borderRadius: 0 }} />
              </span>
            ))}
          </div>
        </div>
      </PageHero>

      <Stage tone="paper" label="Recent updates">
        <Head title="Recent updates" lede="Latest from the channel." />
        <Updates items={UPDATES} />
      </Stage>

      <Stage tone="cyan" label="Press coverage">
        <Head title="Press coverage" lede="In the news." />
        <ul className="press">
          {PRESS.map((p, i) => (
            <li key={p.href} data-reveal style={{ "--d": i % 2 } as React.CSSProperties}>
              <a href={p.href} target="_blank" rel="noopener">
                <span className="press__logo">
                  <img src={cdn(p.logoUrl, 400)} alt={p.outlet} />
                </span>
                <span>
                  <time>{p.date}</time>
                  <b>{p.title}</b>
                  <span>{p.outlet}</span>
                </span>
                <ArrowUpRight />
              </a>
            </li>
          ))}
        </ul>
      </Stage>

      <Stage tone="ink" label="Podcasts and interviews">
        <Head light title="Podcasts & interviews" lede="Featured in." />
        <ul className="pods">
          {PODCASTS.map((p, i) => (
            <li key={p.href} data-reveal style={{ "--d": i } as React.CSSProperties}>
              <a className="pod" href={p.href} target="_blank" rel="noopener">
                <span className="pod__cover">
                  <img src={cdn(p.coverUrl, 600)} alt="" loading="lazy" />
                  <span className="vcard__play" style={{ transform: "scale(1)" }} aria-hidden>
                    <Play />
                  </span>
                  <span className="pod__dur">{p.duration}</span>
                </span>
                <time>{p.date}</time>
                <b>{p.title}</b>
              </a>
            </li>
          ))}
        </ul>
      </Stage>

      <Stage tone="pink" label="Media inquiries">
        <Head title="Media inquiries" lede="For press inquiries, interview requests, or media assets, please reach out directly." />
        <Btn href="mailto:press@beastphilanthropy.org" tone="white">
          Contact us
        </Btn>
      </Stage>
    </main>
  );
}
