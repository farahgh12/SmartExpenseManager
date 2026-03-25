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

Route::get('/dashboard', function () {
    $currentMonth = date('Y-m');
    $budgets = Budget::where('period', $currentMonth)->get()->keyBy('category_id');
    
    $expensesByCategory = Expense::with('category')
        ->selectRaw('category_id, sum(amount) as total')
        ->groupBy('category_id')
        ->get()
        ->map(fn($item) => [
            'name' => $item->category->name ?? 'Uncategorized',
            'value' => (float) $item->total,
            'budget' => (float) ($budgets[$item->category_id]->amount ?? 0),
        ]);

    $monthlyTrends = Expense::selectRaw('strftime("%Y-%m", date) as month, sum(amount) as total')
        ->groupBy('month')
        ->orderBy('month')
        ->get()
        ->map(fn($item) => [
            'month' => $item->month,
            'amount' => (float) $item->total,
        ]);

    return Inertia::render('Dashboard', [
        'totalExpenses' => Expense::sum('amount'),
        'totalIncomes'  => 0, 
        'recentTransactions' => Expense::with('category')->latest()->take(5)->get(),
        'expensesByCategory' => $expensesByCategory,
        'monthlyTrends' => $monthlyTrends,
        'budgets' => $budgets,
        'categories' => \App\Models\Category::all(),
    ]);
});

Route::post('/budgets', function (\Illuminate\Http\Request $request) {
    $request->validate([
        'category_id' => 'required|exists:categories,id',
        'amount' => 'required|numeric|min:0',
    ]);

    \App\Models\Budget::updateOrCreate(
        ['category_id' => $request->category_id, 'period' => date('Y-m')],
        ['amount' => $request->amount]
    );

    return back();
});

Route::get('/expenses', [ExpenseController::class, 'index']);
Route::post('/expenses', [ExpenseController::class, 'store']);
Route::delete('/expenses/{id}', [ExpenseController::class, 'destroy']);
