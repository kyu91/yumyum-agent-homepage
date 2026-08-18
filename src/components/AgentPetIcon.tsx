// Geometry and colors copied 1:1 from the real app's pet drawing code
// (Sources/YumYumApp/FloatingPetWindowController.swift, drawPet / AgentDefinitionID.headbandColor).
const HEADBAND_COLORS: Record<string, string> = {
  Hermes: "#6b5ce8",
  OpenCode: "#298cd1",
  Codex: "#38a866",
  "Claude Code": "#b8407a",
};

const AGENT_ICONS: Record<string, string> = {
  Hermes: "/images/agent-hermes.png",
  OpenCode: "/images/agent-opencode.png",
  Codex: "/images/agent-codex.png",
  "Claude Code": "/images/agent-claude-code.png",
};

export default function AgentPetIcon({ agent, className }: { agent: string; className?: string }) {
  const headbandColor = HEADBAND_COLORS[agent] ?? "#4b2a1e";
  const icon = AGENT_ICONS[agent];
  const clipId = `agent-badge-${agent.replace(/\s+/g, "-")}`;

  return (
    <svg viewBox="0 0 96 96" className={className}>
      <defs>
        <clipPath id={clipId}>
          <circle cx="49" cy="31" r="12" />
        </clipPath>
      </defs>
      <path d="M21,27 C17,14 22,13 34,27 L21,27 Z" fill="#faa361" />
      <path d="M66,28 C76,16 78,14 77,29 L66,28 Z" fill="#faa361" />
      <path
        d="M14,31 L20,28 C14,10 23,9 39,29 L61,29 C75,15 80,10 79,31 C86,50 87,66 84,78 C63,85 35,84 15,79 C10,61 10,45 14,31 Z"
        fill="#e87329"
        stroke="#401f14"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <line x1="23" y1="37" x2="72" y2="40" stroke="#fa8f33" strokeWidth={2} strokeLinecap="round" />
      <line x1="20" y1="45" x2="75" y2="48" stroke="#fa8f33" strokeWidth={2} strokeLinecap="round" />
      <line x1="24" y1="72" x2="73" y2="69" stroke="#fa8f33" strokeWidth={2} strokeLinecap="round" />
      <path d="M19,29 Q49,35 79,30" fill="none" stroke="#401f14" strokeWidth={11} strokeLinecap="round" />
      <path d="M19,29 Q49,35 79,30" fill="none" stroke={headbandColor} strokeWidth={8} strokeLinecap="round" />
      <circle cx="49" cy="31" r="13" fill="#fff" stroke="#401f14" strokeWidth={1.5} />
      {icon ? (
        <image href={icon} x="37" y="19" width="24" height="24" clipPath={`url(#${clipId})`} preserveAspectRatio="xMidYMid slice" />
      ) : null}
      <ellipse cx="32" cy="53" rx="5" ry="3" fill="#e85c4a" opacity={0.72} />
      <ellipse cx="65" cy="52.5" rx="6" ry="3.5" fill="#e85c4a" opacity={0.72} />
      <ellipse cx="34" cy="47" rx="3" ry="4" fill="#401f14" />
      <ellipse cx="64.5" cy="49.5" rx="3.5" ry="4.5" fill="#401f14" />
      <polygon points="46,55.5 52.5,56.2 49,59.5" fill="#401f14" />
      <polyline points="49,62.5 43,67" fill="none" stroke="#401f14" strokeWidth={2.5} strokeLinecap="round" />
      <polyline points="49,62.5 56,68" fill="none" stroke="#401f14" strokeWidth={2.5} strokeLinecap="round" />
    </svg>
  );
}
