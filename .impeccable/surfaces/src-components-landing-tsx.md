---
version: 1
slug: "src-components-landing-tsx"
primary_target: "src/components/Landing.tsx"
related_targets: ["src/components/pet-demo/PetFeedDemo.tsx"]
---

# Landing surface brief

Scope: the whole marketing landing (`/` Korean, `/en` English), rendered by `src/components/Landing.tsx`. Mode: Persuade.

Audience: open-source / indie-minded macOS early adopters. Action: download the signed DMG from GitHub Releases (secondary: visit the repo). Proof: a feeding interaction the visitor performs on the page itself, plus the real intro videos. Must keep: mascot image and the four agent pet icons unchanged. Must avoid: generic SaaS landing, information overload, dev-tool/terminal look.

## Direction contract

THESIS: The site is one thin riso-printed zine; its cover pet is fed by the visitor. Refuses the centered-hero + icon-card-grid SaaS arrangement.

OWN-WORLD: White offset stock, two riso inks at page scale (Riso Orange #ff6c2f, Riso Blue #0078bf) overprinting to a dark multiply tone; fluorescent pink #ff48b0 only for the active/feeding state. Halftone dot fields, slight plate misregistration on display type, scissor-cut clippings with a staple, page-number folios. No rounded cards, no shadows, no gradients.

STORY: Visitor feeds the pet, sees a labeled example reply, understands "hand screen context to your own CLI", trusts it (signed, local, chat-only), downloads.

FIRST VIEWPORT: Zine cover. Wall-scale overprinted headline top-left; mascot center-right at ~40% viewport height; three cut clippings (capture scrap, text slip, PDF) scattered; one continuous ink line from clippings to pet to reply bubble. Drag or tap a clipping → pet chews → bubble reply labeled as example. Download stamp-ticket directly under the headline.

FORM: Riso indie zine, grounded list position 5; seed key 27f911f5. Signature interaction: feed-the-pet drag/tap. Motion grammar: print-like — plates snap into register, no floaty easing.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
