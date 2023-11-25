<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('payments')->insert([
            [
                'user_id' => 1, // Replace with the actual user_id
                'reservation_id' => 1, // Replace with the actual reservation_id
                'amount' => 175,
                'payment_status' => 'completed',
            ],
            [
                'user_id' => 2, // Replace with the actual user_id
                'reservation_id' => 2, // Replace with the actual reservation_id
                'amount' => 135,
                'payment_status' => 'completed',
            ],
            [
                'user_id' => 3, // Replace with the actual user_id
                'reservation_id' => 3, // Replace with the actual reservation_id
                'amount' => 375,
                'payment_status' => 'pending',
            ],
            [
                'user_id' => 4, // Replace with the actual user_id
                'reservation_id' => 4, // Replace with the actual reservation_id
                'amount' => 675,
                'payment_status' => 'pending',
            ],
        ]);
    }
}
