import { useState } from 'react';
import { Hero } from './components/Hero';
import { GameZone } from './components/GameZone';
import { CoffeeBuilder } from './components/CoffeeBuilder';
import { OrderSummary } from './components/OrderSummary';
import { Menu } from './components/Menu';
import { AdminPanel } from './components/AdminPanel';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SplashScreen } from './components/SplashScreen';
import { CartProvider, useCart } from './context/CartContext';
import { useProducts } from './hooks/useProducts';
import type { Product, CoffeeCustomization, CoffeeBase } from './types';

type View = 'LANDING' | 'MENU' | 'BUILDER' | 'SUMMARY' | 'GAME' | 'ADMIN';

function AppContent() {
  const [view, setView] = useState<View>('LANDING');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const { addToCart, clearCart } = useCart();
  const { products, saveProducts, resetToDefaults } = useProducts();

  const handleStartCustomization = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setView('BUILDER');
    }
  };

  const handleFinishCustomization = (customization: CoffeeCustomization, base: CoffeeBase, customerName: string) => {
    if (selectedProduct) {
      addToCart(selectedProduct, 1, customization, base, customerName);
      setView('MENU');
      setSelectedProduct(null);
    }
  };

  // Show floating WhatsApp on all views except ADMIN and SUMMARY (which has its own WA button)
  const showFloatingWA = !showSplash && view !== 'ADMIN' && view !== 'SUMMARY';

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-900">
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {view === 'LANDING' && (
        <Hero
          onStart={() => setView('MENU')}
          onPlay={() => setView('GAME')}
          onAdmin={() => setView('ADMIN')}
        />
      )}

      {view === 'GAME' && (
        <GameZone onBack={() => setView('LANDING')} />
      )}

      {view === 'MENU' && (
        <Menu
          products={products}
          onCustomize={handleStartCustomization}
          onViewCart={() => setView('SUMMARY')}
          onBack={() => setView('LANDING')}
        />
      )}

      {view === 'BUILDER' && selectedProduct && (
        <CoffeeBuilder
          initialBase={selectedProduct.name as CoffeeBase}
          product={selectedProduct}
          onAdd={handleFinishCustomization}
          onBack={() => setView('MENU')}
        />
      )}

      {view === 'SUMMARY' && (
        <OrderSummary
          onBack={() => setView('MENU')}
          onClear={() => {
            clearCart();
            setView('MENU');
          }}
        />
      )}

      {view === 'ADMIN' && (
        <AdminPanel
          products={products}
          onSave={saveProducts}
          onReset={resetToDefaults}
          onBack={() => setView('LANDING')}
        />
      )}

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp show={showFloatingWA} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
