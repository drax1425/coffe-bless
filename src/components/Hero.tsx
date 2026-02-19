import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Gamepad2, MapPin, Clock, Instagram } from 'lucide-react';

interface HeroProps {
    onStart: () => void;
    onPlay: () => void;
    onAdmin: () => void;
}

export const Hero = ({ onStart, onPlay, onAdmin }: HeroProps) => {
    const [footerClicks, setFooterClicks] = useState(0);

    const handleFooterClick = () => {
        const newCount = footerClicks + 1;
        setFooterClicks(newCount);
        if (newCount >= 5) {
            setFooterClicks(0);
            onAdmin();
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-stone-950">

            {/* Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/90 to-stone-950" />

            {/* Main Hero Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-12">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-2xl"
                >
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 flex justify-center"
                    >
                        <img
                            src="/logo.png"
                            alt="Coffe Bless"
                            className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover mix-blend-lighten drop-shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                        />
                    </motion.div>

                    <p className="text-lg md:text-xl text-stone-300 mb-10 leading-relaxed max-w-md mx-auto">
                        Tu café favorito, a un toque de distancia.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onStart}
                            className="bg-amber-500 text-stone-950 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:bg-amber-400 transition-colors"
                        >
                            <Coffee size={24} />
                            Pedir Ahora
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onPlay}
                            className="bg-stone-800/50 backdrop-blur text-white border border-stone-600 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                        >
                            <Gamepad2 size={24} />
                            Jugar con Avatar
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Info Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative z-10 px-6 pb-8"
            >
                <div className="max-w-lg mx-auto bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-2xl p-5 space-y-4">
                    {/* Location */}
                    <div className="flex items-start gap-3">
                        <MapPin size={20} className="text-amber-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-white">Variante El Toyo 149</p>
                            <p className="text-xs text-stone-400">Las Vertientes, San José de Maipo</p>
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-3">
                        <Clock size={20} className="text-amber-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-white">Lunes a Domingo</p>
                            <p className="text-xs text-stone-400">9:00 — 20:00</p>
                        </div>
                    </div>

                    {/* Instagram */}
                    <a
                        href="https://instagram.com/coffe_bless"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 hover:bg-stone-800/50 rounded-lg p-1 -m-1 transition-colors"
                    >
                        <Instagram size={20} className="text-amber-500 shrink-0" />
                        <p className="text-sm text-stone-300">@coffe_bless</p>
                    </a>

                    {/* Google Maps Embed */}
                    <div className="rounded-xl overflow-hidden border border-stone-700 mt-2">
                        <iframe
                            title="Ubicación Coffe Bless"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1665!2d-70.4736797!3d-33.5886657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d5cd670791d3%3A0x1ff9f5753bba335a!2sCoffe%20bless!5e0!3m2!1ses!2scl!4v1700000000000"
                            width="100%"
                            height="180"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Footer — 5 clicks = admin */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="relative z-10 text-center pb-6 text-stone-600 text-sm cursor-default select-none"
                onClick={handleFooterClick}
            >
                Coffe Bless ☕ • v1.0
            </motion.div>
        </div>
    );
};
