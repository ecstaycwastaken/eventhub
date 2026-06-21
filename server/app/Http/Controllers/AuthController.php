<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        try {
            $request->validate([
                'username' => 'required|string|unique:users',
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|string|email|unique:users',
                'contact_number' => 'nullable|string',
                'country' => 'nullable|string',
                'region' => 'nullable|string',
                'city' => 'nullable|string',
                'password' => 'required|string|confirmed',
                'password_confirmation' => 'required|string',
                'profile_image' => 'nullable|string'
            ]);

            // Create user using Supabase Auth API
            $response = Http::withHeaders([
                'apikey' => env('SUPABASE_SERVICE_KEY'),
                'Authorization' => 'Bearer ' . env('SUPABASE_SERVICE_KEY'),
            ])->post(env('SUPABASE_URL') . '/auth/v1/signup', [
                'email' => $request->email,
                'password' => $request->password,
                'confirm_password' => $request->password_confirmation,
                'options' => [
                    'data' => [
                        // Add additional user data to the metadata
                        'username' => $request->username,
                        'first_name' => $request->first_name,
                        'last_name' => $request->last_name,
                        'profile_image' => $request->profile_image ?? null,
                    ],
                    // TODO: Redirect to frontend after successful signup
                    'redirectTo' => env('SUPABASE_REDIRECT_URL'),
                    'autoConfirm' => true, // Automatically confirm the user without email verification
                ]
            ]);

            if ($response->failed()) {
                Log::error('Supabase signup failed: ' . $response->body());
                return response()->json([
                    'message' => 'Failed to create user.',
                    'error' => $response->json()
                ], 500);
            }

            $supabaseUser = $response->json();

            $user = User::create([
                'id' => $supabaseUser['user']['id'], // Use the UUID from Supabase
                'username' => $request->username,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'contact_number' => $request->contact_number,
                'country' => $request->country,
                'region' => $request->region,
                'city' => $request->city,
                'role' => 'user',
                'profile_image' => $request->profile_image ?? null
            ]);

            return response()->json([
                'message' => 'Successfully created user!',
                'user' => $user
            ], 201);
        } catch (\Exception $e) {
            Log::error('Signup error: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred during signup.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string'
            ]);

            // Authenticate user using Supabase Auth API
            $api_url = env('SUPABASE_URL') . '/auth/v1/token?grant_type=password';
            $response = Http::withHeaders([
                'apikey' => env('SUPABASE_SERVICE_KEY'),
                'Authorization' => 'Bearer ' . env('SUPABASE_SERVICE_KEY'),
            ])->post($api_url, [
                'email' => $request->email,
                'password' => $request->password
            ]);

            if ($response->failed()) {
                return response()->json([
                    'message' => 'Invalid credentials.',
                    'error' => $response->json()
                ], 401);
            }

            $supabaseUser = $response->json();

            $cookie = cookie('access_token', $supabaseUser['access_token'], 60 * 24 * 7); // Set cookie for 7 days

            return response()->json([
                'message' => 'Successfully logged in!',
                'user' => $supabaseUser['user'],
                'access_token' => $supabaseUser['access_token']
            ], 200)->withCookie($cookie);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred during login.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
