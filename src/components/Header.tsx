import React from 'react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenScanModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenScanModal
}) => {
  const navItems = [
    { id: 'overview', label: 'Mission Control' },
    { id: 'social', label: 'Social Radar' },
    { id: 'mobile', label: 'App Scanner' },
    { id: 'domains', label: 'Domain Intel' },
    { id: 'logo', label: 'Logo Similarity' },
    { id: 'threat-graph', label: 'Threat Graph' },
    { id: 'repos', label: 'Open Source Hub' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element brand wordmark */}
        <button
          onClick={() => onSelectTab('overview')}
          className="text-left font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 text-lg"
        >
          <span className="text-cyan-400">BrandShield</span> AI
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                currentTab === item.id
                  ? 'text-cyan-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
              {currentTab === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenScanModal}
            className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-sm transition-all hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 whitespace-nowrap shrink-0 active:scale-95"
          >
            <span>Scan Brand Assets</span>
          </button>
        </div>
      </div>
      
      {/* Mobile navigation row for smaller viewports */}
      <div className="flex lg:hidden overflow-x-auto border-t border-slate-900 bg-slate-950 px-4 py-2 gap-4 text-xs font-medium text-slate-400 no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`whitespace-nowrap shrink-0 py-1 ${
              currentTab === item.id ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
