import { motion } from 'framer-motion';

interface SplashScreenProps {
    onFinish: () => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-stone-950 flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            onAnimationComplete={onFinish}
        >
            {/* Logo */}
            <motion.img
                src="/logo.png"
                alt="Coffe Bless"
                className="w-36 h-36 rounded-full mix-blend-lighten"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            {/* Loading bar */}
            <motion.div
                className="mt-8 w-48 h-1 bg-stone-800 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <motion.div
                    className="h-full bg-amber-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.5, duration: 1.3, ease: 'easeInOut' }}
                />
            </motion.div>

            {/* Subtle text */}
            <motion.p
                className="mt-4 text-stone-600 text-xs tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                Preparando tu café...
            </motion.p>
        </motion.div>
    );
};
