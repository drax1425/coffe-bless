-- 0. Limpiar base de datos anterior (EJECUTAR CON PRECAUCIÓN)
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- 1. Crear tabla de categorías
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Crear tabla de productos con relación a categorías
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category_id TEXT REFERENCES categories(id),
    "basePrice" INTEGER NOT NULL,
    "largePrice" INTEGER,
    image TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Habilitar RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de lectura pública
CREATE POLICY "Lectura publica categorias" ON categories FOR SELECT USING (true);
CREATE POLICY "Lectura publica productos" ON products FOR SELECT USING (true);

-- 5. Políticas de edición pública (para desarrollo, luego restringir)
CREATE POLICY "Edicion publica categorias" ON categories FOR ALL USING (true);
CREATE POLICY "Edicion publica productos" ON products FOR ALL USING (true);

-- 6. Insertar categorías iniciales
INSERT INTO categories (id, name, "order") VALUES
('cat-cafe', 'Café', 1),
('cat-chocolate', 'Chocolate', 2),
('cat-te', 'Té', 3),
('cat-sandwichs', 'Sandwichs', 4),
('cat-frios', 'Fríos', 5),
('cat-bebidas', 'Bebidas', 6),
('cat-extras', 'Extras', 7);

-- 7. Insertar productos vinculados
INSERT INTO products (id, name, category_id, "basePrice", "largePrice", description) VALUES 
('cafe-espresso', 'Espresso', 'cat-cafe', 1800, NULL, 'Shot de café'),
('cafe-espresso-doble', 'Espresso Doble', 'cat-cafe', 2300, NULL, 'Doble shot de café'),
('cafe-americano', 'Americano', 'cat-cafe', 1500, 2900, 'Shot de café más agua'),
('cafe-cappuccino', 'Cappuccino', 'cat-cafe', 2800, 3200, 'Shot de café más leche texturizada'),
('cafe-cappuccino-vainilla', 'Cappuccino Vainilla', 'cat-cafe', 3000, 3300, 'Leche texturizada y syrup vainilla'),
('cafe-cappuccino-nevado', 'Cappuccino Nevado', 'cat-cafe', 3200, 3500, 'Leche texturizada y crema chantilly'),
('cafe-latte', 'Latte', 'cat-cafe', 3000, NULL, 'Shot de café más leche texturizada'),
('cafe-mocca', 'Mocca', 'cat-cafe', 3100, 3400, 'Leche texturizada y syrup chocolate'),
('cafe-caramel', 'Caramel', 'cat-cafe', 3000, 3300, 'Leche texturizada y syrup caramelo'),
('cafe-bombon', 'Bombom', 'cat-cafe', 3000, 3300, 'Leche texturizada y leche condensada'),
('choco-caliente', 'Chocolate Caliente', 'cat-chocolate', 3300, 3900, NULL),
('choco-mashmallows', 'Chocolate Mashmallows', 'cat-chocolate', 3500, 4100, NULL),
('choco-nevado', 'Chocolate Nevado', 'cat-chocolate', 3500, 4100, NULL),
('te-negro', 'Té Negro', 'cat-te', 1400, 1600, NULL),
('te-chai-latte', 'Té Chai Latte', 'cat-te', 3000, 3300, NULL),
('extra-shot', 'Extra Shot de Café', 'cat-extras', 500, NULL, NULL),
('extra-leche-vegetal', 'Leche Vegetal', 'cat-extras', 500, NULL, NULL),
('sand-queso-oregano', 'Queso Orégano', 'cat-sandwichs', 2400, NULL, NULL),
('sand-jamon-queso', 'Jamón Queso', 'cat-sandwichs', 3200, NULL, NULL),
('sand-ave-mayo', 'Ave Mayo', 'cat-sandwichs', 3500, NULL, NULL),
('sand-ave-palta-mayo', 'Ave Palta Mayo', 'cat-sandwichs', 3900, NULL, NULL),
('sand-pollo-italiano', 'Pollo Italiano', 'cat-sandwichs', 4300, NULL, NULL),
('sand-queso-fresco-tomate', 'Queso Fresco Tomate', 'cat-sandwichs', 3300, NULL, NULL),
('sand-churrasco-solo', 'Churrasco Solo', 'cat-sandwichs', 3500, NULL, NULL),
('sand-barros-luco', 'Barros Luco', 'cat-sandwichs', 4500, NULL, NULL),
('sand-churrasco-italiano', 'Churrasco Italiano', 'cat-sandwichs', 5500, NULL, NULL),
('sand-vegetariano', 'Vegetariano', 'cat-sandwichs', 3200, NULL, NULL),
('sand-napolitano', 'Napolitano', 'cat-sandwichs', 3700, NULL, NULL),
('frio-frappuccino-mocca', 'Frapuccino Mocca', 'cat-frios', 4500, NULL, NULL),
('frio-frappuccino-caramel', 'Frapuccino Caramel', 'cat-frios', 4500, NULL, NULL),
('frio-frappuccino-cafe', 'Frapuccino Solo Café', 'cat-frios', 4500, NULL, NULL),
('frio-iced-latte', 'Iced Latte', 'cat-frios', 3500, NULL, NULL),
('frio-smoothie-frutilla', 'Smoothie Frutilla', 'cat-frios', 3500, NULL, NULL),
('frio-jugo-natural', 'Jugo Natural', 'cat-frios', 3000, NULL, 'Variedad de sabores'),
('frio-limonada-menta', 'Limonada Menta Jengibre', 'cat-frios', 3000, NULL, NULL),
('beb-lata', 'Bebida Lata', 'cat-bebidas', 1500, NULL, NULL),
('beb-agua', 'Agua Mineral', 'cat-bebidas', 1000, NULL, NULL),
('beb-redbull-250', 'Redbull 250ml', 'cat-bebidas', 1800, NULL, NULL),
('beb-redbull-355', 'Redbull 355ml', 'cat-bebidas', 2200, NULL, NULL),
('beb-redbull-473', 'Redbull 473ml', 'cat-bebidas', 2700, NULL, NULL),
('beb-powerade', 'Powerade', 'cat-bebidas', 1900, NULL, NULL);
