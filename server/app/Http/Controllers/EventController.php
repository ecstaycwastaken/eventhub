<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Event;
use App\Models\EventAttendance;

class EventController extends Controller
{
    public function createEvent(Request $request) {
        // Start a database transaction to ensure atomicity
        DB::beginTransaction();

        try {
            // Validate the incoming request data
            $request->validate([
                'title' => 'required|string',
                'description' => 'required|string',
                'category' => 'required|exists:event_categories,id',
                'date' => 'required|date',
                'venue' => 'required|string',
                'capacity' => 'required|integer',
                'price' => 'required|numeric',
            ]);

            $user = $request->user();
            $bannerUrl = null;

            if ($request->hasFile('banner_image') && $request->file('banner_image')->isValid()) {
                $file = $request->file('banner_image');
                
                // Generate a unique filename for the banner image
                $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();

                try {
                    Storage::disk('supabase')->putFileAs(
                        '', // Path inside the bucket root
                        $file,
                        $fileName,
                        'public'
                    );

                    $bannerUrl = rtrim(env('SUPABASE_STORAGE_URL'), '/') . '/' . $fileName;
                } catch (\Exception $e) {
                    Log::error('Error uploading banner image: ' . $e->getMessage());
                    return response()->json(['message' => 'Failed to upload banner image.', 'error' => $e->getMessage()], 500);
                }
            }

            // Create the event using the validated data
            $event = Event::create([
                'title' => $request->title,
                'description' => $request->description,
                'date' => $request->date,
                'venue' => $request->venue,
                'user_id' => $user->id,
                'category_id' => $request->category,
                'capacity' => $request->capacity,
                'price' => $request->price,
                'banner_image' => $bannerUrl
            ]);

            // Create a new event attendance record for the event creator
            EventAttendance::create([
                'user_id' => $user->id,
                'event_id' => $event->id,
                'status' => 'host',
                'code' => Str::random(16),
            ]);

            DB::commit(); // Commit the transaction if everything is successful

            return response()->json($event, 201);
        } catch (\Exception $e) {
            DB::rollBack(); // Roll back the transaction in case of any errors
            Log::error('Error creating event: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to create event.', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateEvent(Request $request, string $id) {
        try {
            $event = Event::findOrFail($id);

            // Check if the authenticated user is the host of the event
            $user = $request->user();
            $attendance = EventAttendance::where('event_id', $id)->where('user_id', $user->id)->first();

            // Allow update if the user is the host or has an admin role
            $authorized = ($attendance && $attendance->isEventHost()) || $request->user()->role === 'admin';
            if (!$authorized) {
                return response()->json(['message' => 'Unauthorized. Only the event host or admin can update this event.'], 403);
            }

            // Validate the incoming request data
            $request->validate([
                'title' => 'sometimes|required|string',
                'description' => 'sometimes|required|string',
                'category' => 'sometimes|required|exists:event_categories,id',
                'date' => 'sometimes|required|date',
                'venue' => 'sometimes|required|string',
                'capacity' => 'sometimes|required|integer',
                'price' => 'sometimes|required|numeric',
            ]);

            $bannerUrl = $event->banner_image;

            if ($request->hasFile('banner_image') && $request->file('banner_image')->isValid()) {
                $file = $request->file('banner_image');
                
                // Generate a unique filename for the banner image
                $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();

                try {
                    // If there's an existing banner image, delete it
                    if ($event->banner_image) {
                        $existingFileName = basename($event->banner_image);
                        Storage::disk('supabase')->delete($existingFileName);
                    }

                    Storage::disk('supabase')->putFileAs(
                        '', // Path inside the bucket root
                        $file,
                        $fileName,
                        'public'
                    );

                    $bannerUrl = rtrim(env('SUPABASE_STORAGE_URL'), '/') . '/' . $fileName;
                } catch (\Exception $e) {
                    Log::error('Error uploading banner image: ' . $e->getMessage());
                    return response()->json(['message' => 'Failed to upload banner image.', 'error' => $e->getMessage()], 500);
                }
            }

            // Update the event with the validated data
            $event->update($request->only(['title', 'description', 'category', 'date', 'venue', 'capacity', 'price']) + ['banner_image' => $bannerUrl]);

            return response()->json($event);
        } catch (\Exception $e) {
            Log::error('Error updating event: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update event.', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteEvent(Request $request, string $id) {
        try {
            $event = Event::findOrFail($id);

            // Check if the authenticated user is the host of the event
            $user = $request->user();
            $attendance = EventAttendance::where('event_id', $id)->where('user_id', $user->id)->first();

            // Allow deletion if the user is the host or has an admin role
            $authorized = ($attendance && $attendance->isEventHost()) || $user->role === 'admin';
            if (!$authorized) {
                return response()->json(['message' => 'Unauthorized. Only the event host or admin can delete this event.'], 403);
            }

            // Delete the event and its related attendances
            $event->delete();

            return response()->json(['message' => 'Event deleted successfully.']);
        } catch (\Exception $e) {
            Log::error('Error deleting event: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to delete event.', 'error' => $e->getMessage()], 500);
        }
    }

    public function registerToEvent(Request $request, string $id) {
        try {
            $user = $request->user();
            $event = Event::findOrFail($id);

            // Check if the user is already registered for the event
            if (EventAttendance::where('user_id', $user->id)->where('event_id', $id)->exists()) {
                return response()->json(['message' => 'You are already registered for this event.'], 400);
            }

            // Check if the event has reached its capacity
            $currentAttendees = EventAttendance::where('event_id', $id)->count();
            if ($currentAttendees >= $event->capacity) {
                return response()->json(['message' => 'This event has reached its capacity.'], 400);
            }

            // Register the user for the event
            EventAttendance::create([
                'user_id' => $user->id,
                'event_id' => $id,
                'status' => 'registered',
                'code' => Str::random(16),
            ]);

            return response()->json(['message' => 'Successfully registered for the event.']);
        } catch (\Exception $e) {
            Log::error('Error registering to event: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to register for the event.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getEventById(Request $request, string $id) {
        try {
            $user = $request->user();

            // Fetch the event along with its category and the number of attendees
            $event = Event::with(['category' => function ($query) {
                $query->select('id', 'name', 'color');
            }])->findOrFail($id);
            $event->host_name = $event->getEventHost();
            $event->attendees_count = EventAttendance::where('event_id', $id)->count();

            // Check current user registration status for the event
            $eventAttendance = EventAttendance::where('event_id', $id)->where('user_id', $user->id)->first();
            $event->user_status = $eventAttendance ? $eventAttendance->status : 'not_registered';

            return response()->json($event);
        } catch (\Exception $e) {
            Log::error('Error fetching event details: ' . $e->getMessage());
            return response()->json(['message' => "Failed to fetch event details.", 'error'=> $e->getMessage()], 500);
        }
    }

    public function getAllEvents() {
        try {
            // Fetch all events along with their categories
            $events = Event::with('category')->get();
            return response()->json($events);
        } catch (\Exception $e) {
            Log::error('Error fetching events: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch events.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getMyEvents(Request $request) {
        try {
            $user = $request->user();

            // Fetch the events created by the user along with their categories
            $events = Event::where('user_id', $user->id)->with('category')->get();
            $events->each(function($event) {
                $event->host_name = $event->getEventHost();
                $event->attendees_count = $event->eventAttendances()->where('status', 'registered')->count();
            });

            // Return success whether the user has events or not, along with the events data
            return response()->json([
                'hasEvents' => !$events->isEmpty(),
                'events' => $events,
                'total_events' => $events->count(),
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching my events: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch events.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getRegisteredEvents(Request $request) {
        try {
            $user = $request->user();

            // Fetch the events the user is registered for along with their categories
            $events = Event::whereHas('eventAttendances', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->with('category')->get();

            // Return success whether the user has registered events or not, along with the events data
            return response()->json([
                'hasRegisteredEvents' => !$events->isEmpty(),
                'events' => $events
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching registered events: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch registered events.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getEventViewPass(Request $request, string $id) {
        try {
            $user = $request->user();

            // Fetch the event attendance record for the user and event
            $attendance = EventAttendance::with(['event' => function ($query) {
                $query->select('id', 'title', 'date', 'venue', 'banner_image');
            }])->where('event_id', $id)->where('user_id', $user->id)->first();

            if (!$attendance) {
                return response()->json(['message' => 'You are not registered for this event.'], 403);
            }

            // Build QR code data
            $baseUrl = rtrim(env('SERVER_URL'), '/');
            $qrData = "{$baseUrl}/api/v1/event/check-in?code={$attendance->code}&event_id={$attendance->event_id}&user_id={$attendance->user_id}";   

            // Return the event pass details (for simplicity, we return the attendance record)
            return response()->json([
                'event_pass' => [
                    'event_id' => $attendance->event_id,
                    'user_id' => $attendance->user_id,
                    'status' => $attendance->status,
                    'code' => $attendance->code,
                    'event' => $attendance->event,
                    'qr_data' => $qrData
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching event pass: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch event pass.', 'error' => $e->getMessage()], 500);
        }
    }

    public function checkInEvent(Request $request) {
        try {
            // Host will scan the QR code which contains the code, event_id, and user_id as query parameters
            $host = $request->user();
            $event = Event::with('eventAttendances')->findOrFail($request->query('event_id'));
            $isHost = $event->isHost($host->id);

            if (!$isHost) {
                return response()->json(['message' => 'Unauthorized. Only the event host can check in attendees.'], 403);
            }

            $code = $request->query('code');
            $event_id = $request->query('event_id');
            $attendee_id = $request->query('user_id');

            // Find the event attendance record based on the code, event ID, and user ID
            $attendance = EventAttendance::where('code', $code)
                ->where('event_id', $event_id)
                ->where('user_id', $attendee_id)
                ->first();

            if (!$attendance) {
                return response()->json(['message' => 'Invalid check-in code.'], 400);
            }

            // Update the attendance status to 'attended'
            EventAttendance::where('event_id', $event_id)
                ->where('user_id', $attendee_id)
                ->update(['status' => 'attended']);

            return response()->json(['message' => 'Attendance updated successfully.']);
        } catch (\Exception $e) {
            Log::error('Error checking in to event: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to check in to event.', 'error' => $e->getMessage()], 500);
        }
    }
}
