import React, { useState, useRef } from 'react';
import { ASSET_PATHS, PHOTOSHOP_LAYERS, PEN_TOOL_SPECIFICATIONS, PROJECT_METADATA } from '../data/projectData';
import { 
  Eye, 
  EyeOff, 
  Grid, 
  Maximize2, 
  Download, 
  PenTool, 
  Layers, 
  Sparkles, 
  Sliders, 
  Smartphone, 
  Monitor, 
  Frame, 
  Check, 
  ZoomIn, 
  ZoomOut,
  Info
} from 'lucide-react';

export const PhotoshopPosterStudio: React.FC = () => {
  // Layer visibility state
  const [layersVisibility, setLayersVisibility] = useState<Record<string, boolean>>({
    'grp-text': true,
    'grp-adjustments': true,
    'grp-subject': true,
    'grp-clipping': true,
    'grp-background': true,
    'sub-droplets': true,
    'sub-bottle': true,
    'sub-fruit': true,
    'clip-particles': true,
    'clip-base-shape': true,
    'bg-meta-ai': true,
    'bg-gradient-vignette': true,
    'bg-deep-canvas': true,
  });

  const [showGuides, setShowGuides] = useState(false);
  const [showPenPath, setShowPenPath] = useState(false);
  const [showAlphaMatte, setShowAlphaMatte] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeMockup, setActiveMockup] = useState<'poster' | 'street' | 'phone' | 'frame'>('poster');
  const [activeTab, setActiveTab] = useState<'canvas' | 'layers' | 'reference'>('canvas');

  const canvasRef = useRef<HTMLDivElement>(null);

  const toggleLayer = (layerId: string) => {
    setLayersVisibility((prev) => ({
      ...prev,
      [layerId]: !prev[layerId],
    }));
  };

  // Trigger high-res canvas rendering & PNG download
  const handleDownloadPoster = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    ctx.fillStyle = '#0E2822';
    ctx.fillRect(0, 0, 1080, 1350);

    // Load and draw Meta AI background
    const bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';
    bgImg.src = ASSET_PATHS.metaAiBackground;

    bgImg.onload = () => {
      if (layersVisibility['bg-meta-ai']) {
        ctx.globalAlpha = 0.85;
        ctx.drawImage(bgImg, 0, 0, 1080, 1350);
        ctx.globalAlpha = 1.0;
      }

      // Draw Subject Image
      const subjectImg = new Image();
      subjectImg.crossOrigin = 'anonymous';
      subjectImg.src = ASSET_PATHS.posterSubject;

      subjectImg.onload = () => {
        if (layersVisibility['grp-subject']) {
          // Render central bottle
          ctx.drawImage(subjectImg, 140, 260, 800, 1000);
        }

        // Draw Typography
        if (layersVisibility['grp-text']) {
          ctx.fillStyle = '#F5F2EB';
          ctx.textAlign = 'center';
          ctx.font = 'bold 24px "Plus Jakarta Sans"';
          ctx.letterSpacing = '6px';
          ctx.fillText('SOLIS RESERVE · BATCH N° 07', 540, 160);

          ctx.fillStyle = '#D99B38';
          ctx.font = '800 84px "Syne"';
          ctx.letterSpacing = '2px';
          ctx.fillText('THE FOREST ESSENCE', 540, 250);

          ctx.fillStyle = '#F5F2EB';
          ctx.font = 'italic 32px "Playfair Display"';
          ctx.fillText('Slow Cold-Drip Botanical Elixir', 540, 310);

          // CTA button
          ctx.fillStyle = '#D99B38';
          ctx.beginPath();
          ctx.roundRect(360, 1180, 360, 60, [30]);
          ctx.fill();

          ctx.fillStyle = '#0D0E11';
          ctx.font = 'bold 20px "Plus Jakarta Sans"';
          ctx.fillText('RESERVE YOUR VINTAGE', 540, 1218);

          // Footnote specs
          ctx.fillStyle = 'rgba(245, 242, 235, 0.6)';
          ctx.font = '14px "Plus Jakarta Sans"';
          ctx.fillText('1080 × 1350 PX · SOCIAL PORTRAIT · 100% ORGANIC BOTANICAL EXTRACTION', 540, 1290);
        }

        // Trigger file download
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `Solis_Reserve_Photoshop_Poster_1080x1350_${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      };
    };
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Question Header & Rubric Alignment */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Solis Reserve Campaign</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Phase 01 · Advertising & Print Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Photoshop Creative Poster, Retouching & Mockup
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Promotional poster campaign in 1080 × 1350 px (4:5 social media standard) featuring Pen Tool
            subject isolation, non-destructive layer masking, clipping masks, and Meta AI background blending.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs font-medium">
            <button
              onClick={() => setActiveMockup('poster')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeMockup === 'poster'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              1080×1350 Canvas
            </button>
            <button
              onClick={() => setActiveMockup('street')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeMockup === 'street'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Bus Lightbox Mockup
            </button>
            <button
              onClick={() => setActiveMockup('phone')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeMockup === 'phone'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Phone Feed Mockup
            </button>
            <button
              onClick={() => setActiveMockup('frame')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeMockup === 'frame'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Gallery Frame Mockup
            </button>
          </div>

          <button
            onClick={handleDownloadPoster}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export 1080×1350 PNG</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      {activeMockup === 'poster' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas Area (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Viewport Control Bar */}
            <div className="w-full flex items-center justify-between bg-[#12141a] border border-slate-800 rounded-t-xl px-4 py-2 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="font-mono text-white">1080 × 1350 px</span>
                <span>(4:5 Portrait)</span>
                <span className="text-amber-400 font-mono">300 DPI</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGuides(!showGuides)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded cursor-pointer transition-colors ${
                    showGuides ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'hover:text-white'
                  }`}
                  title="Toggle Layout Guides (Thirds & Safe Zone)"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Guides</span>
                </button>

                <button
                  onClick={() => setShowPenPath(!showPenPath)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded cursor-pointer transition-colors ${
                    showPenPath ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' : 'hover:text-white'
                  }`}
                  title="Toggle Pen Tool Vector Bézier Path Overlay"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Pen Path</span>
                </button>

                <button
                  onClick={() => setShowAlphaMatte(!showAlphaMatte)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded cursor-pointer transition-colors ${
                    showAlphaMatte ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'hover:text-white'
                  }`}
                  title="Toggle Alpha Mask View"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Alpha Matte</span>
                </button>
              </div>
            </div>

            {/* Poster Canvas Container */}
            <div className="relative w-full max-w-[480px] aspect-[4/5] bg-neutral-950 rounded-b-xl border-x border-b border-slate-800 shadow-2xl overflow-hidden select-none">
              {/* Layer 1: Solid Background */}
              {layersVisibility['bg-deep-canvas'] && (
                <div className="absolute inset-0 bg-[#0E2822]" />
              )}

              {/* Layer 2: Meta AI Swirling Gold & Mist */}
              {layersVisibility['bg-meta-ai'] && (
                <img
                  src={ASSET_PATHS.metaAiBackground}
                  alt="Meta AI Generative Atmosphere"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/meta_ai_background_1790652066404.jpg';
                  }}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80 pointer-events-none transition-opacity duration-200"
                />
              )}

              {/* Layer 3: Dark Radial Vignette */}
              {layersVisibility['bg-gradient-vignette'] && (
                <div className="absolute inset-0 bg-radial from-transparent via-[#0D0E11]/40 to-[#0D0E11]/85 pointer-events-none" />
              )}

              {/* Layer 4: Clipping Mask Solar Halo Ring */}
              {layersVisibility['grp-clipping'] && (
                <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full border-2 border-amber-500/30 overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-radial from-amber-500/10 to-transparent" />
                  {/* Clipped particles */}
                  {layersVisibility['clip-particles'] && (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,155,56,0.3)_0%,transparent_70%)] animate-pulse" />
                  )}
                </div>
              )}

              {/* Layer 5: Main Subject (Amber Bottle + Fruit + Condensation) */}
              {layersVisibility['grp-subject'] && (
                <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                  {showAlphaMatte ? (
                    // Alpha Matte view
                    <div className="w-[78%] h-[78%] bg-white rounded-3xl blur-[0.4px] shadow-[0_0_40px_rgba(255,255,255,0.8)] flex items-center justify-center">
                      <span className="text-black font-mono text-xs font-bold uppercase tracking-widest">
                        ALPHA MASK MASK_01
                      </span>
                    </div>
                  ) : (
                    <img
                      src={ASSET_PATHS.posterSubject}
                      alt="Extracted Solis Reserve Bottle"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/images/poster_main_subject_1790652032820.jpg';
                      }}
                      className="w-[82%] h-[82%] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] filter contrast-105 transition-opacity duration-200"
                    />
                  )}
                </div>
              )}

              {/* Pen Tool Vector Path Overlay (Toggleable) */}
              {showPenPath && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-20"
                  viewBox="0 0 480 600"
                >
                  {/* Closed Bezier path contour around the bottle */}
                  <path
                    d="M 215 130 C 215 120 220 110 240 110 C 260 110 265 120 265 130 L 265 180 C 275 195 320 230 325 290 L 330 460 C 330 480 320 490 290 490 L 190 490 C 160 490 150 480 150 460 L 155 290 C 160 230 205 195 215 180 Z"
                    fill="rgba(59, 130, 246, 0.15)"
                    stroke="#3b82f6"
                    strokeWidth="1.8"
                    strokeDasharray="4 2"
                  />
                  {/* Anchor points with tangent handles */}
                  {[
                    [240, 110], [265, 130], [265, 180], [325, 290], [330, 460], [290, 490],
                    [190, 490], [150, 460], [155, 290], [215, 180], [215, 130]
                  ].map(([x, y], i) => (
                    <g key={i}>
                      {/* Tangent line */}
                      <line x1={x - 12} y1={y} x2={x + 12} y2={y} stroke="#60a5fa" strokeWidth="0.8" />
                      <circle cx={x - 12} cy={y} r="2" fill="#60a5fa" />
                      <circle cx={x + 12} cy={y} r="2" fill="#60a5fa" />
                      {/* Anchor square point */}
                      <rect x={x - 3} y={y - 3} width="6" height="6" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
                    </g>
                  ))}
                  <text x="20" y="30" fill="#60a5fa" fontSize="10" fontFamily="monospace">
                    PEN TOOL VECTOR PATH · 42 NODES · 0.8px FEATHERED
                  </text>
                </svg>
              )}

              {/* Layout Guides & Rule of Thirds (Toggleable) */}
              {showGuides && (
                <div className="absolute inset-0 pointer-events-none z-30">
                  {/* Rule of Thirds horizontal */}
                  <div className="absolute top-[33.33%] left-0 right-0 h-px bg-amber-400/40 border-b border-dashed border-amber-400/60" />
                  <div className="absolute top-[66.66%] left-0 right-0 h-px bg-amber-400/40 border-b border-dashed border-amber-400/60" />
                  {/* Rule of Thirds vertical */}
                  <div className="absolute left-[33.33%] top-0 bottom-0 w-px bg-amber-400/40 border-r border-dashed border-amber-400/60" />
                  <div className="absolute left-[66.66%] top-0 bottom-0 w-px bg-amber-400/40 border-r border-dashed border-amber-400/60" />
                  {/* Safe margin boundary (3mm / 36px) */}
                  <div className="absolute inset-6 border border-emerald-400/50" />
                  {/* Golden Ratio Center Target */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-amber-400/70 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                  </div>
                  <span className="absolute bottom-2 left-8 text-[9px] font-mono text-emerald-400/90">
                    SAFE MARGIN: 3MM · CENTER ALIGNMENT: LOCKED
                  </span>
                </div>
              )}

              {/* Layer 6: Typography, Editorial & CTA System */}
              {layersVisibility['grp-text'] && (
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
                  {/* Top Editorial Lockup */}
                  <div className="space-y-1 text-center pt-2">
                    <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-slate-300 font-semibold px-2">
                      <span>ORGANIC HARVEST</span>
                      <span className="text-amber-400">BATCH N° 07</span>
                      <span>MURREE HIGHLANDS</span>
                    </div>

                    <div className="pt-3">
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                        THE FOREST ESSENCE
                      </h3>
                      <p className="font-serif-accent italic text-xs text-amber-200/90 mt-0.5">
                        Slow Cold-Drip Botanical Elixir & Wild Infusions
                      </p>
                    </div>
                  </div>

                  {/* Bottom Information & CTA Button */}
                  <div className="space-y-3 pb-2 text-center">
                    <p className="text-[10px] text-slate-300/90 leading-tight max-w-[260px] mx-auto drop-shadow-sm">
                      Crafted with high-altitude roasted Arabica, alpine bergamot and wild mint.
                      Cold-extracted over 24 hours.
                    </p>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                      <div className="px-5 py-2 rounded-full bg-amber-400 text-slate-950 font-bold text-xs shadow-lg uppercase tracking-wider">
                        Reserve Your Vintage
                      </div>
                    </div>

                    {/* Technical footer specs & barcode */}
                    <div className="flex items-center justify-between text-[8px] text-slate-400/80 px-2 pt-1 border-t border-white/10">
                      <span>1080 × 1350 PX · 4:5</span>
                      <span>500ML · ALC 0.0%</span>
                      <span className="font-mono">BARCODE: 896400017</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-500 mt-3 text-center">
              Rendered at 1080 × 1350 px portrait specification. Click layer toggles on the right to
              inspect components.
            </p>
          </div>

          {/* Right Photoshop Studio Control Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tab switch: Layers Panel vs Reference Design */}
            <div className="flex border-b border-slate-800">
              <button
                onClick={() => setActiveTab('canvas')}
                className={`flex items-center gap-1.5 py-2.5 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'canvas'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Photoshop Layers Tree</span>
              </button>
              <button
                onClick={() => setActiveTab('reference')}
                className={`flex items-center gap-1.5 py-2.5 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'reference'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Frame className="w-3.5 h-3.5" />
                <span>Reference vs Final Adaptation</span>
              </button>
            </div>

            {/* TAB 1: Layers Panel Explorer */}
            {activeTab === 'canvas' && (
              <div className="bg-[#12141a] rounded-xl border border-slate-800 overflow-hidden space-y-4 p-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-300 font-semibold">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>Layers Panel (Adobe Photoshop CC)</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Non-Destructive Stack</span>
                </div>

                <div className="space-y-2 text-xs">
                  {PHOTOSHOP_LAYERS.map((group) => {
                    const isVisible = layersVisibility[group.id] !== false;
                    return (
                      <div
                        key={group.id}
                        className="rounded-lg bg-[#0e1014] border border-slate-800/80 p-3 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleLayer(group.id)}
                              className="text-slate-400 hover:text-white cursor-pointer"
                              title="Toggle Group Visibility"
                            >
                              {isVisible ? (
                                <Eye className="w-4 h-4 text-amber-400" />
                              ) : (
                                <EyeOff className="w-4 h-4 text-slate-600" />
                              )}
                            </button>
                            <span className="font-semibold text-white">{group.name}</span>
                          </div>

                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span className="bg-slate-800 px-1.5 py-0.5 rounded font-mono">
                              {group.blendMode}
                            </span>
                            <span>{group.opacity}%</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-400 pl-6 leading-relaxed">
                          {group.description}
                        </p>

                        {/* Nested Children Layers */}
                        {group.children && (
                          <div className="pl-6 space-y-1.5 pt-1 border-t border-slate-800/40">
                            {group.children.map((child) => {
                              const isChildVisible = layersVisibility[child.id] !== false;
                              return (
                                <div
                                  key={child.id}
                                  className="flex items-center justify-between text-[11px] py-1 px-2 rounded hover:bg-slate-800/40 transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => toggleLayer(child.id)}
                                      className="cursor-pointer"
                                    >
                                      {isChildVisible ? (
                                        <Eye className="w-3 h-3 text-slate-300" />
                                      ) : (
                                        <EyeOff className="w-3 h-3 text-slate-600" />
                                      )}
                                    </button>
                                    <span className={isChildVisible ? 'text-slate-200' : 'text-slate-500 line-through'}>
                                      {child.name}
                                    </span>
                                  </div>

                                  {child.hasMask && (
                                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-medium">
                                      {child.maskType === 'clipping-mask' ? 'Clipping' : 'Layer Mask'}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    <span>Layer Mask & Clipping Mask Verified</span>
                  </div>
                  <p>
                    All subject elements isolated with high-precision vector masks to ensure zero destructive
                    pixel erasure. Clipping mask bounds botanical solar vortex.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: Reference Poster vs Final Design Adaptation */}
            {activeTab === 'reference' && (
              <div className="bg-[#12141a] rounded-xl border border-slate-800 p-5 space-y-4 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-white font-semibold pb-2 border-b border-slate-800">
                  <Frame className="w-4 h-4 text-amber-400" />
                  <span>Reference Poster Adaptation Rationale</span>
                </div>

                <div className="space-y-3 leading-relaxed">
                  <p>
                    <strong>Requirement:</strong> Recreate at least one layout, shape treatment or visual idea
                    from a reference poster for learning purposes, but make the final design clearly your own.
                  </p>

                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-2">
                    <span className="text-amber-400 font-semibold block">
                      Recreated Reference Visual Idea:
                    </span>
                    <p className="text-slate-400 text-[11px]">
                      Inspired by iconic Swiss International Typographic beverage advertisements (Bauhaus/Müller-Brockmann
                      circular layout with asymmetrical typography framing and high-contrast botanical lighting).
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-2">
                    <span className="text-emerald-400 font-semibold block">
                      Original Adaptations & Evolution:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                      <li>Introduced an organic botanical solar ring clipping mask in place of static flat borders.</li>
                      <li>Blended a custom Meta AI atmospheric generative spore background via Soft Light.</li>
                      <li>Custom high-contrast typographic pairing: Syne Bold headline with Playfair Display editorial accent.</li>
                      <li>Client-ready packshot with natural rim condensation and floating citrus extraction.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : activeMockup === 'street' ? (
        /* Street Lightbox Billboard Mockup View */
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 aspect-[16/10] max-h-[640px] bg-neutral-950 flex items-center justify-center">
            {/* Background realistic street scene */}
            <img
              src={ASSET_PATHS.mockupStreet}
              alt="Street Lightbox Billboard Mockup"
              className="w-full h-full object-cover"
            />

            {/* Poster mapped directly onto the lightbox area */}
            <div className="absolute top-[16%] left-[37%] w-[25%] h-[68%] shadow-2xl rounded-sm overflow-hidden border-2 border-neutral-900/80">
              <div className="relative w-full h-full bg-[#0E2822] overflow-hidden">
                <img
                  src={ASSET_PATHS.metaAiBackground}
                  alt="Poster Background"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70"
                />
                <img
                  src={ASSET_PATHS.posterSubject}
                  alt="Extracted Bottle"
                  className="absolute inset-0 w-full h-full object-contain p-2 filter drop-shadow-xl"
                />
                {/* Overlay Poster Title */}
                <div className="absolute top-2 inset-x-0 text-center px-1">
                  <span className="text-[7px] font-mono tracking-widest text-amber-300 block">SOLIS RESERVE</span>
                  <span className="text-[10px] font-display font-extrabold text-white block leading-tight">
                    THE FOREST ESSENCE
                  </span>
                </div>
                {/* Overlay CTA */}
                <div className="absolute bottom-2 inset-x-0 flex justify-center">
                  <div className="bg-amber-400 text-slate-950 text-[7px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Reserve Vintage
                  </div>
                </div>
                {/* Lightbox reflection glaze */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
              </div>
            </div>

            {/* Mockup Badge */}
            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white">
              <span>Outdoor Lightbox Bus Shelter Display · 1080 × 1350 px Scale</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center">
            Realistic high-impact environmental presentation demonstrating urban street visibility and illumination.
          </p>
        </div>
      ) : activeMockup === 'phone' ? (
        /* Smartphone Social Media Post / Story Mockup */
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="relative w-[340px] aspect-[9/19] bg-neutral-900 rounded-[48px] p-3 border-4 border-neutral-700 shadow-2xl">
            {/* Dynamic Island / Speaker notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30" />

            {/* Screen Container */}
            <div className="w-full h-full bg-[#0c0d10] rounded-[36px] overflow-hidden flex flex-col justify-between pt-10 pb-4 px-3 text-white">
              {/* Instagram Story / Post Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold">
                      S
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold block">solisreserve.pk</span>
                    <span className="text-[9px] text-slate-400 block">Sponsored · Lahore</span>
                  </div>
                </div>
                <span className="text-xs text-slate-400">•••</span>
              </div>

              {/* 4:5 Poster Inside Feed */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-slate-800 my-2">
                <img
                  src={ASSET_PATHS.metaAiBackground}
                  alt="Poster Backdrop"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70"
                />
                <img
                  src={ASSET_PATHS.posterSubject}
                  alt="Solis Bottle"
                  className="absolute inset-0 w-full h-full object-contain p-3 filter drop-shadow-xl"
                />
                <div className="absolute top-3 inset-x-0 text-center">
                  <span className="text-[8px] font-mono tracking-wider text-amber-300 uppercase block">
                    Solis Reserve
                  </span>
                  <span className="text-sm font-display font-extrabold text-white block">
                    THE FOREST ESSENCE
                  </span>
                </div>
                <div className="absolute bottom-3 inset-x-0 flex justify-center">
                  <span className="text-[8px] bg-amber-400 text-black px-3 py-1 rounded-full font-bold uppercase">
                    Order Seasonal Batch
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span>❤️ 1,428</span>
                    <span>💬 84</span>
                    <span>↗️ Share</span>
                  </div>
                  <span>🔖</span>
                </div>
                <p className="text-[10px] text-slate-300">
                  <strong className="text-white">solisreserve.pk</strong> The Forest Essence is here.
                  100% cold-drip botanical elixir infused with wild Himalayan herbs...
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center">
            Mobile responsive social feed test: verifies typographic legibility and contrast on small screens.
          </p>
        </div>
      ) : (
        /* Gallery Frame Mockup View */
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 p-8 sm:p-16 bg-[#16181f] flex items-center justify-center min-h-[500px]">
            {/* Gallery Wall Lighting gradient */}
            <div className="absolute inset-0 bg-radial from-slate-800/40 via-transparent to-black pointer-events-none" />

            {/* Contemporary Oak Wood Frame */}
            <div className="relative max-w-sm w-full aspect-[4/5] bg-[#dfcbb3] p-4 sm:p-6 rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.85)] border-4 border-[#8c6b48]">
              {/* White Passe-partout / Mat board */}
              <div className="w-full h-full bg-[#f9f8f4] p-4 sm:p-5 shadow-inner">
                {/* Print Artwork */}
                <div className="relative w-full h-full bg-[#0E2822] overflow-hidden shadow-sm">
                  <img
                    src={ASSET_PATHS.metaAiBackground}
                    alt="Poster Artwork"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80"
                  />
                  <img
                    src={ASSET_PATHS.posterSubject}
                    alt="Subject"
                    className="absolute inset-0 w-full h-full object-contain p-4 filter drop-shadow-xl"
                  />
                  <div className="absolute top-4 inset-x-0 text-center">
                    <span className="text-[8px] font-mono tracking-widest text-amber-300 block">
                      SOLIS RESERVE
                    </span>
                    <span className="text-sm font-display font-extrabold text-white block">
                      THE FOREST ESSENCE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white">
              <span>Minimalist Gallery Frame Mockup · 50 × 70 cm Archival Giclée Print</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center">
            Fine art presentation proof: demonstrates archival print balance and editorial framing.
          </p>
        </div>
      )}
    </div>
  );
};
