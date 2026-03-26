<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Incomes', [
            'incomes' => Income::with('category')->latest()->get(),
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'source' => 'required|string|max:255',
            'date' => 'required|date',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        Income::create([
            'amount' => $request->amount,
            'source' => $request->source,
            'date' => $request->date,
            'user_id' => 1, 
            'category_id' => $request->category_id,
        ]);

        return back()->with('success', 'Revenu ajouté avec succès');
    }

    public function destroy($id)
    {
        Income::findOrFail($id)->delete();
        return back()->with('success', 'Revenu supprimé');
    }
}
