import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Package } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2">
          <Package className="text-indigo-600" />
          NexusCart
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/products" className="text-gray-600 hover:text-indigo-600 font-medium transition">Products</Link>
          <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 transition">
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/orders" className="text-gray-600 hover:text-indigo-600 font-medium">Orders</Link>
              {user.isAdmin && (
                <Link to="/admin" className="text-indigo-600 font-medium hover:text-purple-600">Admin</Link>
              )}
              <button onClick={handleLogout} className="flex items-center gap-1 text-gray-600 hover:text-red-500 font-medium transition">
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="text-gray-600 font-medium hover:text-indigo-600 transition flex items-center gap-1">
                <User className="w-5 h-5" /> Login
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition shadow-md shadow-indigo-200">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
