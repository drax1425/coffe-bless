import type { Product } from '../types';

export const products: Product[] = [
    // Café
    { id: 'cafe-espresso', name: 'Espresso', category: 'Café', basePrice: 1800, allowsCustomization: false, description: 'Shot de café' },
    { id: 'cafe-espresso-doble', name: 'Espresso Doble', category: 'Café', basePrice: 2300, allowsCustomization: false, description: 'Doble shot de café' },
    { id: 'cafe-americano', name: 'Americano', category: 'Café', basePrice: 1500, largePrice: 2900, allowsCustomization: false, description: 'Shot de café más agua' },
    { id: 'cafe-cappuccino', name: 'Cappuccino', category: 'Café', basePrice: 2800, largePrice: 3200, allowsCustomization: false, description: 'Shot de café más leche texturizada' },
    { id: 'cafe-cappuccino-vainilla', name: 'Cappuccino Vainilla', category: 'Café', basePrice: 3000, largePrice: 3300, allowsCustomization: false, description: 'Leche texturizada y syrup vainilla' },
    { id: 'cafe-cappuccino-nevado', name: 'Cappuccino Nevado', category: 'Café', basePrice: 3200, largePrice: 3500, allowsCustomization: false, description: 'Leche texturizada y crema chantilly' },
    { id: 'cafe-latte', name: 'Latte', category: 'Café', basePrice: 3000, allowsCustomization: false, description: 'Shot de café más leche texturizada' },
    { id: 'cafe-mocca', name: 'Mocca', category: 'Café', basePrice: 3100, largePrice: 3400, allowsCustomization: false, description: 'Leche texturizada y syrup chocolate' },
    { id: 'cafe-caramel', name: 'Caramel', category: 'Café', basePrice: 3000, largePrice: 3300, allowsCustomization: false, description: 'Leche texturizada y syrup caramelo' },
    { id: 'cafe-bombon', name: 'Bombom', category: 'Café', basePrice: 3000, largePrice: 3300, allowsCustomization: false, description: 'Leche texturizada y leche condensada' },

    // Chocolate
    { id: 'choco-caliente', name: 'Chocolate Caliente', category: 'Chocolate', basePrice: 3300, largePrice: 3900, allowsCustomization: false },
    { id: 'choco-mashmallows', name: 'Chocolate Mashmallows', category: 'Chocolate', basePrice: 3500, largePrice: 4100, allowsCustomization: false },
    { id: 'choco-nevado', name: 'Chocolate Nevado', category: 'Chocolate', basePrice: 3500, largePrice: 4100, allowsCustomization: false },

    // Té
    { id: 'te-negro', name: 'Té Negro', category: 'Té', basePrice: 1400, largePrice: 1600, allowsCustomization: false },
    { id: 'te-chai-latte', name: 'Té Chai Latte', category: 'Té', basePrice: 3000, largePrice: 3300, allowsCustomization: false },

    // Extras
    { id: 'extra-shot', name: 'Extra Shot de Café', category: 'Extras', basePrice: 500, allowsCustomization: false },
    { id: 'extra-leche-vegetal', name: 'Leche Vegetal', category: 'Extras', basePrice: 500, allowsCustomization: false },

    // Sandwichs
    { id: 'sand-queso-oregano', name: 'Queso Orégano', category: 'Sandwichs', basePrice: 2400, allowsCustomization: false },
    { id: 'sand-jamon-queso', name: 'Jamón Queso', category: 'Sandwichs', basePrice: 3200, allowsCustomization: false },
    { id: 'sand-ave-mayo', name: 'Ave Mayo', category: 'Sandwichs', basePrice: 3500, allowsCustomization: false },
    { id: 'sand-ave-palta-mayo', name: 'Ave Palta Mayo', category: 'Sandwichs', basePrice: 3900, allowsCustomization: false },
    { id: 'sand-pollo-italiano', name: 'Pollo Italiano', category: 'Sandwichs', basePrice: 4300, allowsCustomization: false },
    { id: 'sand-queso-fresco-tomate', name: 'Queso Fresco Tomate', category: 'Sandwichs', basePrice: 3300, allowsCustomization: false },
    { id: 'sand-churrasco-solo', name: 'Churrasco Solo', category: 'Sandwichs', basePrice: 3500, allowsCustomization: false },
    { id: 'sand-barros-luco', name: 'Barros Luco', category: 'Sandwichs', basePrice: 4500, allowsCustomization: false },
    { id: 'sand-churrasco-italiano', name: 'Churrasco Italiano', category: 'Sandwichs', basePrice: 5500, allowsCustomization: false },
    { id: 'sand-vegetariano', name: 'Vegetariano', category: 'Sandwichs', basePrice: 3200, allowsCustomization: false },
    { id: 'sand-napolitano', name: 'Napolitano', category: 'Sandwichs', basePrice: 3700, allowsCustomization: false },

    // Fríos
    { id: 'frio-frappuccino-mocca', name: 'Frapuccino Mocca', category: 'Fríos', basePrice: 4500, allowsCustomization: false },
    { id: 'frio-frappuccino-caramel', name: 'Frapuccino Caramel', category: 'Fríos', basePrice: 4500, allowsCustomization: false },
    { id: 'frio-frappuccino-cafe', name: 'Frapuccino Solo Café', category: 'Fríos', basePrice: 4500, allowsCustomization: false },
    { id: 'frio-iced-latte', name: 'Iced Latte', category: 'Fríos', basePrice: 3500, allowsCustomization: false },
    { id: 'frio-smoothie-frutilla', name: 'Smoothie Frutilla', category: 'Fríos', basePrice: 3500, allowsCustomization: false },
    { id: 'frio-jugo-natural', name: 'Jugo Natural', category: 'Fríos', basePrice: 3000, allowsCustomization: false, description: 'Variedad de sabores' },
    { id: 'frio-limonada-menta', name: 'Limonada Menta Jengibre', category: 'Fríos', basePrice: 3000, allowsCustomization: false },

    // Bebidas
    { id: 'beb-lata', name: 'Bebida Lata', category: 'Bebidas', basePrice: 1500, allowsCustomization: false },
    { id: 'beb-agua', name: 'Agua Mineral', category: 'Bebidas', basePrice: 1000, allowsCustomization: false },
    { id: 'beb-redbull-250', name: 'Redbull 250ml', category: 'Bebidas', basePrice: 1800, allowsCustomization: false },
    { id: 'beb-redbull-355', name: 'Redbull 355ml', category: 'Bebidas', basePrice: 2200, allowsCustomization: false },
    { id: 'beb-redbull-473', name: 'Redbull 473ml', category: 'Bebidas', basePrice: 2700, allowsCustomization: false },
    { id: 'beb-powerade', name: 'Powerade', category: 'Bebidas', basePrice: 1900, allowsCustomization: false },
];
