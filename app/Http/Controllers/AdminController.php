<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Expense;
use App\Models\Income;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $users = User::all();
        $stats = [
            'total_users' => $users->count(),
            'total_expenses' => Expense::sum('amount'),
            'total_incomes' => Income::sum('amount'),
        ];

        return Inertia::render('Admin/Dashboard', [
            'users' => $users,
            'stats' => $stats,
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|in:user,admin',
        ]);

        $user->update([
            'role' => strtolower($validated['role'])
        ]);

        return back()->with('success', 'Rôle mis à jour');
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Vous ne pouvez pas vous supprimer');
        }

        $user->delete();
        return back()->with('success', 'Utilisateur supprimé');
    }
}
