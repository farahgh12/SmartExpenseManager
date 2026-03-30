<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExpenseController;
use Inertia\Inertia;
use App\Models\Expense;
use App\Models\Budget;
use App\Models\Category;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AdminController;

// Authentication Routes
Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login.view');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

// Welcome Page (Accessible via /welcome)
Route::get('/welcome', function () {
    return Inertia::render('Welcome');
});

// Protected Routes
Route::middleware('auth')->group(function () {
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
    Route::delete('/budgets/{id}', [BudgetController::class, 'destroy']);

    // Other Modules
    Route::get('/history', [HistoryController::class, 'index']);
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::get('/settings', [SettingController::class, 'index']);
    Route::post('/settings/profile', [SettingController::class, 'updateProfile']);
    Route::post('/settings/password', [SettingController::class, 'updatePassword']);
    Route::get('/reports', [ReportController::class, 'index']);

    // Admin Routes
    Route::middleware(['admin'])->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
        Route::patch('/users/{user}/role', [AdminController::class, 'updateRole']);
        Route::delete('/users/{user}', [AdminController::class, 'destroy']);
    });
});
