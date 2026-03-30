<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Expense;
use App\Models\Income;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();
        if ($categories->isEmpty()) return;

        $names = ['Ahmed Benani', 'Sara Mansouri', 'Khalid Alami', 'Yasmine Drissi', 'Omar Tazi'];
        
        foreach ($names as $name) {
            $email = strtolower(str_replace(' ', '.', $name)) . '@demo.com';
            
            $user = User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => $name,
                    'password' => Hash::make('password'),
                    'role' => 'user'
                ]
            );

            // Seed expenses for this user
            for ($i = 0; $i < 10; $i++) {
                Expense::create([
                    'user_id' => $user->id,
                    'category_id' => $categories->random()->id,
                    'amount' => rand(50, 600),
                    'description' => 'Achat ' . rand(1, 50),
                    'date' => Carbon::now()->subDays(rand(1, 30)),
                ]);
            }

            // Seed incomes
            Income::create([
                'user_id' => $user->id,
                'amount' => rand(4000, 7000),
                'source' => 'Salaire Mensuel',
                'date' => Carbon::now()->subDays(rand(1, 5)),
            ]);
        }
    }
}
