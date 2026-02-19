import { useState } from 'react';
import type { CoffeeBase, CoffeeCustomization, Extra, Milk, Syrup, Product } from '../types';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { defaultCustomization } from '../types';

interface CoffeeBuilderProps {
    initialBase: CoffeeBase;
    product: Product;
    onAdd: (customization: CoffeeCustomization, base: CoffeeBase, customerName: string) => void;
    onBack: () => void;
}

export const CoffeeBuilder = ({ initialBase, product, onAdd, onBack }: CoffeeBuilderProps) => {
    const [base] = useState<CoffeeBase>(initialBase);
    const [customization, setCustomization] = useState<CoffeeCustomization>(defaultCustomization);
    const [customerName, setCustomerName] = useState('');

    const updateCustomization = (field: keyof CoffeeCustomization, value: any) => {
        setCustomization({ ...customization, [field]: value });
    };

    const toggleExtra = (extra: Extra) => {
        const newExtras = customization.extras.includes(extra)
            ? customization.extras.filter(e => e !== extra)
            : [...customization.extras, extra];
        updateCustomization('extras', newExtras);
    };

    const milks: Milk[] = ['Entera', 'Descremada', 'Avena', 'Almendra', 'Soya'];
    const syrups: Syrup[] = ['Ninguno', 'Vainilla', 'Caramelo', 'Avellana'];
    const extrasList: Extra[] = ['Crema Batida', 'Extra Shot', 'Hielo', 'Canela'];

    // Logic to determine if milk selection should be shown
    const showMilkExample = ['Latte', 'Cappuccino', 'Bombón'].includes(base);

    return (
        <div className="flex flex-col w-full min-h-screen bg-stone-900 text-white">

            {/* Header */}
            <div className="sticky top-0 bg-stone-900/95 backdrop-blur z-20 px-4 py-4 border-b border-stone-800 flex items-center gap-4">
                <button onClick={onBack} className="p-2 -ml-2 text-stone-400 hover:text-white">
                    <ChevronLeft />
                </button>
                <div>
                    <h2 className="font-bold text-lg leading-none">Personalizar {product.name}</h2>
                    <span className="text-sm text-stone-500">Ajusta tu bebida a tu gusto</span>
                </div>
            </div>

            <div className="p-6 space-y-8 pb-32 max-w-lg mx-auto w-full">

                {/* Name Input */}
                <div className="bg-stone-800/50 p-4 rounded-2xl border border-stone-700/50">
                    <label className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-2 block">Nombre para el Vaso</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ej. Andrés"
                        autoFocus
                        className="w-full bg-transparent border-b border-stone-600 py-2 text-xl font-medium focus:outline-none focus:border-amber-500 transition-colors placeholder:text-stone-600"
                    />
                </div>

                {/* Base Display (Read-only) */}
                <div className="flex items-center gap-3 bg-stone-800/50 p-4 rounded-xl border border-stone-700/30">
                    <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold">
                        {base.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-stone-200">{base}</h3>
                        <p className="text-xs text-stone-500">Base seleccionada (Fija)</p>
                    </div>
                </div>

                {/* Milk Selection - Only for drinks that typically allow milk changes */}
                {showMilkExample && (
                    <section>
                        <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3">Leche</h3>
                        <div className="flex flex-wrap gap-2">
                            {milks.map(m => (
                                <button
                                    key={m}
                                    onClick={() => updateCustomization('milk', m)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${customization.milk === m ? 'bg-white text-stone-900 border-white' : 'bg-transparent border-stone-700 text-stone-400'}`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* Syrup Selection */}
                <section>
                    <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3">Sabor / Jarabe</h3>
                    <div className="flex flex-wrap gap-2">
                        {syrups.map(s => (
                            <button
                                key={s}
                                onClick={() => updateCustomization('syrup', s)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${customization.syrup === s ? 'bg-amber-200 text-stone-900 border-amber-200' : 'bg-transparent border-stone-700 text-stone-400'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Extras Selection */}
                <section>
                    <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3">Extras</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {extrasList.map(extra => (
                            <button
                                key={extra}
                                onClick={() => toggleExtra(extra)}
                                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${customization.extras.includes(extra) ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-stone-800 border-stone-700 text-stone-400 hover:border-stone-600'}`}
                            >
                                <span>{extra}</span>
                                {customization.extras.includes(extra) && <Check size={16} />}
                            </button>
                        ))}
                    </div>
                </section>

            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-stone-900 via-stone-900 to-transparent z-50">
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onAdd(customization, base, customerName)}
                    disabled={!customerName}
                    className={`w-full max-w-lg mx-auto py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 ${customerName ? 'bg-amber-500 text-stone-900' : 'bg-stone-700 text-stone-500 cursor-not-allowed'}`}
                >
                    <span>Confirmar Pedido</span>
                    <ChevronRight size={20} />
                </motion.button>
            </div>

        </div>
    );
};
