import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from '@/components/session/SessionWrapper'; // Assicurati di usare il percorso corretto
import { CartProvider } from '@/contexts/CartContext'; // Importa il CartProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cullinan Oil",
  description: "Pour la barbe et cheveux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <CartProvider>
            {children}
          </CartProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
