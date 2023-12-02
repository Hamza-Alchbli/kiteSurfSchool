<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReservationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('reservations')->insert([
            [
                'user_id' => 5, // Replace with the actual user_id
                'instructor_id' => 2, // Replace with the actual instructor_id
                'package_id' => 1, // Replace with the actual package_id
                'location_id' => 1, // Replace with the actual location_id
                'start_time' => '2023-12-20 15:00:00',
                'is_paid' => true,
            ],
            [
                'user_id' => 6, // Replace with the actual user_id
                'instructor_id' => 2, // Replace with the actual instructor_id
                'package_id' => 2, // Replace with the actual package_id
                'location_id' => 2, // Replace with the actual location_id
                'start_time' => '2024-01-25 12:00:00',
                'is_paid' => true,
            ],
            [
                'user_id' => 7, // Replace with the actual user_id
                'instructor_id' => 2, // Replace with the actual instructor_id
                'package_id' => 3, // Replace with the actual package_id
                'location_id' => 3, // Replace with the actual location_id
                'start_time' => '2024-02-05 09:00:00',
                'is_paid' => false,
            ],
            [
                'user_id' => 8, // Replace with the actual user_id
                'instructor_id' => 2, // Replace with the actual instructor_id
                'package_id' => 4, // Replace with the actual package_id
                'location_id' => 4, // Replace with the actual location_id
                'start_time' => '2024-03-30 12:00:00',
                'is_paid' => false,
            ],
        ]);
    }
}
