import React, { useState } from 'react';
import {
  ShieldAlert,
  Smartphone,
  Globe,
  Eye,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  FileText
} from 'lucide-react';
import {
  SocialAccountThreat,
  RogueMobileAppThreat,
  PhishingDomainThreat,
  LogoSimilarityCase,
  SeverityLevel
} from '../types/drp';

interface OverviewDashboardProps {
  socialThreats: SocialAccountThreat[];
  mobileThreats: RogueMobileAppThreat[];
  domainThreats: PhishingDomainThreat[];
  logoCases: LogoSimilarityCase[];
  onNavigateTab: (tab: string) => void;
  onOpenTakedown: (threat: any, type: string) => void;
  onOpenScanModal: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  socialThreats,
  mobileThreats,
  domainThreats,
  logoCases,
  onNavigateTab,
  onOpenTakedown,
  onOpenScanModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | SeverityLevel>('all');

  // Aggregate stats
  const totalIncidents = socialThreats.length + mobileThreats.length + domainThreats.length;
  const criticalCount = [
    ...socialThreats,
    ...mobileThreats,
    ...domainThreats
  ].filter((t) => t.severity === 'critical').length;

  const takedownsPending = [
    ...socialThreats,
    ...mobileThreats,
    ...domainThreats
  ].filter((t) => t.status === 'takedown_requested').length;

  const resolvedCount = [
    ...socialThreats,
    ...mobileThreats,
    ...domainThreats
  ].filter((t) => t.status === 'resolved').length;

  // Unified threat stream for recent alerts
  const combinedThreats = [
    ...socialThreats.map((t) => ({ ...t, vectorType: 'social_profile' as const })),
    ...mobileThreats.map((t) => ({ ...t, vectorType: 'mobile_app' as const })),
    ...domainThreats.map((t) => ({ ...t, vectorType: 'phishing_domain' as const }))
  ]
    .filter((t) => {
      if (severityFilter !== 'all' && t.severity !== severityFilter) return false;
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      const identifier =
        'handle' in t
          ? t.handle
          : 'appName' in t
          ? t.appName
          : 'domainName' in t
          ? t.domainName
          : '';
      return (
        identifier.toLowerCase().includes(term) ||
        t.brandTarget.toLowerCase().includes(term) ||
        t.detectionEngine.toLowerCase().includes(term)
      );
    })
    .slice(0, 7);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner / Executive Summary */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>PROTECTED ASSET</span>
              <span aria-hidden="true">·</span>
              <span>APEXPAY GLOBAL CORP</span>
              <span aria-hidden="true">·</span>
              <span>PERIMETER STATUS: ELEVATED THREAT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
              Digital Risk Protection & External Threat Monitoring
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Continuous reconnaissance across social media platforms, rogue app repositories, lookalike domain namespaces, and visual logo clone campaigns powered by the CISPA, OpenBPL, and YARA open architectures.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenScanModal}
              className="px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm"
            >
              <span>Trigger Targeted Perimeter Scan</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('repos')}
              className="px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors whitespace-nowrap"
            >
              Architecture & Repos Guide
            </button>
          </div>
        </div>

        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />
      </div>

      {/* Metrics Row (Strictly Tabular figures, no pill containers) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="text-xs font-medium text-slate-400">Active Infringements</div>
          <div className="mt-2 text-3xl font-bold text-white font-mono tabular-nums">
            {totalIncidents}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span>Social</span>
            <span aria-hidden="true">·</span>
            <span>App Stores</span>
            <span aria-hidden="true">·</span>
            <span>DNS</span>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-rose-900/40 bg-slate-900/40">
          <div className="text-xs font-medium text-rose-400 flex items-center justify-between">
            <span>Critical Severity</span>
            <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
          </div>
          <div className="mt-2 text-3xl font-bold text-rose-400 font-mono tabular-nums">
            {criticalCount}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            Active credential traps & trojans
          </div>
        </div>

        <div className="p-5 rounded-xl border border-amber-900/40 bg-slate-900/40">
          <div className="text-xs font-medium text-amber-400 flex items-center justify-between">
            <span>Takedowns Filed</span>
            <FileText className="h-3.5 w-3.5 text-amber-400" />
          </div>
          <div className="mt-2 text-3xl font-bold text-amber-300 font-mono tabular-nums">
            {takedownsPending}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            Registrar & store review pending
          </div>
        </div>

        <div className="p-5 rounded-xl border border-emerald-900/40 bg-slate-900/40">
          <div className="text-xs font-medium text-emerald-400 flex items-center justify-between">
            <span>Enforcement Resolved</span>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div className="mt-2 text-3xl font-bold text-emerald-400 font-mono tabular-nums">
            {resolvedCount}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            Neutralized in last 30 days
          </div>
        </div>
      </div>

      {/* 4 Threat Vectors Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Social Impersonation Card */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-sky-950/60 border border-sky-800/40 text-sky-400">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs text-slate-400 tabular-nums">
                {socialThreats.length} Detected
              </span>
            </div>
            <h2 className="mt-4 text-base font-semibold text-white">Social & VIP Impersonation</h2>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Scrapes Twitter/X, Instagram, LinkedIn, and Telegram for fake executive accounts, spoofed support channels, and crypto scams.
            </p>
            <div className="mt-3 text-xs text-slate-400 font-mono">
              Engine: CISPA Brand Impersonator
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('social')}
            className="mt-5 w-full py-2 px-3 text-xs font-medium text-sky-400 hover:text-white bg-sky-950/30 hover:bg-sky-900/40 rounded-lg border border-sky-800/30 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Inspect Social Radar</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Rogue Mobile Apps Card */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-violet-950/60 border border-violet-800/40 text-violet-400">
                <Smartphone className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs text-slate-400 tabular-nums">
                {mobileThreats.length} Detected
              </span>
            </div>
            <h2 className="mt-4 text-base font-semibold text-white">Rogue Mobile App Clones</h2>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Crawls APKPure, Aptoide, and third-party stores. Dissects Android manifests for accessibility overlay malware and SMS interception.
            </p>
            <div className="mt-3 text-xs text-slate-400 font-mono">
              Engine: YARA Rules + APK AST
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('mobile')}
            className="mt-5 w-full py-2 px-3 text-xs font-medium text-violet-400 hover:text-white bg-violet-950/30 hover:bg-violet-900/40 rounded-lg border border-violet-800/30 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Review Rogue APKs</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Lookalike Domains Card */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-800/40 text-amber-400">
                <Globe className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs text-slate-400 tabular-nums">
                {domainThreats.length} Active
              </span>
            </div>
            <h2 className="mt-4 text-base font-semibold text-white">Phishing & Typosquatting</h2>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Permutates brand namespace for homoglyph Cyrillic punycode, combosquatting, and active MX mail servers configured for spoofing.
            </p>
            <div className="mt-3 text-xs text-slate-400 font-mono">
              Engine: OpenBPL + Findomain + ML
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('domains')}
            className="mt-5 w-full py-2 px-3 text-xs font-medium text-amber-400 hover:text-white bg-amber-950/30 hover:bg-amber-900/40 rounded-lg border border-amber-800/30 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Explore Lookalikes</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Logo Similarity Card */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
                <Eye className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs text-slate-400 tabular-nums">
                {logoCases.length} Clones
              </span>
            </div>
            <h2 className="mt-4 text-base font-semibold text-white">Visual Trademark Clones</h2>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Perceptual hash (pHash) and SSIM computer vision to catch counterfeit logos, color-shifted app icons, and copied corporate seals.
            </p>
            <div className="mt-3 text-xs text-slate-400 font-mono">
              Engine: Logo Similarity (PyTorch)
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('logo')}
            className="mt-5 w-full py-2 px-3 text-xs font-medium text-cyan-400 hover:text-white bg-cyan-950/30 hover:bg-cyan-900/40 rounded-lg border border-cyan-800/30 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Open Visual Lab</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Live Threat Triage Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-base font-semibold text-white">Live External Threat Feed</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>Streaming events correlated from 10 open security engines</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{combinedThreats.length} matching</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Filter handle, domain, or app..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 sm:w-64 pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-950 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Severity filter tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
              {(['all', 'critical', 'high', 'medium'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSeverityFilter(lvl)}
                  className={`px-2.5 py-1 text-xs font-medium rounded capitalize transition-colors ${
                    severityFilter === lvl
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* High Density Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 text-slate-400 font-mono">
                <th className="py-3 px-3 font-medium">Vector</th>
                <th className="py-3 px-3 font-medium">Threat Target & Identifier</th>
                <th className="py-3 px-3 font-medium">Detection Engine</th>
                <th className="py-3 px-3 font-medium">Severity</th>
                <th className="py-3 px-3 font-medium">Status</th>
                <th className="py-3 px-3 font-medium">Detected</th>
                <th className="py-3 px-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-slate-300">
              {combinedThreats.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No active threats match the current search filters.
                  </td>
                </tr>
              ) : (
                combinedThreats.map((item) => {
                  let title = 'Unknown';
                  let subInfo = '';

                  if (item.vectorType === 'social_profile') {
                    title = item.handle;
                    subInfo = `Platform: ${item.platform.toUpperCase()}`;
                  } else if (item.vectorType === 'mobile_app') {
                    title = item.appName;
                    subInfo = item.packageName;
                  } else if (item.vectorType === 'phishing_domain') {
                    title = item.domainName;
                    subInfo = `Technique: ${item.technique}`;
                  }

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-3 px-3 font-mono text-slate-400">
                        {item.vectorType === 'social_profile' && (
                          <span className="text-sky-400">Social Impersonator</span>
                        )}
                        {item.vectorType === 'mobile_app' && (
                          <span className="text-violet-400">Rogue Mobile APK</span>
                        )}
                        {item.vectorType === 'phishing_domain' && (
                          <span className="text-amber-400">Phishing Domain</span>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-semibold text-white truncate max-w-xs">{title}</div>
                        <div className="text-[11px] text-slate-400 font-mono truncate max-w-xs">{subInfo}</div>
                      </td>

                      <td className="py-3 px-3 font-mono text-slate-400">
                        {item.detectionEngine}
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className={`font-mono uppercase font-semibold ${
                            item.severity === 'critical'
                              ? 'text-rose-400'
                              : item.severity === 'high'
                              ? 'text-amber-400'
                              : 'text-sky-400'
                          }`}
                        >
                          {item.severity}
                        </span>
                      </td>

                      <td className="py-3 px-3 capitalize text-slate-300 font-mono">
                        {item.status.replace('_', ' ')}
                      </td>

                      <td className="py-3 px-3 text-slate-400 tabular-nums">
                        {item.detectedAt}
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onOpenTakedown(item, item.vectorType)}
                            className="px-2.5 py-1 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors whitespace-nowrap"
                          >
                            Takedown Notice
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hackathon Engine Architecture Reference Callout */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="text-xs font-mono text-cyan-400">DEVELOPER BLUEPRINT & LICENSING</div>
          <h3 className="text-base font-semibold text-white">
            10 Repositories Architecture Reference & Priority Matrix
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Engineered around CISPA Brand Impersonation, Phishing URL ML, Logo Similarity, and FastAPI. Includes MISP/OpenCTI knowledge graph schemas, YARA APK rules, and license compliance verification.
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('repos')}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors whitespace-nowrap shrink-0"
        >
          View Full Repo Breakdown
        </button>
      </div>
    </div>
  );
};
