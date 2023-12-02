<?php
namespace App\Enum;

enum PaymentEnum:int
{
    case PENDING = 0;
    case COMPLETED = 1;
}
