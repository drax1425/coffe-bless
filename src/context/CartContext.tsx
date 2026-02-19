import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product, CoffeeCustomization, CoffeeBase } from '../types';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity: number, customization?: CoffeeCustomization, coffeeBase?: CoffeeBase, customerName?: string, size?: 'Mediano' | 'Grande') => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, delta: number) => void;
    clearCart: () => void;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (
        product: Product,
        quantity: number,
        customization?: CoffeeCustomization,
        coffeeBase?: CoffeeBase,
        customerName?: string,
        size?: 'Mediano' | 'Grande'
    ) => {
        setItems(prev => {
            // Basic ID generation logic: simple check if it handles customization
            // For a real app, we might hash the customization object to group identical custom items
            // For this simplified version, we'll treat every customized coffee as a unique entry if it has a name or customization

            const isCustom = product.allowsCustomization;

            // If it's a simple product (bread/soda), try to group it
            if (!isCustom) {
                const existingItem = prev.find(item => item.product.id === product.id && item.size === size);
                if (existingItem) {
                    return prev.map(item =>
                        item.product.id === product.id && item.size === size
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                }
            }

            // If it's new or custom, add as new item
            const newItem: CartItem = {
                id: Math.random().toString(36).substr(2, 9),
                product,
                quantity,
                customization,
                coffeeBase,
                customerName,
                size
            };

            return [...prev, newItem];
        });
    };

    const removeFromCart = (itemId: string) => {
        setItems(prev => prev.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId: string, delta: number) => {
        setItems(prev => prev.map(item => {
            if (item.id === itemId) {
                const newQuantity = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
