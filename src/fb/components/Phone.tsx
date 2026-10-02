import { SCREENS, screenSrc, type ScreenId } from '../config';

interface PhoneProps {
  screen: ScreenId;
  /** Show one theme whatever the page theme (the hero shows both side by side). */
  theme?: 'light' | 'dark';
  /** Above the fold: load now. Everything else loads as it nears the screen. */
  eager?: boolean;
  className?: string;
  /** Drawn over the screen, in the screen's own coordinates. */
  children?: React.ReactNode;
}

/**
 * A real screen in a thin-bezel phone. By default it follows the page theme:
 * the light and dark captures are both in the markup, and only the visible
 * one is ever downloaded.
 */
export default function Phone({ screen, theme, eager = false, className = '', children }: PhoneProps) {
  const alt = SCREENS[screen];
  const img = (t: 'light' | 'dark', cls: string) => (
    <img
      key={t}
      src={screenSrc(screen, t)}
      alt={alt}
      width={780}
      height={1688}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={cls}
    />
  );

  return (
    <div className={`fb-phone ${className}`}>
      <div className="fb-phone__frame">
        <div className="fb-phone__screen">
          {theme ? img(theme, '') : [img('light', 'fb-light-only'), img('dark', 'fb-dark-only')]}
          {children}
        </div>
      </div>
    </div>
  );
}
