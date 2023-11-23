<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid; // Import the Uuid class

use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::table('categories')->insert([
        //     'category_id' => Uuid::uuid4()->toString(),
        //     'name' => Str::random(10),
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);
        User::factory()
            ->count(10)
            ->create();
    }
}
