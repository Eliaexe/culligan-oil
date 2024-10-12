"use client"

import { useState } from 'react';
import Sidebar from '@/components/profil/Sidebar';
import Overview from '@/components/dashboard/Overview';
import ProductsSection from '@/components/dashboard/ProductsSection';
import OrdersSection from '@/components/dashboard/OrdersSection';
import PersonalDataForm from '@/components/profil/PersonalInformations';
import ProfilHeader from '@/components/profil/ProfilHeader';
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('orders');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const renderSection = () => {
    switch (activeSection) {
      case 'orders':
        return <OrdersSection />;
      case 'customers':
        return <PersonalDataForm />
      default:
        return <OrdersSection />;
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
        <ProfilHeader />
        <main className="flex-1 overflow-y-auto p-4">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}