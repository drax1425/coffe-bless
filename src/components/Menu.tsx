import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Category, Product } from '../types';
import { useCart } from '../context/CartContext';
import { Plus, ShoppingBag, ArrowLeft, Check } from 'lucide-react';

interface MenuProps {
    products: Product[];
    categories: Category[];
    onViewCart: () => void;
    onBack: () => void;
}

export const Menu = ({ products, categories, onViewCart, onBack }: MenuProps) => {
    const [activeCategory, setActiveCategory] = useState<Category>(categories[0] || { id: 'cat-cafe', name: 'Café' });
    const { addToCart, totalItems, lastAddedEvent } = useCart();

    // Actualizar categoría activa si cambian las categorías y no hay nada seleccionado o lo seleccionado ya no existe
    useEffect(() => {
        if (categories.length > 0 && (!activeCategory || !categories.find(c => c.id === activeCategory.id))) {
            setActiveCategory(categories[0]);
        }
    }, [categories]);

    // Toast state
    const [toast, setToast] = useState<{ name: string; parentName?: string } | null>(null);

    // Badge bounce key
    const [badgeBounceKey, setBadgeBounceKey] = useState(0);

    // React to lastAddedEvent from context
    useEffect(() => {
        if (lastAddedEvent) {
            setToast({ name: lastAddedEvent.productName, parentName: lastAddedEvent.parentName });
            setBadgeBounceKey(prev => prev + 1);

            const timer = setTimeout(() => setToast(null), 1800);
            return () => clearTimeout(timer);
        }
    }, [lastAddedEvent]);

    const filteredProducts = products.filter(p => p.category_id === activeCategory.id);

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
                            <motion.span
                                key={badgeBounceKey}
                                initial={{ scale: 1.5 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
                            >
                                {totalItems}
                            </motion.span>
                        )}
                    </button>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 overflow-x-auto py-4 max-w-lg mx-auto no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all border ${activeCategory.id === cat.id
                                ? 'bg-amber-500 border-amber-500 text-stone-900 font-bold shadow-lg shadow-amber-500/20'
                                : 'bg-transparent border-stone-700 text-stone-400 hover:border-stone-500'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product List */}
            <div className="p-4 max-w-lg mx-auto space-y-4 pt-6">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeCategory.id}
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
                                <motion.div
                                    key={product.id}
                                    className="bg-stone-800 rounded-2xl p-4 border border-stone-700/50 hover:border-amber-500/30 transition-colors"
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-lg">{product.name}</h3>
                                            {product.description && (
                                                <p className="text-stone-500 text-xs mt-0.5 leading-snug">{product.description}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Product Actions */}
                                    {product.largePrice ? (
                                        <div className="flex gap-2 mt-3">
                                            <button
                                                onClick={() => addToCart(product, 1, 'Mediano')}
                                                className="flex-1 bg-stone-700 hover:bg-stone-600 border border-stone-600 rounded-xl px-3 py-2.5 transition-colors flex items-center justify-between"
                                            >
                                                <div className="text-left">
                                                    <p className="text-xs text-stone-400">Mediano</p>
                                                    <p className="text-amber-400 font-bold text-sm">${product.basePrice.toLocaleString('es-CL')}</p>
                                                </div>
                                                <Plus size={18} className="text-amber-500" />
                                            </button>
                                            <button
                                                onClick={() => addToCart(product, 1, 'Grande')}
                                                className="flex-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl px-3 py-2.5 transition-colors flex items-center justify-between"
                                            >
                                                <div className="text-left">
                                                    <p className="text-xs text-amber-400">Grande</p>
                                                    <p className="text-amber-400 font-bold text-sm">${product.largePrice.toLocaleString('es-CL')}</p>
                                                </div>
                                                <Plus size={18} className="text-amber-500" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-center mt-3">
                                            <p className="text-amber-400 font-bold">${product.basePrice.toLocaleString('es-CL')}</p>
                                            <button
                                                onClick={() => addToCart(product, 1)}
                                                className="bg-amber-500 text-stone-900 p-2 rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10"
                                            >
                                                <Plus size={24} />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50"
                    >
                        <div className="bg-green-600 text-white px-5 py-3 rounded-2xl shadow-2xl shadow-green-900/40 flex items-center gap-3 min-w-[200px]">
                            <div className="bg-white/20 rounded-full p-1">
                                <Check size={16} />
                            </div>
                            <div className="text-sm font-medium">
                                <span className="font-bold">{toast.name}</span>
                                {toast.parentName ? (
                                    <span className="block text-green-200 text-xs">
                                        agregado a {toast.parentName}
                                    </span>
                                ) : (
                                    <span className="text-green-200 ml-1">agregado</span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
