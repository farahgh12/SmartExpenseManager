<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Income;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $thisMonth = Carbon::now();
        $lastMonth = Carbon::now()->subMonth();

        $currentExpenses = Expense::where('user_id', $userId)
            ->whereMonth('date', $thisMonth->month)
            ->whereYear('date', $thisMonth->year)
            ->sum('amount');

        $lastExpenses = Expense::where('user_id', $userId)
            ->whereMonth('date', $lastMonth->month)
            ->whereYear('date', $lastMonth->year)
            ->sum('amount');

        $currentIncomes = Income::where('user_id', $userId)
            ->whereMonth('date', $thisMonth->month)
            ->whereYear('date', $thisMonth->year)
            ->sum('amount');

        $categoryStats = Expense::where('user_id', $userId)
            ->whereMonth('date', $thisMonth->month)
            ->with('category')
            ->get()
            ->groupBy('category_id')
            ->map(function ($group) {
                return [
                    'name' => $group->first()->category->name ?? 'Non classé',
                    'amount' => $group->sum('amount'),
                    'color' => $group->first()->category->color ?? '#ccc',
                ];
            })->values();

        return Inertia::render('Reports', [
            'stats' => [
                'current_expenses' => $currentExpenses,
                'last_expenses' => $lastExpenses,
                'current_incomes' => $currentIncomes,
                'growth' => $lastExpenses > 0 ? (($currentExpenses - $lastExpenses) / $lastExpenses) * 100 : 0,
            ],
            'categoryStats' => $categoryStats,
        ]);
    }
}
