<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        return Inertia::render('Notifications', [
            'notifications' => auth()->user()->notifications,
            'unreadCount' => auth()->user()->unreadNotifications->count(),
        ]);
    }

    public function markAllAsRead()
    {
        auth()->user()->unreadNotifications->markAsRead();
        return back();
    }
}
