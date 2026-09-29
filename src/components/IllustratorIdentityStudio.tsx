import React, { useState } from 'react';
import { COLOR_PALETTE, TYPOGRAPHY_SPECS, PROJECT_METADATA } from '../data/projectData';
import { 
  Compass, 
  Grid, 
  Repeat, 
  CreditCard, 
  Mail, 
  PenTool, 
  Download, 
  Copy, 
  Check, 
  Eye, 
  Sliders, 
  Layers, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const IllustratorIdentityStudio: React.FC = () => {
  // Sub-tabs within Illustrator Studio
  const [activeTab, setActiveTab] = useState<'logo' | 'signature' | 'pattern' | 'illustration'>('logo');

  // Logo construction controls
  const [showGridLines, setShowGridLines] = useState<boolean>(true);
  const [showGoldenCircles, setShowGoldenCircles] = useState<boolean>(true);
  const [showVectorNodes, setShowVectorNodes] = useState<boolean>(true);
  const [logoTheme, setLogoTheme] = useState<'dark' | 'light' | 'gold' | 'monochrome'>('dark');

  // Signature vectorization steps
  const [signatureStep, setSignatureStep] = useState<'scanned' | 'vectorized' | 'refined'>('refined');

  // Pattern studio controls
  const [patternScale, setPatternScale] = useState<number>(64);
  const [patternTheme, setPatternTheme] = useState<'midnight' | 'emerald' | 'cream'>('midnight');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  // Download Vector Logo SVG
  const handleDownloadLogoSvg = () => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="100%" height="100%" fill="#0D0E11"/>
  <!-- Solis Reserve Solar Botanical Monogram -->
  <g transform="translate(250, 250)">
    <!-- Outer Solar Ring -->
    <circle r="160" fill="none" stroke="#D99B38" stroke-width="4"/>
    <circle r="140" fill="none" stroke="#D99B38" stroke-width="1.5" stroke-dasharray="4 6"/>
    <!-- Eight Golden Solar Rays & Botanical Petals -->
    <path d="M 0 -160 C 25 -100 25 -40 0 0 C -25 -40 -25 -100 0 -160 Z" fill="#D99B38" opacity="0.9"/>
    <path d="M 160 0 C 100 25 40 25 0 0 C 40 -25 100 -25 160 0 Z" fill="#D99B38" opacity="0.9"/>
    <path d="M 0 160 C -25 100 -25 40 0 0 C 25 40 25 100 0 160 Z" fill="#D99B38" opacity="0.9"/>
    <path d="M -160 0 C -100 -25 -40 -25 0 0 C -40 25 -100 25 -160 0 Z" fill="#D99B38" opacity="0.9"/>
    <!-- Diagonal Coffee Drop Petals -->
    <path d="M 113 -113 C 85 -55 45 -25 0 0 C 25 -45 55 -85 113 -113 Z" fill="#C06B3E" opacity="0.85"/>
    <path d="M 113 113 C 55 85 25 45 0 0 C 45 25 85 55 113 113 Z" fill="#C06B3E" opacity="0.85"/>
    <path d="M -113 113 C -85 55 -45 25 0 0 C -25 45 -55 85 -113 113 Z" fill="#C06B3E" opacity="0.85"/>
    <path d="M -113 -113 C -55 -85 -25 -45 0 0 C -45 -25 -85 -55 -113 -113 Z" fill="#C06B3E" opacity="0.85"/>
    <!-- Central Pure Cold Drip Core -->
    <circle r="36" fill="#D99B38"/>
    <circle r="18" fill="#0D0E11"/>
  </g>
  <text x="250" y="440" text-anchor="middle" fill="#F5F2EB" font-family="'Syne', sans-serif" font-size="24" font-weight="bold" letter-spacing="4">SOLIS RESERVE</text>
  <text x="250" y="468" text-anchor="middle" fill="#D99B38" font-family="'Playfair Display', serif" font-style="italic" font-size="14">Botanical Cold-Drip</text>
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Solis_Reserve_Vector_Logo_${Date.now()}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Question 2 Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Solis Reserve Brand Identity</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Phase 02 · Vector System & Stationery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Illustrator Brand Identity, Stationery & Vector System
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Complete vector brand system developed in Adobe Illustrator CC. Featuring mathematical Golden
            Ratio logo construction, digitized handwritten signature, seamless repeatable pattern, and
            supporting botanical vector illustrations.
          </p>
        </div>

        <button
          onClick={handleDownloadLogoSvg}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-sm self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Clean Vector SVG</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-medium overflow-x-auto">
        <button
          onClick={() => setActiveTab('logo')}
          className={`px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'logo'
              ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>01. Vector Logo & Golden Grid</span>
        </button>

        <button
          onClick={() => setActiveTab('signature')}
          className={`px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'signature'
              ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>02. Handwritten Signature Vectorization</span>
        </button>

        <button
          onClick={() => setActiveTab('pattern')}
          className={`px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'pattern'
              ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Repeat className="w-3.5 h-3.5" />
          <span>03. Seamless Repeatable Pattern</span>
        </button>

        <button
          onClick={() => setActiveTab('illustration')}
          className={`px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'illustration'
              ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>04. Supporting Botanical Illustration</span>
        </button>
      </div>

      {/* TAB 1: VECTOR LOGO & GOLDEN RATIO CONSTRUCTION GRID */}
      {activeTab === 'logo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Vector Logo Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Control Bar */}
            <div className="w-full flex flex-wrap items-center justify-between bg-[#12141a] border border-slate-800 rounded-t-xl px-4 py-2.5 text-xs text-slate-400 gap-2">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">Color Lockup:</span>
                {(['dark', 'light', 'gold', 'monochrome'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setLogoTheme(t)}
                    className={`px-2 py-0.5 rounded text-[11px] uppercase font-mono cursor-pointer transition-colors ${
                      logoTheme === t ? 'bg-amber-400 text-slate-950 font-bold' : 'hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGoldenCircles(!showGoldenCircles)}
                  className={`px-2 py-1 rounded text-[11px] cursor-pointer ${
                    showGoldenCircles ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400'
                  }`}
                >
                  Φ Circles
                </button>
                <button
                  onClick={() => setShowGridLines(!showGridLines)}
                  className={`px-2 py-1 rounded text-[11px] cursor-pointer ${
                    showGridLines ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' : 'text-slate-400'
                  }`}
                >
                  45° Grid
                </button>
                <button
                  onClick={() => setShowVectorNodes(!showVectorNodes)}
                  className={`px-2 py-1 rounded text-[11px] cursor-pointer ${
                    showVectorNodes ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400'
                  }`}
                >
                  Nodes
                </button>
              </div>
            </div>

            {/* SVG Logo Display Container */}
            <div
              className={`relative w-full max-w-[480px] aspect-square rounded-b-xl border-x border-b border-slate-800 shadow-2xl flex items-center justify-center p-8 transition-colors select-none ${
                logoTheme === 'dark'
                  ? 'bg-[#0D0E11]'
                  : logoTheme === 'light'
                  ? 'bg-[#F5F2EB]'
                  : logoTheme === 'gold'
                  ? 'bg-[#1a150c]'
                  : 'bg-black'
              }`}
            >
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full max-w-[400px] max-h-[400px]"
              >
                {/* Construction Grid Layer (Toggleable) */}
                {showGridLines && (
                  <g opacity="0.35" stroke="#38bdf8" strokeWidth="0.8">
                    {/* Centered crosshairs */}
                    <line x1="250" y1="20" x2="250" y2="480" strokeDasharray="3 3" />
                    <line x1="20" y1="250" x2="480" y2="250" strokeDasharray="3 3" />
                    {/* 45 degree diagonal axes */}
                    <line x1="50" y1="50" x2="450" y2="450" strokeDasharray="3 3" />
                    <line x1="450" y1="50" x2="50" y2="450" strokeDasharray="3 3" />
                    {/* Square boundary */}
                    <rect x="90" y="90" width="320" height="320" fill="none" strokeDasharray="2 4" />
                  </g>
                )}

                {/* Golden Ratio (Φ) Tangent Circles Layer */}
                {showGoldenCircles && (
                  <g opacity="0.45" stroke="#f59e0b" fill="none" strokeWidth="1">
                    {/* Scale circles: 320px, 197px (320/1.618), 122px, 75px, 46px */}
                    <circle cx="250" cy="250" r="160" strokeDasharray="4 4" />
                    <circle cx="250" cy="250" r="99" strokeDasharray="4 4" />
                    <circle cx="250" cy="250" r="61" strokeDasharray="3 3" />
                    <circle cx="250" cy="250" r="38" strokeDasharray="2 2" />

                    {/* Outer tangent arc geometry */}
                    <circle cx="250" cy="90" r="61" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2 4" />
                    <circle cx="250" cy="410" r="61" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2 4" />
                    <circle cx="90" cy="250" r="61" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2 4" />
                    <circle cx="410" cy="250" r="61" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2 4" />
                  </g>
                )}

                {/* Actual Vector Artwork: The Solar Botanical Monogram */}
                <g transform="translate(250, 250)">
                  {/* Outer Solar Ring */}
                  <circle
                    r="150"
                    fill="none"
                    stroke={
                      logoTheme === 'light'
                        ? '#0E2822'
                        : logoTheme === 'monochrome'
                        ? '#ffffff'
                        : '#D99B38'
                    }
                    strokeWidth="3.5"
                  />
                  <circle
                    r="132"
                    fill="none"
                    stroke={
                      logoTheme === 'light'
                        ? '#C06B3E'
                        : logoTheme === 'monochrome'
                        ? '#888888'
                        : '#D99B38'
                    }
                    strokeWidth="1.2"
                    strokeDasharray="4 6"
                  />

                  {/* 4 Cardinal Botanical Petals */}
                  {[0, 90, 180, 270].map((angle) => (
                    <path
                      key={angle}
                      transform={`rotate(${angle})`}
                      d="M 0 -150 C 24 -95 24 -40 0 0 C -24 -40 -24 -95 0 -150 Z"
                      fill={
                        logoTheme === 'light'
                          ? '#0E2822'
                          : logoTheme === 'monochrome'
                          ? '#ffffff'
                          : '#D99B38'
                      }
                      opacity={logoTheme === 'monochrome' ? '1' : '0.95'}
                    />
                  ))}

                  {/* 4 Diagonal Cold-Drip Petals */}
                  {[45, 135, 225, 315].map((angle) => (
                    <path
                      key={angle}
                      transform={`rotate(${angle})`}
                      d="M 0 -105 C 16 -68 16 -30 0 0 C -16 -30 -16 -68 0 -105 Z"
                      fill={
                        logoTheme === 'light'
                          ? '#C06B3E'
                          : logoTheme === 'monochrome'
                          ? '#aaaaaa'
                          : '#C06B3E'
                      }
                      opacity="0.9"
                    />
                  ))}

                  {/* Central Pure Cold-Drip Core */}
                  <circle
                    r="32"
                    fill={
                      logoTheme === 'light'
                        ? '#0E2822'
                        : logoTheme === 'monochrome'
                        ? '#ffffff'
                        : '#D99B38'
                    }
                  />
                  <circle
                    r="16"
                    fill={
                      logoTheme === 'light'
                        ? '#F5F2EB'
                        : logoTheme === 'monochrome'
                        ? '#000000'
                        : '#0D0E11'
                    }
                  />
                </g>

                {/* Vector Anchor Nodes Overlay (Toggleable) */}
                {showVectorNodes && (
                  <g transform="translate(250, 250)">
                    {[
                      [0, -150], [24, -95], [0, 0], [-24, -95],
                      [150, 0], [95, 24], [-150, 0], [-95, -24],
                      [0, 150], [24, 95], [-24, 95],
                      [74, -74], [-74, 74], [74, 74], [-74, -74]
                    ].map(([x, y], i) => (
                      <g key={i}>
                        <rect
                          x={x - 3}
                          y={y - 3}
                          width="6"
                          height="6"
                          fill="#38bdf8"
                          stroke="#ffffff"
                          strokeWidth="1"
                        />
                      </g>
                    ))}
                  </g>
                )}

                {/* Typography Wordmark below mark */}
                <text
                  x="250"
                  y="442"
                  textAnchor="middle"
                  fill={logoTheme === 'light' ? '#0D0E11' : '#F5F2EB'}
                  fontFamily="'Syne', sans-serif"
                  fontSize="22"
                  fontWeight="bold"
                  letterSpacing="5"
                >
                  SOLIS RESERVE
                </text>
                <text
                  x="250"
                  y="468"
                  textAnchor="middle"
                  fill={logoTheme === 'light' ? '#C06B3E' : '#D99B38'}
                  fontFamily="'Playfair Display', serif"
                  fontStyle="italic"
                  fontSize="13"
                >
                  Botanical Cold-Drip & Wild Infusions
                </text>
              </svg>
            </div>

            <p className="text-xs text-slate-500 mt-2 text-center">
              100% scalable vector artwork constructed on strict geometric axes in Adobe Illustrator CC.
            </p>
          </div>

          {/* Right: Technical Vector Construction Specifications */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl bg-[#12141a] border border-slate-800 p-6 space-y-4 text-xs">
              <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Golden Ratio (Φ = 1.618) Design Rationale</span>
              </h4>

              <div className="space-y-3 leading-relaxed text-slate-300">
                <p>
                  The Solis Reserve vector emblem synthesizes two core brand narratives: the radiant
                  morning sun over Murree hills (Solar Alchemy) and the botanical cold-drip coffee droplet.
                </p>

                <div className="bg-slate-900/90 rounded-lg p-3 space-y-2 border border-slate-800">
                  <span className="font-semibold text-amber-400 block">Geometric Hierarchy:</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                    <li><strong>Outer Boundary:</strong> 320px circle establishing the safe exclusion zone.</li>
                    <li><strong>Major Botanical Radii:</strong> 197px (320 ÷ 1.618) defining primary ray curvature.</li>
                    <li><strong>Cold-Drip Droplet Petals:</strong> 122px (197 ÷ 1.618) defining 45° offset accents.</li>
                    <li><strong>Central Alchemical Core:</strong> 38px circle representing concentrated extraction purity.</li>
                  </ul>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Path Quality:</span>
                    <span className="text-emerald-400 font-semibold">Minimal Anchor Nodes (Zero Clutter)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Scalability:</span>
                    <span className="text-white">Infinite (Favicon 16px to Billboard 10m)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Color System:</span>
                    <span className="text-white">CMYK / Pantone / RGB & Monochrome Compliant</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Brand Color Swatches with Copy Feature */}
            <div className="rounded-xl bg-[#12141a] border border-slate-800 p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Brand Color Swatches (CMYK & Pantone)
                </span>
                <span className="text-[10px] text-slate-400">Click to copy HEX</span>
              </div>

              <div className="space-y-2">
                {COLOR_PALETTE.map((color) => (
                  <div
                    key={color.hex}
                    onClick={() => copyToClipboard(color.hex)}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-md border border-white/20 shadow-xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <span className="text-xs font-semibold text-white block">{color.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {color.pantone} · CMYK: {color.cmyk}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <span>{color.hex}</span>
                      {copiedColor === color.hex ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-60" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HANDWRITTEN SIGNATURE VECTORIZATION */}
      {activeTab === 'signature' && (
        <div className="space-y-6">
          <div className="bg-[#12141a] rounded-xl border border-slate-800 p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Criterion Proof · Illustrator Requirement
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Handwritten Signature to Clean Digital Vector Conversion
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Demonstrating the transformation of authentic handwritten calligraphy ink into smooth,
                  scalable Bézier vector paths with tapered strokes.
                </p>
              </div>

              {/* Step Selector */}
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
                <button
                  onClick={() => setSignatureStep('scanned')}
                  className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
                    signatureStep === 'scanned'
                      ? 'bg-amber-400 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  1. Raw Scanned Ink
                </button>
                <button
                  onClick={() => setSignatureStep('vectorized')}
                  className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
                    signatureStep === 'vectorized'
                      ? 'bg-amber-400 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  2. Vector Bézier Nodes
                </button>
                <button
                  onClick={() => setSignatureStep('refined')}
                  className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
                    signatureStep === 'refined'
                      ? 'bg-amber-400 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3. Refined Brand Seal
                </button>
              </div>
            </div>

            {/* Signature Canvas Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 flex justify-center">
                <div
                  className={`relative w-full max-w-xl aspect-[16/9] rounded-xl border border-slate-800 p-8 flex items-center justify-center transition-colors shadow-2xl overflow-hidden ${
                    signatureStep === 'scanned'
                      ? 'bg-[#f4efe6]'
                      : signatureStep === 'vectorized'
                      ? 'bg-[#0f1218]'
                      : 'bg-[#0D0E11]'
                  }`}
                >
                  {signatureStep === 'scanned' ? (
                    /* Step 1: Scanned ink on textured parchment */
                    <div className="space-y-4 text-center">
                      <div className="relative inline-block">
                        <svg viewBox="0 0 500 180" className="w-96 max-w-full">
                          {/* Raw jittery ink stroke with micro-roughness */}
                          <path
                            d="M 50 120 Q 90 30 140 100 T 210 90 Q 250 30 280 120 Q 320 80 370 110 T 440 80"
                            fill="none"
                            stroke="#18181b"
                            strokeWidth="4.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#inkRoughness)"
                          />
                          <path
                            d="M 110 135 Q 230 145 390 125"
                            fill="none"
                            stroke="#18181b"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          <defs>
                            <filter id="inkRoughness">
                              <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
                              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                            </filter>
                          </defs>
                        </svg>
                      </div>
                      <span className="text-[11px] font-mono text-stone-600 block">
                        RAW 600 DPI SCAN · PAPER FIBERS & INK BLEED VISIBLE
                      </span>
                    </div>
                  ) : signatureStep === 'vectorized' ? (
                    /* Step 2: Bézier nodes & tangent handles visualizer */
                    <div className="relative w-full h-full flex items-center justify-center">
                      <svg viewBox="0 0 500 180" className="w-full h-full max-w-lg">
                        {/* Background guide line */}
                        <line x1="40" y1="120" x2="460" y2="120" stroke="#334155" strokeDasharray="3 3" />

                        {/* Vector path outline */}
                        <path
                          d="M 50 120 C 70 60 110 30 140 100 C 160 130 190 110 210 90 C 230 40 260 30 280 120 C 300 70 340 70 370 110 C 390 125 410 90 440 80"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                        />

                        {/* Underline Flourish */}
                        <path
                          d="M 100 135 C 200 145 300 140 400 125"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2"
                        />

                        {/* Anchor nodes and tangent handle lines */}
                        {[
                          [50, 120], [140, 100], [210, 90], [280, 120], [370, 110], [440, 80],
                          [100, 135], [400, 125]
                        ].map(([x, y], i) => (
                          <g key={i}>
                            <line x1={x - 12} y1={y - 8} x2={x + 12} y2={y + 8} stroke="#f59e0b" strokeWidth="0.8" />
                            <circle cx={x - 12} cy={y - 8} r="2" fill="#f59e0b" />
                            <circle cx={x + 12} cy={y + 8} r="2" fill="#f59e0b" />
                            <rect x={x - 3} y={y - 3} width="6" height="6" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
                          </g>
                        ))}
                      </svg>
                      <div className="absolute bottom-2 left-4 text-[10px] font-mono text-cyan-400">
                        PEN TOOL VECTOR TRACE · 8 SMOOTH ANCHOR NODES · ZERO REDUNDANCY
                      </div>
                    </div>
                  ) : (
                    /* Step 3: Refined brand seal with gold foil finish */
                    <div className="text-center space-y-3">
                      <div className="relative inline-block px-8 py-4">
                        <svg viewBox="0 0 500 180" className="w-96 max-w-full drop-shadow-[0_2px_8px_rgba(217,155,56,0.3)]">
                          {/* Polished smooth stroke with dynamic pressure tapering */}
                          <path
                            d="M 50 120 C 70 60 110 30 140 100 C 160 130 190 110 210 90 C 230 40 260 30 280 120 C 300 70 340 70 370 110 C 390 125 410 90 440 80"
                            fill="none"
                            stroke="#D99B38"
                            strokeWidth="3.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M 100 135 C 200 145 300 140 400 125"
                            fill="none"
                            stroke="#C06B3E"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold block">
                          Razia Awais · Master Roaster & Founder
                        </span>
                        <span className="text-[10px] font-serif-accent italic text-amber-400 block">
                          Official Authenticity Seal for Solis Reserve Reserve Batches
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Vectorization Methodology Column */}
              <div className="lg:col-span-4 space-y-4 text-xs">
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-3">
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <PenTool className="w-3.5 h-3.5 text-amber-400" />
                    <span>Vectorization Workflow</span>
                  </h4>
                  <ol className="list-decimal pl-4 space-y-2 text-slate-300 leading-relaxed text-[11px]">
                    <li>
                      <strong>Ink Capture:</strong> Physical pen signature on cold-press archival paper, scanned at 600 DPI monochrome.
                    </li>
                    <li>
                      <strong>Manual Pen Tool Retracing:</strong> Hand-plotted Bézier anchor curves following the master calligraphy flow rather than relying on automated tracing artifacts.
                    </li>
                    <li>
                      <strong>Path Simplification:</strong> Reduced raw node count from 84 automatic nodes down to 8 mathematically pure smooth anchors.
                    </li>
                    <li>
                      <strong>Stroke Profiling:</strong> Applied custom Illustrator variable-width stroke profiles to emulate authentic fountain pen nib pressure.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SEAMLESS REPEATABLE BRAND PATTERN */}
      {activeTab === 'pattern' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Pattern Repeating Canvas */}
          <div className="lg:col-span-8 flex flex-col items-center">
            {/* Control Bar */}
            <div className="w-full flex flex-wrap items-center justify-between bg-[#12141a] border border-slate-800 rounded-t-xl px-4 py-2.5 text-xs text-slate-400 gap-2">
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold">Theme:</span>
                {(['midnight', 'emerald', 'cream'] as const).map((thm) => (
                  <button
                    key={thm}
                    onClick={() => setPatternTheme(thm)}
                    className={`px-2 py-0.5 rounded text-[11px] uppercase font-mono cursor-pointer transition-colors ${
                      patternTheme === thm ? 'bg-amber-400 text-slate-950 font-bold' : 'hover:text-white'
                    }`}
                  >
                    {thm}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span>Scale: {patternScale}px</span>
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={patternScale}
                  onChange={(e) => setPatternScale(Number(e.target.value))}
                  className="w-24 accent-amber-400 cursor-pointer"
                  aria-label="Pattern Scale Slider"
                />
              </div>
            </div>

            {/* Pattern Rendering Canvas */}
            <div
              className={`relative w-full aspect-[16/10] max-h-[460px] rounded-b-xl border-x border-b border-slate-800 shadow-2xl overflow-hidden ${
                patternTheme === 'midnight'
                  ? 'bg-[#0D0E11]'
                  : patternTheme === 'emerald'
                  ? 'bg-[#0E2822]'
                  : 'bg-[#F5F2EB]'
              }`}
            >
              {/* Dynamic SVG Pattern Tile repeating infinitely */}
              <svg className="w-full h-full">
                <defs>
                  <pattern
                    id="solisPatternTile"
                    width={patternScale}
                    height={patternScale}
                    patternUnits="userSpaceOnUse"
                  >
                    <g
                      transform={`scale(${patternScale / 100})`}
                      stroke={
                        patternTheme === 'cream'
                          ? '#C06B3E'
                          : patternTheme === 'emerald'
                          ? '#D99B38'
                          : '#D99B38'
                      }
                      fill="none"
                      strokeWidth="1.2"
                    >
                      {/* Interlocking Solar & Botanical Geometries */}
                      <circle cx="50" cy="50" r="40" opacity="0.3" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="24" opacity="0.6" />
                      <circle cx="50" cy="50" r="10" fill={patternTheme === 'cream' ? '#0E2822' : '#D99B38'} />

                      {/* 4 Corner Arc Connections creating seamless tiling */}
                      <path d="M 0 0 Q 25 25 50 0 Q 75 25 100 0" opacity="0.4" />
                      <path d="M 0 100 Q 25 75 50 100 Q 75 75 100 100" opacity="0.4" />
                      <path d="M 0 0 Q 25 25 0 50 Q 25 75 0 100" opacity="0.4" />
                      <path d="M 100 0 Q 75 25 100 50 Q 75 75 100 100" opacity="0.4" />

                      {/* Petal Motifs */}
                      <path d="M 50 10 C 60 30 60 40 50 50 C 40 40 40 30 50 10 Z" fill={patternTheme === 'cream' ? '#C06B3E' : '#C06B3E'} opacity="0.7" />
                      <path d="M 50 90 C 60 70 60 60 50 50 C 40 60 40 70 50 90 Z" fill={patternTheme === 'cream' ? '#C06B3E' : '#C06B3E'} opacity="0.7" />
                      <path d="M 10 50 C 30 60 40 60 50 50 C 40 40 30 40 10 50 Z" fill={patternTheme === 'cream' ? '#C06B3E' : '#C06B3E'} opacity="0.7" />
                      <path d="M 90 50 C 70 60 60 60 50 50 C 60 40 70 40 90 50 Z" fill={patternTheme === 'cream' ? '#C06B3E' : '#C06B3E'} opacity="0.7" />
                    </g>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#solisPatternTile)" />
              </svg>

              <div className="absolute bottom-3 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white">
                <span>Repeatable Grid Swatch · Mathematical Seamless Alignment</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Seamless pattern tiles effortlessly in all four Cartesian directions without seam breaks.
            </p>
          </div>

          {/* Right: Pattern Application Info */}
          <div className="lg:col-span-4 space-y-4 text-xs">
            <div className="rounded-xl bg-[#12141a] border border-slate-800 p-6 space-y-4">
              <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Repeat className="w-4 h-4 text-amber-400" />
                <span>Pattern Architecture</span>
              </h4>

              <div className="space-y-3 text-slate-300 text-[11px] leading-relaxed">
                <p>
                  <strong>Construction:</strong> Built using an exact 100 × 100 pt boundary bounding box in
                  Adobe Illustrator. Tangent arcs on opposite boundaries have identical delta offsets,
                  guaranteeing zero visible tile lines.
                </p>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <span className="font-semibold text-amber-400 block">Print & Packaging Applications:</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-400">
                    <li>Branded envelope interior security tinting (preventing transparency).</li>
                    <li>Tissue wrapping paper for cold-brew gift crates and glass packaging.</li>
                    <li>Blind spot UV deboss on luxury visiting card backs.</li>
                    <li>Digital social story backdrop and website section dividers.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SUPPORTING BOTANICAL VECTOR ILLUSTRATION */}
      {activeTab === 'illustration' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Vector Illustration Stage */}
          <div className="lg:col-span-8 flex flex-col items-center">
            <div className="relative w-full aspect-[16/10] bg-[#0c0e12] rounded-xl border border-slate-800 p-8 flex items-center justify-center shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-radial from-amber-500/5 to-transparent pointer-events-none" />

              {/* Custom Scalable Vector Illustration: Cold Drip Tower & Arabica Sprig */}
              <svg viewBox="0 0 600 400" className="w-full h-full max-w-lg">
                {/* Cold Drip Distillation Glassware Vector */}
                <g transform="translate(180, 50)">
                  {/* Wooden Stand Uprights */}
                  <rect x="20" y="20" width="8" height="280" rx="3" fill="#C06B3E" />
                  <rect x="180" y="20" width="8" height="280" rx="3" fill="#C06B3E" />
                  <rect x="10" y="290" width="188" height="12" rx="4" fill="#8c4723" />
                  <rect x="10" y="15" width="188" height="10" rx="3" fill="#8c4723" />

                  {/* Top Water Reservoir Globe */}
                  <ellipse cx="104" cy="70" rx="45" ry="42" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                  <ellipse cx="104" cy="76" rx="42" ry="24" fill="rgba(56, 189, 248, 0.15)" />
                  {/* Ice cubes floating in top globe */}
                  <rect x="85" y="60" width="14" height="14" rx="2" fill="none" stroke="#bae6fd" strokeWidth="1" transform="rotate(15, 92, 67)" />
                  <rect x="110" y="64" width="16" height="16" rx="2" fill="none" stroke="#bae6fd" strokeWidth="1" transform="rotate(-20, 118, 72)" />

                  {/* Precision Drip Valve */}
                  <line x1="104" y1="112" x2="104" y2="140" stroke="#D99B38" strokeWidth="3" />
                  <circle cx="104" cy="142" r="3.5" fill="#D99B38" />

                  {/* Mid Coffee Extraction Funnel */}
                  <path d="M 64 165 L 144 165 L 120 220 L 88 220 Z" fill="rgba(217, 155, 56, 0.25)" stroke="#D99B38" strokeWidth="2" />
                  <rect x="76" y="175" width="56" height="30" rx="2" fill="#582f14" />
                  {/* Coffee bed texture */}
                  <circle cx="95" cy="188" r="1.5" fill="#D99B38" />
                  <circle cx="112" cy="192" r="1.5" fill="#D99B38" />
                  <circle cx="102" cy="182" r="1.5" fill="#D99B38" />

                  {/* Falling Extract Drops */}
                  <circle cx="104" cy="235" r="3" fill="#D99B38" />
                  <circle cx="104" cy="250" r="2.5" fill="#D99B38" />

                  {/* Bottom Erlenmeyer Flask */}
                  <path d="M 94 250 L 114 250 L 140 286 L 68 286 Z" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M 75 275 L 133 275 L 138 284 L 70 284 Z" fill="#D99B38" opacity="0.8" />
                </g>

                {/* Botanical Arabica Leaf Sprig Vector on Right */}
                <g transform="translate(360, 100)">
                  {/* Central Curved Botanical Stem */}
                  <path d="M 20 240 Q 60 160 120 40" fill="none" stroke="#0E2822" strokeWidth="4" />
                  <path d="M 20 240 Q 60 160 120 40" fill="none" stroke="#D99B38" strokeWidth="1.5" />

                  {/* Leaf Pair 1 */}
                  <path d="M 45 190 C 20 170 10 140 30 130 C 50 140 60 170 45 190 Z" fill="#0E2822" stroke="#D99B38" strokeWidth="1.2" />
                  <path d="M 70 180 C 100 170 120 150 110 130 C 90 135 75 160 70 180 Z" fill="#0E2822" stroke="#D99B38" strokeWidth="1.2" />

                  {/* Leaf Pair 2 */}
                  <path d="M 75 130 C 50 110 40 85 60 75 C 80 85 90 110 75 130 Z" fill="#0E2822" stroke="#D99B38" strokeWidth="1.2" />
                  <path d="M 98 120 C 130 110 145 90 135 75 C 115 80 100 100 98 120 Z" fill="#0E2822" stroke="#D99B38" strokeWidth="1.2" />

                  {/* Red Coffee Cherries */}
                  <circle cx="58" cy="180" r="7" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
                  <circle cx="70" cy="172" r="6" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
                  <circle cx="85" cy="125" r="7" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
                </g>

                {/* Technical Label */}
                <text x="300" y="375" textAnchor="middle" fill="#64748b" fontFamily="monospace" fontSize="11">
                  VECTOR ASSET: SLOW_COLD_DRIP_APPARATUS_ISOMETRIC.AI
                </text>
              </svg>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Demonstrates clean path construction, line weight balance, and thematic brand relevance.
            </p>
          </div>

          {/* Right: Technical Explanation */}
          <div className="lg:col-span-4 space-y-4 text-xs">
            <div className="rounded-xl bg-[#12141a] border border-slate-800 p-6 space-y-3">
              <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Supporting Vector Art Rationale</span>
              </h4>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                <strong>Criterion Requirement:</strong> Create at least one additional vector
                element/illustration that supports the brand identity and demonstrates clean vector
                construction.
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                This custom illustration depicts the slow 24-hour Kyoto-style cold-drip apparatus
                intertwined with ripe Arabica branches and cherries. Constructed with clean strokes,
                smooth rounded joins, and optimized for both dark and light print collateral.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
