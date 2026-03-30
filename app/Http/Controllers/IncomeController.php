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
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'source' => 'required|string|max:255',
            'date' => 'required|date',
            'category_id' => 'nullable|exists:categories,id',
            'category_name' => 'nullable|string|max:255',
        ]);

        $categoryId = $validated['category_id'];

        if (!$categoryId && !empty($validated['category_name'])) {
            $category = Category::firstOrCreate(
                ['name' => $validated['category_name']],
                ['user_id' => auth()->id()]
            );
            $categoryId = $category->id;
        }

        Income::create([
            'amount' => $validated['amount'],
            'source' => $validated['source'],
            'date' => $validated['date'],
            'user_id' => auth()->id(),
            'category_id' => $categoryId,
        ]);

        return back()->with('success', 'Revenu ajouté avec succès');
    }

    public function destroy($id)
    {
        Income::findOrFail($id)->delete();
        return back()->with('success', 'Revenu supprimé');
    }
}
