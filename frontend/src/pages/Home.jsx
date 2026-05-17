import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gray-900 text-white min-h-[500px] flex items-center mt-6 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10 p-12 lg:p-24 max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight"
          >
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Lifestyle.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 mb-10 max-w-xl"
          >
            Discover our curated collection of premium products designed to enhance your everyday life. Unbeatable quality, exceptional design.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/products" className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg shadow-white/10 hover:scale-105 active:scale-95 duration-200">
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="glass p-8 rounded-3xl flex flex-col items-center text-center group hover:-translate-y-2 transition duration-300">
          <div className="bg-indigo-100 p-4 rounded-full text-indigo-600 mb-6 group-hover:scale-110 transition duration-300">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-3">Premium Selection</h3>
          <p className="text-gray-600">Carefully curated products that meet our high standards of quality.</p>
        </div>
        <div className="glass p-8 rounded-3xl flex flex-col items-center text-center group hover:-translate-y-2 transition duration-300">
          <div className="bg-purple-100 p-4 rounded-full text-purple-600 mb-6 group-hover:scale-110 transition duration-300">
            <Zap className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
          <p className="text-gray-600">Get your items quickly with our expedited shipping options.</p>
        </div>
        <div className="glass p-8 rounded-3xl flex flex-col items-center text-center group hover:-translate-y-2 transition duration-300">
          <div className="bg-green-100 p-4 rounded-full text-green-600 mb-6 group-hover:scale-110 transition duration-300">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-3">Secure Checkout</h3>
          <p className="text-gray-600">Your payments are safe with our encrypted checkout process.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
