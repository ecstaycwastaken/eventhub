<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;

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
        Route::get('/search', [EventController::class, 'searchEvents'])->name('events.search');
    });

    // Private routes that require authentication
    Route::middleware(['supabase.auth'])->prefix('event')->group(function () {
        Route::post('/create', [EventController::class, 'createEvent'])->name('events.create');
        Route::post('/register/{id}', [EventController::class, 'registerToEvent'])->name('events.register');
        Route::post('/check-in', [EventController::class, 'checkInEvent'])->name('events.check-in');
        Route::put('/update/{id}', [EventController::class, 'updateEvent'])->name('events.update');
        Route::delete('/delete/{id}', [EventController::class, 'deleteEvent'])->name('events.delete');
        Route::get('/my-events', [EventController::class, 'getMyEvents'])->name('events.my-events');
        Route::get('/{id}', [EventController::class, 'getEventById'])->name('events.details');
        Route::get('/view-pass/{id}', [EventController::class, 'getEventViewPass'])->name('events.view-pass');
        Route::get('/attendance/{id}', [EventController::class, 'getEventAttendance'])->name('events.attendance');
        Route::get('/my-events/report', [EventController::class, 'getEventsReport'])->name('events.events-report');
        Route::get('/my-events/report/{id}', [EventController::class, 'getEventReport'])->name('events.event-report');
    });

    Route::middleware(['supabase.auth'])->prefix('user')->group(function () {
        Route::get('/me', [UserController::class, 'getMyProfile'])->name('users.profile');
        Route::put('/edit/{id}', [UserController::class, 'editUser'])->name('users.edit');

        // Admin-only user management routes
        Route::middleware('role:admin')->group(function () {
            Route::get('/', [UserController::class, 'getAllUsers'])->name('users.all');
            Route::get('/{id}', [UserController::class, 'getUserById'])->name('users.details');
            Route::delete('/{id}', [UserController::class, 'deleteUser'])->name('users.delete');
        });
    });

    // Strictly for admin users
    Route::middleware(['supabase.auth', 'role:admin'])->prefix('categories')->group(function () {
        Route::post('/', [CategoryController::class, 'createCategory'])->name('categories.create');
        Route::get('/', [CategoryController::class, 'getAllCategories'])->name('categories.read');
        Route::put('/{id}', [CategoryController::class, 'updateCategory'])->name('categories.update');
        Route::delete('/{id}', [CategoryController::class, 'deleteCategory'])->name('categories.delete');
    });

    Route::middleware(['supabase.auth', 'role:admin'])->prefix('admin')->group(function () {
        Route::get('/overview', [AdminController::class, 'getSiteOverview'])->name('admin.overview');
    });
});
