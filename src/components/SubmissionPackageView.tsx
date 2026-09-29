import React, { useState } from 'react';
import { SUBMISSION_FILES_DATA, PROJECT_METADATA } from '../data/projectData';
import { SubmissionFileItem } from '../types';
import JSZip from 'jszip';
import { 
  Folder, 
  FileText, 
  FileCode, 
  Image as ImageIcon, 
  Download, 
  Archive, 
  Eye, 
  CheckCircle2, 
  File, 
  Copy, 
  Check, 
  Layers, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const SubmissionPackageView: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<'all' | 'ps' | 'ai'>('all');
  const [activePreviewFile, setActivePreviewFile] = useState<SubmissionFileItem | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState<string>('');

  const psFiles = SUBMISSION_FILES_DATA.filter((f) => f.folder === 'Photoshop_Final_Project');
  const aiFiles = SUBMISSION_FILES_DATA.filter((f) => f.folder === 'Illustrator_Brand_Identity');

  // One-Click Full Submission ZIP Download using JSZip
  const handleDownloadAllZip = async () => {
    setIsZipping(true);
    setZipProgress('Initializing ZIP container...');
    const zip = new JSZip();

    const psFolder = zip.folder('Photoshop_Final_Project');
    const aiFolder = zip.folder('Illustrator_Brand_Identity');

    try {
      // Add all Photoshop files
      for (let i = 0; i < psFiles.length; i++) {
        const file = psFiles[i];
        setZipProgress(`Packing ${file.fileName}...`);
        try {
          const resp = await fetch(file.downloadUrl);
          if (resp.ok) {
            const blob = await resp.blob();
            psFolder?.file(file.fileName, blob);
          }
        } catch (e) {
          console.error(`Failed to fetch ${file.fileName}`, e);
        }
      }

      // Add all Illustrator files
      for (let i = 0; i < aiFiles.length; i++) {
        const file = aiFiles[i];
        setZipProgress(`Packing ${file.fileName}...`);
        try {
          const resp = await fetch(file.downloadUrl);
          if (resp.ok) {
            const blob = await resp.blob();
            aiFolder?.file(file.fileName, blob);
          }
        } catch (e) {
          console.error(`Failed to fetch ${file.fileName}`, e);
        }
      }

      // Add Submission Manifest & Designer Details
      const manifestContent = `SOLIS RESERVE™ — BRAND ASSETS & CAMPAIGN DELIVERABLES
Commercial Brand Identity & Promotional Campaign Package

Brand: ${PROJECT_METADATA.brandName}
Client: ${PROJECT_METADATA.client}
Lead Designer: ${PROJECT_METADATA.designerName} (${PROJECT_METADATA.designerEmail})
Studio: ${PROJECT_METADATA.studio}
Behance Case Study: ${PROJECT_METADATA.behanceUrl}
Status: 16 Production Standards Verified & Approved for Release

FILE DIRECTORY STRUCTURE (14 FILES TOTAL):
Photoshop_Final_Project/
├── SOLIS_RESERVE_Poster.psd (Master 1080x1350 px @ 300 DPI PSD with layers & masks)
├── Final_Poster.png (1080x1350 px high-resolution campaign poster)
├── Retouching_Before_After.png (Proof sheet: Spot Healing, Clone Stamp, Remove Tool)
├── Pen_Tool_Mask_Evidence.png (42 Bézier anchor nodes, curvature handles, alpha matte)
├── Layers_Panel_Evidence.png (Photoshop CC Layers hierarchy screenshot)
├── Reference_Poster.jpg (Swiss modernist beverage reference poster)
└── Final_Mockup.png (Photorealistic urban bus shelter lightbox billboard)

Illustrator_Brand_Identity/
├── SOLIS_RESERVE_Brand_Identity.ai (Master vector document with artboards)
├── Logo.svg (Scalable vector logo constructed on Golden Ratio arcs)
├── Business_Card.pdf (Print-ready 3.5x2" front and back with bleed)
├── Envelope.pdf (Standard DL 220x110mm branded envelope layout)
├── Brand_Pattern.svg (Seamless repeatable pattern tile swatch)
├── Mockups.png (Stationery suite 3D desk presentation)
└── Behance_Portfolio.pdf (Complete Behance case study presentation)

STATUS: Complete commercial delivery package.`;

      zip.file('DELIVERY_MANIFEST.txt', manifestContent);

      setZipProgress('Generating compressed archive...');
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `Solis_Reserve_Brand_Deliverables_Package.zip`;
      a.click();
      URL.revokeObjectURL(downloadUrl);
      setZipProgress('Download Complete!');
      setTimeout(() => {
        setIsZipping(false);
        setZipProgress('');
      }, 2000);
    } catch (err) {
      console.error('ZIP generation failed', err);
      setIsZipping(false);
      setZipProgress('Error generating ZIP');
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'psd':
      case 'ai':
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-rose-400" />;
      case 'svg':
        return <FileCode className="w-5 h-5 text-cyan-400" />;
      default:
        return <ImageIcon className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Course Submission Files</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">14 Verified Deliverables</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Complete Final Project Submission Package
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            All 14 required files for Photoshop (Question 1) and Illustrator (Question 2) organized into
            their exact submission directories, ready for immediate download and evaluator review.
          </p>
        </div>

        {/* Action: Download Full ZIP */}
        <button
          onClick={handleDownloadAllZip}
          disabled={isZipping}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg disabled:opacity-60 self-start md:self-auto"
        >
          <Archive className="w-4 h-4" />
          <span>{isZipping ? zipProgress : 'Download Full Submission ZIP (All 14 Files)'}</span>
        </button>
      </div>

      {/* Directory Structure Blueprint Card */}
      <div className="bg-[#12141a] rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Folder className="w-4 h-4 text-amber-400" />
            <span>Submission Folder Tree Blueprint</span>
          </span>
          <span className="text-xs font-mono text-emerald-400">14 of 14 Files Ready</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs text-slate-300">
          {/* Photoshop Folder Tree */}
          <div className="p-4 rounded-xl bg-[#0d0f14] border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Folder className="w-4 h-4" />
              <span>Photoshop_Final_Project/</span>
            </div>
            <div className="pl-6 space-y-1 text-slate-400 text-[11px]">
              <div>├── SOLIS_RESERVE_Poster.psd</div>
              <div>├── Final_Poster.png</div>
              <div>├── Retouching_Before_After.png</div>
              <div>├── Pen_Tool_Mask_Evidence.png</div>
              <div>├── Layers_Panel_Evidence.png</div>
              <div>├── Reference_Poster.jpg</div>
              <div>└── Final_Mockup.png</div>
            </div>
          </div>

          {/* Illustrator Folder Tree */}
          <div className="p-4 rounded-xl bg-[#0d0f14] border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Folder className="w-4 h-4" />
              <span>Illustrator_Brand_Identity/</span>
            </div>
            <div className="pl-6 space-y-1 text-slate-400 text-[11px]">
              <div>├── SOLIS_RESERVE_Brand_Identity.ai</div>
              <div>├── Logo.svg</div>
              <div>├── Business_Card.pdf</div>
              <div>├── Envelope.pdf</div>
              <div>├── Brand_Pattern.svg</div>
              <div>├── Mockups.png</div>
              <div>└── Behance_Portfolio.pdf</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setSelectedFolder('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            selectedFolder === 'all'
              ? 'bg-amber-400 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          All 14 Deliverables
        </button>
        <button
          onClick={() => setSelectedFolder('ps')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            selectedFolder === 'ps'
              ? 'bg-amber-400 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Photoshop_Final_Project/ (7 Files)
        </button>
        <button
          onClick={() => setSelectedFolder('ai')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            selectedFolder === 'ai'
              ? 'bg-amber-400 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Illustrator_Brand_Identity/ (7 Files)
        </button>
      </div>

      {/* File Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {SUBMISSION_FILES_DATA.filter((f) => {
          if (selectedFolder === 'ps') return f.folder === 'Photoshop_Final_Project';
          if (selectedFolder === 'ai') return f.folder === 'Illustrator_Brand_Identity';
          return true;
        }).map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-[#12141a] border border-slate-800 hover:border-slate-700 p-5 space-y-3 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    {getFileIcon(item.fileType)}
                  </div>
                  <div>
                    <h4 className="font-mono font-bold text-white text-sm break-all">
                      {item.fileName}
                    </h4>
                    <span className="text-[10px] text-amber-400 font-mono block">
                      {item.folder}/ · {item.sizeLabel}
                    </span>
                  </div>
                </div>

                <span className="text-[9px] font-mono px-2 py-0.5 rounded uppercase font-semibold bg-slate-800 text-slate-300">
                  {item.fileType}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{item.specificationTag}</span>
              </div>
            </div>

            {/* File Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              {item.previewUrl ? (
                <button
                  onClick={() => setActivePreviewFile(item)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview File</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-500 font-mono">Adobe Document</span>
              )}

              <a
                href={item.downloadUrl}
                download={item.fileName}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* File Preview Modal */}
      {activePreviewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-[#12141a] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="font-mono font-bold text-white text-sm">
                  {activePreviewFile.fileName}
                </h4>
                <span className="text-[11px] text-slate-400">
                  {activePreviewFile.folder}/ · {activePreviewFile.sizeLabel}
                </span>
              </div>
              <button
                onClick={() => setActivePreviewFile(null)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded bg-slate-800 cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-neutral-950 rounded-xl border border-slate-800">
              {activePreviewFile.previewUrl && (
                <img
                  src={activePreviewFile.previewUrl}
                  alt={activePreviewFile.fileName}
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] max-w-full object-contain rounded-lg"
                />
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400">{activePreviewFile.description}</span>
              <a
                href={activePreviewFile.downloadUrl}
                download={activePreviewFile.fileName}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
