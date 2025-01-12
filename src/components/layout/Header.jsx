import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

export default function Header() {
    const { cartItems, showNotification, notificationText } = useContext(CartContext);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-white shadow-md relative">
            {showNotification && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300">
                    {notificationText}
                </div>
            )}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        FoodDelivery
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link to="/" className="hover:text-blue-600">Menu</Link>
                        <Link to="/orders" className="hover:text-blue-600">Orders</Link>
                        <Link to="/cart" className="relative hover:text-blue-600">
                            Cart
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
