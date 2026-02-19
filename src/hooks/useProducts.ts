import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types';
import { products as defaultProducts } from '../data/products';

const STORAGE_KEY = 'coffe-bless-products';
const STORAGE_VERSION_KEY = 'coffe-bless-products-version';
const CURRENT_VERSION = '3'; // Bump this when default products change

/**
 * Hook que gestiona los productos. Lee desde localStorage si existen,
 * de lo contrario usa el catálogo por defecto de products.ts.
 */
export function useProducts() {
    const [products, setProducts] = useState<Product[]>(() => {
        try {
            const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
            // If version doesn't match, reset to defaults
            if (storedVersion !== CURRENT_VERSION) {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
                return defaultProducts;
            }
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch {
            // Si hay error al parsear, usar defaults
        }
        return defaultProducts;
    });

    // Guardar en localStorage cuando cambian
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }, [products]);

    const saveProducts = useCallback((newProducts: Product[]) => {
        setProducts(newProducts);
    }, []);

    const addProduct = useCallback((product: Product) => {
        setProducts(prev => [...prev, product]);
    }, []);

    const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    }, []);

    const deleteProduct = useCallback((id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    }, []);

    const resetToDefaults = useCallback(() => {
        setProducts(defaultProducts);
    }, []);

    return {
        products,
        saveProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaults,
    };
}
