<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next,  ...$allowedRoles): Response
    {
        $user = $request->user();
        $role = $user->role ?? null;
        
        if (!in_array($role, $allowedRoles)) {
            return response()->json(['message' => 'Forbidden. You do not have the required role to access this resource.'], 403);
        }

        return $next($request);
    }
}
