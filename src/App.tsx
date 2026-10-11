/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { OverviewDashboard } from './components/OverviewDashboard';
import { SocialImpersonationView } from './components/SocialImpersonationView';
import { MobileAppScannerView } from './components/MobileAppScannerView';
import { DomainPhishingView } from './components/DomainPhishingView';
import { VisualLogoSimilarityView } from './components/VisualLogoSimilarityView';
import { ThreatGraphView } from './components/ThreatGraphView';
import { RepoArchitectureView } from './components/RepoArchitectureView';
import { TakedownGeneratorModal } from './components/TakedownGeneratorModal';
import { LiveScanWizard } from './components/LiveScanWizard';
import {
  MOCK_SOCIAL_THREATS,
  MOCK_MOBILE_APP_THREATS,
  MOCK_PHISHING_DOMAINS,
  MOCK_LOGO_CASES,
  MOCK_THREAT_GRAPH_NODES,
  MOCK_THREAT_GRAPH_EDGES
} from './data/mockThreatData';
import {
  SocialAccountThreat,
  RogueMobileAppThreat,
  PhishingDomainThreat,
  LogoSimilarityCase
} from './types/drp';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('overview');

  // Threat datasets in state so user actions reflect dynamically
  const [socialThreats, setSocialThreats] = useState<SocialAccountThreat[]>(MOCK_SOCIAL_THREATS);
  const [mobileThreats, setMobileThreats] = useState<RogueMobileAppThreat[]>(MOCK_MOBILE_APP_THREATS);
  const [domainThreats, setDomainThreats] = useState<PhishingDomainThreat[]>(MOCK_PHISHING_DOMAINS);
  const [logoCases] = useState<LogoSimilarityCase[]>(MOCK_LOGO_CASES);

  // Modals state
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [takedownTarget, setTakedownTarget] = useState<{ threat: any; type: string } | null>(null);

  const handleOpenTakedown = (threat: any, type: string) => {
    setTakedownTarget({ threat, type });
  };

  const handleCloseTakedown = () => {
    setTakedownTarget(null);
  };

  const handleMarkTakedownSent = (threatId: string) => {
    setSocialThreats((prev) =>
      prev.map((t) => (t.id === threatId ? { ...t, status: 'takedown_requested' as const } : t))
    );
    setMobileThreats((prev) =>
      prev.map((t) => (t.id === threatId ? { ...t, status: 'takedown_requested' as const } : t))
    );
    setDomainThreats((prev) =>
      prev.map((t) => (t.id === threatId ? { ...t, status: 'takedown_requested' as const } : t))
    );
  };

  const handleAddDiscoveredThreats = (
    newSocial: SocialAccountThreat[],
    newApp: RogueMobileAppThreat[],
    newDomain: PhishingDomainThreat[]
  ) => {
    setSocialThreats((prev) => [...newSocial, ...prev]);
    setMobileThreats((prev) => [...newApp, ...prev]);
    setDomainThreats((prev) => [...newDomain, ...prev]);
    setCurrentTab('overview');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Navigation conforming to Top Bar Contract */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenScanModal={() => setIsScanModalOpen(true)}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'overview' && (
          <OverviewDashboard
            socialThreats={socialThreats}
            mobileThreats={mobileThreats}
            domainThreats={domainThreats}
            logoCases={logoCases}
            onNavigateTab={setCurrentTab}
            onOpenTakedown={handleOpenTakedown}
            onOpenScanModal={() => setIsScanModalOpen(true)}
          />
        )}

        {currentTab === 'social' && (
          <SocialImpersonationView
            threats={socialThreats}
            onOpenTakedown={handleOpenTakedown}
          />
        )}

        {currentTab === 'mobile' && (
          <MobileAppScannerView
            threats={mobileThreats}
            onOpenTakedown={handleOpenTakedown}
          />
        )}

        {currentTab === 'domains' && (
          <DomainPhishingView
            threats={domainThreats}
            onOpenTakedown={handleOpenTakedown}
          />
        )}

        {currentTab === 'logo' && (
          <VisualLogoSimilarityView
            cases={logoCases}
            onOpenTakedown={handleOpenTakedown}
          />
        )}

        {currentTab === 'threat-graph' && (
          <ThreatGraphView
            nodes={MOCK_THREAT_GRAPH_NODES}
            edges={MOCK_THREAT_GRAPH_EDGES}
          />
        )}

        {currentTab === 'repos' && (
          <RepoArchitectureView />
        )}
      </main>

      {/* Clean Footer adhering to Section 1.B: Quiet copyright & links without fake telemetry tickers */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">BrandShield AI</span>
            <span aria-hidden="true">·</span>
            <span>Digital Risk Protection Platform</span>
            <span aria-hidden="true">·</span>
            <span>Open Source Security Integration Architecture</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <button
              onClick={() => setCurrentTab('repos')}
              className="hover:text-slate-200 transition-colors"
            >
              Top 10 GitHub Repositories
            </button>
            <button
              onClick={() => setCurrentTab('threat-graph')}
              className="hover:text-slate-200 transition-colors"
            >
              OpenCTI Schema
            </button>
            <button
              onClick={() => setIsScanModalOpen(true)}
              className="hover:text-cyan-400 transition-colors"
            >
              Run Brand Scan
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {takedownTarget && (
        <TakedownGeneratorModal
          threat={takedownTarget.threat}
          threatType={takedownTarget.type}
          onClose={handleCloseTakedown}
          onMarkTakedownSent={handleMarkTakedownSent}
        />
      )}

      {isScanModalOpen && (
        <LiveScanWizard
          onClose={() => setIsScanModalOpen(false)}
          onAddDiscoveredThreats={handleAddDiscoveredThreats}
        />
      )}
    </div>
  );
}
