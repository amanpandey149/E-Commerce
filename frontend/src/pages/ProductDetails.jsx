import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        toast.error('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Link to="/products" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-8 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-white aspect-square flex items-center justify-center p-8">
          <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-sm text-indigo-600 font-bold uppercase tracking-widest mb-2">{product.category}</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-extrabold text-gray-900">${product.price?.toFixed(2)}</span>
            <div className="flex items-center text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 text-gray-300" />
              <span className="text-gray-500 text-sm ml-2">(124 reviews)</span>
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.description}</p>

          <div className="border-t border-gray-100 pt-8 mt-auto">
            <div className="flex items-center gap-6 mb-6">
              <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 font-medium border-x border-gray-200 bg-white">{qty}</span>
                  <button 
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    className="px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
