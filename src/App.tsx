import { useState } from 'react';
import { Hero } from './components/Hero';
import { GameZone } from './components/GameZone';
import { OrderSummary } from './components/OrderSummary';
import { Menu } from './components/Menu';
import { AdminPanel } from './components/AdminPanel';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SplashScreen } from './components/SplashScreen';
import { Analytics } from '@vercel/analytics/react';
import { CartProvider, useCart } from './context/CartContext';
import { useProducts } from './hooks/useProducts';

type View = 'LANDING' | 'MENU' | 'SUMMARY' | 'GAME' | 'ADMIN';

function AppContent() {
  const [view, setView] = useState<View>('LANDING');
  const [showSplash, setShowSplash] = useState(true);
  const { clearCart } = useCart();
  const { products, categories, saveProducts, saveCategory, deleteCategory, resetToDefaults } = useProducts();

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
          categories={categories}
          onViewCart={() => setView('SUMMARY')}
          onBack={() => setView('LANDING')}
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
          categories={categories}
          onSave={saveProducts}
          onSaveCategory={saveCategory}
          onDeleteCategory={deleteCategory}
          onReset={resetToDefaults}
          onBack={() => setView('LANDING')}
        />
      )}

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp show={showFloatingWA} />

      {/* Vercel Analytics */}
      <Analytics />
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
