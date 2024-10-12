import React from 'react';
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
  }[];
  className?: string;
}

export const Layout239Server: React.FC<Layout239Props> = ({
  tagline,
  heading,
  description,
  features,
  buttons,
  className,
}) => {
  return (
    <section className={cn("py-16 px-4 md:px-8", className)} style={{
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
    }}>
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm uppercase tracking-wide mb-2" style={{ color: theme.colors.primary }}>{tagline}</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: theme.fonts.heading }}>
          {heading}
        </h2>
        <p className="text-lg mb-12 max-w-3xl mx-auto" style={{ color: theme.colors.muted }}>
          {description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
        <div className="flex justify-center gap-4">
          {buttons.map((button, index) => (
            <Button key={index} variant={button.variant}>
              {button.title}
              {button.variant === 'default' && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => (
  <div className="flex flex-col">
    <div className="mb-4 aspect-[2/1] relative">
      <Image
        src={feature.imageUrl}
        alt={feature.title}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
        style={{ borderRadius: theme.borderRadius.md }}
      />
    </div>
    <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: theme.fonts.heading }}>{feature.title}</h3>
    <p style={{ color: theme.colors.muted }}>{feature.description}</p>
  </div>
);

export default Layout239Server;