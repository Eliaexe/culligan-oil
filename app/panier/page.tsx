'use client';
import { useCart } from '@/contexts/CartContext'; // Usa il custom hook
import Link from 'next/link';
import Navbar1Client from '@/components/Navbar1/Navbar1Client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity } = useCart(); // Aggiungi updateQuantity dal contesto
    console.log(cart);

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        if (newQuantity > 0) {
            updateQuantity(itemId, newQuantity); // Chiama updateQuantity per aggiornare la quantità
        }
    };

    return (
        <>
            <Navbar1Client
                logo={{ src: '/logo.png', url: '/', alt: 'Logo Cullinan Oil' }}
                navLinks={[
                    { url: '/about', title: 'À Propos' },
                    { url: '/contact', title: 'Contact' },
                    { url: '/acceder', title: 'Se Connecter', isButton: true }
                ]}
            />
            <div className="container mx-auto px-4 py-8 bg-[#0B0B0B] text-[#FDDD57]">
                <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {cart.map((item) => (
                            <Card key={item.id} className="mb-4 bg-gray-800 border border-gray-600">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <p className="text-sm text-gray-300 mb-2">${item.price}</p>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)} // Usa 'id' qui
                                                    className="text-[#FDDD57]"
                                                >
                                                    <MinusIcon className="h-4 w-4" />
                                                </Button>
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                    className="w-16 text-center bg-gray-700 text-[#FDDD57]"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)} // Usa 'id' qui
                                                    className="text-[#FDDD57]"
                                                >
                                                    <PlusIcon className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between items-end">
                                            <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-[#FDDD57]">
                                                <XIcon className="h-4 w-4" />
                                            </Button>
                                            <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div>
                        <Card className="bg-gray-800 border border-gray-600">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>VAT</span>
                                        <span>$0.00</span>
                                    </div>
                                </div>
                                <Separator className="my-4 border-gray-600" />
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-[#4C6D1C] hover:bg-green-600 text-white">
                                    <Link href="/checkout">Proceed to Checkout</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>

    );
}
