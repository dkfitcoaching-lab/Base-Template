const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, '02-Statement-of-Work.pdf');
const doc = new PDFDocument({
  size: 'LETTER',
  autoFirstPage: false,
  margins: { top: 50, bottom: 50, left: 60, right: 60 }
});
const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

// Brand colors
const DARK = '#0A0A0A';
const VERMILLION = '#FF1744';
const SILVER = '#C0C0C0';
const LIGHT_SILVER = '#E8E8E8';
const WHITE = '#FFFFFF';
const BODY_GRAY = '#333333';
const ALT_ROW = '#F5F5F5';

const PAGE_W = 612;
const PAGE_H = 792;
const ML = 60;
const MR = 60;
const CONTENT_W = PAGE_W - ML - MR;

// ─── Helper: draw full logo ───
function drawLogo(x, y, scale) {
  var s = scale || 1;
  doc.save();
  doc.lineWidth(2.5 * s).strokeColor(SILVER);
  var archW = 40 * s, archH = 50 * s;
  doc.moveTo(x - archW / 2, y + archH);
  doc.quadraticCurveTo(x - archW / 2, y, x, y);
  doc.quadraticCurveTo(x + archW / 2, y, x + archW / 2, y + archH);
  doc.stroke();
  doc.lineWidth(1.8 * s).strokeColor('#E0E0E0');
  doc.moveTo(x - 12 * s, y + 10 * s).lineTo(x, y + 38 * s).stroke();
  doc.moveTo(x + 12 * s, y + 10 * s).lineTo(x, y + 38 * s).stroke();
  doc.circle(x, y + 38 * s, 3 * s).fill(VERMILLION);
  doc.restore();
}

// ─── Helper: small V mark ───
function drawSmallMark(x, y) {
  doc.save();
  doc.lineWidth(1.2).strokeColor(SILVER);
  doc.moveTo(x - 6, y).lineTo(x, y + 16).stroke();
  doc.moveTo(x + 6, y).lineTo(x, y + 16).stroke();
  doc.circle(x, y + 16, 1.8).fill(VERMILLION);
  doc.restore();
}

// ─── Helper: interior page chrome ───
function interiorChrome(pageNum) {
  doc.save();
  // Vermillion top rule
  doc.moveTo(ML, 30).lineTo(PAGE_W - MR, 30).lineWidth(2).strokeColor(VERMILLION).stroke();
  // Small logo mark
  drawSmallMark(ML + 10, 36);
  // Right side: company name
  doc.font('Helvetica').fontSize(7).fillColor('#BBBBBB');
  doc.text('VERMILLION AXIS TECHNOLOGIES', PAGE_W - MR - 180, 34, { width: 180, align: 'right', lineBreak: false });
  // Left sidebar accent
  doc.rect(0, 0, 6, PAGE_H).fill(VERMILLION);
  // Footer separator
  doc.moveTo(ML, PAGE_H - 48).lineTo(PAGE_W - MR, PAGE_H - 48).lineWidth(0.5).strokeColor('#E0E0E0').stroke();
  // Footer text
  doc.fontSize(7.5).fillColor('#999999').font('Helvetica');
  doc.text('Vermillion Axis Technologies  |  Confidential', ML, PAGE_H - 35, { lineBreak: false });
  doc.text('Page ' + pageNum, PAGE_W - MR - 60, PAGE_H - 35, { width: 60, align: 'right', lineBreak: false });
  doc.restore();
}

// ─── Helper: section heading ───
function sectionHeading(num, title, yPos) {
  doc.font('Helvetica-Bold').fontSize(22).fillColor(DARK);
  doc.text(num + '. ' + title, ML, yPos, { lineBreak: false });
  doc.moveTo(ML, yPos + 28).lineTo(ML + CONTENT_W, yPos + 28).lineWidth(0.75).strokeColor(VERMILLION).stroke();
  return yPos + 42;
}

// ─── Helper: bullet item ───
function bulletItem(text, y) {
  doc.save();
  doc.circle(ML + 8, y + 5, 2.5).fill(VERMILLION);
  doc.restore();
  doc.font('Helvetica').fontSize(10.5).fillColor(BODY_GRAY);
  doc.text(text, ML + 20, y, { width: CONTENT_W - 20, lineBreak: false });
  return y + 16;
}

// ─── Helper: phase block ───
function phaseBlock(title, items, startY) {
  var y = startY;
  doc.font('Helvetica-Bold').fontSize(14).fillColor(DARK);
  doc.text(title, ML, y, { lineBreak: false });
  y += 24;
  items.forEach(function(item) {
    y = bulletItem(item, y);
  });
  return y + 8;
}

// ─── Helper: labeled field ───
function labeledField(label, value, y) {
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(DARK);
  var labelW = doc.widthOfString(label + ':');
  doc.text(label + ':', ML, y, { lineBreak: false });
  doc.font('Helvetica').fillColor(BODY_GRAY);
  doc.text('  ' + value, ML + labelW, y, { lineBreak: false });
  return y + 20;
}


// ═══════════════════════════════════════════════════════
// PAGE 1 — COVER (dark background)
// ═══════════════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
doc.rect(0, 0, PAGE_W, PAGE_H).fill(DARK);

// Subtle grid texture on cover
doc.save();
doc.strokeColor('#141414').lineWidth(0.3);
for (var gx = 0; gx < PAGE_W; gx += 24) {
  doc.moveTo(gx, 0).lineTo(gx, PAGE_H).stroke();
}
for (var gy = 0; gy < PAGE_H; gy += 24) {
  doc.moveTo(0, gy).lineTo(PAGE_W, gy).stroke();
}
doc.restore();

// Corner accents
doc.save();
doc.strokeColor(VERMILLION).lineWidth(1.5);
doc.moveTo(40, 40).lineTo(40, 70).stroke();
doc.moveTo(40, 40).lineTo(70, 40).stroke();
doc.moveTo(PAGE_W - 40, 40).lineTo(PAGE_W - 40, 70).stroke();
doc.moveTo(PAGE_W - 40, 40).lineTo(PAGE_W - 70, 40).stroke();
doc.moveTo(40, PAGE_H - 40).lineTo(40, PAGE_H - 70).stroke();
doc.moveTo(40, PAGE_H - 40).lineTo(70, PAGE_H - 40).stroke();
doc.moveTo(PAGE_W - 40, PAGE_H - 40).lineTo(PAGE_W - 40, PAGE_H - 70).stroke();
doc.moveTo(PAGE_W - 40, PAGE_H - 40).lineTo(PAGE_W - 70, PAGE_H - 40).stroke();
doc.restore();

drawLogo(PAGE_W / 2, 160, 1.6);

doc.font('Helvetica-Bold').fontSize(13).fillColor(SILVER);
doc.text('VERMILLION  AXIS  TECHNOLOGIES', 0, 300, { width: PAGE_W, align: 'center', characterSpacing: 3, lineBreak: false });

// Decorative line pair
doc.moveTo(PAGE_W / 2 - 140, 328).lineTo(PAGE_W / 2 - 10, 328).lineWidth(0.5).strokeColor('#333333').stroke();
doc.moveTo(PAGE_W / 2 + 10, 328).lineTo(PAGE_W / 2 + 140, 328).lineWidth(0.5).strokeColor('#333333').stroke();
doc.moveTo(PAGE_W / 2 - 120, 332).lineTo(PAGE_W / 2 + 120, 332).lineWidth(1.5).strokeColor(VERMILLION).stroke();
doc.moveTo(PAGE_W / 2 - 140, 336).lineTo(PAGE_W / 2 - 10, 336).lineWidth(0.5).strokeColor('#333333').stroke();
doc.moveTo(PAGE_W / 2 + 10, 336).lineTo(PAGE_W / 2 + 140, 336).lineWidth(0.5).strokeColor('#333333').stroke();

doc.font('Helvetica-Bold').fontSize(34).fillColor(WHITE);
doc.text('STATEMENT OF WORK', 0, 365, { width: PAGE_W, align: 'center', lineBreak: false });

doc.font('Helvetica').fontSize(12).fillColor(LIGHT_SILVER);
doc.text('Prepared for [Client Name]', 0, 425, { width: PAGE_W, align: 'center', lineBreak: false });
doc.text('Project: [Project Name]', 0, 445, { width: PAGE_W, align: 'center', lineBreak: false });

doc.font('Helvetica').fontSize(10).fillColor(SILVER);
doc.text('SOW-2025-001', 0, 488, { width: PAGE_W, align: 'center', lineBreak: false });
doc.text('March 2025', 0, 506, { width: PAGE_W, align: 'center', lineBreak: false });

doc.font('Helvetica-Bold').fontSize(9).fillColor(VERMILLION);
doc.text('CONFIDENTIAL', 0, 555, { width: PAGE_W, align: 'center', characterSpacing: 2, lineBreak: false });

// Bottom decorative stripe
doc.rect(0, PAGE_H - 8, PAGE_W, 8).fill(VERMILLION);


// ═══════════════════════════════════════════════════════
// PAGE 2 — PROJECT OVERVIEW
// ═══════════════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
interiorChrome(2);

var y = sectionHeading(1, 'Project Overview', 65);

y = labeledField('Project Name', '[Project Name]', y);
y = labeledField('Client', '[Client Name / Company]', y);
y = labeledField('Prepared by', 'Vermillion Axis Technologies', y);
y = labeledField('Date', '[Date]', y);
y = labeledField('Version', '1.0', y);

y += 16;
doc.font('Helvetica-Bold').fontSize(12).fillColor(DARK);
doc.text('Project Description', ML, y, { lineBreak: false });
y += 22;
doc.font('Helvetica').fontSize(10.5).fillColor(BODY_GRAY);
var desc1 = 'This Statement of Work outlines the development of a comprehensive digital platform designed to streamline operations, enhance client engagement, and establish a robust technical foundation for long-term growth. The project encompasses full-stack application development, infrastructure provisioning, and ongoing support to ensure a seamless transition to a modern, scalable technology stack.';
doc.text(desc1, ML, y, { width: CONTENT_W, lineGap: 4 });
y += doc.heightOfString(desc1, { width: CONTENT_W, lineGap: 4 }) + 16;
var desc2 = 'Vermillion Axis Technologies will serve as the primary technology partner, responsible for architecture, development, testing, deployment, and post-launch support. All work will be executed according to the timeline, milestones, and deliverables defined herein.';
doc.text(desc2, ML, y, { width: CONTENT_W, lineGap: 4 });
y += doc.heightOfString(desc2, { width: CONTENT_W, lineGap: 4 }) + 20;
var desc3 = 'This document is intended to serve as the definitive reference for project scope, deliverables, timeline, and investment. Any modifications to this Statement of Work must be agreed upon in writing by both parties. All intellectual property developed during this engagement will transfer to the client upon receipt of final payment.';
doc.text(desc3, ML, y, { width: CONTENT_W, lineGap: 4 });


// ═══════════════════════════════════════════════════════
// PAGE 3 — SCOPE OF WORK (Phases 1 & 2)
// ═══════════════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
interiorChrome(3);

y = sectionHeading(2, 'Scope of Work', 65);

y = phaseBlock('Phase 1 \u2014 Discovery & Architecture (Days 1\u20133)', [
  'Stakeholder interview and requirements extraction',
  'Technical architecture document',
  'Database schema design',
  'API contract specification',
  'Infrastructure topology planning',
  'Security boundary mapping',
], y);

y += 10;
y = phaseBlock('Phase 2 \u2014 Core Platform Engineering (Days 4\u201310)', [
  'Frontend application (React, Next.js, TypeScript)',
  'Backend API layer (Node.js, typed endpoints)',
  'Database implementation (PostgreSQL)',
  'Authentication and authorization system',
  'Role-based access control',
  'Core business logic implementation',
], y);


// ═══════════════════════════════════════════════════════
// PAGE 4 — SCOPE CONTINUED (Phases 3 & 4)
// ═══════════════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
interiorChrome(4);

y = 65;
doc.font('Helvetica-Bold').fontSize(14).fillColor('#999999');
doc.text('Scope of Work (continued)', ML, y, { lineBreak: false });
y += 32;

y = phaseBlock('Phase 3 \u2014 Advanced Features (Days 11\u201317)', [
  'Client management dashboard',
  'Scheduling and booking engine',
  'Payment processing (Stripe integration)',
  'Branded document generation pipeline',
  'Automated workflow engine',
  'Real-time notifications',
  'Progressive Web App configuration',
], y);

y += 10;
y = phaseBlock('Phase 4 \u2014 Testing & Deployment (Days 18\u201321)', [
  'End-to-end testing suite',
  'Performance optimization',
  'Security audit and hardening',
  'Cloud infrastructure provisioning',
  'CI/CD pipeline configuration',
  'Production deployment',
  'Technical documentation',
], y);


// ═══════════════════════════════════════════════════════
// PAGE 5 — DELIVERABLES
// ═══════════════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
interiorChrome(5);

y = sectionHeading(3, 'Deliverables', 65);

var deliverables = [
  ['Complete source code repository with documentation', 'Full Git repository with README, inline comments, and setup instructions'],
  ['Deployed production application', 'Live system on cloud infrastructure with SSL and domain configuration'],
  ['Technical architecture document', 'System design, data flow diagrams, and technology stack overview'],
  ['API documentation', 'Endpoint reference with request/response schemas and authentication details'],
  ['Database schema documentation', 'Entity-relationship diagrams and migration scripts'],
  ['Infrastructure access credentials', 'Secure handoff of all hosting, DNS, and service accounts'],
  ['CI/CD pipeline configuration', 'Automated build, test, and deployment workflows'],
  ['User administration guide', 'Step-by-step instructions for common administrative tasks'],
  ['30-day post-launch support', 'Monitoring, bug fixes, and performance optimization included'],
];
deliverables.forEach(function(d, i) {
  doc.font('Helvetica-Bold').fontSize(11).fillColor(VERMILLION);
  doc.text((i + 1) + '.', ML, y, { lineBreak: false });
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(DARK);
  doc.text(d[0], ML + 24, y, { lineBreak: false });
  y += 15;
  doc.font('Helvetica').fontSize(9).fillColor('#777777');
  doc.text(d[1], ML + 24, y, { lineBreak: false });
  y += 20;
});


// ═══════════════════════════════════════════════════════
// PAGE 6 — TIMELINE & MILESTONES
// ═══════════════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
interiorChrome(6);

y = sectionHeading(4, 'Timeline & Milestones', 65);

// Table
var tHeaders = ['Milestone', 'Deliverable', 'Date', 'Payment'];
var tWidths = [135, 145, 75, 137];
var tRows = [
  ['Discovery Complete', 'Architecture Doc', 'Day 3', '50% due'],
  ['Core Build Complete', 'Working Platform', 'Day 10', '\u2014'],
  ['Features Complete', 'Full Application', 'Day 17', '\u2014'],
  ['Production Launch', 'Live System', 'Day 21', '50% due'],
  ['Support Period End', 'Final Handoff', 'Day 51', '\u2014'],
];

var tableX = ML;
var rowH = 28;
var hdrH = 28;
var totalTW = tWidths.reduce(function(a, b) { return a + b; }, 0);

// Header row
doc.save();
doc.rect(tableX, y, totalTW, hdrH).fill(DARK);
doc.font('Helvetica-Bold').fontSize(9.5).fillColor(WHITE);
var hx = tableX;
tHeaders.forEach(function(h, i) {
  doc.text(h, hx + 8, y + 8, { width: tWidths[i] - 16, lineBreak: false });
  hx += tWidths[i];
});
doc.restore();
y += hdrH;

tRows.forEach(function(row, ri) {
  var bg = ri % 2 === 0 ? WHITE : ALT_ROW;
  doc.save();
  doc.rect(tableX, y, totalTW, rowH).fill(bg);
  doc.font('Helvetica').fontSize(9.5).fillColor(BODY_GRAY);
  var rx = tableX;
  row.forEach(function(cell, ci) {
    doc.text(cell, rx + 8, y + 8, { width: tWidths[ci] - 16, lineBreak: false });
    rx += tWidths[ci];
  });
  doc.restore();
  y += rowH;
});

y += 30;
doc.font('Helvetica').fontSize(10.5).fillColor(BODY_GRAY);
doc.text('Total project duration: 21 business days from SOW execution to production launch, followed by a 30-day support period.', ML, y, { width: CONTENT_W, lineGap: 4 });
y += 40;
doc.font('Helvetica-Bold').fontSize(11).fillColor(DARK);
doc.text('Communication & Reporting', ML, y, { lineBreak: false });
y += 18;
doc.font('Helvetica').fontSize(10.5).fillColor(BODY_GRAY);
doc.text('Weekly progress reports will be delivered via email. Stakeholder review sessions will be scheduled at each milestone. A dedicated project channel will be established for real-time communication throughout the engagement.', ML, y, { width: CONTENT_W, lineGap: 4 });


// ═══════════════════════════════════════════════════════
// PAGE 7 — INVESTMENT & TERMS
// ═══════════════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
interiorChrome(7);

y = sectionHeading(5, 'Investment', 65);

doc.font('Helvetica-Bold').fontSize(14).fillColor(DARK);
doc.text('Total Project Investment:  $25,000', ML, y, { lineBreak: false });
y += 32;

doc.font('Helvetica-Bold').fontSize(11).fillColor(DARK);
doc.text('Payment Schedule:', ML, y, { lineBreak: false });
y += 22;

y = bulletItem('50% ($12,500) upon SOW execution', y);
y = bulletItem('50% ($12,500) upon production deployment', y);

y += 24;
y = sectionHeading(6, 'Terms & Conditions', y);

var terms = [
  ['Intellectual Property', 'All code, designs, and documentation become client property upon final payment.'],
  ['Change Orders', 'Scope changes require written approval and may adjust timeline and investment.'],
  ['Confidentiality', 'Both parties agree to maintain confidentiality of all project-related information.'],
  ['Termination', 'Either party may terminate with 7 days written notice; client pays for completed work.'],
  ['Warranty', '30-day warranty on all deliverables post-launch.'],
];
terms.forEach(function(t) {
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(DARK);
  var bw = doc.widthOfString(t[0] + ':  ');
  doc.text(t[0] + ':', ML, y, { lineBreak: false });
  doc.font('Helvetica').fillColor(BODY_GRAY);
  doc.text(t[1], ML + bw, y, { width: CONTENT_W - bw, lineBreak: true });
  var fullH = doc.heightOfString(t[1], { width: CONTENT_W - bw });
  y += Math.max(fullH, 14) + 12;
});


// ═══════════════════════════════════════════════════════
// PAGE 8 — ACCEPTANCE
// ═══════════════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
interiorChrome(8);

y = sectionHeading(7, 'Acceptance', 65);

doc.font('Helvetica').fontSize(10.5).fillColor(BODY_GRAY);
doc.text('By signing below, both parties agree to the terms outlined in this Statement of Work.', ML, y, { width: CONTENT_W });
y += 50;

function signatureBlock(title, startY) {
  var sy = startY;
  doc.font('Helvetica-Bold').fontSize(12).fillColor(DARK);
  doc.text(title, ML, sy, { lineBreak: false });
  sy += 32;
  doc.moveTo(ML, sy).lineTo(ML + 220, sy).lineWidth(0.5).strokeColor('#999999').stroke();
  doc.font('Helvetica').fontSize(9).fillColor('#999999');
  doc.text('Signature', ML, sy + 4, { lineBreak: false });
  sy += 36;
  doc.moveTo(ML, sy).lineTo(ML + 220, sy).lineWidth(0.5).strokeColor('#999999').stroke();
  doc.text('Name', ML, sy + 4, { lineBreak: false });
  sy += 36;
  doc.moveTo(ML, sy).lineTo(ML + 120, sy).lineWidth(0.5).strokeColor('#999999').stroke();
  doc.text('Title', ML, sy + 4, { lineBreak: false });
  doc.moveTo(ML + 160, sy).lineTo(ML + 280, sy).lineWidth(0.5).strokeColor('#999999').stroke();
  doc.text('Date', ML + 160, sy + 4, { lineBreak: false });
  return sy + 36;
}

y = signatureBlock('Client', y);
y += 30;
y = signatureBlock('Vermillion Axis Technologies', y);


// ═══════════════════════════════════════════════════════
// PAGE 9 — BACK COVER (dark background)
// ═══════════════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
doc.rect(0, 0, PAGE_W, PAGE_H).fill(DARK);

// Subtle grid texture on back cover
doc.save();
doc.strokeColor('#141414').lineWidth(0.3);
for (var bgx = 0; bgx < PAGE_W; bgx += 24) {
  doc.moveTo(bgx, 0).lineTo(bgx, PAGE_H).stroke();
}
for (var bgy = 0; bgy < PAGE_H; bgy += 24) {
  doc.moveTo(0, bgy).lineTo(PAGE_W, bgy).stroke();
}
doc.restore();

// Top vermillion stripe
doc.rect(0, 0, PAGE_W, 8).fill(VERMILLION);

drawLogo(PAGE_W / 2, 280, 1.3);

doc.font('Helvetica-Bold').fontSize(12).fillColor(SILVER);
doc.text('VERMILLION  AXIS  TECHNOLOGIES', 0, 370, { width: PAGE_W, align: 'center', characterSpacing: 2, lineBreak: false });

doc.font('Helvetica').fontSize(10).fillColor('#888888');
doc.text('Premium Software Engineering', 0, 395, { width: PAGE_W, align: 'center', lineBreak: false });

doc.moveTo(PAGE_W / 2 - 80, 418).lineTo(PAGE_W / 2 + 80, 418).lineWidth(0.75).strokeColor(VERMILLION).stroke();

doc.font('Helvetica').fontSize(9.5).fillColor(SILVER);
doc.text('Las Vegas, NV', 0, 430, { width: PAGE_W, align: 'center', lineBreak: false });
doc.text('vermillionaxis.tech', 0, 448, { width: PAGE_W, align: 'center', lineBreak: false });
doc.text('contact@vermillionaxis.tech', 0, 466, { width: PAGE_W, align: 'center', lineBreak: false });


// ─── Finalize ───
doc.end();
stream.on('finish', function() {
  console.log('Created:', outPath);
});
