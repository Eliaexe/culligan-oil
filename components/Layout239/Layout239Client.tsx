"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { theme } from '@/lib/theme';

interface Feature {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface Layout239Props {
  tagline: string;
  heading: string;
  description: string;
  features: Feature[];
  buttons: {
    title: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    url: string;
  }[];
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const Layout239Client: React.FC<Layout239Props> = ({
  tagline,
  heading,
  description,
  features,
  buttons,
  className,
}) => {
  return (
    <motion.section
      className={cn("py-16 px-5 md:py-24 lg:py-28", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        backgroundColor: theme.colors.background || '#0B0B0B', // Colore di sfondo
      }}
    >
      <div className="container mx-auto max-w-6xl text-center">
        <motion.p
          className="text-sm uppercase tracking-wide mb-2"
          variants={itemVariants}
          style={{ color: theme.colors.primary || '#4C6D1C' }} // Colore del tagline
        >
          {tagline}
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          variants={itemVariants}
          style={{ fontFamily: theme.fonts.heading }}
        >
          <span style={{ color: theme.colors.text || '#FDDD57' }}>{heading}</span> {/* Colore del heading */}
        </motion.h2>
        <motion.p
          className="text-lg mb-12 max-w-3xl mx-auto"
          variants={itemVariants}
          style={{ color: theme.colors.muted || '#FDDD57' }} // Colore della descrizione
        >
          {description}
        </motion.p>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" variants={containerVariants}>
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </motion.div>
        <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant}
              className={cn({
                'bg-primary text-black': button.variant === 'default',
                'bg-secondary text-black': button.variant === 'secondary',
                'bg-transparent border border-primary text-primary': button.variant === 'outline',
                'text-muted': button.variant === 'ghost',
              })}
              style={{
                backgroundColor: button.variant === 'default' ? theme.colors.primary || '#4C6D1C' : undefined,
                color: theme.colors.text || '#FDDD57', // Colore del testo del pulsante
              }}
            >
              {button.title}
              {button.variant === 'default' && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => (
  <motion.div
    className="flex flex-col"
    variants={itemVariants}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="mb-4 aspect-[2/1] relative">
      <Image
        src={feature.imageUrl}
        alt={feature.title}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-lg"
      />
    </div>
    <h3
      className="text-xl font-semibold mb-2"
      style={{
        fontFamily: theme.fonts.heading,
        color: theme.colors.text || '#FDDD57' // Colore del titolo della feature
      }}
    >
      {feature.title}
    </h3>
    <p style={{ color: theme.colors.muted || '#FDDD57' }}>{feature.description}</p>
  </motion.div>
);

export default Layout239Client;
