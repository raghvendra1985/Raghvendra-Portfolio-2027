import type { StudioObjectIllustration } from "@/studio";

function DiscoBall() {
  return (
    <svg className="soa-ball" viewBox="0 0 88 88" fill="none" aria-hidden>
      <circle cx="44" cy="44" r="40" fill="#ff4ea8" />
      <circle cx="44" cy="44" r="40" fill="url(#soa-ball-shine)" />
      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 8 }, (_, col) => {
          const angle = (col / 8) * Math.PI * 2 + (row % 2) * 0.35;
          const radius = 10 + row * 5.2;
          const x = 44 + Math.cos(angle) * radius;
          const y = 44 + Math.sin(angle) * radius * 0.86;
          const odd = (row + col) % 2 === 0;
          return (
            <rect
              key={`${row}-${col}`}
              x={x - 4}
              y={y - 4}
              width="8"
              height="8"
              rx="0.6"
              transform={`rotate(45 ${x} ${y})`}
              fill={odd ? "#ffd6ee" : "#ff8cc8"}
              stroke="#ff2d8a"
              strokeWidth="0.4"
            />
          );
        }),
      )}
      <defs>
        <radialGradient id="soa-ball-shine" cx="32%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ff2d8a" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function NotebookArt() {
  return (
    <>
      <span className="soa-desk" />
      <span className="soa-notepad">
        <span className="soa-sprinkle" />
      </span>
      <span className="soa-clip soa-clip-a" />
      <span className="soa-clip soa-clip-b" />
      <span className="soa-clip soa-clip-c" />
      <span className="soa-cup">
        <span className="soa-pen soa-pen-pink" />
        <span className="soa-pen soa-pen-cyan" />
        <span className="soa-scissors" />
      </span>
    </>
  );
}

function DeskArt() {
  return (
    <>
      <span className="soa-desk" />
      <span className="soa-board">
        <span className="soa-grid" />
        <span className="soa-sticky soa-sticky-y font-mono-label">Write</span>
        <span className="soa-sticky soa-sticky-p font-mono-label">Ship</span>
        <span className="soa-sticky soa-sticky-c font-mono-label">Look</span>
      </span>
      <span className="soa-calendar">
        <span className="soa-cal-head" />
      </span>
      <span className="soa-tumbler">
        <span className="soa-lid" />
        <span className="soa-handle" />
        <span className="soa-straw" />
      </span>
    </>
  );
}

function BikeArt() {
  return (
    <>
      <span className="soa-desk" />
      <DiscoBall />
      <span className="soa-washi soa-washi-a" />
      <span className="soa-washi soa-washi-b" />
    </>
  );
}

function CanArt() {
  return (
    <>
      <span className="soa-desk" />
      <span className="soa-bowl">
        <span className="soa-gold" />
      </span>
      <span className="soa-can">
        <span className="soa-spout" />
        <span className="soa-can-handle" />
        <span className="soa-rose" />
      </span>
    </>
  );
}

const art = {
  notebook: NotebookArt,
  desk: DeskArt,
  bike: BikeArt,
  can: CanArt,
} as const;

export default function ObjectStillLife({ kind }: { kind: StudioObjectIllustration }) {
  const Art = art[kind];
  return (
    <div className="studio-object-art" data-kind={kind} aria-hidden>
      <Art />
    </div>
  );
}
