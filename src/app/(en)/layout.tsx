import type { Metadata } from "next";
import { copy } from "@/content/copy";
import "../globals.css";

export const metadata: Metadata = {
  title: copy.en.meta.title,
  description: copy.en.meta.description,
  openGraph: { title: copy.en.meta.title, description: copy.en.meta.ogDescription, type: "website" },
};

export default function EnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased">{children}</body></html>;
}
