"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function ProfilHeader() {
  return (
    <header className="flex items-center justify-between px-4 h-16 border-b bg-white text-black">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 hover:bg-black hover:text-white transition">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
        </Sheet>
        <h1 className="text-2xl font-bold ml-2">Vos Profil</h1>
      </div>
      <button className="px-4 py-2 border border-black hover:bg-black hover:text-white transition">
        Déconnexion
      </button>
    </header>
  )
}
