import React, { useState } from 'react';
import { ShieldAlert, Users, Globe, Database, Settings, Slash, AlertTriangle, CheckCircle, BarChart3, Lock } from 'lucide-react';

export default function AdminPanel() {
  const [threshold, setThreshold] = useState(75);
  const [blacklist, setBlacklist] = useState([
    { domain: 'super-deals-fast.store', reports: 34, status: 'Active Blacklist', date: 'Oct 20, 2026' },
    { domain: 'gadget-zone-bd.shop', reports: 19, status: 'Active Blacklist', date: 'Oct 19, 2026' },
    { domain: 'urbanleather-discount.xyz', reports: 12, status: 'Active Blacklist', date: 'Oct 17, 2026' },
  ]);
  const [newDomain, setNewDomain] = useState('');

  const handleAddDomain = (e) => {
    e.preventDefault();
    if (!newDomain) return;
    setBlacklist([
      { domain: newDomain, reports: 1, status: 'Active Blacklist', date: 'Just now' },
      ...blacklist
    ]);
    setNewDomain('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                Root System Governance
              </span>
              <span className="text-xs text-slate-400">Super Admin Mode</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              Platform Integrity & Global Blacklist
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Manage Sub-Admin permissions, global AI risk triggers, and automated scam domain quarantines.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              AES-256 NID Encryption Active
            </span>
          </div>
        </div>
      </div>

      {/* Global Stat Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scams Blocked</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">1,482</div>
          <div className="text-[11px] text-emerald-400 mt-1">↑ 18% from last week</div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">NID Verified Citizens</div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">8,290</div>
          <div className="text-[11px] text-slate-400 mt-1">100% legal audit backing</div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Sub-Admins</div>
          <div className="text-2xl font-extrabold text-indigo-400 font-mono mt-1">14</div>
          <div className="text-[11px] text-slate-400 mt-1">Operating in 4 regions</div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Consumer Money Saved</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">৳ 4.8M</div>
          <div className="text-[11px] text-slate-400 mt-1">Estimated scam avoidance</div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: AI Risk Sensitivity Control */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Settings className="w-4 h-4 text-indigo-400" />
            <span>AI Automated Threat Quarantine Threshold</span>
          </div>
          <p className="text-xs text-slate-400">
            Social ad links scoring above this threshold will be automatically flagged and tagged as High Risk before manual review.
          </p>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Trigger Level:</span>
              <span className="text-base font-extrabold font-mono text-indigo-400">{threshold}% Risk</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="95" 
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>50% (Strict)</span>
              <span>75% (Balanced)</span>
              <span>95% (Permissive)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>Sub-Admin Roles & Delegation:</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span>Electronics & Gadget Squad</span>
              <span className="text-indigo-400 font-mono">6 Agents</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span>Fashion & Apparel Squad</span>
              <span className="text-indigo-400 font-mono">4 Agents</span>
            </div>
            <div className="flex justify-between py-1">
              <span>High-Value Disputes & Legal</span>
              <span className="text-indigo-400 font-mono">4 Agents</span>
            </div>
          </div>
        </div>

        {/* Right: Blacklisted Domains / Stores */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Global Blacklist (Ad Domains & FB Pages)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
              {blacklist.length} Banned
            </span>
          </div>

          <form onSubmit={handleAddDomain} className="flex gap-2">
            <input
              type="text"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="e.g. fake-store-discount.com or fb.com/roguepage"
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 text-xs text-white border border-slate-700 focus:outline-none focus:border-rose-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-glow-red transition cursor-pointer"
            >
              Add Ban
            </button>
          </form>

          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {blacklist.map((item, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-white font-mono">{item.domain}</div>
                  <div className="text-[11px] text-slate-400">Added: {item.date} • {item.reports} Verified Reports</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
