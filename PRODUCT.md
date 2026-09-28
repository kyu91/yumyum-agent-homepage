# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: open-source and indie-minded early adopters on macOS who enjoy playful desktop companions and local, privacy-respecting tools. Most already have (or will install) at least one AI CLI — Hermes, OpenCode, Codex, or Claude Code. They visit to judge whether the app is charming and trustworthy enough to download and try.

## Product Purpose

YumYum Agent is a macOS menu-bar app. A character (pet) roams the screen; the user "feeds" it a screen capture, clipboard content, or files, and it forwards that input to an AI CLI the user has already installed and logged into, showing the reply as a native speech bubble and chat window. The homepage exists to get that audience to download the DMG from GitHub Releases. Success = downloads and GitHub visits.

## Positioning

The differentiator is the feeding interaction itself: handing screen context to AI by feeding a character, plus a configurable character personality (Soul). Reusing already-logged-in local CLIs and local-first privacy are supporting points, not the lead.

## Operating Context

- Capture: right-click the pet → action menu → select a screen region, sent immediately.
- Clipboard feed: left-click the pet or global shortcut (default Option+S, re-recordable) puts clipboard content (file > image > text priority) into a chat draft; sending requires Return. No auto-send.
- File: drag from Finder onto the pet, or file picker.
- Replies: compact bubble is a scrollable multi-turn conversation that persists across close/reopen until "New session" in the detail chat. Detail chat shows full history with streaming-safe Markdown.
- Permissions: Accessibility + Input Monitoring for the global shortcut in other apps; Screen Recording for capture. The app re-checks each launch and re-prompts for missing ones.

## Capabilities and Constraints

- Supported CLIs (installed and logged in separately by the user): Hermes (ACP v1), OpenCode, Codex (ChatGPT login, read-only sandbox), Claude Code (plan permission mode). YumYum does not handle their login, network, or models.
- Analysis/chat only: agents cannot change the user's system (default-deny by design). Never imply autonomous execution.
- Distribution: universal (arm64 + x86_64) DMG on GitHub Releases, Developer ID signed and Apple notarized, ticket stapled. Install copy shows only the normal launch steps; never Gatekeeper bypass steps.
- No App Store, no auto-update. macOS 14+. Real Intel hardware and clean-Mac first-run are unverified.
- Windows version in development, unreleased: mention briefly only, never as a download or supported platform.
- Open source, Apache License 2.0.
- Site is bilingual: Korean at `/`, English at `/en`. Next.js App Router + Tailwind CSS v3 (v3 is pinned; do not upgrade to v4). Deployed on Vercel at yumyumagent.app.
- Version numbers are fetched from the app repo's releases, never hardcoded.

## Brand Commitments

- Name: YumYum Agent. Mascot asset: `public/images/yumyum-mascot.png`; app icon `src/app/icon.png`.
- Third-party CLI names are used only to describe compatibility; copy must state there is no sponsorship or endorsement.
- Product facts must match the app repo (kyu91/yumyum-agent README, AGENTS.md, docs/product-spec.md). No invented features (auto-execution, cloud sync, team collaboration, etc.).

## Evidence on Hand

- Intro videos of real usage: `public/videos/intro-ko.mp4`, `public/videos/intro-en.mp4`.
- Agent pet icons: `public/images/agent-*.png` (sources in `AGENT-ICONS-SOURCES.md`).
- Signing/notarization proof: GitHub Actions run https://github.com/kyu91/yumyum-agent/actions/runs/33165964764.
- No testimonials, user counts, press, or benchmarks exist. Do not fabricate them.

## Product Principles

1. Lead with the feeding interaction; show it, don't just describe it.
2. Honest about scope: chat/analysis only, signed build, known unverified areas.
3. Privacy is structural (no telemetry, explicit-only input), stated plainly, not as hype.
4. Respect the user's existing tools: YumYum is a front end to CLIs they already own.
