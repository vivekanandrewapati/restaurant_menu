import { useContext } from 'react';
import { OrderContext } from '../../context/OrderContext';
import OrderList from '../../components/orders/OrderList';

export default function OrderPage() {
    const { orders } = useContext(OrderContext);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Order History</h1>
                    <span className="text-gray-600">
                        Total Orders: {orders.length}
                    </span>
                </div>

                <OrderList />
            </div>
        </div>
    );
}
