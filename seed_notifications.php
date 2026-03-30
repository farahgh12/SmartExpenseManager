<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = \App\Models\User::where('role', 'admin')->orWhere('email', 'admin@admin.com')->first();
if (!$user) $user = \App\Models\User::first();

$notifications = [
    ['category' => 'Alimentation', 'spent' => 620, 'budget' => 400],
    ['category' => 'Loisirs', 'spent' => 350, 'budget' => 200],
    ['category' => 'Transport', 'spent' => 480, 'budget' => 300],
    ['category' => 'Santé', 'spent' => 290, 'budget' => 250],
    ['category' => 'Shopping', 'spent' => 750, 'budget' => 500],
];

foreach ($notifications as $i => $n) {
    \Illuminate\Support\Facades\DB::table('notifications')->insert([
        'id' => (string) \Illuminate\Support\Str::uuid(),
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

echo "✅ " . count($notifications) . " notifications créées pour " . $user->name . "\n";
