import { useState, useEffect, useCallback } from 'react';
import type { CoffeeBase, CoffeeCustomization, Extra } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { LivingCup } from './LivingCup';
import {
    ChevronLeft, Zap, Moon, Coffee, Heart,
    Hand, Music
} from 'lucide-react';

interface GameZoneProps {
    onBack: () => void;
}

type Tab = 'DRINK' | 'FACE' | 'ACCESSORIES';

interface Recipe {
    name: string;
    emoji: string;
    base: CoffeeBase;
    customization: CoffeeCustomization;
    color: string;
}

interface Stats {
    energy: number;     // 0-100
    happiness: number;  // 0-100
    hunger: number;     // 0-100
}

// Floating emoji animation component
const FloatingEmoji = ({ emoji, id }: { emoji: string; id: number }) => (
    <motion.div
        key={id}
        className="absolute text-2xl pointer-events-none z-50"
        initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
        animate={{
            opacity: 0,
            y: -120,
            x: (Math.random() - 0.5) * 80,
            scale: 1.5,
            rotate: (Math.random() - 0.5) * 40
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
    >
        {emoji}
    </motion.div>
);

const RECIPES: Recipe[] = [
    { name: 'Espresso', emoji: '☕', base: 'Espresso', customization: { milk: 'Entera', syrup: 'Ninguno', extras: [] }, color: 'bg-stone-900' },
    { name: 'Americano', emoji: '🫗', base: 'Americano', customization: { milk: 'Entera', syrup: 'Ninguno', extras: [] }, color: 'bg-amber-900' },
    { name: 'Latte', emoji: '🥛', base: 'Latte', customization: { milk: 'Entera', syrup: 'Ninguno', extras: [] }, color: 'bg-stone-300' },
    { name: 'Cappuccino', emoji: '☁️', base: 'Cappuccino', customization: { milk: 'Entera', syrup: 'Ninguno', extras: [] }, color: 'bg-amber-200' },
    { name: 'Bombón', emoji: '🍯', base: 'Bombón', customization: { milk: 'Entera', syrup: 'Ninguno', extras: [] }, color: 'bg-white' },
    { name: 'Vainilla', emoji: '🍦', base: 'Cappuccino', customization: { milk: 'Entera', syrup: 'Vainilla', extras: [] }, color: 'bg-yellow-200' },
    { name: 'Chocolate', emoji: '🍫', base: 'Chocolate', customization: { milk: 'Entera', syrup: 'Ninguno', extras: ['Malvaviscos' as Extra] }, color: 'bg-amber-950' },
    { name: 'Frappuccino', emoji: '🧊', base: 'Frappuccino', customization: { milk: 'Entera', syrup: 'Caramelo', extras: ['Hielo' as Extra, 'Crema Batida' as Extra] }, color: 'bg-orange-300' },
];

const EMOTIONS = [
    { id: 'happy', label: '😊', name: 'Feliz' },
    { id: 'sad', label: '😢', name: 'Triste' },
    { id: 'wired', label: '⚡', name: 'Activo' },
    { id: 'cool', label: '😎', name: 'Cool' },
    { id: 'love', label: '😍', name: 'Amor' },
    { id: 'dizzy', label: '😵', name: 'Mareado' },
] as const;

const ACCESSORIES = [
    { id: 'none', label: '❌', name: 'Nada' },
    { id: 'party-hat', label: '🎉', name: 'Fiesta' },
    { id: 'sunglasses', label: '🕶️', name: 'Gafas' },
    { id: 'bow', label: '🎀', name: 'Moño' },
] as const;

// Stat bar component
const StatBar = ({ label, value, color, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) => (
    <div className="flex items-center gap-2">
        <div className="text-lg w-6 flex justify-center">{icon}</div>
        <div className="flex-1">
            <div className="flex justify-between mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">{label}</span>
                <span className="text-[10px] font-bold text-stone-500">{Math.round(value)}%</span>
            </div>
            <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${color}`}
                    initial={{ width: '50%' }}
                    animate={{ width: `${value}%` }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                />
            </div>
        </div>
    </div>
);

export const GameZone = ({ onBack }: GameZoneProps) => {
    const [activeTab, setActiveTab] = useState<Tab>('DRINK');

    // Game State
    const [currentRecipe, setCurrentRecipe] = useState<Recipe>(RECIPES[2]); // Default: Latte
    const [emotion, setEmotion] = useState<'happy' | 'sad' | 'wired' | 'cool' | 'sleeping' | 'dizzy' | 'love'>('happy');
    const [accessory, setAccessory] = useState<'none' | 'party-hat' | 'sunglasses' | 'bow' | 'headphones'>('none');
    const [isJumping, setIsJumping] = useState(false);
    const [isDancing, setIsDancing] = useState(false);

    // Stats
    const [stats, setStats] = useState<Stats>({ energy: 70, happiness: 80, hunger: 60 });

    // Floating emojis
    const [floatingEmojis, setFloatingEmojis] = useState<{ emoji: string; id: number }[]>([]);
    const [emojiCounter, setEmojiCounter] = useState(0);

    // Action cooldowns
    const [feedCooldown, setFeedCooldown] = useState(false);
    const [petCooldown, setPetCooldown] = useState(false);

    // Spawn floating emojis
    const spawnEmojis = useCallback((emoji: string, count: number = 3) => {
        const newEmojis = Array.from({ length: count }, (_, i) => ({
            emoji,
            id: emojiCounter + i,
        }));
        setEmojiCounter(prev => prev + count);
        setFloatingEmojis(prev => [...prev, ...newEmojis]);
        // Clean up after animation
        setTimeout(() => {
            setFloatingEmojis(prev => prev.filter(e => !newEmojis.find(n => n.id === e.id)));
        }, 2000);
    }, [emojiCounter]);

    // Decrease stats over time
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                energy: Math.max(0, prev.energy - 0.3),
                happiness: Math.max(0, prev.happiness - 0.2),
                hunger: Math.max(0, prev.hunger - 0.4),
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Auto-emotion based on stats
    useEffect(() => {
        if (stats.energy < 15) {
            setEmotion('sleeping');
        } else if (stats.hunger < 15) {
            setEmotion('sad');
        } else if (stats.happiness > 85 && stats.energy > 60) {
            setEmotion('love');
        } else if (stats.energy > 80) {
            setEmotion('wired');
        } else if (stats.happiness > 60) {
            setEmotion('happy');
        }
    }, [stats]);

    // Actions
    const handleFeed = () => {
        if (feedCooldown) return;
        setFeedCooldown(true);
        setStats(prev => ({
            ...prev,
            hunger: Math.min(100, prev.hunger + 25),
            energy: Math.min(100, prev.energy + 15),
            happiness: Math.min(100, prev.happiness + 5),
        }));
        spawnEmojis(currentRecipe.emoji, 4);
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
        setTimeout(() => setFeedCooldown(false), 1500);
    };

    const handlePet = () => {
        if (petCooldown) return;
        setPetCooldown(true);
        setStats(prev => ({
            ...prev,
            happiness: Math.min(100, prev.happiness + 20),
        }));
        spawnEmojis('💕', 5);
        setTimeout(() => setPetCooldown(false), 1200);
    };

    const handleDance = () => {
        if (isDancing) return;
        setIsDancing(true);
        setStats(prev => ({
            ...prev,
            happiness: Math.min(100, prev.happiness + 15),
            energy: Math.max(0, prev.energy - 5),
        }));
        spawnEmojis('🎵', 4);
        setTimeout(() => setIsDancing(false), 2000);
    };

    const handleSleep = () => {
        setEmotion('sleeping');
        setStats(prev => ({
            ...prev,
            energy: Math.min(100, prev.energy + 30),
        }));
        spawnEmojis('💤', 3);
        setIsJumping(false);
    };

    const handleInteract = () => {
        setIsJumping(true);
        setStats(prev => ({
            ...prev,
            happiness: Math.min(100, prev.happiness + 3),
        }));
        spawnEmojis('✨', 2);
        setTimeout(() => setIsJumping(false), 500);
    };

    return (
        <div className="min-h-screen bg-stone-900 text-white flex flex-col items-center p-4 pb-6">

            {/* Header */}
            <div className="w-full max-w-md flex justify-between items-center mb-4">
                <button onClick={onBack} className="p-3 bg-stone-800 rounded-full hover:bg-stone-700 transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <div className="text-center">
                    <h1 className="font-bold text-xl text-amber-400">🐾 Coffe Bless Pet</h1>
                    <p className="text-xs text-stone-500">¡Cuida tu taza mágica!</p>
                </div>
                <div className="w-10" />
            </div>

            {/* Stats Bars */}
            <div className="w-full max-w-md bg-stone-800/60 rounded-2xl p-3 mb-4 space-y-2 border border-stone-700/50">
                <StatBar label="Energía" value={stats.energy} color="bg-yellow-400" icon={<Zap size={14} className="text-yellow-400" />} />
                <StatBar label="Felicidad" value={stats.happiness} color="bg-pink-400" icon={<Heart size={14} className="text-pink-400" />} />
                <StatBar label="Hambre" value={stats.hunger} color="bg-green-400" icon={<Coffee size={14} className="text-green-400" />} />
            </div>

            {/* Game Area */}
            <div className="w-full max-w-md bg-stone-800/50 rounded-3xl border border-stone-700 relative overflow-hidden flex flex-col items-center justify-center mb-4 p-6 min-h-[320px]">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-800 via-stone-900 to-stone-950 opacity-50" />

                {/* Floating emojis */}
                <AnimatePresence>
                    {floatingEmojis.map(e => (
                        <FloatingEmoji key={e.id} emoji={e.emoji} id={e.id} />
                    ))}
                </AnimatePresence>

                <motion.div
                    animate={
                        isDancing
                            ? { y: [0, -20, 0, -15, 0], x: [-10, 10, -10, 10, 0], rotate: [0, 10, -10, 5, 0] }
                            : isJumping
                                ? { y: -50, scale: 1.1 }
                                : { y: 0, scale: 1 }
                    }
                    transition={
                        isDancing
                            ? { duration: 0.8, repeat: 2, ease: "easeInOut" }
                            : { type: "spring", stiffness: 300, damping: 10 }
                    }
                    className="relative z-10 cursor-pointer"
                >
                    <LivingCup
                        base={currentRecipe.base}
                        customization={currentRecipe.customization}
                        emotionOverride={emotion}
                        accessory={accessory}
                        onInteract={handleInteract}
                    />
                </motion.div>

                {/* Recipe Name Overlay */}
                <motion.div
                    key={currentRecipe.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-3 font-bold text-stone-400 text-sm tracking-widest uppercase flex items-center gap-2"
                >
                    <span>{currentRecipe.emoji}</span>
                    <span>{currentRecipe.name}</span>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="w-full max-w-md grid grid-cols-4 gap-2 mb-4">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleFeed}
                    disabled={feedCooldown}
                    className={`flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all ${feedCooldown
                        ? 'bg-stone-800/30 border-stone-800 text-stone-600 cursor-not-allowed'
                        : 'bg-stone-800 border-stone-700 text-green-400 hover:border-green-500/50 hover:bg-stone-700'
                        }`}
                >
                    <Coffee size={22} />
                    <span className="text-[10px] font-bold">Alimentar</span>
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePet}
                    disabled={petCooldown}
                    className={`flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all ${petCooldown
                        ? 'bg-stone-800/30 border-stone-800 text-stone-600 cursor-not-allowed'
                        : 'bg-stone-800 border-stone-700 text-pink-400 hover:border-pink-500/50 hover:bg-stone-700'
                        }`}
                >
                    <Hand size={22} />
                    <span className="text-[10px] font-bold">Acariciar</span>
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDance}
                    disabled={isDancing}
                    className={`flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all ${isDancing
                        ? 'bg-stone-800/30 border-stone-800 text-stone-600 cursor-not-allowed'
                        : 'bg-stone-800 border-stone-700 text-purple-400 hover:border-purple-500/50 hover:bg-stone-700'
                        }`}
                >
                    <Music size={22} />
                    <span className="text-[10px] font-bold">Bailar</span>
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSleep}
                    className="flex flex-col items-center gap-1 p-3 rounded-2xl border bg-stone-800 border-stone-700 text-blue-300 hover:border-blue-500/50 hover:bg-stone-700 transition-all"
                >
                    <Moon size={22} />
                    <span className="text-[10px] font-bold">Dormir</span>
                </motion.button>
            </div>

            {/* Editor Controls */}
            <div className="w-full max-w-md bg-stone-800 rounded-2xl p-4 shadow-xl border border-stone-700">

                {/* Tabs */}
                <div className="flex mb-4 bg-stone-900 rounded-xl p-1 gap-1">
                    {(['DRINK', 'FACE', 'ACCESSORIES'] as Tab[]).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === tab
                                ? 'bg-amber-500 text-stone-900 shadow-lg shadow-amber-500/20'
                                : 'text-stone-500 hover:text-stone-300'
                                }`}
                        >
                            {tab === 'DRINK' ? '☕ Bebida' : tab === 'FACE' ? '😊 Cara' : '🎩 Items'}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="min-h-[110px] max-h-[140px] overflow-y-auto pr-1 no-scrollbar">

                    <AnimatePresence mode="wait">
                        {activeTab === 'DRINK' && (
                            <motion.div
                                key="drink"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.15 }}
                                className="grid grid-cols-2 gap-2"
                            >
                                {RECIPES.map((recipe) => (
                                    <motion.button
                                        key={recipe.name}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setCurrentRecipe(recipe);
                                            spawnEmojis(recipe.emoji, 2);
                                        }}
                                        className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${currentRecipe.name === recipe.name
                                            ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                                            : 'border-stone-700 bg-stone-900 hover:bg-stone-700 hover:border-stone-600'
                                            }`}
                                    >
                                        <span className="text-lg">{recipe.emoji}</span>
                                        <span className="text-xs font-bold text-left">{recipe.name}</span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'FACE' && (
                            <motion.div
                                key="face"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.15 }}
                                className="grid grid-cols-3 gap-2"
                            >
                                {EMOTIONS.map((e) => (
                                    <motion.button
                                        key={e.id}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => {
                                            setEmotion(e.id as typeof emotion);
                                            spawnEmojis(e.label, 2);
                                        }}
                                        className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${emotion === e.id
                                            ? 'border-amber-500 bg-amber-500/10'
                                            : 'border-stone-700 bg-stone-900 hover:border-stone-600'
                                            }`}
                                    >
                                        <span className="text-xl">{e.label}</span>
                                        <span className="text-[10px] font-bold text-stone-400">{e.name}</span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'ACCESSORIES' && (
                            <motion.div
                                key="accessories"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.15 }}
                                className="grid grid-cols-2 gap-2"
                            >
                                {ACCESSORIES.map((a) => (
                                    <motion.button
                                        key={a.id}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => {
                                            setAccessory(a.id as typeof accessory);
                                            if (a.id !== 'none') spawnEmojis(a.label, 2);
                                        }}
                                        className={`p-3 rounded-xl border-2 flex items-center gap-2 transition-all ${accessory === a.id
                                            ? 'border-amber-500 bg-amber-500/10'
                                            : 'border-stone-700 bg-stone-900 hover:border-stone-600'
                                            }`}
                                    >
                                        <span className="text-lg">{a.label}</span>
                                        <span className="text-xs font-bold">{a.name}</span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

            </div>
        </div>
    );
};
