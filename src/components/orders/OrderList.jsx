import { useContext } from 'react';
import { OrderContext } from '../../context/OrderContext';
import OrderItem from './OrderItem';

export default function OrderList() {
    const { orders } = useContext(OrderContext);

    if (orders.length === 0) {
        return (
            <div className="text-center py-8 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-600">No orders yet</h3>
                <p className="mt-2 text-gray-500">Your order history will appear here</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {orders.map(order => (
                <OrderItem key={order.id} order={order} />
            ))}
        </div>
    );
}
