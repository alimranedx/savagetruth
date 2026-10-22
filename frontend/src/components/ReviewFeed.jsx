import React, { useState } from 'react';
import { 
  Award, UserCheck, ShieldCheck, ShieldAlert, ThumbsUp, Flag, 
  ExternalLink, Image as ImageIcon, Filter, Star, Flame, MapPin, 
  User, Stethoscope, Store, ShoppingBag, AlertTriangle, EyeOff, Sparkles 
} from 'lucide-react';

export default function ReviewFeed({ reviews, onOpenLightbox, onVoteHelpful }) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const categoryFilters = [
    { id: 'all', label: '🔥 All Top Reviews' },
    { id: 'person', label: '👤 Individuals' },
    { id: 'doctor', label: '👨‍⚕️ Doctors' },
    { id: 'shop', label: '🏪 Shops & Showrooms' },
    { id: 'shopkeeper', label: '🛒 Shopkeepers & Staff' },
    { id: 'product_ad', label: '📦 Products & FB Ads' }
  ];

  const filteredReviews = reviews.filter((rev) => {
    // Category match
    if (activeCategoryFilter !== 'all') {
      if (rev.category !== activeCategoryFilter) return false;
    }
    // Verified only filter
    if (verifiedOnly && !rev.author.isNidVerified) {
      return false;
    }
    // Search keyword
    if (searchKeyword) {
      const q = searchKeyword.toLowerCase();
      const matchTitle = rev.title.toLowerCase().includes(q);
      const matchDesc = rev.description.toLowerCase().includes(q);
      const matchTarget = rev.target?.name?.toLowerCase().includes(q);
      const matchAuthor = rev.author.name.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchTarget && !matchAuthor) return false;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-glow">
              LIVE COMMUNITY FEED
            </span>
            <span className="text-xs text-slate-400 font-mono">Real Audits • Zero Fake Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2">
            <span>Trending Reports & Savage Verdicts</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
              {filteredReviews.length} Active
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real people, doctors, showrooms, shopkeepers, and social ads rated with exact evidence.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search person, doctor, showroom..."
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900 text-xs text-white border border-slate-700/80 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Mandatory Category Filter Tabs */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 flex-nowrap">
          {categoryFilters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategoryFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeCategoryFilter === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-glow'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setVerifiedOnly(!verifiedOnly)}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 cursor-pointer ${
            verifiedOnly
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-glow-gold'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>NID Citizens Only</span>
        </button>
      </div>

      {/* Review Cards Grid / List */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <div className="glass-panel p-16 text-center rounded-2xl border border-slate-800">
            <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No reviews found in this category</h3>
            <p className="text-xs text-slate-400 mt-1">Be the first to submit a verified report for this category.</p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div 
              key={rev.id}
              className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800/80 glass-panel-hover transition duration-200 space-y-4"
            >
              {/* TOP HEADER: Target Profile Card & Category Tag */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                
                {/* Target Being Reviewed */}
                <div className="flex items-center gap-3">
                  <img 
                    src={rev.target?.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'} 
                    alt={rev.target?.name}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-indigo-500/30 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-extrabold text-white">
                        {rev.target?.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                        {rev.categoryLabel || rev.category}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 font-medium flex items-center gap-1.5 mt-0.5">
                      <span>{rev.target?.titleRole}</span>
                      <span>•</span>
                      <span className="text-slate-400 flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {rev.target?.address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating & Savage Roast Badge */}
                <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1.5 shrink-0">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {rev.savageVerdict && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      rev.howBadScore >= 70 ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-glow-red' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {rev.savageVerdict}
                    </span>
                  )}
                </div>

              </div>

              {/* SAVAGE "HOW BAD IS HE / ROAST" BAR (Youth Generation Hype) */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <Flame className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-extrabold text-purple-300 uppercase tracking-wider">
                      Savage Verdict & Youth Roast:
                    </div>
                    <p className="text-xs text-slate-200 italic font-medium mt-0.5">
                      "{rev.savageRoast}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Threat / Roast Index:</span>
                  <span className={`text-base font-black font-mono ${rev.howBadScore >= 70 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {rev.howBadScore}%
                  </span>
                </div>
              </div>

              {/* REVIEW BODY & STATEMENT */}
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-snug">
                  {rev.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {rev.description}
                </p>
              </div>

              {/* TARGET SOCIAL LINKS */}
              {rev.target?.socialLinks && rev.target.socialLinks.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Target Links:</span>
                  {rev.target.socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 hover:text-white transition"
                    >
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              )}

              {/* EVIDENCE ATTACHMENT */}
              {rev.evidence && rev.evidence.length > 0 && (
                <div className="pt-1">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Attached Document & Evidence ({rev.evidence.length})</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {rev.evidence.map((ev) => (
                      <div
                        key={ev.id}
                        onClick={() => onOpenLightbox(ev)}
                        className="relative group rounded-xl overflow-hidden border border-slate-700/80 cursor-pointer aspect-video bg-slate-900"
                      >
                        <img 
                          src={ev.url} 
                          alt={ev.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-1.5">
                          <span className="text-[10px] text-slate-200 truncate font-medium">
                            {ev.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FOOTER: REVIEWER IDENTITY / ANONYMOUS DEMOGRAPHICS & HELPFUL VOTES */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
                
                {/* Author Metadata */}
                <div className="flex items-center gap-2 flex-wrap">
                  {rev.isAnonymous ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-bold text-[11px]">
                        <EyeOff className="w-3 h-3" />
                        {rev.author.name}
                      </span>
                      {rev.anonymousDemographics && (
                        <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                          👤 {rev.anonymousDemographics.age}y, {rev.anonymousDemographics.sex} • 📍 {rev.anonymousDemographics.area}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <img 
                        src={rev.author.avatar} 
                        alt={rev.author.name}
                        className="w-5 h-5 rounded-full object-cover border border-indigo-500/40"
                      />
                      <span className="font-bold text-slate-200">{rev.author.name}</span>
                    </div>
                  )}

                  {/* Badges */}
                  {rev.author.isNidVerified && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      NID Verified Citizen
                    </span>
                  )}

                  <span className="text-slate-500 font-mono text-[10px]">
                    Trust Score: {rev.author.trustScore} pts
                  </span>
                </div>

                {/* Helpful Button */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onVoteHelpful(rev.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Helpful ({rev.helpfulCount})</span>
                  </button>
                  <span className="text-[11px] text-slate-500">{new Date(rev.createdAt).toLocaleDateString()}</span>
                </div>

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
