import React from 'react';
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
  description: string;
  linkGroups: { title: string; links: LinkProps[] }[];
  socialLinks: SocialLinkProps[];
  copyright: string;
  className?: string;
}

export const Footer3Server: React.FC<Footer3Props> = ({
  logo,
  description,
  linkGroups,
  socialLinks,
  copyright,
  className,
}) => {
  return (
    <footer className={cn("bg-background px-5 py-16 md:py-24", className)} style={{
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
    }}>
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            {logo}
            <p className="mt-4 text-sm" style={{ color: theme.colors.muted }}>{description}</p>
          </div>
          {linkGroups.map((group, index) => (
            <div key={index}>
              <h3 className="mb-4 text-sm font-semibold" style={{ color: theme.colors.text }}>{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-sm hover:text-foreground" style={{ color: theme.colors.muted }}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center justify-between border-t pt-8 md:flex-row" style={{ borderColor: theme.colors.muted }}>
          <p className="mb-4 text-sm md:mb-0" style={{ color: theme.colors.muted }}>{copyright}</p>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} className="hover:text-foreground" style={{ color: theme.colors.muted }}>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer3Server;