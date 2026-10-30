/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Head, PageHero, Photo, Stage, cdn } from "@/components/kit";
import { StatPanel } from "@/components/scoreboard";
import { PantrySteps } from "@/components/widgets";
import { Feed } from "@/components/feed";
import { Donate } from "@/components/donate";
import { IMAGES, PANTRY_JOURNEY, photo } from "@/lib/site";

export const metadata: Metadata = { title: "Beast Pantry & Food Assistance | Beast Philanthropy" };

export default function BeastPantry() {
  const line = IMAGES["beast-pantry"].filter((m) => m.w === 608);
  return (
    <main>
      <PageHero
        eyebrow="Ongoing · Greenville, North Carolina"
        tone="pink"
        title="Beast Pantry"
        lede={<p>Fighting food insecurity in the community where it all started.</p>}
        photo={photo("our-partners", 6)}
        stickers={<span className="sticker phero__s1">Since late 2020</span>}
      >
        <div className="statrow phero__stat" style={{ "--cols": 3, maxWidth: "none" } as React.CSSProperties}>
          <StatPanel s={{ n: 60438950, plus: true, label: "Pounds of food", tone: "yellow" }} i={0} />
          <StatPanel s={{ n: 48434790, plus: true, label: "Meals delivered", tone: "cyan" }} i={1} />
          <StatPanel s={{ n: 15855321, plus: true, label: "Individuals fed", tone: "leaf" }} i={2} />
        </div>
      </PageHero>

      <Stage tone="paper" label="What is the Beast Pantry">
        <div className="duo">
          <div>
            <Head title="What is the Beast Pantry?" />
            <div className="prose" data-reveal>
              <p>
                Feeling hungry is something we can all relate to, and seeing our neighbors struggle to feed their families is what pushes us to act. We show
                up where support is needed most, helping people avoid the choice between feeding their families and making a car payment or keeping a roof
                over their heads.
              </p>
              <p>
                The Beast Pantry got its start in <b>late 2020</b>, in Jimmy&rsquo;s hometown of Greenville, North Carolina, when food insecurity in the
                community started climbing. With a hub-and-spoke distribution model, we now reach <b>20+ communities across Eastern North Carolina</b>,
                including food deserts that don&rsquo;t have a traditional food pantry to turn to.
              </p>
              <p>
                Since we started, the Beast Pantry and our food rescue partners have given more than <b>60 million pounds of food</b> to people who need it.
              </p>
            </div>
          </div>
          <Photo src={photo("beast-pantry", 1).src} alt={photo("beast-pantry", 1).alt} tilt={2} ratio="3 / 4" caption="Why it matters" />
        </div>
      </Stage>

      <Stage tone="yellow" label="The journey">
        <Head
          title="From a warehouse to millions fed"
          lede="What started as a single warehouse-turned-food pantry in Greenville now consistently distributes approximately 80,000 meals each month to local families in need."
        />
        <PantrySteps steps={PANTRY_JOURNEY} />
      </Stage>

      <Stage tone="cyan" label="Ongoing support">
        <div className="prose" data-reveal style={{ maxWidth: "70ch" }}>
          <p className="lead">Beast Pantry in Greenville</p>
          <p>
            Serves 20+ communities across Eastern North Carolina through a hub-and-spoke distribution model that provides approximately{" "}
            <b>80,000 meals to families each month.</b>
          </p>
          <p>
            <b>Ongoing support.</b> With the dedication of our Beast Philanthropy community members like you, we remain committed to our mission to get rid of
            global hunger, and know our combined efforts will have a lasting positive impact on the world.
          </p>
        </div>
        <div className="strip-wrap">
          <div className="strip" style={{ animationDuration: "90s" }}>
            {[...line, ...line].map((m, i) => (
              <img key={i} src={cdn(m.src, 440)} alt={i < line.length ? m.alt : ""} loading="lazy" />
            ))}
          </div>
        </div>
      </Stage>

      <Feed title="Check out our latest work" />
      <Donate />
    </main>
  );
}
