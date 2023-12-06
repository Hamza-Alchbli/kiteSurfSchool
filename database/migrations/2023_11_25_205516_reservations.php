<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('instructor_id')->constrained('users');
            $table->foreignId('package_id')->constrained();
            $table->foreignId('location_id')->constrained();
            $table->dateTime('start_time');
            $table->boolean('is_paid')->default(false);
            $table->boolean('void_request')->default(false);
            $table->string('void_request_reason')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
