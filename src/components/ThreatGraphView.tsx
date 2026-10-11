import React, { useState } from 'react';
import {
  Share2,
  Database,
  Download,
  Copy,
  Check,
  Shield,
  ExternalLink,
  Layers,
  Info
} from 'lucide-react';
import { ThreatGraphNode, ThreatGraphEdge } from '../types/drp';

interface ThreatGraphViewProps {
  nodes: ThreatGraphNode[];
  edges: ThreatGraphEdge[];
}

export const ThreatGraphView: React.FC<ThreatGraphViewProps> = ({ nodes, edges }) => {
  const [selectedNode, setSelectedNode] = useState<ThreatGraphNode | null>(nodes[1]); // default to Threat Actor
  const [copiedStix, setCopiedStix] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredNodes = nodes.filter((n) => filterType === 'all' || n.type === filterType);

  const generateStixBundle = () => {
    return JSON.stringify(
      {
        type: 'bundle',
        id: 'bundle--brandshield-export-2026',
        spec_version: '2.1',
        objects: [
          {
            type: 'identity',
            id: 'identity--brandshield-apexpay',
            name: 'ApexPay Global Corp',
            identity_class: 'organization',
            sectors: ['financial-services', 'fintech']
          },
          {
            type: 'threat-actor',
            id: 'threat-actor--storm-0824',
            name: 'Storm-0824 (Fin7 Affiliate)',
            threat_actor_types: ['cybercriminal'],
            sophistication: 'advanced'
          },
          {
            type: 'infrastructure',
            id: 'infrastructure--c2-server',
            name: 'Bulletproof C2 Relay',
            infrastructure_types: ['command-and-control'],
            ip_refs: ['185.220.101.44']
          },
          {
            type: 'malware',
            id: 'malware--rogue-apexpay-apk',
            name: 'ApexPay Banking Overlay Dropper',
            is_family: false,
            malware_types: ['trojan', 'credential-stealer']
          }
        ]
      },
      null,
      2
    );
  };

  const handleCopyStix = () => {
    navigator.clipboard.writeText(generateStixBundle());
    setCopiedStix(true);
    setTimeout(() => setCopiedStix(false), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Architecture Intro */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>OpenCTI-Platform/opencti</span>
              <span aria-hidden="true">·</span>
              <span>MISP/MISP</span>
              <span aria-hidden="true">·</span>
              <span>STIX 2.1 THREAT INTELLIGENCE GRAPH</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-white">Threat Actor & Infrastructure Relationship Graph</h1>
            <p className="mt-1 text-xs text-slate-300 max-w-3xl leading-relaxed">
              Maps threat intelligence correlations between criminal syndicates, command-and-control servers, rogue APK droppers, and phishing infrastructure targeting your enterprise brand assets using OpenCTI schema principles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyStix}
              className="px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              {copiedStix ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>Export STIX 2.1 JSON</span>
            </button>
          </div>
        </div>

        {/* Filter Node Types */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 mr-2">Filter Graph Entities:</span>
          {['all', 'actor', 'domain', 'mobile_app', 'social_account', 'ip', 'yara_rule'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 text-xs font-medium rounded-lg uppercase tracking-wider transition-colors ${
                filterType === type
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Visual Graph Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between min-h-[500px] relative overflow-hidden">
          {/* Top Canvas Controls */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 z-10">
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-cyan-400" />
              <span>ACTIVE CORRELATION TOPOLOGY ({filteredNodes.length} NODES · {edges.length} RELATIONS)</span>
            </div>
            <span>STIX / MISP TAXONOMY</span>
          </div>

          {/* Graphical Nodes Visual Canvas */}
          <div className="my-8 relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Column 1: Threat Actors & Infrastructure */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-slate-500 uppercase px-1">Adversary & C2</div>
              {nodes
                .filter((n) => n.type === 'actor' || n.type === 'ip')
                .map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`cursor-pointer p-3 rounded-lg border transition-all text-xs ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-md'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase text-rose-400">{node.type}</span>
                        <span className="text-[10px] font-mono text-slate-500">Node #{node.id}</span>
                      </div>
                      <div className="font-semibold mt-1">{node.label}</div>
                    </div>
                  );
                })}
            </div>

            {/* Column 2: Attack Vectors (Apps, Domains, Socials) */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-slate-500 uppercase px-1">Delivery Infrastructure</div>
              {nodes
                .filter((n) => ['domain', 'mobile_app', 'social_account'].includes(n.type))
                .slice(0, 4)
                .map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`cursor-pointer p-3 rounded-lg border transition-all text-xs ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-md'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase text-amber-400">{node.type.replace('_', ' ')}</span>
                        <span className="text-[10px] font-mono text-slate-500">Attacks Brand</span>
                      </div>
                      <div className="font-semibold mt-1 truncate">{node.label}</div>
                    </div>
                  );
                })}
            </div>

            {/* Column 3: Protected Target Brand & Signatures */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-slate-500 uppercase px-1">Protected Enterprise</div>
              {nodes
                .filter((n) => n.type === 'brand' || n.type === 'yara_rule')
                .map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`cursor-pointer p-3 rounded-lg border transition-all text-xs ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-md'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase text-emerald-400">{node.type}</span>
                        <span className="text-[10px] font-mono text-slate-500">Asset</span>
                      </div>
                      <div className="font-semibold mt-1">{node.label}</div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Relationship Connections Strip */}
          <div className="pt-4 border-t border-slate-800/80 z-10 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
            <span>Observed Relationships:</span>
            {edges.slice(0, 5).map((e) => (
              <span key={e.id} className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[11px]">
                {e.source} <span className="text-cyan-400">&rarr; {e.relation} &rarr;</span> {e.target}
              </span>
            ))}
          </div>

          {/* Background grid canvas styling */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
        </div>

        {/* Right Node Attribute Drawer */}
        <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-base font-bold text-white">MISP Attribute Inspection</h2>
            <span className="text-xs font-mono text-cyan-400">IoC Schema</span>
          </div>

          {selectedNode ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-xs font-mono text-slate-400 uppercase">{selectedNode.type.replace('_', ' ')} Entity</div>
                <div className="text-base font-bold text-white">{selectedNode.label}</div>
                <div className="text-xs text-slate-300 leading-relaxed pt-1">{selectedNode.details}</div>
              </div>

              {/* Attributes Table */}
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-500">STIX UUID:</span>
                  <span className="text-slate-300">{selectedNode.id}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-500">Risk Assessment:</span>
                  <span className="text-rose-400 uppercase font-bold">{selectedNode.risk}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-500">Confidence:</span>
                  <span className="text-cyan-400">High (Cross-Correlated)</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-500">To IDS Flag:</span>
                  <span className="text-emerald-400">True (Exportable)</span>
                </div>
              </div>

              {/* OpenCTI / MISP Context Notice */}
              <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-400 space-y-1">
                <div className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-cyan-400" />
                  <span>MISP & OpenCTI Federation</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  In a production multi-tenant deployment, this threat correlation connects directly to your MISP instance using <code className="text-slate-200">PyMISP</code> or OpenCTI's GraphQL connectors to automate firewall blocklists and threat intelligence exchange.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-500">
              Click any node in the topology canvas to inspect its MISP attributes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
