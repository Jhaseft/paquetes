import { useState } from 'react';
import CreateOrderModal from './CreateOrderModal'; // importa el modal

export default function OrdenyBuscador({ search, setSearch }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex items-center justify-between mb-6">
            {/* Botón para abrir modal */}
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
                Crear nueva orden
            </button>

            {/* Input de búsqueda */}
            <input
                type="text"
                placeholder="Buscar por código..."
                className="border p-2 rounded w-64"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            {/* Modal */}
            {showModal && <CreateOrderModal onClose={() => setShowModal(false)} />}
        </div>
    );
}
