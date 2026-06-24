<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\EventCategory;

class CategoryController extends Controller
{
    public function getAllCategories() {
        try {
            $categories = EventCategory::withCount([
                'events as event_count',
                'events as attendance_count' => function ($query) {
                    $query->join('event_attendances', 'events.id', '=', 'event_attendances.event_id');
                }
            ])->get();
            return response()->json($categories);
        } catch (\Exception $e) {
            Log::error('Error fetching categories: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function createCategory(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:7',
        ]);

        try {
            $category = EventCategory::create([
                'name' => $request->name,
                'color' => $request->color,
            ]);
            return response()->json($category, 201);
        } catch (\Exception $e) {
            Log::error('Error creating category: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to create category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateCategory(Request $request, string $id) {
        $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:7'
        ]);

        try {
            $category = EventCategory::findOrFail($id);
            $category->update([
                'name' => $request->name,
                'color' => $request->color,
            ]);
            return response()->json($category);
        } catch (\Exception $e) {
            Log::error('Error updating category: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to update category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteCategory(string $id) {
        try {
            $category = EventCategory::findOrFail($id);
            $category->delete();
            return response()->json(['message' => 'Category deleted successfully']);
        } catch (\Exception $e) {
            Log::error('Error deleting category: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to delete category',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
