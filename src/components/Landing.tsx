import { existsSync } from "node:fs";
import path from "node:path";
import { copy, type Locale } from "@/content/copy";
import { getLatestRelease } from "@/lib/release";
import FeedScene from "@/components/FeedScene";
import HeroVideo from "@/components/HeroVideo";
import AgentPetIcon from "@/components/AgentPetIcon";

const agents = [{ name: "Hermes" }, { name: "OpenCode" }, { name: "Codex" }, { name: "Claude Code" }] as const;

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

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 4h6v6" />
      <path d="M12 4 4 12" />
    </svg>
  );
}

/** A short display line rendered twice, offset and blended, to read as a misregistered riso
 *  overprint: where the two plates cross, the blend darkens (or lightens, on ink grounds)
 *  instead of one flat color merely casting an offset shadow of the other. */
function Overprint({ children, className = "", dark = false }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  const blend = dark ? "mix-blend-screen" : "mix-blend-multiply";
  return (
    <span className={`relative isolate ${className}`}>
      <span aria-hidden="true" className={`absolute inset-0 block translate-x-[-0.09em] translate-y-[0.07em] text-orange ${blend}`}>
        {children}
      </span>
      <span className={`relative block text-blue ${blend}`}>{children}</span>
    </span>
  );
}

function Folio({ n, dark = false }: { n: string; dark?: boolean }) {
  return (
    <span className={`pointer-events-none absolute bottom-4 right-5 text-[11px] font-bold tabular-nums lg:bottom-6 lg:right-8 ${dark ? "text-paper/80" : "text-ink/65"}`}>
      p.{n}
    </span>
  );
}

function StampTicket({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`stamp-ticket inline-flex -rotate-1 items-center gap-3 px-6 py-3 text-[14px] font-bold transition-transform hover:rotate-0 hover:-translate-y-0.5 ${
        dark ? "text-paper" : "text-ink"
      }`}
    >
      {children}
      <ExternalLinkIcon className="h-3.5 w-3.5" />
    </a>
  );
}

export default async function Landing({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const release = await getLatestRelease();

  // Bricolage Grotesque (English display) has real bold weights to reach for; Black Han
  // Sans (Korean display) ships one weight that is already visually heavy, so asking the
  // browser for 900 there would only synthesize a fake bold.
  const headingWeight = locale === "ko" ? "font-normal" : "font-extrabold";
  const heroSize = locale === "ko" ? "text-[clamp(2.4rem,15vw,9rem)]" : "text-[clamp(1.9rem,8vw,4.4rem)]";
  const sectionHeadingSize = "text-[clamp(2.2rem,7vw,4.8rem)]";

  const introClip = {
    src: `/videos/intro-${locale}.mp4`,
    ready: existsSync(path.join(process.cwd(), "public", "videos", `intro-${locale}.mp4`)),
  };

  function Nav() {
    return (
      <nav className="sticky top-0 z-50 border-b border-ink/15 bg-paper" aria-label={t.nav.ariaLabel}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <a className="font-display text-[18px] font-normal tracking-[-0.02em] text-ink" href="#top">
            YumYum <span className="text-orange">Agent</span>
            <span className="ml-3 hidden text-[11px] font-body font-bold uppercase tracking-[0.14em] text-muted sm:inline">{t.cover.tag}</span>
          </a>
          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-6 text-[13px] font-bold text-muted lg:flex">
              <a className="underline-offset-4 transition-colors hover:text-ink hover:underline" href="#how-it-works">
                {t.nav.howItWorks}
              </a>
              <a className="underline-offset-4 transition-colors hover:text-ink hover:underline" href="#agents">
                {t.nav.agents}
              </a>
              <a className="underline-offset-4 transition-colors hover:text-ink hover:underline" href="#privacy">
                {t.nav.privacy}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <a
                className="inline-flex h-8 w-8 items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
                href="https://github.com/kyu91/yumyum-agent"
                target="_blank"
                rel="noreferrer"
                aria-label={t.nav.githubLabel}
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                className="inline-flex h-8 w-8 items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
                href={release.url}
                target="_blank"
                rel="noreferrer"
                aria-label={t.nav.downloadLabel}
              >
                <DownloadIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-bold" aria-label={t.nav.langAriaLabel}>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/" hrefLang="ko" aria-current={locale === "ko" ? "page" : undefined} className={locale === "ko" ? "text-ink underline underline-offset-4" : "text-muted transition-colors hover:text-ink"}>
                KO
              </a>
              <span className="text-ink/30" aria-hidden="true">
                /
              </span>
              <a href="/en" hrefLang="en" aria-current={locale === "en" ? "page" : undefined} className={locale === "en" ? "text-ink underline underline-offset-4" : "text-muted transition-colors hover:text-ink"}>
                EN
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  function Cover() {
    return (
      <section className="relative overflow-hidden border-b border-ink/15 bg-paper" id="top">
        <div
          className="halftone-orange pointer-events-none absolute inset-x-0 top-0 h-[60vh] opacity-70 [mask-image:linear-gradient(to_bottom,black,black_70%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,black_70%,transparent)]"
          aria-hidden="true"
        />

        {/* Mobile order: headline, then the feed scene, then subtitle and CTA — so the
            interaction sits right under the headline instead of after a wall of copy.
            Desktop: two columns, headline/subtitle/CTA stacked left, scene filling the right. */}
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-5 pb-20 pt-12 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-x-16 lg:gap-y-10 lg:px-8 lg:pb-28 lg:pt-20">
          <h1 className={`font-display ${headingWeight} ${heroSize} leading-[0.94] tracking-[-0.02em] lg:col-start-1 lg:row-start-1`}>
            <Overprint>{t.cover.titleTop}</Overprint>
            <Overprint className="mt-1">{t.cover.titleAccent}</Overprint>
          </h1>

          {/* min-w-0: a grid item's automatic minimum size defaults to its content's
              min-content, which lets this column refuse to shrink below the scene's preferred
              width and push the track past the container edge. Overriding it lets the pet
              slip's own max-width (below) be the thing that actually gives way. */}
          <FeedScene copy={t.feed} className="lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:min-w-0" />

          <p className="max-w-sm text-[16px] leading-7 text-ink sm:text-[17px] lg:col-start-1 lg:row-start-2">{t.cover.subtitle}</p>

          <div className="flex flex-wrap items-center gap-4 lg:col-start-1 lg:row-start-3">
            <StampTicket href={release.url}>{t.cover.cta}</StampTicket>
            {release.version ? (
              <span className="text-[12px] font-bold text-blue">
                {release.version} · {t.cover.ctaSigned}
              </span>
            ) : null}
          </div>
        </div>

        <Folio n="01" />
      </section>
    );
  }

  function Watch() {
    return (
      <section className="relative border-b border-ink/15 bg-paper" id="watch">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
          <h2 className={`font-display ${headingWeight} ${sectionHeadingSize} leading-[0.95]`}>
            <Overprint>{t.video.heading}</Overprint>
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-7 text-ink">{t.video.lead}</p>

          <div className="mt-12 aspect-[728/540] w-full max-w-3xl rotate-1 border-2 border-ink lg:mr-0 lg:ml-auto lg:max-w-[46rem]">
            {introClip.ready ? (
              <HeroVideo src={introClip.src} openLabel={t.video.openLabel} closeLabel={t.video.closeLabel} />
            ) : (
              <div className="flex h-full items-center justify-center bg-paper">
                <span className="text-[13px] font-bold text-muted">{t.video.placeholder}</span>
              </div>
            )}
          </div>
        </div>
        <Folio n="02" />
      </section>
    );
  }

  function HowItWorks() {
    return (
      <section className="relative border-b border-ink/15 bg-paper" id="how-it-works">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="max-w-xl">
            <h2 className={`font-display ${headingWeight} ${sectionHeadingSize} leading-[0.95]`}>
              <Overprint>{t.howItWorks.heading}</Overprint>
            </h2>
            <p className="mt-6 text-[16px] leading-7 text-ink">{t.howItWorks.lead}</p>
          </div>

          {/* Four parallel input methods, not a sequence — no 01-04 numerals implying order. */}
          <ul className="mt-14 divide-y divide-ink/15 border-t border-ink/15">
            {t.howItWorks.steps.map((step) => (
              <li key={step.title} className="flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ink sm:mt-2" aria-hidden="true" />
                <div>
                  <h3 className="text-[19px] font-bold tracking-[-0.01em] text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-2xl text-[14px] leading-6 text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-2 border-t border-ink/15 pt-6 text-[12px] leading-6 text-muted sm:flex-row sm:gap-10">
            {t.howItWorks.notes.map((note) => (
              <p key={note.label}>
                <b className="text-ink">{note.label}.</b> {note.text}
              </p>
            ))}
          </div>
        </div>
        <Folio n="03" />
      </section>
    );
  }

  function Agents() {
    return (
      <section className="halftone-blue relative border-b border-ink/15 bg-overprint text-paper" id="agents">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className={`font-display ${headingWeight} ${sectionHeadingSize} leading-[0.95] text-orange`}>{t.agents.heading}</h2>
            <p className="max-w-sm text-[14px] leading-6 text-paper/70">{t.agents.lead}</p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-paper/20 py-10 sm:grid-cols-4">
            {agents.map((agent) => (
              <div className="flex flex-col items-center gap-3" key={agent.name}>
                <AgentPetIcon agent={agent.name} className="aspect-square w-20" />
                <span className="text-[14px] font-bold tracking-[-0.01em]">{agent.name}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-[12px] leading-6 text-paper/70">{t.agents.disclaimer}</p>
        </div>
        <Folio n="04" dark />
      </section>
    );
  }

  function Privacy() {
    return (
      <section className="relative border-b border-ink/15 bg-paper" id="privacy">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <h2 className={`font-display ${headingWeight} ${sectionHeadingSize} leading-[0.95]`}>
                <Overprint>{t.privacy.heading}</Overprint>
              </h2>
              <p className="mt-6 max-w-sm text-[16px] leading-7 text-ink">{t.privacy.lead}</p>
            </div>

            <dl className="divide-y divide-ink/15 border-t border-ink/15">
              {t.privacy.cards.map((card) => (
                <div key={card.title} className="py-6">
                  <dt className="text-[17px] font-bold text-ink">{card.title}</dt>
                  <dd className="mt-2 text-[14px] leading-6 text-muted">{card.description}</dd>
                </div>
              ))}
              <div className="py-6">
                <dt className="text-[17px] font-bold text-ink">{t.privacy.soul.title}</dt>
                <dd className="mt-2 text-[14px] leading-6 text-muted">
                  {t.privacy.soul.before}
                  <code className="break-all text-[12px] text-blue">~/Library/Application Support/YumYum/SOUL.md</code>
                  {t.privacy.soul.after}
                </dd>
              </div>
            </dl>
          </div>

          <p className="mt-12 max-w-3xl text-[15px] leading-7 text-ink">
            <b className="text-blue">{t.privacy.bannerStrong}</b>
            {t.privacy.bannerRest}
          </p>
        </div>
        <Folio n="05" />
      </section>
    );
  }

  function Install() {
    return (
      <section className="relative border-b border-ink/15 bg-paper" id="install">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
          <h2 className={`font-display ${headingWeight} ${sectionHeadingSize} leading-[0.95]`}>
            <Overprint>{t.install.heading}</Overprint>
          </h2>

          <ol className="mt-10 max-w-xl divide-y divide-ink/15 border-t border-ink/15">
            {t.install.steps.map((step, i) => (
              <li key={step} className="flex items-baseline gap-5 py-5">
                <span className="font-display text-[15px] font-normal text-blue">0{i + 1}</span>
                <p className="text-[15px] leading-6 text-ink">{step.replace(/^\d+\.\s*/, "")}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 max-w-xl border-t border-ink/15 pt-5 text-[12px] leading-6 text-muted">{t.install.releaseVerification}</p>

          <p className="mt-6 max-w-xl text-[12px] font-bold text-muted">
            {t.install.requirements} · {t.install.windowsNote} · {t.install.license}
          </p>
        </div>
        <Folio n="06" />
      </section>
    );
  }

  function Footer() {
    return (
      <footer className="halftone-blue relative bg-overprint text-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
          <h2 className="font-display text-[clamp(2.2rem,9vw,5.5rem)] font-normal leading-[0.95]">
            <Overprint dark>{t.footer.heading}</Overprint>
          </h2>

          <div className="mt-8">
            <StampTicket href={release.url} dark>
              {t.footer.cta}
            </StampTicket>
          </div>

          <div className="mt-16 flex flex-col justify-between gap-6 border-t border-paper/20 pt-8 sm:flex-row sm:items-start">
            <div>
              <p className="font-display text-[17px] font-normal text-paper">
                YumYum <span className="text-orange">Agent</span>
              </p>
              <p className="mt-2 text-[13px] text-paper/70">{t.footer.tagline}</p>
              <p className="mt-2 max-w-sm text-[11px] leading-5 text-paper/70">
                {t.footer.attribution}{" "}
                <a
                  className="inline-flex items-center gap-1 text-paper/80 underline underline-offset-4 transition-colors hover:text-paper"
                  href="/images/AGENT-ICONS-SOURCES.md"
                >
                  {t.footer.attributionLink}
                  <ExternalLinkIcon className="h-3 w-3" />
                </a>
              </p>
            </div>
            <div className="flex gap-5 text-[13px] font-bold">
              <a
                className="inline-flex items-center gap-1 transition-colors hover:text-orange"
                href="https://github.com/kyu91/yumyum-agent"
                target="_blank"
                rel="noreferrer"
              >
                Repository <ExternalLinkIcon className="h-3 w-3" />
              </a>
              <a
                className="inline-flex items-center gap-1 transition-colors hover:text-orange"
                href="https://github.com/kyu91/yumyum-agent/releases"
                target="_blank"
                rel="noreferrer"
              >
                Releases <ExternalLinkIcon className="h-3 w-3" />
              </a>
              <a
                className="inline-flex items-center gap-1 transition-colors hover:text-orange"
                href="https://haas.kr/posts/yumyum-agent-open-source-launch"
                target="_blank"
                rel="noreferrer"
              >
                {t.footer.blogLabel} <ExternalLinkIcon className="h-3 w-3" />
              </a>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-[11px] leading-5 text-paper/70">{t.footer.disclaimer}</p>
        </div>
        <Folio n="07" dark />
      </footer>
    );
  }

  return (
    <main>
      {Nav()}
      {Cover()}
      {Watch()}
      {HowItWorks()}
      {Agents()}
      {Privacy()}
      {Install()}
      {Footer()}
    </main>
  );
}
