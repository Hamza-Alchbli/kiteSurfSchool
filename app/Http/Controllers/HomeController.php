<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

use App\Models\Package;

class HomeController extends Controller
{
    function index()
    {
        $packages = Package::all();
        $locations = Location::all();

        return Inertia::render('Welcome', [
            'packages' => $packages,
            'locations' => $locations,
        ]);
    }
}
