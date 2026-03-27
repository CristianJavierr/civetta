import { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../../../lib/gsap';
import { useAnimReady } from '../../../context/AnimReadyContext';

const FULLSIZE_BG = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ac5358491181ca69dbe1f5_fullsize-min.avif';

export default function FullsizeSection() {
  const ready = useAnimReady();
  const sectionRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Frame lines refs
  const frameTopRef = useRef<HTMLDivElement>(null);
  const frameBottomRef = useRef<HTMLDivElement>(null);
  const frameLeftRef = useRef<HTMLDivElement>(null);
  const frameRightRef = useRef<HTMLDivElement>(null);

  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      // ── BG IMAGE PARALLAX ZOOM (scrub) ──
      // Image starts zoomed in, releases as scroll progresses
      gsap.set(bgImgRef.current, { scale: 1.18 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.8,
        onUpdate: (self) => {
          const scale = 1.18 - self.progress * 0.18;
          const y = (self.progress - 0.5) * 80;
          gsap.set(bgImgRef.current, { scale, y });
        },
      });

      // ── OVERLAY DARKENS SLIGHTLY AS ENTERS VIEW ──
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'center center',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(overlayRef.current, { opacity: 0.4 + self.progress * 0.15 });
        },
      });

      // ── DECORATIVE FRAME: Lines draw in with scroll (scrub) ──
      // Top & Bottom: scaleX from 0 → 1
      // Left & Right: scaleY from 0 → 1
      gsap.set(frameTopRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(frameBottomRef.current, { scaleX: 0, transformOrigin: 'right center' });
      gsap.set(frameLeftRef.current, { scaleY: 0, transformOrigin: 'center top' });
      gsap.set(frameRightRef.current, { scaleY: 0, transformOrigin: 'center bottom' });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'center center',
        scrub: 1.5,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(frameTopRef.current, { scaleX: p });
          gsap.set(frameBottomRef.current, { scaleX: p });
          gsap.set(frameLeftRef.current, { scaleY: p });
          gsap.set(frameRightRef.current, { scaleY: p });
        },
      });

      // ── FRAME INSET CHANGES WITH SCROLL (floating frame illusion) ──
      // As scroll progresses past center, frame lines shift inward slightly
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'center center',
        end: 'bottom top',
        scrub: 2,
        onUpdate: (self) => {
          const inset = 24 + self.progress * 16;
          const px = `${inset}px`;
          if (frameTopRef.current) {
            frameTopRef.current.style.top = px;
            frameTopRef.current.style.left = px;
            frameTopRef.current.style.right = px;
          }
          if (frameBottomRef.current) {
            frameBottomRef.current.style.bottom = px;
            frameBottomRef.current.style.left = px;
            frameBottomRef.current.style.right = px;
          }
          if (frameLeftRef.current) {
            frameLeftRef.current.style.left = px;
            frameLeftRef.current.style.top = px;
            frameLeftRef.current.style.bottom = px;
          }
          if (frameRightRef.current) {
            frameRightRef.current.style.right = px;
            frameRightRef.current.style.top = px;
            frameRightRef.current.style.bottom = px;
          }
        },
      });

      // ── TEXT REVEAL (scrub) ──
      gsap.set([word1Ref.current, word2Ref.current], { clipPath: 'inset(0 0 100% 0)', y: 70 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'top 10%',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = Math.min(self.progress * 2, 1); // fast reveal in first half
          const clipVal = `inset(0 0 ${100 - p * 100}% 0)`;
          const yVal = 70 - p * 70;
          gsap.set(word1Ref.current, { clipPath: clipVal, y: yVal });
        },
      });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 55%',
        end: 'top 5%',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = Math.min(self.progress * 2, 1);
          const clipVal = `inset(0 0 ${100 - p * 100}% 0)`;
          const yVal = 70 - p * 70;
          gsap.set(word2Ref.current, { clipPath: clipVal, y: yVal });
        },
      });

      gsap.set(textRef.current, { opacity: 0, y: 30 });
      gsap.to(textRef.current, {
        opacity: 1, y: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[600px] md:min-h-[700px] flex flex-col items-start justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          ref={bgImgRef}
          src={FULLSIZE_BG}
          alt="Amrit Palace restaurant hall"
          className="w-full h-full object-cover object-top will-change-transform"
        />
        <div ref={overlayRef} className="absolute inset-0 bg-black" style={{ opacity: 0.4 }}></div>
      </div>

      {/* Decorative frame lines (draw in with scroll) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Top */}
        <div
          ref={frameTopRef}
          className="absolute will-change-transform"
          style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.25)', top: '24px', left: '24px', right: '24px' }}
        />
        {/* Bottom */}
        <div
          ref={frameBottomRef}
          className="absolute will-change-transform"
          style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.25)', bottom: '24px', left: '24px', right: '24px' }}
        />
        {/* Left */}
        <div
          ref={frameLeftRef}
          className="absolute will-change-transform"
          style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.25)', left: '24px', top: '24px', bottom: '24px' }}
        />
        {/* Right */}
        <div
          ref={frameRightRef}
          className="absolute will-change-transform"
          style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.25)', right: '24px', top: '24px', bottom: '24px' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-10 md:px-20 lg:px-28 py-20 max-w-4xl overflow-hidden">
        <h2
          className="font-serif text-cream font-light leading-none uppercase mb-10"
          style={{ fontSize: 'clamp(3rem, 7vw, 8rem)', letterSpacing: '-0.02em' }}
        >
          <span ref={word1Ref} className="block will-change-transform">Arraigados en</span>
          <span ref={word2Ref} className="block will-change-transform">el Momento</span>
        </h2>
        <p ref={textRef} className="text-cream/65 text-sm leading-loose max-w-lg will-change-transform">
          Civetta nació de una pasión por los buenos momentos. Desde el primer café de la mañana hasta el último cóctel de la tarde, cada rincón de nuestro espacio en los Cerros de Gurabo está diseñado para que te sientas en casa. Creemos que los mejores momentos son los que se comparten — sobre una buena taza, un bocado memorable y buena compañía.
        </p>
      </div>
    </section>
  );
}
