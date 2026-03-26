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
      <rect width="320" height="200" fill="#0C0C14" />
      {/* Sidebar */}
      <rect x="0" y="0" width="48" height="200" fill="#14141E" />
      <rect x="0" y="32" width="2" height="10" rx="1" fill="#FF1744" />
      {[32, 52, 72, 92, 112].map((y, i) => (
        <rect key={`si${i}`} x="14" y={y} width="20" height="8" rx="2" fill={i === 0 ? "#FF1744" : "#2A2A38"} opacity={i === 0 ? 0.8 : 0.5} />
      ))}
      {/* Top bar */}
      <rect x="48" y="0" width="272" height="28" fill="#1C1C28" />
      <circle cx="64" cy="14" r="8" fill="#FF1744" opacity="0.9" />
      <text x="64" y="14" fill="#E8E8F0" fontSize="6" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">A</text>
      <text x="78" y="11" fill="#E8E8F0" fontSize="5.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Dashboard</text>
      <text x="78" y="19" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Administrator</text>
      <rect x="296" y="8" width="12" height="12" rx="2" fill="#2A2A38" />
      <circle cx="302" cy="14" r="2" fill="#585868" />
      {/* Greeting */}
      <text x="60" y="40" fill="#9898A8" fontSize="5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Welcome back</text>
      {/* 2x2 stat cards */}
      <rect x="60" y="48" width="62" height="34" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="68" y="58" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">PROJECTS</text>
      <text x="68" y="71" fill="#E8E8F0" fontSize="10" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">24</text>
      <rect x="128" y="48" width="62" height="34" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="136" y="58" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">REVENUE</text>
      <text x="136" y="71" fill="#10B981" fontSize="10" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">$4,280</text>
      <rect x="60" y="86" width="62" height="34" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="68" y="96" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">CLIENTS</text>
      <text x="68" y="109" fill="#E8E8F0" fontSize="10" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">48</text>
      <rect x="128" y="86" width="62" height="34" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="136" y="96" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">RETENTION</text>
      <text x="136" y="109" fill="#10B981" fontSize="10" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">94%</text>
      {/* Line chart */}
      <rect x="200" y="48" width="110" height="72" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="208" y="58" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">REVENUE TREND</text>
      <line x1="208" y1="68" x2="302" y2="68" stroke="#2A2A38" strokeWidth="0.3" />
      <line x1="208" y1="80" x2="302" y2="80" stroke="#2A2A38" strokeWidth="0.3" />
      <line x1="208" y1="92" x2="302" y2="92" stroke="#2A2A38" strokeWidth="0.3" />
      <line x1="208" y1="104" x2="302" y2="104" stroke="#2A2A38" strokeWidth="0.3" />
      <polyline points="210,100 222,94 234,96 246,86 258,82 270,74 282,78 294,66" fill="none" stroke="#FF1744" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="210,100 222,94 234,96 246,86 258,82 270,74 282,78 294,66 294,106 210,106" fill="url(#coachGrad)" stroke="none" opacity="0.15" />
      <defs>
        <linearGradient id="coachGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF1744" />
          <stop offset="100%" stopColor="#0C0C14" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Bottom summary bar */}
      <rect x="60" y="126" width="250" height="24" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="68" y="135" fill="#9898A8" fontSize="4.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">This Week</text>
      <text x="120" y="135" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Clients: 8</text>
      <text x="170" y="135" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Sessions: 12</text>
      <text x="225" y="135" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Completion: 92%</text>
      <text x="68" y="144" fill="#585868" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Next: Sarah M. @ 2:00 PM</text>
    </svg>
  );
}

function AnalyticsDashboardMockup() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#0C0C14" />
      {/* Sidebar */}
      <rect x="0" y="0" width="44" height="200" fill="#14141E" />
      <rect x="0" y="28" width="2" height="10" rx="1" fill="#10B981" />
      {[28, 48, 68, 88, 108].map((y, i) => (
        <rect key={`an${i}`} x="12" y={y} width="20" height="8" rx="2" fill={i === 0 ? "#10B981" : "#2A2A38"} opacity={i === 0 ? 0.7 : 0.4} />
      ))}
      {/* Top bar */}
      <rect x="44" y="0" width="276" height="24" fill="#1C1C28" />
      <text x="56" y="12" fill="#E8E8F0" fontSize="6" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">Analytics</text>
      <circle cx="300" cy="12" r="7" fill="#2A2A38" />
      <text x="300" y="12" fill="#585868" fontSize="5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">A</text>
      {/* KPI cards row */}
      {[
        { label: "MRR", value: "$42.8K", color: "#10B981", change: "+12%" },
        { label: "USERS", value: "3,847", color: "#6366F1", change: "+8%" },
        { label: "CHURN", value: "1.2%", color: "#FF1744", change: "-0.3%" },
        { label: "NPS", value: "72", color: "#D4A853", change: "+5" },
      ].map((kpi, i) => {
        const x = 52 + i * 66;
        return (
          <g key={`kpi${i}`}>
            <rect x={x} y="30" width="60" height="36" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
            <text x={x + 8} y="40" fill="#585868" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" letterSpacing="0.5">{kpi.label}</text>
            <text x={x + 8} y="52" fill="#E8E8F0" fontSize="9" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">{kpi.value}</text>
            <text x={x + 8} y="60" fill={kpi.color} fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{kpi.change}</text>
          </g>
        );
      })}
      {/* Area chart */}
      <rect x="52" y="72" width="258" height="90" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="60" y="82" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">REVENUE OVER TIME</text>
      {[90, 105, 120, 135].map((y) => (
        <line key={`gl${y}`} x1="60" y1={y} x2="302" y2={y} stroke="#2A2A38" strokeWidth="0.3" />
      ))}
      <polyline points="64,130 84,125 104,128 124,118 144,110 164,115 184,105 204,100 224,95 244,90 264,92 284,85 300,80" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="64,130 84,125 104,128 124,118 144,110 164,115 184,105 204,100 224,95 244,90 264,92 284,85 300,80 300,150 64,150" fill="url(#analyticsGrad)" stroke="none" opacity="0.12" />
      <defs>
        <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#0C0C14" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Bottom status */}
      <rect x="52" y="168" width="258" height="20" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="60" y="178" fill="#585868" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Last updated: 2 minutes ago</text>
      <circle cx="290" cy="178" r="3" fill="#10B981" opacity="0.6" />
      <text x="280" y="178" fill="#10B981" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" textAnchor="end">Live</text>
    </svg>
  );
}

function MemberPortalMockup() {
  const activities = [
    { icon: "✓", text: "Payment processed", time: "2h ago", color: "#10B981" },
    { icon: "★", text: "Membership renewed", time: "1d ago", color: "#D4A853" },
    { icon: "→", text: "Content unlocked", time: "3d ago", color: "#6366F1" },
  ];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#0C0C14" />
      {/* Header */}
      <rect x="0" y="0" width="320" height="28" fill="#1C1C28" />
      <rect x="16" y="8" width="24" height="12" rx="2" fill="#FF1744" opacity="0.8" />
      <text x="28" y="14" fill="#E8E8F0" fontSize="5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">V</text>
      <text x="48" y="14" fill="#9898A8" fontSize="5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Welcome back, James</text>
      <circle cx="296" cy="14" r="7" fill="#2A2A38" />
      <text x="296" y="14" fill="#D4A853" fontSize="5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">J</text>
      {/* Profile card */}
      <rect x="16" y="36" width="140" height="80" rx="6" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <circle cx="86" cy="56" r="12" fill="#1C1C28" stroke="#D4A853" strokeWidth="0.8" />
      <text x="86" y="56" fill="#D4A853" fontSize="8" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">JC</text>
      <rect x="56" y="74" width="60" height="6" rx="2" fill="#2A2A38" />
      {/* Membership badge */}
      <rect x="56" y="84" width="60" height="14" rx="7" fill="#D4A853" opacity="0.15" stroke="#D4A853" strokeWidth="0.5" />
      <text x="86" y="91" fill="#D4A853" fontSize="4" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">PLATINUM</text>
      <text x="56" y="106" fill="#585868" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Member since Jan 2025</text>
      {/* Activity feed */}
      <rect x="164" y="36" width="140" height="80" rx="6" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="176" y="48" fill="#9898A8" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">RECENT ACTIVITY</text>
      {activities.map((a, i) => {
        const y = 58 + i * 18;
        return (
          <g key={`act${i}`}>
            <circle cx="176" cy={y} r="5" fill={a.color} opacity="0.15" />
            <text x="176" y={y} fill={a.color} fontSize="4" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">{a.icon}</text>
            <text x="186" y={y - 2} fill="#E8E8F0" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{a.text}</text>
            <text x="186" y={y + 6} fill="#585868" fontSize="3" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{a.time}</text>
          </g>
        );
      })}
      {/* Quick actions */}
      <rect x="16" y="124" width="288" height="32" rx="6" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="28" y="136" fill="#9898A8" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">QUICK ACTIONS</text>
      {["View Content", "Manage Billing", "Get Support"].map((btn, i) => (
        <g key={`btn${i}`}>
          <rect x={28 + i * 92} y="142" width="80" height="10" rx="3" fill={i === 0 ? "#FF1744" : "#1C1C28"} opacity={i === 0 ? 0.8 : 1} stroke="#2A2A38" strokeWidth="0.3" />
          <text x={68 + i * 92} y="147" fill={i === 0 ? "#E8E8F0" : "#585868"} fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">{btn}</text>
        </g>
      ))}
      {/* Stats bar */}
      <rect x="16" y="164" width="288" height="24" rx="6" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="60" y="176" fill="#E8E8F0" fontSize="6" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">127</text>
      <text x="60" y="184" fill="#585868" fontSize="3" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">Days Active</text>
      <text x="160" y="176" fill="#10B981" fontSize="6" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">24</text>
      <text x="160" y="184" fill="#585868" fontSize="3" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">Resources</text>
      <text x="260" y="176" fill="#D4A853" fontSize="6" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">∞</text>
      <text x="260" y="184" fill="#585868" fontSize="3" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">Access</text>
    </svg>
  );
}

function ECommerceMockup() {
  const products = [
    { name: "Premium Watch", price: "$2,490", y: 52 },
    { name: "Leather Bag", price: "$1,850", y: 52 },
    { name: "Silk Scarf", price: "$680", y: 120 },
    { name: "Sunglasses", price: "$920", y: 120 },
  ];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#0C0C14" />
      {/* Top nav */}
      <rect x="0" y="0" width="320" height="24" fill="#1C1C28" />
      <text x="16" y="12" fill="#E8E8F0" fontSize="6" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">LUXE</text>
      {/* Search bar */}
      <rect x="80" y="5" width="140" height="14" rx="7" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="96" y="12" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Search products...</text>
      {/* Cart */}
      <rect x="280" y="5" width="24" height="14" rx="3" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <text x="292" y="12" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">🛒 2</text>
      {/* Category pills */}
      {["All", "New", "Accessories", "Sale"].map((cat, i) => (
        <g key={`cat${i}`}>
          <rect x={16 + i * 60} y="30" width={i === 0 ? 30 : 50} height="14" rx="7" fill={i === 0 ? "#FF1744" : "#14141E"} opacity={i === 0 ? 0.8 : 1} stroke={i === 0 ? "#FF1744" : "#2A2A38"} strokeWidth="0.5" />
          <text x={16 + i * 60 + (i === 0 ? 15 : 25)} y="37" fill={i === 0 ? "#E8E8F0" : "#585868"} fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">{cat}</text>
        </g>
      ))}
      {/* Product grid 2x2 */}
      {products.map((p, i) => {
        const x = 16 + (i % 2) * 148;
        const y = p.y;
        return (
          <g key={`prod${i}`}>
            <rect x={x} y={y} width="140" height="60" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
            {/* Product image placeholder */}
            <rect x={x + 4} y={y + 4} width="132" height="30" rx="3" fill="#1C1C28" />
            <rect x={x + 52} y={y + 14} width="28" height="8" rx="2" fill="#2A2A38" opacity="0.5" />
            {/* Product info */}
            <text x={x + 8} y={y + 42} fill="#E8E8F0" fontSize="4.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">{p.name}</text>
            <text x={x + 8} y={y + 50} fill="#D4A853" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{p.price}</text>
            {/* Add to cart button */}
            <rect x={x + 100} y={y + 42} width="32" height="12" rx="3" fill="#FF1744" opacity="0.8" />
            <text x={x + 116} y={y + 48} fill="#E8E8F0" fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">Add</text>
          </g>
        );
      })}
      {/* Footer bar */}
      <rect x="16" y="186" width="288" height="8" rx="2" fill="#14141E" />
      <text x="160" y="190" fill="#585868" fontSize="3" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">4 of 128 products · Page 1</text>
    </svg>
  );
}

function EnterpriseCRMMockup() {
  const stages = [
    { name: "Lead", count: 12, color: "#585868", cards: [{ init: "A", name: "Acme Corp" }, { init: "B", name: "BlueSky" }] },
    { name: "Qualified", count: 8, color: "#6366F1", cards: [{ init: "C", name: "CloudNet" }, { init: "D", name: "DataFlow" }] },
    { name: "Proposal", count: 5, color: "#D4A853", cards: [{ init: "E", name: "EverGreen" }, { init: "F", name: "FinServ" }] },
    { name: "Won", count: 3, color: "#10B981", cards: [{ init: "G", name: "GlobalTech" }] },
  ];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
      <rect width="320" height="200" fill="#0C0C14" />
      {/* Header */}
      <rect x="0" y="0" width="320" height="24" fill="#1C1C28" />
      <text x="16" y="12" fill="#E8E8F0" fontSize="6" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">Pipeline</text>
      <text x="70" y="12" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">Q1 2026 · $1.2M total value</text>
      <rect x="260" y="5" width="44" height="14" rx="3" fill="#FF1744" opacity="0.8" />
      <text x="282" y="12" fill="#E8E8F0" fontSize="3.5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">+ New Deal</text>
      {/* Pipeline columns */}
      {stages.map((stage, i) => {
        const x = 8 + i * 78;
        return (
          <g key={`stage${i}`}>
            {/* Column header */}
            <rect x={x} y="30" width="72" height="16" rx="3" fill="#14141E" />
            <text x={x + 6} y="38" fill={stage.color} fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">{stage.name}</text>
            <circle cx={x + 62} cy="38" r="5" fill={stage.color} opacity="0.2" />
            <text x={x + 62} y="38" fill={stage.color} fontSize="4" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">{stage.count}</text>
            {/* Column background */}
            <rect x={x} y="50" width="72" height="142" rx="3" fill="#14141E" opacity="0.4" />
            {/* Cards */}
            {stage.cards.map((card, ci) => {
              const cy = 56 + ci * 42;
              return (
                <g key={`card${i}${ci}`}>
                  <rect x={x + 4} y={cy} width="64" height="36" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
                  <circle cx={x + 14} cy={cy + 10} r="5" fill={stage.color} opacity="0.2" />
                  <text x={x + 14} y={cy + 10} fill={stage.color} fontSize="4" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">{card.init}</text>
                  <text x={x + 24} y={cy + 10} fill="#E8E8F0" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{card.name}</text>
                  <rect x={x + 8} y={cy + 20} width="40" height="3" rx="1" fill="#2A2A38" />
                  <rect x={x + 8} y={cy + 26} width="28" height="3" rx="1" fill="#2A2A38" opacity="0.5" />
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
      <rect width="320" height="200" fill="#0C0C14" />
      {/* Phone frame centered */}
      <rect x="100" y="4" width="120" height="192" rx="10" fill="#14141E" stroke="#2A2A38" strokeWidth="1" />
      {/* Status bar */}
      <text x="116" y="14" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" dominantBaseline="middle">9:41</text>
      <rect x="186" y="10" width="16" height="6" rx="1.5" fill="#585868" opacity="0.5" />
      <rect x="186" y="10" width="10" height="6" rx="1.5" fill="#585868" opacity="0.8" />
      {/* Header */}
      <rect x="108" y="20" width="104" height="20" fill="#1C1C28" />
      <text x="116" y="30" fill="#585868" fontSize="5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">←</text>
      <text x="160" y="30" fill="#E8E8F0" fontSize="5" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">Dashboard</text>
      {/* Welcome card */}
      <rect x="108" y="44" width="104" height="30" rx="4" fill="#FF1744" opacity="0.15" stroke="#FF1744" strokeWidth="0.5" />
      <text x="116" y="54" fill="#E8E8F0" fontSize="4.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">Good morning</text>
      <text x="116" y="64" fill="#9898A8" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle">3 tasks pending today</text>
      {/* Notification cards */}
      {[
        { title: "New message", desc: "From Sarah M.", time: "2m", color: "#6366F1" },
        { title: "Payment received", desc: "$450.00", time: "1h", color: "#10B981" },
        { title: "Meeting reminder", desc: "3:00 PM today", time: "30m", color: "#D4A853" },
      ].map((notif, i) => {
        const y = 80 + i * 28;
        return (
          <g key={`notif${i}`}>
            <rect x="108" y={y} width="104" height="24" rx="4" fill="#1C1C28" stroke="#2A2A38" strokeWidth="0.3" />
            <circle cx="118" cy={y + 12} r="4" fill={notif.color} opacity="0.2" />
            <rect x="116" y={y + 10} width="4" height="4" rx="1" fill={notif.color} />
            <text x="126" y={y + 8} fill="#E8E8F0" fontSize="3.5" fontFamily="system-ui, sans-serif" dominantBaseline="middle" fontWeight="bold">{notif.title}</text>
            <text x="126" y={y + 16} fill="#585868" fontSize="3" fontFamily="system-ui, sans-serif" dominantBaseline="middle">{notif.desc}</text>
            <text x="204" y={y + 8} fill="#585868" fontSize="3" fontFamily="system-ui, sans-serif" textAnchor="end" dominantBaseline="middle">{notif.time}</text>
          </g>
        );
      })}
      {/* Bottom tab bar */}
      <rect x="108" y="168" width="104" height="24" fill="#1C1C28" />
      <line x1="108" y1="168" x2="212" y2="168" stroke="#2A2A38" strokeWidth="0.5" />
      {["⌂", "📊", "✉", "⚙"].map((icon, i) => (
        <text key={`tab${i}`} x={130 + i * 22} y="180" fill={i === 0 ? "#FF1744" : "#585868"} fontSize="7" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">{icon}</text>
      ))}
      {/* Side decorative elements */}
      <rect x="20" y="40" width="60" height="30" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" opacity="0.5" />
      <text x="50" y="52" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">iOS</text>
      <text x="50" y="62" fill="#585868" fontSize="3" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">& Android</text>
      <rect x="240" y="40" width="60" height="30" rx="4" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" opacity="0.5" />
      <text x="270" y="52" fill="#585868" fontSize="4" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">PWA</text>
      <text x="270" y="62" fill="#585868" fontSize="3" fontFamily="system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">Offline-first</text>
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
      <rect width="320" height="200" fill="#0C0C14" />
      <rect x="60" y="40" width="200" height="120" rx="8" fill="#14141E" stroke="#2A2A38" strokeWidth="0.5" />
      <rect x="80" y="60" width="80" height="8" rx="2" fill="#585868" />
      <rect x="80" y="80" width="160" height="4" rx="1" fill="#585868" opacity="0.5" />
      <rect x="80" y="90" width="140" height="4" rx="1" fill="#585868" opacity="0.5" />
      <rect x="80" y="100" width="120" height="4" rx="1" fill="#585868" opacity="0.5" />
      <rect x="80" y="120" width="60" height="16" rx="4" fill="#FF1744" opacity="0.6" />
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
          borderImage: "linear-gradient(to bottom, rgba(42,42,56,0.5) 0%, rgba(42,42,56,0.8) 100%) 1",
          border: "1px solid",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.4), 0 0 40px rgba(180,43,43,0.06)",
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
