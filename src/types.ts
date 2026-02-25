export interface Category {
    id: string;
    name: string;
    order?: number;
}

export interface Product {
    id: string;
    name: string;
    category_id: string;
    category?: Category; // Populado por el join en Supabase
    basePrice: number;
    image?: string;
    description?: string;
    largePrice?: number;
}

export interface CartItem {
    id: string; // Unique ID for the cart item (productID + size)
    product: Product;
    quantity: number;
    size?: 'Mediano' | 'Grande';
    parentItemId?: string; // Links an extra to the parent product it belongs to
}
