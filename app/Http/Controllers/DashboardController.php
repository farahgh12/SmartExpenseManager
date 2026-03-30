<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Expense;
use App\Models\Income;
use App\Models\Category;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $currentMonth = date('Y-m');
        
        $categories = Category::where('user_id', $userId)->orWhereNull('user_id')->get();
        $budgets = Budget::where('user_id', $userId)
            ->where('period', $currentMonth)
            ->get()
            ->keyBy('category_id');
        
        $expensesByCategory = Expense::where('user_id', $userId)
            ->with('category')
            ->selectRaw('category_id, sum(amount) as total')
            ->groupBy('category_id')
            ->get()
            ->map(fn($item) => [
                'name' => $item->category->name ?? 'Uncategorized',
                'value' => (float) $item->total,
                'budget' => (float) ($budgets[$item->category_id]->amount ?? 0),
            ]);

        $monthlyTrends = Expense::where('user_id', $userId)
            ->selectRaw('DATE_FORMAT(date, "%Y-%m") as month, sum(amount) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(fn($item) => [
                'month' => $item->month,
                'amount' => (float) $item->total,
            ]);

        $totalIncomes = Income::where('user_id', $userId)->sum('amount');
        $totalExpenses = Expense::where('user_id', $userId)->sum('amount');

        return Inertia::render('Dashboard', [
            'totalExpenses' => $totalExpenses,
            'totalIncomes'  => $totalIncomes,
            'balance'       => $totalIncomes - $totalExpenses,
            'recentTransactions' => Expense::where('user_id', $userId)->with('category')->latest()->take(5)->get(),
            'expensesByCategory' => $expensesByCategory,
            'monthlyTrends' => $monthlyTrends,
            'budgets' => $budgets,
            'categories' => $categories,
        ]);
    }
}
