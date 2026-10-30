/*
  Data for the sub pages, extracted from beastphilanthropy.org's own page
  payloads on 2026-10-30 (see README → Content). The JSON in src/data/site
  is generated; edit it only to mirror a change on the live site.
*/
import faq from "@/data/site/faq.json";
import donateFaq from "@/data/site/donate-faq.json";
import educationFaq from "@/data/site/education-faq.json";
import twProjects from "@/data/site/teamwater-projects.json";
import twJourney from "@/data/site/teamwater-journey.json";
import ttProjects from "@/data/site/teamtrees-projects.json";
import ghanaCommunities from "@/data/site/ghana-communities.json";
import pantryJourney from "@/data/site/pantry-journey.json";
import stories from "@/data/site/impact-stories.json";
import reports from "@/data/site/reports.json";
import press from "@/data/site/press.json";
import updates from "@/data/site/updates.json";
import podcasts from "@/data/site/podcasts.json";
import whoVideos from "@/data/site/who-videos.json";
import whoCycle from "@/data/site/who-cycle.json";
import educationImages from "@/data/site/education-images.json";
import media from "@/data/site/media.json";
import partnerLogos from "@/data/site/partner-logos.json";
import images from "@/data/site/images.json";
import privacy from "@/data/site/legal-privacy-policy.json";
import cookie from "@/data/site/legal-cookie-policy.json";
import disclosure from "@/data/site/legal-disclosure-statement.json";

export type Img = { src: string; alt: string; w: number; h: number };
export const IMAGES = images as Record<string, Img[]>;
/** The nth real photo on a live page, with its alt text. */
export const photo = (page: string, i = 0): Img => IMAGES[page][i];

export type QA = { q: string; a: string; link?: { label: string; href: string } };
export const FAQ = faq as { label: string; items: QA[] }[];
export const DONATE_FAQ = donateFaq as QA[];
export const EDUCATION_FAQ = educationFaq as QA[];
export const TEAMWATER_FAQ = FAQ.find((c) => c.label === "#TeamWater")!.items;

export type WaterProject = { name: string; flag?: string; dates: string; location: string; status: string; detail: { bullets: string[]; partner: string } };
export const TW_PROJECTS = twProjects as WaterProject[];
export type Journey = { status: string; date: string; title: string; body?: { text: string }[]; foot?: string; [k: string]: unknown };
// The Aug 31 milestone's title and footnote are rich text on the live page; restored from its visible text.
export const TW_JOURNEY = (twJourney as Journey[]).map((j) =>
  j.title ? j : { ...j, title: "$40M+ Raised in One Month", body: (j.body ?? []).filter((b) => b.text), foot: "$40,000,000+ raised" },
);

export type TreeProject = { continent: string; status: string; title: string; region: string; treeCount: number; place: string; desc: string; image: string; story?: string; imageAlt?: string };
export const TT_PROJECTS = ttProjects as TreeProject[];

export type CommunityRow = { area: string; dayOne?: string; byYear?: string; mark?: string; dayOneMuted?: boolean };
export type Community = { name: string; meta: string; status: string; group?: { label: string; meta: string; blurb: string }; table: { byYearHeading: string; dayOneHeading?: string; rows: CommunityRow[] } };
export const COMMUNITIES = ghanaCommunities as Community[];

export type PantryStep = { copy: { text: string; bold: boolean }[]; imageUrl: string; alt: string; videoUrl?: string };
export const PANTRY_JOURNEY = pantryJourney as PantryStep[];

export type Story = { kind: string; shape: string; imageUrl: string; alt: string; videoUrl?: string; story?: { name: string; role: string; impact: string; body: string; avatarUrl?: string; ctaLabel?: string; ctaHref?: string } };
export const STORIES = stories as Story[];

export type Report = { year: string; fileUrl?: string; inProcess: boolean };
const r = reports as Report[];
const split = r.findIndex((x, i) => i > 1 && x.year === r[1].year);
// Two lists of the same years (990s, then audits; the duplicate "2025 in process" was merged). The live page shows the latest three of each.
export const FORM_990 = r.slice(0, split).slice(0, 3);
export const AUDITS = [r[0], ...r.slice(split, split + split - 1)].slice(0, 3);
export const ANNUAL_REPORT = "https://cdn.sanity.io/files/5l44tcs4/production/13dbea0a9c473ef8856f5b86f83fdcd5bd0e5c9a.pdf";

export type Press = { date: string; title: string; outlet: string; logoUrl: string; logoWidth: number; logoHeight: number; href: string };
export const PRESS = press as Press[];
export type Update = { date: string; title: string; excerpt: string; imageUrl: string; href: string };
export const UPDATES = updates as Update[];
export type Podcast = { date: string; title: string; duration: string; coverUrl: string; href: string };
export const PODCASTS = podcasts as Podcast[];

export type WhoVideo = { image: string; title: string; description: string; views: string; age: string; href: string };
export const WHO_VIDEOS = whoVideos as WhoVideo[];
export const WHO_CYCLE = whoCycle as { label: string; photo: string }[];
export const EDUCATION_IMAGES = educationImages as { alt: string; imageUrl: string }[];

export type MediaVideo = { youtubeId: string; title: string; topic?: string; campaignTitle?: string; campaignSlug?: string };
export const MEDIA = media as { all: MediaVideo[]; recent: string[] };

export const PARTNER_LOGOS = partnerLogos as { name: string; logo: string }[];

export type Block = { t: "h1" | "h2" | "h3" | "p" | "li"; x: string };
export const LEGAL = { privacy: privacy as Block[], cookie: cookie as Block[], disclosure: disclosure as Block[] };
