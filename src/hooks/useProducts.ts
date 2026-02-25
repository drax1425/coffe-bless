import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types';
import { supabase } from '../lib/supabase';
import { products as defaultProducts } from '../data/products';

/**
 * Hook que gestiona los productos. Lee desde Supabase.
 * Mantiene los defaults si la base de datos está vacía.
 */
export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('category', { ascending: true });

            if (error) throw error;

            if (data && data.length > 0) {
                setProducts(data as Product[]);
            } else {
                // Si no hay datos, usar los por defecto
                setProducts(defaultProducts);
            }
        } catch (error) {
            console.error('Error fetching products from Supabase:', error);
            setProducts(defaultProducts);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const saveProducts = useCallback(async (newProducts: Product[]) => {
        try {
            // En Supabase, para simplificar este flujo de "guardar todo", 
            // primero podríamos borrar y re-insertar, o usar upsert si los IDs coinciden.
            // Para evitar problemas de IDs, usaremos upsert.
            const { error } = await supabase
                .from('products')
                .upsert(newProducts);

            if (error) throw error;
            setProducts(newProducts);
        } catch (error) {
            console.error('Error saving products to Supabase:', error);
            alert('Error al guardar en la base de datos');
        }
    }, []);

    const resetToDefaults = useCallback(async () => {
        if (confirm('¿Estás seguro de que quieres restaurar los productos por defecto? Esto borrará los cambios en la base de datos.')) {
            try {
                // Borrar todo y re-insertar defaults
                const { error: deleteError } = await supabase.from('products').delete().neq('id', '0');
                if (deleteError) throw deleteError;

                const { error: insertError } = await supabase.from('products').insert(defaultProducts);
                if (insertError) throw insertError;

                setProducts(defaultProducts);
            } catch (error) {
                console.error('Error resetting products:', error);
            }
        }
    }, []);

    return {
        products,
        loading,
        saveProducts,
        resetToDefaults,
        refresh: fetchProducts
    };
}
