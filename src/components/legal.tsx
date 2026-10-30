import type { Block } from "@/lib/site";
import { PageHero, Stage } from "./kit";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Legal copy exactly as published (including its own table of contents), grouped into lists. */
export function LegalPage({ blocks, eyebrow }: { blocks: Block[]; eyebrow: string }) {
  const [h1, ...rest] = blocks;
  const out: React.ReactNode[] = [];
  for (let i = 0; i < rest.length; i++) {
    const b = rest[i];
    if (b.t === "li") {
      const items: string[] = [];
      while (i < rest.length && rest[i].t === "li") items.push(rest[i++].x);
      i--;
      out.push(
        <ul key={i}>
          {items.map((x, k) => (
            <li key={k}>{x}</li>
          ))}
        </ul>,
      );
    } else if (b.t === "h2") out.push(<h2 key={i} id={slug(b.x)}>{b.x}</h2>);
    else if (b.t === "h3") out.push(<h3 key={i} id={slug(b.x)}>{b.x}</h3>);
    else out.push(<p key={i}>{b.x}</p>);
  }
  return (
    <main>
      <PageHero eyebrow={eyebrow} tone="paper" title={h1.x} />
      <Stage tone="mist" label={h1.x}>
        <div className="legal">
          {out}
        </div>
      </Stage>
    </main>
  );
}
