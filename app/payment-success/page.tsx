import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
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
              <Link href="/transactions">Voir les Transactions</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
