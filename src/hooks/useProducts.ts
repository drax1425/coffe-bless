import { useState, useEffect, useCallback } from 'react';
import type { Product, Category } from '../types';
import { supabase } from '../lib/supabase';
import { products as defaultProducts, categories as defaultCategories } from '../data/products';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);

            // Fetch categories
            const { data: catData, error: catError } = await supabase
                .from('categories')
                .select('*')
                .order('order', { ascending: true });

            if (catError) throw catError;

            // Fetch products with their category info
            const { data: prodData, error: prodError } = await supabase
                .from('products')
                .select('*, category:category_id(*)')
                .order('name', { ascending: true });

            if (prodError) throw prodError;

            if (catData && catData.length > 0) {
                setCategories(catData);
            } else {
                setCategories(defaultCategories);
            }

            if (prodData && prodData.length > 0) {
                setProducts(prodData as Product[]);
            } else {
                setProducts(defaultProducts);
            }

        } catch (error) {
            console.error('Error fetching data from Supabase:', error);
            setCategories(defaultCategories);
            setProducts(defaultProducts);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const saveProducts = useCallback(async (newProducts: Product[]) => {
        try {
            // Upsert products (categories are managed separately or must exist)
            const { error } = await supabase
                .from('products')
                .upsert(newProducts.map(({ category, ...p }) => p)); // Remove relation object before upsert

            if (error) throw error;
            setProducts(newProducts);
        } catch (error) {
            console.error('Error saving products to Supabase:', error);
            alert('Error al guardar en la base de datos');
        }
    }, []);

    const resetToDefaults = useCallback(async () => {
        if (confirm('¿Estás seguro de que quieres restaurar los valores por defecto? Esto borrará los cambios en la base de datos.')) {
            try {
                setLoading(true);

                // Borrar todo
                await supabase.from('products').delete().neq('id', '0');
                await supabase.from('categories').delete().neq('id', '0');

                // Re-insertar categories y luego products
                const { error: catError } = await supabase.from('categories').insert(defaultCategories);
                if (catError) throw catError;

                const { error: prodError } = await supabase.from('products').insert(defaultProducts);
                if (prodError) throw prodError;

                setCategories(defaultCategories);
                setProducts(defaultProducts);
                alert('Datos restaurados con éxito');
            } catch (error) {
                console.error('Error resetting products:', error);
                alert('Error al restaurar datos');
            } finally {
                setLoading(false);
            }
        }
    }, []);

    return {
        products,
        categories,
        loading,
        saveProducts,
        resetToDefaults,
        refresh: fetchData
    };
}
