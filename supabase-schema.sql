-- 1. Crear la tabla de productos
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    "basePrice" INTEGER NOT NULL,
    "largePrice" INTEGER,
    "allowsCustomization" BOOLEAN DEFAULT false,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 3. Crear política para que todos puedan leer (clientes)
CREATE POLICY "Permitir lectura publica de productos" 
ON products FOR SELECT 
USING (true);

-- 4. Crear política para que todos puedan editar (por ahora, luego se puede restringir con la clave)
CREATE POLICY "Permitir edicion publica de productos" 
ON products FOR ALL 
USING (true);

-- 5. Insertar datos iniciales
INSERT INTO products (id, name, category, "basePrice", "largePrice", "allowsCustomization")
VALUES 
('p1', 'Latte', 'Café', 2800, 3200, false),
('p2', 'Cappuccino', 'Café', 2800, 3200, false),
('p3', 'Americano', 'Café', 2200, 2600, false),
('p4', 'Espresso', 'Café', 1800, NULL, false),
('p5', 'Mocaccino', 'Café', 3000, 3500, false),
('p6', 'Chocolate Caliente', 'Chocolate', 2500, 3000, false),
('p7', 'Té Variedades', 'Té', 1500, NULL, false),
('p8', 'Iced Coffee', 'Fríos', 3000, NULL, false),
('p9', 'Frappé Vainilla', 'Fríos', 3500, NULL, false),
('p10', 'Muffin Arándano', 'Extras', 1800, NULL, false),
('p11', 'Galleta Chocolate', 'Extras', 1200, NULL, false);
