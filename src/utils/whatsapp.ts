import type { CartItem } from '../types';

// Número de WhatsApp del café (con código de país)
// Cambiar este número por el real del café
export const CAFE_PHONE_NUMBER = '56941600915';

/**
 * Formatea los items del carrito como un mensaje de texto legible
 * para enviar por WhatsApp.
 */
export function formatOrderForWhatsApp(items: CartItem[]): string {
    const lines: string[] = [];

    lines.push('🛒 *Nuevo Pedido — Coffe Bless*');
    lines.push('─────────────────────');

    // Group by category
    const categories = [...new Set(items.map(i => i.product.category))];

    for (const cat of categories) {
        const catItems = items.filter(i => i.product.category === cat);
        lines.push('');
        lines.push(`📌 *${cat}*`);
        for (const item of catItems) {
            const price = item.size === 'Grande' && item.product.largePrice ? item.product.largePrice : item.product.basePrice;
            let line = `  • ${item.quantity}x ${item.product.name}`;
            if (item.size) line += ` (${item.size})`;
            line += ` — $${(price * item.quantity).toLocaleString('es-CL')}`;

            lines.push(line);
        }
    }

    // Total
    const total = items.reduce((sum, i) => {
        const price = i.size === 'Grande' && i.product.largePrice ? i.product.largePrice : i.product.basePrice;
        return sum + price * i.quantity;
    }, 0);
    lines.push('');
    lines.push('─────────────────────');
    lines.push(`💰 *Total estimado: $${total.toLocaleString('es-CL')}*`);
    lines.push('');
    lines.push('_Enviado desde coffe-bless.vercel.app_');

    return lines.join('\n');
}

/**
 * Abre WhatsApp con el pedido formateado.
 */
export function sendWhatsAppOrder(items: CartItem[], phoneNumber: string = CAFE_PHONE_NUMBER): void {
    const text = formatOrderForWhatsApp(items);
    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(url, '_blank');
}
