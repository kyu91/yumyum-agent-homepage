import type { Metadata } from "next";
import { copy } from "@/content/copy";
import "../globals.css";

export const metadata: Metadata = {
  title: copy.ko.meta.title,
  description: copy.ko.meta.description,
  openGraph: { title: copy.ko.meta.title, description: copy.ko.meta.ogDescription, type: "website" },
};

export default function KoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body className="antialiased">{children}</body></html>;
}
