import { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

interface AnimatedFrameProps {
  className?: string;
  inset?: number;
  color?: string;
}

/**
 * Decorative animated frame that draws itself around its parent container
 * as the user scrolls. The frame starts collapsed at the corners and
 * expands to full border lines, then the inset shifts creating a floating
 * frame effect identical to amritpalace.com
 */
export default function AnimatedFrame({
  className = '',
  inset = 16,
  color = 'rgba(255,255,255,0.3)',
}: AnimatedFrameProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = [topRef.current, bottomRef.current, leftRef.current, rightRef.current];

      // Initial state: lines collapsed to 0
      gsap.set(topRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(bottomRef.current, { scaleX: 0, transformOrigin: 'right center' });
      gsap.set(leftRef.current, { scaleY: 0, transformOrigin: 'center top' });
      gsap.set(rightRef.current, { scaleY: 0, transformOrigin: 'center bottom' });

      // Draw lines as scroll enters
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(topRef.current, { scaleX: p });
          gsap.set(bottomRef.current, { scaleX: p });
          gsap.set(leftRef.current, { scaleY: p });
          gsap.set(rightRef.current, { scaleY: p });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const lineStyle = (type: 'h' | 'v') =>
    type === 'h'
      ? { height: '1px', backgroundColor: color, position: 'absolute' as const, left: `${inset}px`, right: `${inset}px` }
      : { width: '1px', backgroundColor: color, position: 'absolute' as const, top: `${inset}px`, bottom: `${inset}px` };

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none z-20 ${className}`}>
      {/* Top */}
      <div
        ref={topRef}
        style={{ ...lineStyle('h'), top: `${inset}px` }}
      />
      {/* Bottom */}
      <div
        ref={bottomRef}
        style={{ ...lineStyle('h'), bottom: `${inset}px` }}
      />
      {/* Left */}
      <div
        ref={leftRef}
        style={{ ...lineStyle('v'), left: `${inset}px` }}
      />
      {/* Right */}
      <div
        ref={rightRef}
        style={{ ...lineStyle('v'), right: `${inset}px` }}
      />
    </div>
  );
}
