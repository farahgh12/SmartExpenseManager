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

        // Initialisation des comptes utilisateurs (Mode Démo)
        $names = ['Ahmed Benani', 'Sara Mansouri', 'Khalid Alami', 'Yasmine Drissi', 'Omar Tazi'];
        foreach ($names as $name) {
            $email = strtolower(str_replace(' ', '.', $name)) . '@demo.com';
            User::updateOrCreate(
                ['email' => $email],
                ['name' => $name, 'password' => Hash::make('password'), 'role' => 'user']
            );
        }

        // Génération de l'historique financier pour chaque utilisateur
        foreach (User::all() as $user) {
            // Transactions du mois en cours
            for ($i = 0; $i < 12; $i++) {
                Expense::create([
                    'user_id' => $user->id,
                    'category_id' => $categories->random()->id,
                    'amount' => rand(50, 600),
                    'description' => 'Achat ' . rand(1, 50),
                    'date' => \Carbon\Carbon::now()->subDays(rand(1, 27)),
                ]);
            }

            // Transactions du mois précédent
            for ($i = 0; $i < 8; $i++) {
                Expense::create([
                    'user_id' => $user->id,
                    'category_id' => $categories->random()->id,
                    'amount' => rand(40, 500),
                    'description' => 'Achat passé ' . rand(1, 50),
                    'date' => \Carbon\Carbon::now()->subMonth()->subDays(rand(1, 27)),
                ]);
            }

            // Revenus du mois actuel
            Income::create([
                'user_id' => $user->id,
                'amount' => rand(4000, 7000),
                'source' => 'Salaire Mensuel',
                'date' => \Carbon\Carbon::now()->subDays(rand(1, 5)),
            ]);

            // Revenus du mois précédent
            Income::create([
                'user_id' => $user->id,
                'amount' => rand(3500, 6000),
                'source' => 'Salaire Précédent',
                'date' => \Carbon\Carbon::now()->subMonth()->subDays(rand(1, 5)),
            ]);
        }
    }
}
