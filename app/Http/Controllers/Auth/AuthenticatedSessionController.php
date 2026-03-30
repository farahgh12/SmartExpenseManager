<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
        ]);

        $name = strtolower($request->name);
        $email = strtolower($request->email);

        // Logic: if name is 'farah gh', set as admin
        $role = ($name === 'farah gh') ? 'admin' : 'user';

        $user = \App\Models\User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $request->name,
                'password' => \Illuminate\Support\Facades\Hash::make('password'), // Demo password
                'role' => $role
            ]
        );

        Auth::login($user, $request->boolean('remember'));
        
        $request->session()->regenerate();

        return redirect()->route('dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
