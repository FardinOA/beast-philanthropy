"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DONATE, NAV } from "@/lib/content";
import { Heart } from "./icons";

/** Full-width bar. Steps out of the way while you scroll down, comes back on the way up. */
export function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 8);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav ${solid ? "is-solid" : ""} ${hidden && !open ? "is-hidden" : ""} ${open ? "is-open" : ""}`}>
      <Link href="/" className="nav__logo" aria-label="Beast Philanthropy home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/logo.webp" alt="" width={900} height={208} />
      </Link>
      <nav className="nav__links" aria-label="Main">
        {NAV.map((l) => (
          <a key={l.label} href={l.href} className={path.startsWith(l.href) ? "is-on" : ""} aria-current={path.startsWith(l.href) ? "page" : undefined}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="nav__end">
        <span className="nav__seal">501(c)(3) nonprofit</span>
        <a className="btn3d btn3d--pink btn3d--sm" href={DONATE}>
          <span>
            <Heart className="ico ico--beat" />
            Donate
          </span>
        </a>
        <button className="nav__menu" aria-expanded={open} aria-controls="nav-sheet" onClick={() => setOpen((o) => !o)}>
          <span className="sr">{open ? "Close menu" : "Open menu"}</span>
          <i />
          <i />
        </button>
      </div>
      <div className="nav__sheet" id="nav-sheet" hidden={!open}>
        {NAV.map((l) => (
          <a key={l.label} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
