'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { theme } from "@/lib/theme";
import { useCart } from '@/contexts/CartContext';

type ProductProps = {
    _id: string; // Usa _id per MongoDB
    name: string;
    description: string;
    price: number;
    image: string; // Cambia imageUrl in image
};

type Product12Props = {
    subtitle: string;
    title: string;
    description: string;
    buttonText: string;
};

const ProductCard: React.FC<ProductProps & { buttonText: string; }> = ({
    _id,
    name,
    description,
    price,
    image,
    buttonText, 
}) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const productToAdd = { id: _id, name, description, price, image };
        console.log(name);
        
        addToCart(productToAdd);
    };

    return (
        <Card className="relative overflow-hidden">
            <div className="aspect-square relative">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end">
                    <div className="p-4">
                        <h3
                            className="text-lg font-semibold"
                            style={{ color: theme.colors.primary || '#FDDD57' }}
                        >
                            {name}
                        </h3>
                        <p className="text-sm" style={{ color: theme.colors.muted || '#FDDD57' }}>
                            {description}
                        </p>
                        <p
                            className="text-xl font-bold mt-2"
                            style={{ color: theme.colors.secondary || '#4C6D1C' }}
                        >
                            ${price.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
            <CardFooter className="p-0">
                <Button
                    onClick={handleAddToCart}
                    className="w-full py-4"
                    style={{
                        backgroundColor: theme.colors.primary || '#4C6D1C',
                        color: theme.colors.text || '#FDDD57',
                    }}
                >
                    {buttonText}
                </Button>
            </CardFooter>
        </Card>
    );
};

export const Product12: React.FC<Product12Props> = ({
    subtitle,
    title,
    description,
    buttonText,
}) => {
    const [products, setProducts] = useState<ProductProps[]>([]); // Stato per i prodotti
    const [loading, setLoading] = useState<boolean>(true); // Stato per il caricamento
    const [error, setError] = useState<string | null>(null); // Stato per eventuali errori

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products'); 
                if (!response.ok) {
                    throw new Error('Errore nel recupero dei prodotti');
                }
                const data = await response.json();
                setProducts(data); // Imposta i prodotti ricevuti
            } catch (error: any) {
                setError(error.message); // Gestisci l'errore
            } finally {
                setLoading(false); // Imposta il caricamento su false
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <section
            className="w-full px-4 py-12"
            style={{ backgroundColor: theme.colors.background || '#0B0B0B' }}
        >
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h3
                        className="text-sm font-semibold uppercase tracking-wide"
                        style={{ color: theme.colors.primary || '#FDDD57' }}
                    >
                        {subtitle}
                    </h3>
                    <h2
                        className="mt-2 text-3xl font-extrabold sm:text-4xl"
                        style={{ color: theme.colors.secondary || '#4C6D1C' }}
                    >
                        {title}
                    </h2>
                    <p
                        className="mt-4 text-lg"
                        style={{ color: theme.colors.muted || '#FDDD57' }}
                    >
                        {description}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} {...product} buttonText={buttonText} />
                    ))}
                </div>
            </div>
        </section>
    );
};