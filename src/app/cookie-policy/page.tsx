import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { LEGAL } from "@/lib/site";

export const metadata: Metadata = { title: "Cookie Policy · Beast Philanthropy" };

export default function Page() {
  return <LegalPage blocks={LEGAL.cookie} eyebrow="Legal" />;
}
