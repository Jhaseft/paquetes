<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Inertia\Inertia;

class PublicTrackingController extends Controller
{
    // Mostrar formulario
    public function form()
    {
       return Inertia::render('Form'); // O retorna el HTML de tu SPA si es necesario
    }

    // Buscar orden por código
    public function search(Request $request)
    {
        $request->validate([
            'tracking_code' => 'required|string',
        ]);

        $order = Order::with(['items', 'updates'])
            ->where('tracking_code', $request->tracking_code)
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Código de seguimiento no encontrado.'
            ], 404);
        }

        return response()->json([
            'order' => $order
        ]);
    }
}
