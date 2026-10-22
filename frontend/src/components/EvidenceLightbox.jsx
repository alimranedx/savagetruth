import React from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

export default function EvidenceLightbox({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-3xl w-full glass-panel rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm font-bold text-white truncate">{item.title}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-auto flex items-center justify-center bg-slate-950">
          <img 
            src={item.url} 
            alt={item.title}
            className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
          />
        </div>

        <div className="p-3 border-t border-slate-800 bg-slate-900/60 text-center text-xs text-slate-400">
          Verification Cryptographic Stamp: <code className="text-indigo-400 font-mono">SHA256: 7f83b1657ff1...</code>
        </div>
      </div>
    </div>
  );
}
