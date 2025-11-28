<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\TrackingUpdate;
use Illuminate\Http\Request;

class TrackingUpdateController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'tracking_code' => 'required',
            'person_name' => 'required|string',
            'notes' => 'nullable|string',
            'location' => 'nullable|string',
            'arrived_ok' => 'required|integer|in:0,1',
        ]);

        $order = Order::where('tracking_code', $request->tracking_code)->firstOrFail();

        $update = TrackingUpdate::create([
            'order_id' => $order->id,
            'person_name' => $request->person_name,
            'notes' => $request->notes,
            'location' => $request->location,
            'arrived_ok' => $request->arrived_ok,
        ]);

        return response()->json([
            'message' => 'Actualización registrada',
            'update' => $update
        ]);
    }
}
