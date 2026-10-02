import { useRef, useState } from 'react';
import { ART } from '../config';

interface MascotProps {
  size: number;
  /** Float, blink and the occasional happy shake. Off: the still artwork. */
  animated?: boolean;
  /** Tapping (or hovering) makes it give a happy shake right away. */
  interactive?: boolean;
  /** Offsets the loop so two mascots on screen don't move in lockstep. */
  delay?: number;
  className?: string;
  label?: string;
}

/**
 * The Finance Buddy mascot, rebuilt from the app's own component
 * (apps/mobile/src/ui/SIOrb.tsx): the body artwork with its eyes and smile
 * drawn on top, so it can float, blink and smile. Under Reduce Motion the CSS
 * keeps it still.
 */
export default function Mascot({ size, animated = true, interactive = false, delay = 0, className = '', label }: MascotProps) {
  const [happy, setHappy] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const cheer = () => {
    window.clearTimeout(timer.current);
    setHappy(false);
    // Next frame, so a second tap restarts the shake.
    requestAnimationFrame(() => setHappy(true));
    timer.current = window.setTimeout(() => setHappy(false), 900);
  };

  const face = (
    <span
      className={`fb-mascot ${className}`}
      style={{ width: size, height: size, ['--fb-delay' as string]: `${delay}s` }}
      data-animated={animated || undefined}
      data-happy={happy || undefined}
      {...(interactive ? {} : label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      <span className="fb-mascot__bob">
        <span className="fb-mascot__wiggle">
          <img src={ART.mascotBody} alt="" width={size} height={size} className="fb-mascot__body" draggable={false} />
          <span className="fb-mascot__eye fb-mascot__eye--l" />
          <span className="fb-mascot__eye fb-mascot__eye--r" />
          <svg className="fb-mascot__smile" viewBox="371 662 403 153" aria-hidden="true">
            <path d="M 415,706 C 466,792 679,792 730,706" stroke="#FFFFFF" strokeWidth={87} strokeLinecap="round" fill="none" />
          </svg>
        </span>
      </span>
    </span>
  );

  if (!interactive) return face;

  return (
    <button
      type="button"
      onClick={cheer}
      onPointerEnter={(e) => e.pointerType === 'mouse' && cheer()}
      aria-label={label ?? 'Say hello to the Finance Buddy mascot'}
      className="rounded-full transition-transform duration-200 active:scale-[0.97]"
    >
      {face}
    </button>
  );
}
