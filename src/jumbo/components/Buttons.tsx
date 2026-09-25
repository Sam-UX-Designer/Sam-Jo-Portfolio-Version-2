import { ArrowRight } from 'lucide-react';
import { LINKS } from '../config';

const BASE =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[transform,background-color,border-color,color] duration-200 ease-out active:scale-[0.97]';

const SIZE = {
  md: 'h-12 px-6 text-[15px]',
  sm: 'h-11 px-4 text-sm',
};

export const primaryClass = (size: keyof typeof SIZE = 'md') =>
  `${BASE} ${SIZE[size]} bg-brand text-brand-ink hover:bg-brand-press`;

export const secondaryClass = (size: keyof typeof SIZE = 'md') =>
  `${BASE} ${SIZE[size]} border border-line-strong text-ink hover:bg-surface-2`;

/** The one primary action on the page. Its destination lives in config. */
export const GetJumbo: React.FC<{ size?: keyof typeof SIZE; className?: string }> = ({
  size = 'md',
  className = '',
}) => (
  <a
    href={LINKS.getJumbo}
    className={`${primaryClass(size)} group ${className}`}
  >
    Get JUMBO
    {size === 'md' && (
      <ArrowRight
        size={16}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      />
    )}
  </a>
);

export const HowItWorksLink: React.FC = () => (
  <a href="#how-it-works" className={secondaryClass()}>
    See how it works
  </a>
);
