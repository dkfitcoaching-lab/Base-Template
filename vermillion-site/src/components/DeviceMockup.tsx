"use client";

interface DeviceMockupProps {
  label: string;
  image?: string;
  description?: string;
}

/* ── Abstract SVG mockup screens keyed by showcase label ── */

function DashboardMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#0C0C14" />
      {/* Sidebar */}
      <rect x="0" y="0" width="48" height="200" fill="#14141E" />
      <rect x="0" y="32" width="2" height="10" rx="1" fill="#B42B2B" />
      {[32, 52, 72, 92, 112].map((y, i) => (
        <rect key={`si${i}`} x="14" y={y} width="20" height="8" rx="2" fill={i === 0 ? "#B42B2B" : "#2A2A38"} opacity={i === 0 ? 0.8 : 0.5} />
      ))}
      {/* Top bar */}
      <rect x="48" y="0" width="272" height="28" fill="#1C1C28" />
      <circle cx="64" cy="14" r="8" fill="#B42B2B" opacity="0.9" />
      <text x="64" y="14" fill="#E8E8F0" fontSize="6" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">M</text>
      <text x="78" y="11" fill="#E8E8F0" fontSize="5.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Big Mike Ely</text>
      <text x="78" y="19" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Head Coach</text>
      <rect x="296" y="8" width="12" height="12" rx="2" fill="#2A2A38" />
      <circle cx="302" cy="14" r="2" fill="#585868" />
      {/* Greeting */}
      <text x="60" y="40" fill="#9898A8" fontSize="5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Good morning, Mike</text>
      {/* 2x2 stat cards */}
      {/* Card 1 - Sessions */}
      <rect x="60" y="48" width="62" height="34" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="68" y="58" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">SESSIONS</text>
      <text x="68" y="71" fill="#E8E8F0" fontSize="10" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">12</text>
      {/* Card 2 - Revenue */}
      <rect x="128" y="48" width="62" height="34" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="136" y="58" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">REVENUE</text>
      <text x="136" y="71" fill="#10B981" fontSize="10" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">$4,280</text>
      {/* Card 3 - Gym Split */}
      <rect x="60" y="86" width="62" height="34" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="68" y="96" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">GYM SPLIT</text>
      <text x="68" y="109" fill="#D44040" fontSize="10" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">-$856</text>
      {/* Card 4 - Your Take */}
      <rect x="128" y="86" width="62" height="34" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="136" y="96" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">YOUR TAKE</text>
      <text x="136" y="109" fill="#E8E8F0" fontSize="10" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">$3,424</text>
      {/* Line chart */}
      <rect x="200" y="48" width="110" height="72" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="208" y="58" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">REVENUE TREND</text>
      {/* Grid lines */}
      <line x1="208" y1="68" x2="302" y2="68" stroke="#2A2A38" strokeWidth="0.3" />
      <line x1="208" y1="80" x2="302" y2="80" stroke="#2A2A38" strokeWidth="0.3" />
      <line x1="208" y1="92" x2="302" y2="92" stroke="#2A2A38" strokeWidth="0.3" />
      <line x1="208" y1="104" x2="302" y2="104" stroke="#2A2A38" strokeWidth="0.3" />
      {/* Chart line */}
      <polyline points="210,100 222,94 234,96 246,86 258,82 270,74 282,78 294,66" fill="none" stroke="#B42B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="210,100 222,94 234,96 246,86 258,82 270,74 282,78 294,66" fill="url(#chartGrad)" stroke="none" opacity="0.15" />
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B42B2B" />
          <stop offset="100%" stopColor="#0C0C14" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Bottom summary bar */}
      <rect x="60" y="126" width="250" height="24" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="68" y="135" fill="#9898A8" fontSize="4.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">This Week</text>
      <text x="120" y="135" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Clients: 8</text>
      <text x="170" y="135" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Sessions: 12</text>
      <text x="225" y="135" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Completion: 92%</text>
      <text x="68" y="144" fill="#585868" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Next: Sarah M. @ 2:00 PM · Push Day A</text>
    </svg>
  );
}

function PdfMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#0C0C14" />
      {/* Page background */}
      <rect x="40" y="8" width="240" height="184" rx="3" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      {/* Emerald left border */}
      <rect x="40" y="8" width="2" height="184" fill="#10B981" />
      {/* Header area */}
      <text x="54" y="24" fill="#10B981" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold" letterSpacing="1">C RESISTANCE TRAINING</text>
      <text x="54" y="36" fill="#E8E8F0" fontSize="8" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">Day 3: Shoulders</text>
      <text x="54" y="46" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Wednesday · 60 min · Moderate carb day</text>
      <line x1="54" y1="52" x2="268" y2="52" stroke="#2A2A38" strokeWidth="0.5" />
      {/* Exercise 1 */}
      <circle cx="62" cy="64" r="6" fill="#10B981" opacity="0.2" />
      <text x="62" y="64" fill="#10B981" fontSize="5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">1</text>
      <text x="74" y="62" fill="#E8E8F0" fontSize="5.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">Seated Dumbbell Press</text>
      <rect x="180" y="58" width="38" height="8" rx="3" fill="#10B981" opacity="0.15" />
      <text x="199" y="62" fill="#10B981" fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">DELTOIDS</text>
      <text x="74" y="72" fill="#10B981" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">4 × 8-10 · 90s rest</text>
      {/* Exercise 2 */}
      <circle cx="62" cy="90" r="6" fill="#10B981" opacity="0.2" />
      <text x="62" y="90" fill="#10B981" fontSize="5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">2</text>
      <text x="74" y="88" fill="#E8E8F0" fontSize="5.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">Lateral Raises</text>
      <rect x="155" y="84" width="44" height="8" rx="3" fill="#10B981" opacity="0.15" />
      <text x="177" y="88" fill="#10B981" fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">SIDE DELTS</text>
      <text x="74" y="98" fill="#10B981" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">3 × 12-15 · 60s rest</text>
      {/* Exercise 3 */}
      <circle cx="62" cy="116" r="6" fill="#10B981" opacity="0.2" />
      <text x="62" y="116" fill="#10B981" fontSize="5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">3</text>
      <text x="74" y="114" fill="#E8E8F0" fontSize="5.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">Face Pulls</text>
      <rect x="140" y="110" width="46" height="8" rx="3" fill="#10B981" opacity="0.15" />
      <text x="163" y="114" fill="#10B981" fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">REAR DELTS</text>
      <text x="74" y="124" fill="#10B981" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">3 × 15-20 · 45s rest</text>
      {/* Exercise 4 */}
      <circle cx="62" cy="142" r="6" fill="#10B981" opacity="0.2" />
      <text x="62" y="142" fill="#10B981" fontSize="5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">4</text>
      <text x="74" y="140" fill="#E8E8F0" fontSize="5.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">Shrugs</text>
      <rect x="118" y="136" width="30" height="8" rx="3" fill="#10B981" opacity="0.15" />
      <text x="133" y="140" fill="#10B981" fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">TRAPS</text>
      <text x="74" y="150" fill="#10B981" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">4 × 10-12 · 60s rest</text>
      {/* Footer */}
      <line x1="54" y1="172" x2="268" y2="172" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="54" y="182" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">FORGE · fitnessforge.ai</text>
      <text x="268" y="182" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" textAnchor="end">PAGE 4</text>
    </svg>
  );
}

function ClientsMockup() {
  const clients = [
    { init: "S", name: "Sarah Mitchell", program: "Push/Pull/Legs", date: "Mar 27", status: "Active", color: "#B42B2B" },
    { init: "J", name: "James Cooper", program: "Upper/Lower", date: "Mar 27", status: "Active", color: "#B42B2B" },
    { init: "R", name: "Rachel Kim", program: "Full Body", date: "Mar 28", status: "Review", color: "#D4A040" },
    { init: "T", name: "Tyler Brooks", program: "Push/Pull/Legs", date: "—", status: "Paused", color: "#585868" },
    { init: "M", name: "Maria Santos", program: "Cut Program", date: "—", status: "Paused", color: "#585868" },
  ];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#0C0C14" />
      {/* Search bar */}
      <rect x="16" y="8" width="288" height="20" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="30" y="18" fill="#585868" fontSize="4.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Search clients...</text>
      <rect x="284" y="13" width="12" height="10" rx="2" fill="#2A2A38" />
      {/* Column headers */}
      <rect x="16" y="34" width="288" height="14" rx="2" fill="#1C1C28" />
      <text x="44" y="41" fill="#9898A8" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">CLIENT</text>
      <text x="130" y="41" fill="#9898A8" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">PROGRAM</text>
      <text x="210" y="41" fill="#9898A8" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">NEXT SESSION</text>
      <text x="274" y="41" fill="#9898A8" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">STATUS</text>
      {/* Data rows */}
      {clients.map((c, i) => {
        const y = 52 + i * 28;
        return (
          <g key={`row${i}`}>
            <rect x="16" y={y} width="288" height="26" rx="0" fill={i % 2 === 0 ? "#14141E" : "#0C0C14"} />
            <line x1="16" y1={y + 26} x2="304" y2={y + 26} stroke="#2A2A38" strokeWidth="0.3" />
            {/* Avatar */}
            <circle cx="30" cy={y + 13} r="7" fill="#1C1C28" stroke="#2A2A38" strokeWidth="0.5" />
            <text x="30" y={y + 13} fill="#E8E8F0" fontSize="5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">{c.init}</text>
            {/* Name */}
            <text x="44" y={y + 13} fill="#E8E8F0" fontSize="5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{c.name}</text>
            {/* Program */}
            <text x="130" y={y + 13} fill="#9898A8" fontSize="4.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{c.program}</text>
            {/* Date */}
            <text x="210" y={y + 13} fill="#9898A8" fontSize="4.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{c.date}</text>
            {/* Status badge */}
            <rect x="260" y={y + 7} width="36" height="12" rx="6" fill={c.color} opacity={c.status === "Paused" ? 0.25 : 0.2} />
            <text x="278" y={y + 13} fill={c.color} fontSize="4" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold" opacity={c.status === "Paused" ? 0.6 : 1}>{c.status}</text>
          </g>
        );
      })}
    </svg>
  );
}

function ScheduleMockup() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const sessions = [
    { col: 0, row: 0, label: "SM 6a", opacity: 0.9 },
    { col: 0, row: 2, label: "JC 10a", opacity: 0.7 },
    { col: 1, row: 1, label: "RK 8a", opacity: 0.8 },
    { col: 1, row: 3, label: "TB 12p", opacity: 0.6 },
    { col: 2, row: 0, label: "SM 6a", opacity: 0.9 },
    { col: 2, row: 2, label: "MS 10a", opacity: 0.7 },
    { col: 3, row: 1, label: "JC 8a", opacity: 0.8 },
    { col: 3, row: 4, label: "RK 2p", opacity: 0.6 },
    { col: 4, row: 0, label: "SM 6a", opacity: 0.9 },
    { col: 4, row: 3, label: "TB 12p", opacity: 0.5 },
  ];
  const todayCol = 2; // Wednesday
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#0C0C14" />
      {/* Month header */}
      <rect x="16" y="6" width="288" height="20" rx="4" fill="#1C1C28" />
      <text x="160" y="16" fill="#E8E8F0" fontSize="6" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">March 2026</text>
      <polygon points="40,16 34,13 34,19" fill="#585868" />
      <polygon points="280,16 286,13 286,19" fill="#585868" />
      {/* Day headers */}
      {days.map((d, i) => {
        const x = 28 + i * 40;
        return (
          <text key={`dh${i}`} x={x + 16} y="36" fill={i === todayCol ? "#D44040" : "#9898A8"} fontSize="5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">{d}</text>
        );
      })}
      <line x1="16" y1="42" x2="304" y2="42" stroke="#2A2A38" strokeWidth="0.5" />
      {/* Today column highlight */}
      <rect x={28 + todayCol * 40} y="42" width="32" height="150" fill="#B42B2B" opacity="0.04" />
      <rect x={28 + todayCol * 40} y="42" width="32" height="150" fill="none" stroke="#B42B2B" strokeWidth="0.5" opacity="0.3" />
      {/* Time grid rows */}
      {[0, 1, 2, 3, 4, 5].map((row) => {
        const y = 48 + row * 24;
        const hours = ["6 AM", "8 AM", "10 AM", "12 PM", "2 PM", "4 PM"];
        return (
          <g key={`tr${row}`}>
            <line x1="16" y1={y} x2="304" y2={y} stroke="#2A2A38" strokeWidth="0.3" opacity="0.5" />
            <text x="20" y={y + 6} fill="#585868" fontSize="3" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{hours[row]}</text>
          </g>
        );
      })}
      {/* Session blocks */}
      {sessions.map((s, i) => {
        const x = 30 + s.col * 40;
        const y = 49 + s.row * 24;
        return (
          <g key={`ses${i}`}>
            <rect x={x} y={y} width="28" height="18" rx="3" fill="#B42B2B" opacity={s.opacity * 0.25} stroke="#B42B2B" strokeWidth="0.5" />
            <text x={x + 14} y={y + 9} fill="#D44040" fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold" opacity={s.opacity}>{s.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function ProgramMockup() {
  const programs = [
    { name: "Push/Pull/Legs", active: true },
    { name: "Upper/Lower", active: false },
    { name: "Full Body", active: false },
  ];
  const exercises = [
    { num: "1", name: "Bench Press", sets: "4×8", rest: "120s" },
    { num: "2", name: "Incline DB Press", sets: "3×10", rest: "90s" },
    { num: "3", name: "Cable Flyes", sets: "3×12", rest: "60s" },
    { num: "4", name: "Tricep Pushdown", sets: "3×15", rest: "60s" },
  ];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#0C0C14" />
      {/* Left panel - program list */}
      <rect x="0" y="0" width="120" height="200" fill="#14141E" />
      <line x1="120" y1="0" x2="120" y2="200" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="12" y="16" fill="#9898A8" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold" letterSpacing="0.5">PROGRAMS</text>
      {programs.map((p, i) => {
        const y = 28 + i * 28;
        return (
          <g key={`prog${i}`}>
            <rect x="0" y={y} width="120" height="24" fill={p.active ? "#1C1C28" : "transparent"} />
            {p.active && <rect x="0" y={y} width="2" height="24" fill="#B42B2B" />}
            <text x="14" y={y + 12} fill={p.active ? "#E8E8F0" : "#585868"} fontSize="5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{p.name}</text>
            <text x="14" y={y + 19} fill="#585868" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{p.active ? "6 days · 4 weeks" : "4 days · 6 weeks"}</text>
          </g>
        );
      })}
      {/* Right panel - program detail */}
      <rect x="120" y="0" width="200" height="28" fill="#1C1C28" />
      <text x="132" y="14" fill="#E8E8F0" fontSize="6" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">Push Day A</text>
      <text x="132" y="22" fill="#585868" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Chest, Shoulders, Triceps</text>
      {/* Exercise list */}
      {exercises.map((e, i) => {
        const y = 36 + i * 28;
        return (
          <g key={`ex${i}`}>
            <rect x="126" y={y} width="188" height="24" rx="3" fill="#14141E" stroke="#2A2A38" strokeWidth="0.3" />
            {/* Drag handle dots */}
            <circle cx="133" cy={y + 10} r="0.8" fill="#585868" />
            <circle cx="133" cy={y + 13} r="0.8" fill="#585868" />
            <circle cx="136" cy={y + 10} r="0.8" fill="#585868" />
            <circle cx="136" cy={y + 13} r="0.8" fill="#585868" />
            {/* Number */}
            <text x="146" y={y + 12} fill="#585868" fontSize="5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">{e.num}</text>
            {/* Exercise name */}
            <text x="156" y={y + 9} fill="#E8E8F0" fontSize="5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{e.name}</text>
            <text x="156" y={y + 17} fill="#585868" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{e.sets} · {e.rest} rest</text>
            {/* Sets badges */}
            <rect x="270" y={y + 5} width="20" height="10" rx="3" fill="#1C1C28" stroke="#2A2A38" strokeWidth="0.3" />
            <text x="280" y={y + 10} fill="#9898A8" fontSize="4" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">{e.sets}</text>
          </g>
        );
      })}
      {/* Add Exercise button */}
      <rect x="126" y="150" width="188" height="20" rx="4" fill="transparent" stroke="#B42B2B" strokeWidth="0.8" strokeDasharray="3,2" />
      <text x="220" y="160" fill="#B42B2B" fontSize="4.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">+ Add Exercise</text>
    </svg>
  );
}

function SettingsMockup() {
  const navItems = [
    { label: "Profile", active: false },
    { label: "Branding", active: true },
    { label: "Billing", active: false },
    { label: "Notifications", active: false },
  ];
  const toggles = [
    { label: "Dark Mode", on: true },
    { label: "White Label", on: true },
    { label: "Custom Domain", on: false },
  ];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#0C0C14" />
      {/* Left nav panel */}
      <rect x="0" y="0" width="100" height="200" fill="#14141E" />
      <line x1="100" y1="0" x2="100" y2="200" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="12" y="16" fill="#9898A8" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold" letterSpacing="0.5">SETTINGS</text>
      {navItems.map((item, i) => {
        const y = 28 + i * 24;
        return (
          <g key={`nav${i}`}>
            <rect x="4" y={y} width="92" height="20" rx="3" fill={item.active ? "#B42B2B" : "transparent"} opacity={item.active ? 0.2 : 1} />
            {item.active && <rect x="4" y={y} width="2" height="20" rx="1" fill="#B42B2B" />}
            <text x="16" y={y + 10} fill={item.active ? "#D44040" : "#585868"} fontSize="5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{item.label}</text>
          </g>
        );
      })}
      {/* Right panel - branding settings */}
      <text x="114" y="16" fill="#E8E8F0" fontSize="6" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">Branding</text>
      {/* Color Theme label */}
      <text x="114" y="34" fill="#9898A8" fontSize="4.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">Color Theme</text>
      {/* Theme card 1 - Wild (selected) */}
      <rect x="114" y="42" width="86" height="44" rx="4" fill="#14141E" stroke="#B42B2B" strokeWidth="1" />
      <rect x="118" y="46" width="78" height="24" rx="3" fill="#1C1C28" />
      <circle cx="136" cy="58" r="5" fill="#B42B2B" />
      <rect x="148" y="54" width="30" height="3" rx="1" fill="#2A2A38" />
      <rect x="148" y="60" width="20" height="2" rx="1" fill="#2A2A38" opacity="0.5" />
      <text x="157" y="80" fill="#E8E8F0" fontSize="4.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">Wild</text>
      {/* Checkmark on selected */}
      <circle cx="192" cy="48" r="3" fill="#B42B2B" />
      <polyline points="190,48 191.5,49.5 194,46.5" fill="none" stroke="#E8E8F0" strokeWidth="0.8" strokeLinecap="round" />
      {/* Theme card 2 - Ocean */}
      <rect x="208" y="42" width="86" height="44" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <rect x="212" y="46" width="78" height="24" rx="3" fill="#1C1C28" />
      <circle cx="230" cy="58" r="5" fill="#4A90D9" />
      <rect x="242" y="54" width="30" height="3" rx="1" fill="#2A2A38" />
      <rect x="242" y="60" width="20" height="2" rx="1" fill="#2A2A38" opacity="0.5" />
      <text x="251" y="80" fill="#9898A8" fontSize="4.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">Ocean</text>
      {/* Toggle rows */}
      {toggles.map((t, i) => {
        const y = 96 + i * 26;
        return (
          <g key={`tog${i}`}>
            <rect x="114" y={y} width="180" height="22" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.3" />
            <text x="126" y={y + 11} fill="#E8E8F0" fontSize="4.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{t.label}</text>
            {/* Toggle pill */}
            <rect x="270" y={y + 5} width="18" height="10" rx="5" fill={t.on ? "#B42B2B" : "#2A2A38"} />
            <circle cx={t.on ? 283 : 276} cy={y + 10} r="3.5" fill={t.on ? "#E8E8F0" : "#585868"} />
          </g>
        );
      })}
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
      <rect width="320" height="200" fill="#0C0C14" />
      <rect x="60" y="40" width="200" height="120" rx="8" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <rect x="80" y="60" width="80" height="8" rx="2" fill="#585868" />
      <rect x="80" y="80" width="160" height="4" rx="1" fill="#585868" opacity="0.5" />
      <rect x="80" y="90" width="140" height="4" rx="1" fill="#585868" opacity="0.5" />
      <rect x="80" y="100" width="120" height="4" rx="1" fill="#585868" opacity="0.5" />
      <rect x="80" y="120" width="60" height="16" rx="4" fill="#B42B2B" opacity="0.6" />
    </svg>
  );
}

export default function DeviceMockup({ label, image, description }: DeviceMockupProps) {
  const MockupComponent = MOCKUP_MAP[label] || FallbackMockup;

  return (
    <div className="group">
      {/* Outer container with metallic frame gradient and screen glow */}
      <div
        className="relative rounded-hero overflow-hidden bg-surface-2 shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_40px_rgba(180,43,43,0.06)] transition-all duration-500 group-hover:shadow-[0_12px_50px_rgba(0,0,0,0.5),0_0_60px_rgba(180,43,43,0.12)] group-hover:scale-[1.02]"
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
            boxShadow: "inset 0 0 0 1px rgba(180,43,43,0.2)",
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
      <p className="mt-4 text-sm text-text-primary text-center font-heading font-semibold tracking-wide">
        {label}
      </p>
      {description && (
        <p className="mt-1 text-xs text-text-secondary text-center font-body leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
