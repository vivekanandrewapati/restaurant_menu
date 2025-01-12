import { createContext, useState, useEffect } from 'react';

export const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (cartItems, total) => {
        const newOrder = {
            id: Date.now(),
            items: cartItems,
            total,
            date: new Date().toISOString(),
            status: 'pending'
        };
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
    };

    const value = {
        orders,
        addOrder
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
}
