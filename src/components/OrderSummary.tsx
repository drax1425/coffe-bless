import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Trash2, MessageCircle, Link } from 'lucide-react';

import { sendWhatsAppOrder } from '../utils/whatsapp';

interface OrderSummaryProps {
    onBack: () => void;
    onClear: () => void;
}

export const OrderSummary = ({ onBack, onClear }: OrderSummaryProps) => {
    const { items, totalItems, getGroupedItems } = useCart();
    const { mainItems, extrasMap } = getGroupedItems();

    // Get categories from main items only (extras show under their parent)
    const categoriesOrder = [...new Set(mainItems.map(i => i.product.category))];

    const total = items.reduce((sum, i) => {
        const price = i.size === 'Grande' && i.product.largePrice ? i.product.largePrice : i.product.basePrice;
        return sum + price * i.quantity;
    }, 0);

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
                <h2 className="text-2xl font-bold text-stone-400 mb-4">Tu carrito está vacío</h2>
                <button onClick={onBack} className="text-amber-500 underline">Volver al Menú</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-900 text-stone-100 p-6 pb-32">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button onClick={onBack} className="p-2 bg-stone-800 rounded-full">
                    <ArrowLeft />
                </button>
                <h1 className="text-2xl font-bold">Resumen del Pedido</h1>
            </div>

            {/* Dictation Script Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white text-stone-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden mb-8"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-amber-500" />
                <h2 className="text-stone-500 uppercase tracking-widest text-xs font-bold mb-4">Léelo a la Cajera</h2>

                <div className="text-xl font-medium leading-relaxed space-y-4">
                    <p className="font-bold text-2xl mb-2">"Hola, llevo {totalItems} cosas:"</p>

                    {categoriesOrder.map(cat => {
                        const itemsInCat = mainItems.filter(i => i.product.category === cat);
                        if (itemsInCat.length === 0) return null;

                        return (
                            <div key={cat} className="ml-4 border-l-4 border-amber-200 pl-4 py-1">
                                <span className="text-stone-500 text-sm font-bold uppercase">{cat}</span>
                                <ul className="mt-1">
                                    {itemsInCat.map(item => {
                                        const linkedExtras = extrasMap.get(item.id) || [];
                                        return (
                                            <li key={item.id} className="mb-2">
                                                <span className="font-bold">{item.quantity}x {item.product.name}</span>
                                                {item.size && <span className="text-amber-600 text-sm ml-1">({item.size})</span>}
                                                <span className="text-stone-400 text-sm ml-2">${((item.size === 'Grande' && item.product.largePrice ? item.product.largePrice : item.product.basePrice) * item.quantity).toLocaleString('es-CL')}</span>

                                                {/* Linked extras */}
                                                {linkedExtras.length > 0 && (
                                                    <ul className="ml-4 mt-1 space-y-0.5">
                                                        {linkedExtras.map(extra => (
                                                            <li key={extra.id} className="flex items-center gap-2 text-sm text-stone-500">
                                                                <Link size={12} className="text-amber-400 shrink-0" />
                                                                <span>
                                                                    {extra.quantity}x {extra.product.name}
                                                                    <span className="text-stone-400 ml-1">+${(extra.product.basePrice * extra.quantity).toLocaleString('es-CL')}</span>
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}

                    {/* Orphan extras (no parent) */}
                    {(() => {
                        const orphanExtras = mainItems.filter(i => i.product.category === 'Extras');
                        if (orphanExtras.length === 0) return null;
                        return (
                            <div className="ml-4 border-l-4 border-amber-200 pl-4 py-1">
                                <span className="text-stone-500 text-sm font-bold uppercase">Extras</span>
                                <ul className="mt-1">
                                    {orphanExtras.map(item => (
                                        <li key={item.id} className="mb-1">
                                            <span className="font-bold">{item.quantity}x {item.product.name}</span>
                                            <span className="text-stone-400 text-sm ml-2">${(item.product.basePrice * item.quantity).toLocaleString('es-CL')}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })()}

                    {/* Total */}
                    <div className="border-t-2 border-stone-200 pt-4 mt-4 flex justify-between items-center">
                        <span className="text-stone-500 font-bold">Total estimado</span>
                        <span className="text-2xl font-black text-amber-600">${total.toLocaleString('es-CL')}</span>
                    </div>
                </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="fixed bottom-0 left-0 right-0 bg-stone-900/90 backdrop-blur p-6 border-t border-stone-800">
                <div className="flex gap-3 max-w-lg mx-auto">
                    <button
                        onClick={onClear}
                        className="p-3 flex items-center justify-center border border-red-500/50 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors"
                        title="Borrar Todo"
                    >
                        <Trash2 size={20} />
                    </button>

                    <button
                        onClick={() => sendWhatsAppOrder(items)}
                        className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
                    >
                        <MessageCircle size={20} />
                        Enviar por WhatsApp
                    </button>

                    <button
                        onClick={onBack}
                        className="flex-1 bg-amber-500 text-stone-900 py-3 rounded-xl font-bold hover:bg-amber-400 transition-colors"
                    >
                        Seguir Pidiendo
                    </button>
                </div>
            </div>

        </div>
    );
};
