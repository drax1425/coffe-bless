import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { CAFE_PHONE_NUMBER } from '../utils/whatsapp';

interface FloatingWhatsAppProps {
    show: boolean;
}

export const FloatingWhatsApp = ({ show }: FloatingWhatsAppProps) => {
    const handleClick = () => {
        window.open(`https://wa.me/${CAFE_PHONE_NUMBER}?text=${encodeURIComponent('¡Hola! Me gustaría hacer un pedido 🙌')}`, '_blank');
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClick}
                    className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg shadow-green-500/30 hover:bg-green-400 transition-colors"
                    title="Enviar WhatsApp"
                >
                    <MessageCircle size={28} fill="white" stroke="white" />

                    {/* Pulse ring */}
                    <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};
