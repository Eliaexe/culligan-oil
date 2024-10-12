import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RxChevronDown } from "react-icons/rx";
import { theme } from '@/lib/theme';

interface ImageProps {
  url?: string;
  src: string;
  alt?: string;
}

interface NavLink {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
}

interface Navbar1Props {
  logo: ImageProps;
  navLinks: NavLink[];
  buttons: {
    title: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  }[];
  className?: string;
}

export const Navbar1Server: React.FC<Navbar1Props> = ({
  logo,
  navLinks,
  buttons,
  className,
}) => {
  return (
    <nav 
      className={cn("relative z-[999] flex min-h-16 w-full items-center border-b px-[5%] md:min-h-18", className)}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        borderColor: theme.colors.muted,
      }}
    >
    </nav>
  );
};

export default Navbar1Server;