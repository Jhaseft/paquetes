import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import ProductsModal from '@/componentswelcome/ProductsModal';
import Header from '@/componentswelcome/Header';
import OrdenyBuscador from '@/componentswelcome/OrdenyBuscador';

export default function Welcome({ auth_user, orders = [] }) {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [search, setSearch] = useState('');

    // Filtrar órdenes por código de tracking
    const filteredOrders = orders.filter(o =>
        o.tracking_code.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Head title={`Panel Administrativo - ${auth_user?.email || ''}`} />

            <div className="min-h-screen bg-gray-100 p-6">
                <Header auth_user={auth_user}/>
                <OrdenyBuscador search={search} setSearch={setSearch}/>

                {/* Tabla de órdenes */}
                <section className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Historial de órdenes</h2>

                    {filteredOrders.length === 0 ? (
                        <p className="text-gray-500">No hay órdenes coincidentes.</p>
                    ) : (
                        <table className="w-full border">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2 border">Código</th>
                                    <th className="p-2 border">Descripción</th>
                                    <th className="p-2 border">Origen</th>
                                    <th className="p-2 border">Destino</th>
                                    <th className="p-2 border">Subtotal</th>
                                    <th className="p-2 border">Total</th>
                                    <th className="p-2 border">Estado</th>
                                    <th className="p-2 border">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((o) => (
                                    <tr key={o.id}>
                                        <td className="p-2 border">{o.tracking_code}</td>
                                        <td className="p-2 border">{o.description || '-'}</td>
                                        <td className="p-2 border">{o.origin_address || '-'}</td>
                                        <td className="p-2 border">{o.destination_address || '-'}</td>
                                        <td className="p-2 border">Bs {o.subtotal}</td>
                                        <td className="p-2 border">Bs {o.total}</td>
                                        <td className="p-2 border">{o.status}</td>
                                        <td className="p-2 border">
                                            <button
                                                className="text-blue-600 hover:underline"
                                                onClick={() => setSelectedOrder(o)}
                                            >
                                                Ver productos / updates
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>

                {/* Modal de productos */}
                {selectedOrder && (
                    <ProductsModal
                        order={selectedOrder}
                        onClose={() => setSelectedOrder(null)}
                    />
                )}
            </div>
        </>
    );
}
