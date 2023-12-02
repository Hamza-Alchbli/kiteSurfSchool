<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use HasFactory;
    use SoftDeletes;

    function reservation() {
        return $this->belongsTo(Reservation::class);
    }

    function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

}
