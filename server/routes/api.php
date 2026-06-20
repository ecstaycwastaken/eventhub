<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;

Route::prefix('v1')->group(function () {
    Route::get('/', function () {
        return response()->json([
            'message' => 'Welcome to the EventHub API v1!',
        ]);
    });
    
    Route::group(['prefix' => 'auth'], function () {
        Route::post('/signup', [AuthController::class, 'signup'])->name('auth.signup');
        Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
    });

    Route::middleware(['supabase.auth'])->prefix('event')->group(function () {
        Route::post('/create', [EventController::class, 'createEvent'])->name('events.create');
    });
});
