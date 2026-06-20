<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class SupabaseAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {   
        // Get the Bearer token from the Authorization header
        $token = $request->cookie('access_token') ?? $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Unauthorized. Please log in.'], 401);
        }

        // Validate token with Supabase Auth API
        $response = Http::withHeaders([
            'apikey' => env('SUPABASE_SERVICE_KEY'),
            'Authorization' => 'Bearer ' . $token,
        ])->get(env('SUPABASE_URL') . '/auth/v1/user');

        if ($response->failed()) {
            return response()->json(['message' => 'Unauthorized. Invalid or expired token. Please log in again.'], 401);
        }

        $supabaseUser = $response->json();
        $uuid = $supabaseUser['id'];
        
        // Validate that user existence
        $user = User::find($uuid);

        if (!$user) {
            return response()->json(['message' => 'Unauthorized. User not found. Please log in again.'], 401);
        }

        // Attach the authenticated user to the request for downstream use
        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $next($request);
    }
}
