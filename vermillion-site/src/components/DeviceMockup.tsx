"use client";

interface DeviceMockupProps {
  label: string;
  image?: string;
}

/* ── Abstract SVG mockup screens keyed by showcase label ── */

function DashboardMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#12121a" />
      {/* Sidebar */}
      <rect x="0" y="0" width="56" height="200" fill="#1a1a22" />
      <circle cx="28" cy="20" r="8" fill="#C03030" opacity="0.9" />
      <rect x="16" y="40" width="24" height="3" rx="1.5" fill="#3a3a4a" />
      <rect x="16" y="52" width="24" height="3" rx="1.5" fill="#3a3a4a" />
      <rect x="16" y="64" width="24" height="3" rx="1.5" fill="#3a3a4a" />
      <rect x="16" y="76" width="24" height="3" rx="1.5" fill="#3a3a4a" />
      {/* Top bar */}
      <rect x="56" y="0" width="264" height="28" fill="#1a1a22" />
      <rect x="68" y="10" width="60" height="8" rx="2" fill="#3a3a4a" />
      <circle cx="296" cy="14" r="6" fill="#3a3a4a" />
      {/* Stat cards row */}
      <rect x="68" y="40" width="56" height="36" rx="4" fill="#1a1a22" stroke="#2a2a38" strokeWidth="0.5" />
      <rect x="76" y="48" width="20" height="4" rx="1" fill="#3a3a4a" />
      <rect x="76" y="58" width="30" height="8" rx="1" fill="#C03030" opacity="0.7" />
      <rect x="136" y="40" width="56" height="36" rx="4" fill="#1a1a22" stroke="#2a2a38" strokeWidth="0.5" />
      <rect x="144" y="48" width="20" height="4" rx="1" fill="#3a3a4a" />
      <rect x="144" y="58" width="24" height="8" rx="1" fill="#C03030" opacity="0.5" />
      <rect x="204" y="40" width="56" height="36" rx="4" fill="#1a1a22" stroke="#2a2a38" strokeWidth="0.5" />
      <rect x="212" y="48" width="20" height="4" rx="1" fill="#3a3a4a" />
      <rect x="212" y="58" width="28" height="8" rx="1" fill="#C03030" opacity="0.6" />
      <rect x="272" y="40" width="40" height="36" rx="4" fill="#1a1a22" stroke="#2a2a38" strokeWidth="0.5" />
      <rect x="280" y="48" width="16" height="4" rx="1" fill="#3a3a4a" />
      <rect x="280" y="58" width="20" height="8" rx="1" fill="#C03030" opacity="0.4" />
      {/* Chart area */}
      <rect x="68" y="88" width="180" height="100" rx="4" fill="#1a1a22" stroke="#2a2a38" strokeWidth="0.5" />
      <polyline points="80,170 110,150 130,160 160,130 190,140 220,110 240,120" fill="none" stroke="#C03030" strokeWidth="2" opacity="0.8" />
      <line x1="80" y1="175" x2="240" y2="175" stroke="#3a3a4a" strokeWidth="0.5" />
      {/* Side list */}
      <rect x="260" y="88" width="52" height="100" rx="4" fill="#1a1a22" stroke="#2a2a38" strokeWidth="0.5" />
      <rect x="268" y="96" width="36" height="6" rx="1" fill="#3a3a4a" />
      <rect x="268" y="110" width="28" height="4" rx="1" fill="#3a3a4a" opacity="0.6" />
      <rect x="268" y="120" width="32" height="4" rx="1" fill="#3a3a4a" opacity="0.6" />
      <rect x="268" y="130" width="24" height="4" rx="1" fill="#3a3a4a" opacity="0.6" />
      <rect x="268" y="140" width="30" height="4" rx="1" fill="#3a3a4a" opacity="0.6" />
    </svg>
  );
}

function PdfMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#12121a" />
      {/* Page shadow */}
      <rect x="72" y="12" width="180" height="176" rx="2" fill="#1a1a22" opacity="0.6" />
      {/* Page */}
      <rect x="68" y="8" width="180" height="176" rx="2" fill="#1a1a22" stroke="#2a2a38" strokeWidth="0.5" />
      {/* Header bar */}
      <rect x="68" y="8" width="180" height="30" rx="2" fill="#C03030" opacity="0.85" />
      <rect x="82" y="16" width="50" height="5" rx="1" fill="#fff" opacity="0.9" />
      <rect x="82" y="26" width="30" height="3" rx="1" fill="#fff" opacity="0.5" />
      {/* Text lines */}
      <rect x="82" y="50" width="120" height="3" rx="1" fill="#3a3a4a" />
      <rect x="82" y="58" width="140" height="3" rx="1" fill="#3a3a4a" />
      <rect x="82" y="66" width="100" height="3" rx="1" fill="#3a3a4a" />
      <rect x="82" y="78" width="130" height="3" rx="1" fill="#3a3a4a" opacity="0.7" />
      <rect x="82" y="86" width="145" height="3" rx="1" fill="#3a3a4a" opacity="0.7" />
      <rect x="82" y="94" width="110" height="3" rx="1" fill="#3a3a4a" opacity="0.7" />
      {/* Divider */}
      <line x1="82" y1="108" x2="234" y2="108" stroke="#3a3a4a" strokeWidth="0.5" />
      {/* Table */}
      <rect x="82" y="114" width="152" height="8" rx="1" fill="#C03030" opacity="0.15" />
      <rect x="84" y="115" width="30" height="5" rx="1" fill="#3a3a4a" opacity="0.8" />
      <rect x="120" y="115" width="24" height="5" rx="1" fill="#3a3a4a" opacity="0.8" />
      <rect x="152" y="115" width="24" height="5" rx="1" fill="#3a3a4a" opacity="0.8" />
      <rect x="184" y="115" width="24" height="5" rx="1" fill="#3a3a4a" opacity="0.8" />
      {/* Table rows */}
      {[128, 138, 148].map((y) => (
        <g key={y}>
          <rect x="84" y={y} width="26" height="4" rx="1" fill="#3a3a4a" opacity="0.5" />
          <rect x="120" y={y} width="18" height="4" rx="1" fill="#3a3a4a" opacity="0.5" />
          <rect x="152" y={y} width="20" height="4" rx="1" fill="#3a3a4a" opacity="0.5" />
          <rect x="184" y={y} width="22" height="4" rx="1" fill="#3a3a4a" opacity="0.5" />
        </g>
      ))}
      {/* Signature area */}
      <line x1="82" y1="168" x2="160" y2="168" stroke="#3a3a4a" strokeWidth="0.5" strokeDasharray="3,2" />
      <rect x="82" y="172" width="40" height="3" rx="1" fill="#3a3a4a" opacity="0.4" />
    </svg>
  );
}

function ClientsMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#12121a" />
      {/* Search bar */}
      <rect x="24" y="12" width="272" height="24" rx="4" fill="#1a1a22" stroke="#2a2a38" strokeWidth="0.5" />
      <rect x="34" y="20" width="60" height="6" rx="2" fill="#3a3a4a" opacity="0.4" />
      <circle cx="284" cy="24" r="6" fill="#3a3a4a" opacity="0.3" />
      {/* Table header */}
      <rect x="24" y="46" width="272" height="18" rx="2" fill="#C03030" opacity="0.15" />
      <rect x="34" y="51" width="36" height="6" rx="1" fill="#3a3a4a" opacity="0.8" />
      <rect x="100" y="51" width="30" height="6" rx="1" fill="#3a3a4a" opacity="0.8" />
      <rect x="164" y="51" width="40" height="6" rx="1" fill="#3a3a4a" opacity="0.8" />
      <rect x="240" y="51" width="32" height="6" rx="1" fill="#3a3a4a" opacity="0.8" />
      {/* Data rows */}
      {[72, 96, 120, 144, 168].map((y, i) => (
        <g key={y}>
          <line x1="24" y1={y - 2} x2="296" y2={y - 2} stroke="#2a2a38" strokeWidth="0.5" />
          <circle cx="42" cy={y + 8} r="7" fill="#3a3a4a" opacity={0.4 + i * 0.05} />
          <rect x="56" y={y + 4} width={36 - i * 2} height="5" rx="1" fill="#3a3a4a" opacity="0.6" />
          <rect x="100" y={y + 4} width={24 + i * 2} height="5" rx="1" fill="#3a3a4a" opacity="0.5" />
          <rect x="164" y={y + 4} width={34 - i} height="5" rx="1" fill="#3a3a4a" opacity="0.5" />
          <rect x="240" y={y + 2} width="40" height="10" rx="3" fill={i === 0 ? "#C03030" : "#3a3a4a"} opacity={i === 0 ? 0.7 : 0.25} />
          <rect x={i === 0 ? 248 : 250} y={y + 5} width={i === 0 ? 24 : 20} height="4" rx="1" fill="#fff" opacity={i === 0 ? 0.8 : 0} />
        </g>
      ))}
    </svg>
  );
}

function ScheduleMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#12121a" />
      {/* Month header */}
      <rect x="24" y="10" width="272" height="22" rx="4" fill="#1a1a22" />
      <rect x="120" y="16" width="80" height="8" rx="2" fill="#3a3a4a" />
      <polygon points="40,20 48,16 48,24" fill="#3a3a4a" opacity="0.5" />
      <polygon points="280,20 272,16 272,24" fill="#3a3a4a" opacity="0.5" />
      {/* Day labels */}
      {["S", "M", "T", "W", "T", "F", "S"].map((_, i) => (
        <rect key={`dl${i}`} x={34 + i * 38} y="40" width="16" height="5" rx="1" fill="#3a3a4a" opacity="0.6" />
      ))}
      {/* Calendar grid */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => {
          const day = row * 7 + col - 1;
          if (day < 1 || day > 31) return null;
          const isHighlighted = [3, 7, 10, 14, 17, 21, 24, 28].includes(day);
          const isToday = day === 14;
          return (
            <g key={`d${day}`}>
              <rect
                x={28 + col * 38}
                y={52 + row * 28}
                width="28"
                height="22"
                rx="3"
                fill={isToday ? "#C03030" : isHighlighted ? "#C03030" : "#1a1a22"}
                opacity={isToday ? 0.85 : isHighlighted ? 0.2 : 1}
                stroke={isHighlighted && !isToday ? "#C03030" : "#2a2a38"}
                strokeWidth="0.5"
              />
              {isHighlighted && !isToday && (
                <circle cx={42 + col * 38} cy={68 + row * 28} r="1.5" fill="#C03030" opacity="0.7" />
              )}
            </g>
          );
        })
      )}
    </svg>
  );
}

function ProgramMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#12121a" />
      {/* Title bar */}
      <rect x="24" y="10" width="272" height="22" rx="4" fill="#1a1a22" />
      <rect x="34" y="16" width="80" height="8" rx="2" fill="#3a3a4a" />
      <rect x="244" y="14" width="40" height="12" rx="3" fill="#C03030" opacity="0.7" />
      {/* Section 1 - Training */}
      <rect x="24" y="40" width="272" height="14" rx="3" fill="#C03030" opacity="0.15" />
      <rect x="34" y="44" width="50" height="5" rx="1" fill="#C03030" opacity="0.7" />
      {/* Nested blocks */}
      <rect x="36" y="60" width="252" height="18" rx="3" fill="#1a1a22" stroke="#2a2a38" strokeWidth="0.5" />
      <rect x="46" y="65" width="40" height="5" rx="1" fill="#3a3a4a" />
      <rect x="200" y="65" width="24" height="6" rx="2" fill="#3a3a4a" opacity="0.3" />
      <rect x="230" y="65" width="24" height="6" rx="2" fill="#3a3a4a" opacity="0.3" />
      <rect x="260" y="65" width="20" height="6" rx="2" fill="#3a3a4a" opacity="0.3" />
      <rect x="36" y="82" width="252" height="18" rx="3" fill="#1a1a22" stroke="#2a2a38" strokeWidth="0.5" />
      <rect x="46" y="87" width="56" height="5" rx="1" fill="#3a3a4a" />
      <rect x="200" y="87" width="24" height="6" rx="2" fill="#3a3a4a" opacity="0.3" />
      <rect x="230" y="87" width="24" height="6" rx="2" fill="#3a3a4a" opacity="0.3" />
      <rect x="260" y="87" width="20" height="6" rx="2" fill="#3a3a4a" opacity="0.3" />
      {/* Section 2 - Nutrition */}
      <rect x="24" y="108" width="272" height="14" rx="3" fill="#C03030" opacity="0.15" />
      <rect x="34" y="112" width="44" height="5" rx="1" fill="#C03030" opacity="0.7" />
      <rect x="36" y="128" width="252" height="18" rx="3" fill="#1a1a22" stroke="#2a2a38" strokeWidth="0.5" />
      <rect x="46" y="133" width="48" height="5" rx="1" fill="#3a3a4a" />
      <rect x="150" y="133" width="30" height="5" rx="1" fill="#3a3a4a" opacity="0.4" />
      {/* Section 3 - Supplements */}
      <rect x="24" y="154" width="272" height="14" rx="3" fill="#C03030" opacity="0.15" />
      <rect x="34" y="158" width="56" height="5" rx="1" fill="#C03030" opacity="0.7" />
      <rect x="36" y="174" width="252" height="18" rx="3" fill="#1a1a22" stroke="#2a2a38" strokeWidth="0.5" />
      <rect x="46" y="179" width="44" height="5" rx="1" fill="#3a3a4a" />
      <rect x="150" y="179" width="36" height="5" rx="1" fill="#3a3a4a" opacity="0.4" />
    </svg>
  );
}

function SettingsMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#12121a" />
      {/* Header */}
      <rect x="24" y="12" width="272" height="20" rx="4" fill="#1a1a22" />
      <rect x="34" y="17" width="60" height="8" rx="2" fill="#3a3a4a" />
      {/* Toggle rows */}
      {[44, 72, 100, 128].map((y, i) => (
        <g key={y}>
          <rect x="24" y={y} width="272" height="22" rx="4" fill="#1a1a22" stroke="#2a2a38" strokeWidth="0.5" />
          <rect x="40" y={y + 7} width={50 + i * 10} height="6" rx="1" fill="#3a3a4a" opacity="0.7" />
          <rect
            x="264"
            y={y + 5}
            width="24"
            height="12"
            rx="6"
            fill={i === 0 || i === 2 ? "#C03030" : "#3a3a4a"}
            opacity={i === 0 || i === 2 ? 0.8 : 0.3}
          />
          <circle
            cx={i === 0 || i === 2 ? 282 : 272}
            cy={y + 11}
            r="4"
            fill="#fff"
            opacity={i === 0 || i === 2 ? 0.9 : 0.4}
          />
        </g>
      ))}
      {/* Cloud sync area */}
      <rect x="24" y="158" width="272" height="32" rx="4" fill="#1a1a22" stroke="#C03030" strokeWidth="0.5" opacity="0.8" />
      {/* Cloud icon */}
      <path
        d="M148,170 a8,8 0 0,1 16,0 a6,6 0 0,1 8,5.5 h-32 a6,6 0 0,1 8,-5.5z"
        fill="#C03030"
        opacity="0.6"
      />
      <rect x="140" y="179" width="40" height="4" rx="1" fill="#3a3a4a" opacity="0.5" />
    </svg>
  );
}

const MOCKUP_MAP: Record<string, React.FC> = {
  "Coach Dashboard": DashboardMockup,
  "Branded PDF Output": PdfMockup,
  "Client Management": ClientsMockup,
  "Weekly Schedule": ScheduleMockup,
  "Program Builder": ProgramMockup,
  "Settings & Themes": SettingsMockup,
};

/* Fallback for unknown labels */
function FallbackMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#12121a" />
      <rect x="60" y="40" width="200" height="120" rx="8" fill="#1a1a22" stroke="#2a2a38" strokeWidth="0.5" />
      <rect x="80" y="60" width="80" height="8" rx="2" fill="#3a3a4a" />
      <rect x="80" y="80" width="160" height="4" rx="1" fill="#3a3a4a" opacity="0.5" />
      <rect x="80" y="90" width="140" height="4" rx="1" fill="#3a3a4a" opacity="0.5" />
      <rect x="80" y="100" width="120" height="4" rx="1" fill="#3a3a4a" opacity="0.5" />
      <rect x="80" y="120" width="60" height="16" rx="4" fill="#C03030" opacity="0.6" />
    </svg>
  );
}

export default function DeviceMockup({ label, image }: DeviceMockupProps) {
  const MockupComponent = MOCKUP_MAP[label] || FallbackMockup;

  return (
    <div className="group">
      {/* Outer container with metallic frame gradient and screen glow */}
      <div
        className="relative rounded-hero overflow-hidden bg-surface-2 shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_40px_rgba(192,48,48,0.06)] transition-all duration-500 group-hover:shadow-[0_12px_50px_rgba(0,0,0,0.5),0_0_60px_rgba(192,48,48,0.12)] group-hover:scale-[1.02]"
        style={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderImage:
            "linear-gradient(to bottom, rgba(42,42,56,0.5) 0%, rgba(42,42,56,0.8) 100%) 1",
        }}
      >
        {/* Hover border brightening overlay */}
        <div
          className="absolute inset-0 rounded-hero pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(192,48,48,0.2)",
          }}
          aria-hidden="true"
        />

        {/* Top bezel */}
        <div
          className="h-6 bg-surface-3/60 flex items-center px-3 gap-1.5"
          aria-hidden="true"
        >
          {/* First dot pulses */}
          <div className="w-2 h-2 rounded-full bg-border/60 animate-glow-pulse" />
          <div className="w-2 h-2 rounded-full bg-border/60" />
          <div className="w-2 h-2 rounded-full bg-border/60" />
        </div>

        {/* Screen */}
        <div className="aspect-[16/10] bg-surface-1 relative overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={label}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <MockupComponent />
          )}

          {/* Scan-line animation */}
          <div
            className="absolute left-0 w-full h-px bg-white/[0.05] pointer-events-none animate-scan-line z-[2]"
            style={{ top: "-2px" }}
            aria-hidden="true"
          />

          {/* Reflection / shine effect */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Caption */}
      <p className="mt-4 text-sm text-text-secondary text-center font-body tracking-wide">
        {label}
      </p>
    </div>
  );
}
