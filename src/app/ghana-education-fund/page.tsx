/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { BigStat, Btn, Cards, Head, PageHero, Photo, Stage, StatRow, cdn } from "@/components/kit";
import { PinMap } from "@/components/pin-map";
import { Questions } from "@/components/questions";
import { EDUCATION_FAQ, EDUCATION_IMAGES, photo } from "@/lib/site";

export const metadata: Metadata = { title: "Ghana Education Fund | Beast Philanthropy" };

/* The fund's own donation form lives on the live page. */
const GIVE = "https://www.beastphilanthropy.org/ghana-education-fund#donate";

export default function EducationFund() {
  const goku = photo("ghana-education-fund", 4);
  return (
    <main>
      <PageHero
        eyebrow="Ending child labor in Ghana"
        tone="yellow"
        title={
          <>
            Keeping children in school, <span className="hl">not in the fields</span>
          </>
        }
        lede={
          <p>
            One exam stands between a student in Ghana&rsquo;s cocoa communities and senior high school. For too many, the thing that stops them is not the
            exam. It is a mattress and a uniform.
          </p>
        }
        actions={<Btn href={GIVE}>Donate to the Education Fund</Btn>}
        photo={photo("ghana-education-fund", 0)}
        stickers={<span className="sticker phero__s1">Education Fund</span>}
      />

      <Stage tone="ink" label="The scale of the problem">
        <Head light title="The scale of the problem" lede="Child labor in cocoa." />
        <StatRow cols={3}>
          <BigStat value="1.5M+" label="children in child labor across Côte d'Ivoire and Ghana" tone="yellow" i={0} />
          <BigStat value="20-30%" label="of students who finish grade 9 never reach grade 10" tone="pink" i={1} />
          <BigStat value="Half" label="of older students leave school at peak harvest" tone="cyan" i={2} />
        </StatRow>
      </Stage>

      <Stage tone="paper" label="What stops them">
        <div className="duo">
          <div>
            <Head title="What stops them" />
            <div className="prose" data-reveal>
              <p>
                Across West Africa&rsquo;s cocoa-growing regions, millions of children work the fields instead of sitting in a classroom. In Ghana and
                neighboring Côte d&rsquo;Ivoire alone, more than 1.5 million children are in child labor, most of it hazardous. When harvest peaks, many rural
                schools lose roughly half their older students.
              </p>
              <p>
                The sharpest moment comes at the end of grade 9. In our partner communities, 20 to 30 percent of students who finish never make it to grade
                10. It is almost never about ability. It is a one-time cost: a mattress, a uniform, a few basic items. A child who has come that far gets
                pulled back into labor over a bill their family cannot meet.
              </p>
            </div>
          </div>
          <Photo src={photo("ghana-education-fund", 2).src} alt={photo("ghana-education-fund", 2).alt} tilt={2} />
        </div>
      </Stage>

      <Stage tone="cyan" label="The bigger picture">
        <Head
          title="The bigger picture"
          lede={
            <>
              <p>
                This fund is one lever within a far larger effort. Beast Philanthropy is building entire ecosystems of opportunity in Ghana&rsquo;s
                cocoa-growing region, working to prove it is possible to end child labor one school and one village at a time. The model pairs deep community
                development with ethical income programs and large-scale storytelling that brings global attention to what works.
              </p>
              <p>The community development work centers on five connected pillars.</p>
            </>
          }
        />
        <Cards
          cols={5}
          items={[
            { title: "Education", tone: "paper", body: "Rebuilding and equipping schools, supporting teachers, and removing the barriers that keep children out of class." },
            { title: "Water and sanitation", tone: "yellow", body: "Clean water systems, latrines, and hygiene programs so children are healthy and able to attend." },
            { title: "Health", tone: "pink", body: "Nutrition, feeding programs, and access to care." },
            { title: "Food security", tone: "paper", body: "School meals, gardens, and farming support that ease families' reliance on children's labor." },
            { title: "Opportunity", tone: "yellow", body: "Savings groups, training, and income programs that give parents a sustainable livelihood." },
          ]}
        />
      </Stage>

      <Stage tone="paper" label="How the fund works">
        <div className="duo duo--flip">
          <div>
            <Head title="How the fund works" />
            <div className="prose" data-reveal>
              <p>
                Alongside that development work runs an ethical sourcing model and a third-party-verified child labor monitoring and remediation system, so
                progress in each community is tracked and lasting. This fund adds one more lever: a direct incentive for families to keep their children
                enrolled.
              </p>
              <p>
                <b>Students in partner communities who stay enrolled and pass their standardized grade 9 exams receive a scholarship that covers the cost of
                starting senior high.</b>
              </p>
              <p>
                Donations are pooled into a single fund and invested, so it compounds rather than being spent at once. It supports students year after year,
                and it proves something worth proving: money placed thoughtfully can grow, even for a child in a rural farming village.
              </p>
            </div>
          </div>
          <Photo src={photo("ghana-education-fund", 5).src} alt={photo("ghana-education-fund", 5).alt} tilt={-2} />
        </div>
      </Stage>

      <Questions items={EDUCATION_FAQ} more={false} title="Frequently asked questions" note="About the Education Fund." />

      <Stage tone="pink" label="Student stories">
        <Cards
          cols={2}
          items={[
            {
              title: "Goku wants to be a banker",
              tone: "paper",
              extra: null,
              body: (
                <>
                  <span className="ccard__img" style={{ display: "block", margin: "6px 0 14px" }}>
                    <img src={cdn(goku.src, 900)} alt={goku.alt} loading="lazy" />
                  </span>
                  <p>
                    She dropped out during grade 8 to harvest cocoa and sell fruit at market. A teacher who saw what she could do persuaded her family to let
                    her return, and she went on to finish grade 9 with the highest exam mark not just in her school but in every school around it.
                  </p>
                  <p>
                    She still could not afford to leave home for the nearest senior high. The fund covered her materials, school supplies, transport and food,
                    and in September 2026 she starts at the school of her choice.
                  </p>
                </>
              ),
            },
            {
              title: "Godfred wants to be an electrical engineer",
              tone: "yellow",
              body: (
                <>
                  <p className="quote xt xt--sm" style={{ margin: "6px 0 18px", fontSize: "clamp(26px, 2.6vw, 40px)" }}>
                    &ldquo;A very, very big electrical engineer.&rdquo;
                  </p>
                  <p>That is how he puts it. He scored at the top of his class on the national exam.</p>
                  <p>
                    But in a family living on one cocoa harvest a year, being the best student in the room does not cover uniforms, bedding, and the long list
                    of things a boarding student needs to walk through the door. He starts grade 10 in September 2026, one of the fund&rsquo;s first recipients.
                  </p>
                </>
              ),
            },
          ]}
        />
      </Stage>

      <Stage tone="paper" label="Where this happens">
        <Head title="Where this happens" />
        <PinMap country="Ghana" caption="Click the pin to see the work behind this fund" />
      </Stage>

      <Stage tone="yellow" label="From the community">
        <Head title="From the community" />
        <div className="strip-wrap" style={{ marginTop: 0 }}>
          <div className="strip" style={{ animationDuration: "45s" }}>
            {[...EDUCATION_IMAGES, ...EDUCATION_IMAGES].map((m, i) => (
              <img key={i} src={cdn(m.imageUrl, 440)} alt={i < EDUCATION_IMAGES.length ? m.alt : ""} loading="lazy" />
            ))}
          </div>
        </div>
      </Stage>

      <Stage tone="pink" label="Give to the Education Fund">
        <Head
          title={
            <>
              One exam. One uniform.
              <br />
              One future.
            </>
          }
          lede={
            <>
              <p>
                A scholarship at the moment of transition does more than pay a bill. It tells a family that keeping their child in school was worth it. It
                widens a young person&rsquo;s sense of what is possible.
              </p>
              <p>Beast Philanthropy is a registered 501(c)(3). Donations are tax deductible to the extent permitted by law.</p>
            </>
          }
        />
        <Btn href={GIVE} tone="white">
          Give to the Education Fund
        </Btn>
      </Stage>
    </main>
  );
}
