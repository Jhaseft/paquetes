import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Welcome({ auth_user, orders = [] }) { // <-- valor por defecto
    return (
        <>
            <Head title={`Panel Administrativo - ${auth_user?.email || ''}`} />

            <div className="min-h-screen bg-gray-100 p-6">

                {/* HEADER */}
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold">Panel Administrativo</h1>
                    <div className="text-right">
                        <p className="font-semibold">{auth_user?.email || 'Admin'}</p>
                        <form method="POST" action="/logout">
                            <button className="text-red-600 mt-2">Cerrar sesión</button>
                        </form>
                    </div>
                </header>

                {/* BOTÓN CREAR ORDEN */}
                <div className="mb-6">
                    <Link
                        href="/orders/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                    >
                        ➕ Crear nueva orden
                    </Link>
                </div>

                {/* HISTORIAL DE ÓRDENES */}
                <section className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Historial de órdenes</h2>

                    {(!orders || orders.length === 0) ? (
                        <p className="text-gray-500">No hay órdenes aún.</p>
                    ) : (
                        <table className="w-full border">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2 border">Código</th>
                                    <th className="p-2 border">Cliente</th>
                                    <th className="p-2 border">Total</th>
                                    <th className="p-2 border">Estado</th>
                                    <th className="p-2 border">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o.id}>
                                        <td className="p-2 border">{o.tracking_code}</td>
                                        <td className="p-2 border">{o.customer_name}</td>
                                        <td className="p-2 border">Bs {o.total}</td>
                                        <td className="p-2 border">{o.status}</td>
                                        <td className="p-2 border">
                                            <Link
                                                href={`/orders/${o.id}`}
                                                className="text-blue-600"
                                            >
                                                Ver
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </div>
        </>
    );
}
