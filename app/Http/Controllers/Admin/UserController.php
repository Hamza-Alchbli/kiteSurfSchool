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
    public function users(){
        // geta ll users
        $users = User::all();
        return Inertia::render('Users/AllUsers', [
            'users' => $users,
        ]);
    }

    public function destroy(Request $request): RedirectResponse
    {
        $user = User::find($request->id);
        $user->delete();

        return Redirect::to('/users');
    }

    public function suspend(Request $request): RedirectResponse
    {
        $user = User::find($request->id);
        // $user->suspend = 1;

        if($user->suspended == 1){
            $user->suspended = 0;
        }else{
            $user->suspended = 1;
        }
        $user->save();

        return Redirect::to('/users');
    }

}
