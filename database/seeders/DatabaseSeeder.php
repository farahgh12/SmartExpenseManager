<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       $categories = [
        ['name' => 'Alimentation', 'icon' => 'utensils', 'color' => '#FF5733'],
        ['name' => 'Transport', 'icon' => 'car', 'color' => '#33B5FF'],
        ['name' => 'Loisirs', 'icon' => 'gamepad', 'color' => '#8E44AD'],
        ['name' => 'Santé', 'icon' => 'heartbeat', 'color' => '#27AE60'],
    ];
    foreach ($categories as $cat) {
        \App\Models\Category::create($cat);
    }

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
