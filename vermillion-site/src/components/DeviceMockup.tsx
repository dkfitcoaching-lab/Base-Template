"use client";

interface DeviceMockupProps {
  label: string;
  image?: string;
  description?: string;
}

/* ── Abstract SVG mockup screens keyed by showcase label ── */

function CoachingPlatformMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="coachGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF1744" />
          <stop offset="100%" stopColor="#080808" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="silverBar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#333" />
          <stop offset="50%" stopColor="#555" />
          <stop offset="100%" stopColor="#333" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="#080808" />
      {/* Sidebar */}
      <rect x="0" y="0" width="44" height="200" fill="#0C0C0C" />
      <rect x="0" y="32" width="2" height="12" rx="1" fill="#FF1744" />
      {[32, 52, 72, 92, 112].map((y, i) => (
        <rect key={`si${i}`} x="12" y={y} width="20" height="6" rx="3" fill={i === 0 ? "#FF1744" : "#1A1A1A"} opacity={i === 0 ? 1 : 0.6} />
      ))}
      {/* Top bar */}
      <rect x="44" y="0" width="276" height="26" fill="#0E0E0E" />
      <rect x="44" y="26" width="276" height="0.5" fill="url(#silverBar)" opacity="0.3" />
      <circle cx="60" cy="13" r="7" fill="#FF1744" opacity="0.9" />
      <text x="60" y="13" fill="#fff" fontSize="5.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">A</text>
      <text x="74" y="10" fill="#E0E0E0" fontSize="5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="600">Dashboard</text>
      <text x="74" y="18" fill="#666" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Administrator</text>
      {/* Stat cards */}
      {[
        { x: 54, label: "PROJECTS", value: "24", color: "#E0E0E0" },
        { x: 122, label: "REVENUE", value: "$4,280", color: "#FF1744" },
        { x: 190, label: "CLIENTS", value: "48", color: "#E0E0E0" },
        { x: 258, label: "RETENTION", value: "94%", color: "#FF1744" },
      ].map((s, i) => (
        <g key={`sc${i}`}>
          <rect x={s.x} y="34" width="60" height="30" rx="4" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
          <text x={s.x + 8} y="44" fill="#666" fontSize="3" fontFamily="system-ui, sans-serif" dominantBaseline="middle" letterSpacing="0.8">{s.label}</text>
          <text x={s.x + 8} y="56" fill={s.color} fontSize="9" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">{s.value}</text>
        </g>
      ))}
      {/* Chart */}
      <rect x="54" y="72" width="256" height="80" rx="4" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
      <text x="62" y="82" fill="#666" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" letterSpacing="0.5">REVENUE TREND</text>
      {[90, 102, 114, 126, 138].map((y) => (
        <line key={`gl${y}`} x1="62" y1={y} x2="302" y2={y} stroke="#1A1A1A" strokeWidth="0.3" />
      ))}
      <polyline points="66,132 86,126 106,128 126,118 146,112 166,116 186,106 206,100 226,96 246,92 266,94 286,86 302,80" fill="none" stroke="#FF1744" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="66,132 86,126 106,128 126,118 146,112 166,116 186,106 206,100 226,96 246,92 266,94 286,86 302,80 302,142 66,142" fill="url(#coachGrad)" stroke="none" opacity="0.12" />
      {/* Bottom bar */}
      <rect x="54" y="160" width="256" height="28" rx="4" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
      <text x="64" y="172" fill="#999" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="600">This Week</text>
      <text x="130" y="172" fill="#666" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Clients: 8</text>
      <text x="195" y="172" fill="#666" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Sessions: 12</text>
      <text x="265" y="172" fill="#FF1744" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">92% complete</text>
      <text x="64" y="182" fill="#555" fontSize="3" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Next: Sarah M. @ 2:00 PM</text>
    </svg>
  );
}

function AnalyticsDashboardMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF1744" />
          <stop offset="100%" stopColor="#080808" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="#080808" />
      {/* Sidebar */}
      <rect x="0" y="0" width="42" height="200" fill="#0C0C0C" />
      <rect x="42" y="0" width="0.5" height="200" fill="#1A1A1A" />
      <rect x="0" y="28" width="2" height="10" rx="1" fill="#FF1744" />
      {[28, 48, 68, 88, 108].map((y, i) => (
        <rect key={`an${i}`} x="11" y={y} width="20" height="6" rx="3" fill={i === 0 ? "#FF1744" : "#1A1A1A"} opacity={i === 0 ? 1 : 0.5} />
      ))}
      {/* Top bar */}
      <rect x="42" y="0" width="278" height="24" fill="#0E0E0E" />
      <text x="54" y="12" fill="#E0E0E0" fontSize="5.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">Analytics</text>
      {/* KPI cards */}
      {[
        { label: "MRR", value: "$42.8K", color: "#FF1744", change: "+12%" },
        { label: "USERS", value: "3,847", color: "#C0C0C0", change: "+8%" },
        { label: "CHURN", value: "1.2%", color: "#FF1744", change: "-0.3%" },
        { label: "NPS", value: "72", color: "#C0C0C0", change: "+5" },
      ].map((kpi, i) => {
        const x = 50 + i * 66;
        return (
          <g key={`kpi${i}`}>
            <rect x={x} y="30" width="60" height="34" rx="4" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
            <text x={x + 8} y="40" fill="#666" fontSize="3" fontFamily="system-ui, sans-serif" dominantBaseline="middle" letterSpacing="0.8">{kpi.label}</text>
            <text x={x + 8} y="51" fill={kpi.color} fontSize="8.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">{kpi.value}</text>
            <text x={x + 8} y="59" fill="#666" fontSize="3" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{kpi.change}</text>
          </g>
        );
      })}
      {/* Chart */}
      <rect x="50" y="70" width="262" height="92" rx="4" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
      <text x="58" y="80" fill="#666" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" letterSpacing="0.5">REVENUE OVER TIME</text>
      {[90, 105, 120, 135].map((y) => (
        <line key={`gl${y}`} x1="58" y1={y} x2="304" y2={y} stroke="#1A1A1A" strokeWidth="0.3" />
      ))}
      <polyline points="62,132 82,126 102,128 122,118 142,110 162,115 182,106 202,100 222,96 242,91 262,93 282,86 302,80" fill="none" stroke="#FF1744" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="62,132 82,126 102,128 122,118 142,110 162,115 182,106 202,100 222,96 242,91 262,93 282,86 302,80 302,152 62,152" fill="url(#analyticsGrad)" stroke="none" opacity="0.1" />
      {/* Live indicator */}
      <rect x="50" y="168" width="262" height="22" rx="4" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
      <circle cx="62" cy="179" r="3" fill="#FF1744" opacity="0.7" />
      <text x="70" y="179" fill="#FF1744" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Live</text>
      <text x="100" y="179" fill="#555" fontSize="3" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Updated 2 minutes ago</text>
    </svg>
  );
}

function MemberPortalMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#080808" />
      {/* Header */}
      <rect x="0" y="0" width="320" height="26" fill="#0E0E0E" />
      <rect x="16" y="7" width="22" height="12" rx="2" fill="#FF1744" />
      <text x="27" y="13" fill="#fff" fontSize="5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">V</text>
      <text x="46" y="13" fill="#999" fontSize="4.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Welcome back, James</text>
      {/* Profile card */}
      <rect x="16" y="34" width="140" height="74" rx="6" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
      <circle cx="86" cy="52" r="11" fill="#111" stroke="#C0C0C0" strokeWidth="0.6" />
      <text x="86" y="52" fill="#C0C0C0" fontSize="7" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">JC</text>
      <rect x="56" y="69" width="60" height="5" rx="2.5" fill="#1A1A1A" />
      <rect x="60" y="78" width="52" height="12" rx="6" fill="rgba(255,23,68,0.1)" stroke="#FF1744" strokeWidth="0.4" />
      <text x="86" y="84" fill="#FF1744" fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">PLATINUM</text>
      <text x="56" y="100" fill="#555" fontSize="3" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Member since Jan 2025</text>
      {/* Activity feed */}
      <rect x="164" y="34" width="140" height="74" rx="6" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
      <text x="176" y="46" fill="#888" fontSize="3" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold" letterSpacing="0.8">RECENT ACTIVITY</text>
      {[
        { text: "Payment processed", time: "2h", color: "#FF1744" },
        { text: "Membership renewed", time: "1d", color: "#C0C0C0" },
        { text: "Content unlocked", time: "3d", color: "#888" },
      ].map((a, i) => (
        <g key={`act${i}`}>
          <rect x="176" y={56 + i * 16} width="3" height="3" rx="1.5" fill={a.color} />
          <text x="184" y={58 + i * 16} fill="#C0C0C0" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{a.text}</text>
          <text x="296" y={58 + i * 16} fill="#555" fontSize="3" fontFamily="system-ui, sans-serif" textAnchor="end" dominantBaseline="middle">{a.time}</text>
        </g>
      ))}
      {/* Actions */}
      <rect x="16" y="116" width="288" height="28" rx="4" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
      {["View Content", "Manage Billing", "Get Support"].map((btn, i) => (
        <g key={`btn${i}`}>
          <rect x={24 + i * 96} y="122" width="84" height="16" rx="4" fill={i === 0 ? "#FF1744" : "#111"} stroke={i === 0 ? "none" : "#1A1A1A"} strokeWidth="0.3" />
          <text x={66 + i * 96} y="130" fill={i === 0 ? "#fff" : "#888"} fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight={i === 0 ? "bold" : "normal"}>{btn}</text>
        </g>
      ))}
      {/* Stats */}
      <rect x="16" y="152" width="288" height="36" rx="4" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
      {[
        { x: 60, v: "127", l: "Days Active", c: "#E0E0E0" },
        { x: 160, v: "24", l: "Resources", c: "#FF1744" },
        { x: 260, v: "∞", l: "Access", c: "#C0C0C0" },
      ].map((s) => (
        <g key={s.l}>
          <text x={s.x} y="168" fill={s.c} fontSize="7" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">{s.v}</text>
          <text x={s.x} y="180" fill="#555" fontSize="3" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">{s.l}</text>
        </g>
      ))}
    </svg>
  );
}

function ECommerceMockup() {
  const products = [
    { name: "Premium Watch", price: "$2,490", y: 50 },
    { name: "Leather Bag", price: "$1,850", y: 50 },
    { name: "Silk Scarf", price: "$680", y: 118 },
    { name: "Sunglasses", price: "$920", y: 118 },
  ];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#080808" />
      <rect x="0" y="0" width="320" height="24" fill="#0E0E0E" />
      <text x="16" y="12" fill="#E0E0E0" fontSize="5.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold" letterSpacing="2">LUXE</text>
      <rect x="80" y="5" width="140" height="14" rx="7" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
      <text x="96" y="12" fill="#555" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Search products...</text>
      {/* Category pills */}
      {["All", "New", "Accessories", "Sale"].map((cat, i) => (
        <g key={`cat${i}`}>
          <rect x={16 + i * 60} y="30" width={i === 0 ? 30 : 50} height="14" rx="7" fill={i === 0 ? "#FF1744" : "#0C0C0C"} stroke={i === 0 ? "none" : "#1A1A1A"} strokeWidth="0.5" />
          <text x={16 + i * 60 + (i === 0 ? 15 : 25)} y="37" fill={i === 0 ? "#fff" : "#666"} fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">{cat}</text>
        </g>
      ))}
      {/* Product grid */}
      {products.map((p, i) => {
        const x = 16 + (i % 2) * 148;
        const y = p.y;
        return (
          <g key={`prod${i}`}>
            <rect x={x} y={y} width="140" height="60" rx="4" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
            <rect x={x + 4} y={y + 4} width="132" height="28" rx="3" fill="#111" />
            <rect x={x + 52} y={y + 14} width="28" height="6" rx="3" fill="#1A1A1A" />
            <text x={x + 8} y={y + 40} fill="#E0E0E0" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">{p.name}</text>
            <text x={x + 8} y={y + 49} fill="#FF1744" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{p.price}</text>
            <rect x={x + 100} y={y + 40} width="32" height="14" rx="4" fill="#FF1744" />
            <text x={x + 116} y={y + 47} fill="#fff" fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">Add</text>
          </g>
        );
      })}
      <text x="160" y="190" fill="#555" fontSize="3" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">4 of 128 products</text>
    </svg>
  );
}

function EnterpriseCRMMockup() {
  const stages = [
    { name: "Lead", count: 12, color: "#666", cards: [{ init: "A", name: "Acme Corp" }, { init: "B", name: "BlueSky" }] },
    { name: "Qualified", count: 8, color: "#C0C0C0", cards: [{ init: "C", name: "CloudNet" }, { init: "D", name: "DataFlow" }] },
    { name: "Proposal", count: 5, color: "#FF1744", cards: [{ init: "E", name: "EverGreen" }, { init: "F", name: "FinServ" }] },
    { name: "Won", count: 3, color: "#FF1744", cards: [{ init: "G", name: "GlobalTech" }] },
  ];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#080808" />
      <rect x="0" y="0" width="320" height="24" fill="#0E0E0E" />
      <text x="16" y="12" fill="#E0E0E0" fontSize="5.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">Pipeline</text>
      <text x="68" y="12" fill="#666" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Q1 2026 · $1.2M total value</text>
      <rect x="260" y="5" width="44" height="14" rx="4" fill="#FF1744" />
      <text x="282" y="12" fill="#fff" fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">+ New Deal</text>
      {stages.map((stage, i) => {
        const x = 8 + i * 78;
        return (
          <g key={`stage${i}`}>
            <rect x={x} y="30" width="72" height="14" rx="3" fill="#0C0C0C" />
            <text x={x + 6} y="37" fill={stage.color} fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">{stage.name}</text>
            <text x={x + 62} y="37" fill={stage.color} fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">{stage.count}</text>
            <rect x={x} y="48" width="72" height="144" rx="3" fill="#0A0A0A" />
            {stage.cards.map((card, ci) => {
              const cy = 54 + ci * 40;
              return (
                <g key={`card${i}${ci}`}>
                  <rect x={x + 4} y={cy} width="64" height="34" rx="4" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
                  <rect x={x + 8} y={cy + 6} width="6" height="6" rx="3" fill={stage.color} opacity="0.3" />
                  <text x={x + 8} y={cy + 9} fill={stage.color} fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold" dx="3">{card.init}</text>
                  <text x={x + 20} y={cy + 9} fill="#C0C0C0" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{card.name}</text>
                  <rect x={x + 8} y={cy + 18} width="40" height="2.5" rx="1" fill="#1A1A1A" />
                  <rect x={x + 8} y={cy + 24} width="28" height="2.5" rx="1" fill="#1A1A1A" opacity="0.5" />
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

function MobileAppMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#080808" />
      {/* Phone frame */}
      <rect x="100" y="4" width="120" height="192" rx="12" fill="#0A0A0A" stroke="#222" strokeWidth="0.8" />
      <text x="116" y="14" fill="#555" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">9:41</text>
      <rect x="186" y="10" width="14" height="5" rx="1.5" fill="#333" />
      <rect x="186" y="10" width="9" height="5" rx="1.5" fill="#555" />
      {/* Header */}
      <rect x="108" y="20" width="104" height="18" fill="#0E0E0E" />
      <text x="160" y="29" fill="#E0E0E0" fontSize="4.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">Dashboard</text>
      {/* Welcome card */}
      <rect x="108" y="42" width="104" height="28" rx="4" fill="rgba(255,23,68,0.08)" stroke="#FF1744" strokeWidth="0.4" />
      <text x="115" y="52" fill="#E0E0E0" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">Good morning</text>
      <text x="115" y="62" fill="#888" fontSize="3" fontFamily="system-ui, sans-serif" dominantBaseline="middle">3 tasks pending today</text>
      {/* Notification cards */}
      {[
        { title: "New message", desc: "From Sarah M.", time: "2m", color: "#FF1744" },
        { title: "Payment received", desc: "$450.00", time: "1h", color: "#C0C0C0" },
        { title: "Meeting reminder", desc: "3:00 PM today", time: "30m", color: "#888" },
      ].map((notif, i) => {
        const y = 76 + i * 26;
        return (
          <g key={`notif${i}`}>
            <rect x="108" y={y} width="104" height="22" rx="4" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.3" />
            <rect x="114" y={y + 9} width="3" height="3" rx="1.5" fill={notif.color} />
            <text x="122" y={y + 7} fill="#C0C0C0" fontSize="3" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">{notif.title}</text>
            <text x="122" y={y + 15} fill="#555" fontSize="2.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{notif.desc}</text>
            <text x="205" y={y + 7} fill="#555" fontSize="2.5" fontFamily="system-ui, sans-serif" textAnchor="end" dominantBaseline="middle">{notif.time}</text>
          </g>
        );
      })}
      {/* Bottom tab bar */}
      <rect x="108" y="168" width="104" height="24" fill="#0C0C0C" />
      <line x1="108" y1="168" x2="212" y2="168" stroke="#1A1A1A" strokeWidth="0.5" />
      {["⌂", "◉", "✉", "⚙"].map((icon, i) => (
        <text key={`tab${i}`} x={128 + i * 22} y="180" fill={i === 0 ? "#FF1744" : "#555"} fontSize="6" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">{icon}</text>
      ))}
      {/* Side labels */}
      <rect x="20" y="60" width="56" height="24" rx="4" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.3" />
      <text x="48" y="70" fill="#C0C0C0" fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">iOS & Android</text>
      <text x="48" y="78" fill="#555" fontSize="2.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">Cross-platform</text>
      <rect x="244" y="60" width="56" height="24" rx="4" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.3" />
      <text x="272" y="70" fill="#FF1744" fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">PWA</text>
      <text x="272" y="78" fill="#555" fontSize="2.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">Offline-first</text>
    </svg>
  );
}

const MOCKUP_MAP: Record<string, React.FC> = {
  "Coaching Platform": CoachingPlatformMockup,
  "Analytics Dashboard": AnalyticsDashboardMockup,
  "Member Portal": MemberPortalMockup,
  "E-Commerce Platform": ECommerceMockup,
  "Enterprise CRM": EnterpriseCRMMockup,
  "Mobile Application": MobileAppMockup,
};

/* Fallback for unknown labels */
function FallbackMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#080808" />
      <rect x="60" y="40" width="200" height="120" rx="8" fill="#0C0C0C" stroke="#1A1A1A" strokeWidth="0.5" />
      <rect x="80" y="60" width="80" height="6" rx="3" fill="#333" />
      <rect x="80" y="78" width="160" height="3" rx="1.5" fill="#1A1A1A" />
      <rect x="80" y="88" width="140" height="3" rx="1.5" fill="#1A1A1A" />
      <rect x="80" y="98" width="120" height="3" rx="1.5" fill="#1A1A1A" />
      <rect x="80" y="118" width="60" height="16" rx="4" fill="#FF1744" />
    </svg>
  );
}

export default function DeviceMockup({ label, image, description }: DeviceMockupProps) {
  const MockupComponent = MOCKUP_MAP[label] || FallbackMockup;

  return (
    <div className="group">
      {/* Device container */}
      <div
        className="relative rounded-hero overflow-hidden transition-all duration-500"
        style={{
          borderImage: "linear-gradient(to bottom, rgba(180,180,180,0.15) 0%, rgba(100,100,100,0.1) 100%) 1",
          border: "1px solid",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,23,68,0.06), 0 0 1px rgba(180,180,180,0.1)",
        }}
      >
        {/* Hover border brightening overlay */}
        <div
          className="absolute inset-0 rounded-hero pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(255,23,68,0.15)",
          }}
          aria-hidden="true"
        />

        {/* Top bezel */}
        <div
          className="h-6 bg-surface-3/60 flex items-center px-3 gap-1.5"
          aria-hidden="true"
        >
          {/* First dot pulses */}
          <div className="w-2 h-2 rounded-full bg-neon/60 shadow-[0_0_6px_rgba(255,23,68,0.4)] animate-glow-pulse" />
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
