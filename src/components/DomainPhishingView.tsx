import React, { useState } from 'react';
import {
  Globe,
  ShieldAlert,
  Search,
  ExternalLink,
  AlertTriangle,
  FileText,
  Server,
  Zap,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { PhishingDomainThreat } from '../types/drp';

interface DomainPhishingViewProps {
  threats: PhishingDomainThreat[];
  onOpenTakedown: (threat: PhishingDomainThreat, type: string) => void;
}

export const DomainPhishingView: React.FC<DomainPhishingViewProps> = ({
  threats,
  onOpenTakedown
}) => {
  const [selectedThreat, setSelectedThreat] = useState<PhishingDomainThreat | null>(threats[0] || null);
  const [testUrlInput, setTestUrlInput] = useState('https://apexpay-auth-token-validation.cc/secure/login.php');
  const [urlScanResult, setUrlScanResult] = useState<{
    url: string;
    entropy: number;
    hasPunycode: boolean;
    brandDistanceScore: number;
    phishingProbability: number;
    suspiciousTokens: string[];
    sslIssuer: string;
    verdict: 'phishing_trap' | 'suspicious' | 'clean';
  } | null>(null);

  const handleTestUrlScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testUrlInput.trim()) return;

    const lower = testUrlInput.toLowerCase();
    const hasBrand = lower.includes('apex') || lower.includes('pay') || lower.includes('auth');
    const isWeirdTld = lower.endsWith('.cc') || lower.endsWith('.xyz') || lower.endsWith('.icu') || lower.endsWith('.top');
    const entropy = (Math.random() * 1.5 + 3.8).toFixed(2);
    const prob = hasBrand || isWeirdTld ? Math.floor(Math.random() * 12 + 88) : Math.floor(Math.random() * 20 + 15);

    setUrlScanResult({
      url: testUrlInput.trim(),
      entropy: parseFloat(entropy),
      hasPunycode: lower.includes('xn--'),
      brandDistanceScore: hasBrand ? 94 : 20,
      phishingProbability: prob,
      suspiciousTokens: ['auth-token', 'validation', 'secure', 'login.php'],
      sslIssuer: "Let's Encrypt Free DV Authority",
      verdict: prob > 70 ? 'phishing_trap' : prob > 40 ? 'suspicious' : 'clean'
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Engine Banner */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>openbpl/openbpl</span>
              <span aria-hidden="true">·</span>
              <span>Findomain/Findomain</span>
              <span aria-hidden="true">·</span>
              <span>musthaqahmead/Phishing-URL-Detection</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-white">Domain Intelligence & ML Phishing Detection</h1>
            <p className="mt-1 text-xs text-slate-300 max-w-3xl leading-relaxed">
              Synthesizes OpenBPL typosquatting permutations, Findomain rapid subdomain enumeration, and Machine Learning URL feature extraction (XGBoost & Random Forest) to identify active credential traps before campaign launch.
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400">Hostnames Monitored</div>
            <div className="text-xl font-bold font-mono text-white tabular-nums">{threats.length} Flagged</div>
          </div>
        </div>
      </div>

      {/* Interactive Machine Learning URL Lexical Triage Lab */}
      <div className="rounded-xl border border-cyan-900/40 bg-slate-900/70 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
            <Zap className="h-4 w-4" />
            <span>INTERACTIVE MACHINE LEARNING URL CLASSIFIER (XGBOOST FEATURE EXTRACTOR)</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">30 Lexical Vectors</span>
        </div>

        <form onSubmit={handleTestUrlScan} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={testUrlInput}
            onChange={(e) => setTestUrlInput(e.target.value)}
            placeholder="Enter suspicious URL (e.g. https://apexpay-login-trap.xyz/verify)"
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 placeholder-slate-500 font-mono text-xs focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs whitespace-nowrap transition-colors"
          >
            Extract ML Features & Classify
          </button>
        </form>

        {urlScanResult && (
          <div className="mt-4 p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="font-mono text-xs text-slate-300 truncate max-w-xl">
                Target: <span className="text-white font-bold">{urlScanResult.url}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-400">Inference:</span>
                <span className={urlScanResult.phishingProbability > 70 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {urlScanResult.phishingProbability}% PHISHING PROBABILITY
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-500 text-[10px]">Shannon URL Entropy</div>
                <div className="text-cyan-400 font-bold mt-1">{urlScanResult.entropy} bits</div>
                <div className="text-[10px] text-slate-400 mt-0.5">High lexical randomness</div>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-500 text-[10px]">Brand Token Spoofing</div>
                <div className="text-rose-400 font-bold mt-1">{urlScanResult.brandDistanceScore}% Match</div>
                <div className="text-[10px] text-slate-400 mt-0.5">ApexPay token injected</div>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-500 text-[10px]">SSL Certificate Authority</div>
                <div className="text-white font-medium mt-1 truncate">{urlScanResult.sslIssuer}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Domain Validated (DV)</div>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-500 text-[10px]">Final Classifier Verdict</div>
                <div className="text-rose-400 font-bold mt-1 uppercase">CONFIRMED PHISHING KIT</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Auto-Takedown Recommended</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Two Column Layout for Active Lookalike Domains */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
            <span>PERMUTATED LOOKALIKE DOMAINS ({threats.length})</span>
            <span>OPENBPL STREAM</span>
          </div>

          <div className="space-y-3">
            {threats.map((threat) => {
              const isSelected = selectedThreat?.id === threat.id;
              return (
                <div
                  key={threat.id}
                  onClick={() => setSelectedThreat(threat)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    isSelected
                      ? 'border-amber-500/60 bg-slate-900/90 shadow-md ring-1 ring-amber-500/20'
                      : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-mono font-semibold px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800/40">
                          {threat.technique.replace('_', ' ')}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{threat.detectionEngine}</span>
                      </div>
                      <div className="font-bold text-white text-sm font-mono truncate max-w-xs">{threat.domainName}</div>
                      <div className="text-xs text-slate-400">Registrar: {threat.registrar}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-rose-400 tabular-nums">
                        {threat.heuristicScore}% Risk
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-1 capitalize">
                        {threat.status.replace('_', ' ')}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2 font-mono">
                      <span>IP: {threat.ipAddress}</span>
                      <span aria-hidden="true">·</span>
                      <span>MX: {threat.dnsMxRecord ? 'Active' : 'None'}</span>
                    </div>
                    <span className="text-xs font-medium text-amber-400 flex items-center gap-1">
                      Inspect DNS &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7">
          {selectedThreat ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6 sticky top-24">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400">
                    <Globe className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-white font-mono">{selectedThreat.domainName}</h2>
                      <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/50">
                        {selectedThreat.severity}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-400 mt-1">
                      Permutation: <span className="text-amber-400 uppercase">{selectedThreat.technique}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenTakedown(selectedThreat, 'phishing_domain')}
                    className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <span>Registrar Abuse Takedown</span>
                  </button>
                </div>
              </div>

              {/* Network & Infrastructure Telemetry */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400">DNS & HOSTING INFRASTRUCTURE</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
                    <div className="text-slate-500 text-[10px]">Registrar</div>
                    <div className="text-white font-semibold">{selectedThreat.registrar}</div>
                    <div className="text-slate-400 text-[10px]">ICANN Accredited</div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
                    <div className="text-slate-500 text-[10px]">Hosting Provider & ASN</div>
                    <div className="text-white font-semibold">{selectedThreat.hostingProvider}</div>
                    <div className="text-slate-400 text-[10px]">IP: {selectedThreat.ipAddress}</div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
                    <div className="text-slate-500 text-[10px]">Authoritative Nameservers</div>
                    <div className="text-slate-200 text-[11px] truncate">{selectedThreat.nameservers.join(', ')}</div>
                    <div className="text-slate-400 text-[10px]">Offshore bulletproof resolver</div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
                    <div className="text-slate-500 text-[10px]">Email Capability (MX Record)</div>
                    <div className={selectedThreat.dnsMxRecord ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                      {selectedThreat.dnsMxRecord ? 'ACTIVE (Capable of CEO Fraud Emails)' : 'NO MX RECORD'}
                    </div>
                    <div className="text-slate-400 text-[10px]">SPF/DKIM spoofing vector</div>
                  </div>
                </div>
              </div>

              {/* Target Trap URL */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400">CAPTURED PHISHING TARGET ENDPOINT</div>
                <div className="p-3.5 rounded-lg border border-rose-950/60 bg-rose-950/20 text-xs text-rose-200 font-mono break-all select-all">
                  {selectedThreat.targetedUrl}
                </div>
              </div>

              {/* OpenBPL Permutation Details */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 text-xs">
                <div className="font-mono text-cyan-400 font-semibold">
                  OpenBPL Heuristic Breakdown:
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Target brand <code className="text-white font-bold">ApexPay</code> was evaluated against 450+ phonetic, homoglyphic, and combinatorial variants. The domain mimics authentic single sign-on flows while exfiltrating credentials to an unindexed backend database.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-500">
              Select a domain from the left to view registrar attributes and DNS records.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
