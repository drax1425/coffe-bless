import type { Product, Category } from '../types';

export const categories: Category[] = [
    { id: 'cat-cafe', name: 'Café', order: 1 },
    { id: 'cat-chocolate', name: 'Chocolate', order: 2 },
    { id: 'cat-te', 'name': 'Té', order: 3 },
    { id: 'cat-sandwichs', name: 'Sandwichs', order: 4 },
    { id: 'cat-frios', name: 'Fríos', order: 5 },
    { id: 'cat-bebidas', name: 'Bebidas', order: 6 },
    { id: 'cat-extras', name: 'Extras', order: 7 },
];

export const products: Product[] = [
    // Café
    { id: 'cafe-espresso', name: 'Espresso', category_id: 'cat-cafe', basePrice: 1800, description: 'Shot de café' },
    { id: 'cafe-espresso-doble', name: 'Espresso Doble', category_id: 'cat-cafe', basePrice: 2300, description: 'Doble shot de café' },
    { id: 'cafe-americano', name: 'Americano', category_id: 'cat-cafe', basePrice: 1500, largePrice: 2900, description: 'Shot de café más agua' },
    { id: 'cafe-cappuccino', name: 'Cappuccino', category_id: 'cat-cafe', basePrice: 2800, largePrice: 3200, description: 'Shot de café más leche texturizada' },
    { id: 'cafe-cappuccino-vainilla', name: 'Cappuccino Vainilla', category_id: 'cat-cafe', basePrice: 3000, largePrice: 3300, description: 'Leche texturizada y syrup vainilla' },
    { id: 'cafe-cappuccino-nevado', name: 'Cappuccino Nevado', category_id: 'cat-cafe', basePrice: 3200, largePrice: 3500, description: 'Leche texturizada y crema chantilly' },
    { id: 'cafe-latte', name: 'Latte', category_id: 'cat-cafe', basePrice: 3000, description: 'Shot de café más leche texturizada' },
    { id: 'cafe-mocca', 'name': 'Mocca', category_id: 'cat-cafe', basePrice: 3100, largePrice: 3400, description: 'Leche texturizada y syrup chocolate' },
    { id: 'cafe-caramel', name: 'Caramel', category_id: 'cat-cafe', basePrice: 3000, largePrice: 3300, description: 'Leche texturizada y syrup caramelo' },
    { id: 'cafe-bombon', name: 'Bombom', category_id: 'cat-cafe', basePrice: 3000, largePrice: 3300, description: 'Leche texturizada y leche condensada' },

    // Chocolate
    { id: 'choco-caliente', name: 'Chocolate Caliente', category_id: 'cat-chocolate', basePrice: 3300, largePrice: 3900 },
    { id: 'choco-mashmallows', name: 'Chocolate Mashmallows', category_id: 'cat-chocolate', basePrice: 3500, largePrice: 4100 },
    { id: 'choco-nevado', name: 'Chocolate Nevado', category_id: 'cat-chocolate', basePrice: 3500, largePrice: 4100 },

    // Té
    { id: 'te-negro', name: 'Té Negro', category_id: 'cat-te', basePrice: 1400, largePrice: 1600 },
    { id: 'te-chai-latte', name: 'Té Chai Latte', category_id: 'cat-te', basePrice: 3000, largePrice: 3300 },

    // Extras
    { id: 'extra-shot', name: 'Extra Shot de Café', category_id: 'cat-extras', basePrice: 500 },
    { id: 'extra-leche-vegetal', name: 'Leche Vegetal', category_id: 'cat-extras', basePrice: 500 },

    // Sandwichs
    { id: 'sand-queso-oregano', name: 'Queso Orégano', category_id: 'cat-sandwichs', basePrice: 2400 },
    { id: 'sand-jamon-queso', name: 'Jamón Queso', category_id: 'cat-sandwichs', basePrice: 3200 },
    { id: 'sand-ave-mayo', name: 'Ave Mayo', category_id: 'cat-sandwichs', basePrice: 3500 },
    { id: 'sand-ave-palta-mayo', name: 'Ave Palta Mayo', category_id: 'cat-sandwichs', basePrice: 3900 },
    { id: 'sand-pollo-italiano', name: 'Pollo Italiano', category_id: 'cat-sandwichs', basePrice: 4300 },
    { id: 'sand-queso-fresco-tomate', name: 'Queso Fresco Tomate', category_id: 'cat-sandwichs', basePrice: 3300 },
    { id: 'sand-churrasco-solo', name: 'Churrasco Solo', category_id: 'cat-sandwichs', basePrice: 3500 },
    { id: 'sand-barros-luco', name: 'Barros Luco', category_id: 'cat-sandwichs', basePrice: 4500 },
    { id: 'sand-churrasco-italiano', name: 'Churrasco Italiano', category_id: 'cat-sandwichs', basePrice: 5500 },
    { id: 'sand-vegetariano', name: 'Vegetariano', category_id: 'cat-sandwichs', basePrice: 3200 },
    { id: 'sand-napolitano', name: 'Napolitano', category_id: 'cat-sandwichs', basePrice: 3700 },

    // Fríos
    { id: 'frio-frappuccino-mocca', name: 'Frapuccino Mocca', category_id: 'cat-frios', basePrice: 4500 },
    { id: 'frio-frappuccino-caramel', name: 'Frapuccino Caramel', category_id: 'cat-frios', basePrice: 4500 },
    { id: 'frio-frappuccino-cafe', name: 'Frapuccino Solo Café', category_id: 'cat-frios', basePrice: 4500 },
    { id: 'frio-iced-latte', name: 'Iced Latte', category_id: 'cat-frios', basePrice: 3500 },
    { id: 'frio-smoothie-frutilla', name: 'Smoothie Frutilla', category_id: 'cat-frios', basePrice: 3500 },
    { id: 'frio-jugo-natural', name: 'Jugo Natural', category_id: 'cat-frios', basePrice: 3000, description: 'Variedad de sabores' },
    { id: 'frio-limonada-menta', name: 'Limonada Menta Jengibre', category_id: 'cat-frios', basePrice: 3000 },

    // Bebidas
    { id: 'beb-lata', name: 'Bebida Lata', category_id: 'cat-bebidas', basePrice: 1500 },
    { id: 'beb-agua', name: 'Agua Mineral', category_id: 'cat-bebidas', basePrice: 1000 },
    { id: 'beb-redbull-250', name: 'Redbull 250ml', category_id: 'cat-bebidas', basePrice: 1800 },
    { id: 'beb-redbull-355', name: 'Redbull 355ml', category_id: 'cat-bebidas', basePrice: 2200 },
    { id: 'beb-redbull-473', name: 'Redbull 473ml', category_id: 'cat-bebidas', basePrice: 2700 },
    { id: 'beb-powerade', name: 'Powerade', category_id: 'cat-bebidas', basePrice: 1900 },
];
