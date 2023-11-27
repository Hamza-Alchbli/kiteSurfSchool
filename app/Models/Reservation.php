<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    function package(){
        return $this->belongsTo(Package::class, 'package_id');
    }

    function payment() {
        return $this->hasOne(Payment::class, 'reservation_id');
    }
}
