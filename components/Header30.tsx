import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';

type ImageProps = {
  src: string;
  alt?: string;
};

type ButtonProps = {
  title: string;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
  theme?: {
    colors?: {
      primary?: string;
      secondary?: string;
    };
  };
};

export type Header30Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header30 = (props: Header30Props) => {
  const { heading, description, buttons, image, theme } = {
    ...Header30Defaults,
    ...props,
  } as Props;

  return (
    <section
      id="header"
      className="relative flex items-center justify-center px-[5%] py-16 md:py-24 lg:py-28 min-h-screen"
    >
      <div className="absolute inset-0">
        <img src={image.src} className="h-full w-full object-cover" alt={image.alt} />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-5 text-6xl font-bold" style={{ color: theme?.colors?.primary || '#FDDD57' }}>
            {heading}
          </h1>
          <p className="text-base" style={{ color: theme?.colors?.secondary || '#FDDD57' }}>
            {description}
          </p>
          <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
            {buttons.map((button, index) => (
              <Button key={index} variant={button.variant} style={{ backgroundColor: theme?.colors?.primary || '#4C6D1C', color: '#FDDD57' }}>
                {button.title}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Header30Defaults: Header30Props = {
  heading: "Medium length hero heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttons: [{ title: "Button" }, { title: "Button", variant: "secondary" }],
  image: {
    src: "header.jpg", // header.jpg in the public folder
    alt: "Header background image",
  },
};
