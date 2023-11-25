<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('locations')->insert([
            [
                'name' => 'Zandvoort',
            ],
            [
                'name' => 'Muiderberg',
            ],
            [
                'name' => 'Wijk aan Zee',
            ],
            [
                'name' => 'IJmuiden',
            ],
            [
                'name' => 'Scheveningen',
            ],
            [
                'name' => 'Hoek van Holland',
            ],
        ]);
    }
}
