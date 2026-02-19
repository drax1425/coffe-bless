import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Category, Product } from '../types';
import { useCart } from '../context/CartContext';
import { Plus, Coffee, ShoppingBag, ArrowLeft } from 'lucide-react';

interface MenuProps {
    products: Product[];
    onCustomize: (productId: string) => void;
    onViewCart: () => void;
    onBack: () => void;
}



export const Menu = ({ products, onCustomize, onViewCart, onBack }: MenuProps) => {
    const categories = [...new Set(products.map(p => p.category))];
    const [activeCategory, setActiveCategory] = useState<Category>(categories[0] || 'Café');
    const { addToCart, totalItems } = useCart();

    const filteredProducts = products.filter(p => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-stone-900 text-stone-100 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 p-4 shadow-sm">
                <div className="flex justify-between items-center max-w-lg mx-auto">
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="p-2 bg-stone-800 rounded-full hover:bg-stone-700 transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className="text-xl font-bold">☕ Coffe Bless</h2>
                    </div>
                    <button
                        onClick={onViewCart}
                        className="relative p-2 bg-stone-800 rounded-full hover:bg-stone-700 transition-colors"
                    >
                        <ShoppingBag size={24} className="text-amber-500" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 overflow-x-auto py-4 max-w-lg mx-auto no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all border ${activeCategory === cat
                                ? 'bg-amber-500 border-amber-500 text-stone-900 font-bold shadow-lg shadow-amber-500/20'
                                : 'bg-transparent border-stone-700 text-stone-400 hover:border-stone-500'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product List */}
            <div className="p-4 max-w-lg mx-auto space-y-4 pt-6">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="grid gap-4"
                    >
                        {filteredProducts.length === 0 ? (
                            <div className="text-center text-stone-500 py-12">
                                No hay productos en esta categoría
                            </div>
                        ) : (
                            filteredProducts.map(product => (
                                <div
                                    key={product.id}
                                    className="bg-stone-800 rounded-2xl p-4 border border-stone-700/50 hover:border-amber-500/30 transition-colors"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-lg">{product.name}</h3>
                                            {product.description && (
                                                <p className="text-stone-500 text-xs mt-0.5 leading-snug">{product.description}</p>
                                            )}
                                        </div>

                                        {product.allowsCustomization && (
                                            <button
                                                onClick={() => onCustomize(product.id)}
                                                className="bg-stone-700 text-amber-400 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-stone-600 transition-colors flex items-center gap-2 shrink-0 ml-3"
                                            >
                                                <span>Personalizar</span>
                                                <Coffee size={16} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Size buttons for dual-price products */}
                                    {product.largePrice ? (
                                        <div className="flex gap-2 mt-3">
                                            <button
                                                onClick={() => addToCart(product, 1, undefined, undefined, undefined, 'Mediano')}
                                                className="flex-1 bg-stone-700 hover:bg-stone-600 border border-stone-600 rounded-xl px-3 py-2.5 transition-colors flex items-center justify-between"
                                            >
                                                <div className="text-left">
                                                    <p className="text-xs text-stone-400">Mediano</p>
                                                    <p className="text-amber-400 font-bold text-sm">${product.basePrice.toLocaleString('es-CL')}</p>
                                                </div>
                                                <Plus size={18} className="text-amber-500" />
                                            </button>
                                            <button
                                                onClick={() => addToCart(product, 1, undefined, undefined, undefined, 'Grande')}
                                                className="flex-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl px-3 py-2.5 transition-colors flex items-center justify-between"
                                            >
                                                <div className="text-left">
                                                    <p className="text-xs text-amber-400">Grande</p>
                                                    <p className="text-amber-400 font-bold text-sm">${product.largePrice.toLocaleString('es-CL')}</p>
                                                </div>
                                                <Plus size={18} className="text-amber-500" />
                                            </button>
                                        </div>
                                    ) : !product.allowsCustomization ? (
                                        <div className="flex justify-between items-center mt-3">
                                            <p className="text-amber-400 font-bold">${product.basePrice.toLocaleString('es-CL')}</p>
                                            <button
                                                onClick={() => addToCart(product, 1)}
                                                className="bg-amber-500 text-stone-900 p-2 rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10"
                                            >
                                                <Plus size={24} />
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="text-amber-400 font-bold text-sm mt-2">${product.basePrice.toLocaleString('es-CL')}</p>
                                    )}
                                </div>
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
