<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('packages')->insert([
            [
                'name' => 'Privéles',
                'duration' => 3,
                'price' => 175,
                'description' => 'Privéles 2.5 uur, €175 inclusief alle materialen, één persoon per les, 1 dagdeel',

            ],
            [
                'name' => 'Losse Duo Kiteles',
                'duration' => 4,
                'price' => 135,
                'description' => 'Losse Duo Kiteles 3.5 uur, €135 per persoon inclusief alle materialen, maximaal 2 personen per les, 1 dagdeel',

            ],
            [
                'name' => 'Kitesurf Duo lespakket 3 lessen',
                'duration' => 4,
                'price' => 375,
                'description' => 'Kitesurf Duo lespakket 3 lessen 10.5 uur, €375 per persoon inclusief materialen, maximaal 2 personen per les, 3 dagdelen',

            ],
            [
                'name' => 'Kitesurf Duo lespakket 5 lessen',
                'duration' => 4,
                'price' => 675,
                'description' => 'Kitesurf Duo lespakket 5 lessen 17.5 uur, €675 per persoon inclusief materialen, maximaal 2 personen per les, 5 dagdelen',

            ],
        ]);
    }
}
