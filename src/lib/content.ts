/*
  Every figure, quote and link below is taken from beastphilanthropy.org
  (home, FAQ and campaign pages, read 2026-10-30). Nothing here is invented;
  when the live site changes, change it here.
*/

export const SITE = "https://www.beastphilanthropy.org";
export const DONATE = "/donate";
/** The live site's donation form (Donorbox). Amount and frequency are passed through. */
export const CHECKOUT = "https://donorbox.org/beast-pantry";
export const checkout = (amount: number, monthly: boolean) =>
  `${CHECKOUT}?amount=${amount}${monthly ? "&default_interval=m" : ""}`;

export const NAV = [
  { label: "Our work", href: "/our-work" },
  { label: "Who we are", href: "/who-we-are" },
  { label: "Impact", href: "/impact" },
  { label: "Media", href: "/media" },
  { label: "News", href: "/news" },
];

/** Hero chapters: the timeline under the player. */
export const CHAPTERS = [
  { id: "water", label: "Clean water", note: "#TeamWater · 2M people", img: "/media/water-pump.jpg", alt: "Children drinking from a new water tap at their school" },
  { id: "food", label: "Food", note: "48M+ meals served", img: "/media/food-line.jpg", alt: "Volunteers serving hot meals to a line of children" },
  { id: "school", label: "Schools", note: "25+ countries, 5 continents", img: "/media/school-visit.jpg", alt: "Jimmy Donaldson greeting students outside a school" },
  { id: "pantry", label: "Beast Pantry", note: "Greenville, North Carolina", img: "/media/pantry-volunteers.jpg", alt: "Beast Pantry volunteers unloading boxes of fresh produce" },
];

export const STATS = [
  { value: 48, suffix: "M+", label: "Meals distributed", body: "Via Beast Pantry in Greenville, NC and direct distribution programs across the US and internationally." },
  { value: 40, prefix: "$", suffix: "M+", label: "Raised for clean water", body: "#TeamWater is on track to provide 2M people with access to clean water." },
  { value: 2, suffix: "M+", label: "People impacted", body: "Direct beneficiaries across food, water, medical, and education programs in 25+ countries." },
  { value: 25, suffix: "+", label: "Countries · 5 continents", body: "Clean water, schools, hospitals, and homes built worldwide." },
  { value: 25, suffix: "M", label: "#TeamTrees planted", body: "Verified plantings across 6 continents with the Arbor Day Foundation." },
  { value: 100, suffix: "%", label: "Revenue deployed", body: "Every dollar of revenue from Beast Philanthropy's YouTube channel goes directly to funding the charity." },
];

export const VERIFIED = [
  { name: "Charity Navigator", note: "Four-Star Rated", img: "/media/charity-navigator.png", href: "https://www.charitynavigator.org/ein/852067214" },
  { name: "Candid", note: "Platinum Transparency 2026", img: "/media/candid-seal.svg", href: "https://app.candid.org/profile/9917424/beast-philanthropy-85-2067214/" },
  { name: "1% For The Planet", note: "Environmental Partner", img: "/media/one-percent.webp", href: "https://directories.onepercentfortheplanet.org/profile/beast-philanthropy" },
];

export const PROGRAM_NAMES = { water: "#TeamWater", pantry: "Beast Pantry", ghana: "Ghana Initiative" } as const;

export const APPROACH = [
  {
    id: "partners",
    title: "The right partners",
    body: "From globally recognized NGOs to grassroots groups creating change in their own communities. What they share: a clear plan, a commitment to results, and the trust of the people they serve.",
  },
  {
    id: "verified",
    title: "Verified impact",
    body: "Outcomes are never assumed; they're documented. On-the-ground photography, rigorous data collection, and third-party verification.",
  },
  {
    id: "community",
    title: "Community at the core",
    body: "Every view, every share, every act of generosity, from our audience to our partners to the communities we serve, is what makes this mission possible.",
  },
] as const;

export const PARTNERS = [
  { name: "Mark Rober", role: "Co-founder", program: "#TeamWater · #TeamSeas" },
  { name: "Ocean Conservancy", role: "Official ocean & beaches partner", program: "#TeamSeas" },
  { name: "The Ocean Cleanup", role: "Official rivers partner", program: "#TeamSeas" },
  { name: "Arbor Day Foundation", role: "Reforestation partner", program: "#TeamTrees" },
  { name: "Sharing Excess", role: "Food rescue partner", program: "Beast Pantry" },
  { name: "West Akyem Cooperative Union", role: "Farmer cooperative", program: "Ghana Initiative" },
];

export const TEAMWATER_JOURNEY = [
  { date: "Aug 1, 2025", title: "#TeamWater launches", body: "MrBeast and Mark Rober go live with one of the largest creator networks ever assembled." },
  { date: "Aug 31, 2025", title: "$40M+ raised in one month", body: "The biggest crowdfunded clean water campaign in internet history." },
  { date: "Fall 2025", title: "Projects mobilize", body: "Work moves forward across nine countries, from Bangladesh to Brazil." },
];

export const CAMPAIGNS = {
  water: { name: "#TeamWater", status: "Active · 5-year campaign", href: `/our-work/team-water` },
  pantry: { name: "Beast Pantry", status: "Ongoing · Greenville, NC", href: `/our-work/beast-pantry` },
  ghana: { name: "Ghana Initiative", status: "Active · Eastern Region, Ghana", href: `/our-work/ghana-child-labor` },
  seas: { name: "#TeamSeas", status: "Complete · Global", href: `/our-work/team-seas` },
  trees: { name: "#TeamTrees", status: "Complete · 6 continents", href: `/our-work/team-trees` },
};

export const REACH = [
  { value: "1B+", label: "Followers" },
  { value: "1.6B", label: "Unique reach, rolling 90 days" },
  { value: "6B+", label: "Average monthly views" },
  { value: "#1", label: "YouTube creator in the world" },
];

export const VIDEOS = [
  { id: "4O8o_uOyeTc", title: "We Built Lifesaving Clinics Around The World", channel: "Beast Philanthropy" },
  { id: "Z4hVGCWH1Kc", title: "2,000,000 People Get Clean Water For The First Time!", channel: "MrBeast" },
  { id: "wfHLbzPKPJc", title: "1,000 People Get Life Changing Surgery", channel: "Beast Philanthropy" },
  { id: "CvPtDd3B3PE", title: "We Saved 100 Children's Hearts in Africa", channel: "Beast Philanthropy" },
  { id: "O6wTcrhkw4o", title: "Rescuing Child Slaves in Africa", channel: "Beast Philanthropy" },
  { id: "6DJBExeh94w", title: "I Fought One of America’s Biggest Problems", channel: "Beast Philanthropy" },
  { id: "kwW3d1jgTlM", title: "Beast Games: Charity Edition", channel: "Beast Philanthropy" },
  { id: "wOGD9zfqEkk", title: "Giving 10 Kids Supercars", channel: "Beast Philanthropy" },
];

/** FAQ answers, from beastphilanthropy.org/faq and the home page. */
export const QUESTIONS = [
  {
    q: "Is Beast Philanthropy a real nonprofit?",
    a: "Yes. We're a registered 501(c)(3) nonprofit under EIN 85-2067214, rated four stars by Charity Navigator, Platinum Transparency with Candid, and an environmental partner of 1% For The Planet. Our financial reports are public.",
    link: { label: "See our financial reports", href: "/financial-reports" },
  },
  {
    q: "Where does the YouTube money go?",
    a: "Every dollar of revenue from the Beast Philanthropy YouTube channel goes directly to funding the charity. Each video funds a real-world project.",
  },
  {
    q: "How is Beast Philanthropy related to MrBeast?",
    a: "Jimmy Donaldson (MrBeast), the world's #1 YouTube creator, founded it. The channel earns revenue through views, and that revenue funds the projects. His platform is the engine that makes our scale possible.",
  },
  {
    q: "Are donations tax deductible?",
    a: "Yes. We're recognized under IRC section 501(c)(3), and donations are fully tax deductible under IRC section 170(c).",
  },
  {
    q: "How do you know a project actually worked?",
    a: "Outcomes are never assumed; they're documented. On-the-ground photography, rigorous data collection and third-party verification make sure every project delivers what it promises.",
  },
  {
    q: "Where are you based?",
    a: "Greenville, North Carolina: Jimmy's hometown and the home of the Beast Pantry, our flagship local food program.",
  },
];

export const SOCIALS = [
  { label: "YouTube", href: "https://www.youtube.com/@beastphilanthropy" },
  { label: "Instagram", href: "https://www.instagram.com/beastphilanthropy" },
  { label: "TikTok", href: "https://www.tiktok.com/@beastphilanthropy" },
  { label: "X", href: "https://x.com/BeastPhilanthr" },
  { label: "Facebook", href: "https://www.facebook.com/beastphilanthr/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/beast-philanthropy/" },
  { label: "Spotify", href: "https://open.spotify.com/artist/400iD3n8DqB8wGqxDv6pSB" },
];

export const FOOTER_LINKS = [
  {
    title: "Campaigns",
    links: Object.values(CAMPAIGNS).map((c) => ({ label: c.name, href: c.href })),
  },
  {
    title: "Organization",
    links: [
      { label: "Who we are", href: "/who-we-are" },
      { label: "Our partners", href: "/our-partners" },
      { label: "Impact reports", href: "/impact" },
      { label: "News", href: "/news" },
      { label: "Video library", href: "/media" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Donate", href: DONATE },
      { label: "FAQ", href: "/faq" },
      { label: "Financial reports", href: "/financial-reports" },
      { label: "Merch store", href: "https://mrbeast.store/pages/philanthropy" },
    ],
  },
];

/* ---------------------------------------------------------------- v2 */

/** Scoreboard: exact figures from the campaign pages. */
export const SCORE = [
  { n: 48434790, plus: true, label: "Meals delivered", by: "Beast Pantry", tone: "pink", href: `/our-work/beast-pantry` },
  { n: 40000000, plus: true, prefix: "$", label: "Raised for clean water", by: "#TeamWater", tone: "cyan", href: `/our-work/team-water` },
  { n: 34080191, label: "Pounds of trash removed", by: "#TeamSeas", tone: "yellow", href: `/our-work/team-seas` },
  { n: 25000000, label: "Trees planted", by: "#TeamTrees", tone: "leaf", href: `/our-work/team-trees` },
] as const;

/** Before/after: the "before" line is each campaign page's "Why it matters"; the photo is illustrative. */
export const BEFORE_AFTER = [
  {
    id: "water",
    tab: "#TeamWater",
    before: { big: "1 in 10 people", line: "don't have clean water.", body: "Long treks and missed school, especially for women and girls." },
    after: { big: "2,000,000 people", line: "get clean water.", body: "Built and maintained by local communities, for decades.", img: "/media/water-pump.jpg", alt: "Students drinking from a new school water tap" },
  },
  {
    id: "ghana",
    tab: "Ghana Initiative",
    before: { big: "1.56M children", line: "work in cocoa fields.", body: "Across Ghana and Côte d'Ivoire's cocoa-growing regions." },
    after: { big: "10,167 people", line: "reached directly.", body: "Schools, water, health and income in 11 cocoa-farming communities.", img: "/media/school-visit.jpg", alt: "Students greeting visitors outside a school" },
  },
  {
    id: "pantry",
    tab: "Beast Pantry",
    before: { big: "Food deserts", line: "with no pantry.", body: "Families choosing between groceries and a car payment." },
    after: { big: "80,000 meals", line: "every month.", body: "A hub-and-spoke model across 20+ communities in Eastern North Carolina.", img: "/media/pantry-volunteers.jpg", alt: "Volunteers loading boxes of fresh produce" },
  },
] as const;

export const STEPS = [
  { n: "1", title: "You watch", body: "Every time you watch, share or engage with a Beast Philanthropy video, you fund real impact.", tone: "white", rot: -4 },
  { n: "2", title: "The channel earns", body: "Every view generates revenue for the Beast Philanthropy YouTube channel.", tone: "cyan", rot: 3 },
  { n: "3", title: "100% funds the work", body: "Every dollar of that revenue goes directly to funding the charity's projects.", tone: "pink", rot: -2 },
] as const;
