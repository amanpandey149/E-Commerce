import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/orders',
        {
          orderItems: cartItems,
          shippingAddress: { address, city, postalCode, country },
          paymentMethod,
          totalPrice: subtotal,
        },
        config
      );

      toast.success('Order placed successfully!');
      clearCart();
      navigate(`/orders`);
    } catch (error) {
      toast.error('Error placing order');
    }
  };

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
          <form onSubmit={placeOrderHandler} id="checkout-form" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 bg-white/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 bg-white/50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 bg-white/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 bg-white/50" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Payment Method</h2>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={(e) => setPaymentMethod(e.target.value)} className="text-indigo-600 focus:ring-indigo-500" />
                <span className="font-medium">PayPal</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="Stripe" checked={paymentMethod === 'Stripe'} onChange={(e) => setPaymentMethod(e.target.value)} className="text-indigo-600 focus:ring-indigo-500" />
                <span className="font-medium">Credit Card</span>
              </label>
            </div>
          </form>
        </div>

        <div className="glass p-8 rounded-3xl h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
                  <p className="text-gray-500 text-sm">{item.qty} x ${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between text-xl font-extrabold text-gray-900">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button 
            type="submit" 
            form="checkout-form"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-indigo-200"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
