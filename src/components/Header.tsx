import React from 'react';
import { ProjectTab } from '../types';
import { Award, Download } from 'lucide-react';

interface HeaderProps {
  activeTab: ProjectTab;
  onSelectTab: (tab: ProjectTab) => void;
  onOpenRubric: () => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenRubric,
  onOpenExport,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0d10]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('overview')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-base font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
            SOLIS RESERVE · BRAND STUDIO
          </span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-medium text-slate-400">
          <button
            onClick={() => onSelectTab('overview')}
            className={`cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'text-amber-400 font-semibold border-b border-amber-400 pb-1'
                : 'hover:text-slate-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onSelectTab('photoshop-poster')}
            className={`cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'photoshop-poster'
                ? 'text-amber-400 font-semibold border-b border-amber-400 pb-1'
                : 'hover:text-slate-200'
            }`}
          >
            Photoshop Campaign
          </button>
          <button
            onClick={() => onSelectTab('pen-tool-retouch')}
            className={`cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'pen-tool-retouch'
                ? 'text-amber-400 font-semibold border-b border-amber-400 pb-1'
                : 'hover:text-slate-200'
            }`}
          >
            Retouch & Pen Tool
          </button>
          <button
            onClick={() => onSelectTab('illustrator-identity')}
            className={`cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'illustrator-identity'
                ? 'text-amber-400 font-semibold border-b border-amber-400 pb-1'
                : 'hover:text-slate-200'
            }`}
          >
            Vector Identity
          </button>
          <button
            onClick={() => onSelectTab('stationery-mockups')}
            className={`cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'stationery-mockups'
                ? 'text-amber-400 font-semibold border-b border-amber-400 pb-1'
                : 'hover:text-slate-200'
            }`}
          >
            Stationery & Mockups
          </button>
          <button
            onClick={() => onSelectTab('behance-portfolio')}
            className={`cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'behance-portfolio'
                ? 'text-amber-400 font-semibold border-b border-amber-400 pb-1'
                : 'hover:text-slate-200'
            }`}
          >
            Behance Case Study
          </button>
          <button
            onClick={() => onSelectTab('submission-package')}
            className={`cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'submission-package'
                ? 'text-amber-400 font-semibold border-b border-amber-400 pb-1'
                : 'text-amber-400/80 hover:text-amber-300'
            }`}
          >
            Deliverables (14)
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRubric}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/30 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Design Standards</span>
          </button>
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Package</span>
          </button>
        </div>
      </div>
    </header>
  );
};
