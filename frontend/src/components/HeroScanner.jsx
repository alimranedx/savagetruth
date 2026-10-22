import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle2, AlertTriangle, ExternalLink, Globe, Sparkles, RefreshCw, Eye, Flame, Award, Crosshair } from 'lucide-react';

export default function HeroScanner({ onScanComplete }) {
  const [urlInput, setUrlInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const sampleLinks = [
    {
      label: '⚠️ 90% Off Smartwatch (FB Scam Ad)',
      url: 'https://facebook.com/ads/archive/render_ad/?id=9841289412',
      risk: 98,
      store: 'GadgetZone BD Official',
      verdict: 'WALKING CRIME SCENE 💀',
      details: [
        'Domain registered only 14 days ago on Namecheap',
        'Facebook page changed name 4 times in 3 months',
        'COD delivery: Plastic toy inside instead of smartwatch',
        '34 verified community complaints with fake tracking slips',
      ]
    },
    {
      label: '👨‍⚕️ Dr. Farhan Orthopedic (Chamber Audit)',
      url: 'https://centralhospital.com/dr-farhan',
      risk: 2,
      store: 'Central Specialized Hospital',
      verdict: 'CERTIFIED G.O.A.T / SAINT 😇',
      details: [
        'BMDC Reg #A-48192 verified with National Medical Registry',
        'Saved patient from unnecessary 4-lakh taka surgery',
        '230 verified patient community endorsements',
      ]
    },
    {
      label: '⚠️ Ghoster Contractor: Rafiqul Anam',
      url: 'https://facebook.com/rafiqul.anam.interior',
      risk: 96,
      store: 'Freelance Interior Work',
      verdict: 'FINAL BOSS GHOSTER 👻',
      details: [
        'Took ৳1,50,000 advance payment and stopped answering phone',
        '3 flat owners in Uttara filed verified police complaints',
        'Signed contract verified by Sub-Admin desk',
      ]
    }
  ];

  const handleScan = (targetUrl, preset = null) => {
    const url = targetUrl || urlInput;
    if (!url) return;

    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      const result = preset || {
        url,
        risk: url.toLowerCase().includes('gadget') || url.toLowerCase().includes('offer') ? 92 : 35,
        store: 'Scanned Subject / Profile / URL',
        verdict: url.toLowerCase().includes('gadget') ? 'WALKING CRIME SCENE 💀' : 'SUSPICIOUS & SHADY 👀',
        details: [
          'Target profile cross-referenced against 10,000+ local reports',
          'Domain & phone history analyzed for repetitive ghosting',
          'Audit backing: 100% NID-verified citizen reviews',
        ]
      };
      setScanResult(result);
      if (onScanComplete) onScanComplete(result);
    }, 1100);
  };

  return (
    <div className="relative pt-6 pb-8 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-tr from-purple-600/20 via-indigo-600/15 to-pink-600/10 blur-[130px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Banner Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold mb-4 shadow-sm">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>The Savage Truth & Verification Network for Everything</span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3 leading-tight">
          How Bad Is He? <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
            Unfilter Reviews for Anyone & Anything
          </span>
        </h1>
        
        <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto mb-6">
          Expose fake Facebook ads, rogue contractors, shady furniture showrooms, or celebrate honest doctors and trustworthy sales staff. Real evidence backed by <strong>NID-verified citizens</strong>.
        </p>

        {/* Search / Scan Console */}
        <div className="glass-panel p-2 sm:p-3 rounded-2xl shadow-2xl border border-purple-500/30 max-w-2xl mx-auto mb-5">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleScan(urlInput); }}
            className="flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="relative w-full flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Search person name, FB post link, doctor, showroom..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 text-xs sm:text-sm text-white placeholder-slate-500 border border-slate-700/80 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition"
              />
            </div>
            
            <button
              type="submit"
              disabled={isScanning}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <Crosshair className="w-4 h-4 text-amber-300" />
                  <span>Inspect Now</span>
                </>
              )}
            </button>
          </form>

          {/* Quick preset chips */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] text-slate-400 font-semibold">Trending Investigations:</span>
            {sampleLinks.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setUrlInput(item.url);
                  handleScan(item.url, item);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-300 transition text-left cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scan Result HUD */}
        {scanResult && (
          <div className="glass-panel p-5 rounded-2xl border border-purple-500/40 max-w-2xl mx-auto text-left animate-in fade-in slide-in-from-bottom-3 duration-300 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                    scanResult.risk > 70 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-glow-red' 
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {scanResult.verdict}
                  </span>
                  <span className="text-xs text-slate-300 font-bold truncate max-w-xs">{scanResult.store}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 truncate font-mono">{scanResult.url}</div>
              </div>

              {/* Risk Gauge */}
              <div className="flex items-center gap-3 bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-800">
                <div className="text-right">
                  <div className="text-[9px] uppercase font-bold text-slate-400">Threat / Roast Index</div>
                  <div className={`text-xl font-black font-mono leading-none ${
                    scanResult.risk > 70 ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {scanResult.risk}%
                  </div>
                </div>
                <div className="text-xl">
                  {scanResult.risk > 70 ? '💀' : '😇'}
                </div>
              </div>
            </div>

            {/* Diagnostics checklist */}
            <div className="mt-3 space-y-1.5">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Integrity Audit Signals:
              </div>
              {scanResult.details?.map((point, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className={`mt-0.5 ${scanResult.risk > 70 ? 'text-rose-400' : 'text-emerald-400'}`}>•</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
