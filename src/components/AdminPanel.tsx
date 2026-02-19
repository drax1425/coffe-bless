import { useState } from 'react';
import type { Product, Category } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, Save, RotateCcw, Lock, Eye, EyeOff, FolderPlus } from 'lucide-react';

// Contraseña del admin (cambiar por la real)
const ADMIN_PASSWORD = 'coffebless2024';

const DEFAULT_CATEGORIES: Category[] = ['Café', 'Fríos', 'Chocolate', 'Té'];

interface AdminPanelProps {
    products: Product[];
    onSave: (products: Product[]) => void;
    onReset: () => void;
    onBack: () => void;
}

export const AdminPanel = ({ products, onSave, onReset, onBack }: AdminPanelProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const [editProducts, setEditProducts] = useState<Product[]>([...products]);
    const [hasChanges, setHasChanges] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);

    // Derive categories from products
    const categories = [...new Set([...DEFAULT_CATEGORIES, ...editProducts.map(p => p.category)])];

    // New product form state
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newCategory, setNewCategory] = useState<Category>(categories[0]);

    // New category form state
    const [newCatName, setNewCatName] = useState('');

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Contraseña incorrecta');
            setPassword('');
        }
    };

    const updateField = (id: string, field: keyof Product, value: string | number) => {
        setEditProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
        setHasChanges(true);
    };

    const changeProductCategory = (id: string, category: Category) => {
        setEditProducts(prev => prev.map(p => p.id === id ? { ...p, category } : p));
        setHasChanges(true);
    };

    const handleDelete = (id: string) => {
        setEditProducts(prev => prev.filter(p => p.id !== id));
        setHasChanges(true);
    };

    const handleAdd = () => {
        if (!newName.trim() || !newPrice) return;

        const newProduct: Product = {
            id: `custom-${Date.now()}`,
            name: newName.trim(),
            category: newCategory,
            basePrice: parseInt(newPrice),
            allowsCustomization: false,
        };

        setEditProducts(prev => [...prev, newProduct]);
        setHasChanges(true);
        setNewName('');
        setNewPrice('');
        setShowAddForm(false);
    };

    const handleAddCategory = () => {
        if (!newCatName.trim()) return;
        // Add a placeholder product to create the category
        const placeholder: Product = {
            id: `custom-${Date.now()}`,
            name: 'Nuevo Producto',
            category: newCatName.trim(),
            basePrice: 0,
            allowsCustomization: false,
        };
        setEditProducts(prev => [...prev, placeholder]);
        setHasChanges(true);
        setNewCatName('');
        setShowAddCategory(false);
        setNewCategory(newCatName.trim());
    };

    const handleSave = () => {
        // Filter out products with 0 price (from placeholder category creation)
        const validProducts = editProducts.filter(p => p.basePrice > 0 || p.name !== 'Nuevo Producto');
        onSave(validProducts.length > 0 ? validProducts : editProducts);
        setHasChanges(false);
    };

    const handleReset = () => {
        onReset();
        setEditProducts([...products]);
        setHasChanges(false);
    };

    // Login screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-stone-900 text-white flex flex-col items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-sm bg-stone-800 rounded-3xl p-8 border border-stone-700 shadow-2xl"
                >
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-amber-500/10 rounded-full">
                            <Lock size={32} className="text-amber-500" />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-center mb-2">Panel Admin</h1>
                    <p className="text-stone-500 text-sm text-center mb-6">Coffe Bless</p>

                    <div className="relative mb-4">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            placeholder="Contraseña"
                            className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center mb-4">{error}</p>
                    )}

                    <button
                        onClick={handleLogin}
                        className="w-full bg-amber-500 text-stone-900 py-3 rounded-xl font-bold hover:bg-amber-400 transition-colors"
                    >
                        Entrar
                    </button>

                    <button
                        onClick={onBack}
                        className="w-full text-stone-500 text-sm mt-4 hover:text-stone-300 transition-colors"
                    >
                        ← Volver al inicio
                    </button>
                </motion.div>
            </div>
        );
    }

    // Admin dashboard
    return (
        <div className="min-h-screen bg-stone-900 text-white pb-32">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 p-4 shadow-sm">
                <div className="flex justify-between items-center max-w-2xl mx-auto">
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="p-2 bg-stone-800 rounded-full hover:bg-stone-700 transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h2 className="font-bold text-lg">⚙️ Panel Admin</h2>
                            <p className="text-xs text-stone-500">{editProducts.length} productos · {categories.length} categorías</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleReset}
                            className="p-2 bg-stone-800 rounded-lg text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
                            title="Restaurar defaults"
                        >
                            <RotateCcw size={18} />
                        </button>
                        <button
                            onClick={() => { setShowAddCategory(!showAddCategory); setShowAddForm(false); }}
                            className="p-2 bg-stone-800 rounded-lg text-amber-400 hover:text-white hover:bg-stone-700 transition-colors"
                            title="Agregar categoría"
                        >
                            <FolderPlus size={18} />
                        </button>
                        <button
                            onClick={() => { setShowAddForm(!showAddForm); setShowAddCategory(false); }}
                            className="p-2 bg-amber-500 rounded-lg text-stone-900 hover:bg-amber-400 transition-colors"
                            title="Agregar producto"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4 max-w-2xl mx-auto">

                {/* Add Category Form */}
                <AnimatePresence>
                    {showAddCategory && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mb-4"
                        >
                            <div className="bg-stone-800 border border-purple-500/30 rounded-2xl p-4 space-y-3">
                                <h3 className="font-bold text-purple-400 text-sm flex items-center gap-2">
                                    <FolderPlus size={16} />
                                    Nueva Categoría
                                </h3>
                                <input
                                    type="text"
                                    value={newCatName}
                                    onChange={(e) => setNewCatName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                                    placeholder="Nombre de la categoría (ej: Pasteles)"
                                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                                />
                                <p className="text-xs text-stone-500">
                                    Se creará la categoría con un producto de ejemplo que puedes editar después.
                                </p>
                                <button
                                    onClick={handleAddCategory}
                                    disabled={!newCatName.trim()}
                                    className="w-full bg-purple-500 text-white py-2 rounded-lg font-bold text-sm disabled:bg-stone-700 disabled:text-stone-500 hover:bg-purple-400 transition-colors"
                                >
                                    Crear Categoría
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Add Product Form */}
                <AnimatePresence>
                    {showAddForm && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mb-4"
                        >
                            <div className="bg-stone-800 border border-amber-500/30 rounded-2xl p-4 space-y-3">
                                <h3 className="font-bold text-amber-400 text-sm">Nuevo Producto</h3>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Nombre del producto"
                                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        value={newPrice}
                                        onChange={(e) => setNewPrice(e.target.value)}
                                        placeholder="Precio ($)"
                                        className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                                    />
                                    <select
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        className="bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                                    >
                                        {categories.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={handleAdd}
                                    disabled={!newName.trim() || !newPrice}
                                    className="w-full bg-amber-500 text-stone-900 py-2 rounded-lg font-bold text-sm disabled:bg-stone-700 disabled:text-stone-500 hover:bg-amber-400 transition-colors"
                                >
                                    Agregar
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Products by Category */}
                {categories.map(cat => {
                    const catProducts = editProducts.filter(p => p.category === cat);
                    if (catProducts.length === 0) return null;

                    return (
                        <div key={cat} className="mb-6">
                            <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                                {cat}
                                <span className="text-xs font-normal text-stone-600">({catProducts.length})</span>
                            </h3>
                            <div className="space-y-2">
                                {catProducts.map(product => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        className="bg-stone-800 rounded-xl p-3 border border-stone-700/50 flex items-center gap-3"
                                    >
                                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                                            <input
                                                type="text"
                                                value={product.name}
                                                onChange={(e) => updateField(product.id, 'name', e.target.value)}
                                                className="bg-transparent border-b border-stone-700 px-1 py-1 text-sm font-medium focus:outline-none focus:border-amber-500 flex-1 min-w-0"
                                            />
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-stone-500 text-sm">$</span>
                                                    <input
                                                        type="number"
                                                        value={product.basePrice}
                                                        onChange={(e) => updateField(product.id, 'basePrice', parseInt(e.target.value) || 0)}
                                                        className="bg-transparent border-b border-stone-700 px-1 py-1 text-sm w-20 text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                                                    />
                                                </div>
                                                <select
                                                    value={product.category}
                                                    onChange={(e) => changeProductCategory(product.id, e.target.value)}
                                                    className="bg-stone-900 border border-stone-700 rounded px-1 py-1 text-xs text-stone-400 focus:outline-none focus:border-amber-500"
                                                >
                                                    {categories.map(c => (
                                                        <option key={c} value={c}>{c}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-stone-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Save Button (fixed) */}
            {hasChanges && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed bottom-0 left-0 right-0 p-4 bg-stone-900/90 backdrop-blur border-t border-stone-800"
                >
                    <button
                        onClick={handleSave}
                        className="w-full max-w-2xl mx-auto bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-500 transition-colors shadow-lg shadow-green-600/20"
                    >
                        <Save size={20} />
                        Guardar Cambios
                    </button>
                </motion.div>
            )}
        </div>
    );
};
