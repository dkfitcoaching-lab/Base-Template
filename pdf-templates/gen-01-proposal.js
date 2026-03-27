const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, '01-Project-Proposal.pdf');
const doc = new PDFDocument({ size: 'LETTER', margin: 0 });
doc.pipe(fs.createWriteStream(outPath));

// Brand constants
const DARK = '#0A0A0A';
const VERMILLION = '#FF1744';
const SILVER = '#C0C0C0';
const LIGHT_SILVER = '#E8E8E8';
const WHITE = '#FFFFFF';
const BODY = '#1A1A1A';
const MUTED = '#555555';
const ALT_ROW = '#F5F5F5';

const PW = 612, PH = 792, ML = 60, MR = 60;
const CW = PW - ML - MR;

// ── Helpers ──
function drawLogo(x, y, s) {
  s = s || 1;
  doc.save();
  doc.lineWidth(2.5 * s).strokeColor(SILVER);
  const aw = 40 * s, ah = 50 * s;
  doc.moveTo(x - aw/2, y + ah);
  doc.quadraticCurveTo(x - aw/2, y, x, y);
  doc.quadraticCurveTo(x + aw/2, y, x + aw/2, y + ah);
  doc.stroke();
  doc.lineWidth(2 * s).strokeColor('#E0E0E0');
  doc.moveTo(x - 12*s, y + 10*s).lineTo(x, y + 38*s).stroke();
  doc.moveTo(x + 12*s, y + 10*s).lineTo(x, y + 38*s).stroke();
  doc.circle(x, y + 38*s, 3.5*s).fill(VERMILLION);
  doc.restore();
}

function smallMark(x, y) {
  doc.save();
  doc.lineWidth(1.2).strokeColor(SILVER);
  doc.moveTo(x - 6, y).lineTo(x, y + 10).stroke();
  doc.moveTo(x + 6, y).lineTo(x, y + 10).stroke();
  doc.circle(x, y + 10, 1.8).fill(VERMILLION);
  doc.restore();
}

function header() {
  doc.rect(0, 0, PW, 3).fill(VERMILLION);
  smallMark(PW - 40, 14);
}

function footer(n) {
  doc.fontSize(7.5).font('Helvetica').fillColor(MUTED);
  doc.text('Vermillion Axis Technologies  |  Confidential', ML, PH - 35);
  doc.text(String(n), PW - MR - 20, PH - 35, { width: 20, align: 'right' });
}

function heading(text, y) {
  doc.fontSize(20).font('Helvetica-Bold').fillColor(VERMILLION);
  doc.text(text, ML, y, { width: CW });
  const ay = doc.y + 6;
  doc.moveTo(ML, ay).lineTo(ML + 80, ay).lineWidth(1.5).strokeColor(VERMILLION).stroke();
  return ay + 14;
}

function subhead(text, y) {
  doc.fontSize(13).font('Helvetica-Bold').fillColor(BODY);
  doc.text(text, ML, y, { width: CW });
  return doc.y + 8;
}

function body(text, y) {
  doc.fontSize(10.5).font('Helvetica').fillColor(BODY);
  doc.text(text, ML, y, { width: CW, lineGap: 3 });
  return doc.y + 10;
}

function bullet(text, y, indent) {
  indent = indent || 0;
  doc.circle(ML + indent + 3, y + 5, 2).fill(VERMILLION);
  doc.fontSize(10.5).font('Helvetica').fillColor(BODY);
  doc.text(text, ML + indent + 12, y, { width: CW - 12 - indent, lineGap: 3 });
  return doc.y + 5;
}

function newPage() { doc.addPage({ size: 'LETTER', margin: 0 }); }

// ═══════════════════════════════════════════════
// PAGE 1 — COVER
// ═══════════════════════════════════════════════
doc.rect(0, 0, PW, PH).fill(DARK);

drawLogo(PW/2, 160, 2.5);

doc.fontSize(13).font('Helvetica-Bold').fillColor(SILVER);
doc.text('VERMILLION AXIS TECHNOLOGIES', 0, 240, { width: PW, align: 'center', characterSpacing: 4 });

doc.fontSize(9).font('Helvetica').fillColor(LIGHT_SILVER);
doc.text('Infrastructure-Grade Software Engineering', 0, 262, { width: PW, align: 'center', characterSpacing: 1 });

// Vermillion rule
doc.moveTo(PW/2 - 120, 290).lineTo(PW/2 + 120, 290).lineWidth(1.5).strokeColor(VERMILLION).stroke();

doc.fontSize(34).font('Helvetica-Bold').fillColor(WHITE);
doc.text('PROJECT', 0, 320, { width: PW, align: 'center', characterSpacing: 6 });
doc.fontSize(34).font('Helvetica-Bold').fillColor(WHITE);
doc.text('PROPOSAL', 0, 362, { width: PW, align: 'center', characterSpacing: 6 });

doc.fontSize(12).font('Helvetica').fillColor(LIGHT_SILVER);
doc.text('Prepared for [Client Name]', 0, 430, { width: PW, align: 'center' });

doc.fontSize(11).font('Helvetica').fillColor(SILVER);
doc.text('March 2025', 0, 460, { width: PW, align: 'center' });

// Decorative bottom rule
doc.moveTo(PW/2 - 60, 680).lineTo(PW/2 + 60, 680).lineWidth(0.5).strokeColor(SILVER).stroke();

doc.fontSize(9).font('Helvetica-Bold').fillColor(VERMILLION);
doc.text('CONFIDENTIAL', 0, 700, { width: PW, align: 'center', characterSpacing: 3 });

// ═══════════════════════════════════════════════
// PAGE 2 — EXECUTIVE OVERVIEW
// ═══════════════════════════════════════════════
newPage();
doc.rect(0, 0, PW, PH).fill(WHITE);
header(); footer(2);

let y = heading('Executive Overview', 40);

y = body('Digital infrastructure is the single most impactful investment a business can make in 2025. It is not an expense — it is the foundation upon which revenue, operational efficiency, and competitive positioning are built.', y);

y = body('The data is unambiguous:', y);

y = bullet('81% of consumers research online before making a purchasing decision — your digital presence is your first impression and your most persistent salesperson.', y);
y = bullet('Businesses with professional digital systems generate 2.5x more revenue than those relying on basic or template-based solutions.', y);
y = bullet('The average cost of delayed market entry is 10% revenue loss per month — every month without proper infrastructure compounds the gap.', y);
y = bullet('Custom-built systems outperform template solutions by 3x in conversion rates, because they are engineered around your specific business logic, not generic assumptions.', y);

y += 8;
y = body('This proposal outlines a comprehensive digital platform engineered specifically for your business — not adapted from a template, not assembled from plugins, but architected from the ground up to serve your operational model and growth trajectory.', y);

y += 8;
y = body('The investment pays for itself. The question is not whether professional digital infrastructure generates returns — the data proves it does. The question is how quickly you want those returns to begin compounding.', y);

// ═══════════════════════════════════════════════
// PAGE 3 — THE COST OF INACTION
// ═══════════════════════════════════════════════
newPage();
doc.rect(0, 0, PW, PH).fill(WHITE);
header(); footer(3);

y = heading('The Cost of Inaction', 40);

y = body('Most businesses underestimate what they lose by delaying investment in proper digital infrastructure. The costs are real, measurable, and compounding:', y);

y = subhead('Operational Inefficiency', y);
y = body('Businesses using disconnected tools — one platform for scheduling, another for payments, another for communications — lose 15-20 hours per week on manual data transfer, reconciliation, and administrative overhead. At even modest labor valuations, this represents $30,000-50,000 annually in wasted operational capacity.', y);

y = subhead('Revenue Leakage', y);
y = body('Template-based websites convert visitors to clients at roughly one-third the rate of custom-engineered platforms. If your business receives 1,000 monthly visitors with a 1% conversion rate instead of a 3% rate, that is 20 clients per month you are not acquiring — clients who are going to competitors with better digital infrastructure.', y);

y = subhead('Competitive Disadvantage', y);
y = body('Your competitors are investing in integrated digital systems right now. Every month they operate on superior infrastructure while you do not, the gap widens. Client expectations are set by the best experience they encounter — not the average. Operating below that threshold means losing before the conversation begins.', y);

y = subhead('Escalating Costs', y);
y = body('The longer you wait, the more expensive the transition becomes. Legacy data trapped in disconnected systems grows harder to migrate. Brand equity built on a substandard platform becomes harder to transfer. And the opportunity cost of every month without proper infrastructure never comes back.', y);

// ═══════════════════════════════════════════════
// PAGE 4 — OUR APPROACH
// ═══════════════════════════════════════════════
newPage();
doc.rect(0, 0, PW, PH).fill(WHITE);
header(); footer(4);

y = heading('Our Approach', 40);

y = body('Vermillion Axis Technologies delivers infrastructure-grade software engineering. We do not sell websites. We engineer operational systems that run businesses. Our methodology is built on four principles: speed, precision, ownership, and transparency.', y);

y += 4;

// Process steps
const steps = [
  ['01', 'Discovery & Reconnaissance', 'One focused briefing. We extract operational requirements, map technical constraints, identify integration surfaces, and define mission parameters. No discovery phases that bill by the hour. Within 24 hours you receive a complete system blueprint — data models, API contracts, infrastructure topology, security boundaries, and fixed-scope pricing.'],
  ['02', 'Precision Engineering', 'Systematic, milestone-driven construction. Every component tested in isolation, integrated under load, and validated against specification. You have access to a live staging environment updated daily — you see exactly what is being built as it is built.'],
  ['03', 'Production Deployment', 'Zero-downtime launch with full asset transfer — codebase, credentials, infrastructure access, CI/CD pipeline, and technical documentation. Complete operational handoff. You own every line of code.'],
  ['04', 'Sustained Operations', 'Optional ongoing monitoring, performance optimization, and feature engineering. Month-to-month. No contracts. Disengage at any time with zero penalty and zero data loss.'],
];

steps.forEach(function(s) {
  doc.fontSize(11).font('Helvetica-Bold').fillColor(VERMILLION);
  doc.text(s[0], ML, y);
  doc.fontSize(12).font('Helvetica-Bold').fillColor(BODY);
  doc.text(s[1], ML + 28, y);
  y = doc.y + 4;
  doc.fontSize(10).font('Helvetica').fillColor(BODY);
  doc.text(s[2], ML + 28, y, { width: CW - 28, lineGap: 2.5 });
  y = doc.y + 14;
});

y += 4;
y = subhead('Technology Stack', y);
y = body('React, Next.js, and TypeScript on the frontend. Node.js with PostgreSQL on the backend. Statically typed end-to-end, fully documented, and built for decade-scale maintainability. Delivery window: 14-21 days — versus the industry standard of 3-6 months.', y);

// ═══════════════════════════════════════════════
// PAGE 5 — PROPOSED SCOPE
// ═══════════════════════════════════════════════
newPage();
doc.rect(0, 0, PW, PH).fill(WHITE);
header(); footer(5);

y = heading('Scope of Engagement', 40);

y = body('The following deliverables constitute the complete engagement scope. Every item is included in the fixed investment — no add-ons, no surprises, no scope creep:', y);

const deliverables = [
  'Custom-engineered web application — zero templates, zero plugins, built from the ground up for your business',
  'Full-stack operational command center with live dashboards and real-time analytics',
  'Client management system with automated intake, onboarding, and lifecycle workflows',
  'Branded document and PDF generation pipeline — professional deliverables on demand',
  'Integrated scheduling, booking, and appointment management system',
  'Stripe payment infrastructure with subscription management and webhook orchestration',
  'Progressive Web App — installable on any device, works offline, push notifications',
  'SEO architecture and sub-second load time optimization',
  'Cloud hosting, managed database, and CI/CD pipeline with zero-downtime deployments',
  'AI-powered automation and intelligent content generation',
  'Analytics dashboard with real-time operational metrics and business intelligence',
  'Complete source code, credentials, and infrastructure access transferred on delivery',
];

deliverables.forEach(function(d) {
  y = bullet(d, y);
});

// ═══════════════════════════════════════════════
// PAGE 6 — INVESTMENT
// ═══════════════════════════════════════════════
newPage();
doc.rect(0, 0, PW, PH).fill(WHITE);
header(); footer(6);

y = heading('Investment', 40);

y = body('This engagement is priced as a fixed investment — not hourly billing, not time-and-materials, not an estimate that grows. The number below is the number you pay. Period.', y);

// Investment box
y += 4;
doc.roundedRect(ML, y, CW, 50, 4).fill('#0A0A0A');
doc.fontSize(14).font('Helvetica').fillColor(SILVER);
doc.text('Recommended Engagement', ML + 20, y + 10);
doc.fontSize(24).font('Helvetica-Bold').fillColor(VERMILLION);
doc.text('$25,000', ML + 20, y + 28, { continued: true });
doc.fontSize(11).font('Helvetica').fillColor(SILVER);
doc.text('   fixed price', { baseline: 'alphabetic' });
y += 68;

// Breakdown table
y = subhead('Investment Breakdown', y);

const rows = [
  ['Discovery & Architecture', '$3,500'],
  ['Core Platform Engineering', '$12,000'],
  ['Advanced Features & AI Integration', '$5,500'],
  ['Testing, Deployment & Documentation', '$2,500'],
  ['30-Day Post-Launch Support', '$1,500'],
];

rows.forEach(function(r, i) {
  const bg = i % 2 === 0 ? ALT_ROW : WHITE;
  doc.rect(ML, y, CW, 22).fill(bg);
  doc.fontSize(10).font('Helvetica').fillColor(BODY);
  doc.text(r[0], ML + 10, y + 6, { width: CW - 120 });
  doc.fontSize(10).font('Helvetica-Bold').fillColor(BODY);
  doc.text(r[1], PW - MR - 100, y + 6, { width: 90, align: 'right' });
  y += 22;
});

// Total row
doc.rect(ML, y, CW, 26).fill(DARK);
doc.fontSize(11).font('Helvetica-Bold').fillColor(WHITE);
doc.text('Total', ML + 10, y + 7);
doc.text('$25,000', PW - MR - 100, y + 7, { width: 90, align: 'right' });
y += 40;

// Payment structure
y = subhead('Payment Structure', y);
y = bullet('50% upon Statement of Work execution — $12,500', y);
y = bullet('50% upon production deployment — $12,500', y);

y += 12;
y = subhead('Optional Ongoing Support', y);
y = body('$2,500/month — monitoring, performance optimization, feature engineering. Month-to-month with no minimum commitment.', y);

y += 8;
// ROI box
doc.roundedRect(ML, y, CW, 56, 4).lineWidth(1).strokeColor(VERMILLION).stroke();
doc.fontSize(9).font('Helvetica-Bold').fillColor(VERMILLION);
doc.text('ROI PROJECTION', ML + 14, y + 10);
doc.fontSize(9.5).font('Helvetica').fillColor(BODY);
doc.text('Based on industry data, businesses implementing professional digital infrastructure see average revenue increases of 150-300% within the first 12 months. At conservative projections, this investment is recovered within 13 months while generating compounding returns thereafter.', ML + 14, y + 24, { width: CW - 28, lineGap: 2 });

// ═══════════════════════════════════════════════
// PAGE 7 — WHY VERMILLION AXIS
// ═══════════════════════════════════════════════
newPage();
doc.rect(0, 0, PW, PH).fill(WHITE);
header(); footer(7);

y = heading('Why Vermillion Axis Technologies', 40);

// Comparison table
const compCols = [140, 112, 112, 128];
const compHeaders = ['', 'Vermillion Axis', 'Traditional Agency', 'Freelancer'];
const compRows = [
  ['Delivery', '14-21 days', '3-6 months', '2-4 months'],
  ['Code Ownership', '100% yours', 'Licensed', 'Varies'],
  ['Lock-in', 'None', 'Annual contracts', 'Varies'],
  ['Post-Launch', 'Month-to-month', 'Retainer required', 'Often unavailable'],
  ['Technology', 'Custom-engineered', 'Template-adapted', 'Variable quality'],
  ['Pricing', 'Fixed', 'Hourly / T&M', 'Hourly'],
];

// Header row
doc.rect(ML, y, CW, 24).fill(DARK);
let cx = ML;
compHeaders.forEach(function(h, i) {
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(i === 1 ? VERMILLION : WHITE);
  doc.text(h, cx + 8, y + 7, { width: compCols[i] - 16 });
  cx += compCols[i];
});
y += 24;

compRows.forEach(function(r, ri) {
  const bg = ri % 2 === 0 ? '#F9F9F9' : WHITE;
  doc.rect(ML, y, CW, 22).fill(bg);
  cx = ML;
  r.forEach(function(cell, ci) {
    const font = ci === 0 ? 'Helvetica-Bold' : 'Helvetica';
    const color = ci === 1 ? VERMILLION : BODY;
    doc.fontSize(9).font(font).fillColor(color);
    doc.text(cell, cx + 8, y + 6, { width: compCols[ci] - 16 });
    cx += compCols[ci];
  });
  y += 22;
});

y += 20;
y = subhead('What Our Clients Say', y);

const testimonials = [
  ['"Eleven days. Full platform — scheduling, payments, branded exports. Our previous vendor quoted four months at three times the cost. My entire team runs their day out of this system now."', '— Michael K., Founder, Coaching Lab'],
  ['"I did not need a website. I needed an operational system that mirrored how my business actually works. Vermillion mapped the requirements in a single call and delivered exactly that."', '— Rachel Chen, Founder, Elevate Wellness'],
  ['"The document generation pipeline alone changed how we operate. Professionally branded deliverables generated on demand. Clients assume we have an entire design department."', '— David Okafor, CEO, Okafor Digital'],
];

testimonials.forEach(function(t) {
  doc.fontSize(9.5).font('Helvetica-Oblique').fillColor(MUTED);
  doc.text(t[0], ML + 10, y, { width: CW - 20, lineGap: 2 });
  y = doc.y + 3;
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(BODY);
  doc.text(t[1], ML + 10, y, { width: CW - 20 });
  y = doc.y + 12;
});

// ═══════════════════════════════════════════════
// PAGE 8 — TIMELINE
// ═══════════════════════════════════════════════
newPage();
doc.rect(0, 0, PW, PH).fill(WHITE);
header(); footer(8);

y = heading('Engagement Timeline', 40);

y = body('From signed SOW to production launch in 21 days. Every milestone is documented, every deliverable is inspectable, and every day of progress is visible in your staging environment.', y);

y += 4;

const timeline = [
  ['WEEK 1', 'Days 1-3', 'Discovery & Architecture', 'Stakeholder interview, requirements extraction, technical architecture document, database schema, API specification, infrastructure planning. Deliverable: Complete system blueprint.'],
  ['WEEK 2', 'Days 4-10', 'Core Engineering Sprint', 'Frontend application, backend API, database implementation, authentication system, RBAC, core business logic. Deliverable: Working platform on staging.'],
  ['WEEK 3', 'Days 11-17', 'Advanced Features & Polish', 'Client dashboards, scheduling engine, payment processing, document generation, automated workflows, real-time notifications, PWA configuration. Deliverable: Full-featured application.'],
  ['WEEK 3-4', 'Days 18-21', 'Testing & Deployment', 'End-to-end testing, performance optimization, security audit, cloud provisioning, CI/CD pipeline, production deployment, documentation. Deliverable: Live production system.'],
  ['POST-LAUNCH', 'Days 22-51', '30-Day Support Period', 'Monitoring, bug fixes, performance optimization, minor adjustments. Complete operational handoff with full source code, credentials, and documentation.'],
];

timeline.forEach(function(t) {
  // Week label
  doc.roundedRect(ML, y, 72, 18, 3).fill(DARK);
  doc.fontSize(8).font('Helvetica-Bold').fillColor(VERMILLION);
  doc.text(t[0], ML + 6, y + 5, { width: 60 });

  doc.fontSize(8.5).font('Helvetica').fillColor(MUTED);
  doc.text(t[1], ML + 80, y + 5);
  y += 22;

  doc.fontSize(11).font('Helvetica-Bold').fillColor(BODY);
  doc.text(t[2], ML + 12, y);
  y = doc.y + 3;

  doc.fontSize(9.5).font('Helvetica').fillColor(BODY);
  doc.text(t[3], ML + 12, y, { width: CW - 24, lineGap: 2 });
  y = doc.y + 16;

  // Connector line
  if (t[0] !== 'POST-LAUNCH') {
    doc.moveTo(ML + 36, y - 8).lineTo(ML + 36, y).lineWidth(1).strokeColor(VERMILLION).stroke();
    y += 4;
  }
});

// ═══════════════════════════════════════════════
// PAGE 9 — NEXT STEPS
// ═══════════════════════════════════════════════
newPage();
doc.rect(0, 0, PW, PH).fill(WHITE);
header(); footer(9);

y = heading('Next Steps', 40);

y = body('Three steps between where you are now and a production-grade digital platform running your business:', y);

y += 8;

const nextSteps = [
  ['01', 'Schedule a Discovery Briefing', 'A focused 30-minute conversation. We map your operational requirements, identify integration surfaces, and define the mission parameters for your platform. No preparation required on your end — we lead the process.'],
  ['02', 'Receive Your Statement of Work', 'Within 24 hours of our discovery call, you receive a detailed Statement of Work: complete scope, deliverables, timeline, milestones, and the fixed investment. No ambiguity. No hidden costs. Every line item documented.'],
  ['03', 'Begin Engineering', 'Upon approval, engineering begins within 72 hours. Your staging environment goes live on Day 1 — you see progress in real time from the first line of code to production deployment.'],
];

nextSteps.forEach(function(s) {
  // Number circle
  doc.circle(ML + 16, y + 8, 14).fill(DARK);
  doc.fontSize(12).font('Helvetica-Bold').fillColor(VERMILLION);
  doc.text(s[0], ML + 8, y + 3, { width: 16, align: 'center' });

  doc.fontSize(13).font('Helvetica-Bold').fillColor(BODY);
  doc.text(s[1], ML + 40, y);
  y = doc.y + 4;
  doc.fontSize(10).font('Helvetica').fillColor(BODY);
  doc.text(s[2], ML + 40, y, { width: CW - 52, lineGap: 2.5 });
  y = doc.y + 20;
});

y += 10;
doc.moveTo(ML, y).lineTo(ML + CW, y).lineWidth(0.5).strokeColor(SILVER).stroke();
y += 20;

// Contact box
doc.roundedRect(ML, y, CW, 80, 4).fill('#FAFAFA');
doc.rect(ML, y, 4, 80).fill(VERMILLION);

doc.fontSize(12).font('Helvetica-Bold').fillColor(BODY);
doc.text('Ready to begin?', ML + 20, y + 14);
doc.fontSize(10.5).font('Helvetica').fillColor(BODY);
doc.text('contact@vermillionaxis.tech', ML + 20, y + 34);
doc.text('vermillionaxis.tech', ML + 20, y + 50);

y += 100;
doc.fontSize(9).font('Helvetica').fillColor(MUTED);
doc.text('This proposal is valid for 30 days from the date of issue.', ML, y, { width: CW });

// ═══════════════════════════════════════════════
// PAGE 10 — BACK COVER
// ═══════════════════════════════════════════════
newPage();
doc.rect(0, 0, PW, PH).fill(DARK);

drawLogo(PW/2, PH/2 - 80, 2.5);

doc.fontSize(13).font('Helvetica-Bold').fillColor(SILVER);
doc.text('VERMILLION AXIS TECHNOLOGIES', 0, PH/2, { width: PW, align: 'center', characterSpacing: 3 });

doc.fontSize(10).font('Helvetica').fillColor(LIGHT_SILVER);
doc.text('Infrastructure-Grade Software Engineering', 0, PH/2 + 26, { width: PW, align: 'center' });

doc.moveTo(PW/2 - 60, PH/2 + 50).lineTo(PW/2 + 60, PH/2 + 50).lineWidth(0.5).strokeColor(VERMILLION).stroke();

doc.fontSize(9).font('Helvetica').fillColor(SILVER);
doc.text('Las Vegas, Nevada', 0, PH/2 + 64, { width: PW, align: 'center' });
doc.text('vermillionaxis.tech', 0, PH/2 + 80, { width: PW, align: 'center' });

doc.end();
console.log('Created:', outPath);
