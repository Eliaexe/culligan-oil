'use client'
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  // Assicurati di avere i dati necessari per l'ordine
  const orderDetails = {
    user: "userId", // ID dell'utente autenticato
    products: [
      {
        productId: "productId1",
        quantity: 1,
        price: amount, // L'importo totale del pagamento
      },
      // Aggiungi ulteriori prodotti se necessario
    ],
    totalAmount: parseFloat(amount),
    paymentStatus: "paid",
    paymentMethod: "stripe",
    shippingAddress: "User's shipping address", // Assicurati di avere un indirizzo di spedizione
  };

  useEffect(() => {
    const sendOrder = async () => {
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        });

        if (!response.ok) {
          throw new Error("Errore durante l'invio dell'ordine");
        }

        const newOrder = await response.json();
        console.log("Ordine inviato:", newOrder);
      } catch (error) {
        console.error("Errore:", error);
      }
    };

    sendOrder();
  }, [orderDetails]); // Invia l'ordine quando i dettagli cambiano

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4C6D1C] to-[#0B0B0B] p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-20 h-20 bg-[#DFF2CC] rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-[#4C6D1C]" />
          </div>
          <CardTitle className="text-3xl font-bold text-[#FDDD57]">Merci !</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-6 text-[#FDDD57]">Votre paiement a été effectué avec succès.</p>
          <div className="bg-[#4C6D1C] p-4 rounded-lg mb-6">
            <p className="text-sm text-[#FDDD57] mb-1">Montant payé</p>
            <p className="text-4xl font-bold text-[#FDDD57]">€{amount}</p>
          </div>
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/profile">Aller au Tableau de Bord</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/profil">Voir l'ordre</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
