"use client"

import { BarChart, ShoppingCart, Users, Package } from "lucide-react"

export default function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="border p-4 bg-white text-black">
        <div className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium">Ventes totales</h2>
          <BarChart className="h-4 w-4 text-black" />
        </div>
        <div className="text-2xl font-bold">€45,231.89</div>
        <p className="text-xs">+20.1% par rapport au mois dernier</p>
      </div>
      <div className="border p-4 bg-white text-black">
        <div className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium">Nouvelles commandes</h2>
          <ShoppingCart className="h-4 w-4 text-black" />
        </div>
        <div className="text-2xl font-bold">+573</div>
        <p className="text-xs">+201 par rapport à la semaine dernière</p>
      </div>
      <div className="border p-4 bg-white text-black">
        <div className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium">Nouveaux clients</h2>
          <Users className="h-4 w-4 text-black" />
        </div>
        <div className="text-2xl font-bold">+2350</div>
        <p className="text-xs">+180 par rapport au mois dernier</p>
      </div>
      <div className="border p-4 bg-white text-black">
        <div className="flex flex-row items-center justify-between pb-2">
          <h2 className="text-sm font-medium">Produits actifs</h2>
          <Package className="h-4 w-4 text-black" />
        </div>
        <div className="text-2xl font-bold">1,234</div>
        <p className="text-xs">+34 nouveaux produits ce mois</p>
      </div>
    </div>
  )
}
