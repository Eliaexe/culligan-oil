// components/Sidebar.tsx
import { useState } from "react";
import { cn } from "@/lib/utils"; // Assicurati di avere la tua funzione cn per gestire le classi
import { HiOutlineShoppingCart } from "react-icons/hi";

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-full bg-gray-800 text-yellow-300 transition-transform transform", 
        { "translate-x-0": isOpen, "-translate-x-full": !isOpen }
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold">Panier</h2>
        <button onClick={onClose} className="text-yellow-300 hover:text-yellow-500">
          X
        </button>
      </div>
      <div className="p-4">
        {/* Aggiungi qui i tuoi articoli del carrello */}
        <p>Nessun articolo nel carrello.</p>
      </div>
      <div className="p-4 border-t border-gray-700">
        <button className="bg-yellow-500 text-gray-800 px-4 py-2 rounded hover:bg-yellow-400">
          Procedi al Checkout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
