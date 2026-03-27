import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../../../lib/gsap';
import { useAnimReady } from '../../../context/AnimReadyContext';

const HERO_BG = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab6d83cbb46c5a59dea24b_Background%20Hero-min.avif';
const STAR_ICON = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab6f5c7f6ef175306f18bb_star-icon.png';
const GOOGLE_ICON = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab6f5c31e3e7b0a84252b6_google-icon.png';

export default function HeroSection() {
  const ready = useAnimReady();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLHeadingElement>(null);
  const word2Ref = useRef<HTMLHeadingElement>(null);
  const subtitlesRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLAnchorElement>(null);

  // Set initial hidden states immediately so elements are hidden behind loading screen
  useLayoutEffect(() => {
    gsap.set([word1Ref.current, word2Ref.current], { clipPath: 'inset(0 0 100% 0)', y: 60 });
    gsap.set([subtitlesRef.current, descRef.current, badgeRef.current], { opacity: 0, y: 24 });
    gsap.set(scrollHintRef.current, { opacity: 0 });
  }, []);

  // Run animations only after loading screen completes
  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to(word1Ref.current, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.1 }, 0.3)
        .to(word2Ref.current, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.1 }, 0.5)
        .to(subtitlesRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.9)
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.1)
        .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.3)
        .to(scrollHintRef.current, { opacity: 1, duration: 0.6 }, 1.6);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(bgRef.current, { scale: 1 + p * 0.18, y: p * 60 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full will-change-transform">
        <img
          src={HERO_BG}
          alt="Amrit Palace dining hall"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 md:px-14 lg:px-20 pb-14 md:pb-20 pt-32 w-full">
        {/* Hero headings */}
        <div className="mb-10 md:mb-14 overflow-hidden">
          <h1
            ref={word1Ref}
            className="font-serif text-white font-light leading-none uppercase will-change-transform"
            style={{ fontSize: 'clamp(4rem, 11vw, 13rem)', letterSpacing: '-0.02em' }}
          >
            Sorbos
          </h1>
          <div ref={subtitlesRef} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 mt-2 will-change-transform">
            <span className="text-white/60 text-[11px] tracking-[0.3em] uppercase italic hidden md:block">— Santiago, R.D.</span>
            <h1
              ref={word2Ref}
              className="font-serif text-white font-light leading-none uppercase will-change-transform"
              style={{ fontSize: 'clamp(4rem, 11vw, 13rem)', letterSpacing: '-0.02em' }}
            >
              &amp; Bocados
            </h1>
            <span className="text-white/60 text-[11px] tracking-[0.3em] uppercase italic hidden md:block">Cerros de Gurabo —</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p ref={descRef} className="text-white/75 text-sm leading-relaxed max-w-md will-change-transform">
            En Civetta transformamos tus mañanas con café de especialidad y le damos el cierre perfecto a tus tardes. Cada sorbo y cada bocado es una experiencia pensada para compartir y disfrutar donde vayas.
          </p>

          <div ref={badgeRef} className="flex-shrink-0 will-change-transform">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="w-4 h-4 flex items-center justify-center">
                    <img src={STAR_ICON} alt="star" className="w-4 h-4 object-contain" />
                  </span>
                ))}
              </div>
              <span className="w-5 h-5 flex items-center justify-center">
                <img src={GOOGLE_ICON} alt="Google" className="w-5 h-5 object-contain" />
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-white font-light" style={{ fontSize: '3.5rem', lineHeight: 1 }}>4.9</span>
              <span className="text-white/50 text-sm">/5</span>
              <div>
                <div className="text-white text-sm font-medium tracking-wide">Excelente</div>
                <div className="text-white/50 text-xs mt-0.5">Basado en 500+ reseñas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile captions */}
        <div className="flex gap-6 mt-6 md:hidden">
          <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Santiago, R.D.</span>
          <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Cerros de Gurabo</span>
        </div>
      </div>

      {/* Scroll hint */}
      <Link
        ref={scrollHintRef}
        to="/menu"
        className="absolute bottom-6 right-8 md:right-14 text-white/40 text-[10px] tracking-[0.25em] uppercase rotate-90 origin-right cursor-pointer hidden md:block will-change-transform"
      >
        Ver Menú
      </Link>
    </section>
  );
}
