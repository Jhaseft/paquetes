<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    // LISTA DE ÓRDENES (panel admin)
    public function index()
    {
        return Inertia::render('Orders/Index', [
            'orders' => Order::with('items')
                ->orderBy('id', 'desc')
                ->get(),
        ]);
    }


    // GUARDAR ORDEN
public function store(Request $request)
{
    // Validación según nuevos campos
    $request->validate([
        'description' => 'required',
        'origin_address' => 'required',
        'destination_address' => 'required',
        'products' => 'required|array|min:1',
    ]);

    // Generar código único
    $tracking = strtoupper(substr(md5(time()), 0, 8));

    // Calcular subtotal y total
    $subtotal = 0;
    foreach ($request->products as $p) {
        $subtotal += $p['price'] * $p['quantity'];
    }
    $total = $subtotal;

    // Crear orden
    $order = Order::create([
        'tracking_code' => $tracking,
        'description' => $request->description,
        'origin_address' => $request->origin_address,
        'destination_address' => $request->destination_address,
        'subtotal' => $subtotal,
        'total' => $total,
        'status' => 'pending',
    ]);

    // Insertar items
    foreach ($request->products as $p) {
        OrderItem::create([
            'order_id' => $order->id,
            'item_name' => $p['product_name'], // coincidiendo con el frontend
            'unit_price' => $p['price'],       // coincidiendo con el modelo OrderItem
            'quantity' => $p['quantity'],
            'total_line' => $p['subtotal'],    // coincidiendo con el modelo OrderItem
        ]);
    }

    return redirect()->route('home', $order->id);
}

    // VER DETALLE
    public function show(Order $order)
    {
        $order->load(['items', 'updates']);

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }
}
