<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
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
}
