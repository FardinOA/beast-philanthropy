/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Btn, Head, PageHero, Seals, Stage, cdn } from "@/components/kit";
import { Letter } from "@/components/widgets";
import { ANNUAL_REPORT, AUDITS, FORM_990, photo, type Report } from "@/lib/site";

export const metadata: Metadata = { title: "Financial Reports & Transparency | Beast Philanthropy" };

function Years({ items, kind }: { items: Report[]; kind: string }) {
  return (
    <ul className="years">
      {items.map((r) => (
        <li key={`${kind}-${r.year}`} className={`year ${r.fileUrl ? "year--file" : ""}`}>
          <b>{r.year}</b>
          <span>{kind}</span>
          {r.fileUrl ? (
            <a href={r.fileUrl} target="_blank" rel="noopener">
              Download PDF
            </a>
          ) : (
            <em>In process</em>
          )}
        </li>
      ))}
    </ul>
  );
}

const LETTER = [
  "Thank you for visiting Beast Philanthropy.",
  "Beast Philanthropy was born from Jimmy Donaldson (aka MrBeast)'s conviction that influence carries responsibility and that one of the world's largest platforms could become one of the world's greatest forces for good. Jimmy has demonstrated the extraordinary way storytelling can inspire generosity and mobilize people around a common purpose. Our responsibility is to transform that inspiration into lasting impact through exceptional execution, trusted partnerships, disciplined governance, and measurable outcomes.",
  "Our mission is simple: Make Kindness Viral. How do we do this? Through a two-part strategy of helping children and families thrive, and inspiring communities to action.",
  "As the Beast Philanthropy Board of Directors, we are committed to the highest standards of governance, transparency, and operational excellence. We continuously evaluate our programs, measure what matters, learn from every initiative, and strive to ensure that every decision creates the greatest possible benefit for the communities we serve. Success is measured not only by what we accomplish today, but by the enduring value we create over time.",
  "While data and measurement are essential, they are never the full story. Metrics tell us whether we're making progress. People remind us why that progress matters. Every number represents a child gaining access to education, a family receiving clean water for the first time, a community rebuilding after hardship, or an individual whose future has been forever changed. Those stories are the true measure of our success.",
  "We also recognize that transformational change is never achieved alone. It requires collaboration among communities, nonprofit leaders, governments, private sector partners, and supporters who share a belief that ambitious challenges deserve ambitious solutions. Together, we can achieve far more than any one organization could accomplish on its own.",
  "As you explore our work, we hope you will see more than a collection of projects. You will witness an organization committed to earning trust through transparency, strengthening impact through innovation, and approaching every challenge with purpose. We are proud of what has been accomplished, but we are even more energized by the opportunity ahead.",
  "Thank you for being part of this journey. Whether you are a supporter, partner, volunteer, or someone who simply believes the world can be better than it is today, your confidence in this mission helps make that future possible.",
  "Together, we have the opportunity to demonstrate that when bold ideas are matched with innovation, disciplined execution, and the passion of the largest audience ever assembled, generosity becomes one of the world's most powerful forces for change.",
];

export default function FinancialReports() {
  const cover = photo("financial-reports", 2);
  return (
    <main>
      <PageHero
        eyebrow="The record"
        tone="paper"
        title={
          <>
            Financial <span style={{ color: "var(--pink)" }}>reports</span>
          </>
        }
        lede={
          <p>
            Every project. Every dollar.
            <br />
            Every outcome. Documented and publicly available.
          </p>
        }
      />

      <Stage tone="cyan" label="Reports">
        <div className="reports">
          <div className="rblock" data-slam style={{ "--r": "-4deg", "--rot": "-0.8deg" } as React.CSSProperties}>
            <h3>Form 990</h3>
            <p>Beast Philanthropy&rsquo;s IRS Form 990 provides a detailed look at our financial activity, programs, and operations.</p>
            <Years items={FORM_990} kind="IRS Form 990" />
          </div>
          <div className="rblock" data-slam style={{ "--r": "4deg", "--rot": "0.8deg", "--d": 1 } as React.CSSProperties}>
            <h3>Audit forms</h3>
            <p>Our independently audited financial statements provide transparency into Beast Philanthropy&rsquo;s financial position and stewardship of donor funds.</p>
            <Years items={AUDITS} kind="Audit report" />
          </div>
        </div>
      </Stage>

      <Stage tone="paper" label="Annual reports">
        <Head
          title="Annual reports"
          lede="Annual reports provide a look at the work we've accomplished, the communities we've served, and the impact made possible by our partners and supporters. Annual reports are released annually in the fall for that calendar year."
        />
        <div className="annual" data-reveal>
          <img src={cdn(cover.src, 500)} alt={cover.alt} />
          <div>
            <h3>2025 Annual Report</h3>
            <p>A look back at Beast Philanthropy&rsquo;s 2025 projects, partnerships, accomplishments, and impact.</p>
            <Btn href={ANNUAL_REPORT}>Download PDF</Btn>
          </div>
        </div>
        <Seals />
      </Stage>

      <Stage tone="yellow" label="Board of directors">
        <Head
          title="Board of directors"
          lede="How we operate. Beast Philanthropy is a registered 501(c)(3) nonprofit organization. Our governance structure ensures accountability, transparency, and responsible stewardship of every dollar donated."
        />
        <Letter paragraphs={LETTER} sign={["With Kindness,", "The Beast Philanthropy Board of Directors"]} />
      </Stage>
    </main>
  );
}
