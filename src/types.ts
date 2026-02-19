export type CoffeeBase = 'Espresso' | 'Americano' | 'Latte' | 'Cappuccino' | 'Cold Brew' | 'Bombón' | 'Chocolate' | 'Frappuccino';
export type Milk = 'Entera' | 'Descremada' | 'Avena' | 'Almendra' | 'Soya';
export type Syrup = 'Ninguno' | 'Vainilla' | 'Caramelo' | 'Avellana';
export type Extra = 'Crema Batida' | 'Extra Shot' | 'Hielo' | 'Canela' | 'Malvaviscos';

export interface CoffeeCustomization {
    milk: Milk;
    syrup: Syrup;
    extras: Extra[];
}

export type Category = string;

export interface Product {
    id: string;
    name: string;
    category: Category;
    basePrice: number;
    allowsCustomization: boolean; // True for coffees that support the builder
    image?: string; // Optional image URL or emoji
}

export interface CartItem {
    id: string; // Unique ID for the cart item (productID + customization hash)
    product: Product;
    quantity: number;
    customization?: CoffeeCustomization; // Only for customizable products
    coffeeBase?: CoffeeBase; // Specific base chosen if it's a coffee
    customerName?: string; // Optional name for specific item
}

export const defaultCustomization: CoffeeCustomization = {
    milk: 'Entera',
    syrup: 'Ninguno',
    extras: [],
};
