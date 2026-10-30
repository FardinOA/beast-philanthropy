import type { Metadata } from "next";
import { PageHero, Stage } from "@/components/kit";
import { FaqTabs } from "@/components/widgets";
import { FAQ } from "@/lib/site";

export const metadata: Metadata = { title: "Beast Philanthropy FAQ | Donations, Impact & Projects" };

export default function FaqPage() {
  return (
    <main>
      <PageHero
        eyebrow="Got questions?"
        tone="cyan"
        title={
          <>
            Frequently asked <span className="hl">questions</span>
          </>
        }
        lede={<p>Everything you need to know about Beast Philanthropy, our projects, and how your donations are used.</p>}
      />
      <Stage tone="paper" label="Questions" className="faqpage">
        <FaqTabs cats={FAQ} />
      </Stage>
    </main>
  );
}
