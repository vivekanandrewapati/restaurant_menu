import { useState, useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import { CartContext } from '../../context/CartContext';
import Button from '../common/Button';
import MenuForm from './MenuForm';

export default function MenuCard({ item }) {
    const { deleteMenuItem } = useContext(MenuContext);
    const { addToCart } = useContext(CartContext);
    const [showEditForm, setShowEditForm] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                        <Button onClick={() => addToCart(item)}>
                            Add to Cart
                        </Button>
                    </div>
                    <div className="flex justify-between gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setShowEditForm(true)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => deleteMenuItem(item.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>

            {showEditForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <MenuForm item={item} onClose={() => setShowEditForm(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}
