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

    const saveCategory = useCallback(async (newCategory: Category) => {
        try {
            const { error } = await supabase
                .from('categories')
                .upsert(newCategory);

            if (error) throw error;
            setCategories(prev => {
                const exists = prev.find(c => c.id === newCategory.id);
                if (exists) return prev.map(c => c.id === newCategory.id ? newCategory : c);
                return [...prev, newCategory].sort((a, b) => (a.order || 0) - (b.order || 0));
            });
        } catch (error) {
            console.error('Error saving category to Supabase:', error);
            alert('Error al guardar la categoría');
        }
    }, []);

    const deleteCategory = useCallback(async (id: string) => {
        try {
            // Check if there are products in this category
            const hasProducts = products.some(p => p.category_id === id);
            if (hasProducts) {
                alert('No se puede eliminar una categoría que contiene productos. Por favor, mueva o elimine los productos primero.');
                return;
            }

            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setCategories(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error('Error deleting category from Supabase:', error);
            alert('Error al eliminar la categoría');
        }
    }, [products]);

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
        saveCategory,
        deleteCategory,
        resetToDefaults,
        refresh: fetchData
    };
}
