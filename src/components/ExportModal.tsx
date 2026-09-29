import React, { useState } from 'react';
import { PROJECT_METADATA, ASSET_PATHS } from '../data/projectData';
import { X, Download, Copy, Check, FileCheck, Layers, Image as ImageIcon } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadingPoster, setDownloadingPoster] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(PROJECT_METADATA.behanceUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadPoster = () => {
    setDownloadingPoster(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setDownloadingPoster(false);
      return;
    }

    // Canvas background
    ctx.fillStyle = '#0E2822';
    ctx.fillRect(0, 0, 1080, 1350);

    const bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';
    bgImg.src = ASSET_PATHS.metaAiBackground;
    bgImg.onerror = () => {
      if (!bgImg.src.includes('public')) {
        bgImg.src = '/assets/images/meta_ai_background_1790652066404.jpg';
      }
    };

    bgImg.onload = () => {
      ctx.globalAlpha = 0.85;
      ctx.drawImage(bgImg, 0, 0, 1080, 1350);
      ctx.globalAlpha = 1.0;

      const subImg = new Image();
      subImg.crossOrigin = 'anonymous';
      subImg.src = ASSET_PATHS.posterSubject;
      subImg.onerror = () => {
        if (!subImg.src.includes('public')) {
          subImg.src = '/assets/images/poster_main_subject_1790652032820.jpg';
        }
      };

      subImg.onload = () => {
        ctx.drawImage(subImg, 140, 260, 800, 1000);

        // Render typography
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

        // CTA
        ctx.fillStyle = '#D99B38';
        ctx.beginPath();
        ctx.roundRect(360, 1180, 360, 60, [30]);
        ctx.fill();

        ctx.fillStyle = '#0D0E11';
        ctx.font = 'bold 20px "Plus Jakarta Sans"';
        ctx.fillText('RESERVE YOUR VINTAGE', 540, 1218);

        // Specs
        ctx.fillStyle = 'rgba(245, 242, 235, 0.6)';
        ctx.font = '14px "Plus Jakarta Sans"';
        ctx.fillText('1080 × 1350 PX · SOLIS RESERVE COMMERCIAL CAMPAIGN DELIVERABLE', 540, 1290);

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `Solis_Reserve_Final_Photoshop_Poster_1080x1350.png`;
        link.href = dataUrl;
        link.click();
        setDownloadingPoster(false);
      };
    };
  };

  const handleDownloadVectorSvg = () => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="100%" height="100%" fill="#0D0E11"/>
  <g transform="translate(250, 250)">
    <circle r="160" fill="none" stroke="#D99B38" stroke-width="4"/>
    <circle r="140" fill="none" stroke="#D99B38" stroke-width="1.5" stroke-dasharray="4 6"/>
    <path d="M 0 -160 C 25 -100 25 -40 0 0 C -25 -40 -25 -100 0 -160 Z" fill="#D99B38" opacity="0.9"/>
    <path d="M 160 0 C 100 25 40 25 0 0 C 40 -25 100 -25 160 0 Z" fill="#D99B38" opacity="0.9"/>
    <path d="M 0 160 C -25 100 -25 40 0 0 C 25 40 25 100 0 160 Z" fill="#D99B38" opacity="0.9"/>
    <path d="M -160 0 C -100 -25 -40 -25 0 0 C -40 25 -100 25 -160 0 Z" fill="#D99B38" opacity="0.9"/>
    <path d="M 113 -113 C 85 -55 45 -25 0 0 C 25 -45 55 -85 113 -113 Z" fill="#C06B3E" opacity="0.85"/>
    <path d="M 113 113 C 55 85 25 45 0 0 C 45 25 85 55 113 113 Z" fill="#C06B3E" opacity="0.85"/>
    <path d="M -113 113 C -85 55 -45 25 0 0 C -25 45 -55 85 -113 113 Z" fill="#C06B3E" opacity="0.85"/>
    <path d="M -113 -113 C -55 -85 -25 -45 0 0 C -45 -25 -85 -55 -113 -113 Z" fill="#C06B3E" opacity="0.85"/>
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
    link.download = `Solis_Reserve_Vector_Emblem_Illustrator.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPatternSvg = () => {
    const patternContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200" height="200">
  <rect width="100%" height="100%" fill="#0D0E11"/>
  <circle cx="50" cy="50" r="40" stroke="#D99B38" fill="none" opacity="0.4" stroke-dasharray="3 3"/>
  <circle cx="50" cy="50" r="24" stroke="#D99B38" fill="none" opacity="0.7"/>
  <circle cx="50" cy="50" r="10" fill="#D99B38"/>
  <path d="M 0 0 Q 25 25 50 0 Q 75 25 100 0" stroke="#D99B38" fill="none" opacity="0.5"/>
  <path d="M 0 100 Q 25 75 50 100 Q 75 75 100 100" stroke="#D99B38" fill="none" opacity="0.5"/>
  <path d="M 50 10 C 60 30 60 40 50 50 C 40 40 40 30 50 10 Z" fill="#C06B3E"/>
  <path d="M 50 90 C 60 70 60 60 50 50 C 40 60 40 70 50 90 Z" fill="#C06B3E"/>
</svg>`;

    const blob = new Blob([patternContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Solis_Reserve_Seamless_Pattern_Tile.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#12141a] rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 my-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
              Deliverables Download Center
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Solis Reserve Master Deliverables Package
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Lead Designer: <strong>{PROJECT_METADATA.designerName}</strong> · {PROJECT_METADATA.studio}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Download Action List */}
        <div className="space-y-3 text-xs">
          {/* 1. Final Poster PNG */}
          <div className="p-4 rounded-xl bg-[#151821] border border-slate-800 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-white block">
                Final Photoshop Promotional Poster (1080 × 1350 px)
              </span>
              <p className="text-slate-400 text-[11px]">
                High-resolution 300 DPI PNG with all blended layers, typography & CTA.
              </p>
            </div>
            <button
              onClick={handleDownloadPoster}
              disabled={downloadingPoster}
              className="flex items-center gap-1.5 px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-lg transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadingPoster ? 'Rendering...' : 'Download PNG'}</span>
            </button>
          </div>

          {/* 2. Vector Logo SVG */}
          <div className="p-4 rounded-xl bg-[#151821] border border-slate-800 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-white block">
                Scalable Vector Logo & Construction Grid (SVG)
              </span>
              <p className="text-slate-400 text-[11px]">
                Pure mathematical vector curves built in Illustrator CC, infinite scalability.
              </p>
            </div>
            <button
              onClick={handleDownloadVectorSvg}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download SVG</span>
            </button>
          </div>

          {/* 3. Seamless Pattern SVG Tile */}
          <div className="p-4 rounded-xl bg-[#151821] border border-slate-800 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-white block">
                Seamless Repeatable Brand Pattern Tile (SVG)
              </span>
              <p className="text-slate-400 text-[11px]">
                Four-way Cartesian repeating tile swatch for stationery and packaging wrapping.
              </p>
            </div>
            <button
              onClick={handleDownloadPatternSvg}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Swatch</span>
            </button>
          </div>

          {/* 4. Behance Project Submission Link */}
          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-blue-200 block">
                Public Behance Portfolio Link · {PROJECT_METADATA.designerName}
              </span>
              <p className="text-blue-300/80 text-[11px] font-mono break-all">
                {PROJECT_METADATA.behanceUrl}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={PROJECT_METADATA.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <span>Open Behance · {PROJECT_METADATA.designerName}</span>
              </a>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>All 16 Production Deliverables & Design Standards Verified</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
