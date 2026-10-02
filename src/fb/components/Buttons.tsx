import { ArrowUpRight, CodeXml } from 'lucide-react';
import { LINKS } from '../config';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,transform] duration-200 active:scale-[0.98]';
const SIZE = { md: 'h-12 px-6 text-[15px]', sm: 'h-10 px-4 text-sm' };

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** The primary action everywhere on the page: open the live app. */
export function TryDemo({ size = 'md', label = 'Try the live demo' }: { size?: 'md' | 'sm'; label?: string }) {
  return (
    <a href={LINKS.demo} {...external} className={`${BASE} ${SIZE[size]} group bg-btn text-btn-ink hover:bg-btn-press`}>
      {label}
      <ArrowUpRight
        size={size === 'md' ? 17 : 15}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function ViewCode() {
  return (
    <a href={LINKS.code} {...external} className={`${BASE} ${SIZE.md} bg-muted text-ink hover:bg-muted-hover`}>
      <CodeXml size={17} aria-hidden="true" />
      View the code
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
