# Beast Philanthropy v2 Design DNA

The binding visual contract for v2 of the Beast Philanthropy redesign concept. v1 (`../beast-philanthropy`) told the story through YouTube's interface in a calm, editorial register. The client's feedback on v1: "need more MrBeast style UI and animations." v2 keeps v1's content, map data and verified-numbers rule, and changes the register to the one the audience already knows from MrBeast's videos and thumbnails.

## What "MrBeast style" means here

These are taken from the real thumbnails in `public/media/yt-*.jpg` (made by his team), not from a mood:

| Thumbnail device | Where it is in the thumbnails | v2 use |
|---|---|---|
| Huge white or yellow words with a thick black outline and a hard drop | "BEFORE / AFTER", "SURGERY #987" | Display type: Rubik 900, uppercase, ink stroke, an ink extrusion whose direction follows the pointer |
| BEFORE → AFTER split | `yt-O6wTcrhkw4o`, `yt-Z4hVGCWH1Kc` | A draggable before/after slider for three campaigns |
| Enormous exact numbers | "2,000,000 People…", "1,000 People…" | Odometer counters that roll to the exact published figures |
| Saturated flat colour, no gradients | every thumbnail | Pink, cyan, yellow and ink on white, flat |
| Energy cuts: stamps, slams, shakes | the edit style of the videos | Spring "slam" reveals, a short stage shake when a number lands, confetti on donate |

## Territory

**C. Pink broadcast** from v1's table, now selected. It was rejected in v1 for undermining "verified, documented impact". v2 answers that objection with the content rule: every loud element carries a real, sourced number or quote, and every counter lands with a VERIFIED stamp linked to the watchdogs.

## Evidence binding

| Decision | Input it rests on | Source |
|---|---|---|
| Louder, MrBeast-native register | Client feedback on v1, 2026-10-30: "need more mr beast style UI and animations" | conversation |
| Outlined, extruded display type | Real thumbnail lettering | `public/media/yt-O6wTcrhkw4o.jpg`, `yt-wfHLbzPKPJc.jpg` |
| Before/after slider | BEFORE/AFTER thumbnails | `public/media/yt-Z4hVGCWH1Kc.jpg`, `yt-O6wTcrhkw4o.jpg` |
| Exact-number odometers | Exact figures on campaign pages (48,434,790+ meals; 34,080,191 lbs) | /our-work/beast-pantry, /our-work/team-seas |
| Rubik | Live site's font (`--font-rubik`) | home.html CSS |
| Pink + cyan | Live CSS colour counts | home.html |
| Fullscreen and glyph dives | Memory `block-dive-transitions` | user memory |
| Comment-thread FAQ | Six answers on the live FAQ; memory `no-section-folios-or-accordion-faq` | beastphilanthropy.org/faq |
| Real map | Countries named on /our-work/team-water and /our-work/ghana-child-labor; memory `real-subjects-not-illustrations` | live campaign pages |

## Category default analysis

Category: nonprofit marketing site, creator-led. Its five most common strategies:

1. Full-bleed emotional photo hero with "Donate now". **Not used.** The hero is a wall of the charity's own films with the newest one "now playing".
2. Animated stat-counter strip. **Reframed.** Odometers roll to exact, sourced figures inside game-show panels and are stamped VERIFIED.
3. Programs card grid. **Not used.** Campaigns are argued through a before/after slider.
4. Partner logo wall. **Not used.** Partners are trading cards with their real role on the back.
5. Accordion FAQ and donate band. **Not used.** A comment thread, and a single press-down donate button.

## Colour

| Token | Value | Use |
|---|---|---|
| paper | `#FFFFFF` | ground |
| ink | `#111114` | type, outlines, extrusions, hard shadows |
| pink | `#EE357D` | brand; donate, stamps, stages |
| pink-btn | `#D6286C` | buttons with white labels (4.8:1) |
| cyan | `#00BCE7` | #TeamWater, #TeamSeas, secondary stage |
| yellow | `#FFD23F` | thumbnail-yellow words and money moments only |
| leaf | `#22B060` | #TeamTrees only |

## Type

Rubik 800–900 (the live site's own font) for display, uppercase, tracking -0.01em, line-height 0.88. Inter Tight for body copy. Numbers tabular.

## Surfaces

Chunky cards: 3px ink outline, 22px radius, hard 6–10px ink offset shadow. Inset stages (10px, 34px radius) in flat colour: white hero → photo fullscreen → white scoreboard → yellow challenge → white 100% → pink before/after → white map → cyan squad → ink feed → white questions → pink donate → paper footer.

## Motion

| Scene | Mechanic | Trigger |
|---|---|---|
| Hero | Three rows of the real video thumbnails drift as a tilted wall; the wall tilts toward the pointer and the headline's ink extrusion swings away from it | time, pointer |
| Hero → Fullscreen | The "now playing" thumbnail untilts and grows until it covers the screen, crossfades from thumbnail to footage, and three lines stamp in one after another | scroll (pinned) |
| Scoreboard | Odometer digits roll to the exact figures, then a VERIFIED stamp slams on and the panel shakes once | in view |
| Challenge | Three step cards slam in, each landing on its own tilt; the reach ticker runs on a tilted band | in view, time |
| 100% → pink | The camera pushes into the stroke of the extruded "0" until pink fills the screen | scroll (pinned) |
| Before / After | Drag the split; it demonstrates itself once on entry | in view, input |
| Map | v1's real map, chunky pins | input |
| Squad | Partner trading cards deal in, flip on hover or tap | in view, input |
| Feed | Cards lift and tilt on hover, a preview bar runs, click opens the real embed in a modal | input |
| Questions | v1's comment thread, chunky | input |
| Donate | A giant 3D button that presses down and fires confetti before handing off to the real donate page | input |
| Footer | A marquee of the slogan | time |

Reduced motion: no smooth scroll, no pins, no shakes, no confetti, no marquees; counters show final values.

## Sub pages

All 18 sub pages from the live sitemap share one kit (`src/components/kit.tsx`): a page hero that stacks the title, puts the lede and actions in one row and hangs the page's own photo below as a wide tilted thumbnail (never a split hero), thumbnail-type section heads, slam-in chunky cards, a thick-spine status timeline, odometer stat panels, and the comment-thread FAQ. Hero photos were chosen from each page's own images, skipping banners with baked-in white fades.

The map was rebuilt on the live site's own 60 project pins (it had shown campaign countries in the first v2), clustered so overlapping pins stay clickable.

## Rules

- No invented numbers; every figure lives in `src/lib/content.ts` with its source page.
- Photos in the before/after "after" panels illustrate the campaign; swap in program-specific photos before launch.
- No section kickers or folios; the FAQ is not an accordion; no header progress bar.
- Footer carries "Created by Fardin Omor Afnan" and the redesign-concept disclaimer.
