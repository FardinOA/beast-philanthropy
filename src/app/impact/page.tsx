/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Btn, Head, PageHero, Seals, Stage, cdn } from "@/components/kit";
import { StatPanel } from "@/components/scoreboard";
import { StoryGrid } from "@/components/widgets";
import { ANNUAL_REPORT, STORIES, photo } from "@/lib/site";

export const metadata: Metadata = { title: "Our Global Impact | Beast Philanthropy" };

export default function Impact() {
  const cover = photo("impact", 5);
  return (
    <main>
      <PageHero
        eyebrow="The record"
        tone="pink"
        title={
          <>
            Impact <span className="hl">reports</span>
          </>
        }
        lede={
          <p>
            Every project. Every dollar.
            <br />
            Every outcome. Documented and publicly available.
          </p>
        }
        actions={
          <Btn href={ANNUAL_REPORT} tone="white">
            2025 Annual Report
          </Btn>
        }
      />

      <Stage tone="paper" label="By the numbers">
        <Head
          title="By the numbers"
          lede="Real projects. Verified impact. Funded by the world's largest YouTube audience and deployed through rigorous partnerships across 5 continents."
        />
        <div className="panels">
          <StatPanel s={{ n: 40000000, prefix: "$", label: "Raised for clean water access worldwide", by: "#TeamWater", tone: "cyan", href: "/our-work/team-water" }} i={0} />
          <StatPanel s={{ n: 34080191, label: "Pounds of trash removed from oceans and coastlines", by: "#TeamSeas", tone: "yellow", href: "/our-work/team-seas" }} i={1} />
          <StatPanel s={{ n: 48434790, plus: true, label: "Meals delivered through Beast Pantry", by: "Beast Pantry", tone: "pink", href: "/our-work/beast-pantry" }} i={2} />
          <StatPanel s={{ n: 10167, label: "Direct beneficiaries in Ghana", by: "Ghana Initiative", tone: "leaf", href: "/our-work/ghana-child-labor" }} i={3} />
        </div>
        <div className="panels" style={{ marginTop: 22, gridTemplateColumns: "1fr" }}>
          <StatPanel s={{ n: 25000000, label: "Trees planted across 6 continents", by: "#TeamTrees", tone: "leaf", href: "/our-work/team-trees" }} i={0} />
        </div>
      </Stage>

      <Stage tone="yellow" label="Lives we've changed">
        <Head
          title="Lives we've changed"
          lede="Behind every statistic is a person. Beast Philanthropy documents the real outcomes of its work: not just what was funded, but what changed because of it."
        />
        <StoryGrid stories={STORIES} />
      </Stage>

      <Stage tone="paper" label="Annual reports">
        <Head
          title="Annual reports"
          lede="Beast Philanthropy publishes an annual report documenting every project, every dollar deployed, and every measurable outcome from the year."
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
    </main>
  );
}
