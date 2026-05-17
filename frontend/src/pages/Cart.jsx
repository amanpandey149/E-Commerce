import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=checkout'); // simple logic
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-indigo-50 p-6 rounded-full text-indigo-400 mb-6">
          <ShoppingBag className="w-16 h-16" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-grow space-y-6">
          {cartItems.map(item => (
            <div key={item.product} className="glass p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 relative">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-gray-50" />
              <div className="flex-grow">
                <Link to={`/product/${item.product}`} className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition">
                  {item.name}
                </Link>
                <div className="text-gray-500 font-medium">${item.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-4">
                <select 
                  value={item.qty} 
                  onChange={(e) => addToCart(item, Number(e.target.value))}
                  className="p-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {[...Array(item.stock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
                <button 
                  onClick={() => removeFromCart(item.product)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:w-96">
          <div className="glass p-8 rounded-3xl sticky top-24">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
            <div className="space-y-4 mb-6 text-lg">
              <div className="flex justify-between text-gray-600">
                <span>Items:</span>
                <span className="font-medium text-gray-900">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-bold text-gray-900">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-indigo-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
