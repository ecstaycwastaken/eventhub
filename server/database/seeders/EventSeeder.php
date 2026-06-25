<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\EventAttendance;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Ensure there is at least one category
        $category = EventCategory::first();
        if (!$category) {
            $category = EventCategory::create([
                'id' => Str::uuid()->toString(),
                'name' => 'General',
                'color' => '#FF0000',
            ]);
        }
        
        $categories = EventCategory::all();

        $userId = '7d5c75c2-1f9a-4b51-8623-233322eda50a';

        // Generate 20 events to test infinite scroll
        for ($i = 0; $i < 20; $i++) {
            $eventId = Str::uuid()->toString();
            Event::create([
                'id' => $eventId,
                'user_id' => $userId,
                'category_id' => $categories->random()->id,
                'title' => $faker->sentence(4),
                'description' => $faker->paragraph(3),
                'date' => $faker->dateTimeBetween('now', '+1 year'),
                'venue' => $faker->address,
                'capacity' => $faker->numberBetween(50, 500),
                'price' => $faker->randomFloat(2, 0, 100),
                'banner_image' => 'https://picsum.photos/seed/' . Str::random(10) . '/800/400'
            ]);
            
            EventAttendance::create([
                'event_id' => $eventId,
                'user_id' => $userId,
                'status' => 'host',
                'code' => Str::random(10)
            ]);
        }
    }
}
