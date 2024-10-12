"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { theme } from '@/lib/theme';

type LinkProps = {
  text: string;
  href: string;
};

type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
};

interface Footer3Props {
  logo: React.ReactNode;
  linkGroups: { title: string; links: LinkProps[] }[];
  socialLinks: SocialLinkProps[];
  copyright: string;
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

export const Footer3Client: React.FC<Footer3Props> = ({
  logo,
  linkGroups,
  socialLinks,
  copyright,
  className,
}) => {
  return (
    <motion.footer
      className={cn("w-full bg-background px-0 py-16 md:py-24 text-center", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      {/* Usando flex per il layout centrale */}
      <div className="flex flex-wrap justify-center items-start gap-8">
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          {logo}
        </motion.div>
        {linkGroups.map((group, index) => (
          <motion.div key={index} variants={itemVariants} className="flex flex-col items-center">
            <h3 className="mb-4 text-sm font-semibold" style={{ color: theme.colors.text }}>
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.href} className="text-sm hover:text-foreground" style={{ color: theme.colors.muted }}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Linea di separazione che attraversa l'intera larghezza */}
      <motion.div
        className="w-full border-t mt-16 pt-8"
        variants={itemVariants}
        style={{ borderColor: theme.colors.muted }}
      >
        <div className="flex flex-col items-center justify-between space-y-4 md:space-y-0 md:flex-row w-full text-center">
          {/* Rimuovi justify-between se desideri che tutti gli elementi siano completamente centrati */}

          <p className="text-sm text-center w-full" style={{ color: theme.colors.muted }}>
            {copyright}
          </p>

          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} className="hover:text-foreground" style={{ color: theme.colors.muted }}>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer3Client;
