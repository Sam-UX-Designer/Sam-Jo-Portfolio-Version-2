import { useEffect, useState, type RefObject } from 'react';

/**
 * Where the island lands in the hero stage.
 *
 * The app's own cover maths (apps/web/lib/coverRect.ts), measured against the
 * stage instead of the window. Stations are anchored to the artwork rather
 * than the box, so each one stays on its building at every size.
 *
 * One addition for the page: the hero's headline sits over the top of the
 * island. Given where that text ends (`clear`) and where the command bar
 * starts, the island is zoomed and moved just enough that the top row of
 * station cards starts below the text while the bottom row stays above the
 * command bar. Where both cannot be true (a short laptop screen, a phone),
 * it does what it can and reports how far the text reaches, so the stations
 * still under it can step back until the visitor starts.
 */

export interface CoverRect {
  left: number;
  top: number;
  width: number;
  height: number;
  /** How far down the stage the hero text reaches, in px. 0 without text. */
  clearTop: number;
}

/** Where the stations sit, as fractions of the artwork's height. */
export interface StationBand {
  top: number;
  bottom: number;
}

/** A station card's top, above its station: the card lift plus its height. */
export const CARD_ABOVE = 76;
/** A station card's bottom, above its station. */
const CARD_BELOW = 30;
/**
 * Never zoom further than this. The island is the picture: past about a
 * third larger, too much of it leaves the screen, and a station the text
 * still covers steps back instead (see Markers).
 */
const MAX_ZOOM = 1.3;
/** Phones keep the app's framing; the text steps aside there instead. */
const PHONE_WIDTH = 900;

export function useCoverRect(
  stage: RefObject<HTMLElement | null>,
  imageAspect: number,
  band: StationBand,
  clear?: RefObject<HTMLElement | null>,
): CoverRect {
  const [rect, setRect] = useState<CoverRect>({ left: 0, top: 0, width: 0, height: 0, clearTop: 0 });

  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    const measure = () => {
      const vw = el.clientWidth;
      const vh = el.clientHeight;
      if (!vw || !vh) return;

      // Cover, exactly. The app draws a phone's island 1.22x larger so it can
      // pan up and down; vertical panning is off on this page (a vertical
      // swipe scrolls the page), so that zoom would only hide island.
      const coverH = Math.max(vw, vh * imageAspect) / imageAspect;
      let height = coverH;
      let top = (vh - coverH) / 2;

      const text = clear?.current;
      const clearTop = text ? text.offsetTop + text.offsetHeight + 8 : 0;

      if (clearTop > 0) {
        const command = el.querySelector('.command');
        const floor = command
          ? command.getBoundingClientRect().top - el.getBoundingClientRect().top - 10
          : vh - 160;
        const zoom = vw > PHONE_WIDTH ? MAX_ZOOM : 1;
        const need = (clearTop + CARD_ABOVE) / band.top;
        const room = (floor + CARD_BELOW) / band.bottom;
        height = Math.min(Math.max(coverH, Math.min(need, Math.max(coverH, room))), coverH * zoom);
        // As high as the text allows, never leaving a gap above or below.
        top = Math.min(0, Math.max(vh - height, clearTop + CARD_ABOVE - band.top * height));
      }

      // Whole pixels, so the robot patches land on the same grid as the art.
      const width = Math.round(height * imageAspect);
      height = Math.round(height);
      setRect({
        left: Math.round((vw - width) / 2),
        top: Math.round(top),
        width,
        height,
        clearTop,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (clear?.current) ro.observe(clear.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [stage, imageAspect, band.top, band.bottom, clear]);

  return rect;
}

export function pointOn(rect: CoverRect, fraction: readonly [number, number]) {
  return {
    left: rect.left + fraction[0] * rect.width,
    top: rect.top + fraction[1] * rect.height,
  };
}
