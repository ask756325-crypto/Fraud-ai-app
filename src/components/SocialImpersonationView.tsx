import React, { useState } from 'react';
import {
  ShieldAlert,
  UserX,
  AlertTriangle,
  ExternalLink,
  CheckCircle,
  FileText,
  Search,
  Filter,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { SocialAccountThreat } from '../types/drp';

interface SocialImpersonationViewProps {
  threats: SocialAccountThreat[];
  onOpenTakedown: (threat: SocialAccountThreat, type: string) => void;
}

export const SocialImpersonationView: React.FC<SocialImpersonationViewProps> = ({
  threats,
  onOpenTakedown
}) => {
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [selectedThreat, setSelectedThreat] = useState<SocialAccountThreat | null>(threats[0] || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredThreats = threats.filter((t) => {
    if (platformFilter !== 'all' && t.platform !== platformFilter) return false;
    return true;
  });

  const handleCopyHandle = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header & Engine Intro */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>CISPA-SysSec/brand_impersonation</span>
              <span aria-hidden="true">·</span>
              <span>MIT LICENSE</span>
              <span aria-hidden="true">·</span>
              <span>PRIORITY 1 CORE ENGINE</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-white">Social & VIP Impersonation Radar</h1>
            <p className="mt-1 text-xs text-slate-300 max-w-3xl leading-relaxed">
              Detects unauthorized brand profiles, fake executive accounts, and scam helpdesk channels across X (Twitter), Telegram, Instagram, LinkedIn, and TikTok using multimodal feature classification (bio NLP, handle edit distance, and avatar perceptual matching).
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-xs text-slate-400">Threat Accounts Monitored</div>
              <div className="text-xl font-bold font-mono text-white tabular-nums">{threats.length} Active</div>
            </div>
          </div>
        </div>

        {/* Platform filter controls */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 mr-2">Filter Network:</span>
          {['all', 'twitter', 'telegram', 'instagram', 'linkedin', 'tiktok'].map((plat) => (
            <button
              key={plat}
              onClick={() => setPlatformFilter(plat)}
              className={`px-3 py-1 text-xs font-medium rounded-lg uppercase tracking-wider transition-colors ${
                platformFilter === plat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Impersonation Account List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
            <span>DETECTED IMPERSONATOR PROFILES ({filteredThreats.length})</span>
            <span>SORT: CONFIDENCE</span>
          </div>

          <div className="space-y-3">
            {filteredThreats.map((threat) => {
              const isSelected = selectedThreat?.id === threat.id;
              return (
                <div
                  key={threat.id}
                  onClick={() => setSelectedThreat(threat)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    isSelected
                      ? 'border-cyan-500/60 bg-slate-900/90 shadow-md ring-1 ring-cyan-500/20'
                      : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {threat.platform}
                        </span>
                        {threat.executiveTarget && (
                          <span className="text-xs font-medium text-amber-300">
                            VIP: {threat.executiveTarget}
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-white text-sm">{threat.profileName}</div>
                      <div className="text-xs font-mono text-cyan-400">{threat.handle}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-rose-400 tabular-nums">
                        {threat.impersonationScore}% Risk
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-1 capitalize">
                        {threat.status.replace('_', ' ')}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span>Age: {threat.accountAgeDays}d</span>
                      <span aria-hidden="true">·</span>
                      <span>Followers: {threat.followerCount.toLocaleString()}</span>
                    </div>
                    <span className="text-xs font-medium text-cyan-400 flex items-center gap-1">
                      Inspect &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Forensic Investigation Terminal */}
        <div className="lg:col-span-7">
          {selectedThreat ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6 sticky top-24">
              {/* Profile Forensic Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-rose-400 font-bold text-lg font-mono">
                    <UserX className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-white">{selectedThreat.profileName}</h2>
                      <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/50">
                        {selectedThreat.severity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                      <span className="text-cyan-400">{selectedThreat.handle}</span>
                      <button
                        onClick={() => handleCopyHandle(selectedThreat.handle, selectedThreat.id)}
                        className="text-slate-400 hover:text-white"
                        title="Copy handle"
                      >
                        {copiedId === selectedThreat.id ? (
                          <Check className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                      <span aria-hidden="true">·</span>
                      <span>Detected {selectedThreat.detectedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenTakedown(selectedThreat, 'social_profile')}
                    className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Issue Takedown Notice</span>
                  </button>
                </div>
              </div>

              {/* Forensic Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60">
                  <div className="text-[11px] text-slate-400">Impersonation Score</div>
                  <div className="mt-1 text-xl font-bold font-mono text-rose-400 tabular-nums">
                    {selectedThreat.impersonationScore}/100
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">CISPA Multimodal</div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60">
                  <div className="text-[11px] text-slate-400">Account Age</div>
                  <div className="mt-1 text-xl font-bold font-mono text-white tabular-nums">
                    {selectedThreat.accountAgeDays} Days
                  </div>
                  <div className="text-[10px] text-amber-400 font-mono mt-0.5">High Anomaly (New)</div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60">
                  <div className="text-[11px] text-slate-400">Follower Metric</div>
                  <div className="mt-1 text-xl font-bold font-mono text-white tabular-nums">
                    {selectedThreat.followerCount.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">Following: {selectedThreat.followingCount}</div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60">
                  <div className="text-[11px] text-slate-400">Platform</div>
                  <div className="mt-1 text-xl font-bold font-mono text-cyan-400 uppercase">
                    {selectedThreat.platform}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">Direct API Scrape</div>
                </div>
              </div>

              {/* Side-by-Side Verification Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
                <div className="text-xs font-mono text-slate-400">IDENTITY COMPARISON & HOMOGLYPH CHECK</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Legitimate Brand Profile */}
                  <div className="p-3.5 rounded-lg border border-emerald-900/40 bg-emerald-950/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Legitimate Verified Identity</span>
                    </div>
                    <div className="text-xs text-white font-medium">
                      {selectedThreat.executiveTarget || selectedThreat.brandTarget}
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      Handle: {selectedThreat.executiveTarget ? '@elena_vance_ceo' : '@ApexPayHQ'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Registered 2021 · Verified Enterprise Badge · Strict Security Enforced
                    </div>
                  </div>

                  {/* Impersonator Rogue Profile */}
                  <div className="p-3.5 rounded-lg border border-rose-900/40 bg-rose-950/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Impersonator Anomaly Profile</span>
                    </div>
                    <div className="text-xs text-white font-medium">
                      {selectedThreat.profileName}
                    </div>
                    <div className="text-xs font-mono text-rose-300">
                      Handle: {selectedThreat.handle}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Registered {selectedThreat.accountAgeDays} days ago · Number '0' substituted for 'O' · Zero verification
                    </div>
                  </div>
                </div>
              </div>

              {/* CISPA Heuristic Indicators */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400">CISPA ANOMALY ATTRIBUTES</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Cloned Official Avatar</span>
                    <span className={selectedThreat.indicators.avatarCloned ? 'text-rose-400 font-bold' : 'text-slate-500'}>
                      {selectedThreat.indicators.avatarCloned ? 'POSITIVE MATCH (SSIM > 0.92)' : 'NEGATIVE'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Homoglyph Levenshtein Distance</span>
                    <span className={selectedThreat.indicators.homoglyphHandle ? 'text-rose-400 font-bold' : 'text-slate-500'}>
                      {selectedThreat.indicators.homoglyphHandle ? 'HOMOGLYPH DETECTED (dist=1)' : 'EXACT DISTANCE'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Private DM Solicitation</span>
                    <span className={selectedThreat.indicators.dmSolicitationDetected ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                      {selectedThreat.indicators.dmSolicitationDetected ? 'ACTIVE LURE' : 'NONE DETECTED'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Crypto / Seed Phrase Solicit</span>
                    <span className={selectedThreat.indicators.cryptoWalletAdvertised ? 'text-rose-400 font-bold' : 'text-slate-500'}>
                      {selectedThreat.indicators.cryptoWalletAdvertised ? 'SUSPICIOUS ADDRESS' : 'NONE DETECTED'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Intercepted Sample Post / Payload */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400">INTERCEPTED SOCIAL CONTENT / BIO LURE</div>
                <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-200 leading-relaxed font-mono">
                  "{selectedThreat.samplePost}"
                </div>
              </div>

              {/* Matched Keywords */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400">Hijacked Bio Keywords:</span>
                {selectedThreat.indicators.bioKeywordsMatched.map((kw, i) => (
                  <span key={i} className="font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-500">
              Select an account from the left column to run deep forensic inspection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
