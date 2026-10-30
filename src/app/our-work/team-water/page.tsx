/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { BigStat, Head, PageHero, Stage, StatRow, TextLink, Timeline, cdn } from "@/components/kit";
import { StatPanel } from "@/components/scoreboard";
import { WaterProjects } from "@/components/widgets";
import { Questions } from "@/components/questions";
import { Feed } from "@/components/feed";
import { TEAMWATER_FAQ, TW_JOURNEY, TW_PROJECTS, photo } from "@/lib/site";

export const metadata: Metadata = { title: "#TeamWater | Clean Water Projects Worldwide" };

const SYSTEMS = [
  { i: 4, title: "Piped connections to homes", body: "bringing water directly into communities for the first time" },
  { i: 5, title: "Gravity-fed water systems", body: "infrastructure on mountainsides that requires no ongoing energy cost" },
  { i: 6, title: "Solar-powered wells", body: "reliable water access in off-grid communities" },
  { i: 7, title: "Water desalination systems", body: "converting available water into safe drinking water in water-scarce regions" },
  { i: 8, title: "Rainwater harvesting", body: "community-maintained collection systems built to last" },
];

const PARTNERS = [
  {
    name: "WaterAid, Global Partner",
    body: "WaterAid is the lead global partner for #TeamWater, working across urban centers and rural communities to deliver piped networks, gravity-fed systems, and sustainable water infrastructure. Active in Bangladesh, Cambodia, Colombia, Mozambique, Nigeria, Rwanda, and more.",
  },
  { name: "GivePower", body: "Building water desalination systems to increase the supply of clean drinking water in water-scarce regions." },
  { name: "DigDeep", body: "Bringing running water to homes in Appalachia, United States, ensuring communities within the US are not left behind." },
  { name: "Alok Institute", body: "Working with Indigenous communities in Brazil to deliver clean water access to those furthest from existing infrastructure." },
];

const STATUS: Record<string, string> = { completed: "Completed", "in-progress": "In progress", ahead: "Ahead" };

export default function TeamWater() {
  return (
    <main>
      <PageHero
        eyebrow="Active · 5-year campaign"
        tone="cyan"
        title="#TeamWater"
        lede={<p>The biggest campaign for clean water in the world.</p>}
        photo={photo("team-water", 0)}
        stickers={
          <>
            <span className="sticker phero__s1">$40M+ raised · 2M people</span>
            <span className="sticker phero__s2">Decades of clean water</span>
          </>
        }
      >
        <div className="phero__stat">
          <StatPanel s={{ n: 40000000, prefix: "$", plus: true, label: "Raised to supply clean water to 2M people", by: "#TeamWater", tone: "yellow" }} />
        </div>
      </PageHero>

      <Stage tone="paper" label="The campaign">
        <Head
          title="The largest clean water campaign in history"
          lede={
            <>
              <p>
                #TeamWater is a creator-powered campaign to bring clean water to communities around the world. Founded by MrBeast and Mark Rober and supported
                by one of the largest networks of online creators ever assembled, together we raised over $41 million to provide two million people with clean
                water, for decades.
              </p>
              <p>
                In just 31 days, over 15,000 creators sparked a movement for lasting change. From the world&rsquo;s most recognized creators to school
                children hosting fundraisers, from record-setting livestreams to everyday people giving what they could, whether it was $1 or thousands, you
                showed up.
              </p>
              <p>
                <b>Thank you.</b> Clean water means healthier families. More children in school. More time for women to earn a living, and whole communities
                changing their lives for the better. You made that possible.
              </p>
            </>
          }
        />
        <StatRow>
          <BigStat value="$40M+" label="Raised in 31 days" tone="cyan" i={0} />
          <BigStat value="2B" label="Combined views" tone="yellow" i={1} />
          <BigStat value="15K+" label="Creators participated" tone="pink" i={2} />
          <BigStat value="172" label="Countries" tone="ink" i={3} />
        </StatRow>
      </Stage>

      <Stage tone="ink" label="Why it matters">
        <Head
          light
          title="1 in 10 people don't have clean water"
          lede={
            <>
              <p>
                1 in 10 people lack clean water, forcing long treks and missed school, especially for women and girls. Climate change is making this worse. By
                2040, up to 4.5 billion people could be experiencing water scarcity.
              </p>
              <p>
                <b>The water crisis is solvable. #TeamWater is working to solve it.</b>
              </p>
            </>
          }
        />
        <StatRow cols={3}>
          <BigStat value="1 in 10" label="people worldwide lack access to clean water" tone="cyan" i={0} />
          <BigStat value="4.5B" label="people could face water scarcity by 2040" tone="pink" i={1} />
          <BigStat value="$1" label="gives one person clean water for a year" tone="yellow" i={2} />
        </StatRow>
      </Stage>

      <Stage tone="yellow" label="Built to last">
        <Head
          title="Built to last"
          lede="Providing clean water requires sustainable solutions, not quick fixes. #TeamWater funds proven, lasting infrastructure, including the examples below, built and maintained by local communities for long-term impact."
        />
        <ol className="ccards" style={{ "--cols": 5 } as React.CSSProperties}>
          {SYSTEMS.map((s, k) => {
            const p = photo("team-water", s.i);
            return (
              <li key={s.title} className="ccard" data-slam style={{ "--r": `${k % 2 ? 6 : -6}deg`, "--rot": `${k % 2 ? 1 : -1}deg`, "--d": k } as React.CSSProperties}>
                <span className="ccard__img">
                  <img src={cdn(p.src, 600)} alt={p.alt} loading="lazy" />
                </span>
                <h3 className="ccard__title" style={{ fontSize: 22, marginTop: 4 }}>
                  {s.title}
                </h3>
                <div className="ccard__body">{s.body}</div>
              </li>
            );
          })}
        </ol>
        <div className="prose gap-top" data-reveal>
          <p>
            Every project is carried out in partnership with local communities, governments, and local partners. Infrastructure is designed to be
            community-led and maintained locally, not dependent on ongoing outside support.
          </p>
          <TextLink href="https://www.teamwater.org">Want to learn more?</TextLink>
        </div>
      </Stage>

      <Stage tone="paper" label="Where things stand">
        <Head
          title="Where things stand"
          lede="This work takes years, and that's exactly the point. Here's where we are in the campaign journey, including projects already completed and work currently underway in five anchor countries."
        />
        <Timeline
          items={TW_JOURNEY.map((j) => ({
            status: STATUS[j.status] ?? j.status,
            date: j.date,
            title: j.title,
            body: (j.body ?? []).filter((b) => b.text && !(b as { pink?: boolean }).pink).map((b, i) => <p key={i}>{b.text}</p>),
            foot: (j.body ?? []).find((b) => (b as { pink?: boolean }).pink && b.text)?.text ?? j.foot,
          }))}
        />
      </Stage>

      <Stage tone="cyan" label="Our projects">
        <Head title="Our projects" />
        <WaterProjects items={TW_PROJECTS} />
      </Stage>

      <Stage tone="paper" label="Our partners">
        <Head
          title="The organizations on the ground"
          lede="#TeamWater works with established, field-verified organizations. Each partner has a track record of delivering sustainable water infrastructure at scale."
        />
        <ol className="ccards" style={{ "--cols": 2 } as React.CSSProperties}>
          {PARTNERS.map((p, i) => (
            <li key={p.name} className={`ccard ccard--${["yellow", "paper", "paper", "cyan"][i]}`} data-slam style={{ "--r": `${i % 2 ? 5 : -5}deg`, "--rot": `${i % 2 ? 0.8 : -0.8}deg`, "--d": i } as React.CSSProperties}>
              <h3 className="ccard__title">{p.name}</h3>
              <div className="ccard__body">{p.body}</div>
            </li>
          ))}
        </ol>
      </Stage>

      <Questions items={TEAMWATER_FAQ} more={false} title="Frequently asked questions" note="About #TeamWater, answered from our FAQ." />
      <Feed title="Check out our latest work" />
    </main>
  );
}
