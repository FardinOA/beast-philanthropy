/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { BigStat, Head, PageHero, Photo, Stage, StatRow, Timeline, cdn } from "@/components/kit";
import { StatPanel } from "@/components/scoreboard";
import { Communities } from "@/components/widgets";
import { Feed } from "@/components/feed";
import { COMMUNITIES, photo } from "@/lib/site";

export const metadata: Metadata = { title: "Ghana Child Labor Initiative | Beast Philanthropy" };

const PILLARS = [
  {
    img: 4,
    title: "Community Development",
    sub: "Addressing the root causes",
    body: "Reducing household vulnerability so families are not forced to rely on children's labor.",
    items: [
      ["Education", "Rehabilitating and rebuilding schools, supplying uniforms and materials, running school feeding programs to boost attendance and reduce dropout rates"],
      ["Clean Water & Sanitation (WASH)", "Installing boreholes, rainwater catchment systems, and hand-washing stations at schools and community levels. Building latrines with a focus on menstrual hygiene facilities"],
      ["Food Security", "Distributing seeds and tools, training farmers to improve yields and reduce seasonal hunger"],
      ["Health & Nutrition", "Providing health education, menstrual health training for girls, and supplying sanitary pads in schools to reduce absenteeism among adolescent girls"],
      ["Sustainable Income", "Connecting households to Village Savings and Loan Associations (VSLAs) and income-generating activities, including soap-making, poultry rearing, and small-scale enterprises"],
    ],
  },
  {
    img: 5,
    title: "Ethical Sourcing",
    sub: "Building a replicable model",
    body: "Demonstrating that responsible practices can be commercially viable, building a model designed to be replicated across the cocoa industry.",
    items: [
      ["Fairtrade Certification", "Sourcing on Fairtrade terms, with premiums supporting direct farmer payments and community priorities including schools, health services, and infrastructure."],
      ["Living Income Reference Price", "The model commits to the Living Income Reference Price (LIRP) so farmers earn predictable, sustainable income rather than being exposed to market volatility."],
      ["Child Labor Monitoring & Remediation (CLMRS)", "A comprehensive, data-driven system. Local field agents conduct guardian and child interviews privately. Cases are verified, remediation plans are developed, and follow-up visits occur on an ongoing basis, multiple times per year.*"],
      ["Multi-Year Contracts", "Designed to give farmers stability and encourage long-term planning."],
      ["Community Worker Groups", "Organizing protected adult labor as a safe alternative to children's work during peak harvest periods."],
    ],
  },
];

export default function GhanaChildLabor() {
  return (
    <main>
      <PageHero
        eyebrow="Active · Eastern Region, Ghana"
        tone="yellow"
        title={
          <>
            Ending child labor <span className="hl">in Ghana&rsquo;s cocoa communities</span>
          </>
        }
        lede={<p>Moving children from cocoa fields into classrooms, through education, healthcare, economic support, and direct community investment.</p>}
        photo={photo("ghana-education-fund", 5)}
        stickers={<span className="sticker phero__s1">5-year minimum commitment</span>}
      >
        <div className="statrow phero__stat" style={{ "--cols": 4, maxWidth: "none" } as React.CSSProperties}>
          <StatPanel s={{ n: 10167, label: "Direct beneficiaries", tone: "pink" }} i={0} />
          <StatPanel s={{ n: 11, label: "Cocoa-farming communities", tone: "cyan" }} i={1} />
          <BigStat value="5-Year" label="Minimum commitment" tone="paper" i={2} />
          <StatPanel s={{ n: 2919, label: "Farmers and students surveyed", tone: "leaf" }} i={3} />
        </div>
      </PageHero>

      <Stage tone="ink" label="Why it matters">
        <Head
          light
          title="1.56 million children in cocoa fields"
          lede={
            <>
              <p>
                Child labor remains one of the most pressing challenges facing Ghana&rsquo;s cocoa sector. Despite decades of progress, systemic poverty,
                volatile cocoa prices, and limited access to essential services continue to force children into hazardous work.
              </p>
              <p>
                The situation is particularly acute during peak harvest seasons, when household labor demand spikes and families are left with few
                alternatives but to rely on their children. This work includes carrying heavy loads, using sharp tools like machetes, and being exposed to
                harmful agrochemicals, all of which have long-term consequences for children&rsquo;s health, education, and development.
              </p>
            </>
          }
        />
        <StatRow cols={3}>
          <BigStat value="1.56M" label="Children engaged in child labor across Ghana and Côte d'Ivoire's cocoa-growing regions" tone="yellow" i={0} />
          <BigStat value="45%" label="Of agricultural households in Ghana's cocoa communities report child labor involvement" tone="pink" i={1} />
          <BigStat value="40%+" label="Of those children engage in hazardous tasks" tone="cyan" i={2} />
        </StatRow>
      </Stage>

      <Stage tone="paper" label="Where we work">
        <div className="duo">
          <div>
            <Head title="Eastern Region, Ghana" />
            <div className="prose" data-reveal>
              <p>
                Beast Philanthropy is working in Ghana&rsquo;s Eastern Region, approximately two hours from Accra, across 11 cocoa-farming communities. Direct
                engagement has already begun in seven of those communities, with work progressively expanding to the remaining four.
              </p>
              <p>
                The work is anchored by a deep partnership with the <b>West Akyem Cooperative Union</b>, which represents and organizes farmers across these
                communities.
              </p>
            </div>
          </div>
          <Photo src={photo("ghana-child-labor", 1).src} alt={photo("ghana-child-labor", 1).alt} tilt={-2} ratio="3 / 4" caption="Where we work" />
        </div>
      </Stage>

      <Stage tone="cyan" label="The model">
        <Head
          title="A two-pillar approach"
          lede={
            <>
              <p>Child labor cannot be eliminated through charity alone, nor through market-based solutions in isolation.</p>
              <p>It requires a holistic approach that simultaneously reduces household vulnerability and builds market incentives for responsible sourcing.</p>
              <p>Beast Philanthropy&rsquo;s Ghana program operates on two pillars at once, in an intentional, staggered rollout.</p>
            </>
          }
        />
        <div className="pillars">
          {PILLARS.map((p, i) => {
            const im = photo("ghana-child-labor", p.img);
            return (
              <article key={p.title} className="pillar" data-slam style={{ "--r": `${i ? 5 : -5}deg`, "--rot": `${i ? 0.6 : -0.6}deg`, "--d": i } as React.CSSProperties}>
                <div className="pillar__img">
                  <img src={cdn(im.src, 900)} alt={im.alt} loading="lazy" />
                </div>
                <div className="pillar__body">
                  <h3>{p.title}</h3>
                  <p className="pillar__sub">{p.sub}</p>
                  <p>{p.body}</p>
                  <dl>
                    {p.items.map(([t, d]) => (
                      <div key={t}>
                        <dt>{t}</dt>
                        <dd>{d}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
        <p className="footnote">
          *Monitoring activities are conducted in accordance with the International Cocoa Initiative (ICI) CLMRS manual and toolkit. ICI is responsible for
          training CLMRS field agents on the CLMRS methodology and tools and provides technical support for data analysis and interpretation.
        </p>
      </Stage>

      <Stage tone="paper" label="Where things stand">
        <Head
          title="Where things stand"
          lede="The model is in motion. Across communities in Ghana, schools are being rebuilt, children are being monitored, and families are building income. Here's where things stand today."
        />
        <p className="sticker" style={{ marginBottom: 28 }}>
          2025–2030: A five-year plan for sustainability
        </p>
        <Timeline
          items={[
            {
              status: "Live now",
              date: "A community's first year",
              title: "We start by listening",
              body: "Before any talk of cocoa, we partner with a community and its chiefs, teachers, women's leaders, and farmers. Then poverty relief and child-labor remediation begin hand in hand: schools, clean water, and kitchens go in while every child is benchmarked, monitored, and independently verified.",
            },
            {
              status: "Next",
              date: "The years that follow",
              title: "Making it hold",
              body: "Then we make it last. Savings groups, poultry, and farms grow into income families can count on, so children stay out of the fields and stay out, confirmed over repeat visits, not a single check. Communities begin joining the cocoa supply chain as Fairtrade partners, with a living-income commitment.",
            },
            {
              status: "Ahead",
              date: "By year five",
              title: "Built to outlast us",
              body: "Then we step back. Not a handover, because we never owned it alone, but a deliberate move into the background as the community and cooperative take the work on fully. Programs run on local leadership and local income, designed to hold long after we step away.",
            },
          ]}
        />
      </Stage>

      <Stage tone="ink" label="The communities">
        <Head light title="The communities" lede="Pick a community to see what we found on day one and where its first year is designed to land." />
        <Communities items={COMMUNITIES} />
      </Stage>

      <Stage tone="yellow" label="Our vision">
        <Head
          title="An ethical, child-labor-free cocoa supply chain"
          lede={
            <>
              <p>
                The goal is straightforward: an environment where children are in school, families are thriving, and cocoa is produced with dignity and
                fairness. Over time, the dual-pillar strategy is designed to create a systemic shift in cocoa communities, one where child labor becomes the
                exception rather than the norm.
              </p>
              <p>
                Beast Philanthropy is committed to a minimum five-year program, with the intention of establishing a long-term presence to sustain and deepen
                impact over time.
              </p>
            </>
          }
        />
      </Stage>

      <Feed title="Check out our latest work" />
    </main>
  );
}
