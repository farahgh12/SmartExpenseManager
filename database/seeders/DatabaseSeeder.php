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
            ['name' => 'Salaire', 'icon' => 'money-bill-wave', 'color' => '#2ECC71'],
            ['name' => 'Logement', 'icon' => 'home', 'color' => '#F1C40F'],
        ];

        foreach ($categories as $cat) {
            \App\Models\Category::firstOrCreate(['name' => $cat['name']], $cat);
        }

        $user = User::updateOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'role' => 'Admin',
            ]
        );

        // Seed some sample data
        $catFood = \App\Models\Category::where('name', 'Alimentation')->first();
        $catSalary = \App\Models\Category::where('name', 'Salaire')->first();

        \App\Models\Expense::create([
            'amount' => 50.00,
            'date' => now()->format('Y-m-d'),
            'description' => 'Déjeuner',
            'user_id' => $user->id,
            'category_id' => $catFood->id,
        ]);

        \App\Models\Income::create([
            'amount' => 3000.00,
            'source' => 'Salaire Mensuel',
            'date' => now()->startOfMonth()->format('Y-m-d'),
            'user_id' => $user->id,
            'category_id' => $catSalary->id,
        ]);
    }
}
