<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller; 
use App\Models\Expense;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index()
    {
        // Get all expenses with their category
        $expenses = Expense::with('category')->latest()->get();
        // Assuming categories are needed for the create form
        $categories = Category::all();
        
        return Inertia::render('Expenses', [
            'expenses' => $expenses,
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric',
            'description' => 'required|string',
            'date' => 'required|date',
            'category_id' => 'nullable|exists:categories,id',
            'category_name' => 'nullable|string|max:255',
        ]);

        $categoryId = $validated['category_id'];

        // If no category_id but a category_name is provided, create/find the category
        if (!$categoryId && !empty($validated['category_name'])) {
            $category = Category::firstOrCreate(
                ['name' => $validated['category_name']],
                ['user_id' => auth()->id()]
            );
            $categoryId = $category->id;
        }

        $expense = Expense::create([
            'amount' => $validated['amount'],
            'description' => $validated['description'],
            'date' => $validated['date'],
            'category_id' => $categoryId,
            'user_id' => auth()->id(),
        ]);

        // Check budget and notify if exceeded
        if ($categoryId) {
            $month = now()->format('Y-m');
            $budget = \App\Models\Budget::where('user_id', auth()->id())
                ->where('category_id', $categoryId)
                ->where('period', $month)
                ->first();

            if ($budget) {
                $totalSpent = Expense::where('user_id', auth()->id())
                    ->where('category_id', $categoryId)
                    ->whereYear('date', now()->year)
                    ->whereMonth('date', now()->month)
                    ->sum('amount');

                if ($totalSpent > $budget->amount) {
                    $category = \App\Models\Category::find($categoryId);
                    auth()->user()->notify(new \App\Notifications\BudgetExceeded($category, $totalSpent, $budget->amount));
                }
            }
        }
        
        return redirect()->back()->with('success', 'Dépense ajoutée');
    }

    public function destroy($id)
    {
        Expense::destroy($id);
        
        return redirect()->back();
    }
}