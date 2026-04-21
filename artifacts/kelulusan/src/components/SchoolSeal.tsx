export function SchoolSeal({ size = 96 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle cx="60" cy="60" r="57" stroke="#c8a028" strokeWidth="2" fill="none" />
      <circle cx="60" cy="60" r="52" stroke="#c8a028" strokeWidth="0.7" fill="none" />

      {/* Background fill */}
      <circle cx="60" cy="60" r="51" fill="#0f1521" />

      {/* Inner decorative ring - dashes */}
      <circle
        cx="60" cy="60" r="48"
        stroke="#c8a028"
        strokeWidth="0.6"
        strokeDasharray="3 4"
        fill="none"
      />

      {/* Torch / book base shape */}
      <rect x="50" y="52" width="20" height="24" rx="2" fill="#c8a028" opacity="0.9" />
      <rect x="53" y="55" width="14" height="18" rx="1" fill="#0f1521" />

      {/* Book pages lines */}
      <line x1="55" y1="59" x2="65" y2="59" stroke="#c8a028" strokeWidth="1" opacity="0.7" />
      <line x1="55" y1="62" x2="65" y2="62" stroke="#c8a028" strokeWidth="1" opacity="0.7" />
      <line x1="55" y1="65" x2="65" y2="65" stroke="#c8a028" strokeWidth="1" opacity="0.7" />
      <line x1="55" y1="68" x2="65" y2="68" stroke="#c8a028" strokeWidth="1" opacity="0.5" />

      {/* Torch flame */}
      <ellipse cx="60" cy="43" rx="6" ry="10" fill="#c8a028" opacity="0.85" />
      <ellipse cx="60" cy="46" rx="3.5" ry="6" fill="#e8c040" opacity="0.9" />
      <ellipse cx="60" cy="48" rx="2" ry="3" fill="#fff8e0" opacity="0.8" />
      <line x1="60" y1="52" x2="60" y2="52" stroke="#c8a028" strokeWidth="3" strokeLinecap="round" />

      {/* Laurel leaves left */}
      <path d="M28 62 Q22 52 30 46 Q32 55 28 62Z" fill="#c8a028" opacity="0.7" />
      <path d="M31 70 Q24 62 30 55 Q34 64 31 70Z" fill="#c8a028" opacity="0.65" />
      <path d="M36 78 Q28 72 32 63 Q38 70 36 78Z" fill="#c8a028" opacity="0.6" />
      <path d="M43 83 Q36 80 38 71 Q44 77 43 83Z" fill="#c8a028" opacity="0.55" />

      {/* Laurel leaves right */}
      <path d="M92 62 Q98 52 90 46 Q88 55 92 62Z" fill="#c8a028" opacity="0.7" />
      <path d="M89 70 Q96 62 90 55 Q86 64 89 70Z" fill="#c8a028" opacity="0.65" />
      <path d="M84 78 Q92 72 88 63 Q82 70 84 78Z" fill="#c8a028" opacity="0.6" />
      <path d="M77 83 Q84 80 82 71 Q76 77 77 83Z" fill="#c8a028" opacity="0.55" />

      {/* Bottom ribbon */}
      <path d="M35 88 Q60 95 85 88 L82 93 Q60 100 38 93Z" fill="#8b1a1a" opacity="0.8" />
      <text
        x="60"
        y="93"
        textAnchor="middle"
        fontSize="5.5"
        fill="#f5e6b0"
        fontFamily="serif"
        fontWeight="bold"
        letterSpacing="0.5"
      >
        SMAN 1
      </text>

      {/* Top arc text */}
      <path id="topArc" d="M 18 60 A 42 42 0 0 1 102 60" fill="none" />
      <text fontSize="5.2" fill="#c8a028" fontFamily="serif" letterSpacing="1.2">
        <textPath href="#topArc" startOffset="12%">SEKOLAH MENENGAH ATAS NEGERI</textPath>
      </text>
    </svg>
  );
}
