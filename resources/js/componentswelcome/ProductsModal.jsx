import React from 'react';

export default function ProductsModal({ order, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
            <div className="bg-white w-11/12 md:w-3/4 p-6 rounded shadow-lg max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Productos de {order.tracking_code}</h2>

                {/* Productos */}
                <table className="w-full border mb-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Producto</th>
                            <th className="p-2 border">Cantidad</th>
                            <th className="p-2 border">Precio unitario</th>
                            <th className="p-2 border">Total línea</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map(item => (
                            <tr key={item.id}>
                                <td className="p-2 border">{item.item_name}</td>
                                <td className="p-2 border">{item.quantity}</td>
                                <td className="p-2 border">Bs {item.unit_price}</td>
                                <td className="p-2 border">Bs {item.total_line}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Tracking Updates */}
                <h3 className="text-xl font-semibold mb-2">Tracking Updates</h3>
                {order.updates.length === 0 ? (
                    <p className="text-gray-500">No hay actualizaciones aún.</p>
                ) : (
                    <ul className="mb-4">
                        {order.updates.map(update => (
                            <li key={update.id} className="border-b py-2">
                                <p>
                                    <strong>{update.person_name}</strong> -{' '}
                                    {update.arrived_ok ? 'Llegó correctamente' : 'Problema en entrega'}
                                </p>
                                {update.notes && <p>Notas: {update.notes}</p>}
                                {update.location && (
                                    <p>Ubicación: <a href={update.location} target="_blank" className="text-blue-600 underline">Ver en mapa</a></p>
                                )}
                                <p className="text-sm text-gray-400">
                                    {new Date(update.created_at).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex justify-end">
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
