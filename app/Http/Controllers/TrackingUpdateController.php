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
            'name_from_form' => 'required',
            'comment' => 'nullable',
            'status_update' => 'required|in:received,in_route,delivered,damaged',
            'location_lat' => 'nullable|numeric',
            'location_lng' => 'nullable|numeric',
        ]);

        $order = Order::where('tracking_code', $request->tracking_code)->firstOrFail();

        TrackingUpdate::create([
            'order_id' => $order->id,
            'name_from_form' => $request->name_from_form,
            'comment' => $request->comment,
            'status_update' => $request->status_update,
            'location_lat' => $request->location_lat,
            'location_lng' => $request->location_lng,
        ]);

        // Actualizar estado principal del paquete
        $order->update([
            'status' => $request->status_update,
        ]);

        return back()->with('success', 'Actualización registrada.');
    }
}
