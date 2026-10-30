/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Head, PageHero, Stage, cdn } from "@/components/kit";
import { PARTNER_LOGOS, photo } from "@/lib/site";

export const metadata: Metadata = { title: "Our Partners · Beast Philanthropy" };

const logo = (name: string) => PARTNER_LOGOS.find((p) => p.name === name)!;

/* Field partners in the live page's order, with its own one-line descriptions. */
const FIELD = [
  { name: "WaterAid", body: "Global Partner for #TeamWater, delivering sustainable water infrastructure across 25+ countries and five continents." },
  { name: "GivePower", body: "Building solar-powered water desalination systems in water-scarce communities worldwide." },
  { name: "DigDeep", body: "Bringing running water to homes in Appalachia, ensuring no community within the United States is left behind." },
  { name: "Instituto Alok", body: "Delivering clean water access to indigenous communities in Brazil, the people furthest from existing infrastructure." },
  { name: "Beast Pantry food rescue partner", body: "Rescuing millions of pounds of food and expanding Beast Pantry's distribution across North Carolina, Pennsylvania, and New York." },
  { name: "CarePortal", body: "Connecting families facing crisis with the resources they need, preventing children from entering the foster care system." },
];

function Feature({ name, body, tone = "paper" }: { name: string; body: string; tone?: string }) {
  const l = logo(name);
  return (
    <div className="pfeature" data-slam style={{ "--r": "-4deg", "--rot": "-0.6deg", background: tone === "paper" ? "#fff" : `var(--${tone})` } as React.CSSProperties}>
      <span className="plogo">
        <img src={cdn(l.logo, 700)} alt={l.name} />
      </span>
      <div>
        <h3>{l.name}</h3>
        <p>{body}</p>
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <main>
      <PageHero
        eyebrow="Who we work with"
        tone="cyan"
        title={
          <>
            Our <span className="hl">partners</span>
          </>
        }
        lede={
          <>
            <p>
              Beast Philanthropy works with a network of established organizations, each chosen for their track record, accountability, and alignment with
              the work we fund.
            </p>
            <p>The scale of Beast Philanthropy&rsquo;s impact is made possible by the organizations that share our commitment to verified, lasting change.</p>
          </>
        }
        photo={photo("our-partners", 8)}
        stickers={<span className="sticker phero__s1">Verified, lasting change</span>}
      />

      <Stage tone="paper" label="Fueling partners">
        <Head title="The organizations that fund the work" lede="Fueling partners. Our fueling partners provide the financial foundation that makes large-scale projects possible." />
        <Feature
          name="Rockefeller Foundation"
          tone="yellow"
          body="A first-of-its-kind strategic partnership combining next-generation storytelling with over a century of development expertise."
        />
      </Stage>

      <Stage tone="yellow" label="Field and implementation partners">
        <Head
          title="The organizations doing the work on the ground"
          lede="Field & implementation partners. Our field and implementation partners are the boots-on-the-ground organizations responsible for executing projects in communities around the world."
        />
        <ol className="ccards">
          {FIELD.map((f, i) => {
            const l = logo(f.name);
            const rot = [-1.5, 1, -1, 1.5][i % 4];
            return (
              <li key={f.name} className="ccard" data-slam style={{ "--r": `${rot * -5}deg`, "--rot": `${rot}deg`, "--d": i % 3 } as React.CSSProperties}>
                <span className="plogo">
                  <img src={cdn(l.logo, 500)} alt={l.name} />
                </span>
                <div className="ccard__body">{f.body}</div>
              </li>
            );
          })}
        </ol>
      </Stage>

      <Stage tone="paper" label="Strategic partners">
        <Head title="The organizations that amplify the work" lede="Strategic partners." />
        <Feature
          name="Tony Robbins"
          tone="pink"
          body="Combining on-the-ground efforts with global reach to ensure children and families receive nutritious meals and sustained support."
        />
      </Stage>

      <Stage tone="cyan" label="Educational partners">
        <Head title="Educational partners" />
        <div className="soon" data-reveal>
          <span className="sticker">Coming soon</span>
          <p>
            Beast Philanthropy is building partnerships with leading educational organizations to expand the reach and depth of its programming. This
            section will be updated as those partnerships are confirmed.
          </p>
        </div>
      </Stage>
    </main>
  );
}
