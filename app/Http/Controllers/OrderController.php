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

    // FORMULARIO PARA CREAR
    public function create()
    {
        return Inertia::render('Orders/Create');
    }

    // GUARDAR ORDEN
    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required',
            'customer_phone' => 'nullable',
            'products' => 'required|array|min=1',
        ]);

        // GENERAR CÓDIGO ÚNICO
        $tracking = strtoupper(substr(md5(time()), 0, 8));

        $subtotal = 0;

        foreach ($request->products as $p) {
            $subtotal += $p['price'] * $p['quantity'];
        }

        $total = $subtotal;

        $order = Order::create([
            'tracking_code' => $tracking,
            'customer_name' => $request->customer_name,
            'customer_phone' => $request->customer_phone,
            'subtotal' => $subtotal,
            'total' => $total,
            'status' => 'pending',
        ]);

        // INSERTAR ITEMS
        foreach ($request->products as $p) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_name' => $p['product_name'],
                'quantity' => $p['quantity'],
                'price' => $p['price'],
                'subtotal' => $p['price'] * $p['quantity'],
            ]);
        }

        return redirect()->route('orders.show', $order->id);
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
