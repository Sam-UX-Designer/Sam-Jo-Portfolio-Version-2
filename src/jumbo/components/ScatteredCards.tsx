import { useRef } from 'react';
import { m, useInView, useReducedMotion } from 'motion/react';
import { SCATTER_CARDS } from '../config';
import { EASE } from './Motion';

/**
 * Five real JUMBO cards, each floating on its own: separate pieces of one
 * person's health, not yet one picture.
 *
 * On arrival they drift in from further apart; after that each one floats at
 * its own pace. Everything is still under reduced motion.
 */
const ScatteredCards: React.FC<{ className?: string }> = ({ className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Separate JUMBO cards: ${SCATTER_CARDS.map((c) => c.alt).join('; ')}`}
      className={`jb-frame relative overflow-hidden rounded-[22px] ${className}`}
      style={{ aspectRatio: '4 / 3' }}
    >
      {SCATTER_CARDS.map((card, i) => {
        // Start further out from the centre of the frame than where they rest.
        const fromX = (card.left + card.size / 2 - 50) * 2.4;
        const fromY = (card.top + 12 - 50) * 2.4;
        const rest = { opacity: 1, x: 0, y: 0, rotate: card.rotate, scale: 1 };
        return (
          <m.div
            key={card.src}
            className="absolute"
            style={{ left: `${card.left}%`, top: `${card.top}%`, width: `${card.size}%` }}
            initial={reduce ? rest : { opacity: 0, x: fromX, y: fromY, rotate: card.rotate * 2.5, scale: 0.92 }}
            animate={reduce || inView ? rest : undefined}
            transition={{ duration: 1.1, delay: 0.1 + i * 0.09, ease: EASE }}
          >
            <div
              className="jb-float jb-loop"
              style={{ animationDuration: `${5.5 + (i % 3) * 0.9}s`, animationDelay: `${-i * 1.4}s` }}
            >
              <img
                src={card.src}
                alt=""
                width={card.width}
                height={card.height}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)]"
              />
            </div>
          </m.div>
        );
      })}
    </div>
  );
};

export default ScatteredCards;
