<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;

Route::prefix('v1')->group(function () {
    // Public routes that do not require authentication
    Route::get('/', function () {
        return response()->json([
            'message' => 'Welcome to the EventHub API v1!',
        ]);
    });
    
    Route::group(['prefix' => 'auth'], function () {
        Route::post('/signup', [AuthController::class, 'signup'])->name('auth.signup');
        Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
    });

    Route::group(['prefix' => 'event'], function () {
        Route::get('/', [EventController::class, 'getAllEvents'])->name('events.all');
    });

    // Private routes that require authentication
    Route::middleware(['supabase.auth'])->prefix('event')->group(function () {
        Route::post('/create', [EventController::class, 'createEvent'])->name('events.create');
        Route::post('/register/{id}', [EventController::class, 'registerToEvent'])->name('events.register');
        Route::post('/check-in', [EventController::class, 'checkInEvent'])->name('events.check-in');
        Route::put('/update/{id}', [EventController::class, 'updateEvent'])->name('events.update');
        Route::delete('/delete/{id}', [EventController::class, 'deleteEvent'])->name('events.delete');
        Route::get('/{id}', [EventController::class, 'getEventById'])->name('events.details');
        Route::get('/my-events', [EventController::class, 'getMyEvents'])->name('events.my-events');
        Route::get('/view-pass/{id}', [EventController::class, 'getEventViewPass'])->name('events.view-pass');
    });
});
