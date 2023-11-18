<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enum\UserRoleEnum;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            // user role enum column. 5 = admin, 3 = employee, 1 = customer
            $table->enum('role', [UserRoleEnum::ADMIN, UserRoleEnum::EMPLOYEE, UserRoleEnum::CUSTOMER])->default(UserRoleEnum::CUSTOMER)->default(UserRoleEnum::CUSTOMER);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
