<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {
        return Inertia::render('History');
    }
}
