import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { LEGAL } from "@/lib/site";

export const metadata: Metadata = { title: "Disclosure Statement · Beast Philanthropy" };

export default function Page() {
  return <LegalPage blocks={LEGAL.disclosure} eyebrow="Legal" />;
}
