import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product, CoffeeCustomization, CoffeeBase } from '../types';

interface AddToCartResult {
    addedItem: CartItem;
    parentItem?: CartItem;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity: number, customization?: CoffeeCustomization, coffeeBase?: CoffeeBase, customerName?: string, size?: 'Mediano' | 'Grande') => AddToCartResult | null;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, delta: number) => void;
    clearCart: () => void;
    totalItems: number;
    getGroupedItems: () => { mainItems: CartItem[]; extrasMap: Map<string, CartItem[]> };
    lastAddedEvent: { productName: string; parentName?: string; timestamp: number } | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [lastAddedEvent, setLastAddedEvent] = useState<{ productName: string; parentName?: string; timestamp: number } | null>(null);

    const addToCart = useCallback((
        product: Product,
        quantity: number,
        customization?: CoffeeCustomization,
        coffeeBase?: CoffeeBase,
        customerName?: string,
        size?: 'Mediano' | 'Grande'
    ): AddToCartResult | null => {
        let result: AddToCartResult | null = null;

        setItems(prev => {
            const isCustom = product.allowsCustomization;
            const isExtra = product.category === 'Extras';

            // If it's a simple product (not custom, not extra), try to group it
            if (!isCustom && !isExtra) {
                const existingItem = prev.find(item => item.product.id === product.id && item.size === size && !item.parentItemId);
                if (existingItem) {
                    const updated = prev.map(item =>
                        item.product.id === product.id && item.size === size && !item.parentItemId
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                    result = { addedItem: { ...existingItem, quantity: existingItem.quantity + quantity } };
                    setLastAddedEvent({ productName: product.name, timestamp: Date.now() });
                    return updated;
                }
            }

            // Build the new item
            const newItem: CartItem = {
                id: Math.random().toString(36).substr(2, 9),
                product,
                quantity,
                customization,
                coffeeBase,
                customerName,
                size
            };

            // If it's an Extra, try to link it to the last non-extra product
            if (isExtra) {
                const lastMainItem = [...prev].reverse().find(item => item.product.category !== 'Extras' && !item.parentItemId);
                if (lastMainItem) {
                    newItem.parentItemId = lastMainItem.id;
                    result = { addedItem: newItem, parentItem: lastMainItem };
                    setLastAddedEvent({ productName: product.name, parentName: lastMainItem.product.name, timestamp: Date.now() });
                } else {
                    result = { addedItem: newItem };
                    setLastAddedEvent({ productName: product.name, timestamp: Date.now() });
                }
            } else {
                result = { addedItem: newItem };
                setLastAddedEvent({ productName: product.name, timestamp: Date.now() });
            }

            return [...prev, newItem];
        });

        return result;
    }, []);

    const removeFromCart = (itemId: string) => {
        setItems(prev => {
            // Also remove any extras linked to this item
            return prev.filter(item => item.id !== itemId && item.parentItemId !== itemId);
        });
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

    const getGroupedItems = useCallback((): { mainItems: CartItem[]; extrasMap: Map<string, CartItem[]> } => {
        const mainItems = items.filter(item => !item.parentItemId);
        const extrasMap = new Map<string, CartItem[]>();

        items.filter(item => item.parentItemId).forEach(extra => {
            const parentId = extra.parentItemId!;
            if (!extrasMap.has(parentId)) {
                extrasMap.set(parentId, []);
            }
            extrasMap.get(parentId)!.push(extra);
        });

        return { mainItems, extrasMap };
    }, [items]);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, getGroupedItems, lastAddedEvent }}>
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
