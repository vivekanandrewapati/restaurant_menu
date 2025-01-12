export default function OrderItem({ order }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <p className="text-gray-600">
                        {new Date(order.date).toLocaleDateString()} at{' '}
                        {new Date(order.date).toLocaleTimeString()}
                    </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                    {order.status}
                </span>
            </div>
            <div className="space-y-2">
                {order.items.map(item => (
                    <div key={item.id} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="border-t mt-4 pt-4 font-semibold flex justify-between">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
            </div>
        </div>
    );
}
