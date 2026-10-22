import React, { useState } from 'react';
import { UserCheck, Award, ShieldAlert, CheckCircle, XCircle, AlertTriangle, ExternalLink, Eye, Clock } from 'lucide-react';

export default function SubAdminPanel({ pendingQueue, onApprove, onReject, onOpenLightbox }) {
  const [activeQueue, setActiveQueue] = useState(pendingQueue);
  const [selectedItem, setSelectedItem] = useState(pendingQueue[0] || null);

  const handleAction = (id, actionType) => {
    if (actionType === 'approve_gold') {
      onApprove(id, 'tier_nid_gold');
    } else if (actionType === 'approve_standard') {
      onApprove(id, 'tier_established');
    } else {
      onReject(id);
    }

    const updated = activeQueue.filter(item => item.id !== id);
    setActiveQueue(updated);
    setSelectedItem(updated[0] || null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 mb-8 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                Operations Desk
              </span>
              <span className="text-xs text-slate-400">Moderator ID: MOD-0824</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              Sub-Admin Moderation Queue
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Cross-reference uploaded courier delivery slips, NID card hashes, and merchant claims before awarding Trust Badges.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-3 rounded-xl border border-slate-800">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Pending Proofs</div>
              <div className="text-xl font-black text-amber-400 font-mono">{activeQueue.length} Reviews</div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Avg Decision Time</div>
              <div className="text-xl font-black text-indigo-400 font-mono">1.8 min</div>
            </div>
          </div>
        </div>
      </div>

      {activeQueue.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-2xl border border-slate-800">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">Queue Clear! All Proofs Audited</h3>
          <p className="text-xs text-slate-400 mt-1">New submissions from social media ads will appear here in real-time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: List of Pending Submissions */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              Pending Submissions ({activeQueue.length}):
            </div>

            {activeQueue.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  selectedItem?.id === item.id
                    ? 'border-indigo-500 bg-indigo-500/15 shadow-glow'
                    : 'border-slate-800/80 bg-slate-900/50 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-white truncate">{item.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono shrink-0">
                    {item.submittedAt}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="text-indigo-400 font-medium">{item.author.name}</span>
                  <span>•</span>
                  <span>Score: <strong className="text-white font-mono">{item.author.trustScore}</strong></span>
                  {item.author.isNidVerified && (
                    <span className="text-amber-400 flex items-center gap-0.5">
                      <Award className="w-3 h-3" /> NID Attached
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Detailed Audit Workspace */}
          {selectedItem && (
            <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
              
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-amber-500/20 text-amber-300">
                      Audit Case #{selectedItem.id}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Target: {selectedItem.targetUrl}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-white leading-snug">
                    {selectedItem.title}
                  </h2>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">AI Threat Risk</div>
                  <div className={`text-xl font-black font-mono ${
                    selectedItem.aiScanRisk > 70 ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {selectedItem.aiScanRisk}%
                  </div>
                </div>
              </div>

              {/* Author Authenticity Card */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedItem.author.avatar} 
                    alt={selectedItem.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-indigo-500/30"
                  />
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{selectedItem.author.name}</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-500/20 text-indigo-300">
                        {selectedItem.author.socialType.toUpperCase()} ({selectedItem.author.accountAgeYears}y)
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {selectedItem.author.maskedNid || 'No NID Provided'}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Account Integrity</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">{selectedItem.author.trustScore} / 100</div>
                </div>
              </div>

              {/* Customer Statement */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Review Statement:
                </div>
                <p className="text-xs sm:text-sm text-slate-300 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Uploaded Evidence Slip */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Uploaded Proof of Delivery / Courier Waybill:</span>
                  <button 
                    onClick={() => onOpenLightbox({ url: selectedItem.evidenceFile, title: 'Uploaded Receipt' })}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" /> Full View
                  </button>
                </div>
                <div 
                  onClick={() => onOpenLightbox({ url: selectedItem.evidenceFile, title: 'Uploaded Receipt' })}
                  className="rounded-xl overflow-hidden border border-slate-700/80 aspect-video bg-slate-950 relative group cursor-pointer"
                >
                  <img 
                    src={selectedItem.evidenceFile} 
                    alt="Proof"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold">
                      Click to Inspect High-Res
                    </span>
                  </div>
                </div>
              </div>

              {/* Moderator Decision Action Buttons */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => handleAction(selectedItem.id, 'approve_gold')}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-glow-gold transition cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Approve Gold NID Badge</span>
                </button>

                <button
                  onClick={() => handleAction(selectedItem.id, 'approve_standard')}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Approve Standard</span>
                </button>

                <button
                  onClick={() => handleAction(selectedItem.id, 'reject')}
                  className="py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-semibold text-xs border border-rose-500/30 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject as Unverifiable</span>
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
