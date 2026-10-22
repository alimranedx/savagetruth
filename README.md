# savagetruth

# 🔥 SavageTruth — The Unfiltered Truth & Verification Network

SavageTruth is an **eye-catching, ultra-modern, 100% mobile-friendly review & verification platform** designed to unfilter reviews for **Doctors, Contractors, Individuals, Showrooms, Shopkeepers, and Social Media Ads (Facebook / TikTok / YouTube)** with real evidence and a savage youth roast meter.

Built specifically on an **API-first architecture** with **Laravel 13** on the backend and **React 18 + Tailwind CSS** on the frontend, allowing the exact same REST endpoints to power your future mobile application (React Native / Flutter).

---

## 🌟 Key Features

1. **AI Ad Link Scanner (Facebook & YouTube)**
   - Paste any Facebook Ad post, YouTube video URL, or Shopify domain.
   - Computes an automated **Threat Risk Score (0–100%)**, audits domain creation age, page name change history, and flags stolen media.

2. **Hierarchical User Categories & Account Authenticity Engine**
   - 👑 **Veteran Reviewer:** Aged Facebook profile (5–10 years) or aged Google account + real activity signals. Receives immediate publishing and highest ranking priority.
   - 🔷 **Established User:** Active Google or Facebook profile (> 1 year).
   - ⚪ **Anonymous Shopper:** 100% private submission mode, protecting the reviewer from seller retaliation while still checking device fingerprints to prevent spam.
   - 🏆 **National ID (NID) Gold Verification:** Reviewers can optionally encrypt their NID number to receive the highest legal evidence verification badge (`Verified Citizen`).

3. **Sub-Admin Moderation Queue**
   - Side-by-side workspace for moderators to inspect uploaded Cash-on-Delivery (COD) courier waybills, tracking slips, and unboxing media.
   - 1-click approvals for Gold NID badges or Standard verification.

4. **Super Admin Governance Portal**
   - Global blacklist manager for rogue Facebook pages and scam domains.
   - Dynamic AI threat quarantine threshold slider.
   - Platform health metrics: money saved, scam reports resolved, and active sub-admins.

---

## 📂 Project Architecture

```
C:\laragon\www\trueorbit\
├── backend/                  # Laravel 13 API Backend
│   ├── app/Http/Controllers/
│   │   └── TrueOrbitApiController.php  # Core REST API Controller
│   ├── routes/
│   │   ├── api.php           # REST API Routes (/api/scan, /api/reviews, /api/moderation)
│   │   └── web.php           # Serves SPA & static assets
│   ├── database/
│   │   └── database.sqlite   # SQLite Zero-Config Database
│   └── public/               # Production-ready React bundle & assets
├── frontend/                 # React Modern UI (Vite + Tailwind CSS + Lucide Icons)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Header & identity persona switcher
│   │   │   ├── HeroScanner.jsx       # Interactive Ad URL Scanner HUD
│   │   │   ├── ReviewFeed.jsx        # Community reports & verified badges
│   │   │   ├── SubmitReviewModal.jsx # Multi-step submission wizard
│   │   │   ├── SubAdminPanel.jsx     # Moderation desk & evidence inspector
│   │   │   ├── AdminPanel.jsx        # Global analytics & domain blacklist
│   │   │   ├── EvidenceLightbox.jsx  # High-res photo & receipt viewer
│   │   │   └── MobileNav.jsx         # 100% Mobile bottom app navigation
│   │   ├── services/
│   │   └── App.jsx
│   └── dist/                 # Compiled assets
└── start.bat                 # One-click dual server launcher
```

---

## 🚀 How to Run

### Option 1: Quick Launch
Double-click `start.bat` in `C:\laragon\www\trueorbit\start.bat`.

### Option 2: Running via Terminal
1. **Start Laravel 13 API:**
   ```bash
   cd C:\laragon\www\trueorbit\backend
   php artisan serve --port=8000
   ```
2. **Start React Frontend:**
   ```bash
   cd C:\laragon\www\trueorbit\frontend
   npm run dev
   ```
   Open `http://localhost:3000` in your mobile or desktop browser.

### Option 3: Laragon Native Virtual Host
In Laragon, navigate directly to:
`http://trueorbit.test/backend/public`

---

## 🔌 API Endpoints for Future Mobile App (React Native / Flutter)

All endpoints output clean JSON and are ready for mobile consumption:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Network status and Laravel 13 framework info |
| `POST` | `/api/scan` | Submits Facebook/YouTube URL and returns Threat Index & audit breakdown |
| `GET` | `/api/reviews` | Retrieves community reviews (filterable by platform & NID status) |
| `POST` | `/api/reviews` | Posts review with social links, evidence, and NID encryption |
| `GET` | `/api/moderation/queue` | Returns pending verification cases for Sub-Admins |
| `POST` | `/api/moderation/action`| Approves or rejects evidence with audit log |
| `GET` | `/api/admin/metrics` | Super admin statistics and active domain bans |
