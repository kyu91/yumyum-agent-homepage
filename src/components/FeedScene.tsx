"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { ClipKind } from "@/content/copy";

type ClipCopy = { label: string; prompt: string; reply: string };

type FeedCopy = {
  instruction: string;
  exampleLabel: string;
  defaultBubble: string;
  draftLine: string;
  returnLabel: string;
  clips: Record<ClipKind, ClipCopy>;
};

type Turn = { id: number; kind: ClipKind; status: "draft" | "sent" };
type Origin = { x: number; y: number; width: number; height: number };
type DragState = { kind: ClipKind; compact: boolean; x: number; y: number; grabDx: number; grabDy: number; origin: Origin; returning: boolean };

const ORDER: ClipKind[] = ["capture", "text", "file"];
const ROTATE: Record<ClipKind, string> = { capture: "-rotate-6", text: "rotate-3", file: "-rotate-2" };
const ROTATE_DEG: Record<ClipKind, string> = { capture: "-6deg", text: "3deg", file: "-2deg" };
const LIFT: Record<ClipKind, string> = { capture: "lg:translate-y-3", text: "lg:-translate-y-2", file: "lg:translate-y-8" };

function getVisible(a: HTMLElement | null, b: HTMLElement | null): HTMLElement | null {
  for (const el of [a, b]) {
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) return el;
  }
  return null;
}

function ClipArt({ kind, compact = false }: { kind: ClipKind; compact?: boolean }) {
  if (kind === "capture") {
    return (
      <svg viewBox="0 0 64 48" className={compact ? "h-7 w-10" : "h-10 w-14"} aria-hidden="true">
        <rect x="2" y="2" width="60" height="44" fill="#fff" stroke="#1a1a1a" strokeWidth={2} />
        <path d="M4 32 L20 16 L30 26 L44 10 L60 26" fill="none" stroke="#0078bf" strokeWidth={2} />
        <circle cx="14" cy="12" r="4" fill="#ff6c2f" />
      </svg>
    );
  }
  if (kind === "text") {
    return (
      <svg viewBox="0 0 64 48" className={compact ? "h-7 w-10" : "h-10 w-14"} aria-hidden="true">
        <rect x="2" y="2" width="60" height="44" fill="#fff" stroke="#1a1a1a" strokeWidth={2} />
        <line x1="9" y1="14" x2="55" y2="14" stroke="#1a1a1a" strokeWidth={2} />
        <line x1="9" y1="24" x2="47" y2="24" stroke="#1a1a1a" strokeWidth={2} />
        <line x1="9" y1="34" x2="39" y2="34" stroke="#ff6c2f" strokeWidth={3} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 56" className={compact ? "h-8 w-7" : "h-12 w-10"} aria-hidden="true">
      <path d="M2 2h26l16 16v34a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#fff" stroke="#1a1a1a" strokeWidth={2} />
      <path d="M28 2v16h16" fill="none" stroke="#1a1a1a" strokeWidth={2} />
      <text x="8" y="42" fontSize="12" fontWeight={800} fill="#0078bf">
        PDF
      </text>
    </svg>
  );
}

/** The clipping's own irregular scissor-cut silhouette, drawn as a real SVG outline (not a
 *  CSS border that a clip-path would slice into jagged partial strokes). This "paper" layer
 *  sits inside the button; the button itself stays unclipped so its staple mark isn't cut off. */
function ClipPaper() {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
      <polygon
        points="2,6 18,0 40,3 63,0 84,4 100,0 97,22 100,45 96,68 100,88 82,100 58,97 34,100 12,96 0,100 3,74 0,48 4,24"
        fill="#ffffff"
        stroke="#1a1a1a"
        strokeWidth={2.5}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** The clipping's visible face — cut paper, artwork, label — shared between the real button
 *  and the drag clone so a dragged scrap looks like the actual clipping, not a generic ghost. */
function ClippingFace({ kind, label, compact = false }: { kind: ClipKind; label: string; compact?: boolean }) {
  return (
    <>
      <ClipPaper />
      <span className={`relative flex flex-col items-center text-center ${compact ? "gap-1 px-2 py-2" : "gap-2 px-3 py-4"}`}>
        <ClipArt kind={kind} compact={compact} />
        <span className={compact ? "text-[10px] font-bold text-ink" : "text-[11px] font-bold text-ink"}>{label}</span>
      </span>
    </>
  );
}

function ReturnIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 4v3.5a2 2 0 0 1-2 2H4" />
      <path d="M6.5 12 3 9.5 6.5 7" />
    </svg>
  );
}

function Clipping({
  kind,
  label,
  compact = false,
  isDragging,
  onFeed,
  onDragMove,
  onDragEnd,
  onDragCancel,
}: {
  kind: ClipKind;
  label: string;
  compact?: boolean;
  isDragging: boolean;
  onFeed: (kind: ClipKind) => void;
  onDragMove: (kind: ClipKind, compact: boolean, clientX: number, clientY: number, grabDx: number, grabDy: number, origin: Origin) => void;
  onDragEnd: (kind: ClipKind, clientX: number, clientY: number) => void;
  onDragCancel: () => void;
}) {
  const press = useRef({ pressed: false, startX: 0, startY: 0, dragging: false, grabDx: 0, grabDy: 0, origin: { x: 0, y: 0, width: 0, height: 0 } });
  const justDragged = useRef(false);

  function handlePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    // A previous drag's synthetic click can be swallowed by the browser (common on touch),
    // which would otherwise leave justDragged stuck true and eat the *next* legitimate tap.
    justDragged.current = false;
    const rect = e.currentTarget.getBoundingClientRect();
    press.current = {
      pressed: true,
      startX: e.clientX,
      startY: e.clientY,
      dragging: false,
      grabDx: e.clientX - rect.left,
      grabDy: e.clientY - rect.top,
      origin: { x: rect.left, y: rect.top, width: rect.width, height: rect.height },
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    const p = press.current;
    if (!p.pressed) return;
    const dx = e.clientX - p.startX;
    const dy = e.clientY - p.startY;
    if (!p.dragging && Math.hypot(dx, dy) > 6) p.dragging = true;
    if (p.dragging) onDragMove(kind, compact, e.clientX, e.clientY, p.grabDx, p.grabDy, p.origin);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLButtonElement>) {
    const p = press.current;
    if (p.dragging) {
      justDragged.current = true;
      onDragEnd(kind, e.clientX, e.clientY);
    }
    press.current.pressed = false;
    press.current.dragging = false;
  }

  function handlePointerCancel() {
    if (press.current.dragging) {
      justDragged.current = true;
      onDragCancel();
    }
    press.current.pressed = false;
    press.current.dragging = false;
  }

  function handleClick() {
    if (justDragged.current) {
      justDragged.current = false;
      return;
    }
    onFeed(kind);
  }

  return (
    <button
      type="button"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onLostPointerCapture={handlePointerCancel}
      onClick={handleClick}
      className={`staple relative z-10 touch-none ${compact ? "w-16" : "w-28"} ${ROTATE[kind]} ${compact ? "" : LIFT[kind]} ${
        isDragging ? "opacity-20" : "opacity-100 transition-transform hover:-translate-y-1"
      }`}
    >
      <ClippingFace kind={kind} label={label} compact={compact} />
    </button>
  );
}

/** The pet, mounted on a square-cut paper slip (staple, slight tilt) so the mascot PNG's own
 *  cream tile reads as a pasted print rather than floating on the page. `active` drives a pink
 *  ink tint on the slip itself — never an offset block, which would just be a hard shadow. */
function PetSlip({
  onRef,
  chewing,
  active,
  anticipate,
  sizeClass,
}: {
  onRef: (el: HTMLDivElement | null) => void;
  chewing: boolean;
  active: boolean;
  anticipate: boolean;
  sizeClass: string;
}) {
  return (
    <div
      ref={onRef}
      className={`staple relative -rotate-2 border-2 bg-paper p-2 transition-transform duration-150 lg:p-4 ${sizeClass} ${active ? "border-pink" : "border-ink"} ${
        chewing ? "animate-chew" : anticipate ? "scale-105" : "scale-100"
      }`}
      style={{ transformOrigin: "50% 88%" }}
    >
      <RegistrationMark active={chewing} />
      <Image src="/images/yumyum-mascot.png" alt="" width={480} height={480} className="relative h-full w-full select-none object-contain" priority />
      <div aria-hidden="true" className={`halftone-pink pointer-events-none absolute inset-0 mix-blend-multiply transition-opacity duration-200 ${active ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}

function RegistrationMark({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="pointer-events-none absolute -left-3 -top-3 z-20 h-8 w-8 lg:-left-5 lg:-top-5 lg:h-10 lg:w-10">
      <g className={`mix-blend-multiply ${active ? "animate-register" : ""}`}>
        <circle cx="20" cy="20" r="9" fill="none" stroke="#ff6c2f" strokeWidth={1.6} />
        <line x1="20" y1="6" x2="20" y2="34" stroke="#ff6c2f" strokeWidth={1.2} />
        <line x1="6" y1="20" x2="34" y2="20" stroke="#ff6c2f" strokeWidth={1.2} />
      </g>
      <g className="mix-blend-multiply">
        <circle cx="20" cy="20" r="9" fill="none" stroke="#0078bf" strokeWidth={1.6} />
        <line x1="20" y1="6" x2="20" y2="34" stroke="#0078bf" strokeWidth={1.2} />
        <line x1="6" y1="20" x2="34" y2="20" stroke="#0078bf" strokeWidth={1.2} />
      </g>
    </svg>
  );
}

export default function FeedScene({ copy, className = "" }: { copy: FeedCopy; className?: string }) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [chewing, setChewing] = useState(false);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [overPet, setOverPet] = useState(false);
  const [line, setLine] = useState<{ w: number; h: number; d: string } | null>(null);

  const sceneRef = useRef<HTMLDivElement>(null);
  const petRefs = useRef<{ mobile: HTMLDivElement | null; desktop: HTMLDivElement | null }>({ mobile: null, desktop: null });
  const clipsRefs = useRef<{ mobile: HTMLDivElement | null; desktop: HTMLDivElement | null }>({ mobile: null, desktop: null });
  const bubbleRef = useRef<HTMLDivElement>(null);
  const instructionRef = useRef<HTMLParagraphElement>(null);
  const returnBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextId = useRef(0);
  const chewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (turns.length === 0) return;
    bubbleRef.current?.scrollIntoView({ block: "nearest", behavior: reducedMotionRef.current ? "auto" : "smooth" });
    const latest = turns[turns.length - 1];
    if (latest.status === "draft") returnBtnRef.current?.focus();
  }, [turns]);

  function chew() {
    setChewing(true);
    if (chewTimer.current) clearTimeout(chewTimer.current);
    chewTimer.current = setTimeout(() => setChewing(false), 440);
  }

  function feed(kind: ClipKind) {
    nextId.current += 1;
    const id = nextId.current;
    // The clipboard is the one real-app path that lands in a draft instead of sending —
    // one pending draft at a time, matching the app's single chat composer.
    if (kind === "text") {
      setTurns((prev) => (prev.some((t) => t.status === "draft") ? prev : [...prev, { id, kind, status: "draft" }]));
      return;
    }
    setTurns((prev) => [...prev, { id, kind, status: "sent" }]);
    chew();
  }

  function confirmSend(id: number) {
    setTurns((prev) => prev.map((t) => (t.id === id ? { ...t, status: "sent" } : t)));
    chew();
  }

  function getPetRect(): DOMRect | null {
    const el = getVisible(petRefs.current.desktop, petRefs.current.mobile);
    return el ? el.getBoundingClientRect() : null;
  }

  function isOverPet(x: number, y: number) {
    const rect = getPetRect();
    return !!rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  // The ink line is drawn from real element positions — clippings to the pet's mouth to the
  // bubble — instead of hand-tuned viewBox percentages, so it tracks the actual layout.
  const recomputeLine = useCallback(() => {
    const scene = sceneRef.current;
    const clipsEl = getVisible(clipsRefs.current.mobile, clipsRefs.current.desktop);
    const petEl = getVisible(petRefs.current.desktop, petRefs.current.mobile);
    const bubbleEl = bubbleRef.current;
    if (!scene || !clipsEl || !petEl || !bubbleEl) return;

    const sceneRect = scene.getBoundingClientRect();
    const rel = (r: DOMRect) => ({ x: r.left - sceneRect.left, y: r.top - sceneRect.top, w: r.width, h: r.height });
    const clips = rel(clipsEl.getBoundingClientRect());
    const pet = rel(petEl.getBoundingClientRect());
    const bubble = rel(bubbleEl.getBoundingClientRect());

    const start = { x: clips.x + clips.w * 0.5, y: clips.y + clips.h };
    // End at the slip's rim, not a point inside it — the opaque paper would otherwise just
    // swallow the line, reading as cut off rather than arriving at the pet.
    const mouth = { x: pet.x + pet.w * 0.52, y: pet.y };
    // Biased toward the bubble's far edge (not its horizontal center) so the descent on
    // mobile runs beside the centered instruction copy instead of through it.
    const end = { x: bubble.x + Math.min(bubble.w * 0.82, Math.max(bubble.w - 18, bubble.w * 0.6)), y: bubble.y };

    // The instruction line sits between clippings/pet on desktop but between pet/bubble on
    // mobile — measure its *rendered glyphs* (a Range, not the block, which is full-width) and,
    // for whichever leg actually straddles its vertical band, route through a waypoint safely
    // past its right edge at that exact height instead of merely nudging a control point.
    const text = instructionRef.current
      ? (() => {
          const textRange = document.createRange();
          textRange.selectNodeContents(instructionRef.current!);
          return rel(textRange.getBoundingClientRect());
        })()
      : null;

    function leg(from: { x: number; y: number }, to: { x: number; y: number }): string {
      const textY = text && text.w > 0 ? text.y + text.h / 2 : null;
      const crosses = textY !== null && Math.min(from.y, to.y) <= textY && textY <= Math.max(from.y, to.y);
      if (!crosses || !text) {
        const c = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 16 };
        return `Q${c.x.toFixed(1)},${c.y.toFixed(1)} ${to.x.toFixed(1)},${to.y.toFixed(1)}`;
      }
      const waypoint = { x: text.x + text.w + 28, y: text.y + text.h / 2 };
      const c1 = { x: (from.x + waypoint.x) / 2, y: from.y };
      const c2 = { x: (waypoint.x + to.x) / 2, y: to.y };
      return `Q${c1.x.toFixed(1)},${c1.y.toFixed(1)} ${waypoint.x.toFixed(1)},${waypoint.y.toFixed(1)} Q${c2.x.toFixed(1)},${c2.y.toFixed(1)} ${to.x.toFixed(1)},${to.y.toFixed(1)}`;
    }

    setLine({
      w: sceneRect.width,
      h: sceneRect.height,
      d: `M${start.x.toFixed(1)},${start.y.toFixed(1)} ${leg(start, mouth)} ${leg(mouth, end)}`,
    });
  }, []);

  useEffect(() => {
    recomputeLine();
    const ro = new ResizeObserver(() => recomputeLine());
    if (sceneRef.current) ro.observe(sceneRef.current);
    if (bubbleRef.current) ro.observe(bubbleRef.current);
    if (instructionRef.current) ro.observe(instructionRef.current);
    window.addEventListener("resize", recomputeLine);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recomputeLine);
    };
  }, [recomputeLine]);

  useEffect(() => {
    recomputeLine();
  }, [turns.length, recomputeLine]);

  function handleDragMove(kind: ClipKind, compact: boolean, x: number, y: number, grabDx: number, grabDy: number, origin: Origin) {
    if (snapTimer.current) {
      clearTimeout(snapTimer.current);
      snapTimer.current = null;
    }
    setDrag({ kind, compact, x, y, grabDx, grabDy, origin, returning: false });
    setOverPet(isOverPet(x, y));
  }

  function handleDragEnd(kind: ClipKind, x: number, y: number) {
    if (isOverPet(x, y)) {
      feed(kind);
      setDrag(null);
      setOverPet(false);
      return;
    }
    setOverPet(false);
    if (reducedMotionRef.current) {
      setDrag(null);
      return;
    }
    // Miss: snap the clone back to its origin quickly, print-like — no floaty easing.
    setDrag((prev) => (prev ? { ...prev, x: prev.origin.x + prev.grabDx, y: prev.origin.y + prev.grabDy, returning: true } : prev));
    snapTimer.current = setTimeout(() => setDrag(null), 160);
  }

  function handleDragCancel() {
    setDrag(null);
    setOverPet(false);
  }

  const petActive = chewing || overPet;
  const petAnticipate = overPet && !chewing;

  return (
    <div ref={sceneRef} className={`relative ${className}`}>
      {line ? (
        <svg viewBox={`0 0 ${line.w} ${line.h}`} aria-hidden="true" className="pointer-events-none absolute inset-0">
          <path d={line.d} fill="none" stroke="#ff6c2f" strokeOpacity={1} strokeWidth={3.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      ) : null}

      {/* Mobile: clippings sit beside a compact pet so the whole scene fits one screen. */}
      <div className="flex items-start gap-3 lg:hidden">
        <div
          ref={(el) => {
            clipsRefs.current.mobile = el;
          }}
          className="flex flex-1 flex-wrap gap-2"
        >
          {ORDER.map((kind) => (
            <Clipping
              key={kind}
              kind={kind}
              label={copy.clips[kind].label}
              compact
              isDragging={drag?.kind === kind}
              onFeed={feed}
              onDragMove={handleDragMove}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            />
          ))}
        </div>
        <PetSlip onRef={(el) => (petRefs.current.mobile = el)} chewing={chewing} active={petActive} anticipate={petAnticipate} sizeClass="aspect-square h-32" />
      </div>

      {/* Desktop: clippings scattered above, pet and the reply log spread in a row below. */}
      <div
        ref={(el) => {
          clipsRefs.current.desktop = el;
        }}
        className="relative z-10 mb-16 hidden lg:flex lg:flex-wrap lg:justify-start lg:gap-8"
      >
        {ORDER.map((kind) => (
          <Clipping
            key={kind}
            kind={kind}
            label={copy.clips[kind].label}
            isDragging={drag?.kind === kind}
            onFeed={feed}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          />
        ))}
      </div>

      <p ref={instructionRef} className="relative z-10 mt-3 text-center text-[12px] font-bold text-muted lg:mt-0 lg:text-left">
        {copy.instruction}
      </p>

      <div className="relative z-10 mt-3 flex flex-col items-center gap-3 lg:mt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        {/* No wrapper div here: the slip must be a direct flex item of this row so its
            max-width percentage resolves against the row's own (definite) width rather than
            a shrink-to-fit wrapper, which would make width and max-width circular. */}
        <PetSlip
          onRef={(el) => (petRefs.current.desktop = el)}
          chewing={chewing}
          active={petActive}
          anticipate={petAnticipate}
          sizeClass="hidden lg:block aspect-square w-[clamp(200px,34vh,340px)] max-w-[calc(100%-17rem-1.5rem)] min-w-0"
        />

        <div
          ref={bubbleRef}
          role="log"
          aria-live="polite"
          className="flex max-h-52 w-full max-w-sm flex-col-reverse divide-y divide-ink/15 overflow-y-auto border-2 border-ink bg-paper p-4 lg:max-h-64 lg:w-auto lg:min-w-[17rem] lg:max-w-[20rem] lg:shrink-0"
        >
          {turns.length === 0 ? (
            <p className="text-[13px] leading-6 text-muted">{copy.defaultBubble}</p>
          ) : (
            turns.map((turn) => (
              <div key={turn.id} className="py-3 first:pt-0 last:pb-0">
                {turn.status === "draft" ? (
                  <>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 bg-pink align-middle" aria-hidden="true" />
                      {copy.draftLine}
                    </p>
                    <button
                      type="button"
                      ref={(el) => {
                        if (turn.status === "draft") returnBtnRef.current = el;
                      }}
                      onClick={() => confirmSend(turn.id)}
                      className="mt-2 inline-flex items-center gap-1.5 border-2 border-ink bg-paper px-2.5 py-1 text-[11px] font-bold text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      <ReturnIcon className="h-3 w-3" /> {copy.returnLabel}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 bg-pink align-middle" aria-hidden="true" />
                      {copy.exampleLabel}
                    </p>
                    <p className="mt-1 text-[13px] font-bold text-ink">{copy.clips[turn.kind].prompt}</p>
                    <p className="mt-1 text-[13px] leading-6 text-blue">{copy.clips[turn.kind].reply}</p>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {drag
        ? createPortal(
            <div
              aria-hidden="true"
              className={`staple pointer-events-none fixed left-0 top-0 z-50 ${drag.returning ? "transition-transform duration-150 ease-out" : ""}`}
              style={{
                transform: `translate(${drag.x - drag.grabDx}px, ${drag.y - drag.grabDy}px) rotate(${ROTATE_DEG[drag.kind]})`,
                width: drag.origin.width,
                height: drag.origin.height,
              }}
            >
              <ClippingFace kind={drag.kind} label={copy.clips[drag.kind].label} compact={drag.compact} />
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
