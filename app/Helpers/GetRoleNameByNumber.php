<?php

namespace App\Helpers;

use App\Enum\UserRoleEnum;

class GetRoleNameByNumber
{
    public static function getRoleName(int $roleNumber): string
    {
        switch ($roleNumber) {
            case UserRoleEnum::CUSTOMER->value:
                return 'Customer';
            case UserRoleEnum::EMPLOYEE->value:
                return 'Employee';
            case UserRoleEnum::ADMIN->value:
                return 'Admin';
            default:
                return 'Unknown Role';
        }
    }
}
