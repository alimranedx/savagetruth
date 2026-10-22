import React from 'react';
import { Shield, Sparkles, UserCheck, ShieldAlert, PlusCircle } from 'lucide-react';

export default function MobileNav({ activeTab, setActiveTab, onOpenSubmitModal }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-slate-800/90 backdrop-blur-xl px-2 py-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeTab === 'explore' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-5 h-5" />
          <span className="text-[10px]">Scanner</span>
        </button>

        <button
          onClick={onOpenSubmitModal}
          className="flex flex-col items-center gap-1 py-1 px-3 -mt-5"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-glow border-2 border-slate-900 active:scale-95 transition">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-indigo-300">Submit</span>
        </button>

        <button
          onClick={() => setActiveTab('subadmin')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition relative ${
            activeTab === 'subadmin' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <UserCheck className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
          </div>
          <span className="text-[10px]">Sub-Admin</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
            activeTab === 'admin' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-5 h-5" />
          <span className="text-[10px]">Admin</span>
        </button>
      </div>
    </div>
  );
}
