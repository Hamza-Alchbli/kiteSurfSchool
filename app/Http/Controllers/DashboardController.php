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
        return Inertia::render('DashboardAdmin', [
            'message' => $roleName,
        ]);
    }

    public function userDashboard($roleName){
        return Inertia::render('DashboardCustomer', [
            'message' => $roleName,
        ]);
    }

    public function employeeDashboard($roleName){
        return Inertia::render('DashboardEmployee', [
            'message' => $roleName,
        ]);
    }

}
