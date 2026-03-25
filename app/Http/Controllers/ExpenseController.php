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
        $request->validate([
            'amount' => 'required|numeric',
            'description' => 'required|string',
            'date' => 'required|date',
            'category_id' => 'required|exists:categories,id',
        ]);

        Expense::create($request->all());
        
        return redirect()->back();
    }

    public function destroy($id)
    {
        Expense::destroy($id);
        
        return redirect()->back();
    }
}