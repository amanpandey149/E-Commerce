import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-md">
              Out of Stock
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        <div className="text-xs text-indigo-500 font-semibold uppercase tracking-wider mb-1">{product.category}</div>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-indigo-600 transition">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
          <Link 
            to={`/product/${product._id}`}
            className="bg-gray-100 hover:bg-indigo-600 hover:text-white text-gray-900 p-2 rounded-full transition-colors duration-300"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
