import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Button from '../common/Button';

export default function CartItem({ item }) {
    const { updateQuantity, removeFromCart } = useContext(CartContext);

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-lg shadow">
            <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2 self-center sm:self-auto">
                <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    +
                </button>
            </div>
            <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 w-full sm:w-auto">
                <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                </p>
                <Button
                    variant="danger"
                    onClick={() => removeFromCart(item.id)}
                    className="w-full sm:w-auto"
                >
                    Remove
                </Button>
            </div>
        </div>
    );
}
