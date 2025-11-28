<?php
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TrackingUpdateController;
use App\Http\Controllers\PublicTrackingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Panel admin
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/', function () {
        $orders = \App\Models\Order::with('items', 'updates')->orderBy('id', 'desc')->get();
        return Inertia::render('Welcome', [
            'orders' => $orders,
            'auth_user' => auth()->user(),
        ]);
    })->name('home');

    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');

    // Perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




// Público
Route::get('/tracking', [PublicTrackingController::class, 'form'])->name('tracking.form');
Route::post('/tracking', [PublicTrackingController::class, 'search'])->name('tracking.search');
Route::post('/tracking/update', [TrackingUpdateController::class, 'store'])->name('tracking.update');

require __DIR__.'/auth.php';

