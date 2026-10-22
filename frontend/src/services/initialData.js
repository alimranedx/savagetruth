export const INITIAL_REVIEWS = [
  {
    id: "rev-top-1",
    category: "person",
    categoryLabel: "Individual / Person",
    target: {
      name: "Rafiqul 'Rafi' Anam",
      titleRole: "Freelance Interior Contractor",
      address: "Sector 11, Uttara, Dhaka",
      district: "Dhaka",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      socialLinks: [
        { platform: "facebook", label: "FB Profile", url: "https://facebook.com/rafiqul.anam.interior" },
        { platform: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/rafiqul-anam" },
        { platform: "phone", label: "+880 1711-***892", url: "tel:+8801711000892" }
      ]
    },
    title: "Took ৳1,50,000 Advance for Kitchen Cabinet & Ghosted for 3 Months",
    description: "Signed a 30-day interior decoration contract for my new apartment. He took 50% advance payment in cash and bank transfer, sent 2 cheap wooden boards, and stopped answering calls. Later found out he did the exact same scam to 3 other flat owners in the same building.",
    rating: 1,
    status: "approved",
    trustTier: "tier_nid_gold",
    isAnonymous: true,
    anonymousDemographics: {
      age: 29,
      sex: "Male",
      district: "Dhaka",
      area: "Uttara Sector 11 (Live Location Verified)"
    },
    author: {
      name: "Anonymous Verified Citizen",
      avatar: null,
      category: "tier_veteran",
      categoryLabel: "Veteran Reviewer",
      socialType: "facebook",
      accountAgeYears: 8,
      trustScore: 98,
      isNidVerified: true,
      maskedNid: "NID-***-***-8419",
      isIdentityMasked: true
    },
    savageVerdict: "FINAL BOSS GHOSTER 👻",
    howBadScore: 98,
    savageRoast: "Bro took the advance money and unlocked invisibility mode. Zero work, 100% excuses.",
    evidence: [
      {
        id: "ev-p1",
        type: "contract",
        title: "Signed Work Agreement & Bank Transfer Slip (৳1.5L)",
        url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
        verified: true
      },
      {
        id: "ev-p2",
        type: "chat",
        title: "WhatsApp Chat: 47 unanswered calls & blocked status",
        url: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&auto=format&fit=crop&q=80",
        verified: true
      }
    ],
    helpfulCount: 142,
    reportedCount: 0,
    createdAt: "2026-10-21T10:15:00Z"
  },
  {
    id: "rev-top-2",
    category: "doctor",
    categoryLabel: "Doctor / Healthcare",
    target: {
      name: "Dr. K. M. Farhan Chowdhury",
      titleRole: "Consultant Orthopedic Surgeon",
      address: "Chamber: Central Specialized Hospital, Green Road, Dhanmondi",
      district: "Dhaka",
      photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80",
      socialLinks: [
        { platform: "facebook", label: "Medical Page", url: "https://facebook.com/dr.farhanchowdhury" },
        { platform: "bmdc", label: "BMDC Reg #A-48192", url: "https://bmdc.org.bd" }
      ]
    },
    title: "Outstanding Diagnosis & Saved My Father from Unnecessary Spine Surgery",
    description: "Another private clinic told us my father needed an immediate 4-lakh taka spinal surgery. Dr. Farhan reviewed the MRI patiently for 25 minutes, recommended conservative physiotherapy and 2 medications. Within 6 weeks, my father is walking completely pain-free. Rare to see such honest doctors today.",
    rating: 5,
    status: "approved",
    trustTier: "tier_established",
    isAnonymous: false,
    author: {
      name: "Sabrina Rahman",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
      category: "tier_established",
      categoryLabel: "Established Reviewer",
      socialType: "google",
      accountAgeYears: 5,
      trustScore: 92,
      isNidVerified: true,
      maskedNid: "NID-***-***-2094",
      isIdentityMasked: false
    },
    savageVerdict: "CERTIFIED HEALER & G.O.A.T 😇",
    howBadScore: 2,
    savageRoast: "Actual superhero in a lab coat. Rejected a 4-lakh hospital bill to tell the truth. Massive respect.",
    evidence: [
      {
        id: "ev-d1",
        type: "prescription",
        title: "Official Consultation Prescription & Follow-up MRI Log",
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
        verified: true
      }
    ],
    helpfulCount: 230,
    reportedCount: 0,
    createdAt: "2026-10-20T16:40:00Z"
  },
  {
    id: "rev-top-3",
    category: "shopkeeper",
    categoryLabel: "Shopkeeper / Salesperson",
    target: {
      name: "Tanvir Ahmed",
      titleRole: "Senior Flagship Smartphone Specialist",
      address: "Samsung Experience Store, Level 6, Bashundhara City",
      district: "Dhaka",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      socialLinks: [
        { platform: "facebook", label: "FB Profile", url: "https://facebook.com/tanvir.samsungbd" },
        { platform: "linkedin", label: "LinkedIn: Tanvir Sales", url: "https://linkedin.com/in/tanvir-retail" }
      ]
    },
    title: "5 Years at Samsung Showroom with 0 Customer Complaints - True Expert",
    description: "Shop owner and customer perspective: Tanvir has handled over 10,000 customers with zero cash discrepancies or fraudulent promises. When I bought my S24 Ultra, he spent 45 minutes transferring all WhatsApp chats and data securely. Any electronics employer should hire him with eyes closed.",
    rating: 5,
    status: "approved",
    trustTier: "tier_veteran",
    isAnonymous: false,
    author: {
      name: "Kazi Moinuddin (Store Partner)",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      category: "tier_veteran",
      categoryLabel: "Retail Owner",
      socialType: "facebook",
      accountAgeYears: 10,
      trustScore: 99,
      isNidVerified: true,
      maskedNid: "NID-***-***-9921",
      isIdentityMasked: false
    },
    savageVerdict: "TOP-TIER SALES LEGEND 👑",
    howBadScore: 0,
    savageRoast: "Never lied about specs, never oversold insurance, pure honesty. Protect this man at all costs.",
    evidence: [
      {
        id: "ev-sk1",
        type: "store_badge",
        title: "5-Year Integrity & Customer Excellence Award",
        url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
        verified: true
      }
    ],
    helpfulCount: 189,
    reportedCount: 0,
    createdAt: "2026-10-19T11:20:00Z"
  },
  {
    id: "rev-top-4",
    category: "shop",
    categoryLabel: "Shop / Showroom",
    target: {
      name: "Apex Furnishings & Luxury Decor",
      titleRole: "Furniture & Interior Showroom",
      address: "Holding 42, Pragati Sarani, Kuril Chowrasta",
      district: "Dhaka",
      photo: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&auto=format&fit=crop&q=80",
      socialLinks: [
        { platform: "facebook", label: "FB Page (80k likes)", url: "https://facebook.com/apexfurnishingsbd" },
        { platform: "website", label: "Store Website", url: "https://apexfurnishings.store" }
      ]
    },
    title: "Promised Solid Teak Wood, Delivered Termite-Infested Particle Board",
    description: "Paid ৳85,000 for a 6-seater 'Solid Chittagong Teak' dining table. When the delivery arrived 3 weeks late, the underside was cheap MDF cardboard covered with faux wood sticker. Within 2 weeks, beetles and termites came out. Manager refused refund and threatened us.",
    rating: 1,
    status: "approved",
    trustTier: "tier_nid_gold",
    isAnonymous: true,
    anonymousDemographics: {
      age: 34,
      sex: "Female",
      district: "Dhaka",
      area: "Bashundhara R/A"
    },
    author: {
      name: "Anonymous Verified Citizen",
      avatar: null,
      category: "tier_established",
      categoryLabel: "Established Reviewer",
      socialType: "google",
      accountAgeYears: 6,
      trustScore: 94,
      isNidVerified: true,
      maskedNid: "NID-***-***-3301",
      isIdentityMasked: true
    },
    savageVerdict: "CERTIFIED RED FLAG TRAP 🚩",
    howBadScore: 94,
    savageRoast: "Teak wood on Facebook, cardboard puzzle in real life. Even the termites were disappointed.",
    evidence: [
      {
        id: "ev-s1",
        type: "invoice",
        title: "Cash Memo #APX-482 showing 'Solid Teak' specification",
        url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
        verified: true
      },
      {
        id: "ev-s2",
        type: "product_photo",
        title: "Peeling vinyl sticker exposing hollow cardboard",
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
        verified: true
      }
    ],
    helpfulCount: 97,
    reportedCount: 0,
    createdAt: "2026-10-18T18:00:00Z"
  },
  {
    id: "rev-top-5",
    category: "product_ad",
    categoryLabel: "Online Product / Social Ad",
    target: {
      name: "Apple Watch Ultra Clone (GadgetZone BD)",
      titleRole: "Sponsored Facebook Ad Campaign",
      address: "Warehouse: Anonymous Mirpur 10 / Drop-shipper",
      district: "Dhaka",
      photo: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=200&auto=format&fit=crop&q=80",
      socialLinks: [
        { platform: "facebook", label: "FB Sponsored Post", url: "https://facebook.com/ads/archive/render_ad/?id=9841289412" },
        { platform: "facebook", label: "FB Page: GadgetZone", url: "https://facebook.com/gadgetzonebd.official" }
      ]
    },
    title: "Fake Smartwatch - Completely dead on delivery & instant block",
    description: "Saw an 80% off Facebook ad video. When courier arrived and I paid COD, the box contained a 50-taka plastic toy watch with sticker clock hands. Seller blocked profile on Messenger within 2 minutes of reporting.",
    rating: 1,
    status: "approved",
    trustTier: "tier_nid_gold",
    isAnonymous: false,
    author: {
      name: "Tariqul Islam",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      category: "tier_veteran",
      categoryLabel: "Veteran Reviewer",
      socialType: "facebook",
      accountAgeYears: 9,
      trustScore: 96,
      isNidVerified: true,
      maskedNid: "NID-***-***-8419",
      isIdentityMasked: false
    },
    savageVerdict: "WALKING CRIME SCENE 💀",
    howBadScore: 99,
    savageRoast: "Promised Apple Watch Ultra, delivered kindergarten toy. Battery lasted negative 5 seconds.",
    evidence: [
      {
        id: "ev-ad1",
        type: "courier_slip",
        title: "Steadfast Courier COD Slip & Tracking #492810",
        url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
        verified: true
      }
    ],
    helpfulCount: 168,
    reportedCount: 0,
    createdAt: "2026-10-18T14:32:00Z"
  }
];

export const PENDING_QUEUE = [
  {
    id: "mod-201",
    category: "person",
    categoryLabel: "Individual",
    title: "Ex-employee ran away with shop's mobile stock & deleted sales ledger",
    description: "Hired salesman who left without 30-day notice period and took 4 boxed iPhones.",
    rating: 1,
    status: "pending",
    trustTier: "tier_nid_gold",
    isAnonymous: true,
    anonymousDemographics: {
      age: 41,
      sex: "Male",
      district: "Chittagong",
      area: "GEC Circle"
    },
    targetName: "Shakil Hossain (Ex-Salesman)",
    targetAddress: "Agrabad, Chittagong",
    targetSocial: "https://facebook.com/shakil.hossain.sales",
    author: {
      name: "Anonymous Verified Citizen",
      avatar: null,
      category: "tier_veteran",
      categoryLabel: "Veteran Reviewer",
      socialType: "facebook",
      accountAgeYears: 9,
      trustScore: 97,
      isNidVerified: true,
      maskedNid: "NID-***-***-7120"
    },
    savageVerdict: "TOTAL MENACE 💀",
    howBadScore: 96,
    savageRoast: "Speedran getting hired, stealing inventory, and disappearing in 48 hours.",
    evidenceFile: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    submittedAt: "10 minutes ago",
    aiScanRisk: 91
  }
];
