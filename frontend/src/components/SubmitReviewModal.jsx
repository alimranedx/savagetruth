import React, { useState } from 'react';
import { 
  X, Award, Shield, UserCheck, Star, Upload, Link, AlertCircle, 
  CheckCircle, Info, EyeOff, Eye, User, Stethoscope, Store, 
  ShoppingBag, Flame, MapPin, Sparkles, Crosshair
} from 'lucide-react';

export default function SubmitReviewModal({ isOpen, onClose, onSubmitReview, currentPersona }) {
  if (!isOpen) return null;

  // 1. Mandatory Category
  const [category, setCategory] = useState('person'); // person, doctor, shop, shopkeeper, product_ad, professional

  // 2. Target Profile Details (The Person / Doctor / Shop being reviewed)
  const [targetName, setTargetName] = useState('');
  const [targetTitleRole, setTargetTitleRole] = useState('');
  const [targetAddress, setTargetAddress] = useState('');
  const [targetDistrict, setTargetDistrict] = useState('Dhaka');
  const [targetPhoto, setTargetPhoto] = useState('');
  const [targetSocialLink, setTargetSocialLink] = useState('');

  // 3. Review Content & Rating
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1);
  const [evidenceName, setEvidenceName] = useState('Payment Slip / Chat Screenshot / Prescription / Memo');

  // 4. Savage "How Bad Is He / Roast Meter" (Youth Hype Rating)
  const [howBadScore, setHowBadScore] = useState(90);
  const [savageRoast, setSavageRoast] = useState('');

  // 5. Anonymous Mode & Required Reviewer Demographics
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reviewerAge, setReviewerAge] = useState('24');
  const [reviewerSex, setReviewerSex] = useState('Male');
  const [reviewerArea, setReviewerArea] = useState('Dhanmondi, Dhaka');
  const [includeNid, setIncludeNid] = useState(currentPersona.isNidVerified || false);
  const [nidNumber, setNidNumber] = useState(currentPersona.maskedNid ? '5918294109' : '');

  // Category Configuration Helper
  const CATEGORIES = [
    { id: 'person', label: '👤 Individual / Person', placeholder: 'e.g., Ex-colleague, Contractor, Roommate, Fraudster' },
    { id: 'doctor', label: '👨‍⚕️ Doctor / Healthcare', placeholder: 'e.g., Dr. Name, Specialist, Hospital/Chamber' },
    { id: 'shopkeeper', label: '🛒 Shopkeeper / Staff', placeholder: 'e.g., Mobile Salesman, Showroom Staff, Manager' },
    { id: 'shop', label: '🏪 Shop / Showroom', placeholder: 'e.g., Electronics Showroom, Furniture Store, Brand' },
    { id: 'product_ad', label: '📦 Product / Social Ad', placeholder: 'e.g., Facebook Sponsored Product, Viral Gadget' },
    { id: 'professional', label: '💼 Professional', placeholder: 'e.g., Electrician, Web Developer, Lawyer, Broker' },
  ];

  // Savage Meter Helper
  const getSavageVerdict = (score) => {
    if (score >= 90) return { verdict: 'WALKING CRIME SCENE 💀', color: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
    if (score >= 70) return { verdict: 'CERTIFIED RED FLAG 🚩', color: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40' };
    if (score >= 45) return { verdict: 'SUSPICIOUS & SHADY 👀', color: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
    if (score >= 20) return { verdict: 'MOSTLY DECENT 👍', color: 'text-sky-400', badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40' };
    return { verdict: 'CERTIFIED G.O.A.T / SAINT 😇', color: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setReviewerArea(`Verified Live Geo (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`);
        },
        () => {
          setReviewerArea(`${targetDistrict} (District Verified)`);
        }
      );
    } else {
      setReviewerArea(`${targetDistrict} (District Verified)`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNidValid = includeNid && (nidNumber.length >= 10 || currentPersona.isNidVerified);
    const maskedNidVal = isNidValid 
      ? (currentPersona.maskedNid || `NID-***-***-${nidNumber.slice(-4)}`) 
      : null;

    const savageData = getSavageVerdict(howBadScore);

    const newReview = {
      id: `rev-${Date.now()}`,
      category,
      categoryLabel: CATEGORIES.find(c => c.id === category)?.label || 'General',
      target: {
        name: targetName,
        titleRole: targetTitleRole || 'Professional / Subject',
        address: targetAddress,
        district: targetDistrict,
        photo: targetPhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        socialLinks: targetSocialLink ? [
          { platform: targetSocialLink.includes('facebook') ? 'facebook' : (targetSocialLink.includes('linkedin') ? 'linkedin' : 'web'), label: 'Verified Profile', url: targetSocialLink }
        ] : []
      },
      title,
      description,
      rating,
      savageVerdict: savageData.verdict,
      howBadScore,
      savageRoast: savageRoast || (howBadScore >= 70 ? 'Red flag detected. Community alert active.' : 'Certified trustworthy experience.'),
      status: 'approved',
      trustTier: isNidValid ? 'tier_nid_gold' : (currentPersona.category === 'tier_veteran' ? 'tier_veteran' : 'tier_established'),
      isAnonymous,
      anonymousDemographics: isAnonymous ? {
        age: Number(reviewerAge) || 24,
        sex: reviewerSex,
        district: targetDistrict,
        area: reviewerArea
      } : null,
      author: {
        name: isAnonymous 
          ? (isNidValid ? 'Anonymous Verified Citizen' : 'Anonymous Verified User') 
          : currentPersona.name,
        avatar: isAnonymous ? null : currentPersona.avatar,
        category: currentPersona.category,
        categoryLabel: currentPersona.category === 'tier_veteran' ? 'Veteran Account' : 'Established Account',
        socialType: currentPersona.socialType,
        accountAgeYears: currentPersona.accountAgeYears,
        trustScore: isNidValid ? Math.min(100, Math.max(92, currentPersona.trustScore)) : currentPersona.trustScore,
        isNidVerified: isNidValid,
        maskedNid: maskedNidVal,
        isIdentityMasked: isAnonymous,
      },
      evidence: [
        {
          id: `ev-${Date.now()}`,
          type: 'document',
          title: evidenceName,
          url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
          verified: isNidValid
        }
      ],
      helpfulCount: 1,
      reportedCount: 0,
      createdAt: new Date().toISOString()
    };

    onSubmitReview(newReview);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-indigo-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Submit SavageTruth Report & Savage Roast
              </h2>
            </div>
            <p className="text-[11px] text-slate-400">
              Review any doctor, shopkeeper, shop, contractor, or simple individual with exact proof.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* 1. MANDATORY CATEGORY SELECTOR */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center justify-between">
              <span>1. Select Review Category (Mandatory) *</span>
              <span className="text-[10px] text-rose-400">Required</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer flex flex-col gap-1 ${
                    category === cat.id
                      ? 'border-indigo-500 bg-indigo-600/20 text-white shadow-glow'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span className="font-bold">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. TARGET EXACT DETAILS */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-indigo-400" />
              <span>Target Identity (Who or What are you reviewing?):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Target Full Name / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={targetName}
                  onChange={(e) => setTargetName(e.target.value)}
                  placeholder="e.g., Dr. Name / Shop Name / Individual Name"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 text-xs text-white border border-slate-700 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Designation / Role / Business Type
                </label>
                <input
                  type="text"
                  value={targetTitleRole}
                  onChange={(e) => setTargetTitleRole(e.target.value)}
                  placeholder="e.g., Orthopedic Doctor / Mobile Salesman / Contractor"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 text-xs text-white border border-slate-700 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Exact Address / Chamber / Showroom Location *
                </label>
                <input
                  type="text"
                  required
                  value={targetAddress}
                  onChange={(e) => setTargetAddress(e.target.value)}
                  placeholder="e.g., Central Hospital Green Road or Bashundhara Level 5"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 text-xs text-white border border-slate-700 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  District
                </label>
                <select
                  value={targetDistrict}
                  onChange={(e) => setTargetDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 text-xs text-white border border-slate-700 focus:outline-none"
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Social Link (Facebook / LinkedIn / Web / Phone)
                </label>
                <input
                  type="url"
                  value={targetSocialLink}
                  onChange={(e) => setTargetSocialLink(e.target.value)}
                  placeholder="https://facebook.com/profile or linkedin.com/in/..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 text-xs text-white border border-slate-700 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Target Photo / Avatar URL (Optional)
                </label>
                <input
                  type="url"
                  value={targetPhoto}
                  onChange={(e) => setTargetPhoto(e.target.value)}
                  placeholder="https://... photo link if available"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 text-xs text-white border border-slate-700 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 3. SAVAGE YOUTH HYPE METER: "How Bad Is He / Roast Meter" */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                <span>Youth Hype: "How Bad Is He / Roast Meter" (0 to 100)</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getSavageVerdict(howBadScore).badge}`}>
                {getSavageVerdict(howBadScore).verdict}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-emerald-400 font-bold">0% (Pure Angel)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={howBadScore}
                onChange={(e) => setHowBadScore(Number(e.target.value))}
                className="flex-1 accent-purple-500 cursor-pointer"
              />
              <span className="text-[11px] text-rose-400 font-bold">100% (Final Boss Menace)</span>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Savage 1-Line Verdict / Youth Roast:
              </label>
              <input
                type="text"
                value={savageRoast}
                onChange={(e) => setSavageRoast(e.target.value)}
                placeholder="e.g. 'Took the advance payment and unlocked invisibility mode' or 'Pure goat, 10/10 honesty'"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 text-xs text-purple-200 border border-purple-500/40 focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* 4. ANONYMOUS TOGGLE & MANDATORY DEMOGRAPHICS */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isAnonymous ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-800 text-slate-400'}`}>
                  {isAnonymous ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Post as Anonymous Reviewer</div>
                  <div className="text-[10px] text-slate-400">Masks your real identity while keeping verified trust points</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isAnonymous ? 'bg-purple-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    isAnonymous ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* If Anonymous: Require Name/Age/Sex/Area */}
            {isAnonymous && (
              <div className="pt-2 border-t border-slate-800 space-y-3 animate-in fade-in duration-200">
                <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-200">
                  ℹ️ <strong>Demographic Requirement:</strong> For anonymous reviews, age, gender, and area are required to ensure real local feedback. Your real identity remains completely confidential.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Your Age *</label>
                    <input
                      type="number"
                      min="16"
                      max="90"
                      required={isAnonymous}
                      value={reviewerAge}
                      onChange={(e) => setReviewerAge(e.target.value)}
                      placeholder="e.g., 24"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 text-xs text-white border border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Sex / Gender *</label>
                    <select
                      value={reviewerSex}
                      onChange={(e) => setReviewerSex(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 text-xs text-white border border-slate-700"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Your Area / District *</label>
                    <div className="relative">
                      <input
                        type="text"
                        required={isAnonymous}
                        value={reviewerArea}
                        onChange={(e) => setReviewerArea(e.target.value)}
                        placeholder="e.g., Dhanmondi, Dhaka"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 text-xs text-white border border-slate-700 pr-7"
                      />
                      <button
                        type="button"
                        onClick={handleUseCurrentLocation}
                        title="Use Current Geo Location"
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 5. REVIEW TITLE & IN-DEPTH EXPERIENCE */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Review Headline & Star Rating *
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="p-1 hover:scale-110 transition cursor-pointer"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        s <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Headline (e.g. 'Termite-infested furniture delivered' or 'Accurate diagnosis')"
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 text-xs text-white border border-slate-700 focus:border-indigo-500 focus:outline-none"
            />

            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the exact experience with dates, commitments made, and outcomes..."
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 text-xs text-white border border-slate-700 focus:border-indigo-500 focus:outline-none resize-none"
            />
          </div>

          {/* 6. PROOF / EVIDENCE UPLOAD */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center justify-between">
              <span>Evidence Attachment (Prescription, Receipt, Memo, Chat)</span>
              <span className="text-[10px] text-indigo-400 font-semibold">Priority Badge</span>
            </label>
            <div className="p-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 text-center hover:border-indigo-500/50 transition cursor-pointer">
              <Upload className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
              <div className="text-xs text-slate-300 font-medium">{evidenceName}</div>
              <p className="text-[10px] text-slate-500">Document/Image verification active</p>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-glow flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Publish Category Review & Savage Score</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
