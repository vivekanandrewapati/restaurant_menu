import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedItems = localStorage.getItem('cartItems');
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState('');

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });

        // Show notification
        setNotificationText(`${item.name} added to cart!`);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
    };

    const updateQuantity = (itemId, quantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            total,
            showNotification,
            notificationText
        }}>
            {children}
        </CartContext.Provider>
    );
}
