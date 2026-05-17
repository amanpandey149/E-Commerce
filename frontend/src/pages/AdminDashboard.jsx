import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:5000/api/products');
    setProducts(data);
  };

  useEffect(() => {
    if (user && user.isAdmin) {
      fetchProducts();
    }
  }, [user]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error('Error deleting product');
      }
    }
  };

  const createHandler = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`http://localhost:5000/api/products`, {}, config);
      toast.success('Sample Product created');
      fetchProducts();
    } catch (error) {
      toast.error('Error creating product');
    }
  };

  if (!user || !user.isAdmin) return <div className="text-center py-20 text-red-500 font-bold">Access Denied</div>;

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard - Products</h1>
        <button onClick={createHandler} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition">
          + Create Product
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="py-4 px-6 font-semibold text-gray-700">ID</th>
              <th className="py-4 px-6 font-semibold text-gray-700">NAME</th>
              <th className="py-4 px-6 font-semibold text-gray-700">PRICE</th>
              <th className="py-4 px-6 font-semibold text-gray-700">CATEGORY</th>
              <th className="py-4 px-6 font-semibold text-gray-700">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                <td className="py-4 px-6 font-mono text-sm text-gray-500">{product._id}</td>
                <td className="py-4 px-6 font-medium text-gray-900">{product.name}</td>
                <td className="py-4 px-6 text-gray-600">${product.price.toFixed(2)}</td>
                <td className="py-4 px-6 text-gray-600">{product.category}</td>
                <td className="py-4 px-6">
                  <button onClick={() => deleteHandler(product._id)} className="text-red-500 hover:text-red-700 font-medium bg-red-50 px-3 py-1 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
