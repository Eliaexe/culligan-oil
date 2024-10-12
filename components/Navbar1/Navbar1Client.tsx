"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RxChevronDown, RxHamburgerMenu, RxCross1 } from "react-icons/rx";

interface ImageProps {
  url?: string;
  src: string;
  alt: string;
}

interface NavLink {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
  isButton?: boolean;
}

interface Navbar1Props {
  logo: ImageProps;
  navLinks: NavLink[];
  className?: string;
  theme?: {
    colors?: {
      background?: string;
      text?: string;
      muted?: string;
      primary?: string;
    };
    fonts?: {
      body?: string;
    };
  };
}

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const Navbar1Client: React.FC<Navbar1Props> = ({
  logo,
  navLinks,
  className,
  theme,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<number[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubMenu = (index: number) => {
    setOpenSubMenus(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <nav
      className={cn("fixed top-0 left-0 z-[999] flex min-h-16 w-full items-center border-b px-[5%] md:min-h-18", className)}
      style={{
        backgroundColor: theme?.colors?.background || '#0B0B0B',
        color: theme?.colors?.text || '#FDDD57',
        borderColor: theme?.colors?.muted || '#4C6D1C',
        fontFamily: theme?.fonts?.body,
      }}
    >
      <div className="mx-auto flex size-full max-w-full items-center justify-between">
      {logo.url ? (
          <Link href={logo.url} className="block h-8 w-auto">
            <Image 
              src={logo.src} 
              alt={logo.alt} 
              className="h-full w-auto object-contain" 
              width={300} 
              height={32}
              style={{ width: 'auto', height: '100%' }}
            />
          </Link>
        ) : (
          <div className="h-8 w-auto">
            <Image 
              src={logo.src} 
              alt={logo.alt} 
              className="h-full w-auto object-contain" 
              width={300} 
              height={32}
              style={{ width: 'auto', height: '100%' }}
            />
          </div>
        )}
        <AnimatePresence>
          {(isMobileMenuOpen || !isMobile) && (
            <motion.div
              initial={isMobile ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={isMobile ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className={cn(
                "absolute left-0 top-full w-full overflow-auto border-b px-[5%] pb-24 pt-4 md:pb-0",
                "lg:static lg:ml-auto lg:flex lg:h-auto lg:flex-row lg:items-center lg:justify-end lg:border-none lg:bg-none lg:px-0 lg:pt-0",
                { "block": isMobileMenuOpen || !isMobile }
              )}
              style={{
                backgroundColor: theme?.colors?.background || '#0B0B0B',
                borderColor: theme?.colors?.muted || '#4C6D1C',
              }}
            >
              <motion.div
                className="flex flex-col items-center lg:flex-row lg:mr-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {navLinks.map((navLink, index) => (
                  <motion.div key={index} variants={itemVariants} className="w-full lg:w-auto lg:relative lg:group">
                    {navLink.isButton ? (
                      <Button
                        key={index}
                        variant="default"
                        className="w-full lg:w-auto"
                        style={{
                          backgroundColor: theme?.colors?.primary || '#4C6D1C',
                          color: theme?.colors?.text || '#FDDD57',
                        }}
                      >
                        <Link href={navLink.url} className="block w-full h-full">
                          {navLink.title}
                        </Link>
                      </Button>
                    ) : navLink.subMenuLinks ? (
                      <div className="lg:flex lg:items-center">
                        <button
                          onClick={() => toggleSubMenu(index)}
                          className="flex w-full items-center justify-between py-3 text-md lg:inline-block lg:w-auto lg:px-4 lg:py-6 lg:text-base"
                          style={{ color: theme?.colors?.text || '#FDDD57' }}
                        >
                          <span className="flex items-center">
                            {navLink.title}
                            <RxChevronDown className={`ml-2 transition-transform duration-300 ${openSubMenus.includes(index) ? 'rotate-180' : ''}`} />
                          </span>
                        </button>
                        <AnimatePresence>
                          {openSubMenus.includes(index) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden lg:absolute lg:mt-2 lg:w-48 lg:rounded-md lg:shadow-lg"
                              style={{
                                backgroundColor: theme?.colors?.background || '#0B0B0B',
                                border: `1px solid ${theme?.colors?.muted || '#4C6D1C'}`,
                              }}
                            >
                              {navLink.subMenuLinks.map((subLink, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subLink.url}
                                  className="block px-4 py-2 text-sm hover:bg-background-hover"
                                  style={{ color: theme?.colors?.text || '#FDDD57' }}
                                >
                                  {subLink.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={navLink.url}
                        className="flex w-full items-center justify-between py-3 text-md lg:inline-block lg:w-auto lg:px-4 lg:py-6 lg:text-base"
                        style={{ color: theme?.colors?.text || '#FDDD57' }}
                      >
                        {navLink.title}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          className="lg:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <RxCross1 className="h-6 w-6" />
          ) : (
            <RxHamburgerMenu className="h-6 w-6" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar1Client;