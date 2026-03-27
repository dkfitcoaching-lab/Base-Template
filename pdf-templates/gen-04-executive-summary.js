const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ size: 'LETTER', margin: 0 });
const outPath = path.join(__dirname, '04-Executive-Summary.pdf');
doc.pipe(fs.createWriteStream(outPath));

// Brand colors
const DARK = '#0A0A0A';
const VERMILLION = '#FF1744';
const SILVER = '#C0C0C0';
const LIGHT_SILVER = '#E8E8E8';
const WHITE = '#FFFFFF';
const BODY_COLOR = '#1A1A1A';
const MUTED = '#555555';

const LEFT = 60;
const RIGHT = 60;
const PAGE_W = 612;
const PAGE_H = 792;
const CONTENT_W = PAGE_W - LEFT - RIGHT;
const TOP = 50;

// ── Drawing helpers ──

function drawLogoMark(doc, x, y, scale) {
  // Arch shape in silver
  const s = scale || 1;
  doc.save();
  doc.translate(x, y);
  doc.scale(s);
  // Arch
  doc.path('M -20 0 Q -20 -30 0 -35 Q 20 -30 20 0')
    .lineWidth(2.5)
    .stroke(SILVER);
  // Converging lines (V)
  doc.moveTo(-14, 2).lineTo(0, 22).lineWidth(2).stroke('#E0E0E0');
  doc.moveTo(14, 2).lineTo(0, 22).lineWidth(2).stroke('#E0E0E0');
  // Vermillion dot at convergence
  doc.circle(0, 22, 3).fill(VERMILLION);
  doc.restore();
}

function drawSmallLogoMark(doc, x, y) {
  doc.save();
  doc.translate(x, y);
  doc.moveTo(-6, 0).lineTo(0, 10).lineWidth(1.2).stroke(SILVER);
  doc.moveTo(6, 0).lineTo(0, 10).lineWidth(1.2).stroke(SILVER);
  doc.circle(0, 10, 1.8).fill(VERMILLION);
  doc.restore();
}

function drawInteriorHeader(doc) {
  // Thin vermillion rule at top
  doc.rect(0, 0, PAGE_W, 3).fill(VERMILLION);
  // Subtle left sidebar accent
  doc.save();
  doc.rect(0, 3, 3, PAGE_H - 3).fill('#F5F5F5');
  doc.restore();
  // Small logo mark
  drawSmallLogoMark(doc, PAGE_W - 40, 20);
}

function drawInteriorFooter(doc, pageNum) {
  const y = PAGE_H - 35;
  // Footer divider line
  doc.moveTo(LEFT, y - 8).lineTo(PAGE_W - RIGHT, y - 8).lineWidth(0.5).stroke('#E0E0E0');
  doc.fontSize(7.5).font('Helvetica').fillColor(MUTED);
  doc.text('Vermillion Axis Technologies  |  Confidential', LEFT, y);
  doc.text(String(pageNum), PAGE_W - RIGHT - 20, y, { width: 20, align: 'right' });
}

function drawCoverDecoration(doc) {
  // Subtle geometric pattern on dark covers
  doc.save();
  doc.opacity(0.03);
  for (let i = 0; i < 20; i++) {
    const cx = (i % 5) * 150 + 56;
    const cy = Math.floor(i / 5) * 200 + 100;
    doc.circle(cx, cy, 60 + (i * 3)).lineWidth(0.5).stroke(SILVER);
  }
  doc.opacity(0.05);
  // Diagonal lines
  for (let j = 0; j < 12; j++) {
    doc.moveTo(0, j * 80).lineTo(j * 80, 0).lineWidth(0.3).stroke(SILVER);
    doc.moveTo(PAGE_W, PAGE_H - j * 80).lineTo(PAGE_W - j * 80, PAGE_H).lineWidth(0.3).stroke(SILVER);
  }
  doc.restore();
}

function sectionHeading(doc, text, y) {
  doc.fontSize(18).font('Helvetica-Bold').fillColor(VERMILLION);
  doc.text(text, LEFT, y, { width: CONTENT_W });
  const afterY = doc.y + 6;
  doc.moveTo(LEFT, afterY).lineTo(LEFT + 80, afterY).lineWidth(1.5).stroke(VERMILLION);
  return afterY + 12;
}

function bodyText(doc, text, y, opts) {
  doc.fontSize(10.5).font('Helvetica').fillColor(BODY_COLOR);
  const options = Object.assign({ width: CONTENT_W, lineGap: 3 }, opts || {});
  doc.text(text, LEFT, y, options);
  return doc.y + 8;
}

function bulletPoint(doc, text, y, opts) {
  const indent = (opts && opts.indent) || 0;
  const bulletX = LEFT + indent;
  doc.fontSize(10.5).font('Helvetica').fillColor(BODY_COLOR);
  doc.circle(bulletX + 3, y + 5, 2).fill(VERMILLION);
  doc.fontSize(10.5).font('Helvetica').fillColor(BODY_COLOR);
  doc.text(text, bulletX + 12, y, { width: CONTENT_W - 12 - indent, lineGap: 3 });
  return doc.y + 4;
}

// ══════════════════════════════════════════════
// PAGE 1 — COVER
// ══════════════════════════════════════════════
doc.rect(0, 0, PAGE_W, PAGE_H).fill(DARK);
drawCoverDecoration(doc);

// Logo
drawLogoMark(doc, PAGE_W / 2, 200, 2.5);

// Company name
doc.fontSize(13).font('Helvetica-Bold').fillColor(SILVER);
doc.text('VERMILLION AXIS TECHNOLOGIES', 0, 280, { width: PAGE_W, align: 'center', characterSpacing: 4 });

// Vermillion rule
const ruleY = 310;
doc.moveTo(PAGE_W / 2 - 100, ruleY).lineTo(PAGE_W / 2 + 100, ruleY).lineWidth(1.5).stroke(VERMILLION);

// Title
doc.fontSize(32).font('Helvetica-Bold').fillColor(WHITE);
doc.text('EXECUTIVE SUMMARY', 0, 340, { width: PAGE_W, align: 'center' });

// Prepared for
doc.fontSize(12).font('Helvetica').fillColor(LIGHT_SILVER);
doc.text('Prepared for [Client Name]', 0, 400, { width: PAGE_W, align: 'center' });

// Date
doc.fontSize(11).font('Helvetica').fillColor(SILVER);
doc.text('March 2025', 0, 430, { width: PAGE_W, align: 'center' });

// Confidential
doc.fontSize(9).font('Helvetica-Bold').fillColor(VERMILLION);
doc.text('CONFIDENTIAL', 0, 700, { width: PAGE_W, align: 'center', characterSpacing: 3 });

// ══════════════════════════════════════════════
// PAGE 2 — CURRENT LANDSCAPE
// ══════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
doc.rect(0, 0, PAGE_W, PAGE_H).fill(WHITE);
drawInteriorHeader(doc);
drawInteriorFooter(doc, 2);

let y = sectionHeading(doc, 'The Digital Infrastructure Imperative', TOP + 20);

y = bodyText(doc, 'The business landscape has undergone a fundamental transformation. Digital infrastructure is no longer a competitive advantage — it is a prerequisite for survival. Organizations that fail to invest in professional-grade digital platforms face accelerating disadvantages in customer acquisition, operational efficiency, and revenue generation.', y);

y = bodyText(doc, 'Now is the critical moment for businesses to invest in professional digital infrastructure. The convergence of consumer behavior shifts, technology maturity, and competitive pressure creates an environment where delayed action carries measurable cost.', y);

y += 6;
doc.fontSize(12).font('Helvetica-Bold').fillColor(BODY_COLOR);
doc.text('Key Market Facts', LEFT, y, { width: CONTENT_W });
y = doc.y + 8;

y = bulletPoint(doc, '97% of consumers use the internet to find local businesses (BrightLocal)', y);
y = bulletPoint(doc, 'Businesses with professional websites are 2.5x more likely to generate revenue growth', y);
y = bulletPoint(doc, 'The average cost of customer acquisition drops 61% with proper digital infrastructure', y);
y = bulletPoint(doc, 'Mobile commerce accounts for 73% of total e-commerce sales', y);
y = bulletPoint(doc, 'Companies with integrated operational systems report 40% higher client retention rates', y);

y += 12;
doc.fontSize(11).font('Helvetica-BoldOblique').fillColor(MUTED);
doc.text('"The question is not whether to invest in digital infrastructure — it is whether you can afford not to."', LEFT, y, { width: CONTENT_W, lineGap: 3 });

// ══════════════════════════════════════════════
// PAGE 3 — MARKET OPPORTUNITY
// ══════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
doc.rect(0, 0, PAGE_W, PAGE_H).fill(WHITE);
drawInteriorHeader(doc);
drawInteriorFooter(doc, 3);

y = sectionHeading(doc, 'Market Opportunity Analysis', TOP + 20);

y = bodyText(doc, 'The competitive landscape is shifting rapidly. Businesses that operate on disconnected tools — separate scheduling, separate payments, separate communications — lose an average of 15–20 hours per week on manual operational tasks. This fragmentation creates compounding inefficiencies that erode margins and limit growth capacity.', y);

y += 4;
y = bulletPoint(doc, 'Professional digital platforms convert at 3x the rate of template-based solutions', y);
y = bulletPoint(doc, 'First-mover advantage in digital operations creates compounding returns over time', y);
y = bulletPoint(doc, 'Unified operational platforms reduce context-switching and error rates by consolidating workflows', y);

y += 8;
y = bodyText(doc, 'A unified operational platform becomes the competitive moat that separates market leaders from followers. When client intake, scheduling, communication, payment processing, and analytics operate within a single integrated system, every interaction generates data that improves every subsequent interaction. This flywheel effect is impossible to replicate with disconnected tools.', y);

y += 4;
y = bodyText(doc, 'The businesses that establish integrated digital operations now will define the competitive standard for their markets. Those that delay will find themselves competing against organizations with fundamentally superior infrastructure — not incrementally better, but categorically different.', y);

y += 8;
doc.fontSize(11).font('Helvetica-BoldOblique').fillColor(MUTED);
doc.text('"Every month of delayed implementation represents measurable opportunity cost in client acquisition, operational efficiency, and revenue generation."', LEFT, y, { width: CONTENT_W, lineGap: 3 });

// ══════════════════════════════════════════════
// PAGE 4 — STRATEGIC RECOMMENDATION
// ══════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
doc.rect(0, 0, PAGE_W, PAGE_H).fill(WHITE);
drawInteriorHeader(doc);
drawInteriorFooter(doc, 4);

y = sectionHeading(doc, 'Strategic Recommendation', TOP + 20);

y = bodyText(doc, 'We recommend a comprehensive digital platform that unifies all critical business functions into a single, custom-engineered system:', y);

y += 2;
y = bulletPoint(doc, 'Client-facing presence and brand authority', y);
y = bulletPoint(doc, 'Operational management (scheduling, intake, communications)', y);
y = bulletPoint(doc, 'Revenue infrastructure (payments, invoicing, subscriptions)', y);
y = bulletPoint(doc, 'Analytics and business intelligence', y);
y = bulletPoint(doc, 'Branded deliverable generation', y);
y = bulletPoint(doc, 'Marketing automation', y);

y += 10;
doc.fontSize(13).font('Helvetica-Bold').fillColor(BODY_COLOR);
doc.text('Why Custom-Built vs. Template', LEFT, y, { width: CONTENT_W });
y = doc.y + 8;

y = bulletPoint(doc, 'Templates cap at ~$10K/month revenue ceiling — custom systems have no ceiling', y);
y = bulletPoint(doc, 'Template platforms charge ongoing fees ($200–500/month) that exceed custom hosting costs ($20–50/month) within 2 years', y);
y = bulletPoint(doc, 'Custom systems integrate with existing business processes; templates force you to adapt to their limitations', y);
y = bulletPoint(doc, '100% ownership means the asset appreciates rather than depreciates — you build equity, not dependency', y);

// ══════════════════════════════════════════════
// PAGE 5 — INVESTMENT ANALYSIS
// ══════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
doc.rect(0, 0, PAGE_W, PAGE_H).fill(WHITE);
drawInteriorHeader(doc);
drawInteriorFooter(doc, 5);

y = sectionHeading(doc, 'Investment Analysis', TOP + 20);

doc.fontSize(12).font('Helvetica-Bold').fillColor(BODY_COLOR);
doc.text('Recommended Investment:  ', LEFT, y, { continued: true });
doc.fontSize(14).font('Helvetica-Bold').fillColor(VERMILLION);
doc.text('$25,000');
y = doc.y + 14;

// ── Comparative Cost Analysis table ──
doc.fontSize(12).font('Helvetica-Bold').fillColor(BODY_COLOR);
doc.text('Comparative Cost Analysis', LEFT, y, { width: CONTENT_W });
y = doc.y + 8;

const colWidths = [130, 120, 90, 152];
const tableX = LEFT;
function drawTableRow(doc, cols, yPos, isHeader, isHighlight) {
  const rowH = isHeader ? 24 : 36;
  if (isHeader) {
    doc.rect(tableX, yPos, CONTENT_W, rowH).fill('#1A1A1A');
  } else if (isHighlight) {
    doc.rect(tableX, yPos, CONTENT_W, rowH).fill('#FFF0F0');
  } else {
    doc.rect(tableX, yPos, CONTENT_W, rowH).fill(yPos % 2 === 0 ? '#F9F9F9' : '#FFFFFF');
  }
  let cx = tableX + 8;
  for (let i = 0; i < cols.length; i++) {
    const fontSize = isHeader ? 8.5 : 9;
    const font = (isHeader || isHighlight) ? 'Helvetica-Bold' : 'Helvetica';
    const color = isHeader ? WHITE : (isHighlight ? VERMILLION : BODY_COLOR);
    doc.fontSize(fontSize).font(font).fillColor(color);
    doc.text(cols[i], cx, yPos + (isHeader ? 7 : 6), { width: colWidths[i] - 12, lineGap: 2 });
    cx += colWidths[i];
  }
  return yPos + rowH;
}

y = drawTableRow(doc, ['Option', 'Investment', 'Timeline', 'Outcome'], y, true);
y = drawTableRow(doc, ['Traditional Agency', '$50,000–150,000', '3–6 months', 'Licensed code'], y);
y = drawTableRow(doc, ['Freelance Developer', '$15,000–40,000', '2–4 months', 'Variable quality'], y);
y = drawTableRow(doc, ['DIY / Template', '$5,000–10,000', 'Ongoing', 'Platform-locked, limited'], y);
y = drawTableRow(doc, ['Vermillion Axis', '$25,000', '21 days', 'Full ownership, production-grade'], y, false, true);

y += 16;
doc.fontSize(12).font('Helvetica-Bold').fillColor(BODY_COLOR);
doc.text('ROI Projection', LEFT, y, { width: CONTENT_W });
y = doc.y + 8;

y = bulletPoint(doc, 'Conservative (10 new clients/month × $200 avg value): $24,000/year additional revenue', y);
y = bulletPoint(doc, 'Moderate (25 new clients/month × $200): $60,000/year additional revenue', y);
y = bulletPoint(doc, 'Aggressive (50 new clients/month × $200): $120,000/year additional revenue', y);

y += 6;
doc.fontSize(10.5).font('Helvetica-BoldOblique').fillColor(MUTED);
doc.text('"At conservative projections, the platform investment is recovered within 13 months while generating compounding returns thereafter."', LEFT, y, { width: CONTENT_W, lineGap: 3 });
y = doc.y + 12;

doc.fontSize(12).font('Helvetica-Bold').fillColor(BODY_COLOR);
doc.text('Operational Savings', LEFT, y, { width: CONTENT_W });
y = doc.y + 6;

y = bodyText(doc, '15–20 hours/week of manual work eliminated = $30,000–50,000/year in labor value. This figure alone often exceeds the total platform investment within the first year.', y);

// ══════════════════════════════════════════════
// PAGE 6 — RISK ASSESSMENT
// ══════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
doc.rect(0, 0, PAGE_W, PAGE_H).fill(WHITE);
drawInteriorHeader(doc);
drawInteriorFooter(doc, 6);

y = sectionHeading(doc, 'Risk Assessment', TOP + 20);

doc.fontSize(13).font('Helvetica-Bold').fillColor(BODY_COLOR);
doc.text('Risks of Proceeding', LEFT, y);
y = doc.y + 6;

y = bulletPoint(doc, 'Minimal. Fixed-price engagement with no scope creep.', y);
y = bulletPoint(doc, '100% code ownership means zero vendor dependency.', y);
y = bulletPoint(doc, 'Month-to-month post-launch support — disengage at any time with no penalties.', y);

y += 12;
doc.fontSize(13).font('Helvetica-Bold').fillColor(BODY_COLOR);
doc.text('Risks of NOT Proceeding', LEFT, y);
y = doc.y + 6;

y = bulletPoint(doc, 'Continued revenue leakage from operational inefficiency', y);
y = bulletPoint(doc, 'Competitive disadvantage as the market digitizes', y);
y = bulletPoint(doc, 'Increasing customer acquisition costs without conversion optimization', y);
y = bulletPoint(doc, 'Reliance on disconnected tools that do not scale', y);
y = bulletPoint(doc, 'Opportunity cost of delayed market positioning', y);

y += 14;
doc.fontSize(11).font('Helvetica-BoldOblique').fillColor(MUTED);
doc.text('"The asymmetry is clear: the downside of investing is bounded and recoverable. The downside of inaction compounds."', LEFT, y, { width: CONTENT_W, lineGap: 3 });

// ══════════════════════════════════════════════
// PAGE 7 — NEXT STEPS
// ══════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
doc.rect(0, 0, PAGE_W, PAGE_H).fill(WHITE);
drawInteriorHeader(doc);
drawInteriorFooter(doc, 7);

y = sectionHeading(doc, 'Recommended Next Steps', TOP + 20);

const steps = [
  ['1.', 'Schedule discovery briefing (30 minutes)'],
  ['2.', 'Receive detailed Statement of Work within 24 hours'],
  ['3.', 'Approve and begin engineering within 72 hours'],
  ['4.', 'Production launch within 21 days'],
];

steps.forEach(function(step) {
  doc.fontSize(12).font('Helvetica-Bold').fillColor(VERMILLION);
  doc.text(step[0], LEFT, y);
  doc.fontSize(11).font('Helvetica').fillColor(BODY_COLOR);
  doc.text(step[1], LEFT + 28, y, { width: CONTENT_W - 28 });
  y = doc.y + 10;
});

y += 20;
doc.moveTo(LEFT, y).lineTo(LEFT + CONTENT_W, y).lineWidth(0.5).stroke(SILVER);
y += 16;

doc.fontSize(11).font('Helvetica-Bold').fillColor(BODY_COLOR);
doc.text('Contact', LEFT, y);
y = doc.y + 6;
doc.fontSize(10.5).font('Helvetica').fillColor(BODY_COLOR);
doc.text('contact@vermillionaxis.tech', LEFT, y);
y = doc.y + 4;
doc.text('vermillionaxis.tech', LEFT, y);
y = doc.y + 20;

doc.fontSize(9).font('Helvetica').fillColor(MUTED);
doc.text('This summary is valid for 30 days from date of issue.', LEFT, y, { width: CONTENT_W });

// ══════════════════════════════════════════════
// PAGE 8 — BACK COVER
// ══════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });
doc.rect(0, 0, PAGE_W, PAGE_H).fill(DARK);
drawCoverDecoration(doc);

drawLogoMark(doc, PAGE_W / 2, PAGE_H / 2 - 60, 2.5);

doc.fontSize(13).font('Helvetica-Bold').fillColor(SILVER);
doc.text('VERMILLION AXIS TECHNOLOGIES', 0, PAGE_H / 2 + 10, { width: PAGE_W, align: 'center', characterSpacing: 3 });

doc.fontSize(10).font('Helvetica').fillColor(LIGHT_SILVER);
doc.text('Premium Software Engineering', 0, PAGE_H / 2 + 36, { width: PAGE_W, align: 'center' });

doc.fontSize(9).font('Helvetica').fillColor(SILVER);
doc.text('Las Vegas, Nevada', 0, PAGE_H / 2 + 60, { width: PAGE_W, align: 'center' });
doc.text('vermillionaxis.tech', 0, PAGE_H / 2 + 76, { width: PAGE_W, align: 'center' });

doc.end();
console.log('Generated:', outPath);
