<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Enum\UserRoleEnum;
use App\Helpers\GetRoleNameByNumber;
class DashboardController extends Controller
{


    public function index()
    {
        $user = Auth::user();
        $role = $user->role;
        $roleName = GetRoleNameByNumber::getRoleName($role);

        return Inertia::render('Dashboard', [
            'message' => $roleName,
        ]);
    }
}
