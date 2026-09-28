import { ASSETS } from '../config';

const ART_ASPECT = ASSETS.islandSize.width / ASSETS.islandSize.height;

/**
 * A close look at one part of the supplied island render, nothing added.
 *
 * The same maths as the app's product page (apps/web/components/product/
 * ProductPage.tsx, Crop): `at` is the point of the artwork to put in the
 * middle, and the background position that achieves it is solved from
 * centre = p(1 - r) + r / 2, where r is the box's share of the scaled image.
 */
export default function Crop({
  at,
  zoom = 2.8,
  box,
  fill = false,
  className = '',
}: {
  at: readonly [number, number];
  zoom?: number;
  /** The box's own aspect, width over height. */
  box: number;
  /** Fill the parent's height instead of keeping the box's aspect. */
  fill?: boolean;
  className?: string;
}) {
  const place = (target: number, ratio: number) => {
    if (ratio >= 1) return 50;
    const p = (target - ratio / 2) / (1 - ratio);
    return Math.min(1, Math.max(0, p)) * 100;
  };
  const x = place(at[0], 1 / zoom);
  const y = place(at[1], ART_ASPECT / (zoom * box));

  return (
    <span
      role="img"
      aria-hidden="true"
      className={`aw-crop block ${className}`}
      style={{
        aspectRatio: fill ? undefined : String(box),
        backgroundImage: `url(${ASSETS.island})`,
        backgroundSize: `${zoom * 100}% auto`,
        backgroundPosition: `${x.toFixed(1)}% ${y.toFixed(1)}%`,
      }}
    />
  );
}
