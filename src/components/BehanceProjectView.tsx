import React, { useState } from 'react';
import { COLOR_PALETTE, TYPOGRAPHY_SPECS, PROJECT_METADATA, ASSET_PATHS } from '../data/projectData';
import { ExternalLink, Copy, Check, Download, Layers, Sparkles, Award } from 'lucide-react';

export const BehanceProjectView: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(PROJECT_METADATA.behanceUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Behance Project Top Bar */}
      <div className="bg-[#12141a] rounded-2xl border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
            <span>Behance Verified Case Study</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Commercial Brand Identity & Packaging</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            SOLIS RESERVE™ — Visual Identity, Photoshop Campaign & Stationery Suite
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-1.5">
            <span>Published by <strong>{PROJECT_METADATA.designerName}</strong></span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-mono font-medium">{PROJECT_METADATA.designerEmail}</span>
            <span aria-hidden="true">·</span>
            <span>Lead Brand & Packaging Designer</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Working Behance Link'}</span>
          </button>

          <a
            href={PROJECT_METADATA.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer border border-slate-700/80 shadow-xs"
            title={`Open Behance Project: ${PROJECT_METADATA.behanceUrl}`}
          >
            <span>Open on Behance · {PROJECT_METADATA.designerName}</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>
        </div>
      </div>

      {/* BEHANCE ARTICLE BODY CONTAINER */}
      <article className="max-w-4xl mx-auto space-y-16 bg-[#0f1116] rounded-2xl border border-slate-800/80 p-6 sm:p-12 shadow-2xl">
        {/* Cover Hero Banner */}
        <section className="relative aspect-[16/9] rounded-xl overflow-hidden bg-neutral-950 flex flex-col items-center justify-center text-center p-8 border border-slate-800">
          <img
            src={ASSET_PATHS.metaAiBackground}
            alt="Atmospheric Cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = '/assets/images/meta_ai_background_1790652066404.jpg';
            }}
            className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70 pointer-events-none"
          />
          <div className="relative z-10 space-y-3">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-amber-400 block font-semibold">
              BRAND IDENTITY & ADVERTISING CASE STUDY
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              SOLIS RESERVE
            </h1>
            <p className="font-serif-accent italic text-base sm:text-xl text-amber-200/90 max-w-xl mx-auto">
              Artisanal Cold-Drip Botanical Elixir & Wild Infusions
            </p>
          </div>
          <div className="absolute bottom-4 inset-x-0 flex justify-between px-6 text-[10px] text-slate-400 font-mono">
            <span>COMMERCIAL VISUAL IDENTITY</span>
            <span>SOLIS CREATIVE STUDIO · EST. 2026</span>
          </div>
        </section>

        {/* 01. The Brand Overview & Challenge */}
        <section className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              01. Project Brief & Brand Rationale
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Elevating Cold-Drip Coffee into High Alchemical Art
            </h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Solis Reserve is an artisanal beverage house situated in the high-altitude forested hills of Murree,
            Pakistan. Merging organic Arabica cultivation with wild Himalayan botanical infusions (bergamot,
            alpine berries, and wild mint), the brand required an unmistakable visual identity and a promotional
            launch poster campaign.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#141720] border border-slate-800 space-y-1">
              <span className="text-xs text-amber-400 font-semibold block">Brand Archetype</span>
              <p className="text-xs text-slate-300 font-medium">The Alchemist & The Artisan</p>
            </div>
            <div className="p-4 rounded-xl bg-[#141720] border border-slate-800 space-y-1">
              <span className="text-xs text-amber-400 font-semibold block">Primary Touchpoints</span>
              <p className="text-xs text-slate-300 font-medium">Photoshop Campaign, Vector Identity, Stationery</p>
            </div>
            <div className="p-4 rounded-xl bg-[#141720] border border-slate-800 space-y-1">
              <span className="text-xs text-amber-400 font-semibold block">Software Suite</span>
              <p className="text-xs text-slate-300 font-medium">Adobe Photoshop CC & Illustrator CC</p>
            </div>
          </div>
        </section>

        {/* 02. Color Palette & Print Values */}
        <section className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              02. Color System
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Curated Earth, Sun & Deep Forest Tones
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {COLOR_PALETTE.map((color) => (
              <div
                key={color.hex}
                className="rounded-xl overflow-hidden border border-slate-800 bg-[#12141a] p-3 space-y-2"
              >
                <div
                  className="w-full aspect-square rounded-lg shadow-sm border border-white/10"
                  style={{ backgroundColor: color.hex }}
                />
                <div>
                  <span className="text-xs font-bold text-white block truncate">{color.name}</span>
                  <span className="text-[10px] text-amber-400 font-mono block">{color.hex}</span>
                  <span className="text-[9px] text-slate-400 font-mono block">CMYK: {color.cmyk}</span>
                  <span className="text-[8px] text-slate-500 font-mono block">{color.pantone}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 03. Typographic System */}
        <section className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              03. Typography Pairing
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              High-Character Display Paired with Editorial Serifs
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TYPOGRAPHY_SPECS.map((font) => (
              <div
                key={font.fontFamily}
                className="rounded-xl bg-[#141720] border border-slate-800 p-5 space-y-2"
              >
                <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider block">
                  {font.role}
                </span>
                <h4 className="text-lg font-bold text-white">{font.fontFamily}</h4>
                <p className="text-xs text-slate-300 italic">"{font.sampleText}"</p>
                <p className="text-[11px] text-slate-400 pt-1 leading-relaxed border-t border-slate-800/80">
                  {font.usage}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 04. Vector Logo Construction & Golden Ratio */}
        <section className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              04. Vector Logo Construction
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              The Solar Botanical Monogram (Golden Ratio Geometry)
            </h3>
          </div>
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#0D0E11] border border-slate-800 flex items-center justify-center p-8">
            <svg viewBox="0 0 500 500" className="w-80 h-80">
              {/* Construction Circles */}
              <circle cx="250" cy="250" r="160" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <circle cx="250" cy="250" r="99" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <line x1="250" y1="20" x2="250" y2="480" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
              <line x1="20" y1="250" x2="480" y2="250" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />

              {/* Logo Emblem */}
              <g transform="translate(250, 250)">
                <circle r="150" fill="none" stroke="#D99B38" strokeWidth="3" />
                {[0, 90, 180, 270].map((angle) => (
                  <path
                    key={angle}
                    transform={`rotate(${angle})`}
                    d="M 0 -150 C 24 -95 24 -40 0 0 C -24 -40 -24 -95 0 -150 Z"
                    fill="#D99B38"
                    opacity="0.95"
                  />
                ))}
                {[45, 135, 225, 315].map((angle) => (
                  <path
                    key={angle}
                    transform={`rotate(${angle})`}
                    d="M 0 -105 C 16 -68 16 -30 0 0 C -16 -30 -16 -68 0 -105 Z"
                    fill="#C06B3E"
                    opacity="0.9"
                  />
                ))}
                <circle r="32" fill="#D99B38" />
                <circle r="16" fill="#0D0E11" />
              </g>
            </svg>
            <div className="absolute bottom-4 left-6 text-xs text-slate-400 font-mono">
              Φ = 1.618033 · TANGENT ARCS · ADOBE ILLUSTRATOR CC
            </div>
          </div>
        </section>

        {/* 05. Handwritten Signature Digital Vector Case */}
        <section className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              05. Founder Signature Digitization
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Converting Calligraphy Ink to Fluid Bézier Paths
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-[#f4efe6] text-slate-900 space-y-2 border border-stone-300">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                Original Scanned Calligraphy
              </span>
              <div className="h-28 flex items-center justify-center">
                <span className="font-serif-accent italic text-3xl text-stone-800">Razia Awais</span>
              </div>
              <span className="text-[10px] text-stone-500 font-mono block">
                600 DPI ARCHIVAL INK SCAN · NATURAL PAPER IRREGULARITIES
              </span>
            </div>

            <div className="p-6 rounded-xl bg-[#0D0E11] text-white space-y-2 border border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Refined Bézier Vector Seal
              </span>
              <div className="h-28 flex items-center justify-center">
                <span className="font-serif-accent italic text-3xl text-amber-400 drop-shadow-[0_0_10px_rgba(217,155,56,0.4)]">
                  Razia Awais
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block">
                8 MINIMAL ANCHOR NODES · VARIABLE STROKE PRESSURE
              </span>
            </div>
          </div>
        </section>

        {/* 06. Photoshop Promotional Poster Campaign */}
        <section className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              06. Photoshop Campaign Poster
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              "The Forest Essence" — 1080 × 1350 px Social Campaign
            </h3>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 border border-slate-800 flex items-center justify-center p-6">
            <img
              src={ASSET_PATHS.mockupStreet}
              alt="Campaign Poster Showcase"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = '/assets/images/mockup_street_poster_1790652080614.jpg';
              }}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </section>

        {/* 07. Stationery & Packaging Suite */}
        <section className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              07. Stationery & Packaging Collateral
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Visiting Cards, DL Envelope & Seamless Pattern
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-[#12141a] border border-slate-800 space-y-2">
              <span className="text-xs text-amber-400 font-semibold block">Business Cards (Front & Back)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Printed on 450 GSM velvet cotton soft-touch paper with copper foil stamping and debossed
                founder signature. Standard 3.5" × 2" format with 0.125" bleed.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#12141a] border border-slate-800 space-y-2">
              <span className="text-xs text-amber-400 font-semibold block">Branded DL Envelope</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                220 × 110 mm mechanical layout featuring sender hierarchy, postal stamp clearance, and
                interior geometric pattern lining.
              </p>
            </div>
          </div>
        </section>

        {/* Behance Project Footer / Deliverables Summary */}
        <section className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span className="text-white font-semibold block">Project Credits & Authorship:</span>
            <span>Design, Retouching & Vector Engineering by {PROJECT_METADATA.designerName} (<a href={`mailto:${PROJECT_METADATA.designerEmail}`} className="text-amber-400 hover:underline">{PROJECT_METADATA.designerEmail}</a>)</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-medium">Production Approved & Client-Ready Deliverables</span>
          </div>
        </section>
      </article>
    </div>
  );
};
