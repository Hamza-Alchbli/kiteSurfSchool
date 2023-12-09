<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Enum\UserRoleEnum;
use App\Enum\PaymentEnum;
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

        $reservations->load('package')->load('payment');
        $paidReservations = $reservations->filter(function($reservation){
            return $reservation->payment->payment_status == PaymentEnum::COMPLETED->value;
        });

        // dd($reservations);
        $instructors = User::where('role', UserRoleEnum::EMPLOYEE->value)->get();

        return Inertia::render('DashboardAdmin', [
            'message' => $roleName,
            'paidReservations' => $paidReservations,
            'reservations' => $reservations,
            'instructors' => $instructors,
        ]);
    }

    public function userDashboard($roleName){
        $user = Auth::user();
        $allReservations = Reservation::where('user_id', $user->id)->whereHas('payment', function ($query) {
            $query->where('payment_status', PaymentEnum::COMPLETED->value);
        })->get();
        $allReservations->load('package')->load('payment');

        return Inertia::render('DashboardCustomer', [
            'message' => $roleName,
            'reservations' => $allReservations,
        ]);
    }

    public function employeeDashboard($roleName){
        $user = Auth::user();
        $allReservations = $user->reservations->load('package')->load('payment');
        $reservations = $allReservations->filter(function($reservation){
            return $reservation->payment->payment_status == PaymentEnum::COMPLETED->value;
        });
        return Inertia::render('DashboardEmployee', [
            'message' => $roleName,
            'user' => $user,
            'reservations' => $reservations,
        ]);
    }

}
