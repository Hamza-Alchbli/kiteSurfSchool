<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    use HasFactory;
    use SoftDeletes;

    function package(){
        return $this->belongsTo(Package::class, 'package_id');
    }

    function payment() {
        return $this->hasOne(Payment::class, 'reservation_id');
    }
    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
