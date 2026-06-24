<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Event;
use App\Models\EventAttendance;
use App\Models\User;

class AdminController extends Controller
{
    public function getSiteOverview() {
        try {
            $totalEvents = Event::count();
            $totalUsers = User::count();
            $totalAttendances = EventAttendance::where('status', 'attended')->count();
            $totalRegistrations = EventAttendance::whereIn('status', ['registered', 'attended'])->count();

            // Registrations over the last 7 days
            $registrationData = EventAttendance::selectRaw('DATE(created_at) as date, COUNT(*) as registrations')
                ->whereIn('status', ['registered', 'attended'])
                ->where('created_at', '>=', now()->subDays(7)) // Last 7 days
                ->groupBy('date')
                ->orderBy('date')
                ->get();

            // Attended events over the last 7 days
            $attendanceData = EventAttendance::selectRaw('DATE(created_at) as date, COUNT(*) as attendances')
                ->where('status', 'attended')
                ->where('created_at', '>=', now()->subDays(7)) // Last 7 days
                ->groupBy('date')
                ->orderBy('date')
                ->get();

            $eventsByCategory = Event::with('category:id,name')
                ->selectRaw('category_id, COUNT(*) as event_count')
                ->groupBy('category_id')
                ->get()
                ->map(function ($item) {
                    return [
                        'category_id' => $item->category_id,
                        'category_name' => $item->category ? $item->category->name : null,
                        'event_count' => $item->event_count,
                    ];
                });

            // Recent events with attendance counts
            $recentEvents = Event::with('category:id,name')
                ->withCount(['eventAttendances as attendances' => function ($query) {
                    $query->whereIn('status', ['attended', 'registered']);
                }])
                ->latest()
                ->take(5)
                ->get(['id', 'title', 'capacity', 'banner_image', 'created_at', 'category_id'])
                ->map(function ($event) {
                    return [
                        'id' => $event->id,
                        'title' => $event->title,
                        'capacity' => $event->capacity,
                        'banner_image' => $event->banner_image,
                        'created_at' => $event->created_at,
                        'category' => $event->category ? $event->category->name : null,
                        'attendances' => $event->attendances, // Using the alias from withCount
                    ];
                });

            $recentAttendances = EventAttendance::with(['user:id,first_name,last_name,profile_image', 'event:id,title'])
                ->where('status', 'attended')
                ->latest()
                ->take(5)
                ->get(['user_id', 'event_id', 'code', 'status', 'created_at'])
                ->map(function ($attendance) {
                    return [
                        'user_id' => $attendance->user_id,
                        'user_fullname' => $attendance->user ? $attendance->user->first_name . ' ' . $attendance->user->last_name : null,
                        'user_profile_image' => $attendance->user ? $attendance->user->profile_image : null,
                        'event_id' => $attendance->event_id,
                        'event_title' => $attendance->event ? $attendance->event->title : null,
                        'code' => $attendance->code,
                        'status' => $attendance->status,
                    ];
                });

            return response()->json([
                'total_events' => $totalEvents,
                'total_users' => $totalUsers,
                'total_attendances' => $totalAttendances,
                'total_registrations' => $totalRegistrations,
                'registration_data' => $registrationData,
                'attendance_data' => $attendanceData,
                'events_by_category' => $eventsByCategory,
                'recent_events' => $recentEvents,
                'recent_attendances' => $recentAttendances,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching site overview: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch site overview',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
