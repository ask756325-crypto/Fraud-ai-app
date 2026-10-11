import React, { useState } from 'react';
import {
  Code2,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  Search,
  Filter,
  CheckCircle2,
  Layers,
  Sparkles,
  Terminal
} from 'lucide-react';
import { TOP_10_GITHUB_REPOS } from '../data/reposData';
import { GitHubRepoMeta } from '../types/drp';

export const RepoArchitectureView: React.FC = () => {
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [licenseFilter, setLicenseFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepoMeta>(TOP_10_GITHUB_REPOS[1]); // Default to CISPA
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredRepos = TOP_10_GITHUB_REPOS.filter((repo) => {
    if (priorityFilter === 'p1' && !repo.hackathonPriority.includes('Priority 1')) return false;
    if (priorityFilter === 'p2' && !repo.hackathonPriority.includes('time permits')) return false;
    if (priorityFilter === 'ref' && !repo.hackathonPriority.includes('Reference')) return false;
    if (licenseFilter !== 'all' && repo.licenseCategory !== licenseFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        repo.name.toLowerCase().includes(q) ||
        repo.category.toLowerCase().includes(q) ||
        repo.techStack.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Strategic Hackathon Execution Header */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>HACKATHON LAUNCHPAD</span>
              <span aria-hidden="true">·</span>
              <span>10 OPEN SOURCE ENGINES</span>
              <span aria-hidden="true">·</span>
              <span>LEGAL & ARCHITECTURE MATRIX</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Top 10 Repositories Architecture Hub</h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Execution plan for BrandShield AI. Prioritizes CISPA Brand Impersonation, Phishing URL ML, Logo Similarity, and FastAPI for day-one deployment. Treats MISP and OpenCTI as schema & architectural blueprints.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-cyan-900/40 bg-slate-950 text-xs font-mono shrink-0">
            <div className="text-slate-400">Day 1 Core Stack:</div>
            <div className="text-cyan-400 font-bold mt-0.5">CISPA + Phishing ML + Logo CV + FastAPI</div>
          </div>
        </div>

        {/* Priority and Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 mr-2">Filter Priority:</span>
            {[
              { id: 'all', label: 'All 10 Repos' },
              { id: 'p1', label: 'Priority 1 (Core Launch)' },
              { id: 'p2', label: 'Priority 2 (If Time Permits)' },
              { id: 'ref', label: 'Architecture References' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPriorityFilter(p.id)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  priorityFilter === p.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search tech stack or repo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 text-xs rounded-lg border border-slate-800 bg-slate-950 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-48 sm:w-60"
            />
          </div>
        </div>
      </div>

      {/* Two Column Layout: Repository Cards + Integration Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Repository List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
            <span>REPOSITORY REGISTRY ({filteredRepos.length})</span>
            <span>LICENSE AUDITED</span>
          </div>

          <div className="space-y-3">
            {filteredRepos.map((repo) => {
              const isSelected = selectedRepo.id === repo.id;
              return (
                <div
                  key={repo.id}
                  onClick={() => setSelectedRepo(repo)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    isSelected
                      ? 'border-cyan-500/60 bg-slate-900/90 shadow-md ring-1 ring-cyan-500/20'
                      : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          #{repo.number}
                        </span>
                        <span className="font-bold text-white text-sm">{repo.name}</span>
                      </div>
                      <div className="text-xs text-slate-400">{repo.category}</div>
                      <div className="text-xs font-mono text-slate-400">{repo.fullName}</div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          repo.hackathonPriority.includes('Priority 1')
                            ? 'bg-rose-950 text-rose-300 border border-rose-800/50'
                            : repo.hackathonPriority.includes('time permits')
                            ? 'bg-amber-950 text-amber-300 border border-amber-800/50'
                            : 'bg-blue-950 text-blue-300 border border-blue-800/50'
                        }`}
                      >
                        {repo.hackathonPriority.includes('Priority 1')
                          ? 'P1 Core'
                          : repo.hackathonPriority.includes('time permits')
                          ? 'P2 Extra'
                          : 'Reference'}
                      </span>
                      <div className="text-[11px] font-mono text-slate-400 mt-1.5">
                        License: <span className="text-slate-300">{repo.license}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tech stack tags */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                    {repo.techStack.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Repository Detail & FastAPI Integration Blueprint */}
        <div className="lg:col-span-7">
          {selectedRepo ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6 sticky top-24">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      REPO #{selectedRepo.number}
                    </span>
                    <h2 className="text-xl font-bold text-white">{selectedRepo.name}</h2>
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">{selectedRepo.category}</div>
                </div>

                <a
                  href={selectedRepo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap self-start sm:self-auto"
                >
                  <span>Open GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Legal & Maintenance Inspection Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
                  <div className="text-slate-500 text-[10px]">Software License</div>
                  <div className="text-white font-bold">{selectedRepo.license}</div>
                  <div className={selectedRepo.licenseCategory === 'Permissive' ? 'text-emerald-400 text-[10px]' : 'text-amber-400 text-[10px]'}>
                    {selectedRepo.licenseCategory}
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
                  <div className="text-slate-500 text-[10px]">Maintenance</div>
                  <div className="text-white font-bold">{selectedRepo.maintenanceStatus}</div>
                  <div className="text-cyan-400 text-[10px]">Verified 2026</div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
                  <div className="text-slate-500 text-[10px]">Hackathon Priority</div>
                  <div className="text-rose-400 font-bold truncate">{selectedRepo.hackathonPriority.split('-')[0]}</div>
                  <div className="text-slate-400 text-[10px]">Strategic Target</div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 space-y-1">
                  <div className="text-slate-500 text-[10px]">Integration Type</div>
                  <div className="text-white font-bold">FastAPI Pipeline</div>
                  <div className="text-slate-400 text-[10px]">Microservice</div>
                </div>
              </div>

              {/* Core Capabilities */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400">CORE CAPABILITIES</div>
                <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-200 leading-relaxed">
                  {selectedRepo.coreCapability}
                </div>
              </div>

              {/* How We Integrate */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400">HACKATHON INTEGRATION ARCHITECTURE</div>
                <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-cyan-300 leading-relaxed">
                  {selectedRepo.howWeIntegrate}
                </div>
              </div>

              {/* Code Snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                    <span>INTEGRATION CODE SNIPPET / FASTAPI GLUE</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(selectedRepo.sampleCodeSnippet, selectedRepo.id)}
                    className="text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    {copiedId === selectedRepo.id ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span>Copy Snippet</span>
                  </button>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                  <pre>{selectedRepo.sampleCodeSnippet}</pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-500">
              Select a repository to inspect its license, dependencies, and integration code.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
