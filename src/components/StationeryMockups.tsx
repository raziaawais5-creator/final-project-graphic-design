import React, { useState } from 'react';
import { COLOR_PALETTE, PROJECT_METADATA } from '../data/projectData';
import { CreditCard, Mail, RotateCw, Eye, CheckCircle2, Download, Printer } from 'lucide-react';

export const StationeryMockups: React.FC = () => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [showBleedMarks, setShowBleedMarks] = useState(true);
  const [activeStationeryView, setActiveStationeryView] = useState<'card' | 'envelope' | 'suite'>('card');

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Illustrator Collateral & Stationery Suite</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">Question 02 Deliverables</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Visiting Cards & Branded DL Envelope Layout
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Print-ready stationery system with exact industrial dimensions, 0.125" (3mm) bleed safety
            margins, CMYK offset separation values, and luxury copper-gold foil finish specifications.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
          <button
            onClick={() => setActiveStationeryView('card')}
            className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
              activeStationeryView === 'card'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Business Card (3.5×2")
          </button>
          <button
            onClick={() => setActiveStationeryView('envelope')}
            className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
              activeStationeryView === 'envelope'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Branded Envelope (DL/C5)
          </button>
          <button
            onClick={() => setActiveStationeryView('suite')}
            className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
              activeStationeryView === 'suite'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Stationery Desk Mockup
          </button>
        </div>
      </div>

      {/* VIEW 1: BUSINESS CARD (FRONT & BACK WITH 3D FLIP) */}
      {activeStationeryView === 'card' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 3D Interactive Card Preview */}
          <div className="lg:col-span-7 flex flex-col items-center space-y-4">
            {/* View Controls */}
            <div className="w-full flex items-center justify-between bg-[#12141a] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Active Side:</span>
                <span className="text-amber-400 font-mono">{isCardFlipped ? 'BACK (CONTACT)' : 'FRONT (EMBLEM)'}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowBleedMarks(!showBleedMarks)}
                  className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
                    showBleedMarks ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400'
                  }`}
                >
                  {showBleedMarks ? 'Hide Bleed/Trim' : 'Show Bleed & Trim'}
                </button>

                <button
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="flex items-center gap-1 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded cursor-pointer transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Flip 3D Card</span>
                </button>
              </div>
            </div>

            {/* 3D Perspective Card Container */}
            <div className="w-full max-w-md aspect-[1.75/1] perspective-1000 py-6">
              <div
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className={`relative w-full h-full duration-700 transform-style-3d cursor-pointer select-none rounded-xl shadow-[0_25px_50px_rgba(0,0,0,0.8)] transition-transform ${
                  isCardFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* CARD FRONT: Obsidian Velvet Texture with Gold Foil Logo */}
                <div className="absolute inset-0 w-full h-full bg-[#0D0E11] rounded-xl border border-slate-800 backface-hidden p-6 flex flex-col justify-between overflow-hidden">
                  {/* Bleed & Crop Marks Overlay */}
                  {showBleedMarks && (
                    <div className="absolute inset-2 border border-dashed border-red-500/40 pointer-events-none">
                      <span className="absolute top-1 left-2 text-[8px] font-mono text-red-400">TRIM: 3.5" × 2"</span>
                      <span className="absolute bottom-1 right-2 text-[8px] font-mono text-emerald-400">SAFE MARGIN 3MM</span>
                    </div>
                  )}

                  {/* Subtle Background Pattern Deboss */}
                  <div className="absolute -right-12 -top-12 w-48 h-48 opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-400 fill-none">
                      <circle cx="50" cy="50" r="40" strokeWidth="2" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="25" strokeWidth="1.5" />
                    </svg>
                  </div>

                  {/* Top: Small Brand Declaration */}
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-slate-400 font-mono">
                    <span>SOLIS RESERVE</span>
                    <span className="text-amber-400">N° 07</span>
                  </div>

                  {/* Center: Embossed Metallic Copper/Gold Emblem */}
                  <div className="flex flex-col items-center justify-center space-y-2 text-center my-auto">
                    <div className="w-12 h-12 rounded-full border-2 border-amber-400/90 flex items-center justify-center shadow-[0_0_15px_rgba(217,155,56,0.3)]">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300" />
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-white text-base tracking-[0.25em]">
                        SOLIS RESERVE
                      </h4>
                      <p className="font-serif-accent italic text-[11px] text-amber-300/90 mt-0.5">
                        Botanical Cold-Drip Roastery
                      </p>
                    </div>
                  </div>

                  {/* Bottom: Contactless NFC & Founder Script */}
                  <div className="flex items-center justify-between text-[9px] text-slate-400">
                    <span className="font-mono text-[8px]">SOFT TOUCH MATTE · 450 GSM</span>
                    <span className="font-serif-accent italic text-amber-300/80">Razia Awais</span>
                  </div>
                </div>

                {/* CARD BACK: Typographic Grid & Contact Details */}
                <div className="absolute inset-0 w-full h-full bg-[#12141a] rounded-xl border border-slate-800 backface-hidden rotate-y-180 p-6 flex flex-col justify-between overflow-hidden">
                  {showBleedMarks && (
                    <div className="absolute inset-2 border border-dashed border-red-500/40 pointer-events-none" />
                  )}

                  {/* Top Back: Name & Title */}
                  <div className="flex items-start justify-between border-b border-slate-800 pb-2">
                    <div>
                      <h5 className="font-display font-bold text-white text-sm tracking-wide">
                        RAZIA AWAIS
                      </h5>
                      <span className="text-[10px] text-amber-400 font-medium block">
                        Master Roaster & Creative Director
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">SR-ID-2026</span>
                  </div>

                  {/* Center: Contact Information + Mini QR Code */}
                  <div className="grid grid-cols-12 gap-3 items-center py-1">
                    <div className="col-span-8 space-y-1 text-[9px] text-slate-300">
                      <p className="flex items-center gap-1.5">
                        <span className="text-amber-400 font-semibold">T:</span>
                        <span>+92 300 8472910</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span className="text-amber-400 font-semibold">E:</span>
                        <span>raziaawais5@gmail.com</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span className="text-amber-400 font-semibold">W:</span>
                        <span>www.solisreserve.pk</span>
                      </p>
                      <p className="text-[8px] text-slate-400 pt-0.5 leading-tight">
                        Studio 4B, M.M. Alam Road, Gulberg III, Lahore
                      </p>
                    </div>

                    {/* QR Code Vector Mock */}
                    <div className="col-span-4 flex justify-end">
                      <div className="w-14 h-14 bg-white p-1 rounded-sm shadow-xs flex items-center justify-center">
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center text-[7px] text-white font-mono text-center leading-tight">
                          SCAN NFC / VCARD
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Batch credentials */}
                  <div className="flex items-center justify-between text-[8px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <span>SOLIS RESERVE CRAFT ROASTERY</span>
                    <span className="text-amber-400 font-mono">EST. 2026 · GULBERG III</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Click anywhere on the business card to trigger the 3D flip animation.
            </p>
          </div>

          {/* Right: Technical Card Print Specifications */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            <div className="rounded-xl bg-[#12141a] border border-slate-800 p-6 space-y-4">
              <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Visiting Card Print & Production Specs</span>
              </h4>

              <div className="space-y-2.5 text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Trim Size:</span>
                  <span className="text-white font-mono">3.5" × 2.0" (88.9 × 50.8 mm)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Bleed Margins:</span>
                  <span className="text-amber-400 font-mono">0.125" (3.175 mm) All Edges</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Safe Type Zone:</span>
                  <span className="text-emerald-400 font-mono">0.125" inward from trim</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Substrate Paper:</span>
                  <span className="text-white">450 GSM Cotton Velvet Soft-Touch</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Finishes:</span>
                  <span className="text-white">Hot Foil Stamping (Gold/Copper) + Blind Deboss</span>
                </div>
              </div>

              <div className="pt-2 text-slate-400 leading-relaxed text-[11px]">
                Both sides created in Illustrator CC on dedicated artboards, utilizing vector paths exclusively.
                No raster imagery, allowing pristine plate engraving at 2400 DPI.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: BRANDED ENVELOPE (STANDARD DL / C5) */}
      {activeStationeryView === 'envelope' && (
        <div className="space-y-6">
          <div className="bg-[#12141a] rounded-xl border border-slate-800 p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Illustrator Layout Requirement
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Branded Envelope Layout (Standard DL / C5 Format)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Accurate mechanical layout: 220 × 110 mm (Standard DL Envelope) with logo placement,
                  sender credentials, stamp box safe zone, and interior geometric pattern lining.
                </p>
              </div>

              <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                220 mm × 110 mm · CMYK PRINT
              </div>
            </div>

            {/* DL Envelope Blueprint Container */}
            <div className="relative max-w-4xl mx-auto aspect-[2/1] bg-[#F5F2EB] rounded-lg shadow-2xl p-6 sm:p-10 border border-stone-300 flex flex-col justify-between text-slate-900 select-none overflow-hidden">
              {/* Left Flap / Internal Pattern Hint */}
              <div className="absolute -left-12 top-0 bottom-0 w-20 bg-[#0E2822] opacity-90 shadow-lg transform -skew-x-12" />

              {/* Top: Sender Block + Logo */}
              <div className="flex items-start justify-between relative z-10">
                {/* Logo & Sender Address */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border border-amber-600 bg-[#0E2822] flex items-center justify-center text-amber-300 font-bold text-xs">
                    S
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-display font-extrabold text-sm tracking-widest text-[#0D0E11] block">
                      SOLIS RESERVE
                    </span>
                    <span className="text-[9px] text-stone-600 block leading-tight">
                      Craft Roastery & Botanical Elixir Labs
                    </span>
                    <span className="text-[8px] font-mono text-stone-500 block">
                      Studio 4B, M.M. Alam Road, Gulberg III, Lahore, Pakistan
                    </span>
                  </div>
                </div>

                {/* Postage Stamp Safe Zone Box */}
                <div className="w-16 h-20 border-2 border-dashed border-stone-400 rounded-sm flex flex-col items-center justify-center p-1 text-center">
                  <span className="text-[7px] font-mono text-stone-500 uppercase leading-tight font-semibold">
                    POSTAGE STAMP
                  </span>
                  <span className="text-[6px] font-mono text-stone-400 mt-1">SAFE ZONE</span>
                </div>
              </div>

              {/* Center: Recipient Guide Area (Guidelines for Mailing) */}
              <div className="self-end w-72 space-y-1.5 relative z-10 pt-4">
                <span className="text-[8px] uppercase tracking-wider text-stone-500 font-semibold block">
                  DELIVER TO:
                </span>
                <div className="h-px bg-stone-300 w-full" />
                <div className="h-px bg-stone-300 w-full" />
                <div className="h-px bg-stone-300 w-3/4" />
                <span className="text-[8px] font-mono text-stone-400 block pt-1">
                  ATTENTION: MANAGING DIRECTOR / LUXURY CELLAR BUYER
                </span>
              </div>

              {/* Bottom: Accent Strip & Priority Airmail Indicia */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-300 text-[8px] text-stone-500 relative z-10 font-mono">
                <div className="flex items-center gap-2">
                  <span className="bg-[#0E2822] text-amber-300 px-2 py-0.5 rounded-xs font-semibold">
                    PRIORITY COLD-CHAIN DISPATCH
                  </span>
                  <span>CONFIDENTIAL CLIENT BRIEF</span>
                </div>
                <span>SOLIS RESERVE CRAFT ROASTERY · LAHORE</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center">
              Adheres strictly to universal postal automation regulations: 40mm top-right stamp clearance
              and 15mm barcode clearance along the bottom edge.
            </p>
          </div>
        </div>
      )}

      {/* VIEW 3: FULL STATIONERY DESK MOCKUP */}
      {activeStationeryView === 'suite' && (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 p-8 sm:p-12 bg-[#141720] flex items-center justify-center min-h-[500px]">
            {/* Soft tabletop shadow and ambient studio lighting */}
            <div className="absolute inset-0 bg-radial from-slate-800/20 via-transparent to-black pointer-events-none" />

            <div className="relative max-w-3xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Stacked Business Cards Mockup */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative w-64 aspect-[1.75/1] bg-[#0D0E11] rounded-lg shadow-2xl p-5 border border-slate-800 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                  {/* Card Front */}
                  <div className="flex justify-between items-center text-[8px] text-amber-400 font-mono">
                    <span>SOLIS RESERVE</span>
                    <span>N° 07</span>
                  </div>
                  <div className="text-center my-3">
                    <span className="font-display font-bold text-white text-xs tracking-widest block">
                      SOLIS RESERVE
                    </span>
                    <span className="font-serif-accent italic text-[9px] text-amber-300 block">
                      Cold-Drip Roastery
                    </span>
                  </div>
                </div>

                <div className="relative w-64 aspect-[1.75/1] bg-[#12141a] rounded-lg shadow-xl p-5 border border-slate-800 transform rotate-3 -mt-16 hover:rotate-0 transition-transform duration-500">
                  {/* Card Back */}
                  <div className="text-[8px] text-white space-y-0.5">
                    <span className="font-bold block">RAZIA AWAIS</span>
                    <span className="text-amber-400 text-[7px] block">Master Roaster</span>
                    <span className="text-slate-400 text-[7px] block pt-1">+92 300 8472910</span>
                  </div>
                </div>
              </div>

              {/* Envelope Floating Presentation */}
              <div className="md:col-span-7">
                <div className="relative w-full aspect-[2/1] bg-[#F5F2EB] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-6 border border-stone-300 transform rotate-2 hover:rotate-0 transition-transform duration-500 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="text-[8px] text-stone-700">
                      <span className="font-bold block text-black">SOLIS RESERVE</span>
                      <span className="block text-[7px]">Gulberg III, Lahore</span>
                    </div>
                    <div className="w-10 h-12 border border-dashed border-stone-400 flex items-center justify-center text-[6px] font-mono text-stone-500">
                      STAMP
                    </div>
                  </div>
                  <div className="text-[8px] text-stone-600 self-end w-40 border-b border-stone-300 pb-1">
                    To: Luxury Cellar Buyers
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white">
              <span>Stationery Suite 3D Perspective · Clean Vector Construction</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center">
            Consistent visual direction applied across multiple print substrates and collateral touchpoints.
          </p>
        </div>
      )}
    </div>
  );
};
