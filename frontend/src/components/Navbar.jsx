import React from 'react';
import { Shield, Sparkles, AlertTriangle, UserCheck, ShieldAlert, Award, ChevronDown, Flame, Zap } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentPersona, setCurrentPersona, onOpenSubmitModal }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* SavageTruth Logo & Slogan */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('explore')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-purple-600 to-amber-500 shadow-glow-red">
              <Flame className="w-5 h-5 text-white animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-rose-100 to-amber-300 bg-clip-text text-transparent">
                  SavageTruth
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  100% RAW
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-400 font-medium">
                Unfiltered Reviews • Doctors, Staff, Persons & Ads
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'explore'
                  ? 'bg-indigo-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Ad Scanner & Reviews
            </button>
            <button
              onClick={() => setActiveTab('subadmin')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'subadmin'
                  ? 'bg-indigo-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Sub-Admin Queue
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                2 New
              </span>
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-indigo-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Super Admin
            </button>
          </nav>

          {/* Right Actions: Persona Switcher & Submit Review */}
          <div className="flex items-center gap-3">
            
            {/* Persona Switcher Dropdown (to demo Account Age / Category impact) */}
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs hover:border-slate-700 transition">
                <span className="flex items-center gap-1.5 font-medium">
                  {currentPersona.category === 'tier_veteran' && <Award className="w-3.5 h-3.5 text-amber-400" />}
                  {currentPersona.category === 'tier_established' && <UserCheck className="w-3.5 h-3.5 text-sky-400" />}
                  {currentPersona.category === 'tier_anonymous' && <span className="w-2 h-2 rounded-full bg-slate-400" />}
                  <span className="text-slate-200">{currentPersona.name}</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {currentPersona.trustScore} pts
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              <div className="absolute right-0 mt-2 w-64 p-2 rounded-xl glass-panel shadow-2xl border border-slate-800 hidden group-hover:block transition">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Identity:
                </div>
                <button
                  onClick={() => setCurrentPersona({
                    name: 'Tariqul (Veteran)',
                    category: 'tier_veteran',
                    socialType: 'facebook',
                    accountAgeYears: 9,
                    trustScore: 96,
                    isNidVerified: true,
                    maskedNid: 'NID-***-***-8419'
                  })}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-amber-300 flex items-center gap-1">
                      <Award className="w-3 h-3" /> Veteran FB Profile
                    </div>
                    <div className="text-[11px] text-slate-400">9 yrs old FB • NID Verified</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">96%</span>
                </button>

                <button
                  onClick={() => setCurrentPersona({
                    name: 'Sabrina (Established)',
                    category: 'tier_established',
                    socialType: 'google',
                    accountAgeYears: 5,
                    trustScore: 82,
                    isNidVerified: true,
                    maskedNid: 'NID-***-***-2094'
                  })}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-sky-300 flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> Established Google
                    </div>
                    <div className="text-[11px] text-slate-400">5 yrs old Google account</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono font-bold">82%</span>
                </button>

                <button
                  onClick={() => setCurrentPersona({
                    name: 'Guest (Anonymous)',
                    category: 'tier_anonymous',
                    socialType: 'anonymous',
                    accountAgeYears: 0,
                    trustScore: 35,
                    isNidVerified: false,
                    maskedNid: null
                  })}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-slate-300">Anonymous Visitor</div>
                    <div className="text-[11px] text-slate-400">No social / No NID</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono font-bold">35%</span>
                </button>
              </div>
            </div>

            {/* Post Review CTA */}
            <button
              onClick={onOpenSubmitModal}
              className="px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-glow hover:shadow-indigo-500/40 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Submit Review</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
