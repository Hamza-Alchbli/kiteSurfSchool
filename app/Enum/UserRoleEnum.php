<?php
namespace App\Enum;

enum UserRoleEnum:int
{
    case CUSTOMER = 1;
    case EMPLOYEE = 3;
    case ADMIN = 5;
}
