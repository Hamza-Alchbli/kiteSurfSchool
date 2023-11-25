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
                'user_id' => 1, // Replace with the actual user_id
                'instructer_id' => 2, // Replace with the actual instructer_id
                'package_id' => 1, // Replace with the actual package_id
                'location_id' => 1, // Replace with the actual location_id
            ],
            [
                'user_id' => 2, // Replace with the actual user_id
                'instructer_id' => 3, // Replace with the actual instructer_id
                'package_id' => 2, // Replace with the actual package_id
                'location_id' => 2, // Replace with the actual location_id
            ],
            [
                'user_id' => 3, // Replace with the actual user_id
                'instructer_id' => 4, // Replace with the actual instructer_id
                'package_id' => 3, // Replace with the actual package_id
                'location_id' => 3, // Replace with the actual location_id
            ],
            [
                'user_id' => 4, // Replace with the actual user_id
                'instructer_id' => 5, // Replace with the actual instructer_id
                'package_id' => 4, // Replace with the actual package_id
                'location_id' => 4, // Replace with the actual location_id
            ],
        ]);
    }
}
