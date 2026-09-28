import type { Metadata } from "next";
import { Black_Han_Sans, Noto_Sans_KR } from "next/font/google";
import { copy } from "@/content/copy";
import "../globals.css";

const display = Black_Han_Sans({
  subsets: ["latin"],
  weight: "400",
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
  title: copy.ko.meta.title,
  description: copy.ko.meta.description,
  openGraph: { title: copy.ko.meta.title, description: copy.ko.meta.ogDescription, type: "website" },
};

export default function KoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${display.variable} ${body.variable}`}>
      {/* keep-all: Hangul word-break defaults to breaking mid-word at the viewport edge;
          keep-all breaks only at spaces. The SOUL.md path overrides this locally with break-all. */}
      <body className="break-keep bg-paper font-body text-ink antialiased">{children}</body>
    </html>
  );
}
