<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicTrackingController extends Controller
{
    public function form()
    {
        return Inertia::render('Tracking/Search');
    }

    public function search(Request $request)
    {
        $request->validate([
            'tracking_code' => 'required',
        ]);

        $order = Order::where('tracking_code', $request->tracking_code)
                      ->with('items', 'updates')
                      ->first();

        if (!$order) {
            return back()->withErrors(['tracking_code' => 'No existe este código']);
        }

        return Inertia::render('Tracking/Show', [
            'order' => $order
        ]);
    }
}
