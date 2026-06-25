<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class AuthController extends Controller
{
    public function signup(Request $request) {
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
                'profile_image' => 'nullable|string',
                'role' => 'nullable|string|in:user,admin'
            ], [
                'username.unique' => 'The username has already been taken.',
                'email.unique' => 'The email address has already been registered.',
                'password.confirmed' => 'The password confirmation does not match.'
            ]);

            // Confirm password and password confirmation match
            if ($request->password !== $request->password_confirmation) {
                return response()->json([
                    'message' => 'Password and password confirmation do not match.'
                ], 400);
            }

            // Create user using Supabase Auth API
            $response = Http::withHeaders([
                'apikey' => env('SUPABASE_SERVICE_KEY'),
                'Authorization' => 'Bearer ' . env('SUPABASE_SERVICE_KEY'),
            ])->post(env('SUPABASE_URL') . '/auth/v1/signup', [
                'email' => $request->email,
                'password' => $request->password,
                'confirm_password' => $request->password_confirmation,
                'data' => [
                    // Add additional user data to the metadata
                    'username' => $request->username,
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'profile_image' => $request->profile_image ?? '',
                ],
                'options' => [
                    // TODO: Redirect to frontend after successful signup
                    'redirectTo' => env('SUPABASE_REDIRECT_URL'),
                    'autoConfirm' => true, // Automatically confirm the user without email verification
                ]
            ]);

            if ($response->failed()) {
                Log::error('Supabase signup failed: ' . $response->body());
                $errorData = $response->json();
                $errorMessage = $errorData['msg'] ?? 'Unable to complete registration with the authentication server.';
                if (($errorData['error_code'] ?? '') === 'user_already_exists') {
                    $errorMessage = 'A user with this email address is already registered.';
                }
                return response()->json([
                    'message' => 'Registration failed.',
                    'error' => $errorMessage
                ], $response->status() >= 400 && $response->status() < 500 ? $response->status() : 500);
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
                'role' => $request->role ?? 'user',
                'profile_image' => $request->profile_image ?? null
            ]);

            return response()->json([
                'message' => 'Successfully created user!',
                'user' => $user
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            Log::error('Signup error: ' . $e->getMessage());
            return response()->json([
                'message' => 'An unexpected error occurred during signup. Please try again later.',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    public function login(Request $request) {
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
                $errorData = $response->json();
                $errorMessage = $errorData['error_description'] ?? 'Invalid email or password.';
                return response()->json([
                    'message' => 'Authentication failed.',
                    'error' => $errorMessage
                ], 401);
            }

            $supabaseUser = $response->json();

            $cookie = cookie(
                name: 'access_token',
                value: $supabaseUser['access_token'],
                minutes: 60 * 24,
                path: '/',
                domain: null,
                secure: env('APP_ENV') === 'production', // Set to true if using HTTPS
                httpOnly: true,
                raw: false,
                sameSite: env('APP_ENV') === 'production' ? 'None' : 'Lax'
            );

            $role = User::where('id', $supabaseUser['user']['id'])->value('role');

            // Build user data
            $user = [
                "id" => $supabaseUser['user']['id'],
                "email" => $supabaseUser['user']['email'],
                "username" => $supabaseUser['user']['user_metadata']['username'] ?? null,
                "first_name" => $supabaseUser['user']['user_metadata']['first_name'],
                "last_name" => $supabaseUser['user']['user_metadata']['last_name'],
                "profile_image" => $supabaseUser['user']['user_metadata']['profile_image'],
                "role" => $role ?? 'user',
            ];

            return response()->json([
                'message' => 'Successfully logged in!',
                'user' => $user
            ], 200)->withCookie($cookie);
        } catch (\Illuminate\Validation\ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            Log::error('Login error: ' . $e->getMessage());
            return response()->json([
                'message' => 'An unexpected error occurred during login. Please try again later.',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }

    public function getAuthenticatedUser(Request $request) {
        try {
            $user = $request->user();
            if (!$user) {
                return response()->json([
                    'message' => 'User not authenticated.'
                ], 401);
            }

            return response()->json([
                'message' => 'Successfully retrieved user profile.',
                'user' => $user
            ], 200);
        } catch (\Exception $e) {
            Log::error('Get profile error: ' . $e->getMessage());
            return response()->json([
                'message' => 'An unexpected error occurred while retrieving the user profile. Please try again later.',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }
    
    public function logout() {
        try {
            $cookie = cookie(
                name: 'access_token',
                value: '',
                minutes: -1,
                path: '/',
                domain: null,
                secure: env('APP_ENV') === 'production', // Set to true if using HTTPS
                httpOnly: true,
                raw: false,
                sameSite: env('APP_ENV') === 'production' ? 'None' : 'Lax'
            );
            return response()->json([
                'message' => 'Successfully logged out!'
            ], 200)->withCookie($cookie);
        } catch (\Exception $e) {
            Log::error('Logout error: ' . $e->getMessage());
            return response()->json([
                'message' => 'An unexpected error occurred during logout. Please try again later.',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal Server Error'
            ], 500);
        }
    }
}
