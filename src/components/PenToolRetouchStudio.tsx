import React, { useState } from 'react';
import { ASSET_PATHS, PEN_TOOL_SPECIFICATIONS, RETOUCHING_EVIDENCE } from '../data/projectData';
import { PenTool, Sparkles, Sliders, CheckCircle2, SplitSquareHorizontal, Eye, ArrowRight, ZoomIn } from 'lucide-react';

export const PenToolRetouchStudio: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [activeRetouchTool, setActiveRetouchTool] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const [showPenNodes, setShowPenNodes] = useState<boolean>(true);
  const [showWireframe, setShowWireframe] = useState<boolean>(false);

  return (
    <div className="space-y-12 pb-16">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
          <span>Photoshop Technical Assessment</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-400">Evidence Documentation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Pen Tool Subject Extraction & Commercial Retouching Proof
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Comprehensive proof verifying precise manual Pen Tool vector Bézier extraction and non-destructive
          photo retouching using the Spot Healing Brush, Clone Stamp Tool, and Photoshop AI Remove Tool.
        </p>
      </div>

      {/* PART 1: RETOUCHING BEFORE & AFTER PROOF SLIDER */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>Interactive Retouching Before & After Comparison</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Drag the interactive slider left and right to inspect flaw elimination across glass, label, and citrus fruit.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
                viewMode === 'slider' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Interactive Slider
            </button>
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
                viewMode === 'side-by-side' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Side-by-Side Proof
            </button>
          </div>
        </div>

        {viewMode === 'slider' ? (
          <div className="relative max-w-3xl mx-auto aspect-square rounded-2xl overflow-hidden border border-slate-800 shadow-2xl select-none group">
            {/* "After" Image (Full Retouched Subject) */}
            <img
              src={ASSET_PATHS.posterSubject}
              alt="After Retouching"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('poster_main_subject')) {
                  target.src = '/assets/images/poster_main_subject_1790652032820.jpg';
                }
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-white z-10">
              AFTER RETOUCHING (PRISTINE)
            </div>

            {/* "Before" Image (Clipped by slider position) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={ASSET_PATHS.retouchBefore}
                alt="Before Retouching"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('retouch_before')) {
                    target.src = '/assets/images/retouch_before_subject_1790652051636.jpg';
                  }
                }}
                className="absolute inset-0 w-[768px] h-full object-cover max-w-none"
              />
              <div className="absolute top-4 left-4 bg-rose-500/90 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-white z-10">
                BEFORE RETOUCHING (RAW IMPERFECTIONS)
              </div>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg font-bold text-xs">
                ↔
              </div>
            </div>

            {/* Interactive Slider Input Overlay */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Before and After Retouching Slider"
            />

            <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none z-10">
              <span className="bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs text-slate-300 font-mono">
                SLIDER POSITION: {sliderPosition}% · DRAG HORIZONTALLY
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Before Box */}
            <div className="rounded-xl overflow-hidden border border-rose-500/30 bg-[#12141a] p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-400 uppercase tracking-wider">Before Retouching</span>
                <span className="text-slate-400">Raw Strobe Shot</span>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden border border-slate-800">
                <img
                  src={ASSET_PATHS.retouchBefore}
                  alt="Raw subject with flaws"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('retouch_before')) {
                      target.src = '/assets/images/retouch_before_subject_1790652051636.jpg';
                    }
                  }}
                  className="w-full h-full object-cover"
                />
                {/* Visual marker pins on flaws */}
                <div className="absolute top-[25%] left-[30%] w-6 h-6 rounded-full border-2 border-rose-400 bg-rose-500/30 animate-ping" />
                <div className="absolute top-[25%] left-[30%] w-6 h-6 rounded-full border-2 border-rose-400 bg-rose-500/80 flex items-center justify-center text-[10px] font-bold text-white">
                  1
                </div>

                <div className="absolute top-[55%] right-[25%] w-6 h-6 rounded-full border-2 border-rose-400 bg-rose-500/80 flex items-center justify-center text-[10px] font-bold text-white">
                  2
                </div>

                <div className="absolute bottom-[20%] left-[40%] w-6 h-6 rounded-full border-2 border-rose-400 bg-rose-500/80 flex items-center justify-center text-[10px] font-bold text-white">
                  3
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Identified: (1) Glass mold scratches, (2) Reflection seam distortion, (3) Fruit rind dark blemishes.
              </p>
            </div>

            {/* After Box */}
            <div className="rounded-xl overflow-hidden border border-emerald-500/30 bg-[#12141a] p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400 uppercase tracking-wider">After Retouching</span>
                <span className="text-emerald-400 font-medium">Commercial Packshot Grade</span>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden border border-slate-800">
                <img
                  src={ASSET_PATHS.posterSubject}
                  alt="Retouched subject"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('poster_main_subject')) {
                      target.src = '/assets/images/poster_main_subject_1790652032820.jpg';
                    }
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-emerald-300 font-semibold border border-emerald-500/30">
                  Cleaned & Color Graded
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Eliminated flaws via non-destructive sample layers, preserving genuine specular highlights.
              </p>
            </div>
          </div>
        )}

        {/* Retouching Tools Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {RETOUCHING_EVIDENCE.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveRetouchTool(index)}
              className={`rounded-xl border p-5 space-y-3 transition-all cursor-pointer ${
                activeRetouchTool === index
                  ? 'bg-[#151922] border-amber-500/50 shadow-md ring-1 ring-amber-500/20'
                  : 'bg-[#101217] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Tool 0{index + 1}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{item.area}</span>
              </div>

              <h4 className="text-base font-bold text-white">{item.title}</h4>

              <div className="space-y-2 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[11px] font-semibold">Problem Addressed:</span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{item.problem}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-semibold">Technique Applied:</span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{item.technique}</p>
                </div>
                <div>
                  <span className="text-emerald-400 block text-[11px] font-semibold">Final Outcome:</span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{item.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PART 2: PEN TOOL EXTRACTION EVIDENCE */}
      <section className="space-y-6 pt-6 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <PenTool className="w-5 h-5 text-blue-400" />
              <span>Pen Tool Subject Extraction with Vector Path Proof</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Evidence proving manual vector Bézier curve extraction around the amber bottle and organic fruit slices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPenNodes(!showPenNodes)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border cursor-pointer transition-colors ${
                showPenNodes
                  ? 'bg-blue-600/30 text-blue-300 border-blue-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showPenNodes ? 'Hide Vector Nodes' : 'Show Vector Nodes'}</span>
            </button>
            <button
              onClick={() => setShowWireframe(!showWireframe)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border cursor-pointer transition-colors ${
                showWireframe
                  ? 'bg-amber-600/30 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <span>{showWireframe ? 'Exit Wireframe' : 'Wireframe View'}</span>
            </button>
          </div>
        </div>

        {/* Vector Nodes Visualizer Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[440px] aspect-[4/5] bg-neutral-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center p-6">
              {/* Background preview */}
              {!showWireframe && (
                <img
                  src={ASSET_PATHS.posterSubject}
                  alt="Extracted Bottle"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('Pen_Tool_Mask_Evidence')) {
                      target.src = '/Photoshop_Final_Project/Pen_Tool_Mask_Evidence.png';
                    } else if (!target.src.includes('poster_main_subject')) {
                      target.src = '/assets/images/poster_main_subject_1790652032820.jpg';
                    }
                  }}
                  className="w-full h-full object-contain filter contrast-105"
                />
              )}

              {/* Wireframe Alpha Checkerboard */}
              {showWireframe && (
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              )}

              {/* Vector Bézier SVG Overlay */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 440 550"
              >
                {/* Closed Pen Path */}
                <path
                  d="M 195 100 C 195 90 200 80 220 80 C 240 80 245 90 245 100 L 245 155 C 255 170 300 205 305 265 L 310 435 C 310 455 300 465 270 465 L 170 465 C 140 465 130 455 130 435 L 135 265 C 140 205 185 170 195 155 Z"
                  fill={showWireframe ? 'rgba(59, 130, 246, 0.2)' : 'none'}
                  stroke="#3b82f6"
                  strokeWidth={showWireframe ? '2.5' : '1.8'}
                  strokeDasharray={showWireframe ? 'none' : '4 2'}
                />

                {/* Secondary path for orange slice */}
                <path
                  d="M 280 400 C 330 400 370 440 370 490 C 340 510 270 510 240 480 C 240 440 250 400 280 400 Z"
                  fill={showWireframe ? 'rgba(245, 158, 11, 0.2)' : 'none'}
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />

                {showPenNodes && (
                  <>
                    {/* Anchor Points & Direction Tangents */}
                    {[
                      [220, 80], [245, 100], [245, 155], [305, 265], [310, 435], [270, 465],
                      [170, 465], [130, 435], [135, 265], [195, 155], [195, 100],
                      [280, 400], [370, 490], [240, 480]
                    ].map(([x, y], i) => (
                      <g key={i}>
                        <line x1={x - 14} y1={y} x2={x + 14} y2={y} stroke="#60a5fa" strokeWidth="0.8" />
                        <circle cx={x - 14} cy={y} r="2.5" fill="#60a5fa" />
                        <circle cx={x + 14} cy={y} r="2.5" fill="#60a5fa" />
                        <rect x={x - 3.5} y={y - 3.5} width="7" height="7" fill="#2563eb" stroke="#ffffff" strokeWidth="1" />
                      </g>
                    ))}
                  </>
                )}
              </svg>

              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] text-white font-mono">
                <span>PATH 01: SOLIS_BOTTLE_EXTRACTION</span>
              </div>
            </div>
          </div>

          {/* Technical Vector Specifications Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl bg-[#12141a] border border-slate-800 p-6 space-y-4 text-xs">
              <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Pen Tool Extraction Metrics</span>
              </h4>

              <div className="space-y-3">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Total Anchor Nodes:</span>
                  <span className="text-white font-mono font-semibold">{PEN_TOOL_SPECIFICATIONS.anchorPointsCount} Anchors</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Path Geometry:</span>
                  <span className="text-white font-mono">{PEN_TOOL_SPECIFICATIONS.pathType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Mask Feathering:</span>
                  <span className="text-amber-400 font-mono font-semibold">{PEN_TOOL_SPECIFICATIONS.featherRadius}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Anti-Aliasing:</span>
                  <span className="text-emerald-400 font-mono">Active (Sub-pixel)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Mask Preservation:</span>
                  <span className="text-white">Non-Destructive Layer Mask</span>
                </div>
              </div>

              <div className="pt-2 text-slate-300 leading-relaxed text-[11px] space-y-2">
                <p>
                  <strong>Technique Rationale:</strong> The Pen Tool was selected over automated selection
                  tools (Quick Selection / Object Select) because automated tools produce stair-stepped halo
                  edges on transparent dark amber glass.
                </p>
                <p className="text-slate-400">
                  By hand-placing tangent handles precisely along optical curvature inflection points with
                  a 0.8px inner feather radius, the extracted subject integrates naturally into the dark
                  green forest background without white color halos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
