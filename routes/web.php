<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AdminUser;
use App\Http\Middleware\AdminEmployee;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\controllers\ReservationController;
use App\Http\Controllers\Admin\PaymentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

// Route to users page and check if user is logged in, verified and has admin role
Route::middleware(['auth', 'verified', AdminUser::class])->group(function () {
    Route::get('/users', [UserController::class, 'users'])->name('users');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::patch('/users/{id}/suspend', [UserController::class, 'suspend'])->name('users.suspend');
    Route::patch('/users/{id}/update', [UserController::class, 'update'])->name('users.update');

    Route::get('/payments', [PaymentController::class, 'payments'])->name('payments');
    Route::patch('/payments/{id}', [PaymentController::class, 'confirm'])->name('payments.confirm');
    Route::delete('/payments/{id}', [PaymentController::class, 'destroy'])->name('payments.destroy');
});

Route::middleware(['auth', 'verified', AdminEmployee::class])->group(function(){
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations');
    Route::delete('/reservations/{id}', [ReservationController::class, 'destroy'])->name('reservations.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::delete('/reservations/user/{id}', [ReservationController::class, 'destroyUser'])->name('reservations.user.destroy');

});

require __DIR__ . '/auth.php';
