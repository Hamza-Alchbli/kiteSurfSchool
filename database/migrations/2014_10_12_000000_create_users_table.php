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
            $table->string('streat')->nullable();
            $table->string('city')->nullable();
            $table->string('phone')->nullable();
            $table->string('zip')->nullable();
            $table->string('country')->nullable();
            $table->integer('citizen_service_number')->nullable()->max(9)->min(9);
            $table->tinyInteger('role')->default(UserRoleEnum::CUSTOMER);
            $table->boolean('suspended')->default(false);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
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
