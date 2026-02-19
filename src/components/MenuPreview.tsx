import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product, Category } from '../types';

interface MenuPreviewProps {
    products: Product[];
    onOrder: () => void;
}

const categoryEmojis: Record<string, string> = {
    'Café': '☕',
    'Fríos': '🧊',
    'Chocolate': '🍫',
    'Té': '🍵',
};

export const MenuPreview = ({ products, onOrder }: MenuPreviewProps) => {
    const categories = [...new Set(products.map(p => p.category))];
    const [activeCategory, setActiveCategory] = useState<Category>(categories[0] || 'Café');

    const filtered = products.filter(p => p.category === activeCategory);

    return (
        <div className="w-full px-4 py-10 max-w-2xl mx-auto">
            <h2 className="text-center text-2xl font-bold mb-6">
                <span className="text-amber-400">Nuestro</span> Menú
            </h2>

            {/* Category pills */}
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                ? 'bg-amber-500 text-stone-950'
                                : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                            }`}
                    >
                        {categoryEmojis[cat] || '📦'} {cat}
                    </button>
                ))}
            </div>

            {/* Product cards */}
            <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 gap-3"
            >
                {filtered.map(product => (
                    <div
                        key={product.id}
                        className="bg-stone-800/60 border border-stone-700/50 rounded-xl p-3 flex flex-col justify-between"
                    >
                        <p className="text-sm font-medium text-stone-200 leading-tight">{product.name}</p>
                        <p className="text-amber-400 font-bold text-sm mt-2">
                            ${product.basePrice.toLocaleString('es-CL')}
                        </p>
                    </div>
                ))}
            </motion.div>

            {/* CTA */}
            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOrder}
                className="mt-6 w-full bg-amber-500 text-stone-950 py-3 rounded-full font-bold text-lg hover:bg-amber-400 transition-colors"
            >
                Ver Menú Completo
            </motion.button>
        </div>
    );
};
