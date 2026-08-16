import type { ReactNode } from "react";
import { DRISHTI_COLORS, drishtiInk, type CharmId, type DrishtiState } from "@/lib/charms";

function Frame({
  className,
  children,
  lit = false,
}: {
  className?: string;
  children: ReactNode;
  lit?: boolean;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      {lit ? (
        <defs>
          <radialGradient id="charm-hang-gold" cx="32%" cy="26%" r="72%">
            <stop offset="0%" stopColor="#f8ecb4" />
            <stop offset="42%" stopColor="#e4b028" />
            <stop offset="100%" stopColor="#8a6410" />
          </radialGradient>
          <radialGradient id="charm-hang-navy" cx="32%" cy="26%" r="72%">
            <stop offset="0%" stopColor="#3d548f" />
            <stop offset="50%" stopColor="#0b1849" />
            <stop offset="100%" stopColor="#050918" />
          </radialGradient>
          <radialGradient id="charm-hang-mist" cx="32%" cy="26%" r="72%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#ebede3" />
            <stop offset="100%" stopColor="#c5c8bb" />
          </radialGradient>
          <radialGradient id="charm-hang-red" cx="32%" cy="26%" r="72%">
            <stop offset="0%" stopColor="#d94866" />
            <stop offset="48%" stopColor="#9f1239" />
            <stop offset="100%" stopColor="#5c0b20" />
          </radialGradient>
          <radialGradient id="charm-hang-sheen" cx="34%" cy="24%" r="68%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.72" />
            <stop offset="36%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0b1849" stopOpacity="0.32" />
          </radialGradient>
          <filter id="charm-hang-depth" x="-18%" y="-18%" width="136%" height="140%">
            <feDropShadow dx="0" dy="1.6" stdDeviation="1.2" floodColor="#0b1849" floodOpacity="0.38" />
          </filter>
        </defs>
      ) : null}
      <g filter={lit ? "url(#charm-hang-depth)" : undefined}>{children}</g>
      {lit ? (
        <ellipse
          cx="19"
          cy="15"
          rx="11"
          ry="7.5"
          fill="url(#charm-hang-sheen)"
          style={{ mixBlendMode: "soft-light" }}
        />
      ) : null}
    </svg>
  );
}

export default function CharmMark({
  id,
  className,
  emoji = "🍀",
  size = "card",
  daruma = 0,
  drishti = 0,
}: {
  id: CharmId;
  className?: string;
  emoji?: string;
  size?: "card" | "hang";
  daruma?: 0 | 1 | 2;
  drishti?: DrishtiState;
}) {
  if (id === "emoji") {
    return (
      <span
        className={`flex items-center justify-center leading-none ${
          size === "hang" ? "text-[4.4rem] drop-shadow-[0_8px_10px_rgba(11,24,73,0.28)]" : "text-[1.75rem]"
        } ${className ?? ""}`}
        aria-hidden="true"
      >
        {emoji}
      </span>
    );
  }

  const face = DRISHTI_COLORS[drishti];
  const ink = drishtiInk(face);
  const accent = face === "#e4b028" ? "#0b1849" : "#e4b028";
  const lit = size === "hang";
  const gold = lit ? "url(#charm-hang-gold)" : "#e4b028";
  const navy = lit ? "url(#charm-hang-navy)" : "#0b1849";
  const mist = lit ? "url(#charm-hang-mist)" : "#ebede3";
  const red = lit ? "url(#charm-hang-red)" : "#9f1239";

  return (
    <Frame className={className} lit={lit}>
      {id === "period" ? <circle cx="24" cy="24" r="9" fill={gold} /> : null}

      {id === "disc" ? (
        <>
          <circle cx="24" cy="24" r="18" fill="none" stroke="#e4b028" strokeWidth="1" />
          <circle data-charm-fill cx="24" cy="24" r="14" fill={navy} />
        </>
      ) : null}

      {id === "pencil" ? (
        <>
          <rect x="21" y="8" width="6" height="24" fill={navy} />
          <rect x="21" y="28" width="6" height="3" fill={gold} />
          <path d="M21 32 L27 32 L24 40 Z" fill={navy} />
          <rect x="21" y="8" width="6" height="1.5" fill={gold} />
        </>
      ) : null}

      {id === "eye" ? (
        <>
          <circle data-charm-ring cx="24" cy="24" r="18" fill="none" stroke="#0b1849" strokeWidth="1.5" />
          <circle data-charm-ring cx="24" cy="24" r="12" fill="none" stroke="#0b1849" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="8" fill={mist} />
          <circle cx="24" cy="24" r="4" fill={gold} />
        </>
      ) : null}

      {id === "nazar" ? (
        <>
          <circle cx="24" cy="24" r="18" fill={navy} />
          <circle cx="24" cy="24" r="13" fill={mist} />
          <circle cx="24" cy="24" r="8" fill="#1e3a8a" />
          <circle cx="24" cy="24" r="3.5" fill={gold} />
        </>
      ) : null}

      {id === "hamsa" ? (
        <>
          <path
            fill={gold}
            d="M18 20 V12.5 a2.2 2.2 0 0 1 4.4 0 V20 M23.8 20 V10.5 a2.2 2.2 0 0 1 4.4 0 V20 M29.6 20 V13.5 a2.2 2.2 0 0 1 4.4 0 V22.5 C34 32 29 38 24 38 C19 38 14 32 14 24.5 V22.2 a2.2 2.2 0 0 1 4 0 V20"
          />
          <circle cx="24" cy="28" r="3.2" fill="#ebede3" />
          <circle cx="24" cy="28" r="1.6" fill="#0b1849" />
        </>
      ) : null}

      {id === "nimbu" ? (
        <>
          <ellipse cx="24" cy="18" rx="8" ry="6.5" fill={gold} />
          <path d="M24 12 v-3" stroke="#124d1c" strokeWidth="1.5" />
          <path d="M16 26 C14 30 15 38 16 40 C18 36 19 30 18 26 Z" fill="#7f1d1d" />
          <path d="M24 24 C22 30 23 38 24 41 C26 36 27 30 26 24 Z" fill="#9f1239" />
          <path d="M32 26 C30 30 31 38 32 40 C34 36 35 30 34 26 Z" fill="#7f1d1d" />
        </>
      ) : null}

      {id === "drishti" ? (
        <>
          <circle cx="10" cy="24" r="3.2" fill={face} />
          <circle cx="38" cy="24" r="3.2" fill={face} />
          <ellipse data-drishti-face cx="24" cy="25" rx="15" ry="16.5" fill={face} />
          <ellipse cx="18" cy="22" rx="5.2" ry="5.6" fill="#ebede3" />
          <ellipse cx="30" cy="22" rx="5.2" ry="5.6" fill="#ebede3" />
          <circle cx="18.4" cy="23" r="2.4" fill="#0b1849" />
          <circle cx="30.4" cy="23" r="2.4" fill="#0b1849" />
          <circle cx="17.4" cy="21.8" r="0.7" fill="#ebede3" />
          <circle cx="29.4" cy="21.8" r="0.7" fill="#ebede3" />
          <path d="M12 15.5 L22.5 19" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M36 15.5 L25.5 19" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M16 30 Q24 28 32 30 Q24 36 16 30 Z" fill={accent} />
          <circle cx="24" cy="12.5" r="1.4" fill={accent} />
        </>
      ) : null}

      {id === "daruma" ? (
        <>
          <ellipse cx="24" cy="26" rx="15" ry="16.5" fill={red} />
          <ellipse cx="24" cy="26" rx="15" ry="16.5" fill="none" stroke="#e4b028" strokeWidth="1" />
          <ellipse cx="24" cy="20" rx="11" ry="9" fill="#ebede3" />
          <path
            d="M14.5 16.2 Q20 12.5 22.2 17"
            fill="none"
            stroke="#0b1849"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M33.5 16.2 Q28 12.5 25.8 17"
            fill="none"
            stroke="#0b1849"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="19.4" cy="21.2" r="3.3" fill="#ebede3" stroke="#0b1849" strokeWidth="1" />
          <circle cx="28.6" cy="21.2" r="3.3" fill="#ebede3" stroke="#0b1849" strokeWidth="1" />
          {daruma >= 1 ? (
            <>
              <circle data-daruma-left cx="19.4" cy="21.2" r="1.7" fill="#0b1849" />
              <circle cx="18.7" cy="20.5" r="0.45" fill="#ebede3" />
            </>
          ) : (
            <circle data-daruma-left cx="19.4" cy="21.2" r="1.7" fill="none" />
          )}
          {daruma >= 2 ? (
            <>
              <circle data-daruma-right cx="28.6" cy="21.2" r="1.7" fill="#0b1849" />
              <circle cx="27.9" cy="20.5" r="0.45" fill="#ebede3" />
            </>
          ) : (
            <circle data-daruma-right cx="28.6" cy="21.2" r="1.7" fill="none" />
          )}
        </>
      ) : null}

      {id === "neko" ? (
        <>
          <ellipse cx="23" cy="33" rx="12" ry="9" fill={mist} stroke="#0b1849" strokeWidth="1.2" />
          <circle cx="23" cy="17" r="9" fill={mist} stroke="#0b1849" strokeWidth="1.2" />
          <path d="M15 13 L17 6 L22 13 Z" fill="#0b1849" />
          <path d="M31 13 L29 6 L24 13 Z" fill="#0b1849" />
          <circle cx="20" cy="17" r="1.3" fill="#0b1849" />
          <circle cx="26" cy="17" r="1.3" fill="#0b1849" />
          <path d="M23 19 L23 21" stroke="#0b1849" strokeWidth="1" />
          <path d="M16 20 H13 M16 22 H12.5 M30 20 H33 M30 22 H33.5" stroke="#0b1849" strokeWidth="1" />
          <path d="M14 32 C12 28 11 24 14 22" fill="none" stroke="#ebede3" strokeWidth="2.4" strokeLinecap="round" />
          <path
            data-neko-paw
            d="M32 22 C36 12 34 10 31 16 C33 20 34 24 32 26"
            fill="#ebede3"
            stroke="#0b1849"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M18 28 L28 28 L26 34 L20 34 Z" fill="#e4b028" />
          <circle cx="23" cy="31" r="1.4" fill="#0b1849" />
        </>
      ) : null}

      {id === "horseshoe" ? (
        <>
          <path
            data-horseshoe
            d="M15 7 C15 7 15 28 15 32 C15 38.5 19.2 43 24 43 C28.8 43 33 38.5 33 32 L33 7"
            fill="none"
            stroke={gold}
            strokeWidth="5.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[14, 22, 30].map((y) => (
            <g key={y}>
              <circle cx="15" cy={y} r="1.15" fill="#0b1849" />
              <circle cx="33" cy={y} r="1.15" fill="#0b1849" />
            </g>
          ))}
        </>
      ) : null}

      {id === "scarab" ? (
        <>
          <path
            data-scarab-wing="left"
            d="M24 20 C10 16 4 22 6 30 C8 36 16 34 24 30 Z"
            fill="#124d1c"
          />
          <path
            data-scarab-wing="right"
            d="M24 20 C38 16 44 22 42 30 C40 36 32 34 24 30 Z"
            fill="#124d1c"
          />
          <ellipse cx="24" cy="26" rx="7" ry="13" fill="#0b1849" />
          <path d="M24 14 V38" stroke="#e4b028" strokeWidth="1" />
          <ellipse cx="24" cy="13" rx="6" ry="5" fill={gold} />
          <path d="M20 10 L16 6 M28 10 L32 6" stroke="#0b1849" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M18 22 L12 20 M18 28 L11 30 M18 34 L13 38 M30 22 L36 20 M30 28 L37 30 M30 34 L35 38" stroke="#0b1849" strokeWidth="1.2" strokeLinecap="round" />
        </>
      ) : null}
    </Frame>
  );
}
