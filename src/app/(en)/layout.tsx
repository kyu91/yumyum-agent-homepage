import type { Metadata } from "next";
import { Bricolage_Grotesque, Noto_Sans_KR } from "next/font/google";
import { copy } from "@/content/copy";
import "../globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: copy.en.meta.title,
  description: copy.en.meta.description,
  openGraph: { title: copy.en.meta.title, description: copy.en.meta.ogDescription, type: "website" },
};

export default function EnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-paper font-body text-ink antialiased">{children}</body>
    </html>
  );
}
