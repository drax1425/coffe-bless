import type { Product } from '../types';

export const products: Product[] = [
    // Café (Calientes)
    { id: 'cafe-espresso', name: 'Espresso', category: 'Café', basePrice: 1800, allowsCustomization: false },
    { id: 'cafe-americano', name: 'Americano', category: 'Café', basePrice: 2000, allowsCustomization: false },
    { id: 'cafe-latte', name: 'Latte', category: 'Café', basePrice: 2500, allowsCustomization: false },
    { id: 'cafe-cappuccino', name: 'Cappuccino', category: 'Café', basePrice: 2800, allowsCustomization: false },
    { id: 'cafe-cortado', name: 'Cortado', category: 'Café', basePrice: 2200, allowsCustomization: false },
    { id: 'cafe-bombon', name: 'Bombón', category: 'Café', basePrice: 2600, allowsCustomization: false },

    // Fríos
    { id: 'frio-frappuccino-mocca', name: 'Frappuccino Mocca', category: 'Fríos', basePrice: 3500, allowsCustomization: false },
    { id: 'frio-frappuccino-caramel', name: 'Frappuccino Caramel', category: 'Fríos', basePrice: 3500, allowsCustomization: false },
    { id: 'frio-cafe-helado', name: 'Cafe Helado', category: 'Fríos', basePrice: 3000, allowsCustomization: false },
    { id: 'frio-iced-latte', name: 'Iced Latte', category: 'Fríos', basePrice: 3200, allowsCustomization: false },
    { id: 'frio-smothie-frutilla', name: 'Smothie Frutilla', category: 'Fríos', basePrice: 3500, allowsCustomization: false },
    { id: 'frio-jugo-natural', name: 'Jugo Natural', category: 'Fríos', basePrice: 2500, allowsCustomization: false },

    // Chocolate
    { id: 'choco-caliente', name: 'Chocolate Caliente', category: 'Chocolate', basePrice: 2800, allowsCustomization: false },
    { id: 'choco-mashmallows', name: 'Chocolate Mashmallows', category: 'Chocolate', basePrice: 3200, allowsCustomization: false },
    { id: 'choco-nevado', name: 'Chocolate Nevado', category: 'Chocolate', basePrice: 3000, allowsCustomization: false },

    // Té
    { id: 'te-negro', name: 'Té Negro', category: 'Té', basePrice: 1500, allowsCustomization: false },
    { id: 'te-verde', name: 'Té Verde', category: 'Té', basePrice: 1500, allowsCustomization: false },
    { id: 'te-manzanilla', name: 'Té Manzanilla', category: 'Té', basePrice: 1500, allowsCustomization: false },
];
