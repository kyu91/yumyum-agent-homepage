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
        className="group block h-full w-full cursor-zoom-in"
      >
        <video className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" src={src} autoPlay muted loop playsInline preload="auto" />
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
        className="m-auto max-h-none max-w-none border-0 bg-transparent p-0 backdrop:bg-ink/85"
      >
        {open ? (
          <div className="relative aspect-[728/540] w-[min(92vw,118svh)] overflow-hidden border-2 border-ink bg-ink">
            <video className="h-full w-full object-cover" src={src} autoPlay controls playsInline preload="auto" />
            <button
              type="button"
              aria-label={closeLabel}
              onClick={close}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center border-2 border-paper bg-ink text-paper"
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
