"use client"

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Overview from '@/components/dashboard/Overview';
import ProductsSection from '@/components/dashboard/ProductsSection';
import OrdersSection from '@/components/dashboard/OrdersSection';
import CustomersSection from '@/components/dashboard/CustomersSection';
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const renderSection = () => {
    switch (activeSection) {
      case 'orders':
        return <OrdersSection />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white text-black">
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 sm:w-64 bg-white text-black">
          <Sidebar setActiveSection={setActiveSection} />
        </SheetContent>
      </Sheet>
      
      <div className="hidden sm:block">
        <Sidebar setActiveSection={setActiveSection} />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader toggleMobileMenu={toggleMobileMenu} />
        <main className="flex-1 overflow-y-auto p-4">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}