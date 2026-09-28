---
name: YumYum Agent
description: A thin riso-printed zine whose cover pet the visitor feeds.
colors:
  paper: "#ffffff"
  ink: "#1a1a1a"
  riso-orange: "#ff6c2f"
  riso-blue: "#0078bf"
  fluoro-pink: "#ff48b0"
  muted: "#38434a"
  overprint: "#003323"
typography:
  display-ko:
    fontFamily: "Black Han Sans, sans-serif"
    fontSize: "clamp(2.4rem, 15vw, 9rem)"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.02em"
  display-en:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(1.9rem, 8vw, 4.4rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Black Han Sans (ko) / Bricolage Grotesque (en), sans-serif"
    fontSize: "clamp(2.2rem, 7vw, 4.8rem)"
    lineHeight: 0.95
  wordmark:
    fontFamily: "Black Han Sans (ko) / Bricolage Grotesque (en), sans-serif"
    fontSize: "18px"
    fontWeight: 400
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    letterSpacing: "-0.01em"
  title-sm:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, sans-serif"
    fontSize: "17px"
    fontWeight: 700
  body:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "28px"
  body-md:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "24px"
  body-small:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "24px"
  caption:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "24px"
  label:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    fontFeature: "tnum"
  label-sm:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    fontFeature: "tnum"
  fine-print:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: "20px"
  label-xs:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, sans-serif"
    fontSize: "10px"
    fontWeight: 700
rounded:
  none: "0px"
spacing:
  gutter: "20px"
  gutter-lg: "32px"
  section: "80px"
  section-lg: "112px"
  container: "1152px"
components:
  stamp-ticket:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  stamp-ticket-dark:
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  icon-square:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "32px"
  icon-square-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  key-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
  reply-log:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px"
  ink-page:
    backgroundColor: "{colors.overprint}"
    textColor: "{colors.paper}"
    padding: "80px 20px"
---

# Design System: YumYum Agent

## Overview

**Creative North Star: "The Riso Zine"**

The site is one thin riso-printed zine: white offset stock, two inks printed at page scale, and a cover pet the reader feeds by hand. Everything is a printed or pasted thing: display lines are two misregistered plates, content arrives as scissor-cut clippings held by a staple, frames are 2px ink rules, and every page ends in a folio. Density is low; each section is one page with one idea, separated by a hairline rule, not a card.

Motion is print-like. Plates snap into register, a missed drop snaps back in 160ms, the pet chews on a short squash. Nothing floats or drifts. The only colour outside the two plates is fluorescent pink, and it means one thing: the feeding state is live.

### 고정 (브랜드·법률) — do not change on redesign

- Mascot image `public/images/yumyum-mascot.png` and app icon `src/app/icon.png`, used unaltered (tints and blends sit on top as separate layers).
- The four agent pet icons (`AgentPetIcon`, `public/images/agent-*.png`), geometry and headband colours copied 1:1 from the app. They are not re-inked into the zine palette.
- The non-endorsement disclaimer under the agent names and in the footer, plus the icon-source attribution link.
- Install copy shows only the normal launch steps. No Gatekeeper bypass copy, anywhere.
- Any reply shown in the feed demo is labelled as an example.
- Tailwind CSS v3 is pinned. Tokens live in `tailwind.config.ts` `theme.extend`; do not migrate to v4 `@theme`.

### 현재 선택 (바꿔도 됨) — the current world, replaceable in a renewal

- The riso-zine world itself: offset stock, orange and blue plates, overprint ground, halftone dot fields, clippings, staples, folios.
- The inks and fonts below, the stamp-ticket CTA, the square-cornered form language, and the page order.

**Key Characteristics:**
- Two riso plates (orange, blue) printed at page scale, overprinting to a dark multiply green.
- Misregistered overprint display type; Korean in Black Han Sans, English in Bricolage Grotesque.
- Square corners everywhere; 2px ink rules and 15%-ink hairlines instead of cards and shadows.
- Scissor-cut clippings with a staple, halftone dot fields, page folios.
- Fluorescent pink reserved for the active feeding state.
- Print-like motion: snap, register, chew; no floaty easing.

## Colors

Two riso plates on white stock, their overprint as the dark ground, and one fluorescent spot.

### Primary
- **Riso Orange** (riso-orange): the first plate. Offset layer of every overprint headline, the cover halftone field, the feed-scene ink line, the "Agent" half of the wordmark, flat headline on overprint pages, footer link hover.
- **Riso Blue** (riso-blue): the second plate. Top layer of every overprint headline, the ink-page halftone field, reply text in the demo log, install step numerals, the SOUL.md path, the signed-release line and trust statements.

### Tertiary
- **Fluoro Pink** (fluoro-pink): active state only. The pet slip's border and halftone tint while a clipping hovers over it or it chews, the square bullet on demo reply labels, `::selection`, and the global focus ring.

### Neutral
- **Offset Stock** (paper): every light page, clipping paper, the pet slip and reply log fill.
- **Press Black** (ink): body text, 2px frames, staples, the square list bullets, the scrollbar thumb. Hairlines are this ink at 15%.
- **Slate Gray** (muted): secondary descriptions, nav links, instruction line, notes and fine print.
- **Overprint Green** (overprint): the dark "second ink" page ground (Agents, footer). It is the per-channel multiply of the two plates, not a neutral near-black.

### Named Rules
**The Two Plates Rule.** Orange and blue are the only page-scale inks. A new accent is a new plate and a new world; ask first.
**The Pink Means Live Rule.** Fluorescent pink appears only for the active feeding/interactive state (plus selection and focus). Never as decoration or a section colour.
**The Overprint Ground Rule.** Dark pages use Overprint Green, never ink black or a gray, and carry the blue halftone field.

## Typography

**Display Font:** Black Han Sans (Korean pages), Bricolage Grotesque (English pages), both via `--font-display`
**Body Font:** Noto Sans KR 400/500/700 (with Apple SD Gothic Neo, sans-serif) via `--font-body`

**Character:** A heavy poster face printed in two plates against a plain, sturdy Hangul-first sans. Display is loud and short; everything else is quiet and bold-weighted, never light.

### Hierarchy
- **Display** (display-ko / display-en): the cover headline only, two short overprinted lines.
- **Headline** (headline): one per page, one to three words, overprinted on light pages; flat orange on overprint pages. Footer uses a larger clamp up to 5.5rem.
- **Wordmark** (wordmark): the nav wordmark in the display face; the footer repeats it at 17px.
- **Title** (title): list-item heads in How it works.
- **Title Small** (title-sm): privacy definition heads; the cover subtitle steps up to this size from `sm`.
- **Body** (body): leads and the cover subtitle, capped at roughly `max-w-sm` to `max-w-md`.
- **Body Medium** (body-md): install steps and their display-face numerals, and the privacy statement (28px leading there).
- **Body Small** (body-small): descriptions in `muted` (or 70% paper on overprint pages); stamp-ticket text and agent names take it bold.
- **Caption** (caption): demo reply prompt (bold) and reply text, the empty-log line, nav anchor links and footer links (bold), footer tagline.
- **Label** (label): 12px bold meta lines, the locale switch, the feed instruction, the signed-release line; also 12px regular notes with 24px leading.
- **Label Small** (label-sm): folios (`p.01`), desktop clipping captions, the Return key button, and the uppercase 0.14em-tracked "example" / draft labels in the reply log.
- **Fine Print** (fine-print): footer attribution and disclaimer, 70% paper.
- **Label XS** (label-xs): compact mobile clipping captions only. 10px is the floor; nothing else goes below 11px.

Tabular numerals are on site-wide (`font-variant-numeric: tabular-nums` on body).

### Named Rules
**The Honest Weight Rule.** Black Han Sans ships one weight; set it at 400 and never ask for bold. Bricolage takes 800.
**The Keep-All Rule.** Korean pages set `word-break: keep-all`; only file paths override with `break-all`.
**The Short Display Rule.** Overprint display is for a few words. Two stacked copies of a paragraph is not a headline.

## Layout

A single column of full-bleed "pages" inside a 1152px container with 20px gutters (32px from `lg`). Each page is 80px top and bottom (112px from `lg`), closes with a 15%-ink hairline, and carries a folio number bottom-right. Pages alternate between left-aligned heading + lead and a divided list or grid; the video frame sits offset right with a 1deg tilt. The cover is a two-column grid on desktop (headline, subtitle and stamp left; feed scene right, spanning three rows); on mobile the scene moves directly under the headline so the interaction is in the first screen. Lists use hairline dividers (`divide-y` at 15% ink) rather than boxes. The nav is sticky, paper-filled, hairline-bottomed.

**The One Page One Idea Rule.** A section is a zine page: one heading, one lead, one list or object, one folio.

## Elevation & Depth

Flat. No box shadows and no gradients on surfaces. Depth is printed: plates misregister, halftone dot fields sit behind content (cover orange field masked to fade at 70%), clippings and the pet slip are tilted and stapled on top of the page, and the pink active tint multiplies into the slip. Stacking is z-order only.

### Named Rules
**The Printed Depth Rule.** Depth comes from overprint, halftone and paste-up tilt, never from a shadow. An offset solid block behind an element is a hard shadow and is not allowed.

## Shapes

Square corners throughout (0px). Frames are 2px ink rules; dividers are 1px ink at 15% (paper at 20% on overprint pages). The only irregular silhouette is the scissor-cut clipping, drawn as an SVG polygon with a non-scaling 2.5px ink stroke. Objects pasted onto the page tilt a few degrees (clippings -6/+3/-2deg, pet slip -2deg, stamp -1deg, video frame +1deg). Staples are a 22x10px three-sided ink bracket at the top-left. Bullets are 6px ink squares.

## Components

### Stamp Ticket (primary CTA)
- **Character:** a dashed-edge ticket stamped slightly crooked.
- **Shape:** square, 2px dashed border in `currentColor`, rotated -1deg.
- **Default:** 14px bold ink text, 12px 24px padding, trailing external-link arrow. Dark variant uses paper text on overprint pages.
- **Hover:** straightens to 0deg and lifts 2px.

### Icon Squares (nav)
- 32px square, 2px ink border, ink glyph; hover inverts to ink fill with paper glyph. Used for GitHub and download.

### Key Button
- The demo's Return key: 2px ink border, paper fill, 11px bold, return glyph; hover inverts like icon squares.

### Navigation
- Sticky, paper background, hairline bottom. Wordmark in display face with "Agent" in orange. Anchor links 13px bold muted, underline on hover. Locale switch `KO / EN` 12px bold, current locale ink and underlined.

### Clipping (signature)
- Scissor-cut paper polygon, staple, small two-ink pictogram and a bold caption; 112px wide on desktop, 64px compact on mobile. Draggable and tappable; while dragged the original fades to 20% and a same-face clone follows the pointer; a miss snaps back in 160ms.

### Pet Slip (signature)
- The unaltered mascot on a stapled paper slip, 2px ink border, -2deg tilt, with a two-plate registration mark at its corner. Over-target: scale 1.05, pink border, pink halftone multiply. Feeding: 420ms chew squash with the registration mark snapping into register.

### Reply Log
- Square 2px ink frame, paper fill, 16px padding, newest-first scroll with hairline dividers. Each reply carries an uppercase 11px tracked label with a 6px pink square ("example" / draft), the prompt in bold ink and the reply in blue.

### Ink Line
- One continuous 3.5px round-capped orange stroke drawn from real element positions: clippings to the pet's rim to the reply log, routed around the instruction text.

### Folio
- `p.NN`, 11px bold tabular, bottom-right of every page, 65% ink (80% paper on dark).

### Video Frame
- 2px ink frame, +1deg tilt, 728/540 aspect; opens a native `<dialog>` with an 85% ink backdrop and a square close button.

## Do's and Don'ts

### Do:
- **Do** set every display heading as a two-plate overprint: orange offset (-0.09em, 0.07em) under blue, `mix-blend-multiply` on paper, `mix-blend-screen` on overprint pages.
- **Do** keep all corners at 0px and frame with 2px ink or 15%-ink hairlines.
- **Do** use print-like timing: 150–160ms snaps and the 420ms `cubic-bezier(0.2, 0.9, 0.3, 1)` chew/register; respect `prefers-reduced-motion`.
- **Do** keep the focus ring 2px fluoro pink with 3px offset.
- **Do** put the blue halftone field on every overprint page.

### Don't:
- **Don't** use rounded cards, box shadows or surface gradients (the cover halftone's fade mask is the one sanctioned gradient, and only as a mask).
- **Don't** use pink outside the active feeding state, selection and focus.
- **Don't** fake a bold on Black Han Sans.
- **Don't** recolour the mascot or the agent pet icons into the riso inks.
- **Don't** add a third page-scale ink or a gray dark ground.
