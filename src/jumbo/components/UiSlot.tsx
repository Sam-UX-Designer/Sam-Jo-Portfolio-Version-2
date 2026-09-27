import { useEffect, useRef, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { SHAPE_RATIO, type UiAsset } from '../config';

type Status = 'loading' | 'loaded' | 'missing';

const RADIUS: Record<UiAsset['shape'], string> = {
  phone: 'rounded-[36px]',
  wide: 'rounded-[22px]',
  landscape: 'rounded-[22px]',
  portrait: 'rounded-[22px]',
};

interface UiSlotProps {
  asset: UiAsset;
  /** Above-the-fold images load immediately; everything else is lazy. */
  priority?: boolean;
  /** No frame, border or shadow: the image sits directly on the page. */
  bare?: boolean;
  className?: string;
}

/**
 * A fixed-shape frame for one JUMBO screenshot.
 *
 * The frame's aspect ratio comes from config, so the layout never moves when
 * a file is added or replaced. The image is fitted with object-contain, so a
 * screenshot is never stretched or cropped. Until the file exists, a neutral
 * placeholder fills the frame instead of a broken image.
 *
 * While the file loads the frame shimmers. The first time it is on screen the
 * screenshot wipes in from the top, and framed screens get one soft light
 * sweep (see .jb-shot and .jb-sheen in jumbo.css). The picture itself is
 * never altered.
 */
const UiSlot: React.FC<UiSlotProps> = ({ asset, priority = false, bare = false, className = '' }) => {
  const [status, setStatus] = useState<Status>('loading');
  const [seen, setSeen] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  // An image served from cache can finish before React attaches onLoad.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? 'loaded' : 'missing');
  }, []);

  // Load in the first time the frame is on screen, not before.
  useEffect(() => {
    const node = frameRef.current;
    if (seen || !node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [seen]);

  const missing = status === 'missing';
  const shown = status === 'loaded' && seen;

  return (
    <div
      ref={frameRef}
      data-shown={shown || undefined}
      className={`relative overflow-hidden ${bare ? '' : 'jb-frame jb-sheen'} ${RADIUS[asset.shape]} ${className}`}
      style={{ aspectRatio: SHAPE_RATIO[asset.shape] }}
    >
      {!shown && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center ${
            missing ? 'jb-placeholder' : bare ? '' : 'jb-placeholder jb-skeleton'
          }`}
          {...(missing ? { role: 'img', 'aria-label': asset.alt } : { 'aria-hidden': true })}
        >
          {missing && (
            <>
              <span className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink-3">
                <ImageIcon size={18} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-ink-2">{asset.label}</span>
              <span className="max-w-full break-words text-xs text-ink-3">
                {import.meta.env.DEV ? asset.src : 'Screenshot coming soon'}
              </span>
            </>
          )}
        </div>
      )}

      {!missing && (
        <img
          ref={imgRef}
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('missing')}
          className="jb-shot absolute inset-0 h-full w-full object-contain"
        />
      )}
    </div>
  );
};

export default UiSlot;
