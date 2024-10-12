"use client";

import React from "react";
import { useCart } from '@/contexts/CartContext'; 
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import convertToSubcurrency from "@/lib/convertToSubcurrency";

// Caricare Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    console.error('Stripe publishable key non è definita');
}

const CheckoutPage: React.FC = () => {
    const { cart } = useCart(); 
    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + item.price, 0);
        // return 500;  // Questa è solo un valore statico per il testing, sostituirlo con il calcolo effettivo
    };

    const totalAmount = calculateTotalAmount();

    return (
        <div className="bg-background text-text min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-4 text-secondary">Checkout</h1>
            <h3 className="text-xl font-semibold mb-6 text-muted">Mathias ti ha richiesto €{totalAmount.toFixed(2)}</h3>
            
            <Elements
                stripe={stripePromise}
                options={{
                    mode: 'payment',
                    amount: convertToSubcurrency(totalAmount),
                    currency: "eur"
                }}
            >
                <div className="bg-background border border-muted rounded-lg p-6 shadow-lg">
                    <CheckoutForm amount={totalAmount} />
                </div>
            </Elements>
        </div>
    );
};

export default CheckoutPage;
