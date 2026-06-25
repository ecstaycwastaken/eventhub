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

    Route::get('/categories', [CategoryController::class, 'getAllCategories'])->name('categories.all');
    
    Route::group(['prefix' => 'auth'], function () {
        // Public auth routes
        Route::post('/signup', [AuthController::class, 'signup'])->name('auth.signup');
        Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
        
        // Protected auth routes
        Route::middleware(['supabase.auth'])->group(function () {
            Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
            Route::get('/me', [AuthController::class, 'getAuthenticatedUser'])->name('auth.me');
        });
    });

    Route::group(['prefix' => 'event'], function () {
        Route::get('/', [EventController::class, 'getAllEvents'])->name('events.all');
        Route::get('/search', [EventController::class, 'searchEvents'])->name('events.search');
    });

    // Private routes that require authentication
    Route::middleware(['supabase.auth'])->prefix('event')->group(function () {
        Route::middleware('role:admin')->group(function () {
            Route::get('/all-events-attendances', [EventController::class, 'getAllEventsAttendances'])->name('events.all-attendance');
        });

        Route::post('/create', [EventController::class, 'createEvent'])->name('events.create');
        Route::post('/register/{id}', [EventController::class, 'registerToEvent'])->name('events.register');
        Route::post('/check-in', [EventController::class, 'checkInEvent'])->name('events.check-in');
        Route::put('/update/{id}', [EventController::class, 'updateEvent'])->name('events.update');
        Route::delete('/delete/{id}', [EventController::class, 'deleteEvent'])->name('events.delete');
        Route::get('/my-events', [EventController::class, 'getMyEvents'])->name('events.my-events');
        Route::get('/registered-events', [EventController::class, 'getRegisteredEvents'])->name('events.registered-events');
        Route::get('/{id}', [EventController::class, 'getEventById'])->name('events.details');
        Route::get('/view-pass/{id}', [EventController::class, 'getEventViewPass'])->name('events.view-pass');
        Route::get('/attendance/{id}', [EventController::class, 'getEventAttendance'])->name('events.attendance');
        Route::get('/my-events/report', [EventController::class, 'getEventsReport'])->name('events.events-report');
        // NOTE: The following route is currently not in use. It was intended to fetch a report for a specific event by its ID, but the implementation has been commented out in the controller.
        // Route::get('/my-events/report/{id}', [EventController::class, 'getEventReport'])->name('events.event-report');
        Route::delete('/attendance/{id}', [EventController::class, 'deleteAttendanceById'])->name('events.delete-attendance');
        Route::delete('/registered-events/{id}', [EventController::class, 'unregisterFromEvent'])->name('events.unregister');
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
        Route::put('/{id}', [CategoryController::class, 'updateCategory'])->name('categories.update');
        Route::delete('/{id}', [CategoryController::class, 'deleteCategory'])->name('categories.delete');
    });

    Route::middleware(['supabase.auth', 'role:admin'])->prefix('admin')->group(function () {
        Route::get('/overview', [AdminController::class, 'getSiteOverview'])->name('admin.overview');
    });
});
