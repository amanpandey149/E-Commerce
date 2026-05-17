import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Package, CheckCircle, Clock } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-500">You have no orders yet.</div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="glass p-6 rounded-2xl">
              <div className="flex flex-wrap justify-between items-center mb-4 border-b border-gray-100 pb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-mono font-medium">{order._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-bold text-indigo-600">${order.totalPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  {order.isDelivered ? (
                    <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" /> Delivered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm font-medium">
                      <Clock className="w-4 h-4" /> Processing
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover bg-gray-50" />
                    <div className="flex-grow">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="font-medium">${(item.qty * item.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
