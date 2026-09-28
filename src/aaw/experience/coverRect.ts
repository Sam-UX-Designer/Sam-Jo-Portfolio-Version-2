import { useEffect, useState, type RefObject } from 'react';

/**
 * Where a cover-fitted image lands, measured against the hero stage.
 *
 * The app's own maths (apps/web/lib/coverRect.ts), with one change: the app
 * fills the window, so it measures the window; here the product fills the
 * hero stage, so it measures that. Stations are anchored to the artwork
 * rather than the box, so each one stays on its building at every size.
 */

export interface CoverRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function useCoverRect(stage: RefObject<HTMLElement | null>, imageAspect: number): CoverRect {
  const [rect, setRect] = useState<CoverRect>({ left: 0, top: 0, width: 0, height: 0 });

  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    const measure = () => {
      const vw = el.clientWidth;
      const vh = el.clientHeight;
      if (!vw || !vh) return;
      const coverWidth = Math.max(vw, vh * imageAspect);
      // The app draws the island 1.22x larger than cover on a phone so it can
      // pan up and down too. Vertical panning is off on this page (a vertical
      // swipe scrolls the page), so the extra zoom would only hide more of the
      // island: cover, exactly, at every size. Whole pixels, so the robot
      // patches land on the same grid as the art.
      const width = Math.round(coverWidth);
      const height = Math.round(coverWidth / imageAspect);
      setRect({
        left: Math.round((vw - width) / 2),
        top: Math.round((vh - height) / 2),
        width,
        height,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [stage, imageAspect]);

  return rect;
}

export function pointOn(rect: CoverRect, fraction: readonly [number, number]) {
  return {
    left: rect.left + fraction[0] * rect.width,
    top: rect.top + fraction[1] * rect.height,
  };
}
