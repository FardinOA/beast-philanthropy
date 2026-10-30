# Beast Philanthropy, redesign concept v2

An unsolicited redesign of [beastphilanthropy.org](https://www.beastphilanthropy.org), built as a pitch. It isn't the official site and isn't affiliated with Beast Philanthropy. v1, the calmer editorial version, is in `../beast-philanthropy`.

v2 talks like a MrBeast video: outlined, extruded thumbnail type, flat pink/cyan/yellow, chunky cards on hard shadows, and motion that slams, stamps and shakes. Every loud element still carries a real, published number.

- **Hero:** the charity's real thumbnails drift past as a tilted wall that leans toward the pointer; the headline's extrusion swings away from it. Scroll plays the "now playing" film: it goes fullscreen, cuts to footage, and "2,000,000 people. Clean water. For decades." stamps in.
- **Scoreboard:** odometers roll to the exact figures (48,434,790+ meals, $40,000,000+, 34,080,191 lbs, 25,000,000 trees), then VERIFIED stamps slam on.
- **How a video becomes a well:** three step cards slam in over a tilted reach ticker.
- **100%:** a scroll push into the extruded "0" floods the screen pink.
- **Before → After:** a draggable split for #TeamWater, the Ghana Initiative and Beast Pantry (top/bottom on phones).
- **Explore our work:** the live site's own 60 project pins on Natural Earth land; click a pin for its film.
- **The squad:** partners as trading cards that flip to their real role.
- **Up next:** the real films as a feed; click plays the YouTube embed in a modal.
- **Questions:** the FAQ as a comment thread.
- **You did this:** pick an amount, smash the button, confetti, then the real donation page.

## Pages

The full sitemap of beastphilanthropy.org (sitemap.xml, 2026-10-30), nothing added and nothing left out:

| Route | What's on it |
|---|---|
| `/` | Home (above) |
| `/our-work` | The model as a chain, three ways one mission, Beast Pantry odometers, the three selection criteria |
| `/our-work/team-water` | $40M+ odometer, campaign stats, why it matters, five system types, campaign journey timeline, 10 projects with status filter, partners, 9-question FAQ thread |
| `/our-work/beast-pantry` | Three odometers, the story, six-step journey with films, distribution photo strip |
| `/our-work/ghana-child-labor` | Programme stats, why it matters, two-pillar model, five-year journey, 11 communities with day-one vs year-one tables |
| `/our-work/team-seas` | 34,080,191 lbs odometer, the campaign, two partners, socials |
| `/our-work/team-trees` | 25,149,427+ odometer, 57 planting projects by continent with full stories, Arbor Day Foundation |
| `/who-we-are` | Mission and six films, reach, founder, how work is chosen and tracked, the cycle, the pin map |
| `/impact` | By the numbers, eight stories with full text, 2025 annual report, seals |
| `/media` | Video library: most recent, all 153 videos filterable by topic with load more |
| `/news` | Recent updates, 12 press articles, 4 podcasts, press contact |
| `/our-partners` | Fueling, field, strategic and educational partners with their logos |
| `/donate` | Amount and frequency picker (hands off to the live Donorbox form), other ways to give, donation FAQ, financial trust |
| `/faq` | The four FAQ categories as comment threads |
| `/financial-reports` | Form 990 and audit PDFs, 2025 annual report, board letter |
| `/ghana-education-fund` | The fund, its FAQ, two student stories, the Ghana pin, community photos |
| `/privacy-policy`, `/cookie-policy`, `/disclosure-statement` | The legal text exactly as published |

## Map

"Explore our work" uses the live site's own data: the same 60 project pins (title, country, YouTube video, coordinates) that beastphilanthropy.org loads into its map, drawn on Natural Earth land. Pins closer together than a pin's width merge into one spot with "Project n / total" paging, so every project stays clickable (39 spots). `npm run geo` rebuilds it from `src/data/site/pins.json`.

## Run it

```bash
npm install
npm run dev
npm run build
```

## Content

Every figure, quote and title is in `src/lib/content.ts` (home) and `src/data/site/*.json` (sub pages, extracted from each live page's own data and read through `src/lib/site.ts`), taken from the live site on 2026-10-30. Photos, logos, seals and thumbnails in `public/media/` belong to Beast Philanthropy and are used only to present this concept. The "after" photos in Before → After illustrate each campaign; swap in program-specific photos before launch.

Design contract: `docs/design-dna.md`.

---

Created by [Fardin Omor Afnan](https://fardin.website).
