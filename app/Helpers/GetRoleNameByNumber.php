<?php

namespace App\Helpers;

use App\Enum\UserRoleEnum;

class GetRoleNameByNumber
{
    public static function getRoleName(int $roleNumber): string
    {
        switch ($roleNumber) {
            case UserRoleEnum::CUSTOMER->value:
                return 'CUSTOMER';
            case UserRoleEnum::EMPLOYEE->value:
                return 'EMPLOYEE';
            case UserRoleEnum::ADMIN->value:
                return 'ADMIN';
            default:
                return 'Unknown Role';
        }
    }
}
