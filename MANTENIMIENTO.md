# 🛠️ Guía de Mantenimiento — Coffe Bless

## Acceder al Panel Admin

1. Abre la landing page en tu navegador
2. En la pantalla de inicio, **haz click 5 veces** en el texto del footer ("Coffe Bless ☕ • v1.0")
3. Se abrirá la pantalla de administrador
4. **Contraseña:** `coffebless2024`

> ⚠️ Los cambios se guardan en el navegador (localStorage). Si limpias los datos del navegador, se restauran los productos originales.

---

## Cambiar Productos y Precios

1. Accede al Panel Admin (ver arriba)
2. **Editar nombre:** Click en el nombre del producto y escribe el nuevo
3. **Editar precio:** Click en el precio y escribe el nuevo valor
4. **Eliminar:** Click en el ícono de basurero 🗑️
5. **Agregar:** Click en el botón ➕ arriba a la derecha, llena el formulario
6. **Guardar:** Click en el botón verde "Guardar Cambios"
7. **Restaurar originales:** Click en el ícono de reset 🔄

---

## Cambiar el Número de WhatsApp

1. Abre el archivo `src/utils/whatsapp.ts`
2. En la línea 4, cambia el número:
   ```typescript
   export const CAFE_PHONE_NUMBER = '56912345678';  // ← Cambia este número
   ```
3. Usa el formato: código de país + número sin + ni espacios
   - Ejemplo Chile: `56912345678`
4. Guarda y redesplega (ver abajo)

---

## Cambiar la Contraseña del Admin

1. Abre el archivo `src/components/AdminPanel.tsx`
2. En la línea 7, cambia la contraseña:
   ```typescript
   const ADMIN_PASSWORD = 'coffebless2024';  // ← Cambia esta contraseña
   ```
3. Guarda y redesplega

---

## Redesplegar en Vercel

### Opción A: Automático (recomendado)
Si el proyecto está conectado a GitHub:
1. Haz commit de tus cambios: `git add . && git commit -m "actualización"`
2. Haz push: `git push`
3. Vercel redesplega automáticamente en ~1 minuto

### Opción B: Manual
1. Entra a [vercel.com](https://vercel.com)
2. Ve a tu proyecto → Deployments
3. Click en "Redeploy" en el último deploy

---

## Primer Deploy (primera vez)

### Requisitos
- Cuenta en [GitHub](https://github.com)
- Cuenta en [Vercel](https://vercel.com) (gratis, vincular con GitHub)

### Pasos
1. **Subir código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Coffe Bless landing page"
   git remote add origin https://github.com/TU-USUARIO/coffe-bless.git
   git push -u origin main
   ```

2. **Conectar en Vercel:**
   - Ve a [vercel.com/new](https://vercel.com/new)
   - Click "Import" → selecciona tu repo `coffe-bless`
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click "Deploy"

3. **Dominio personalizado (opcional):**
   - En Vercel → Settings → Domains
   - Agrega tu dominio (ej: `coffebless.cl`)
   - Configura los DNS según las instrucciones de Vercel

---

## Estructura del Proyecto

```
src/
├── components/
│   ├── Hero.tsx         ← Pantalla de inicio
│   ├── Menu.tsx         ← Menú de productos
│   ├── GameZone.tsx     ← Mini-juego mascota
│   ├── AdminPanel.tsx   ← Panel administrador
│   ├── OrderSummary.tsx ← Resumen + WhatsApp
│   └── ...
├── data/
│   └── products.ts      ← Productos por defecto
├── hooks/
│   └── useProducts.ts   ← Gestión de productos
├── utils/
│   └── whatsapp.ts      ← Integración WhatsApp
└── types.ts             ← Tipos TypeScript
```
