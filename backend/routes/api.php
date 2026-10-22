<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TrueOrbitApiController;

Route::get('/health', [TrueOrbitApiController::class, 'health']);
Route::post('/scan', [TrueOrbitApiController::class, 'scan']);
Route::get('/reviews', [TrueOrbitApiController::class, 'getReviews']);
Route::post('/reviews', [TrueOrbitApiController::class, 'storeReview']);
Route::get('/moderation/queue', [TrueOrbitApiController::class, 'getModerationQueue']);
Route::post('/moderation/action', [TrueOrbitApiController::class, 'moderationAction']);
Route::get('/admin/metrics', [TrueOrbitApiController::class, 'getAdminMetrics']);
