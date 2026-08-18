import type { CSSProperties } from "react";
import { copy, type Locale } from "@/content/copy";
import styles from "./PetFeedDemo.module.css";

export type PetFeedVariant = "clipboard" | "file-drop" | "ask";

function Pet() {
  return (
    <div className={styles.pet}>
      <div className={styles.petScale}>
        <svg viewBox="0 0 96 96">
          <path className={styles.pEar} d="M21,27 C17,14 22,13 34,27 L21,27 Z" />
          <path className={styles.pEar} d="M66,28 C76,16 78,14 77,29 L66,28 Z" />
          <path className={styles.pBody} d="M14,31 L20,28 C14,10 23,9 39,29 L61,29 C75,15 80,10 79,31 C86,50 87,66 84,78 C63,85 35,84 15,79 C10,61 10,45 14,31 Z" />
          <line className={styles.pLine} x1="23" y1="37" x2="72" y2="40" />
          <line className={styles.pLine} x1="20" y1="45" x2="75" y2="48" />
          <line className={styles.pLine} x1="24" y1="72" x2="73" y2="69" />
          <ellipse className={styles.pCheek} cx="32" cy="53" rx="5" ry="3" />
          <ellipse className={styles.pCheek} cx="65" cy="52.5" rx="6" ry="3.5" />
          <ellipse className={styles.pEye} cx="34" cy="47" rx="3" ry="4" />
          <ellipse className={styles.pEye} cx="64.5" cy="49.5" rx="3.5" ry="4.5" />
          <g className={styles.mouthClosed}>
            <polygon className={styles.pMouthFill} points="46,55.5 52.5,56.2 49,59.5" />
            <polyline points="49,62.5 43,67" fill="none" stroke="#4b2a1e" strokeWidth={2} strokeLinecap="round" />
            <polyline points="49,62.5 56,68" fill="none" stroke="#4b2a1e" strokeWidth={2} strokeLinecap="round" />
          </g>
          <g className={styles.mouthHalf}>
            <ellipse className={styles.pMouthFill} cx="49" cy="60" rx="11" ry="3" />
          </g>
          <g className={styles.mouthOpen}>
            <ellipse className={styles.pMouthFill} cx="49" cy="62.5" rx="16" ry="12.5" />
            <ellipse className={styles.pTongue} cx="49" cy="69.5" rx="10" ry="3.5" />
            <polygon className={styles.pTooth} points="43,51 50,51 47,58" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SignatureBubble({ eating, reply }: { eating: string; reply: string }) {
  return (
    <div className={styles.speech}>
      <span className={styles.yum}>{eating}</span>
      <span className={styles.reply}>{reply}</span>
    </div>
  );
}

export default function PetFeedDemo({
  variant,
  locale,
  delaySeconds = 0,
}: {
  variant: PetFeedVariant;
  locale: Locale;
  delaySeconds?: number;
}) {
  const t = copy[locale].demo.scenes;
  const stageStyle = { "--delay": `${delaySeconds}s` } as CSSProperties;

  return (
    <div
      className={`${styles.stage} aspect-video w-full rounded-[1.1rem] border border-line bg-cream`}
      style={stageStyle}
    >
      {variant === "clipboard" && (
        <>
          <div className={styles.textsrc}>
            <span className={styles.sel}>
              <span className={styles.highlight} />
              <span className={styles.txt}>{t.clipboard.source}</span>
            </span>
          </div>
          <div className={`${styles.item} ${styles.s1Item}`}>
            <div className={styles.chip}>
              <div className={styles.chipText}>&ldquo;{t.clipboard.source}&rdquo;</div>
              <span className={styles.key}>⌥ + S</span>
            </div>
          </div>
          <SignatureBubble eating={t.eating} reply={t.clipboard.reply} />
          <Pet />
        </>
      )}

      {variant === "file-drop" && (
        <>
          {/* stays put on the desktop, never dragged */}
          <div className={styles.desktopFile}>
            <svg viewBox="0 0 54 64">
              <path d="M4 4h32l14 14v42a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z" fill="#fffdf8" stroke="#d8c7a9" strokeWidth={4} strokeLinejoin="round" />
              <path d="M36 4v14h14" fill="none" stroke="#d8c7a9" strokeWidth={4} strokeLinejoin="round" />
              <rect x="12" y="34" width="30" height="4" rx="2" fill="#eaded1" />
              <rect x="12" y="43" width="22" height="4" rx="2" fill="#eaded1" />
            </svg>
          </div>
          {/* the one that actually gets dragged onto the pet */}
          <div className={`${styles.item} ${styles.s2Item} ${styles.fileIcon}`}>
            <svg viewBox="0 0 54 64">
              <path d="M4 4h32l14 14v42a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z" fill="#fffdf8" stroke="#4b2a1e" strokeWidth={5} strokeLinejoin="round" />
              <path d="M36 4v14h14" fill="none" stroke="#4b2a1e" strokeWidth={5} strokeLinejoin="round" />
              <rect x="9" y="24" width="34" height="26" rx="3" fill="#fdefdd" stroke="#e57a2d" strokeWidth={3} />
              <circle cx="18" cy="33" r="3" fill="#e57a2d" />
              <polyline points="9,48 20,37 27,43 34,32 43,48" fill="none" stroke="#e57a2d" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <SignatureBubble eating={t.eating} reply={t.fileDrop.reply} />
          <Pet />
        </>
      )}

      {variant === "ask" && (
        <>
          <div className={styles.chatwin}>
            <div className={styles.transcript}>
              <div className={`${styles.msg} ${styles.msgUser}`}>{t.ask.question}</div>
              <div className={`${styles.msg} ${styles.msgBot}`}>{t.ask.answer}</div>
            </div>
            <div className={styles.composer}>
              <span className={styles.composerText}>{t.ask.question}</span>
              <span className={styles.composerHint}>↵</span>
            </div>
          </div>
          <Pet />
        </>
      )}
    </div>
  );
}
