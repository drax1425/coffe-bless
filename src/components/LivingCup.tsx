import { motion, AnimatePresence } from 'framer-motion';
import { CloudSnow, PartyPopper, Heart, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

// Tipos locales para el juego (desacoplados del sistema de pedidos)
type CoffeeBase = 'Espresso' | 'Americano' | 'Latte' | 'Cappuccino' | 'Frappuccino' | 'Chocolate' | 'Bombón' | 'Cold Brew';
type MilkType = 'Entera' | 'Descremada' | 'Sin Lactosa' | 'Avena' | 'Almendra' | 'Soya';
type SyrupType = 'Ninguno' | 'Vainilla' | 'Caramelo' | 'Avellana' | 'Chocolate';
type Extra = 'Hielo' | 'Crema Batida' | 'Extra Shot' | 'Malvaviscos' | 'Canela';

interface CoffeeCustomization {
    milk: MilkType;
    syrup: SyrupType;
    extras: Extra[];
}

interface LivingCupProps {
    base: CoffeeBase;
    customization: CoffeeCustomization;
    // customerName, // Unused in game mode currently
    emotionOverride?: 'happy' | 'sad' | 'wired' | 'cool' | 'sleeping' | 'dizzy' | 'love';
    accessory?: 'none' | 'party-hat' | 'sunglasses' | 'bow' | 'headphones';
    colorOverride?: string; // Hex or tailwind class for liquid color
    onInteract?: () => void;
}

// Visual layer definition
interface Layer {
    id: string;
    color: string;
    height: string; // Percent string
    zIndex: number;
}

export const LivingCup = ({
    base,
    customization,
    emotionOverride,
    accessory,
    colorOverride,
    onInteract
}: LivingCupProps) => {

    // Blink State
    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
        const blinkInterval = setInterval(() => {
            if (Math.random() > 0.7) { // Random blink
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 150);
            }
        }, 3000);
        return () => clearInterval(blinkInterval);
    }, []);

    // Logic to determine visual layers based on recipe
    const getLayers = (): Layer[] => {
        let layers: Layer[] = [];

        // Game Mode: Simple single layer if color overridden
        if (colorOverride) {
            layers.push({ id: 'magic-fill', color: colorOverride, height: '85%', zIndex: 10 });
            return layers;
        }

        // Standard Logic
        if (base === 'Bombón') {
            layers.push({ id: 'condensed', color: 'bg-yellow-100', height: '25%', zIndex: 10 });
        } else if (customization?.syrup === 'Caramelo') {
            layers.push({ id: 'syrup-caramel', color: 'bg-amber-600', height: '15%', zIndex: 11 });
        } else if (customization?.syrup === 'Vainilla') {
            layers.push({ id: 'syrup-vanilla', color: 'bg-yellow-100', height: '15%', zIndex: 11 });
        } else if (customization?.syrup === 'Avellana') {
            layers.push({ id: 'syrup-hazelnut', color: 'bg-amber-800', height: '15%', zIndex: 11 });
        }

        // Coffee Layer (or Chocolate)
        const coffeeColor = base === 'Chocolate' ? 'bg-amber-900' : // Darker for chocolate
            base === 'Cold Brew' ? 'bg-stone-900' :
                'bg-amber-950';

        let coffeeHeight = '30%';
        if (base === 'Espresso') coffeeHeight = '25%';
        if (base === 'Americano') coffeeHeight = '70%';
        if (base === 'Chocolate') coffeeHeight = '60%'; // Hot chocolate usually fuller
        if (customization?.extras?.includes('Extra Shot')) coffeeHeight = '40%';

        layers.push({ id: 'coffee', color: coffeeColor, height: coffeeHeight, zIndex: 20 });

        // Milk Layer
        const hasDefaultMilk = ['Latte', 'Cappuccino', 'Frappuccino'].includes(base);
        const hasMilk = hasDefaultMilk || (customization?.milk && customization.milk !== 'Entera');
        if (hasMilk) {
            let milkColor = 'bg-stone-100';
            if (customization?.milk === 'Avena') milkColor = 'bg-amber-50';
            if (customization?.milk === 'Soya') milkColor = 'bg-yellow-50';
            if (customization?.milk === 'Almendra') milkColor = 'bg-orange-50';
            if (customization?.milk === 'Descremada') milkColor = 'bg-blue-50';

            const milkHeight = base === 'Cappuccino' ? '30%' : '50%';
            layers.push({ id: 'milk', color: milkColor, height: milkHeight, zIndex: 30 });
        }

        // Foam / Toppings
        if (base === 'Cappuccino') {
            layers.push({ id: 'foam', color: 'bg-white', height: '20%', zIndex: 40 });
        }
        if (customization?.extras?.includes('Crema Batida')) {
            layers.push({ id: 'whipped-cream', color: 'bg-white', height: '15%', zIndex: 41 });
        }
        // Marshmallows (Mock logic, treating as checking extras string even if not in type)
        if (customization?.extras?.includes('Malvaviscos')) {
            layers.push({ id: 'marshmallows', color: 'bg-transparent', height: '10%', zIndex: 42 });
        }

        return layers;
    };

    const layers = getLayers();

    // Expression Logic
    const getExpression = () => {
        if (emotionOverride) return emotionOverride;
        const isCaffeinated = base === 'Espresso' || customization?.extras?.includes('Extra Shot');
        const isSweet = customization?.syrup !== 'Ninguno' || base === 'Bombón';
        const isIced = customization?.extras?.includes('Hielo');

        if (isCaffeinated) return 'wired';
        if (isSweet) return 'happy';
        if (isIced) return 'cool';
        return 'neutral';
    };

    const expression = getExpression();

    return (
        <div className="relative w-64 h-64 flex items-center justify-center pointer-events-none">

            {/* Click Area Override */}
            <div className="absolute inset-0 z-50 pointer-events-auto cursor-pointer" onClick={onInteract} />

            {/* Cup Container */}
            <motion.div
                layout
                className="relative w-40 h-48 bg-white/10 backdrop-blur-md rounded-b-[3rem] rounded-t-xl border-2 border-white/40 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                whileTap={{ scale: 0.9, rotate: -5 }}
                animate={
                    expression === 'dizzy' ? { rotate: [0, 5, -5, 5, 0], x: [0, 2, -2, 0] } :
                        expression === 'wired' ? { x: [-1, 1, -1, 1, 0] } :
                            expression === 'love' ? { scale: [1, 1.05, 1], y: [0, -5, 0] } :
                                {}
                }
                transition={{
                    repeat: expression === 'wired' || expression === 'dizzy' ? Infinity : 0,
                    repeatType: "reverse",
                    duration: expression === 'love' ? 1.5 : 0.1
                }}
            >
                {/* Render Layers from Bottom Up with Liquid Physics */}
                <div className="absolute inset-x-0 bottom-0 top-10 flex flex-col-reverse justify-start">
                    <AnimatePresence>
                        {layers.map((layer, index) => (
                            <motion.div
                                key={layer.id}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: layer.height, opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ type: 'spring', bounce: 0.4, duration: 1.2, delay: index * 0.1 }}
                                style={{ zIndex: layer.zIndex }}
                                className={`w-full ${layer.color} relative border-t border-black/5 origin-bottom`}
                            >
                                {/* Liquid top surface sheen */}
                                <div className="absolute inset-x-0 top-0 h-1 bg-white/30" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Face & Personality - Now floats on liquid surface */}
                <motion.div
                    className="absolute inset-0 z-50 flex items-center justify-center"
                    animate={{ y: [0, 4, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                    <div className="flex flex-col items-center transform translate-y-4">

                        {/* Eyes Container */}
                        <div className="flex gap-5 mb-3 relative">
                            {/* Standard Eyes with Blink */}
                            {(expression === 'neutral' || expression === 'happy' || expression === 'wired') && (
                                <>
                                    <motion.div
                                        animate={{ scaleY: isBlinking ? 0.1 : 1 }}
                                        transition={{ duration: 0.1 }}
                                        className={`bg-stone-800 rounded-full transition-all duration-300
                                            ${expression === 'wired' ? 'w-5 h-5 border-2 border-white' :
                                                expression === 'happy' ? 'w-4 h-2 border-t-4 border-stone-800 bg-transparent rounded-none border-x-0 border-b-0 mt-2' :
                                                    'w-3 h-3'}
                                        `}
                                    />
                                    <motion.div
                                        animate={{ scaleY: isBlinking ? 0.1 : 1 }}
                                        transition={{ duration: 0.1 }}
                                        className={`bg-stone-800 rounded-full transition-all duration-300
                                            ${expression === 'wired' ? 'w-5 h-5 border-2 border-white' :
                                                expression === 'happy' ? 'w-4 h-2 border-t-4 border-stone-800 bg-transparent rounded-none border-x-0 border-b-0 mt-2' :
                                                    'w-3 h-3'}
                                        `}
                                    />
                                </>
                            )}

                            {/* Special Eyes */}
                            {expression === 'sad' && (
                                <>
                                    <div className="w-3 h-1 bg-stone-800 rounded-full rotate-12 mt-2" />
                                    <div className="w-3 h-1 bg-stone-800 rounded-full -rotate-12 mt-2" />
                                </>
                            )}

                            {(expression === 'cool' || accessory === 'sunglasses') && (
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="absolute -top-1 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0.5"
                                >
                                    {/* Left Lens */}
                                    <div className="w-9 h-8 bg-stone-900 rounded-lg border-2 border-stone-500 relative overflow-hidden shadow-lg">
                                        <div className="absolute top-1 left-1 w-4 h-1.5 bg-white/15 rounded-full rotate-[-20deg]" />
                                    </div>
                                    {/* Bridge */}
                                    <div className="w-3 h-1.5 bg-stone-500 rounded-full -mt-2" />
                                    {/* Right Lens */}
                                    <div className="w-9 h-8 bg-stone-900 rounded-lg border-2 border-stone-500 relative overflow-hidden shadow-lg">
                                        <div className="absolute top-1 left-1 w-4 h-1.5 bg-white/15 rounded-full rotate-[-20deg]" />
                                    </div>
                                </motion.div>
                            )}

                            {expression === 'sleeping' && (
                                <>
                                    <div className="w-4 h-1 bg-stone-800 rounded-full mt-2" />
                                    <div className="w-4 h-1 bg-stone-800 rounded-full mt-2" />
                                </>
                            )}

                            {expression === 'love' && (
                                <>
                                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6 }}><Heart size={24} className="text-red-500 fill-red-500" /></motion.div>
                                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6 }}><Heart size={24} className="text-red-500 fill-red-500" /></motion.div>
                                </>
                            )}

                            {expression === 'dizzy' && (
                                <>
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="text-xl font-bold text-stone-800">X</motion.div>
                                    <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="text-xl font-bold text-stone-800">X</motion.div>
                                </>
                            )}
                        </div>

                        {/* Mouth */}
                        <motion.div
                            className="text-stone-800 opacity-80"
                            animate={expression === 'happy' ? { scale: 1.1 } : { scale: 1 }}
                        >
                            {expression === 'happy' || expression === 'love' ? (
                                <div className="w-4 h-2 border-b-2 border-stone-800 rounded-full" />
                            ) : expression === 'wired' ? (
                                <div className="w-6 h-3 border-2 border-stone-800 rounded-full bg-stone-900 overflow-hidden relative">
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-pink-400 rounded-t-full" />
                                </div>
                            ) : expression === 'sad' ? (
                                <div className="w-4 h-2 border-t-2 border-stone-800 rounded-full mt-2" />
                            ) : expression === 'sleeping' ? (
                                <div className="w-2 h-2 bg-stone-800 rounded-full mt-1" />
                            ) : (
                                <div className="w-2 h-1 bg-stone-800 rounded-full mt-1 opacity-50" />
                            )}
                        </motion.div>

                    </div>
                </motion.div>

                {/* Internal Items (Ice with Bouyancy) */}
                {customization?.extras?.includes('Hielo') && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: [0, 5, -2, 0], rotate: [0, 10, -5, 0], opacity: 1 }}
                        transition={{ y: { repeat: Infinity, duration: 5, ease: "easeInOut" }, rotate: { repeat: Infinity, duration: 8, ease: "linear" }, opacity: { duration: 0.5 } }}
                        className="absolute top-8 right-6 text-white/40 z-20 backdrop-blur-sm"
                    >
                        <CloudSnow size={32} />
                    </motion.div>
                )}

                {/* Marshmallows (Visuals) */}
                {layers.find(l => l.id === 'marshmallows') && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="absolute top-12 left-0 right-0 z-42 flex justify-center gap-2"
                    >
                        <div className="w-4 h-3 bg-white rounded-md shadow-sm rotate-12" />
                        <div className="w-4 h-3 bg-pink-100 rounded-md shadow-sm -rotate-6" />
                        <div className="w-4 h-3 bg-white rounded-md shadow-sm rotate-45" />
                    </motion.div>
                )}

                {/* Glare Reflection */}
                <div className="absolute top-4 right-4 w-2 h-16 bg-white/20 rounded-full blur-[1px] -rotate-12 z-50 pointer-events-none" />

            </motion.div>

            {/* Handle */}
            <div className="absolute right-6 w-10 h-16 border-4 border-white/30 rounded-r-2xl -z-10 shadow-lg" />

            {/* Accessories (External) */}
            {accessory === 'party-hat' && (
                <motion.div
                    initial={{ y: -50, rotate: -20, opacity: 0 }}
                    animate={{ y: -75, rotate: -12, opacity: 1 }}
                    transition={{ type: 'spring' }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-30"
                >
                    <PartyPopper size={56} className="text-pink-500 drop-shadow-lg" />
                </motion.div>
            )}
            {accessory === 'bow' && (
                <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
                    transition={{ rotate: { repeat: Infinity, duration: 3 } }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-30"
                >
                    <div className="flex gap-0.5 filter drop-shadow-md">
                        <div className="w-6 h-6 bg-red-400 rounded-full" />
                        <div className="w-6 h-6 bg-red-400 rounded-full" />
                    </div>
                </motion.div>
            )}

            {/* Particle Effects based on Emotion */}
            {expression === 'sleeping' && (
                <motion.div className="absolute -top-12 right-0 pointer-events-none">
                    {[0, 1, 2].map(i => (
                        <motion.div
                            key={i}
                            className="absolute text-stone-400 font-bold text-xl"
                            initial={{ opacity: 0, x: 0, y: 0 }}
                            animate={{ opacity: [0, 1, 0], x: 20 + i * 10, y: -30 - i * 15 }}
                            transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.8 }}
                        >Zzz</motion.div>
                    ))}
                </motion.div>
            )}

            {expression === 'wired' && (
                <motion.div className="absolute inset-0 pointer-events-none z-0">
                    {[0, 1, 2, 3].map(i => (
                        <motion.div
                            key={i}
                            className="absolute text-yellow-400"
                            style={{
                                top: '50%',
                                left: '50%',
                                rotate: i * 90
                            }}
                            animate={{ scale: [1, 1.5], opacity: [1, 0], x: [0, (i % 2 === 0 ? 50 : -50)], y: [0, (i < 2 ? -50 : 50)] }}
                            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                        >
                            <Zap size={20} fill="currentColor" />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {expression === 'love' && (
                <motion.div className="absolute inset-0 pointer-events-none z-0">
                    {[0, 1, 2].map(i => (
                        <motion.div
                            key={i}
                            className="absolute text-pink-400"
                            initial={{ y: 0, x: 0, opacity: 0, scale: 0.5 }}
                            animate={{ y: -80, x: (i - 1) * 30, opacity: [0, 1, 0], scale: 1 }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                        >
                            <Heart size={16} fill="currentColor" />
                        </motion.div>
                    ))}
                </motion.div>
            )}

        </div>
    );
};
