<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EventCategory;

class EventCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultCategories = [
            ['name' => 'Music', 'color' => '#FF5733'],
            ['name' => 'Art', 'color' => '#33FF57'],
            ['name' => 'Technology', 'color' => '#3357FF'],
            ['name' => 'Sports', 'color' => '#FFFF33'],
            ['name' => 'Education', 'color' => '#FF33F0'],
            ['name' => 'Health & Wellness', 'color' => '#33FFF0'],
            ['name' => 'Food & Drink', 'color' => '#F0FF33'],
            ['name' => 'Business & Networking', 'color' => '#F033FF'],
            ['name' => 'Community & Culture', 'color' => '#33F0FF'],
            ['name' => 'Other', 'color' => '#FFFFFF']
        ];

        foreach ($defaultCategories as $category) {
            EventCategory::firstOrCreate($category);
        }
    }
}
