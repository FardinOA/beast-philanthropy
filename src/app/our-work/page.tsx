import type { Metadata } from "next";
import { Btn, Cards, Chain, Head, PageHero, Photo, Stage, TextLink } from "@/components/kit";
import { StatPanel } from "@/components/scoreboard";
import { Donate } from "@/components/donate";
import { photo } from "@/lib/site";

export const metadata: Metadata = { title: "Our Work & Global Projects | Beast Philanthropy" };

export default function OurWork() {
  return (
    <main>
      <PageHero
        eyebrow="What we do"
        tone="yellow"
        title={
          <>
            How we make kindness <span className="hl">viral</span>
          </>
        }
        lede={
          <p>
            Beast Philanthropy funds and executes real-world projects across three areas: hunger, child labor, and community impact. Every project is
            verifiable, documented, and built to last.
          </p>
        }
        actions={<Btn href="/donate">Donate</Btn>}
        photo={photo("our-work", 5)}
        stickers={
          <>
            <span className="sticker phero__s1">Verifiable</span>
            <span className="sticker phero__s2">Built to last</span>
          </>
        }
      />

      <Stage tone="paper" label="Our model">
        <Head
          title="Our model"
          lede={
            <>
              <p>
                Beast Philanthropy&rsquo;s model is straightforward. The Beast Philanthropy YouTube channel generates revenue through views. That revenue
                funds real-world projects, directly and through partnerships with established, field-verified organizations.
              </p>
              <p>
                But the model goes further than funding. Every project Beast Philanthropy takes on is chosen because it can be documented, verified, and
                shared, turning each act of generosity into content that inspires millions more to do the same.
              </p>
            </>
          }
        />
        <Chain steps={["Views", "Revenue", "Projects", "Documented impact", "Inspires more action"]} />
        <p className="quote xt xt--sm" data-slam style={{ "--r": "-3deg" } as React.CSSProperties}>
          The theory of change: generosity, made visible at scale, becomes contagious.
        </p>
      </Stage>

      <Stage tone="cyan" label="Three ways, one mission">
        <Head
          title={
            <>
              Three ways.
              <br />
              One mission.
            </>
          }
          lede="Beast Philanthropy helps children and families and mobilizes the world to act through direct programs, focused campaigns, and platforms built to scale generosity."
        />
        <Cards
          items={[
            {
              n: "1",
              title: "Direct delivery",
              tone: "paper",
              body: "Long-term, hands-on programs in the communities where we work, such as our U.S. food pantry and community development in Ghana. This is just the start. As Beast Philanthropy grows, our direct-service programs will too.",
            },
            {
              n: "2",
              title: "Campaigns",
              tone: "yellow",
              body: "Focused, time-bound pushes that pair a powerful video with mass mobilization, rallying the world around one cause, one moment. Examples include our #Team campaigns.",
            },
            {
              n: "3",
              title: "Platforms",
              tone: "pink",
              body: "The channels that carry our message and make giving easy, including the Beast Philanthropy YouTube channel and social channels.",
            },
          ]}
        />
      </Stage>

      <Stage tone="paper" label="Flagship program">
        <div className="duo">
          <div>
            <Head title="Beast Pantry" />
            <div className="prose" data-reveal>
              <p>
                Based in North Carolina, Beast Pantry is Beast Philanthropy&rsquo;s flagship local program, a permanent food pantry serving families in the
                community where Jimmy grew up and where the Beast team works every day. This isn&rsquo;t a campaign with an end date.
              </p>
              <p>It&rsquo;s a long-term commitment to the people closest to home.</p>
              <TextLink href="/our-work/beast-pantry">Learn more about Beast Pantry</TextLink>
            </div>
          </div>
          <Photo src={photo("our-work", 4).src} alt={photo("our-work", 4).alt} tilt={2} caption="Flagship program" />
        </div>
        <div className="statrow gap-top" style={{ "--cols": 3 } as React.CSSProperties}>
          <StatPanel s={{ n: 60438950, plus: true, label: "Pounds of food", tone: "yellow" }} i={0} />
          <StatPanel s={{ n: 48434790, plus: true, label: "Meals delivered", tone: "pink" }} i={1} />
          <StatPanel s={{ n: 15855321, plus: true, label: "Individuals fed", tone: "cyan" }} i={2} />
        </div>
      </Stage>

      <Stage tone="ink" label="Our approach">
        <Head light title="Our approach" lede="Not every cause gets funded. Beast Philanthropy selects projects based on three criteria:" />
        <Cards
          items={[
            { n: "1", title: "Scale of impact", tone: "yellow", body: "Does this reach enough people to matter?" },
            { n: "2", title: "Verifiable", tone: "cyan", body: "Can we document and prove what happened?" },
            { n: "3", title: "Shareable", tone: "pink", body: "Can this inspire others to act?" },
          ]}
        />
        <div className="stamps-row">
          <span className="sticker" data-slam style={{ "--r": "-14deg", "--rot": "-3deg" } as React.CSSProperties}>
            No project launches without a clear deployment plan.
          </span>
          <span className="sticker" data-slam style={{ "--r": "12deg", "--rot": "2deg", "--d": 1 } as React.CSSProperties}>
            No results are published without verification.
          </span>
        </div>
      </Stage>

      <Donate />
    </main>
  );
}
