<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\User;

class UserController extends Controller
{
    public function getAllUsers() {
        try {
            $users = User::all();
            return response()->json([
                'message' => 'Users fetched successfully.',
                'users' => $users
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching users: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch users.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getUserById(string $id) {
        try {
            $user = User::findOrFail($id);
            return response()->json([
                'message' => 'User fetched successfully.',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching user: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch user.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getMyProfile(Request $request) {
        try {
            $user = User::findOrFail($request->user()->id);
            return response()->json([
                'message' => 'User profile fetched successfully.',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching user profile: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch user profile.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function editUser(Request $request, string $id) {
        // Allowed fields to update
        $request->validate([
                'first_name' => 'sometimes|required|string',
                'last_name' => 'sometimes|required|string',
                'contact_number' => 'nullable|string',
                'country' => 'nullable|string',
                'region' => 'nullable|string',
                'city' => 'nullable|string',
                'role' => 'nullable|string|in:user,admin',
            ]);

        try {
            $user = User::findOrFail($id);

            if ($user->id !== $request->user()->id && $request->user()->role !== 'admin') {
                return response()->json([
                    'message' => 'Forbidden. Unauthorized to edit this user.'
                ], 403);
            }

            if ($request->has('role') && $request->user()->role !== 'admin') {
                return response()->json([
                    'message' => 'Forbidden. Only admins can change roles.'
                ], 403);
            }

            $profileImage = null;

            if ($request->hasFile('profile_image') && $request->file('profile_image')->isValid()) {
                $profileImage = $request->file('profile_image');

                $fileName = Str::uuid() . '.' . $profileImage->getClientOriginalExtension();
                
                try {
                    if ($user->profile_image) {
                        $existingFileName = basename($user->profile_image);
                        Storage::disk('supabase')->delete('profile-images/' . $existingFileName);
                    }

                    Storage::disk('supabase')->putFileAs(
                        'profile-images', // Path inside the bucket root
                        $profileImage,
                        $fileName,
                        'public'
                    );

                    $user->profile_image = env('SUPABASE_STORAGE_URL') . 'profile-images/' . $fileName;
                } catch (\Exception $e) {
                    Log::error('Error uploading profile image: ' . $e->getMessage());
                    return response()->json([
                        'message' => 'Failed to upload profile image.',
                        'error' => $e->getMessage()
                    ], 500);
                }
            }

            $user->update($request->only(['first_name', 'last_name', 'contact_number', 'country', 'region', 'city', 'role']));
            return response()->json([
                'message' => 'User updated successfully.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating user: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to update user.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteUser(string $id) {
        try {
            $user = User::findOrFail($id);

            // Delete in auth.users table using Supabase API
            $response = Http::withHeaders([
                'apikey' => env('SUPABASE_SERVICE_KEY'),
                'Authorization' => 'Bearer ' . env('SUPABASE_SERVICE_KEY'),
            ])->delete(env('SUPABASE_URL') . '/auth/v1/admin/users/' . $user->id);
            
            // Return error if deletion from Supabase Auth fails
            if ($response->failed()) {
                $errorData = $response->json();
                $errorMessage = $errorData['message'] ?? 'Failed to delete user from authentication system.';
                Log::error('Error deleting user from Supabase Auth: ' . $errorMessage);
                return response()->json([
                    'message' => 'Failed to delete user from authentication system.',
                    'error' => $errorMessage
                ], 500);
            }

            // Delete user profile image from Supabase Storage if exists
            if ($user->profile_image) {
                try {
                    $existingFileName = basename($user->profile_image);
                    Storage::disk('supabase')->delete('profile-images/' . $existingFileName);
                } catch (\Exception $e) {
                    Log::error('Error deleting profile image: ' . $e->getMessage());
                    // Continue with user deletion even if image deletion fails
                }
            }

            $user->delete();
            
            return response()->json([
                'message' => 'User deleted successfully.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting user: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to delete user.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
