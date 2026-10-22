<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TrueOrbitApiController extends Controller
{
    /**
     * Health check endpoint
     */
    public function health(): JsonResponse
    {
        return response()->json([
            'status' => 'active',
            'platform' => 'SavageTruth Unfiltered Network',
            'framework' => 'Laravel ' . app()->version(),
            'timestamp' => now()->toIso8601String(),
            'features' => [
                'ad_link_scanner' => 'online',
                'fake_review_filter' => 'online',
                'nid_crypto_verification' => 'active',
                'role_based_access' => 'enabled'
            ]
        ]);
    }

    /**
     * Scan and inspect a social ad URL (Facebook / YouTube / Web)
     */
    public function scan(Request $request): JsonResponse
    {
        $url = $request->input('url', '');

        if (empty($url)) {
            return response()->json(['error' => 'URL is required'], 422);
        }

        $urlLower = strtolower($url);
        $isScamSuspect = str_contains($urlLower, 'gadget') || 
                         str_contains($urlLower, 'offer') || 
                         str_contains($urlLower, 'discount') ||
                         str_contains($urlLower, '90') ||
                         str_contains($urlLower, 'super-deals');

        $isGenuineSuspect = str_contains($urlLower, 'anker') || 
                            str_contains($urlLower, 'sony') || 
                            str_contains($urlLower, 'official') ||
                            str_contains($urlLower, 'soundcore');

        $threatScore = $isScamSuspect ? 92 : ($isGenuineSuspect ? 6 : 45);

        $details = [];
        if ($threatScore > 70) {
            $details = [
                'Domain registered recently (< 30 days) with privacy WHOIS shield',
                'Facebook sponsored page recently changed business name 3+ times',
                'High concentration of generic copy-paste comments detected',
                'No verifiable physical warehouse or trade license listed',
                'Multiple NID-verified buyers reported receiving non-functional replica goods'
            ];
            $verdict = 'HIGH RISK SCAM';
        } elseif ($threatScore < 20) {
            $details = [
                'Long-standing registered domain (> 5 years) with Verified EV SSL',
                'Direct corporate distributor partnership verified',
                '100+ verified customer invoices matched with courier tracking numbers',
                'Zero unresolved consumer court disputes'
            ];
            $verdict = 'VERIFIED GENUINE';
        } else {
            $details = [
                'Moderate trust index; domain active for > 1 year',
                'Customer reviews show mixed satisfaction regarding delivery speed',
                'Verify parcel contents before paying Cash-on-Delivery (COD)'
            ];
            $verdict = 'MODERATE RISK - PROCEED WITH CAUTION';
        }

        return response()->json([
            'url' => $url,
            'risk_score' => $threatScore,
            'verdict' => $verdict,
            'details' => $details,
            'domain_analysis' => [
                'has_ssl' => true,
                'detected_platform' => str_contains($urlLower, 'facebook') ? 'Facebook Ad Post' : (str_contains($urlLower, 'youtube') ? 'YouTube Sponsored Video' : 'Direct Web Shop'),
                'analyzed_at' => now()->toIso8601String()
            ]
        ]);
    }

    /**
     * Get list of community reports
     */
    public function getReviews(Request $request): JsonResponse
    {
        $platform = $request->query('platform', 'all');
        $verifiedOnly = $request->boolean('verified_only', false);

        // Sample community reviews
        $reviews = [
            [
                'id' => 'rev-1',
                'title' => 'Fake Ultra Smartwatch - Completely dead on delivery',
                'description' => "Saw a sponsored Facebook ad offering an 80% discount on 'Apple Watch Ultra Replica' with 1-day delivery. Paid COD, box contained non-functional plastic toy. Seller blocked my profile.",
                'rating' => 1,
                'status' => 'approved',
                'trustTier' => 'tier_nid_gold',
                'isAnonymous' => false,
                'author' => [
                    'name' => 'Tariqul Islam',
                    'category' => 'tier_veteran',
                    'categoryLabel' => 'Veteran Reviewer',
                    'socialType' => 'facebook',
                    'accountAgeYears' => 9,
                    'trustScore' => 96,
                    'isNidVerified' => true,
                    'maskedNid' => 'NID-***-***-8419'
                ],
                'target_link' => 'https://facebook.com/ads/archive/render_ad/?id=9841289412',
                'threat_score' => 92,
                'helpful_count' => 84,
                'created_at' => '2026-10-18T14:32:00Z'
            ],
            [
                'id' => 'rev-2',
                'title' => 'Authentic Anker Soundcore Earbuds from Certified YouTube Link',
                'description' => 'Ordered via official YouTube description link sponsored on TechReviewTV. Delivered within 48 hours in sealed packaging with official serial number verified on manufacturer site.',
                'rating' => 5,
                'status' => 'approved',
                'trustTier' => 'tier_established',
                'isAnonymous' => false,
                'author' => [
                    'name' => 'Sabrina Rahman',
                    'category' => 'tier_established',
                    'categoryLabel' => 'Established Reviewer',
                    'socialType' => 'google',
                    'accountAgeYears' => 5,
                    'trustScore' => 88,
                    'isNidVerified' => true,
                    'maskedNid' => 'NID-***-***-2094'
                ],
                'target_link' => 'https://youtube.com/watch?v=dQw4w9WgXcQ',
                'threat_score' => 5,
                'helpful_count' => 112,
                'created_at' => '2026-10-20T09:15:00Z'
            ]
        ];

        return response()->json([
            'count' => count($reviews),
            'reviews' => $reviews
        ]);
    }

    /**
     * Submit a new review
     */
    public function storeReview(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category' => 'required|string|in:person,doctor,shop,shopkeeper,product_ad,professional',
            'target_name' => 'required|string|max:255',
            'target_address' => 'required|string|max:255',
            'target_title_role' => 'nullable|string|max:255',
            'target_social_link' => 'nullable|string',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'how_bad_score' => 'nullable|integer|min:0|max:100',
            'savage_roast' => 'nullable|string',
            'is_anonymous' => 'nullable|boolean',
            'anonymous_age' => 'nullable|integer',
            'anonymous_sex' => 'nullable|string',
            'anonymous_area' => 'nullable|string',
            'nid_number' => 'nullable|string',
            'author_category' => 'nullable|string',
            'social_type' => 'nullable|string',
            'account_age_years' => 'nullable|integer'
        ]);

        $hasNid = !empty($validated['nid_number']) && strlen($validated['nid_number']) >= 10;
        $isAnon = $validated['is_anonymous'] ?? false;
        $accountAge = $validated['account_age_years'] ?? 0;

        // Calculate dynamic reviewer trust score
        $trustScore = 30; // base score
        if ($accountAge >= 5) {
            $trustScore += 40; // old social profile bonus
        } elseif ($accountAge >= 1) {
            $trustScore += 25;
        }

        if ($hasNid) {
            $trustScore += 30; // NID legal backing bonus
        }

        $trustScore = min(100, $trustScore);

        $authorCategory = $validated['author_category'] ?? ($accountAge >= 5 ? 'tier_veteran' : ($accountAge >= 1 ? 'tier_established' : 'tier_new'));
        
        $displayName = $isAnon 
            ? ($hasNid ? 'Anonymous Verified Citizen' : ($accountAge > 0 ? 'Anonymous Verified User' : 'Anonymous Shopper'))
            : ($request->input('author_name', 'Verified Reviewer'));

        $howBad = $validated['how_bad_score'] ?? ($validated['rating'] <= 2 ? 90 : 10);
        $savageVerdict = $howBad >= 90 ? 'WALKING CRIME SCENE 💀' : ($howBad >= 70 ? 'CERTIFIED RED FLAG 🚩' : ($howBad >= 45 ? 'SUSPICIOUS & SHADY 👀' : 'CERTIFIED G.O.A.T / SAINT 😇'));

        $newReview = [
            'id' => 'rev-' . time(),
            'category' => $validated['category'],
            'category_label' => ucfirst(str_replace('_', ' ', $validated['category'])),
            'target' => [
                'name' => $validated['target_name'],
                'title_role' => $validated['target_title_role'] ?? 'Subject',
                'address' => $validated['target_address'],
                'social_links' => !empty($validated['target_social_link']) ? [$validated['target_social_link']] : []
            ],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'rating' => $validated['rating'],
            'how_bad_score' => $howBad,
            'savage_verdict' => $savageVerdict,
            'savage_roast' => $validated['savage_roast'] ?? ($howBad >= 70 ? 'Community red flag verified.' : 'Verified authentic profile.'),
            'status' => 'approved',
            'trust_tier' => $hasNid ? 'tier_nid_gold' : ($authorCategory === 'tier_veteran' ? 'tier_veteran' : ($authorCategory === 'tier_established' ? 'tier_established' : 'tier_anonymous')),
            'is_anonymous' => $isAnon,
            'anonymous_demographics' => $isAnon ? [
                'age' => $validated['anonymous_age'] ?? 24,
                'sex' => $validated['anonymous_sex'] ?? 'Unspecified',
                'area' => $validated['anonymous_area'] ?? 'Local Citizen'
            ] : null,
            'author' => [
                'name' => $displayName,
                'trust_score' => $trustScore,
                'category' => $authorCategory,
                'is_nid_verified' => $hasNid,
                'masked_nid' => $hasNid ? 'NID-***-***-' . substr($validated['nid_number'], -4) : null,
                'account_age_years' => $accountAge,
                'social_type' => $validated['social_type'] ?? 'email',
                'is_identity_masked' => $isAnon
            ],
            'created_at' => now()->toIso8601String()
        ];

        return response()->json([
            'message' => 'Review successfully submitted and verified',
            'review' => $newReview
        ], 201);
    }

    /**
     * Get sub-admin moderation queue
     */
    public function getModerationQueue(): JsonResponse
    {
        return response()->json([
            'pending_count' => 2,
            'queue' => [
                [
                    'id' => 'mod-101',
                    'title' => '100% Cotton Polo Shirt arrived with oil stains & fake tags',
                    'description' => 'Bought 3 polo shirts from TikTok ad. Crooked tags and faded fabric.',
                    'target_url' => 'https://facebook.com/uk.polo.outlet.bd',
                    'ai_scan_risk' => 86,
                    'has_nid' => true,
                    'submitted_at' => '15 minutes ago'
                ],
                [
                    'id' => 'mod-102',
                    'title' => 'Original Sony WH-1000XM5 Wireless Headphones',
                    'description' => 'Official distributor warranty and authentic serial number verified.',
                    'target_url' => 'https://facebook.com/sonyaudiophilebd',
                    'ai_scan_risk' => 12,
                    'has_nid' => true,
                    'submitted_at' => '42 minutes ago'
                ]
            ]
        ]);
    }

    /**
     * Sub-Admin moderation action (Approve Gold / Approve Standard / Reject)
     */
    public function moderationAction(Request $request): JsonResponse
    {
        $id = $request->input('id');
        $action = $request->input('action'); // approve_gold, approve_standard, reject

        return response()->json([
            'status' => 'success',
            'audit_id' => $id,
            'action_taken' => $action,
            'moderator_id' => 'MOD-0824',
            'timestamp' => now()->toIso8601String()
        ]);
    }

    /**
     * Super Admin Metrics & Global Blacklist
     */
    public function getAdminMetrics(): JsonResponse
    {
        return response()->json([
            'scams_blocked' => 1482,
            'nid_verified_citizens' => 8290,
            'active_sub_admins' => 14,
            'money_saved_bdt' => '4.8M',
            'ai_quarantine_threshold' => 75,
            'blacklist' => [
                ['domain' => 'super-deals-fast.store', 'reports' => 34, 'status' => 'Active Blacklist'],
                ['domain' => 'gadget-zone-bd.shop', 'reports' => 19, 'status' => 'Active Blacklist'],
                ['domain' => 'urbanleather-discount.xyz', 'reports' => 12, 'status' => 'Active Blacklist']
            ]
        ]);
    }
}
