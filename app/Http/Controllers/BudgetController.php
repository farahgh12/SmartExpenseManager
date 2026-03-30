<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Expense;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BudgetController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $month = now()->format('Y-m');
        
        $categories = Category::where('user_id', $user->id)->orWhereNull('user_id')->get();
        
        $budgets = Budget::where('user_id', $user->id)
            ->where('period', $month)
            ->with('category')
            ->get();

        $spending = Expense::where('user_id', $user->id)
            ->whereYear('date', now()->year)
            ->whereMonth('date', now()->month)
            ->select('category_id', DB::raw('SUM(amount) as total'))
            ->groupBy('category_id')
            ->pluck('total', 'category_id');

        return Inertia::render('Budgets', [
            'budgets' => $budgets,
            'categories' => $categories,
            'spending' => $spending,
            'currentMonth' => now()->translatedFormat('F Y'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:0',
        ]);

        Budget::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'category_id' => $validated['category_id'],
                'period' => now()->format('Y-m'),
            ],
            ['amount' => $validated['amount']]
        );

        return back()->with('success', 'Budget mis à jour');
    }

    public function destroy($id)
    {
        Budget::where('user_id', auth()->id())->findOrFail($id)->delete();
        return back()->with('success', 'Budget supprimé');
    }
}
