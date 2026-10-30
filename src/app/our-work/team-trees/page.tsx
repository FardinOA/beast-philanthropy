import type { Metadata } from "next";
import { BigStat, Head, PageHero, Photo, Stage, StatRow, TextLink } from "@/components/kit";
import { StatPanel } from "@/components/scoreboard";
import { TreeProjects } from "@/components/widgets";
import { Feed } from "@/components/feed";
import { TT_PROJECTS, photo } from "@/lib/site";

export const metadata: Metadata = { title: "#TeamTrees | Global Reforestation" };

const SOCIAL = [
  ["Facebook", "https://www.facebook.com/teamtreesofficial/"],
  ["Instagram", "https://www.instagram.com/teamtrees/"],
  ["LinkedIn", "https://www.linkedin.com/company/teamtrees/"],
  ["Reddit", "https://www.reddit.com/r/TeamTrees/"],
  ["TikTok", "https://www.tiktok.com/@teamtreesofficial"],
  ["YouTube", "https://www.youtube.com/c/teamtrees"],
  ["X", "https://x.com/teamtreesofficl"],
];

export default function TeamTrees() {
  return (
    <main>
      <PageHero
        eyebrow="Ongoing · Global"
        tone="leaf"
        title="#TeamTrees"
        lede={<p>25 million trees in the ground. The five-year count continues.</p>}
        photo={photo("team-trees", 2)}
        stickers={<span className="sticker phero__s1">Six continents</span>}
      >
        <div className="phero__stat">
          <StatPanel s={{ n: 25149427, plus: true, label: "Trees planted", by: "#TeamTrees", tone: "yellow" }} />
          <p style={{ margin: "18px 0 0", fontWeight: 700 }}>Original goal met. Planted across six continents in partnership with the Arbor Day Foundation.</p>
        </div>
      </PageHero>

      <Stage tone="paper" label="The campaign">
        <StatRow>
          <BigStat value="25M+" label="Trees in the ground" tone="leaf" i={0} />
          <BigStat value="$1" label="Plants one tree" tone="yellow" i={1} />
          <BigStat value="6" label="Continents reached" tone="cyan" i={2} />
          <BigStat value="10K+" label="Creators" tone="pink" i={3} />
        </StatRow>
        <div className="duo gap-top">
          <div>
            <Head title="The movement that planted millions" />
            <div className="prose" data-reveal>
              <p>
                TeamTrees brought together MrBeast, Mark Rober, and more than 10,000 creators to plant trees across six continents. The original goal has been
                met, and the work continues.
              </p>
              <p>
                In partnership with the Arbor Day Foundation, every dollar raised put a verified tree in the ground. Community by community. Forest by forest.
              </p>
              <TextLink href="https://teamtrees.org">Learn more</TextLink>
            </div>
          </div>
          <Photo src={photo("team-trees", 1).src} alt={photo("team-trees", 1).alt} tilt={2} ratio="3 / 4" caption="The work" />
        </div>
      </Stage>

      <Stage tone="leaf" label="Planting trees around the world">
        <Head
          title="Planting trees around the world"
          lede={
            <>
              <p>Trees are being planted across six continents through a network of verified local partners.</p>
              <p>Every project is documented, from the forests of Montana to the mangroves of Madagascar.</p>
            </>
          }
        />
        <TreeProjects items={TT_PROJECTS} />
      </Stage>

      <Stage tone="yellow" label="#TeamTrees social">
        <Head title="#TeamTrees social" />
        <div className="socials" data-reveal>
          {SOCIAL.map(([l, h]) => (
            <a key={l} href={h} target="_blank" rel="noopener">
              {l}
            </a>
          ))}
        </div>
      </Stage>

      <Stage tone="paper" label="Our partner">
        <div className="duo duo--flip">
          <div>
            <Head title="In partnership with the Arbor Day Foundation" />
            <div className="prose" data-reveal>
              <p>
                Every tree planted through #TeamTrees is verified and managed by the Arbor Day Foundation, one of the world&rsquo;s largest tree-planting
                organizations. Projects span six continents, with a focus on areas where trees are needed most: recovering from wildfires, rebuilding after
                storms, restoring critical ecosystems, and creating sustainable livelihoods for local communities.
              </p>
            </div>
          </div>
          <Photo src={photo("team-trees", 6).src} alt={photo("team-trees", 6).alt} tilt={-2} ratio="3 / 4" caption="Our partner" />
        </div>
      </Stage>

      <Feed title="Check out our latest work" />
    </main>
  );
}
