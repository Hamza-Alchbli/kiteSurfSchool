<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Enum\PaymentEnum;
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
                'user_id' => 3, // Replace with the actual user_id
                'reservation_id' => 1, // Replace with the actual reservation_id
                'amount' => 175,
                'payment_status' => PaymentEnum::COMPLETED,
                'user_payment_status' => PaymentEnum::COMPLETED,
                'created_at' => now(),
            ],
            [
                'user_id' => 3, // Replace with the actual user_id
                'reservation_id' => 2, // Replace with the actual reservation_id
                'amount' => 135,
                'payment_status' => PaymentEnum::COMPLETED,
                'user_payment_status' => PaymentEnum::COMPLETED,
                'created_at' => now(),
            ],
            [
                'user_id' => 3, // Replace with the actual user_id
                'reservation_id' => 3, // Replace with the actual reservation_id
                'amount' => 375,
                'payment_status' => PaymentEnum::PENDING,
                'user_payment_status' => PaymentEnum::PENDING,
                'created_at' => now(),
            ],
            [
                'user_id' => 3, // Replace with the actual user_id
                'reservation_id' => 4, // Replace with the actual reservation_id
                'amount' => 675,
                'payment_status' => PaymentEnum::PENDING,
                'user_payment_status' => PaymentEnum::PENDING,
                'created_at' => now(),
            ],
        ]);
    }
}
