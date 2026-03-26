<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExpenseController;
use Inertia\Inertia;
use App\Models\Expense;
use App\Models\Budget;
use App\Models\Category;

// Home Landing Page
Route::get('/', function () {
    return Inertia::render('Welcome');
});

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SettingController;

// Home Landing Page
Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

// Expenses
Route::get('/expenses', [ExpenseController::class, 'index']);
Route::post('/expenses', [ExpenseController::class, 'store']);
Route::delete('/expenses/{id}', [ExpenseController::class, 'destroy']);

// Incomes
Route::get('/incomes', [IncomeController::class, 'index']);
Route::post('/incomes', [IncomeController::class, 'store']);
Route::delete('/incomes/{id}', [IncomeController::class, 'destroy']);

// Categories
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);

// Budgets
Route::get('/budgets', [BudgetController::class, 'index']);
Route::post('/budgets', [BudgetController::class, 'store']);

// Other Modules
Route::get('/history', [HistoryController::class, 'index']);
Route::get('/notifications', [NotificationController::class, 'index']);
Route::get('/settings', [SettingController::class, 'index']);
