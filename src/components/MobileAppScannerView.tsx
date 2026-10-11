import React, { useState } from 'react';
import {
  Smartphone,
  ShieldAlert,
  AlertTriangle,
  Download,
  FileCode,
  CheckCircle,
  Copy,
  Check,
  Search,
  ExternalLink,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { RogueMobileAppThreat } from '../types/drp';

interface MobileAppScannerViewProps {
  threats: RogueMobileAppThreat[];
  onOpenTakedown: (threat: RogueMobileAppThreat, type: string) => void;
}

export const MobileAppScannerView: React.FC<MobileAppScannerViewProps> = ({
  threats,
  onOpenTakedown
}) => {
  const [selectedThreat, setSelectedThreat] = useState<RogueMobileAppThreat | null>(threats[0] || null);
  const [copiedSha, setCopiedSha] = useState<string | null>(null);
  const [testPackageInput, setTestPackageInput] = useState('');
  const [testAnalysisResult, setTestAnalysisResult] = useState<{
    tested: boolean;
    packageName: string;
    riskScore: number;
    matchedPerms: string[];
    yaraRule: string;
  } | null>(null);

  const handleCopySha = (sha: string) => {
    navigator.clipboard.writeText(sha);
    setCopiedSha(sha);
    setTimeout(() => setCopiedSha(null), 2000);
  };

  const handleTestPackageScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPackageInput.trim()) return;

    // Simulate heuristic AST & YARA analysis
    const pkg = testPackageInput.trim().toLowerCase();
    const isBrandClone = pkg.includes('apex') || pkg.includes('pay') || pkg.includes('bank');
    const risk = isBrandClone ? Math.floor(Math.random() * 20 + 80) : Math.floor(Math.random() * 30 + 35);
    
    setTestAnalysisResult({
      tested: true,
      packageName: testPackageInput.trim(),
      riskScore: risk,
      matchedPerms: isBrandClone
        ? ['android.permission.BIND_ACCESSIBILITY_SERVICE', 'android.permission.SYSTEM_ALERT_WINDOW', 'android.permission.RECEIVE_SMS']
        : ['android.permission.INTERNET', 'android.permission.ACCESS_NETWORK_STATE'],
      yaraRule: isBrandClone ? 'Suspicious_Bank_Overlay_APK (v2.4)' : 'Standard_Generic_Manifest'
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>YARA-Rules/rules</span>
              <span aria-hidden="true">·</span>
              <span>OWASP ZAP STATIC AST</span>
              <span aria-hidden="true">·</span>
              <span>ROGUE APP STORE RADAR</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-white">Suspicious Mobile Apps & Rogue APK Scanner</h1>
            <p className="mt-1 text-xs text-slate-300 max-w-3xl leading-relaxed">
              Monitors third-party Android app markets (APKPure, Aptoide, APKMirror, and Telegram channels) to detect counterfeit branded apps, trojanized overlay droppers, SMS interceptors, and package name squatters.
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400">Rogue APKs Tracked</div>
            <div className="text-xl font-bold font-mono text-white tabular-nums">{threats.length} Active</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of Apps */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
            <span>DISCOVERED COUNTERFEIT APKS ({threats.length})</span>
            <span>REPOSITORY CRAWLER</span>
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
                      ? 'border-violet-500/60 bg-slate-900/90 shadow-md ring-1 ring-violet-500/20'
                      : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-mono font-semibold px-1.5 py-0.5 rounded bg-violet-950 text-violet-400 border border-violet-800/40">
                          {threat.sourceStore}
                        </span>
                        <span className="text-xs font-mono text-slate-400">v{threat.version}</span>
                      </div>
                      <div className="font-bold text-white text-sm">{threat.appName}</div>
                      <div className="text-xs font-mono text-slate-400 truncate max-w-xs">{threat.packageName}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-rose-400 tabular-nums">
                        {threat.suspicionScore}% Risk
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-1 capitalize">
                        {threat.status.replace('_', ' ')}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2 font-mono">
                      <span>Est. Downloads: {threat.downloadsEstimated.toLocaleString()}</span>
                    </div>
                    <span className="text-xs font-medium text-violet-400 flex items-center gap-1">
                      Inspect AST &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive APK / Package Name Heuristic Probe */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3 mt-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Cpu className="h-3.5 w-3.5" />
              <span>LIVE APK PACKAGE TRIAGE PROBE</span>
            </div>
            <p className="text-xs text-slate-400">
              Test an external Android package ID to trigger real-time YARA signature and permission risk scoring:
            </p>
            <form onSubmit={handleTestPackageScan} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. com.apexpay.quick.loan.apk"
                value={testPackageInput}
                onChange={(e) => setTestPackageInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-950 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Scan APK
              </button>
            </form>

            {testAnalysisResult && (
              <div className="mt-3 p-3 rounded-lg border border-slate-800 bg-slate-950 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Analyzed Package:</span>
                  <span className="text-white font-bold">{testAnalysisResult.packageName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Risk Assessment:</span>
                  <span className={testAnalysisResult.riskScore > 75 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {testAnalysisResult.riskScore}% SUSPICION SCORE
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">YARA Match:</span>
                  <span className="text-amber-300">{testAnalysisResult.yaraRule}</span>
                </div>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                  Suspicious permissions: {testAnalysisResult.matchedPerms.join(', ')}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7">
          {selectedThreat ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6 sticky top-24">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-violet-950/60 border border-violet-800/60 flex items-center justify-center text-violet-400">
                    <Smartphone className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-white">{selectedThreat.appName}</h2>
                      <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/50">
                        {selectedThreat.severity}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-400 mt-1">
                      Package: <span className="text-white">{selectedThreat.packageName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenTakedown(selectedThreat, 'mobile_app')}
                    className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <span>App Store Takedown Request</span>
                  </button>
                </div>
              </div>

              {/* Forensic Hash & Distribution Info */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400">CRYPTOGRAPHIC SIGNATURE & ORIGIN</div>
                <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">SHA256 Fingerprint:</span>
                    <button
                      onClick={() => handleCopySha(selectedThreat.sha256)}
                      className="text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      {copiedSha === selectedThreat.sha256 ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      <span>Copy Hash</span>
                    </button>
                  </div>
                  <div className="text-slate-200 break-all select-all text-[11px] bg-slate-900 p-2 rounded border border-slate-800">
                    {selectedThreat.sha256}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 text-[11px]">
                    <div>
                      <span className="text-slate-400">Source Store: </span>
                      <span className="text-white font-semibold">{selectedThreat.sourceStore}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Estimated Victims: </span>
                      <span className="text-rose-400 font-semibold">{selectedThreat.downloadsEstimated.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* YARA Signature Match */}
              <div className="rounded-xl border border-rose-900/40 bg-rose-950/10 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-400 font-mono">
                    <AlertTriangle className="h-4 w-4" />
                    <span>YARA RULE MATCHED: {selectedThreat.yaraRuleMatched}</span>
                  </div>
                  <span className="text-[10px] font-mono text-rose-300 uppercase">Static Binary AST</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Identified malicious banking overlay routines. The APK uses <code className="text-rose-300 font-mono">SYSTEM_ALERT_WINDOW</code> to render transparent phishing forms over authentic mobile banking login activities.
                </p>
              </div>

              {/* High Risk Android Permissions Analysis */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400">PERMISSIONS AUDIT (ANDROID MANIFEST)</div>
                <div className="space-y-2">
                  {selectedThreat.permissionsRisk.map((perm, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg border border-slate-800 bg-slate-950 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-mono text-rose-300 font-medium">{perm}</div>
                        <div className="text-[11px] text-slate-400">
                          {perm.includes('ACCESSIBILITY')
                            ? 'Grants screen reading and automated click hijacking (Banking Trojan vector)'
                            : perm.includes('SYSTEM_ALERT')
                            ? 'Allows drawing overlay windows above active authentic applications'
                            : perm.includes('RECEIVE_SMS')
                            ? 'Enables interception of SMS one-time password (OTP) verification codes'
                            : 'Access to device telemetry and telephony identifier'}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase font-bold text-rose-400 shrink-0">
                        CRITICAL RISK
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Indicator Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Developer Keystore</div>
                  <div className="text-rose-400 font-bold mt-1">SIGNATURE MISMATCH</div>
                </div>

                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">App Icon Similarity</div>
                  <div className="text-rose-400 font-bold mt-1">COUNTERFEIT LOGO (94%)</div>
                </div>

                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">SMS Interceptor</div>
                  <div className="text-rose-400 font-bold mt-1">ACTIVE LISTENER</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-500">
              Select an APK package from the left to view decompiled AST telemetry and YARA rule matches.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
