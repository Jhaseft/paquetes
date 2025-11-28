<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TrackingUpdateController;
use App\Http\Controllers\PublicTrackingController;
use Inertia\Inertia;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', function () {
    // Traer todas las órdenes con sus items y actualizaciones
    $orders = \App\Models\Order::with('items', 'updates')
                ->orderBy('id', 'desc')
                ->get();

    return Inertia::render('Welcome', [
        'orders' => $orders,
        'auth_user' => auth()->user(),
    ]);



     Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');

    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    
})->middleware(['auth', 'verified'])->name('home');


Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__.'/auth.php';
