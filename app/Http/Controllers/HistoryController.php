<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Income;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();
        
        $expenses = Expense::where('user_id', $userId)
            ->with('category')
            ->get()
            ->map(function ($item) {
                $item->type = 'expense';
                return $item;
            });

        $incomes = Income::where('user_id', $userId)
            ->with('category')
            ->get()
            ->map(function ($item) {
                $item->type = 'income';
                return $item;
            });

        $transactions = $expenses->concat($incomes)->sortByDesc('date')->values();

        return Inertia::render('History', [
            'transactions' => $transactions,
            'categories' => Category::where('user_id', $userId)->orWhereNull('user_id')->get(),
        ]);
    }
}
