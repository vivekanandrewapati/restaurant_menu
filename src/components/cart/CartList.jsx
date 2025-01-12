import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from './CartItem';

export default function CartList() {
    const { cartItems } = useContext(CartContext);

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-8 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-600">Your cart is empty</h3>
                <p className="mt-2 text-gray-500">Add some delicious items to your cart!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
            ))}
        </div>
    );
}
