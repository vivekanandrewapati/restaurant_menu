import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Header from './components/layout/Header';
import MenuPage from './pages/menu/MenuPage';
import CartPage from './pages/cart/CartPage';
import OrderPage from './pages/orders/OrderPage';
import LoginPage from './pages/auth/LoginPage';

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <MenuProvider>
        <CartProvider>
          <OrderProvider>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={
                  <PrivateRoute>
                    <>
                      <Header />
                      <MenuPage />
                    </>
                  </PrivateRoute>
                } />
                <Route path="/cart" element={
                  <PrivateRoute>
                    <>
                      <Header />
                      <CartPage />
                    </>
                  </PrivateRoute>
                } />
                <Route path="/orders" element={
                  <PrivateRoute>
                    <>
                      <Header />
                      <OrderPage />
                    </>
                  </PrivateRoute>
                } />
              </Routes>
            </div>
          </OrderProvider>
        </CartProvider>
      </MenuProvider>
    </Router>
  );
} 