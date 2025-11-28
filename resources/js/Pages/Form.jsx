import React, { useState } from 'react';

export default function TrackingForm() {
    const [trackingCode, setTrackingCode] = useState('');
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    // Campos del modal
    const [personName, setPersonName] = useState('');
    const [notes, setNotes] = useState('');
    const [location, setLocation] = useState('');
    const [arrivedOk, setArrivedOk] = useState(1);

    const searchOrder = async (e) => {
        e.preventDefault();
        setError('');
        setOrder(null);

        try {
            const res = await fetch('/tracking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({ tracking_code: trackingCode })
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || 'Código no encontrado');
                return;
            }

            const data = await res.json();
            setOrder(data.order);
        } catch (err) {
            console.error(err);
            setError('Error al buscar la orden');
        }
    };

    const addUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/tracking/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({
                    tracking_code: trackingCode,
                    person_name: personName,
                    notes,
                    location,
                    arrived_ok: arrivedOk
                })
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.message || 'Error al agregar actualización');
                return;
            }

            const data = await res.json();
            // actualizar el estado de la orden con la nueva actualización
            setOrder(prev => ({
                ...prev,
                updates: [...prev.updates, data.update]
            }));
            // cerrar modal y limpiar campos
            setShowModal(false);
            setPersonName('');
            setNotes('');
            setLocation('');
            setArrivedOk(1);
        } catch (err) {
            console.error(err);
            alert('Error al agregar actualización');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Buscar orden</h1>
            <form onSubmit={searchOrder} className="flex gap-2">
                <input
                    type="text"
                    placeholder="Código de seguimiento"
                    value={trackingCode}
                    onChange={e => setTrackingCode(e.target.value)}
                    className="border p-2 rounded flex-1"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Buscar
                </button>
            </form>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            {order && (
                <div className="mt-6 p-4 border rounded">
                    <h2 className="font-semibold">Orden: {order.tracking_code}</h2>
                    <p>Descripción: {order.description}</p>
                    <p>Origen: {order.origin_address}</p>
                    <p>Destino: {order.destination_address}</p>
                    <p>Subtotal: Bs {order.subtotal}</p>
                    <p>Total: Bs {order.total}</p>

                    <h3 className="font-semibold mt-4">Productos</h3>
                    <ul>
                        {order.items.map(item => (
                            <li key={item.id}>
                                {item.item_name} - {item.quantity} x Bs {item.unit_price} = Bs {item.total_line}
                            </li>
                        ))}
                    </ul>

                    <h3 className="font-semibold mt-4 flex justify-between items-center">
                        Actualizaciones
                        <button 
                            className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                            onClick={() => setShowModal(true)}
                        >
                            + Nueva
                        </button>
                    </h3>
                    <ul>
                        {order.updates.map(update => (
                            <li key={update.id}>
                                {update.person_name} - {update.location} - {update.notes}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                        <h2 className="text-lg font-bold mb-4">Agregar actualización</h2>
                        <form onSubmit={addUpdate} className="flex flex-col gap-2">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={personName}
                                onChange={e => setPersonName(e.target.value)}
                                className="border p-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Ubicación"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                className="border p-2 rounded"
                            />
                            <textarea
                                placeholder="Notas"
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                className="border p-2 rounded"
                            />
                            <select
                                value={arrivedOk}
                                onChange={e => setArrivedOk(Number(e.target.value))}
                                className="border p-2 rounded"
                            >
                                <option value={1}>Llegó correctamente</option>
                                <option value={0}>Problema en entrega</option>
                            </select>
                            <div className="flex justify-end gap-2 mt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1 rounded border">Cancelar</button>
                                <button type="submit" className="px-3 py-1 rounded bg-blue-600 text-white">Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
