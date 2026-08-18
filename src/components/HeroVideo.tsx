"use client";

import { useRef, useState } from "react";

type Props = {
  src: string;
  openLabel: string;
  closeLabel: string;
};

export default function HeroVideo({ src, openLabel, closeLabel }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  function close() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        aria-label={openLabel}
        onClick={() => {
          dialogRef.current?.showModal();
          setOpen(true);
          document.body.style.overflow = "hidden";
        }}
        className="group block h-full w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      >
        <video
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={openLabel}
        onClose={() => {
          setOpen(false);
          document.body.style.overflow = "";
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto max-h-none max-w-none border-0 bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
      >
        {open ? (
          <div className="relative aspect-[728/540] w-[min(92vw,118svh)] overflow-hidden rounded-[1.25rem] border border-line bg-ink shadow-2xl shadow-black/40">
            <video className="h-full w-full object-cover" src={src} autoPlay controls playsInline preload="auto" />
            <button
              type="button"
              aria-label={closeLabel}
              onClick={close}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/90 text-brown backdrop-blur transition-colors hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
