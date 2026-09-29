import React, { useState } from 'react';
import { ProjectTab } from './types';
import { Header } from './components/Header';
import { OverviewHero } from './components/OverviewHero';
import { PhotoshopPosterStudio } from './components/PhotoshopPosterStudio';
import { PenToolRetouchStudio } from './components/PenToolRetouchStudio';
import { IllustratorIdentityStudio } from './components/IllustratorIdentityStudio';
import { StationeryMockups } from './components/StationeryMockups';
import { BehanceProjectView } from './components/BehanceProjectView';
import { SubmissionPackageView } from './components/SubmissionPackageView';
import { RubricGradingModal } from './components/RubricGradingModal';
import { ExportModal } from './components/ExportModal';
import { PROJECT_METADATA } from './data/projectData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ProjectTab>('overview');
  const [isRubricOpen, setIsRubricOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-slate-100 flex flex-col selection:bg-amber-500/20 selection:text-amber-200">
      {/* Top Bar (adheres to 3-zone contract) */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenRubric={() => setIsRubricOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'overview' && (
          <OverviewHero onSelectTab={setActiveTab} />
        )}

        {activeTab === 'photoshop-poster' && (
          <PhotoshopPosterStudio />
        )}

        {activeTab === 'pen-tool-retouch' && (
          <PenToolRetouchStudio />
        )}

        {activeTab === 'illustrator-identity' && (
          <IllustratorIdentityStudio />
        )}

        {activeTab === 'stationery-mockups' && (
          <StationeryMockups />
        )}

        {activeTab === 'behance-portfolio' && (
          <BehanceProjectView />
        )}

        {activeTab === 'submission-package' && (
          <SubmissionPackageView />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#08090b] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-400">{PROJECT_METADATA.brandName}</span>
            <span aria-hidden="true">·</span>
            <span>{PROJECT_METADATA.projectType}</span>
            <span aria-hidden="true">·</span>
            <span>Lead Designer: {PROJECT_METADATA.designerName}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsRubricOpen(true)}
              className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              Design Standards (16)
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsExportOpen(true)}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Export Center
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <RubricGradingModal
        isOpen={isRubricOpen}
        onClose={() => setIsRubricOpen(false)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
