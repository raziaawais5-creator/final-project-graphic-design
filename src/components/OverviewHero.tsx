import React from 'react';
import { PROJECT_METADATA } from '../data/projectData';
import { ProjectTab } from '../types';
import { ArrowRight, CheckCircle2, Layers, PenTool, Sparkles, Image as ImageIcon } from 'lucide-react';

interface OverviewHeroProps {
  onSelectTab: (tab: ProjectTab) => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({ onSelectTab }) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#161a22] to-[#0f1116] border border-slate-800 p-8 md:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-medium">
            <span>{PROJECT_METADATA.studio}</span>
            <span aria-hidden="true">·</span>
            <span>Commercial Identity & Advertising Campaign</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">{PROJECT_METADATA.releaseDate}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
            Solis Reserve: Visual Identity System & Commercial Poster Campaign
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            A comprehensive, client-ready brand identity and advertising campaign for{' '}
            <strong className="text-amber-400 font-semibold">{PROJECT_METADATA.brandName}</strong>{' '}
            — an artisanal cold-drip botanical elixir brand. Crafted with meticulous visual hierarchy,
            non-destructive Photoshop photo retouching, mathematical Golden Ratio vector geometry,
            and luxury print-ready stationery.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <span className="text-xs text-slate-400 block">Lead Designer</span>
              <span className="text-sm font-semibold text-white">{PROJECT_METADATA.designerName}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Client</span>
              <span className="text-sm font-semibold text-white">{PROJECT_METADATA.client}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Creative Scope</span>
              <span className="text-sm font-semibold text-amber-400">Campaign & Packaging</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Production Status</span>
              <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 16 / 16 Standards Verified
              </span>
            </div>
          </div>

          {/* Quick Access to Submission Package */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-950/20 border border-amber-500/20 rounded-xl p-4">
            <div>
              <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">
                Production Deliverables Package (14 Assets Ready)
              </span>
              <p className="text-xs text-slate-300">
                Photoshop_Final_Project/ (7 files) & Illustrator_Brand_Identity/ (7 files) generated and verified.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('submission-package')}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto shadow-sm"
            >
              Browse & Download Files (14)
            </button>
          </div>
        </div>
      </section>

      {/* Two Questions Overview Bento Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Question 1: Photoshop */}
        <div className="rounded-2xl bg-[#12141a] border border-slate-800 p-6 md:p-8 space-y-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider uppercase text-amber-400">
                Phase 01 · Advertising Campaign
              </span>
              <span className="text-xs text-slate-400">Adobe Photoshop CC</span>
            </div>

            <h2 className="text-2xl font-bold text-white tracking-tight">
              Photoshop Creative Poster, Retouching & Mockup
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Complete promotional poster campaign for Solis Reserve executed in 1080 × 1350 px
              (4:5 portrait social media standard). Features Pen Tool subject isolation,
              before-and-after retouching studio (Clone Tool, Spot Healing, Remove Tool),
              Layer & Clipping masks, and integrated generative atmosphere.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Original 1080 × 1350 px poster with Swiss typographic hierarchy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pen Tool extraction evidence with Bézier anchor point paths</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Non-destructive Layer Mask & Solar Ring Clipping Mask</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Interactive Before/After Retouching proof slider & loupe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Atmospheric generative texture + realistic urban billboard & phone mockups</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => onSelectTab('photoshop-poster')}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              <span>Explore Poster & Layers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectTab('pen-tool-retouch')}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5 text-amber-400" />
              <span>Retouching & Pen Tool Proof</span>
            </button>
          </div>
        </div>

        {/* Question 2: Illustrator */}
        <div className="rounded-2xl bg-[#12141a] border border-slate-800 p-6 md:p-8 space-y-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider uppercase text-amber-400">
                Phase 02 · Visual Identity & Stationery
              </span>
              <span className="text-xs text-slate-400">Adobe Illustrator CC</span>
            </div>

            <h2 className="text-2xl font-bold text-white tracking-tight">
              Illustrator Brand Identity, Stationery & Behance
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Complete brand identity system for Solis Reserve. Includes mathematical golden-ratio
              vector emblem construction, digital conversion of founder signature, seamless repeatable
              brand pattern, double-sided business card with foil finishes, branded DL envelope,
              and a comprehensive Behance portfolio presentation.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Golden Ratio (Φ) circular construction grid & clean vector paths</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Handwritten signature digitized into refined Bézier vector form</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Seamless repeatable geometric brand pattern & packaging tile</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Visiting card (Front & Back) with 3D flip preview & bleed margins</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Branded envelope (220×110mm) & full Behance case study presentation</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => onSelectTab('illustrator-identity')}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              <span>Explore Vector Identity</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectTab('stationery-mockups')}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Stationery & Envelopes</span>
            </button>
            <button
              onClick={() => onSelectTab('behance-portfolio')}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 font-semibold text-xs rounded-lg transition-colors cursor-pointer border border-blue-500/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Behance Case Study</span>
            </button>
          </div>
        </div>
      </div>

      {/* Brand Rationale Spotlight */}
      <section className="rounded-2xl bg-[#0f1116] border border-slate-800 p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs text-amber-400 uppercase tracking-wider font-semibold">
              The Client Brief & Rationale
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              About Solis Reserve™ — Artisanal Cold-Drip Botanical Roastery
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            EST. 2026 · MURREE HIGHLANDS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300">
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Visual Philosophy</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bridging traditional botanical heritage with Scandinavian minimalism. The deep obsidian
              and alpine emerald backdrop represents wild shaded groves, while warm solar gold and copper
              signify the slow cold-drip alchemy.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Target Audience</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sophisticated epicures, specialty coffee collectors, and luxury wellness enthusiasts who
              value slow-crafted authenticity, refined tactile print finishes, and conscious sustainability.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Design Standards</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              All vector geometry is constructed using Golden Ratio tangent circles. Print collateral
              adheres to standard 3mm bleed margins, crop marks, and CMYK offset separation protocols.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
