import { BeforeAfter } from "@/components/before-after";
import { Challenge } from "@/components/challenge";
import { Donate } from "@/components/donate";
import { Feed } from "@/components/feed";
import { Hero } from "@/components/hero";
import { Hundred } from "@/components/hundred";
import { Questions } from "@/components/questions";
import { Scoreboard } from "@/components/scoreboard";
import { Squad } from "@/components/squad";
import { ExploreWork } from "@/components/pin-map";

export default function Home() {
  return (
    <>
      <a className="skip" href="#impact">
        Skip to content
      </a>
      <main>
        <Hero />
        <Scoreboard />
        <Challenge />
        <Hundred />
        <BeforeAfter />
        <ExploreWork />
        <Squad />
        <Feed />
        <Questions />
        <Donate />
      </main>
    </>
  );
}
