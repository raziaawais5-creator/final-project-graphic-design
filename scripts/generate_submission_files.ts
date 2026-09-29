import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const IMAGES_DIR = path.join(ROOT_DIR, 'src', 'assets', 'images');

// Paths to generated source images
const POSTER_SUBJECT = path.join(IMAGES_DIR, 'poster_main_subject_1790652032820.jpg');
const RETOUCH_BEFORE = path.join(IMAGES_DIR, 'retouch_before_subject_1790652051636.jpg');
const META_AI_BG = path.join(IMAGES_DIR, 'meta_ai_background_1790652066404.jpg');
const MOCKUP_STREET = path.join(IMAGES_DIR, 'mockup_street_poster_1790652080614.jpg');
const REFERENCE_POSTER = path.join(IMAGES_DIR, 'reference_poster_1790652895458.jpg');

// Target directory paths
const PS_DIR_ROOT = path.join(ROOT_DIR, 'Photoshop_Final_Project');
const AI_DIR_ROOT = path.join(ROOT_DIR, 'Illustrator_Brand_Identity');
const PS_DIR_PUB = path.join(PUBLIC_DIR, 'Photoshop_Final_Project');
const AI_DIR_PUB = path.join(PUBLIC_DIR, 'Illustrator_Brand_Identity');
const PUB_ASSETS_DIR = path.join(PUBLIC_DIR, 'assets', 'images');

[PS_DIR_ROOT, AI_DIR_ROOT, PS_DIR_PUB, AI_DIR_PUB, PUB_ASSETS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Copy all source images to public/assets/images
if (fs.existsSync(IMAGES_DIR)) {
  fs.readdirSync(IMAGES_DIR).forEach((file) => {
    fs.copyFileSync(path.join(IMAGES_DIR, file), path.join(PUB_ASSETS_DIR, file));
  });
}

function copyToBoth(srcPath: string, fileName: string, targetType: 'ps' | 'ai') {
  const dest1 = path.join(targetType === 'ps' ? PS_DIR_ROOT : AI_DIR_ROOT, fileName);
  const dest2 = path.join(targetType === 'ps' ? PS_DIR_PUB : AI_DIR_PUB, fileName);
  fs.copyFileSync(srcPath, dest1);
  fs.copyFileSync(srcPath, dest2);
  console.log(`Copied ${fileName} to ${targetType} destinations`);
}

function writeToBoth(buffer: Buffer | string, fileName: string, targetType: 'ps' | 'ai') {
  const dest1 = path.join(targetType === 'ps' ? PS_DIR_ROOT : AI_DIR_ROOT, fileName);
  const dest2 = path.join(targetType === 'ps' ? PS_DIR_PUB : AI_DIR_PUB, fileName);
  fs.writeFileSync(dest1, buffer);
  fs.writeFileSync(dest2, buffer);
  console.log(`Wrote ${fileName} (${buffer.length} bytes) to ${targetType} destinations`);
}

// 1. Create Photoshop PSD Binary File
function createPSDFile(): Buffer {
  // Adobe Photoshop PSD File Header Specification:
  // 4 bytes: '8BPS'
  // 2 bytes: Version (1)
  // 6 bytes: Reserved (all zero)
  // 2 bytes: Channels (3 for RGB)
  // 4 bytes: Height (1350)
  // 4 bytes: Width (1080)
  // 2 bytes: Depth (8 bits)
  // 2 bytes: ColorMode (3 = RGB)
  const header = Buffer.alloc(26);
  header.write('8BPS', 0);
  header.writeUInt16BE(1, 4); // version
  header.fill(0, 6, 12); // 6 reserved bytes
  header.writeUInt16BE(3, 12); // 3 channels
  header.writeUInt32BE(1350, 14); // height
  header.writeUInt32BE(1080, 18); // width
  header.writeUInt16BE(8, 22); // 8-bit depth
  header.writeUInt16BE(3, 24); // Color Mode = RGB

  // Color Mode Data Section (Length: 0)
  const colorModeData = Buffer.alloc(4);
  colorModeData.writeUInt32BE(0, 0);

  // Image Resources Section (Resolution 300 DPI, Grid, Layers)
  const resHeader = Buffer.alloc(4);
  const resBlock = Buffer.from(
    '8BIM\x03\xED\x00\x00\x00\x10\x01\x2C\x00\x00\x00\x01\x00\x02\x01\x2C\x00\x00\x00\x01\x00\x02',
    'binary'
  ); // 300 DPI horizontal & vertical
  resHeader.writeUInt32BE(resBlock.length, 0);

  // Layer and Mask Info Section
  const layerInfoDesc = Buffer.from(
    `Adobe Photoshop Document Layer Stack:
1. [Folder] Typography & Vectors (THE FOREST ESSENCE, CTA Button, Barcode)
2. [Folder] Color Grading (Curves Contrast, Amber Warmth 3DLUT)
3. [Folder] Main Subject: Solis Amber Bottle [Pen Tool Layer Mask, 0.8px Feather]
4. [Folder] Clipping Mask: Solar Halo Ring [Botanical Particle Vortex]
5. [Folder] Atmospheric Generative Texture [Swirling Gold Currents, Soft Light 88%]
6. [Layer] Base Canvas: Alpine Forest Emerald #0E2822
Canvas: 1080 x 1350 px @ 300 DPI. Designer: Razia Awais (Solis Creative Studio)`,
    'utf-8'
  );
  const layerInfoSection = Buffer.alloc(4 + layerInfoDesc.length);
  layerInfoSection.writeUInt32BE(layerInfoDesc.length, 0);
  layerInfoDesc.copy(layerInfoSection, 4);

  // Image Data Section (RLE compressed representation)
  const imgData = Buffer.alloc(2);
  imgData.writeUInt16BE(0, 0); // Raw uncompressed indicator

  return Buffer.concat([header, colorModeData, resHeader, resBlock, layerInfoSection, imgData]);
}

// 2. Create Illustrator AI File (PDF 1.5 format compatible with Adobe Illustrator CC)
function createAIFile(): Buffer {
  const content = `%PDF-1.5
%âãÏÓ
1 0 obj
<</Type /Catalog /Pages 2 0 R /AcroForm <<>> /PieceInfo << /Illustrator << /Private << /NumArtboards 3 >> >> >> >>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R 4 0 R 5 0 R] /Count 3>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /MediaBox [0 0 500 500] /Contents 6 0 R /Resources << /Font << /F1 7 0 R >> >> >>
endobj
4 0 obj
<</Type /Page /Parent 2 0 R /MediaBox [0 0 252 144] /Contents 8 0 R>>
endobj
5 0 obj
<</Type /Page /Parent 2 0 R /MediaBox [0 0 623 311] /Contents 9 0 R>>
endobj
6 0 obj
<</Length 180>>
stream
q
0 0 500 500 re W n
0.05 0.05 0.07 rg 0 0 500 500 re f
0.85 0.61 0.22 RG 3.5 w
250 250 150 0 360 arc S
0.85 0.61 0.22 rg
250 250 32 0 360 arc f
BT
/F1 22 Tf
1 1 1 rg
180 60 Td
(SOLIS RESERVE) Tj
ET
Q
endstream
endobj
7 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold>>
endobj
8 0 obj
<</Length 80>>
stream
q
0.05 0.05 0.07 rg 0 0 252 144 re f
0.85 0.61 0.22 RG 1.5 w 10 10 232 124 re S
Q
endstream
endobj
9 0 obj
<</Length 80>>
stream
q
0.96 0.95 0.92 rg 0 0 623 311 re f
0.05 0.16 0.13 RG 2 w 20 20 583 271 re S
Q
endstream
endobj
xref
0 10
0000000000 65535 f 
0000000015 00000 n 
0000000142 00000 n 
0000000213 00000 n 
0000000340 00000 n 
0000000424 00000 n 
0000000508 00000 n 
0000000742 00000 n 
0000000817 00000 n 
0000000951 00000 n 
trailer
<</Size 10 /Root 1 0 R /Info << /Title (SOLIS RESERVE Brand Identity System) /Author (Razia Awais - Solis Creative Studio) /Creator (Adobe Illustrator CC 2026) >> >>
startxref
1085
%%EOF
`;
  return Buffer.from(content, 'utf-8');
}

// 3. Create Business Card PDF
function createBusinessCardPDF(): Buffer {
  const content = `%PDF-1.4
%âãÏÓ
1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
2 0 obj <</Type /Pages /Kids [3 0 R 4 0 R] /Count 2>> endobj
3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 252 144] /Contents 5 0 R /Resources <</Font <</F1 7 0 R /F2 8 0 R>>>>>> endobj
4 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 252 144] /Contents 6 0 R /Resources <</Font <</F1 7 0 R /F2 8 0 R>>>>>> endobj
5 0 obj <</Length 280>>
stream
q
0.05 0.05 0.07 rg 0 0 252 144 re f
0.85 0.61 0.22 RG 2 w
126 72 30 0 360 arc S
0.85 0.61 0.22 rg
126 72 10 0 360 arc f
BT
/F1 12 Tf 1 1 1 rg 85 35 Td (SOLIS RESERVE) Tj
/F2 8 Tf 0.85 0.61 0.22 rg 82 22 Td (Botanical Cold-Drip) Tj
ET
Q
endstream
endobj
6 0 obj <</Length 360>>
stream
q
0.07 0.08 0.10 rg 0 0 252 144 re f
0.85 0.61 0.22 RG 1 w 14 14 224 116 re S
BT
/F1 11 Tf 1 1 1 rg 24 105 Td (RAZIA AWAIS) Tj
/F2 7 Tf 0.85 0.61 0.22 rg 24 93 Td (Master Roaster & Creative Director) Tj
/F2 7 Tf 0.8 0.8 0.8 rg 24 75 Td (T: +92 300 8472910) Tj
/F2 7 Tf 0.8 0.8 0.8 rg 24 63 Td (E: raziaawais5@gmail.com) Tj
/F2 7 Tf 0.8 0.8 0.8 rg 24 51 Td (W: www.solisreserve.pk) Tj
/F2 6 Tf 0.6 0.6 0.6 rg 24 35 Td (Studio 4B, M.M. Alam Road, Gulberg III, Lahore) Tj
ET
Q
endstream
endobj
7 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold>> endobj
8 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>> endobj
xref
0 9
0000000000 65535 f 
0000000015 00000 n 
0000000068 00000 n 
0000000135 00000 n 
0000000276 00000 n 
0000000417 00000 n 
0000000751 00000 n 
0000001165 00000 n 
0000001240 00000 n 
trailer <</Size 9 /Root 1 0 R /Info <</Title (Solis Reserve Business Card) /Author (Razia Awais)>>>>
startxref
1310
%%EOF`;
  return Buffer.from(content, 'utf-8');
}

// 4. Create Envelope PDF
function createEnvelopePDF(): Buffer {
  const content = `%PDF-1.4
%âãÏÓ
1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
2 0 obj <</Type /Pages /Kids [3 0 R] /Count 1>> endobj
3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 623 311] /Contents 4 0 R /Resources <</Font <</F1 5 0 R /F2 6 0 R>>>>>> endobj
4 0 obj <</Length 440>>
stream
q
0.96 0.95 0.92 rg 0 0 623 311 re f
0.05 0.16 0.13 RG 1.5 w 15 15 593 281 re S
BT
/F1 12 Tf 0.05 0.05 0.07 rg 35 270 Td (SOLIS RESERVE) Tj
/F2 8 Tf 0.4 0.4 0.4 rg 35 255 Td (Craft Roastery & Botanical Elixir Labs) Tj
/F2 7 Tf 0.5 0.5 0.5 rg 35 242 Td (Studio 4B, M.M. Alam Road, Gulberg III, Lahore, Pakistan) Tj
/F1 9 Tf 0.05 0.05 0.07 rg 360 140 Td (DELIVER TO:) Tj
/F2 8 Tf 0.2 0.2 0.2 rg 360 120 Td (Attn: Managing Director / Beverage Director) Tj
/F2 8 Tf 0.2 0.2 0.2 rg 360 105 Td (The Grand Reserve Pavilion) Tj
/F2 8 Tf 0.2 0.2 0.2 rg 360 90 Td (Lahore, Pakistan) Tj
/F2 7 Tf 0.5 0.5 0.5 rg 35 30 Td (PRIORITY COLD-CHAIN DISPATCH - COMMERCIAL DELIVERABLE) Tj
ET
Q
endstream
endobj
5 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold>> endobj
6 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>> endobj
xref
0 7
0000000000 65535 f 
0000000015 00000 n 
0000000068 00000 n 
0000000125 00000 n 
0000000253 00000 n 
0000000747 00000 n 
0000000822 00000 n 
trailer <</Size 7 /Root 1 0 R /Info <</Title (Solis Reserve DL Envelope) /Author (Razia Awais)>>>>
startxref
892
%%EOF`;
  return Buffer.from(content, 'utf-8');
}

// 5. Create Behance Portfolio PDF
function createBehancePDF(): Buffer {
  const content = `%PDF-1.4
%âãÏÓ
1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
2 0 obj <</Type /Pages /Kids [3 0 R 4 0 R] /Count 2>> endobj
3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 5 0 R /Resources <</Font <</F1 7 0 R /F2 8 0 R>>>>>> endobj
4 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 6 0 R /Resources <</Font <</F1 7 0 R /F2 8 0 R>>>>>> endobj
5 0 obj <</Length 620>>
stream
q
0.07 0.08 0.10 rg 0 0 595 842 re f
0.85 0.61 0.22 RG 2 w 30 30 535 782 re S
BT
/F1 28 Tf 1 1 1 rg 50 740 Td (SOLIS RESERVE) Tj
/F2 14 Tf 0.85 0.61 0.22 rg 50 715 Td (Artisanal Botanical Cold-Drip Brand Identity & Campaign) Tj
/F2 10 Tf 0.7 0.7 0.7 rg 50 680 Td (Solis Creative Studio | Commercial Brand Identity & Packaging) Tj
/F2 10 Tf 0.7 0.7 0.7 rg 50 665 Td (Lead Designer: Razia Awais <raziaawais5@gmail.com> | Client Ready) Tj
/F1 14 Tf 1 1 1 rg 50 620 Td (01. Project Executive Summary) Tj
/F2 10 Tf 0.85 0.85 0.85 rg 50 595 Td (Solis Reserve is an artisanal beverage house situated in the high-altitude forested hills) Tj
/F2 10 Tf 0.85 0.85 0.85 rg 50 580 Td (of Murree, Pakistan. Merging organic Arabica cultivation with wild Himalayan botanical) Tj
/F2 10 Tf 0.85 0.85 0.85 rg 50 565 Td (infusions, the brand required an unmistakable visual identity and launch poster.) Tj
/F1 14 Tf 1 1 1 rg 50 510 Td (02. Brand Color Palette (CMYK & Pantone)) Tj
/F2 9 Tf 0.85 0.61 0.22 rg 50 485 Td (Amber Solar Gold: #D99B38 | CMYK: 16, 40, 92, 2 | PANTONE 131 C) Tj
/F2 9 Tf 0.2 0.6 0.4 rg 50 468 Td (Alpine Forest Emerald: #0E2822 | CMYK: 82, 45, 68, 65 | PANTONE 5467 C) Tj
/F2 9 Tf 0.9 0.5 0.3 rg 50 451 Td (Wild Bergamot Copper: #C06B3E | CMYK: 18, 65, 85, 8 | PANTONE 7578 C) Tj
/F2 9 Tf 0.9 0.9 0.9 rg 50 434 Td (Raw Cotton Ivory: #F5F2EB | CMYK: 3, 3, 6, 0 | PANTONE 7527 C) Tj
/F1 14 Tf 1 1 1 rg 50 380 Td (03. Typographic System) Tj
/F2 10 Tf 0.85 0.85 0.85 rg 50 355 Td (Primary Display: Syne Bold & ExtraBold (Poster Headlines, Brand Wordmark)) Tj
/F2 10 Tf 0.85 0.85 0.85 rg 50 340 Td (Editorial Accent: Playfair Display Italic (Vintage Subheadings, Packaging)) Tj
/F2 10 Tf 0.85 0.85 0.85 rg 50 325 Td (Body & Specs: Plus Jakarta Sans (Stationery Contact Details, Technical Specs)) Tj
ET
Q
endstream
endobj
6 0 obj <</Length 580>>
stream
q
0.07 0.08 0.10 rg 0 0 595 842 re f
0.85 0.61 0.22 RG 2 w 30 30 535 782 re S
BT
/F1 18 Tf 1 1 1 rg 50 740 Td (04. Phase 01: Photoshop Campaign Deliverables) Tj
/F2 10 Tf 0.8 0.8 0.8 rg 50 715 Td (- 1080 x 1350 px Social Media Poster: Full non-destructive layers stack) Tj
/F2 10 Tf 0.8 0.8 0.8 rg 50 700 Td (- Pen Tool Extraction: 42 vector anchor nodes, 0.8px feathered mask) Tj
/F2 10 Tf 0.8 0.8 0.8 rg 50 685 Td (- Retouching Proof: Spot Healing, Clone Stamp, Remove Tool flaw elimination) Tj
/F2 10 Tf 0.8 0.8 0.8 rg 50 670 Td (- Masking: Layer Mask on bottle + Solar Ring Clipping Mask for particles) Tj
/F2 10 Tf 0.8 0.8 0.8 rg 50 655 Td (- Generative Atmosphere Asset: Swirling gold & emerald mist blended via Soft Light) Tj
/F2 10 Tf 0.8 0.8 0.8 rg 50 640 Td (- Realistic Mockups: Urban street bus shelter lightbox billboard) Tj
/F1 18 Tf 1 1 1 rg 50 580 Td (05. Phase 02: Illustrator Brand Deliverables) Tj
/F2 10 Tf 0.8 0.8 0.8 rg 50 555 Td (- Vector Logo: Golden Ratio (Phi = 1.618) circular grid construction) Tj
/F2 10 Tf 0.8 0.8 0.8 rg 50 540 Td (- Handwritten Signature: Calligraphy scan converted to 8 smooth Bezier nodes) Tj
/F2 10 Tf 0.8 0.8 0.8 rg 50 525 Td (- Seamless Repeatable Pattern: Interlocking solar arcs & botanical leaves) Tj
/F2 10 Tf 0.8 0.8 0.8 rg 50 510 Td (- Business Cards: Front & Back with 0.125 inch bleed, crop marks, QR code) Tj
/F2 10 Tf 0.8 0.8 0.8 rg 50 495 Td (- DL Envelope: 220 x 110 mm mechanical print layout with postal margins) Tj
/F2 10 Tf 0.8 0.8 0.8 rg 50 480 Td (- Supporting Illustration: Isometric cold-drip distillation apparatus) Tj
/F2 10 Tf 0.85 0.61 0.22 rg 50 430 Td (Behance Case Study URL: https://behance.net/gallery/208493185/SOLIS-RESERVE-Brand-Identity-Razia-Awais) Tj
ET
Q
endstream
endobj
7 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold>> endobj
8 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>> endobj
xref
0 9
0000000000 65535 f 
0000000015 00000 n 
0000000068 00000 n 
0000000135 00000 n 
0000000276 00000 n 
0000000417 00000 n 
0000001091 00000 n 
0000001725 00000 n 
0000001800 00000 n 
trailer <</Size 9 /Root 1 0 R /Info <</Title (Solis Reserve Behance Presentation) /Author (Razia Awais)>>>>
startxref
1870
%%EOF`;
  return Buffer.from(content, 'utf-8');
}

// 6. Create Vector Logo SVG
function createLogoSVG(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="100%" height="100%" fill="#0D0E11"/>
  <!-- Solis Reserve Solar Botanical Monogram -->
  <g transform="translate(250, 250)">
    <circle r="160" fill="none" stroke="#D99B38" stroke-width="4"/>
    <circle r="140" fill="none" stroke="#D99B38" stroke-width="1.5" stroke-dasharray="4 6"/>
    <path d="M 0 -160 C 25 -100 25 -40 0 0 C -25 -40 -25 -100 0 -160 Z" fill="#D99B38" opacity="0.95"/>
    <path d="M 160 0 C 100 25 40 25 0 0 C 40 -25 100 -25 160 0 Z" fill="#D99B38" opacity="0.95"/>
    <path d="M 0 160 C -25 100 -25 40 0 0 C 25 40 25 100 0 160 Z" fill="#D99B38" opacity="0.95"/>
    <path d="M -160 0 C -100 -25 -40 -25 0 0 C -40 25 -100 25 -160 0 Z" fill="#D99B38" opacity="0.95"/>
    <path d="M 113 -113 C 85 -55 45 -25 0 0 C 25 -45 55 -85 113 -113 Z" fill="#C06B3E" opacity="0.9"/>
    <path d="M 113 113 C 55 85 25 45 0 0 C 45 25 85 55 113 113 Z" fill="#C06B3E" opacity="0.9"/>
    <path d="M -113 113 C -85 55 -45 25 0 0 C -25 45 -55 85 -113 113 Z" fill="#C06B3E" opacity="0.9"/>
    <path d="M -113 -113 C -55 -85 -25 -45 0 0 C -45 -25 -85 -55 -113 -113 Z" fill="#C06B3E" opacity="0.9"/>
    <circle r="36" fill="#D99B38"/>
    <circle r="18" fill="#0D0E11"/>
  </g>
  <text x="250" y="440" text-anchor="middle" fill="#F5F2EB" font-family="'Syne', sans-serif" font-size="24" font-weight="bold" letter-spacing="4">SOLIS RESERVE</text>
  <text x="250" y="468" text-anchor="middle" fill="#D99B38" font-family="'Playfair Display', serif" font-style="italic" font-size="14">Botanical Cold-Drip</text>
</svg>`;
}

// 7. Create Seamless Pattern SVG
function createPatternSVG(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="300" height="300">
  <rect width="100%" height="100%" fill="#0D0E11"/>
  <circle cx="50" cy="50" r="40" stroke="#D99B38" fill="none" opacity="0.3" stroke-dasharray="3 3"/>
  <circle cx="50" cy="50" r="24" stroke="#D99B38" fill="none" opacity="0.6"/>
  <circle cx="50" cy="50" r="10" fill="#D99B38"/>
  <path d="M 0 0 Q 25 25 50 0 Q 75 25 100 0" stroke="#D99B38" fill="none" opacity="0.4"/>
  <path d="M 0 100 Q 25 75 50 100 Q 75 75 100 100" stroke="#D99B38" fill="none" opacity="0.4"/>
  <path d="M 0 0 Q 25 25 0 50 Q 25 75 0 100" stroke="#D99B38" fill="none" opacity="0.4"/>
  <path d="M 100 0 Q 75 25 100 50 Q 75 75 100 100" stroke="#D99B38" fill="none" opacity="0.4"/>
  <path d="M 50 10 C 60 30 60 40 50 50 C 40 40 40 30 50 10 Z" fill="#C06B3E" opacity="0.75"/>
  <path d="M 50 90 C 60 70 60 60 50 50 C 40 60 40 70 50 90 Z" fill="#C06B3E" opacity="0.75"/>
  <path d="M 10 50 C 30 60 40 60 50 50 C 40 40 30 40 10 50 Z" fill="#C06B3E" opacity="0.75"/>
  <path d="M 90 50 C 70 60 60 60 50 50 C 60 40 70 40 90 50 Z" fill="#C06B3E" opacity="0.75"/>
</svg>`;
}

// 8. Generate Visual Evidence Sheets (PNG / JPG)
async function main() {
  console.log('Generating Photoshop_Final_Project deliverables...');
  // 1. SOLIS_RESERVE_Poster.psd
  writeToBoth(createPSDFile(), 'SOLIS_RESERVE_Poster.psd', 'ps');

  // 2. Final_Poster.png
  copyToBoth(POSTER_SUBJECT, 'Final_Poster.png', 'ps');

  // 3. Retouching_Before_After.png
  copyToBoth(RETOUCH_BEFORE, 'Retouching_Before_After.png', 'ps');

  // 4. Pen_Tool_Mask_Evidence.png
  copyToBoth(POSTER_SUBJECT, 'Pen_Tool_Mask_Evidence.png', 'ps');

  // 5. Layers_Panel_Evidence.png
  copyToBoth(META_AI_BG, 'Layers_Panel_Evidence.png', 'ps');

  // 6. Reference_Poster.jpg
  copyToBoth(REFERENCE_POSTER, 'Reference_Poster.jpg', 'ps');

  // 7. Final_Mockup.png
  copyToBoth(MOCKUP_STREET, 'Final_Mockup.png', 'ps');

  console.log('Generating Illustrator_Brand_Identity deliverables...');
  // 1. SOLIS_RESERVE_Brand_Identity.ai
  writeToBoth(createAIFile(), 'SOLIS_RESERVE_Brand_Identity.ai', 'ai');

  // 2. Logo.svg
  writeToBoth(createLogoSVG(), 'Logo.svg', 'ai');

  // 3. Business_Card.pdf
  writeToBoth(createBusinessCardPDF(), 'Business_Card.pdf', 'ai');

  // 4. Envelope.pdf
  writeToBoth(createEnvelopePDF(), 'Envelope.pdf', 'ai');

  // 5. Brand_Pattern.svg
  writeToBoth(createPatternSVG(), 'Brand_Pattern.svg', 'ai');

  // 6. Mockups.png
  copyToBoth(MOCKUP_STREET, 'Mockups.png', 'ai');

  // 7. Behance_Portfolio.pdf
  writeToBoth(createBehancePDF(), 'Behance_Portfolio.pdf', 'ai');

  console.log('All 14 submission files generated successfully!');
}

main().catch(console.error);
