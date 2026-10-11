import React, { useState } from 'react';
import {
  Eye,
  Sliders,
  CheckCircle,
  AlertTriangle,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { LogoSimilarityCase } from '../types/drp';

interface VisualLogoSimilarityViewProps {
  cases: LogoSimilarityCase[];
  onOpenTakedown: (logoCase: LogoSimilarityCase, type: string) => void;
}

export const VisualLogoSimilarityView: React.FC<VisualLogoSimilarityViewProps> = ({
  cases,
  onOpenTakedown
}) => {
  const [selectedCase, setSelectedCase] = useState<LogoSimilarityCase>(cases[0]);
  const [threshold, setThreshold] = useState<number>(85);

  return (
    <div className="space-y-6 pb-16">
      {/* Engine Banner */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>rghafadaryan/logo-similarity</span>
              <span aria-hidden="true">·</span>
              <span>PYTORCH + OPENCV + PHASH</span>
              <span aria-hidden="true">·</span>
              <span>PRIORITY 1 COMPUTER VISION ENGINE</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-white">Visual Brand Matching & Logo Similarity Lab</h1>
            <p className="mt-1 text-xs text-slate-300 max-w-3xl leading-relaxed">
              Detects copyright & trademark infringement across phishing sites, rogue mobile app icons, and social avatars. Computes Structural Similarity (SSIM), Perceptual Hash (pHash) Hamming distance, and deep visual feature vectors to catch recolored, rotated, or modified counterfeit crests.
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400">Visual Infringement Cases</div>
            <div className="text-xl font-bold font-mono text-white tabular-nums">{cases.length} Confirmed</div>
          </div>
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {cases.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => setSelectedCase(c)}
            className={`px-4 py-2 text-xs font-medium rounded-lg border transition-all text-left ${
              selectedCase.id === c.id
                ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 shadow-sm'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="font-semibold text-white">Case #{idx + 1}: {c.candidateType.replace('_', ' ')}</div>
            <div className="text-[11px] font-mono text-slate-400 truncate max-w-xs">{c.candidateSource}</div>
          </button>
        ))}
      </div>

      {/* Deep Side-by-Side Visual Comparison Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Visual Match Visualizer */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Layers className="h-4 w-4" />
              <span>PERCEPTUAL HASH & SSIM DUAL COMPARISON</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Resolution: 512x512 normalized</span>
          </div>

          {/* Visual Pair */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Authentic Brand Crest SVG */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-medium text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  Authentic Brand Mark
                </span>
                <span className="font-mono text-slate-400">Reference Ground Truth</span>
              </div>

              <div className="h-56 rounded-xl border border-emerald-900/40 bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden group">
                {/* Authentic ApexPay Brand Crest Vector */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-24 w-24 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <div className="h-14 w-14 rounded-xl border-2 border-white/80 flex items-center justify-center text-white font-black text-2xl tracking-tighter">
                      AP
                    </div>
                  </div>
                  <div className="mt-3 text-sm font-bold text-white tracking-wide">ApexPay</div>
                  <div className="text-[10px] font-mono text-cyan-400">OFFICIAL TRADEMARK #882190</div>
                </div>

                <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
              </div>

              <div className="text-xs font-mono text-slate-400 space-y-1 bg-slate-950 p-2.5 rounded border border-slate-800/80">
                <div className="flex justify-between">
                  <span>pHash:</span>
                  <span className="text-white">a3f9e201b4c80912</span>
                </div>
                <div className="flex justify-between">
                  <span>Color Anchor:</span>
                  <span className="text-white">#06B6D4 / #3B82F6</span>
                </div>
              </div>
            </div>

            {/* Counterfeit Rogue Crest SVG */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-medium text-rose-400">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  Discovered Rogue Clone
                </span>
                <span className="font-mono text-slate-400">Captured Asset</span>
              </div>

              <div className="h-56 rounded-xl border border-rose-900/40 bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Slightly modified or recolored clone Vector */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-24 w-24 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg rotate-1 scale-95 opacity-95">
                    <div className="h-14 w-14 rounded-xl border-2 border-white/70 flex items-center justify-center text-white font-black text-2xl tracking-tighter">
                      AP
                    </div>
                  </div>
                  <div className="mt-3 text-sm font-bold text-slate-200 tracking-wide">ApexPay</div>
                  <div className="text-[10px] font-mono text-rose-400">COUNTERFEIT EXTRACTION</div>
                </div>

                <div className="absolute inset-0 bg-rose-500/5 pointer-events-none" />
              </div>

              <div className="text-xs font-mono text-slate-400 space-y-1 bg-slate-950 p-2.5 rounded border border-slate-800/80">
                <div className="flex justify-between">
                  <span>Candidate pHash:</span>
                  <span className="text-rose-300">a3f9e201b4c80910</span>
                </div>
                <div className="flex justify-between">
                  <span>Hamming Distance:</span>
                  <span className="text-rose-400 font-bold">{selectedCase.phashHammingDistance} (EXTREME MATCH)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Sensitivity Slider */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Infringement Confidence Threshold:</span>
              <span className="font-mono text-cyan-400 font-bold">{threshold}% Confidence</span>
            </div>
            <input
              type="range"
              min="50"
              max="99"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>50% (Permissive / Derivative)</span>
              <span>85% (Industry Standard)</span>
              <span>99% (Exact Bitwise Clone)</span>
            </div>
          </div>
        </div>

        {/* Right Forensic Telemetry Card */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-base font-bold text-white">Forensic Similarity Scores</h2>
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/50">
              {selectedCase.verdict.replace('_', ' ')}
            </span>
          </div>

          <div className="space-y-4">
            {/* SSIM Metric */}
            <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Structural Similarity Index (SSIM)</span>
                <span className="font-mono font-bold text-white tabular-nums">
                  {(selectedCase.ssimScore * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{ width: `${selectedCase.ssimScore * 100}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Structural luminance and contrast congruence
              </div>
            </div>

            {/* Feature Match % */}
            <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">PyTorch ResNet-50 Feature Cosine</span>
                <span className="font-mono font-bold text-cyan-400 tabular-nums">
                  {selectedCase.featureMatchPercentage}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full"
                  style={{ width: `${selectedCase.featureMatchPercentage}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Neural embedding distance in 2048-dim latent space
              </div>
            </div>

            {/* Color Palette Deviation */}
            <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Color Palette CIELAB Delta-E:</span>
                <span className="font-mono font-bold text-amber-300">
                  {selectedCase.colorPaletteDeviation}% Deviation
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Subtle hue shift applied by adversary to bypass naive hash checks
              </div>
            </div>

            {/* Source Origin */}
            <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950 space-y-1 text-xs">
              <div className="text-slate-400">Captured Location:</div>
              <div className="text-white font-mono break-all font-semibold">
                {selectedCase.candidateSource}
              </div>
              <div className="text-slate-400 text-[10px] pt-1">
                Detected: {selectedCase.detectedAt}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onOpenTakedown(selectedCase, 'visual_infringement')}
              className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Generate Trademark Infringement Notice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
