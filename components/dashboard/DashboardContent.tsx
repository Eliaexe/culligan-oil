"use client"

import { Package, ShoppingCart, Users } from "lucide-react"

export default function DashboardContent() {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="border p-4 bg-white text-black">
        <h2 className="text-lg font-medium mb-4">Produits récents</h2>
        <div className="space-y-4">
          {["Smartphone XYZ", "Laptop ABC", "Casque 123"].map((product) => (
            <div key={product} className="flex items-center">
              <Package className="mr-2 h-4 w-4 text-black" />
              <span>{product}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border p-4 bg-white text-black">
        <h2 className="text-lg font-medium mb-4">Dernières commandes</h2>
        <div className="space-y-4">
          {["Commande #1234", "Commande #1235", "Commande #1236"].map((order) => (
            <div key={order} className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4 text-black" />
              <span>{order}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border p-4 bg-white text-black">
        <h2 className="text-lg font-medium mb-4">Nouveaux clients</h2>
        <div className="space-y-4">
          {["Mario Rossi", "Giulia Bianchi", "Luca Verdi"].map((customer) => (
            <div key={customer} className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-black" />
              <span>{customer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
