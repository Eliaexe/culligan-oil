'use client';

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Product } from '@/models/Product.model';

interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Product[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id); // Modifica qui per usare 'id' invece di '_id'

            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item // Incrementa la quantità
                );
            }

            return [...prevCart, { ...product, quantity: 1 }]; // Aggiungi il prodotto con quantità 1
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId)); // Modifica qui per usare 'id'
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prev) => 
            prev.map(item => (item.id === id ? { ...item, quantity } : item))
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
