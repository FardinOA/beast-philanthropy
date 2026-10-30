import type { Metadata } from "next";
import { Btn, Cards, Head, PageHero, Seals, Stage } from "@/components/kit";
import { DonateBox } from "@/components/widgets";
import { Questions } from "@/components/questions";
import { CHECKOUT, checkout } from "@/lib/content";
import { DONATE_FAQ } from "@/lib/site";

export const metadata: Metadata = { title: "Donate to Beast Philanthropy | Make Kindness Viral" };

export default function DonatePage() {
  return (
    <main>
      <PageHero
        eyebrow="Donate"
        tone="pink"
        title={
          <>
            Support our <span className="hl">mission</span>
          </>
        }
        lede={<p>All online donations are unrestricted gifts and support the mission where the need is greatest.</p>}
      >
        <DonateBox />
      </PageHero>

      <Stage tone="paper" label="Other ways to give">
        <Head title="Other ways to give" lede="More ways to support." />
        <Cards
          items={[
            {
              title: "Crypto or stock",
              tone: "cyan",
              body: "Beast Philanthropy accepts donations of cryptocurrency and stock in addition to standard donations.",
              extra: <Btn href={CHECKOUT} tone="white">Donate crypto or stock</Btn>,
            },
            {
              title: "Shop the store",
              tone: "yellow",
              body: "A percentage of every Beast store purchase supports Beast Philanthropy. Every purchase puts money directly behind the work.",
              extra: <Btn href="https://mrbeast.store/pages/philanthropy" tone="white">Shop now</Btn>,
            },
            {
              title: "Monthly giving",
              tone: "pink",
              body: "Become a recurring supporter and join our mission! Monthly donations help fund ongoing programs around the world.",
              extra: <Btn href={checkout(25, true)} tone="white">Give monthly</Btn>,
            },
          ]}
        />
      </Stage>

      <Questions
        items={DONATE_FAQ}
        more={false}
        title={
          <>
            Donations
            <br />
            &amp; financials
          </>
        }
        note="Your questions about giving, answered from our FAQ."
      />

      <Stage tone="yellow" label="Where your donation goes">
        <Head
          title="Where your donation goes"
          lede={
            <>
              <p>Your money is accounted for. Beast Philanthropy is a registered 501(c)(3) nonprofit.</p>
              <p>Every dollar is deployed through verified partner organizations. Our financials are publicly available.</p>
            </>
          }
        />
        <Btn href="/financial-reports">View our financials</Btn>
        <Seals />
      </Stage>
    </main>
  );
}
