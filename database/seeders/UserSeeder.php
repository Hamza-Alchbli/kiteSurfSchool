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
        // Create a user with the admin role
        User::create(
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'email_verified_at' => now(),
                'role' => 5,
                'password' => bcrypt('12345678'),
                'remember_token' => Str::random(10),
            ]
        );
        User::create(
            [
                'name' => 'Employee',
                'email' => 'employee@gmail.com',
                'email_verified_at' => now(),
                'role' => 3,
                'password' => bcrypt('12345678'),
                'remember_token' => Str::random(10),
            ]
        );
        User::create(
            [
                'name' => 'customer',
                'email' => 'customer@gmail.com',
                'email_verified_at' => now(),
                'role' => 1,
                'password' => bcrypt('12345678'),
                'remember_token' => Str::random(10),
            ],
        );


        User::factory()
            ->count(7)
            ->create();
    }
}
