/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { BigStat, Cards, Chain, Head, PageHero, Photo, Stage, StatRow, cdn } from "@/components/kit";
import { VideoGrid } from "@/components/feed";
import { ExploreWork } from "@/components/pin-map";
import { Donate } from "@/components/donate";
import { ytId } from "@/lib/yt";
import { REACH } from "@/lib/content";
import { WHO_CYCLE, WHO_VIDEOS, photo } from "@/lib/site";

export const metadata: Metadata = { title: "Who We Are | Beast Philanthropy" };

export default function WhoWeAre() {
  return (
    <main>
      <PageHero
        eyebrow="Who we are"
        title={
          <>
            Built to do <span className="hl">real</span> work
          </>
        }
        tone="pink"
        photo={photo("who-we-are", 3)}
        stickers={<span className="sticker phero__s1">501(c)(3) nonprofit</span>}
      />

      <Stage tone="paper" label="Our mission">
        <Head
          title={
            <>
              Make
              <br />
              kindness
              <br />
              viral
            </>
          }
          lede={
            <>
              <p>
                Beast Philanthropy is a 501(c)(3) nonprofit on a mission to make kindness viral. We combine the influence of MrBeast, the world&rsquo;s #1
                YouTube creator, with the Beast Philanthropy channel&rsquo;s 30 million subscribers to turn audience engagement into measurable community
                impact.
              </p>
              <p>
                <b>Every video funds a real-world project;</b> Beast Philanthropy transforms views into action that changes lives worldwide.
              </p>
            </>
          }
        />
        <VideoGrid lead videos={WHO_VIDEOS.map((v) => ({ id: ytId(v.href), title: v.title, channel: `${v.views} views · ${v.age}` }))} />
        <StatRow>
          {REACH.map((r, i) => (
            <BigStat key={r.label} value={r.value} label={r.label} tone={(["yellow", "cyan", "pink", "ink"] as const)[i]} i={i} />
          ))}
        </StatRow>
      </Stage>

      <Stage tone="yellow" label="Our founder">
        <div className="duo">
          <div>
            <Head title="The man behind the mission" />
            <div className="prose" data-reveal>
              <p>
                Beast Philanthropy was founded by Jimmy Donaldson, known globally as MrBeast, the world&rsquo;s #1 YouTube creator. What started as a passion
                for making content became something much larger: proof that an internet audience, mobilized with intention, can fund and execute
                real-world change at a scale previously unimaginable for a nonprofit.
              </p>
              <p>
                Jimmy&rsquo;s approach to philanthropy is the same as his approach to everything else: go bigger, document everything, and make it
                impossible to ignore. Every Beast Philanthropy project is funded through the reach of his platform and executed with the same rigor as the
                videos that built it.
              </p>
            </div>
          </div>
          <Photo src={photo("who-we-are", 1).src} alt={photo("who-we-are", 1).alt} tilt={-2} ratio="4 / 5" caption="Our founder" />
        </div>
      </Stage>

      <Stage tone="paper" label="How we choose the work">
        <Head
          title="How we choose the work"
          lede={
            <>
              <p>Beast Philanthropy focuses its resources on community-based projects that help lift communities in a sustainable and persistent way.</p>
              <p>What we look for in every project:</p>
            </>
          }
        />
        <Cards
          items={[
            { n: "1", title: "Scale of impact", tone: "pink", body: "How many lives can this change?" },
            { n: "2", title: "Verifiability", tone: "cyan", body: "Can we document and prove what happened?" },
            { n: "3", title: "Results", tone: "yellow", body: "Can we demonstrate a clear outcome?" },
          ]}
        />
      </Stage>

      <Stage tone="ink" label="How we track the work">
        <Head light title="How we track the work" lede={<p>Every project has a defined status. We publish what&rsquo;s happening and what&rsquo;s been done.</p>} />
        <Cards
          items={[
            { title: <span className="tline__status tline__status--live">Active</span>, tone: "paper", body: "Active projects with documented milestones, partner oversight, and regular updates." },
            { title: <span className="tline__status tline__status--done">Complete</span>, tone: "paper", body: "Finished work with published results, proof-of-life photography, and verified outcomes." },
            { title: <span className="tline__status tline__status--ahead">Upcoming</span>, tone: "paper", body: "Planned initiatives with a defined scope and deployment timeline." },
          ]}
        />
        <div className="duo gap-top">
          <div>
            <h3 className="ccard__title" style={{ color: "#fff", marginBottom: 18 }}>
              How we document it
            </h3>
            <p style={{ margin: "0 0 14px", fontWeight: 600, color: "rgba(255,255,255,.85)" }}>Every active project is tracked through:</p>
            <ul className="list-check" style={{ color: "#fff" }} data-reveal>
              <li>On-the-ground photography from the field</li>
              <li>Data collection through partner organizations</li>
              <li>Third-party verification of outcomes</li>
            </ul>
            <div className="stamps-row">
              <span className="sticker" data-slam style={{ "--r": "-12deg", "--rot": "-2deg" } as React.CSSProperties}>
                When work is done, we say so. When it isn&rsquo;t, we say that too.
              </span>
            </div>
          </div>
          <Photo src={photo("who-we-are", 6).src} alt={photo("who-we-are", 6).alt} tilt={2} />
        </div>
      </Stage>

      <Stage tone="cyan" label="How it works">
        <Head
          title="How it works"
          lede="The Beast Philanthropy YouTube channel generates revenue through views. Every dollar of that revenue goes directly to funding the charity to deliver real-world impact, through direct deployment and partnerships with established organizations on the ground."
        />
        <Chain loop steps={WHO_CYCLE.filter((c) => c.label !== "The Cycle").map((c) => c.label)} />
        <div className="strip-wrap" aria-hidden>
          <div className="strip" style={{ animationDuration: "40s" }}>
            {[...WHO_CYCLE, ...WHO_CYCLE, ...WHO_CYCLE].map((c, i) => (
              <img key={i} src={cdn(c.photo, 440)} alt="" loading="lazy" />
            ))}
          </div>
        </div>
        <div className="duo gap-top">
          <p className="quote xt xt--sm" style={{ margin: 0 }}>
            Every video funds a real-world project.
          </p>
          <div>
            <h3 className="ccard__title" style={{ marginBottom: 16 }}>
              What that means in practice
            </h3>
            <ul className="list-check" data-reveal>
              <li>Donations and ad revenue are deployed with a clear plan</li>
              <li>Partnerships are vetted before funds are committed</li>
              <li>Outcomes are documented and published</li>
              <li>Nothing is launched without accountability built in</li>
            </ul>
          </div>
        </div>
      </Stage>

      <ExploreWork />
      <Donate />
    </main>
  );
}
