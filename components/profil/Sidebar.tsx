"use client"

import { ShoppingCart, Users } from "lucide-react"

interface SidebarProps {
  setActiveSection: (section: string) => void;
}

export default function Sidebar({ setActiveSection }: SidebarProps) {
  const handleNavigation = (section: string) => {
    setActiveSection(section);
  }

  return (
    <div className="hidden sm:block pb-12 w-64 bg-white text-black">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Tableau de bord
          </h2>
          <div className="space-y-1">
            <button
              onClick={() => handleNavigation("orders")}
              className="w-full flex justify-start py-2 px-4 hover:bg-black hover:text-white transition"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Commandes
            </button>
            <button
              onClick={() => handleNavigation("customers")}
              className="w-full flex justify-start py-2 px-4 hover:bg-black hover:text-white transition"
            >
              <Users className="mr-2 h-4 w-4" />
              Données personnelles
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
