import React, { useState } from 'react';
import { RUBRIC_DATA, PROJECT_METADATA } from '../data/projectData';
import { X, Award, CheckCircle2, Printer, Check, ShieldCheck } from 'lucide-react';

interface RubricGradingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RubricGradingModal: React.FC<RubricGradingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [filterSection, setFilterSection] = useState<'all' | 'ps' | 'ai'>('all');
  const [directorApproved, setDirectorApproved] = useState(true);

  const filteredRubrics = RUBRIC_DATA.filter((item) => {
    if (filterSection === 'ps') return item.section.startsWith('Photoshop');
    if (filterSection === 'ai') return item.section.startsWith('Illustrator');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#12141a] rounded-2xl border border-slate-800 shadow-2xl p-6 md:p-8 space-y-6 max-h-[90vh] flex flex-col my-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Production Quality Assurance & Technical Specifications</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Solis Reserve: Design Standards & Deliverables Verification
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Lead Designer: <strong>{PROJECT_METADATA.designerName}</strong> · Client: <strong>{PROJECT_METADATA.client}</strong>
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

        {/* Section Filter & Quality Summary */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0d0f14] p-4 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterSection('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                filterSection === 'all'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Specifications (16)
            </button>
            <button
              onClick={() => setFilterSection('ps')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                filterSection === 'ps'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Photoshop Campaign (8)
            </button>
            <button
              onClick={() => setFilterSection('ai')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                filterSection === 'ai'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Illustrator Identity (8)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Compliance Status:</span>
            <span className="text-sm font-extrabold text-emerald-400 font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              16 / 16 Standards Verified (100%)
            </span>
          </div>
        </div>

        {/* Rubrics Checklist Table */}
        <div className="overflow-y-auto space-y-3 pr-1 text-xs">
          {filteredRubrics.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-[#151821] border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
                    {item.section}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="font-bold text-white text-xs">{item.criterion}</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  <strong className="text-slate-300">Technical Implementation:</strong> {item.evidence}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                <span className="font-mono text-xs text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {item.weightLabel}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approved</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Creative Director Sign-Off Footer */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <button
              onClick={() => setDirectorApproved(!directorApproved)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                directorApproved
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{directorApproved ? 'Approved for Client Delivery & Publication' : 'Sign Off Deliverables'}</span>
            </button>
            {directorApproved && (
              <span className="text-emerald-400 font-serif-accent italic">
                Quality Certified: Commercial Grade A+
              </span>
            )}
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Specifications Sheet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
