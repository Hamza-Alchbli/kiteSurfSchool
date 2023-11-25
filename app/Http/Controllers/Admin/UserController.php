<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Enum\UserRoleEnum;
use App\Helpers\GetRoleNameByNumber;
use App\Models\User;

class UserController extends Controller
{
    public function users()
    {
        $user = Auth::user();
        $roleName = GetRoleNameByNumber::getRoleName($user->role);
        if ($roleName != UserRoleEnum::ADMIN->name) {
            return Redirect::to('/dashboard');
        }

        // geta ll users
        $users = User::all();
        // replace role number with role name
        foreach ($users as $user) {
            $user->role = strtolower(GetRoleNameByNumber::getRoleName($user->role));
        }
        return Inertia::render('Users/AllUsers', [
            'users' => $users,
        ]);
    }

    public function destroy(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $roleName = GetRoleNameByNumber::getRoleName($user->role);
        if ($roleName != UserRoleEnum::ADMIN->name) {
            return Redirect::to('/dashboard');
        }

        $user = User::find($request->id);
        $user->delete();

        return Redirect::to('/users');
    }

    public function suspend(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $roleName = GetRoleNameByNumber::getRoleName($user->role);
        if ($roleName != UserRoleEnum::ADMIN->name) {
            return Redirect::to('/dashboard');
        }

        $user = User::find($request->id);
        // $user->suspend = 1;

        $user->suspended = !$user->suspended;

        $user->save();

        return Redirect::to('/users');
    }

    public function update(Request $request): RedirectResponse
    {
        $currentUser = Auth::user();
        $roleName = GetRoleNameByNumber::getRoleName($currentUser->role);
        if ($roleName != UserRoleEnum::ADMIN->name) {
            return Redirect::to('/dashboard');
        }

        $user = User::find($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->streat = $request->streat;
        $user->phone = $request->phone;
        $user->city = $request->city;
        $user->zip = $request->zip;
        $user->country = $request->country;
        $user->citizen_service_number = $request->citizen_service_number;
        $user->role = $request->role;

        $user->save();

        return back();
    }


}
