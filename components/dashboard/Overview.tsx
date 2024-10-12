"use client"

import { useState } from "react"
import DashboardStats from "@/components/dashboard/DashboardStats"
import DashboardContent from "@/components/dashboard/DashboardContent"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import Sidebar from "@/components/dashboard/Sidebar"

export default function Overview() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


  return (
    <div className="flex h-screen overflow-hidden bg-white text-black">
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 sm:w-64 bg-white text-black">
          <Sidebar setActiveSection={() => {}} /> {/* Pass an empty function as we are not using it here */}
        </SheetContent>
      </Sheet>
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">
          <DashboardStats />
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}
