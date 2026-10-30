/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Btn, Head, PageHero, Stage } from "@/components/kit";
import { VideoGrid } from "@/components/feed";
import { MediaLibrary } from "@/components/widgets";
import { ytThumb } from "@/lib/yt";
import { SOCIALS } from "@/lib/content";
import { MEDIA } from "@/lib/site";

export const metadata: Metadata = { title: "Media & Stories | Beast Philanthropy" };

export default function Media() {
  const byId = new Map(MEDIA.all.map((v) => [v.youtubeId, v]));
  const recent = MEDIA.recent.map((id) => byId.get(id) ?? { youtubeId: id, title: "" }).filter((v) => v.title);
  const reel = MEDIA.all.slice(0, 14);
  return (
    <main>
      <PageHero
        eyebrow="Beast Philanthropy on YouTube"
        tone="ink"
        title={
          <>
            Video <span className="hl">library</span>
          </>
        }
        lede={<p>Every project. Every campaign. Documented on YouTube.</p>}
        actions={<Btn href={SOCIALS[0].href}>Visit our YouTube channel</Btn>}
      >
        <div className="strip-wrap" aria-hidden>
          <div className="strip strip--thumbs" style={{ animationDuration: "70s" }}>
            {[...reel, ...reel].map((v, i) => (
              <img key={i} src={ytThumb(v.youtubeId)} alt="" loading="lazy" />
            ))}
          </div>
        </div>
      </PageHero>

      <Stage tone="paper" label="Most recent">
        <Head title="Start here: most recent" />
        <VideoGrid lead videos={recent.map((v) => ({ id: v.youtubeId, title: v.title }))} />
      </Stage>

      <Stage tone="cyan" label="All videos">
        <Head title="All videos" lede="Newest first. Filter by what the project was about." />
        <MediaLibrary videos={MEDIA.all} />
      </Stage>

      <Stage tone="yellow" label="Subscribe">
        <Head
          title="Watch more on YouTube"
          lede={
            <>
              <p>Every Beast Philanthropy video funds a real-world project.</p>
              <p>Subscribe to the channel to follow the work as it happens.</p>
            </>
          }
        />
        <Btn href={SOCIALS[0].href}>Visit our YouTube channel</Btn>
      </Stage>
    </main>
  );
}
