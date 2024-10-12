import React from 'react';
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

export const CTA25Server: React.FC<CTA25Props> = ({
  heading,
  description,
  buttons,
  className,
}) => {
  return (
    <section className={cn("px-5 py-16 md:py-24 lg:py-28", className)} style={{
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
    }}>
      <div className="container mx-auto max-w-lg text-center">
        <h2 className="mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl" style={{ fontFamily: theme.fonts.heading }}>
          {heading}
        </h2>
        <p className="mb-6 text-lg md:mb-8" style={{ color: theme.colors.muted }}>
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {buttons.map((button, index) => (
            <Button key={index} variant={button.variant}>
              {button.title}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTA25Server;