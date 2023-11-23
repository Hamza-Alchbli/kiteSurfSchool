<?php

namespace App\Http\Middleware;

use Closure;
use App\Enum\UserRoleEnum;
use App\Helpers\GetRoleNameByNumber;

class AdminUser
{
    public function handle($request, Closure $next,)
    {
        // $roles will be an array containing the parameters passed to the middleware

        $userRole = $request->user()->role;
        $roleName = strtolower(GetRoleNameByNumber::getRoleName($userRole));
        // dd($roleName);
        if ($roleName != strtolower(UserRoleEnum::ADMIN->name)) {
            return redirect('/dashboard');
        }


        return $next($request);
    }
}
