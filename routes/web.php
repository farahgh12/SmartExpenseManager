<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExpenseController;
use Inertia\Inertia;
use App\Models\Expense;

// Redirect home to dashboard
Route::get('/', function () {
    return redirect('/dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'totalExpenses' => Expense::sum('amount'),
        'totalIncomes'  => 0, 
        'recentTransactions' => Expense::with('category')->latest()->take(5)->get(),
    ]);
});

Route::get('/expenses', [ExpenseController::class, 'index']);
Route::post('/expenses', [ExpenseController::class, 'store']);
Route::delete('/expenses/{id}', [ExpenseController::class, 'destroy']);
