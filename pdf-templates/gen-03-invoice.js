const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, '03-Invoice.pdf');
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
const WHITE = '#FFFFFF';
const BODY_GRAY = '#333333';
const ALT_ROW = '#F5F5F5';
const LIGHT_GRAY_BG = '#F2F2F2';

const PAGE_W = 612;
const PAGE_H = 792;
const ML = 60;
const MR = 60;
const CONTENT_W = PAGE_W - ML - MR;

// ─── Helper: small V mark ───
function drawSmallMark(x, y, scale) {
  var s = scale || 1;
  doc.save();
  doc.lineWidth(1.4 * s).strokeColor(SILVER);
  doc.moveTo(x - 8 * s, y).lineTo(x, y + 20 * s).stroke();
  doc.moveTo(x + 8 * s, y).lineTo(x, y + 20 * s).stroke();
  doc.circle(x, y + 20 * s, 2.2 * s).fill(VERMILLION);
  doc.restore();
}

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

// ═══════════════════════════════════════════════════════
// PAGE 1 — INVOICE
// ═══════════════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });

// ── Dark header band ──
var HEADER_H = 120;
doc.rect(0, 0, PAGE_W, HEADER_H).fill(DARK);

// Subtle dot pattern in header for texture
doc.save();
doc.fillColor('#161616');
for (var dx = 10; dx < PAGE_W; dx += 16) {
  for (var dy = 10; dy < HEADER_H; dy += 16) {
    doc.circle(dx, dy, 1).fill('#161616');
  }
}
doc.restore();

// Decorative diagonal lines in header
doc.save();
doc.strokeColor('#1A1A1A').lineWidth(0.3);
for (var dl = -HEADER_H; dl < PAGE_W; dl += 20) {
  doc.moveTo(dl, 0).lineTo(dl + HEADER_H, HEADER_H).stroke();
}
doc.restore();

// Logo in header
drawSmallMark(ML + 14, 28, 1.3);

// Company name under logo mark
doc.font('Helvetica-Bold').fontSize(7).fillColor(SILVER);
doc.text('VERMILLION AXIS', ML - 6, 80, { width: 60, align: 'center', lineBreak: false });

// INVOICE title
doc.font('Helvetica-Bold').fontSize(32).fillColor(WHITE);
doc.text('INVOICE', 0, 30, { width: PAGE_W - MR, align: 'right', lineBreak: false });

// Invoice details
doc.font('Helvetica').fontSize(9.5).fillColor(SILVER);
doc.text('Invoice #:  INV-2025-001', 0, 72, { width: PAGE_W - MR, align: 'right', lineBreak: false });
doc.text('Date:  March 15, 2025', 0, 86, { width: PAGE_W - MR, align: 'right', lineBreak: false });
doc.text('Due Date:  March 30, 2025', 0, 100, { width: PAGE_W - MR, align: 'right', lineBreak: false });


// ── FROM / BILL TO ──
var y = HEADER_H + 28;

doc.font('Helvetica-Bold').fontSize(8).fillColor(VERMILLION);
doc.text('FROM', ML, y, { lineBreak: false });
y += 14;
doc.font('Helvetica-Bold').fontSize(11).fillColor(DARK);
doc.text('Vermillion Axis Technologies', ML, y, { lineBreak: false });
y += 15;
doc.font('Helvetica').fontSize(9.5).fillColor(BODY_GRAY);
doc.text('Las Vegas, NV', ML, y, { lineBreak: false });
y += 13;
doc.text('contact@vermillionaxis.tech', ML, y, { lineBreak: false });
y += 13;
doc.text('vermillionaxis.tech', ML, y, { lineBreak: false });

var billX = PAGE_W / 2 + 40;
var by = HEADER_H + 28;
doc.font('Helvetica-Bold').fontSize(8).fillColor(VERMILLION);
doc.text('BILL TO', billX, by, { lineBreak: false });
by += 14;
doc.font('Helvetica-Bold').fontSize(11).fillColor(DARK);
doc.text('[Client Name]', billX, by, { lineBreak: false });
by += 15;
doc.font('Helvetica').fontSize(9.5).fillColor(BODY_GRAY);
doc.text('[Client Company]', billX, by, { lineBreak: false });
by += 13;
doc.text('[Client Address]', billX, by, { lineBreak: false });
by += 13;
doc.text('[Client Email]', billX, by, { lineBreak: false });

y += 22;

// Project reference bar
doc.save();
doc.rect(ML, y, CONTENT_W, 22).fill(ALT_ROW);
doc.font('Helvetica').fontSize(8).fillColor(BODY_GRAY);
doc.text('Project: [Project Name]', ML + 8, y + 6, { lineBreak: false });
doc.text('SOW Reference: SOW-2025-001', ML + 200, y + 6, { lineBreak: false });
doc.text('Payment: 1 of 2', ML + 400, y + 6, { lineBreak: false });
doc.restore();
y += 30;

// Vermillion rule
doc.moveTo(ML, y).lineTo(PAGE_W - MR, y).lineWidth(2).strokeColor(VERMILLION).stroke();
y += 16;


// ── LINE ITEMS TABLE ──
var colWidths = [30, 226, 42, 92, 102];
var tableW = colWidths.reduce(function(a, b) { return a + b; }, 0);
var hdrH = 28;

// Header
doc.save();
doc.rect(ML, y, tableW, hdrH).fill(DARK);
doc.font('Helvetica-Bold').fontSize(8.5).fillColor(WHITE);
var headers = ['#', 'Description', 'Qty', 'Rate', 'Amount'];
var hx = ML;
headers.forEach(function(h, i) {
  var align = i >= 2 ? 'right' : 'left';
  doc.text(h, hx + 6, y + 9, { width: colWidths[i] - 12, align: align, lineBreak: false });
  hx += colWidths[i];
});
doc.restore();
y += hdrH;

var lineItems = [
  ['1', 'Discovery & Architecture \u2014 stakeholder interviews, technical architecture, database schema, API specification', '1', '$3,500.00', '$3,500.00'],
  ['2', 'Core Platform Engineering \u2014 frontend application, backend API, database, authentication, RBAC', '1', '$12,000.00', '$12,000.00'],
  ['3', 'Advanced Features & AI Integration \u2014 dashboards, scheduling, payments, document generation, automation', '1', '$5,500.00', '$5,500.00'],
  ['4', 'Testing, Deployment & Documentation \u2014 QA, security audit, cloud provisioning, CI/CD, docs', '1', '$2,500.00', '$2,500.00'],
  ['5', '30-Day Post-Launch Support \u2014 monitoring, bug fixes, performance optimization', '1', '$1,500.00', '$1,500.00'],
];

lineItems.forEach(function(row, ri) {
  var bg = ri % 2 === 0 ? WHITE : ALT_ROW;
  // Calculate row height from description
  doc.font('Helvetica').fontSize(9);
  var descH = doc.heightOfString(row[1], { width: colWidths[1] - 12 });
  var rowH = Math.max(descH + 14, 28);

  doc.save();
  doc.rect(ML, y, tableW, rowH).fill(bg);

  // Vermillion left accent bar on each row
  doc.rect(ML, y, 2, rowH).fill(VERMILLION);

  doc.font('Helvetica').fontSize(9).fillColor(BODY_GRAY);
  var rx = ML;
  row.forEach(function(cell, ci) {
    var align = ci >= 2 ? 'right' : 'left';
    var font = ci === 4 ? 'Helvetica-Bold' : 'Helvetica';
    doc.font(font).fontSize(9).fillColor(BODY_GRAY);
    doc.text(cell, rx + 6, y + 7, { width: colWidths[ci] - 12, align: align });
    rx += colWidths[ci];
  });
  doc.restore();
  y += rowH;
});

// Bottom border
doc.moveTo(ML, y).lineTo(ML + tableW, y).lineWidth(0.75).strokeColor('#CCCCCC').stroke();
y += 16;


// ── TOTALS ──
var totalsX = PAGE_W - MR - 210;
var valX = PAGE_W - MR - 105;
var valW = 105;

function totalLine(label, value, bold, color) {
  var c = color || (bold ? DARK : BODY_GRAY);
  doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(10).fillColor(c);
  doc.text(label, totalsX, y, { width: 100, align: 'right', lineBreak: false });
  doc.text(value, valX, y, { width: valW - 6, align: 'right', lineBreak: false });
  y += 18;
}

totalLine('Subtotal:', '$25,000.00', false);
totalLine('Tax (0%):', '$0.00', false);

doc.moveTo(totalsX, y - 4).lineTo(PAGE_W - MR, y - 4).lineWidth(1.5).strokeColor(VERMILLION).stroke();
y += 2;
totalLine('Total:', '$25,000.00', true);
totalLine('Amount Paid:', '$0.00', false);

doc.moveTo(totalsX, y - 4).lineTo(PAGE_W - MR, y - 4).lineWidth(0.5).strokeColor('#CCCCCC').stroke();
y += 2;
doc.font('Helvetica-Bold').fontSize(13).fillColor(VERMILLION);
doc.text('Balance Due:', totalsX, y, { width: 100, align: 'right', lineBreak: false });
doc.text('$25,000.00', valX, y, { width: valW - 6, align: 'right', lineBreak: false });
y += 32;


// ── PAYMENT TERMS BOX ──
var boxH = 68;
doc.save();
doc.roundedRect(ML, y, CONTENT_W, boxH, 4).fill(LIGHT_GRAY_BG);
// Vermillion left accent
doc.rect(ML, y, 3, boxH).fill(VERMILLION);
doc.font('Helvetica-Bold').fontSize(10).fillColor(DARK);
doc.text('Payment Terms', ML + 16, y + 10, { lineBreak: false });
doc.font('Helvetica').fontSize(9.5).fillColor(BODY_GRAY);
doc.text('Net 15', ML + 120, y + 10, { lineBreak: false });
doc.font('Helvetica').fontSize(9).fillColor(BODY_GRAY);
doc.text('Payment Schedule:  50% upon SOW execution, 50% upon delivery', ML + 16, y + 28, { lineBreak: false });
doc.text('Accepted Methods:  Wire transfer, ACH, or credit card', ML + 16, y + 44, { lineBreak: false });
doc.restore();

y += boxH + 25;


// ── FOOTER ──
doc.moveTo(ML, y).lineTo(PAGE_W - MR, y).lineWidth(0.5).strokeColor('#DDDDDD').stroke();
y += 14;

doc.font('Helvetica-Bold').fontSize(11).fillColor(DARK);
doc.text('Thank you for your business.', ML, y, { width: CONTENT_W, align: 'center', lineBreak: false });
y += 20;
doc.font('Helvetica').fontSize(8.5).fillColor('#999999');
doc.text('Vermillion Axis Technologies  |  Las Vegas, NV  |  vermillionaxis.tech  |  Page 1', ML, y, { width: CONTENT_W, align: 'center', lineBreak: false });


// ═══════════════════════════════════════════════════════
// PAGE 2 — TERMS & REMITTANCE
// ═══════════════════════════════════════════════════════
doc.addPage({ size: 'LETTER', margin: 0 });

// Vermillion top rule
doc.moveTo(ML, 30).lineTo(PAGE_W - MR, 30).lineWidth(2).strokeColor(VERMILLION).stroke();
// Small logo mark
drawSmallMark(ML + 10, 36);
// Company name right
doc.font('Helvetica').fontSize(7).fillColor('#BBBBBB');
doc.text('VERMILLION AXIS TECHNOLOGIES', PAGE_W - MR - 180, 34, { width: 180, align: 'right', lineBreak: false });
// Left sidebar accent
doc.rect(0, 0, 6, PAGE_H).fill(VERMILLION);

y = 70;

// Invoice Summary Box
doc.save();
doc.roundedRect(ML, y, CONTENT_W, 50, 4).fill(LIGHT_GRAY_BG);
doc.rect(ML, y, 3, 50).fill(VERMILLION);
doc.font('Helvetica-Bold').fontSize(10).fillColor(DARK);
doc.text('Invoice Summary', ML + 16, y + 8, { lineBreak: false });
doc.font('Helvetica').fontSize(9).fillColor(BODY_GRAY);
doc.text('Invoice #: INV-2025-001', ML + 16, y + 22, { lineBreak: false });
doc.text('Amount: $25,000.00', ML + 180, y + 22, { lineBreak: false });
doc.text('Status: Unpaid', ML + 340, y + 22, { lineBreak: false });
doc.text('Project: [Project Name]', ML + 16, y + 35, { lineBreak: false });
doc.text('SOW Ref: SOW-2025-001', ML + 180, y + 35, { lineBreak: false });
doc.text('Terms: Net 15', ML + 340, y + 35, { lineBreak: false });
doc.restore();
y += 65;

// Section: Payment Instructions
doc.font('Helvetica-Bold').fontSize(18).fillColor(DARK);
doc.text('Payment Instructions', ML, y, { lineBreak: false });
doc.moveTo(ML, y + 24).lineTo(ML + CONTENT_W, y + 24).lineWidth(0.75).strokeColor(VERMILLION).stroke();
y += 38;

// Wire Transfer details
doc.font('Helvetica-Bold').fontSize(12).fillColor(DARK);
doc.text('Wire Transfer / ACH', ML, y, { lineBreak: false });
y += 20;

var wireDetails = [
  ['Bank Name', '[Bank Name]'],
  ['Routing Number', '[Routing Number]'],
  ['Account Number', '[Account Number]'],
  ['Account Name', 'Vermillion Axis Technologies LLC'],
  ['Reference', 'INV-2025-001'],
];
wireDetails.forEach(function(wd) {
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(BODY_GRAY);
  doc.text(wd[0] + ':', ML + 10, y, { lineBreak: false });
  doc.font('Helvetica').fillColor(BODY_GRAY);
  doc.text(wd[1], ML + 140, y, { lineBreak: false });
  y += 16;
});

y += 16;
doc.font('Helvetica-Bold').fontSize(12).fillColor(DARK);
doc.text('Credit Card Payment', ML, y, { lineBreak: false });
y += 18;
doc.font('Helvetica').fontSize(9.5).fillColor(BODY_GRAY);
doc.text('Credit card payments can be processed via secure payment link. Please contact us at contact@vermillionaxis.tech to receive a payment link.', ML + 10, y, { width: CONTENT_W - 10, lineGap: 3 });
y += 40;

// Terms section
doc.font('Helvetica-Bold').fontSize(18).fillColor(DARK);
doc.text('Terms & Conditions', ML, y, { lineBreak: false });
doc.moveTo(ML, y + 24).lineTo(ML + CONTENT_W, y + 24).lineWidth(0.75).strokeColor(VERMILLION).stroke();
y += 40;

var invoiceTerms = [
  'Payment is due within 15 days of the invoice date unless otherwise agreed in writing.',
  'Late payments may be subject to a 1.5% monthly finance charge on the outstanding balance.',
  'All amounts are in US Dollars (USD). Client is responsible for any applicable bank transfer fees.',
  'This invoice is subject to the terms outlined in the executed Statement of Work (SOW-2025-001).',
  'Disputes regarding this invoice must be raised within 10 business days of receipt.',
  'Services delivered under this invoice remain the intellectual property of Vermillion Axis Technologies until final payment is received in full.',
];

invoiceTerms.forEach(function(term, i) {
  doc.save();
  doc.circle(ML + 8, y + 5, 2.5).fill(VERMILLION);
  doc.restore();
  doc.font('Helvetica').fontSize(9.5).fillColor(BODY_GRAY);
  doc.text(term, ML + 20, y, { width: CONTENT_W - 20, lineGap: 3 });
  var h = doc.heightOfString(term, { width: CONTENT_W - 20, lineGap: 3 });
  y += Math.max(h, 14) + 10;
});

y += 20;

// Remittance slip area
doc.save();
doc.dash(4, { space: 4 });
doc.moveTo(ML, y).lineTo(PAGE_W - MR, y).lineWidth(0.75).strokeColor('#999999').stroke();
doc.undash();
doc.restore();

y += 6;
doc.font('Helvetica').fontSize(7).fillColor('#999999');
doc.text('Cut here', PAGE_W / 2 - 15, y, { lineBreak: false });
y += 16;

doc.font('Helvetica-Bold').fontSize(11).fillColor(DARK);
doc.text('REMITTANCE ADVICE', ML, y, { lineBreak: false });
y += 20;

doc.font('Helvetica').fontSize(9).fillColor(BODY_GRAY);
doc.text('Invoice #: INV-2025-001', ML, y, { lineBreak: false });
doc.text('Amount Due: $25,000.00', ML + 200, y, { lineBreak: false });
y += 14;
doc.text('Client: [Client Name]', ML, y, { lineBreak: false });
doc.text('Due Date: March 30, 2025', ML + 200, y, { lineBreak: false });
y += 14;
doc.text('Project: [Project Name]', ML, y, { lineBreak: false });
y += 20;

doc.font('Helvetica-Bold').fontSize(9).fillColor(DARK);
doc.text('Amount Enclosed: $______________', ML, y, { lineBreak: false });
y += 18;
doc.font('Helvetica').fontSize(8).fillColor('#999999');
doc.text('Please include this remittance advice with your payment. Make checks payable to Vermillion Axis Technologies LLC.', ML, y, { width: CONTENT_W, lineGap: 2 });

// Footer
doc.save();
doc.moveTo(ML, PAGE_H - 48).lineTo(PAGE_W - MR, PAGE_H - 48).lineWidth(0.5).strokeColor('#E0E0E0').stroke();
doc.font('Helvetica').fontSize(7.5).fillColor('#999999');
doc.text('Vermillion Axis Technologies  |  Las Vegas, NV  |  vermillionaxis.tech', ML, PAGE_H - 35, { lineBreak: false });
doc.text('Page 2', PAGE_W - MR - 40, PAGE_H - 35, { width: 40, align: 'right', lineBreak: false });
doc.restore();


// ─── Finalize ───
doc.end();
stream.on('finish', function() {
  console.log('Created:', outPath);
});
