const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, '05-Master-Services-Agreement.pdf');
const doc = new PDFDocument({ size: 'LETTER', margin: 0 });
doc.pipe(fs.createWriteStream(outPath));

const DARK = '#0A0A0A';
const VERMILLION = '#FF1744';
const SILVER = '#C0C0C0';
const LIGHT_SILVER = '#E8E8E8';
const WHITE = '#FFFFFF';
const BODY = '#1A1A1A';
const MUTED = '#555555';

const PW = 612, PH = 792, ML = 60, MR = 60;
const CW = PW - ML - MR;

function drawLogo(x, y, s) {
  s = s || 1;
  doc.save();
  doc.lineWidth(2.5 * s).strokeColor(SILVER);
  var aw = 40 * s, ah = 50 * s;
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

function hdr() { doc.rect(0, 0, PW, 3).fill(VERMILLION); smallMark(PW - 40, 14); }
function ftr(n) { doc.fontSize(7.5).font('Helvetica').fillColor(MUTED); doc.text('Vermillion Axis Technologies  |  Confidential', ML, PH - 35); doc.text(String(n), PW - MR - 20, PH - 35, { width: 20, align: 'right' }); }
function np() { doc.addPage({ size: 'LETTER', margin: 0 }); }

function secNum(num, title, y) {
  doc.fontSize(14).font('Helvetica-Bold').fillColor(VERMILLION);
  doc.text(num + '.', ML, y, { continued: true });
  doc.fontSize(14).font('Helvetica-Bold').fillColor(BODY);
  doc.text('  ' + title.toUpperCase());
  var ay = doc.y + 4;
  doc.moveTo(ML, ay).lineTo(ML + 60, ay).lineWidth(1).strokeColor(VERMILLION).stroke();
  return ay + 10;
}

function cl(num, text, y) {
  doc.fontSize(10).font('Helvetica-Bold').fillColor(BODY);
  doc.text(num, ML + 12, y, { width: 32 });
  doc.fontSize(10).font('Helvetica').fillColor(BODY);
  doc.text(text, ML + 44, y, { width: CW - 44, lineGap: 2.5 });
  return doc.y + 8;
}

// COVER
doc.rect(0, 0, PW, PH).fill(DARK);
drawLogo(PW/2, 160, 2.5);
doc.fontSize(13).font('Helvetica-Bold').fillColor(SILVER);
doc.text('VERMILLION AXIS TECHNOLOGIES', 0, 240, { width: PW, align: 'center', characterSpacing: 4 });
doc.fontSize(9).font('Helvetica').fillColor(LIGHT_SILVER);
doc.text('Infrastructure-Grade Software Engineering', 0, 262, { width: PW, align: 'center', characterSpacing: 1 });
doc.moveTo(PW/2 - 120, 290).lineTo(PW/2 + 120, 290).lineWidth(1.5).strokeColor(VERMILLION).stroke();
doc.fontSize(28).font('Helvetica-Bold').fillColor(WHITE);
doc.text('MASTER SERVICES', 0, 320, { width: PW, align: 'center', characterSpacing: 4 });
doc.text('AGREEMENT', 0, 358, { width: PW, align: 'center', characterSpacing: 4 });
doc.fontSize(11).font('Helvetica').fillColor(LIGHT_SILVER);
doc.text('Between', 0, 420, { width: PW, align: 'center' });
doc.fontSize(12).font('Helvetica-Bold').fillColor(WHITE);
doc.text('Vermillion Axis Technologies', 0, 440, { width: PW, align: 'center' });
doc.fontSize(11).font('Helvetica').fillColor(LIGHT_SILVER);
doc.text('and', 0, 462, { width: PW, align: 'center' });
doc.fontSize(12).font('Helvetica-Bold').fillColor(WHITE);
doc.text('[Client Name]', 0, 482, { width: PW, align: 'center' });
doc.fontSize(11).font('Helvetica').fillColor(SILVER);
doc.text('March 2025', 0, 520, { width: PW, align: 'center' });
doc.moveTo(PW/2 - 60, 680).lineTo(PW/2 + 60, 680).lineWidth(0.5).strokeColor(SILVER).stroke();
doc.fontSize(9).font('Helvetica-Bold').fillColor(VERMILLION);
doc.text('CONFIDENTIAL', 0, 700, { width: PW, align: 'center', characterSpacing: 3 });

// PAGE 2
np(); doc.rect(0, 0, PW, PH).fill(WHITE); hdr(); ftr(2);
var y = 40;
doc.fontSize(16).font('Helvetica-Bold').fillColor(BODY);
doc.text('MASTER SERVICES AGREEMENT', ML, y, { width: CW, align: 'center' });
y = doc.y + 16;
doc.fontSize(10).font('Helvetica').fillColor(BODY);
doc.text('This Master Services Agreement ("Agreement") is entered into as of [Date] ("Effective Date") by and between:', ML, y, { width: CW, lineGap: 2.5 });
y = doc.y + 12;
doc.fontSize(10).font('Helvetica-Bold').fillColor(BODY);
doc.text('PROVIDER:', ML, y, { continued: true });
doc.font('Helvetica').text('  Vermillion Axis Technologies, a software engineering firm located in Las Vegas, Nevada.');
y = doc.y + 6;
doc.fontSize(10).font('Helvetica-Bold').fillColor(BODY);
doc.text('CLIENT:', ML, y, { continued: true });
doc.font('Helvetica').text('  [Client Name / Company], located at [Address].');
y = doc.y + 16;

y = secNum('1', 'Scope of Services', y);
y = cl('1.1', 'Provider shall deliver software engineering, design, and digital infrastructure services as described in individual Statements of Work ("SOW") executed under this Agreement.', y);
y = cl('1.2', 'Each SOW shall specify: project scope, deliverables, timeline, milestones, and investment amount.', y);
y = cl('1.3', 'In the event of conflict between this Agreement and any SOW, the terms of the SOW shall prevail with respect to that specific engagement.', y);
y += 6;
y = secNum('2', 'Compensation & Payment', y);
y = cl('2.1', 'Fees for each engagement shall be specified in the applicable SOW.', y);
y = cl('2.2', 'Standard payment structure: 50% upon SOW execution, 50% upon production deployment, unless otherwise specified in the SOW.', y);
y = cl('2.3', 'Payment is due within fifteen (15) days of invoice date.', y);
y = cl('2.4', 'Late payments shall accrue interest at a rate of 1.5% per month on the outstanding balance.', y);
y = cl('2.5', 'All fees are denominated in United States Dollars. Client is responsible for any applicable taxes, duties, or government-imposed fees.', y);

// PAGE 3
np(); doc.rect(0, 0, PW, PH).fill(WHITE); hdr(); ftr(3);
y = 40;
y = secNum('3', 'Intellectual Property', y);
y = cl('3.1', 'Upon receipt of final payment, all custom code, designs, documentation, and digital assets created specifically for Client under this Agreement shall become the exclusive property of Client.', y);
y = cl('3.2', 'Provider retains ownership of pre-existing tools, libraries, frameworks, and methodologies ("Provider Tools") that may be incorporated into deliverables. Client receives a perpetual, non-exclusive, royalty-free license to use Provider Tools as integrated into their deliverables.', y);
y = cl('3.3', 'Client retains ownership of all pre-existing intellectual property, brand assets, content, and data provided to Provider during the engagement.', y);
y += 6;
y = secNum('4', 'Confidentiality', y);
y = cl('4.1', 'Both parties agree to maintain the confidentiality of proprietary information disclosed during the engagement.', y);
y = cl('4.2', 'Confidential information includes but is not limited to: business strategies, client data, technical architectures, financial information, and trade secrets.', y);
y = cl('4.3', 'Confidentiality obligations survive termination of this Agreement for a period of two (2) years.', y);
y = cl('4.4', 'Exceptions: information that is publicly available, independently developed, or required by law to be disclosed.', y);
y += 6;
y = secNum('5', 'Warranties', y);
y = cl('5.1', 'Provider warrants that all deliverables will be free from material defects for thirty (30) days following production deployment ("Warranty Period").', y);
y = cl('5.2', 'During the Warranty Period, Provider will correct any material defects at no additional cost to Client.', y);
y = cl('5.3', 'This warranty does not cover issues arising from modifications made by Client or third parties, misuse, or force majeure events.', y);

// PAGE 4
np(); doc.rect(0, 0, PW, PH).fill(WHITE); hdr(); ftr(4);
y = 40;
y = secNum('6', 'Limitation of Liability', y);
y = cl('6.1', "In no event shall either party's total liability under this Agreement exceed the total fees paid under the applicable SOW giving rise to the claim.", y);
y = cl('6.2', 'Neither party shall be liable for indirect, incidental, consequential, special, or punitive damages, regardless of the cause of action.', y);
y = cl('6.3', 'These limitations apply regardless of the form of action, whether in contract, tort, negligence, strict liability, or otherwise.', y);
y += 6;
y = secNum('7', 'Term & Termination', y);
y = cl('7.1', 'This Agreement is effective upon execution by both parties and continues until terminated in accordance with this section.', y);
y = cl('7.2', 'Either party may terminate this Agreement with fourteen (14) days written notice to the other party.', y);
y = cl('7.3', 'Upon termination, Client shall pay for all work completed to date at the pro-rated engagement rate.', y);
y = cl('7.4', 'Provider shall deliver all completed work product upon receipt of payment for services rendered through the date of termination.', y);
y = cl('7.5', 'Sections 3 (Intellectual Property), 4 (Confidentiality), 6 (Limitation of Liability), and 9 (Dispute Resolution) survive termination of this Agreement.', y);
y += 6;
y = secNum('8', 'Independent Contractor', y);
y = cl('8.1', 'Provider is an independent contractor. Nothing in this Agreement creates an employment, partnership, joint venture, or agency relationship between the parties.', y);
y = cl('8.2', 'Provider is solely responsible for its own taxes, insurance, and business expenses.', y);
y += 6;
y = secNum('9', 'Dispute Resolution', y);
y = cl('9.1', 'Any disputes arising under this Agreement shall first be addressed through good-faith negotiation between the parties for a period of thirty (30) days.', y);
y = cl('9.2', 'If negotiation fails to resolve the dispute, it shall be settled through binding arbitration in Clark County, Nevada, under the rules of the American Arbitration Association.', y);
y = cl('9.3', 'This Agreement shall be governed by and construed in accordance with the laws of the State of Nevada, without regard to its conflict of laws principles.', y);

// PAGE 5
np(); doc.rect(0, 0, PW, PH).fill(WHITE); hdr(); ftr(5);
y = 40;
y = secNum('10', 'General Provisions', y);
y = cl('10.1', 'This Agreement, together with any executed SOWs, constitutes the entire agreement between the parties regarding its subject matter and supersedes all prior agreements, proposals, and representations.', y);
y = cl('10.2', 'Amendments to this Agreement must be in writing and signed by authorized representatives of both parties.', y);
y = cl('10.3', 'Neither party may assign this Agreement or any rights hereunder without the prior written consent of the other party.', y);
y = cl('10.4', 'If any provision of this Agreement is found to be unenforceable, the remaining provisions shall continue in full force and effect.', y);
y = cl('10.5', 'Failure by either party to enforce any provision of this Agreement shall not constitute a waiver of future enforcement of that or any other provision.', y);

y += 16;
doc.moveTo(ML, y).lineTo(ML + CW, y).lineWidth(1).strokeColor(VERMILLION).stroke();
y += 16;
doc.fontSize(14).font('Helvetica-Bold').fillColor(BODY);
doc.text('11.  ACCEPTANCE', ML, y);
y = doc.y + 10;
doc.fontSize(10).font('Helvetica').fillColor(BODY);
doc.text('By signing below, both parties acknowledge and agree to the terms and conditions set forth in this Master Services Agreement.', ML, y, { width: CW, lineGap: 2.5 });
y = doc.y + 24;

// PROVIDER sig
doc.fontSize(10).font('Helvetica-Bold').fillColor(VERMILLION);
doc.text('PROVIDER', ML, y);
y = doc.y + 4;
doc.fontSize(10).font('Helvetica-Bold').fillColor(BODY);
doc.text('Vermillion Axis Technologies', ML, y);
y = doc.y + 20;
doc.moveTo(ML, y).lineTo(ML + 200, y).lineWidth(0.5).strokeColor('#999999').stroke();
doc.fontSize(8).font('Helvetica').fillColor(MUTED);
doc.text('Signature', ML, y + 4);
doc.moveTo(ML + 260, y).lineTo(ML + CW, y).lineWidth(0.5).strokeColor('#999999').stroke();
doc.text('Date', ML + 260, y + 4);
y += 24;
doc.moveTo(ML, y).lineTo(ML + 200, y).lineWidth(0.5).strokeColor('#999999').stroke();
doc.text('Printed Name', ML, y + 4);
doc.moveTo(ML + 260, y).lineTo(ML + CW, y).lineWidth(0.5).strokeColor('#999999').stroke();
doc.text('Title', ML + 260, y + 4);
y += 40;

// CLIENT sig
doc.fontSize(10).font('Helvetica-Bold').fillColor(VERMILLION);
doc.text('CLIENT', ML, y);
y = doc.y + 4;
doc.fontSize(10).font('Helvetica-Bold').fillColor(BODY);
doc.text('[Client Name / Company]', ML, y);
y = doc.y + 20;
doc.moveTo(ML, y).lineTo(ML + 200, y).lineWidth(0.5).strokeColor('#999999').stroke();
doc.fontSize(8).font('Helvetica').fillColor(MUTED);
doc.text('Signature', ML, y + 4);
doc.moveTo(ML + 260, y).lineTo(ML + CW, y).lineWidth(0.5).strokeColor('#999999').stroke();
doc.text('Date', ML + 260, y + 4);
y += 24;
doc.moveTo(ML, y).lineTo(ML + 200, y).lineWidth(0.5).strokeColor('#999999').stroke();
doc.text('Printed Name', ML, y + 4);
doc.moveTo(ML + 260, y).lineTo(ML + CW, y).lineWidth(0.5).strokeColor('#999999').stroke();
doc.text('Title', ML + 260, y + 4);

// BACK COVER
np(); doc.rect(0, 0, PW, PH).fill(DARK);
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
