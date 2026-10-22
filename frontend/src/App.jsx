import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroScanner from './components/HeroScanner';
import ReviewFeed from './components/ReviewFeed';
import SubmitReviewModal from './components/SubmitReviewModal';
import SubAdminPanel from './components/SubAdminPanel';
import AdminPanel from './components/AdminPanel';
import EvidenceLightbox from './components/EvidenceLightbox';
import MobileNav from './components/MobileNav';
import { INITIAL_REVIEWS, PENDING_QUEUE } from './services/initialData';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore'); // explore, subadmin, admin
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);

  // Reviews state
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [pendingQueue, setPendingQueue] = useState(PENDING_QUEUE);

  // Active persona (used to show how account age / category dynamically influences submission)
  const [currentPersona, setCurrentPersona] = useState({
    name: 'Tariqul (Veteran)',
    category: 'tier_veteran',
    socialType: 'facebook',
    accountAgeYears: 9,
    trustScore: 96,
    isNidVerified: true,
    maskedNid: 'NID-***-***-8419'
  });

  const handleAddNewReview = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  const handleVoteHelpful = (reviewId) => {
    setReviews(reviews.map(r => {
      if (r.id === reviewId) {
        return { ...r, helpfulCount: r.helpfulCount + 1 };
      }
      return r;
    }));
  };

  const handleApproveSubAdmin = (id, targetTrustTier) => {
    const item = pendingQueue.find(p => p.id === id);
    if (!item) return;

    const approvedReview = {
      id: `rev-${Date.now()}`,
      category: item.category || 'person',
      categoryLabel: item.categoryLabel || 'Individual / Person',
      target: {
        name: item.targetName || 'Subject Name',
        titleRole: item.titleRole || 'Individual',
        address: item.targetAddress || 'Local Address',
        photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        socialLinks: item.targetSocial ? [{ platform: 'web', label: 'Profile Link', url: item.targetSocial }] : []
      },
      title: item.title,
      description: item.description,
      rating: item.rating,
      savageVerdict: item.savageVerdict || 'WALKING CRIME SCENE 💀',
      howBadScore: item.howBadScore || 90,
      savageRoast: item.savageRoast || 'Community alert verified by Sub-Admin.',
      status: 'approved',
      trustTier: targetTrustTier,
      isAnonymous: item.isAnonymous,
      anonymousDemographics: item.anonymousDemographics || null,
      author: item.author,
      evidence: [
        {
          id: `ev-${Date.now()}`,
          type: 'document',
          title: 'Verified Proof (Approved by Sub-Admin Desk)',
          url: item.evidenceFile,
          verified: true
        }
      ],
      helpfulCount: 1,
      reportedCount: 0,
      createdAt: new Date().toISOString()
    };

    setReviews([approvedReview, ...reviews]);
    setPendingQueue(pendingQueue.filter(p => p.id !== id));
  };

  const handleRejectSubAdmin = (id) => {
    setPendingQueue(pendingQueue.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-8 selection:bg-indigo-500 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentPersona={currentPersona}
        setCurrentPersona={setCurrentPersona}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Body depending on Tab */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <>
            <HeroScanner />
            <ReviewFeed
              reviews={reviews}
              onOpenLightbox={(item) => setLightboxItem(item)}
              onVoteHelpful={handleVoteHelpful}
            />
          </>
        )}

        {activeTab === 'subadmin' && (
          <SubAdminPanel
            pendingQueue={pendingQueue}
            onApprove={handleApproveSubAdmin}
            onReject={handleRejectSubAdmin}
            onOpenLightbox={(item) => setLightboxItem(item)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 mt-12 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-white bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent text-sm">
              SavageTruth
            </span>
            <span>• The Uncensored Truth & Verification Network</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Powered by Laravel 13 API Backend & React Modern UI
          </div>
        </div>
      </footer>

      {/* Review Submission Modal */}
      <SubmitReviewModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitReview={handleAddNewReview}
        currentPersona={currentPersona}
      />

      {/* Evidence Viewer Lightbox */}
      <EvidenceLightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

    </div>
  );
}
