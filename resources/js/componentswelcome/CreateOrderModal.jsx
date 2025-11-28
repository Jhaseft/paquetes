import React, { useState } from 'react';

export default function CreateOrderModal({ onClose }) {
    const [description, setDescription] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);

    // Calcular subtotal de todos los productos
    const subtotal = products.reduce((acc, p) => acc + p.quantity * p.price, 0);
    const total = subtotal; // Podrías agregar impuestos si quieres

    const addProduct = () => {
        if (!productName || quantity <= 0 || price <= 0) return;
        setProducts([
            ...products,
            { id: Date.now(), productName, quantity, price, subtotal: quantity * price },
        ]);
        setProductName('');
        setQuantity(1);
        setPrice(0);
    };

    const removeProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const submitOrder = async (e) => {
        e.preventDefault();
        if (!description || !origin || !destination || products.length === 0) {
            alert("Completa todos los campos y agrega al menos un producto.");
            return;
        }

        const payload = {
            description,
            origin_address: origin,
            destination_address: destination,
            subtotal,
            total,
            status: 'pending',
            products: products.map(p => ({
                product_name: p.productName,
                quantity: p.quantity,
                price: p.price,
                subtotal: p.subtotal,
            })),
        };

        try {
            const res = await fetch('/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Error al crear la orden');

            alert('Orden creada correctamente');
            onClose();
        } catch (err) {
            console.error(err);
            alert('Hubo un error al crear la orden');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
            <div className="bg-white w-11/12 md:w-3/4 p-6 rounded shadow-lg max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Crear nueva orden</h2>

                <form onSubmit={submitOrder}>
                    {/* Información de la orden */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Descripción</label>
                        <input
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div className="mb-4 flex gap-4">
                        <div className="flex-1">
                            <label className="block font-semibold mb-1">Origen</label>
                            <input
                                type="text"
                                value={origin}
                                onChange={e => setOrigin(e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block font-semibold mb-1">Destino</label>
                            <input
                                type="text"
                                value={destination}
                                onChange={e => setDestination(e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </div>

                    {/* Agregar productos */}
                    <div className="mb-4 border-t pt-4">
                        <h3 className="font-semibold mb-2">Agregar productos</h3>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Nombre del producto"
                                value={productName}
                                onChange={e => setProductName(e.target.value)}
                                className="flex-2 border p-2 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Cantidad"
                                value={quantity}
                                onChange={e => setQuantity(parseInt(e.target.value))}
                                className="w-20 border p-2 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Precio unitario"
                                value={price}
                                onChange={e => setPrice(parseFloat(e.target.value))}
                                className="w-32 border p-2 rounded"
                            />
                            <button type="button" onClick={addProduct} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                                ➕
                            </button>
                        </div>

                        {/* Lista de productos */}
                        <table className="w-full border mb-2">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2 border">Producto</th>
                                    <th className="p-2 border">Cantidad</th>
                                    <th className="p-2 border">Precio unitario</th>
                                    <th className="p-2 border">Subtotal</th>
                                    <th className="p-2 border">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id}>
                                        <td className="p-2 border">{p.productName}</td>
                                        <td className="p-2 border">{p.quantity}</td>
                                        <td className="p-2 border">Bs {p.price}</td>
                                        <td className="p-2 border">Bs {p.subtotal}</td>
                                        <td className="p-2 border">
                                            <button type="button" onClick={() => removeProduct(p.id)} className="text-red-600">
                                                ✖
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <p className="text-right font-semibold text-lg">Subtotal: Bs {subtotal}</p>
                        <p className="text-right font-bold text-xl">Total: Bs {total}</p>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                            Guardar orden
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
