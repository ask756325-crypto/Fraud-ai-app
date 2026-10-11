import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle,
  AlertTriangle,
  Layers,
  ArrowRight,
  Shield,
  Smartphone,
  Globe,
  Eye,
  RefreshCw
} from 'lucide-react';
import { SocialAccountThreat, RogueMobileAppThreat, PhishingDomainThreat } from '../types/drp';

interface LiveScanWizardProps {
  onClose: () => void;
  onAddDiscoveredThreats: (newSocial: SocialAccountThreat[], newApp: RogueMobileAppThreat[], newDomain: PhishingDomainThreat[]) => void;
}

export const LiveScanWizard: React.FC<LiveScanWizardProps> = ({
  onClose,
  onAddDiscoveredThreats
}) => {
  const [brandName, setBrandName] = useState('ApexPay Global');
  const [officialDomain, setOfficialDomain] = useState('apexpay.com');
  const [executiveName, setExecutiveName] = useState('Elena Vance (CEO)');
  
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  const steps = [
    { title: 'OpenBPL Domain Permutations', desc: 'Generating typosquatting, homoglyph punycode, and combo-squatting variants' },
    { title: 'CISPA Social Profile Recon', desc: 'Crawling Twitter/X, Telegram, LinkedIn for fake accounts & VIP impersonators' },
    { title: 'YARA Mobile APK Repositories', desc: 'Inspecting APKPure & third-party markets for banking overlay droppers' },
    { title: 'Logo Similarity Feature Matching', desc: 'Computing SSIM and pHash Hamming distance on harvested favicons & icons' },
    { title: 'MISP Threat Correlation & STIX Bundling', desc: 'Mapping threat relationships and generating forensic takedown notices' }
  ];

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) return;

    setScanning(true);
    setScanStep(0);
    setScanComplete(false);

    // Sequence through stages
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setScanStep(current);

      if (current >= steps.length) {
        clearInterval(interval);
        setScanning(false);
        setScanComplete(true);
      }
    }, 700);
  };

  const handleApplyDiscoveredThreats = () => {
    const timestamp = 'Just now (Live Scan)';
    
    const newSocial: SocialAccountThreat = {
      id: `live-soc-${Date.now()}`,
      brandTarget: brandName,
      executiveTarget: executiveName,
      platform: 'twitter',
      handle: `@${brandName.toLowerCase().replace(/\s+/g, '_')}_vip_allocations`,
      profileName: `${executiveName} [Direct Grants]`,
      followerCount: 1820,
      followingCount: 12,
      accountAgeDays: 1,
      impersonationScore: 99,
      detectionEngine: 'CISPA-Brand-Impersonator',
      indicators: {
        avatarCloned: true,
        homoglyphHandle: true,
        bioKeywordsMatched: ['Executive Allocations', 'Private Grants', 'Direct Support'],
        dmSolicitationDetected: true,
        cryptoWalletAdvertised: true
      },
      samplePost: `Official grant announcement for ${brandName} institutional partners. DM this account for fast tier verification.`,
      detectedAt: timestamp,
      status: 'active',
      severity: 'critical',
      profileUrl: `https://twitter.com/${brandName.toLowerCase()}_vip_allocations`
    };

    const newApp: RogueMobileAppThreat = {
      id: `live-apk-${Date.now()}`,
      appName: `${brandName} Instant Mobile Access`,
      brandTarget: brandName,
      packageName: `com.${brandName.toLowerCase().replace(/\s+/g, '')}.security.fastpay`,
      platform: 'android',
      sourceStore: 'APKPure',
      version: '1.0.4',
      sha256: '77291a8291039849201948291039482910394829103948291039482910394829',
      downloadsEstimated: 5400,
      suspicionScore: 96,
      detectionEngine: 'YARA-Signature-Engine',
      permissionsRisk: [
        'android.permission.BIND_ACCESSIBILITY_SERVICE',
        'android.permission.SYSTEM_ALERT_WINDOW',
        'android.permission.RECEIVE_SMS'
      ],
      yaraRuleMatched: 'Suspicious_Bank_Overlay_APK (v2.4)',
      indicators: {
        signatureMismatch: true,
        accessibilityOverlayAbuse: true,
        smsInterceptor: true,
        contactsHarvesting: true,
        counterfeitIcon: true
      },
      detectedAt: timestamp,
      status: 'active',
      severity: 'critical',
      downloadUrl: 'https://apkpure.example/rogue-download'
    };

    const newDomain: PhishingDomainThreat = {
      id: `live-dom-${Date.now()}`,
      domainName: `login-${brandName.toLowerCase().replace(/\s+/g, '')}-secure-auth.com`,
      brandTarget: brandName,
      technique: 'combosquatting',
      detectionEngine: 'OpenBPL',
      registrar: 'NameCheap, Inc.',
      hostingProvider: 'Bulletproof Offshore Server',
      ipAddress: '194.87.142.99',
      nameservers: ['ns1.anonymous-dns.is', 'ns2.anonymous-dns.is'],
      dnsMxRecord: true,
      sslIssuer: "Let's Encrypt Authority",
      heuristicScore: 97,
      targetedUrl: `https://login-${brandName.toLowerCase().replace(/\s+/g, '')}-secure-auth.com/portal`,
      detectedAt: timestamp,
      status: 'active',
      severity: 'critical'
    };

    onAddDiscoveredThreats([newSocial], [newApp], [newDomain]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>ACTIVE RECONNAISSANCE ENGINE</span>
              <span aria-hidden="true">·</span>
              <span>10 OPEN SOURCE INTEGRATIONS</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">
              Targeted Brand Perimeter Scan
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Inputs */}
        {!scanning && !scanComplete && (
          <form onSubmit={handleStartScan} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Target Brand Name:
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. ApexPay Global, Stripe, Coinbase"
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-700 bg-slate-950 text-slate-100 focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Official Root Domain:
                </label>
                <input
                  type="text"
                  value={officialDomain}
                  onChange={(e) => setOfficialDomain(e.target.value)}
                  placeholder="e.g. apexpay.com"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-700 bg-slate-950 text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Key Executive to Protect:
                </label>
                <input
                  type="text"
                  value={executiveName}
                  onChange={(e) => setExecutiveName(e.target.value)}
                  placeholder="e.g. Elena Vance (CEO)"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-700 bg-slate-950 text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">Automated Pipeline Coverage:</div>
              <div>
                Will crawl X/Twitter, Telegram, Instagram, and LinkedIn using CISPA weights; permutate lookalikes via OpenBPL & Findomain; decompile third-party APKs with YARA; and verify logo clones via ResNet-50.
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Execute Complete Digital Risk Scan</span>
              </button>
            </div>
          </form>
        )}

        {/* Progress Display */}
        {scanning && (
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-cyan-400 flex items-center gap-2">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>SCANNING PERIMETER FOR "{brandName.toUpperCase()}"...</span>
              </span>
              <span className="text-slate-400">Step {Math.min(scanStep + 1, steps.length)} of {steps.length}</span>
            </div>

            <div className="space-y-3">
              {steps.map((st, i) => {
                const isDone = i < scanStep;
                const isCurrent = i === scanStep;
                return (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border transition-all text-xs ${
                      isDone
                        ? 'border-emerald-900/60 bg-emerald-950/20 text-emerald-300'
                        : isCurrent
                        ? 'border-cyan-500 bg-cyan-950/30 text-white shadow-sm'
                        : 'border-slate-800 bg-slate-950 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{st.title}</span>
                      <span className="font-mono text-[11px]">
                        {isDone ? 'COMPLETE' : isCurrent ? 'RUNNING...' : 'PENDING'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{st.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Scan Completed Summary */}
        {scanComplete && (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl border border-rose-900/40 bg-rose-950/20 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-rose-400">
                <AlertTriangle className="h-4 w-4" />
                <span>Scan Completed: 3 High-Severity External Threats Uncovered</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Reconnaissance against <strong className="text-white">{brandName}</strong> detected 1 active VIP executive impersonation account on X, 1 rogue trojanized APK on APKPure, and 1 active combosquatted phishing domain with MX records enabled.
              </p>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Social Impersonator:</span>
                <span className="text-rose-400 font-bold">@{brandName.toLowerCase().replace(/\s+/g, '_')}_vip_allocations (99% Risk)</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Rogue Android App:</span>
                <span className="text-rose-400 font-bold">com.{brandName.toLowerCase().replace(/\s+/g, '')}.security.fastpay (YARA Overlays)</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Combosquatted Domain:</span>
                <span className="text-rose-400 font-bold">login-{brandName.toLowerCase().replace(/\s+/g, '')}-secure-auth.com</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleApplyDiscoveredThreats}
                className="flex-1 py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Add 3 Incidents to Active Queue & Open Triage</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
