import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { copy, type Locale } from "@/content/copy";
import { getLatestRelease } from "@/lib/release";
import PetFeedDemo, { type PetFeedVariant } from "@/components/pet-demo/PetFeedDemo";
import HeroVideo from "@/components/HeroVideo";
import AgentPetIcon from "@/components/AgentPetIcon";

const steps = [
  { number: "01", label: "RIGHT CLICK", tone: "bg-peach" },
  { number: "02", label: "OPTION + S", tone: "bg-butter" },
  { number: "03", label: "DRAG & DROP", tone: "bg-mint" },
  { number: "04", label: "NATIVE CHAT", tone: "bg-coral" },
] as const;

const agents = [{ name: "Hermes" }, { name: "OpenCode" }, { name: "Codex" }, { name: "Claude Code" }] as const;

const clips = (["clipboard", "file-drop", "ask"] as const satisfies readonly PetFeedVariant[]).map((name) => ({
  name,
  src: `/videos/${name}.mp4`,
  ready: existsSync(path.join(process.cwd(), "public", "videos", `${name}.mp4`)),
}));

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

export default async function Landing({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const release = await getLatestRelease();

  // Negative tracking this tight only reads well on Hangul syllable blocks — Latin
  // letterforms at the same value visually collide, so translated headings get a
  // much lighter value in English.
  const trackXl = locale === "ko" ? "tracking-[-0.085em]" : "tracking-[-0.02em]";
  const trackLg = locale === "ko" ? "tracking-[-0.06em]" : "tracking-[-0.015em]";
  const trackMd = locale === "ko" ? "tracking-[-0.04em]" : "tracking-[-0.01em]";
  const trackSm = locale === "ko" ? "tracking-[-0.03em]" : "tracking-[-0.01em]";
  // Latin ascent/descent in this font stack is taller than Hangul's, so leading-tight
  // (1.25) reads looser in English than Korean at the same value — pull it in to match.
  const heroLeading = locale === "ko" ? "leading-tight" : "leading-[1.02]";

  function withEasedPunct(text: string) {
    const match = text.match(/^(.+)([,.])$/);
    if (!match) return text;
    const ease = locale === "ko" ? "ml-[0.085em]" : "ml-[0.02em]";
    return (
      <>
        {match[1]}
        <span className={ease}>{match[2]}</span>
      </>
    );
  }

  function InstallNote() {
    return (
      <div className="mt-5 border-l-2 border-orange/50 pl-4 text-[12px] leading-6 text-muted">
        <p>{t.hero.install[0]}</p>
        <p>{t.hero.install[1]}</p>
        <p>{t.hero.install[2]}</p>
      </div>
    );
  }

  function Nav() {
    return (
      <nav className="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80" aria-label={t.nav.ariaLabel}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <a className="text-[17px] font-black tracking-[-0.04em] text-brown" href="#top">
            YumYum <span className="text-orange">Agent</span>
          </a>
          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-7 text-[13px] font-semibold text-muted sm:flex">
              <a className="transition-colors hover:text-brown" href="#how-it-works">{t.nav.howItWorks}</a>
              <a className="transition-colors hover:text-brown" href="#agents">{t.nav.agents}</a>
              <a className="transition-colors hover:text-brown" href="#privacy">{t.nav.privacy}</a>
            </div>
            <div className="flex items-center gap-2">
              <a
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-brown transition-colors hover:bg-cream"
                href="https://github.com/kyu91/yumyum-agent"
                target="_blank"
                rel="noreferrer"
                aria-label={t.nav.githubLabel}
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-brown transition-colors hover:bg-cream"
                href={release.url}
                target="_blank"
                rel="noreferrer"
                aria-label={t.nav.downloadLabel}
              >
                <DownloadIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] font-bold" aria-label={t.nav.langAriaLabel}>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/" hrefLang="ko" aria-current={locale === "ko" ? "page" : undefined} className={locale === "ko" ? "text-brown" : "text-muted transition-colors hover:text-brown"}>KO</a>
              <span className="text-line" aria-hidden="true">/</span>
              <a href="/en" hrefLang="en" aria-current={locale === "en" ? "page" : undefined} className={locale === "en" ? "text-brown" : "text-muted transition-colors hover:text-brown"}>EN</a>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  function Hero() {
    const introClip = {
      src: `/videos/intro-${locale}.mp4`,
      ready: existsSync(path.join(process.cwd(), "public", "videos", `intro-${locale}.mp4`)),
    };

    return (
      <section className="relative overflow-hidden border-b border-line bg-cream" id="top">
        <div className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[470px] opacity-70" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-10 sm:pb-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8 lg:pt-16">
          <div>
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">macOS menu bar app</p>
            <h1 className={`max-w-md text-[clamp(2.6rem,5.2vw,4.6rem)] font-black text-brown ${heroLeading} ${trackXl}`}>
              {withEasedPunct(t.hero.titleTop)}
              <br />
              <span className="text-orange">{withEasedPunct(t.hero.titleAccent)}</span>
            </h1>
            <p className="mt-7 max-w-sm text-[16px] leading-7 tracking-[-0.02em] text-muted sm:text-[17px]">{t.hero.subtitle}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                className="inline-flex items-center gap-3 rounded-full bg-brown px-6 py-3.5 text-[14px] font-bold text-surface shadow-lg shadow-brown/15 transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-cream"
                href={release.url}
                target="_blank"
                rel="noreferrer"
              >
                {t.hero.cta}
                <span aria-hidden="true">↗</span>
              </a>
              {release.version ? <span className="rounded-full border border-line bg-surface px-3 py-2 text-[12px] font-bold text-orange">{release.version} {t.hero.versionSuffix}</span> : null}
            </div>
            {InstallNote()}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <p className="text-[12px] font-semibold tracking-[0.02em] text-muted">{t.hero.requirements}</p>
              <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-bold text-muted">{t.hero.windowsNote}</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none lg:justify-self-end">
            <div className="aspect-[728/540] overflow-hidden rounded-[1.75rem] border border-line bg-brown/5 shadow-2xl shadow-brown/10">
              {introClip.ready ? (
                <HeroVideo src={introClip.src} openLabel={t.hero.videoOpen} closeLabel={t.hero.videoClose} />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 bg-white/40">
                  <Image src="/images/yumyum-mascot.png" alt="" width={1024} height={1024} className="h-16 w-auto opacity-40" priority />
                  <span className="text-[12px] font-bold text-brown/50">{t.demo.placeholder}</span>
                </div>
              )}
            </div>
            <p className="mt-4 flex items-center gap-2 text-[12px] font-bold text-muted">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-coral" />
              {t.hero.localBadge}
            </p>
          </div>
        </div>
      </section>
    );
  }

  function HowItWorks() {
    return (
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32" id="how-it-works">
        <div className="max-w-2xl">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{t.howItWorks.eyebrow}</p>
          <h2 className={`text-4xl font-black leading-tight text-brown sm:text-5xl ${trackLg}`}>{t.howItWorks.titleTop}<br />{t.howItWorks.titleBottom}</h2>
          <p className="mt-5 text-[16px] leading-7 text-muted">{t.howItWorks.lead}</p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <article className="rounded-[1.5rem] border border-line bg-surface p-5" key={step.number}>
              <div className="flex items-start justify-between gap-4">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${step.tone} text-[12px] font-black text-brown`}>{step.number}</span>
                <span className="pt-2 text-right text-[9px] font-bold tracking-[0.12em] text-muted">{step.label}</span>
              </div>
              <h3 className={`mt-10 text-[19px] font-black text-brown ${trackMd}`}>{t.howItWorks.steps[i].title}</h3>
              <p className="mt-3 text-[14px] leading-6 text-muted">{t.howItWorks.steps[i].description}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-5 text-[12px] leading-6 text-muted sm:flex-row sm:items-center sm:justify-between">
          <span><b className="text-brown">{t.howItWorks.notes[0].label}</b> {t.howItWorks.notes[0].text}</span>
          <span><b className="text-brown">{t.howItWorks.notes[1].label}</b> {t.howItWorks.notes[1].text}</span>
        </div>
      </section>
    );
  }

  function Demo() {
    return (
      <section className="border-y border-line bg-paper" id="demo">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{t.demo.eyebrow}</p>
            <h2 className={`text-4xl font-black leading-tight text-brown sm:text-5xl ${trackLg}`}>{t.demo.titleTop}<br /><span className="text-orange">{t.demo.titleAccent}</span></h2>
            <p className="mt-5 text-[16px] leading-7 text-muted">{t.demo.lead}</p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {clips.map((clip, i) => (
              <article className="rounded-[1.5rem] border border-line bg-surface p-4" key={clip.src}>
                {clip.ready ? (
                  <video
                    className="aspect-video w-full rounded-[1.1rem] border border-line bg-cream object-contain"
                    src={clip.src}
                    controls
                    preload="metadata"
                    playsInline
                  />
                ) : (
                  <PetFeedDemo variant={clip.name} locale={locale} delaySeconds={i * -1.75} />
                )}
                <h3 className={`mt-5 text-[17px] font-black text-brown ${trackSm}`}>{t.demo.clips[i].title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-muted">{t.demo.clips[i].description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function Agents() {
    return (
      <section className="bg-brown text-surface" id="agents">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-peach">{t.agents.eyebrow}</p>
              <h2 className={`text-4xl font-black leading-tight sm:text-5xl ${trackLg}`}>{t.agents.titleTop}<br /><span className="text-peach">{t.agents.titleAccent}</span></h2>
            </div>
            <p className="max-w-sm text-[14px] leading-6 text-surface/65">{t.agents.lead}</p>
          </div>
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent) => (
              <article className="rounded-[1.35rem] border border-surface/15 bg-surface/[0.08] p-4" key={agent.name}>
                <AgentPetIcon agent={agent.name} className="mx-auto aspect-square w-2/3" />
                <h3 className="mt-4 text-center text-[16px] font-black tracking-[-0.03em]">{agent.name}</h3>
              </article>
            ))}
          </div>
          <p className="mt-8 text-[12px] leading-6 text-surface/55">{t.agents.disclaimer}</p>
        </div>
      </section>
    );
  }

  function Privacy() {
    return (
      <section className="border-b border-line bg-paper" id="privacy">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">{t.privacy.eyebrow}</p>
              <h2 className={`text-4xl font-black leading-tight text-brown sm:text-5xl ${trackLg}`}>{t.privacy.titleTop}<br />{t.privacy.titleBottom}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-[1.35rem] border border-line bg-surface p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">01 / no telemetry</p>
                <h3 className="mt-8 text-[17px] font-black text-brown">{t.privacy.cards[0].title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-muted">{t.privacy.cards[0].description}</p>
              </article>
              <article className="rounded-[1.35rem] border border-line bg-surface p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">02 / selected only</p>
                <h3 className="mt-8 text-[17px] font-black text-brown">{t.privacy.cards[1].title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-muted">{t.privacy.cards[1].description}</p>
              </article>
              <article className="rounded-[1.35rem] border border-line bg-surface p-5 sm:col-span-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">03 / soul.md</p>
                <h3 className="mt-8 text-[17px] font-black text-brown">{t.privacy.soul.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-muted">{t.privacy.soul.before}<code className="break-all text-[12px] text-brown">~/Library/Application Support/YumYum/SOUL.md</code>{t.privacy.soul.after}</p>
              </article>
            </div>
          </div>
          <div className="mt-12 rounded-[1.5rem] bg-brown px-6 py-5 text-[14px] leading-7 text-surface sm:px-8">
            <b className="text-peach">{t.privacy.bannerStrong}</b>{t.privacy.bannerRest}
          </div>
        </div>
      </section>
    );
  }

  function Footer() {
    return (
      <footer className="bg-ink text-surface/65">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div>
              <p className="text-[17px] font-black tracking-[-0.04em] text-surface">YumYum <span className="text-peach">Agent</span></p>
              <p className="mt-2 text-[13px]">{t.footer.tagline}</p>
              <p className="mt-2 text-[11px] leading-5">{t.footer.attribution} <a className="text-surface transition-colors hover:text-peach" href="/images/AGENT-ICONS-SOURCES.md">{t.footer.attributionLink}</a></p>
            </div>
            <div className="flex gap-5 text-[13px] font-semibold">
              <a className="transition-colors hover:text-surface" href="https://github.com/kyu91/yumyum-agent" target="_blank" rel="noreferrer">Repository ↗</a>
              <a className="transition-colors hover:text-surface" href="https://github.com/kyu91/yumyum-agent/releases" target="_blank" rel="noreferrer">Releases ↗</a>
            </div>
          </div>
          <div className="border-t border-surface/10 pt-5 text-[11px] leading-5 text-surface/40">{t.footer.disclaimer}</div>
        </div>
      </footer>
    );
  }

  return (
    <main>
      {Nav()}
      {Hero()}
      {HowItWorks()}
      {Demo()}
      {Agents()}
      {Privacy()}
      {Footer()}
    </main>
  );
}
