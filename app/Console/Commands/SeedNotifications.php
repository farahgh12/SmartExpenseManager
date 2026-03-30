<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class SeedNotifications extends Command
{
    protected $signature = 'seed:notifications';
    protected $description = 'Seed demo notifications for all users';

    public function handle()
    {
        $users = User::all();

        $items = [
            ['category' => 'Alimentation', 'spent' => 620, 'budget' => 400],
            ['category' => 'Loisirs', 'spent' => 350, 'budget' => 200],
            ['category' => 'Transport', 'spent' => 480, 'budget' => 300],
            ['category' => 'Santé', 'spent' => 290, 'budget' => 250],
            ['category' => 'Shopping', 'spent' => 750, 'budget' => 500],
        ];

        foreach ($users as $user) {
            foreach ($items as $i => $n) {
                DB::table('notifications')->insert([
                    'id' => (string) Str::uuid(),
                    'type' => 'App\Notifications\BudgetExceeded',
                    'notifiable_type' => 'App\Models\User',
                    'notifiable_id' => $user->id,
                    'data' => json_encode([
                        'message' => 'Budget dépassé pour ' . $n['category'],
                        'category' => $n['category'],
                        'spent' => $n['spent'],
                        'budget' => $n['budget'],
                    ]),
                    'read_at' => $i >= 3 ? now()->subHours(rand(2, 24)) : null,
                    'created_at' => now()->subHours(rand(1, 72)),
                    'updated_at' => now(),
                ]);
            }
            $this->info('Notifications créées pour: ' . $user->name);
        }

        $this->info('Done!');
    }
}
