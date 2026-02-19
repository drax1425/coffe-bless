import { motion } from 'framer-motion';
import { Home, Coffee, Gamepad2 } from 'lucide-react';

type NavView = 'LANDING' | 'MENU' | 'GAME';

interface BottomNavProps {
    active: NavView;
    onChange: (view: NavView) => void;
}

const tabs: { view: NavView; label: string; icon: typeof Home }[] = [
    { view: 'LANDING', label: 'Inicio', icon: Home },
    { view: 'MENU', label: 'Menú', icon: Coffee },
    { view: 'GAME', label: 'Jugar', icon: Gamepad2 },
];

export const BottomNav = ({ active, onChange }: BottomNavProps) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 pb-[env(safe-area-inset-bottom)]">
            <div className="flex justify-around items-center max-w-lg mx-auto h-16">
                {tabs.map(({ view, label, icon: Icon }) => {
                    const isActive = active === view;
                    return (
                        <button
                            key={view}
                            onClick={() => onChange(view)}
                            className="flex flex-col items-center gap-1 px-6 py-2 relative"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-amber-500 rounded-full"
                                />
                            )}
                            <Icon
                                size={22}
                                className={`transition-colors ${isActive ? 'text-amber-500' : 'text-stone-500'}`}
                            />
                            <span
                                className={`text-[10px] font-medium transition-colors ${isActive ? 'text-amber-400' : 'text-stone-600'}`}
                            >
                                {label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
