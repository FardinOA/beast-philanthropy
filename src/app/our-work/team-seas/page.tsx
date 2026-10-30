import type { Metadata } from "next";
import { Btn, Head, PageHero, Photo, Stage } from "@/components/kit";
import { StatPanel } from "@/components/scoreboard";
import { Feed } from "@/components/feed";
import { photo } from "@/lib/site";

export const metadata: Metadata = { title: "#TeamSeas | Ocean Cleanup Initiative" };

const SOCIAL = [
  ["Facebook", "https://www.facebook.com/TeamSeas/"],
  ["Instagram", "https://www.instagram.com/teamseas/"],
  ["LinkedIn", "https://www.linkedin.com/company/teamseas/"],
  ["Reddit", "https://www.reddit.com/r/TeamSeas/"],
  ["TikTok", "https://www.tiktok.com/@teamseas"],
  ["YouTube", "https://www.youtube.com/c/teamseas"],
  ["X", "https://x.com/teamseas"],
];

const STILL = "We hit our goal, but Ocean Conservancy and The Ocean Cleanup are still actively removing trash from oceans, beaches, and rivers. You can still be part of it.";

export default function TeamSeas() {
  return (
    <main>
      <PageHero
        eyebrow="Complete · Global"
        tone="cyan"
        title="#TeamSeas"
        lede={<p>34 million pounds of trash pulled from the ocean, beaches, and rivers worldwide.</p>}
        photo={photo("team-seas", 7)}
        stickers={<span className="sticker phero__s1">Original goal met</span>}
      >
        <div className="phero__stat">
          <StatPanel s={{ n: 34080191, label: "Verified pounds of trash removed · Original goal met", by: "#TeamSeas", tone: "yellow" }} />
        </div>
      </PageHero>

      <Stage tone="paper" label="The campaign">
        <div className="duo">
          <div>
            <Head title="One of the largest coordinated cleanup efforts ever attempted" />
            <div className="prose" data-reveal>
              <p className="lead">#TeamSeas brought together MrBeast &amp; Mark Rober</p>
              <p>Over 400,000 creators to remove trash from the ocean, beaches, and rivers worldwide. The goal has been met. The work is documented.</p>
              <p className="lead">Verified partner organizations</p>
              <p>In partnership with Ocean Conservancy and The Ocean Cleanup, every pound of trash removed was verified and counted.</p>
            </div>
          </div>
          <Photo src={photo("team-seas", 4).src} alt="#TeamSeas volunteers holding buckets of collected trash" tilt={2} caption="Every pound counted" />
        </div>
      </Stage>

      <Stage tone="ink" label="The organizations behind the work">
        <Head
          light
          title="Two partners. Every environment."
          lede="#TeamSeas worked with two established organizations, each responsible for a specific environment. The original goal has been met, but the work continues."
        />
        <ol className="ccards" style={{ "--cols": 2 } as React.CSSProperties}>
          <li className="ccard ccard--cyan" data-slam style={{ "--r": "-5deg", "--rot": "-0.8deg" } as React.CSSProperties}>
            <span className="sticker">Official Ocean and Beaches Partner</span>
            <h3 className="ccard__title">Ocean Conservancy</h3>
            <div className="ccard__body">
              <p>Coordinating cleanup efforts across oceans and coastlines worldwide, removing trash before it breaks down further into the marine ecosystem.</p>
              <p>{STILL}</p>
            </div>
            <Btn href="https://oceanconservancy.org" tone="white">
              Support Ocean Conservancy
            </Btn>
          </li>
          <li className="ccard ccard--yellow" data-slam style={{ "--r": "5deg", "--rot": "0.8deg", "--d": 1 } as React.CSSProperties}>
            <span className="sticker" style={{ background: "#fff" }}>
              Official Rivers Partner
            </span>
            <h3 className="ccard__title">The Ocean Cleanup</h3>
            <div className="ccard__body">
              <p>Intercepting plastic in rivers before it reaches the ocean, addressing pollution at one of its primary sources.</p>
              <p>{STILL}</p>
            </div>
            <Btn href="https://theoceancleanup.com" tone="white">
              Support The Ocean Cleanup
            </Btn>
          </li>
        </ol>
        <p className="footnote" style={{ color: "rgba(255,255,255,.8)" }}>
          These are two examples of our partnerships.
        </p>
      </Stage>

      <Stage tone="yellow" label="#TeamSeas social">
        <Head title="#TeamSeas social" />
        <div className="socials" data-reveal>
          {SOCIAL.map(([l, h]) => (
            <a key={l} href={h} target="_blank" rel="noopener">
              {l}
            </a>
          ))}
        </div>
      </Stage>

      <Feed title="Check out our latest work" />
    </main>
  );
}
