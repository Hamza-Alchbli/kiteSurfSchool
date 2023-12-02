<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Enum\UserRoleEnum;
use App\Helpers\GetRoleNameByNumber;
use App\Models\User;
use App\Models\Reservation;
class DashboardController extends Controller
{


    public function index()
    {
        $user = Auth::user();
        $role = $user->role;
        $roleName = strtolower(GetRoleNameByNumber::getRoleName($role));

        if($roleName == strtolower(UserRoleEnum::ADMIN->name)){
            return $this->adminDashboard($roleName);
        }
        else if($roleName == strtolower(UserRoleEnum::EMPLOYEE->name)){
            return $this->employeeDashboard($roleName);
        }
        else{
            return $this->userDashboard($roleName);
        }


    }

    public function adminDashboard($roleName){
        $reservations = Reservation::all();
        $reservations->load('package');
        $instructeurs = User::where('role', UserRoleEnum::EMPLOYEE->value)->get();

        return Inertia::render('DashboardAdmin', [
            'message' => $roleName,
            'reservations' => $reservations,
            'instructeurs' => $instructeurs,
        ]);
    }

    public function userDashboard($roleName){
        return Inertia::render('DashboardCustomer', [
            'message' => $roleName,
        ]);
    }

    public function employeeDashboard($roleName){
        $user = Auth::user();
        $reservations = $user->reservations->load('package');
        return Inertia::render('DashboardEmployee', [
            'message' => $roleName,
            'user' => $user,
            'reservations' => $reservations,
        ]);
    }

    public function users(){
        // geta ll users
        $users = User::all();
        return Inertia::render('Users/AllUsers', [
            'users' => $users,
        ]);
    }

}
