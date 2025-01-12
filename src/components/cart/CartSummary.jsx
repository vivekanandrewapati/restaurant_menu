import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { OrderContext } from '../../context/OrderContext';
import Button from '../common/Button';

export default function CartSummary() {
    const { cartItems, total, clearCart } = useContext(CartContext);
    const { addOrder } = useContext(OrderContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        try {
            addOrder(cartItems, total);
            clearCart();
            navigate('/orders');
        } catch (error) {
            console.error('Checkout failed:', error);
        }
    };

    const deliveryFee = 5.00;
    const subtotal = total;
    const finalTotal = subtotal + deliveryFee;

    return (
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h3 className="text-xl font-semibold">Order Summary</h3>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 font-semibold flex justify-between">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                </div>
            </div>

            <Button
                onClick={handleCheckout}
                className="w-full"
                disabled={cartItems.length === 0}
            >
                Proceed to Checkout
            </Button>
        </div>
    );
}
