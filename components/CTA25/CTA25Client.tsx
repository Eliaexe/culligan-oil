"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { theme } from '@/lib/theme';

interface CTA25Props {
  heading: string;
  description: string;
  buttons: {
    title: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  }[];
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const CTA25Client: React.FC<CTA25Props> = ({
  heading,
  description,
  buttons,
  className,
}) => {
  return (
    <motion.section
      className={cn("px-5 py-16 md:py-24 lg:py-28", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <div className="container mx-auto max-w-lg text-center">
        <motion.h2 
          className="mb-8 text-4xl font-bold md:mb-10 md:text-5xl lg:text-6xl"
          variants={itemVariants}
          style={{ 
            fontFamily: theme.fonts.heading, 
            color: '#FDDD57' // Colore dorato per l'intestazione
          }}
        >
          {heading}
        </motion.h2>
        <motion.p 
          className="mb-10 text-lg md:mb-12"
          variants={itemVariants}
          style={{ 
            color: '#FDDD57' // Colore dorato per la descrizione
          }}
        >
          {description}
        </motion.p>
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          variants={itemVariants}
        >
          {buttons.map((button, index) => (
            <Button 
              key={index} 
              variant={button.variant} 
              style={{ 
                color: '#FDDD57', // Colore del testo
                border: '2px solid #FDDD57', // Bordo dorato
              }}
            >
              {button.title}
            </Button>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTA25Client;
