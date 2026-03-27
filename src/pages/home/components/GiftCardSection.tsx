import { useRef, useLayoutEffect } from 'react';
import { gsap } from '../../../lib/gsap';
import AnimatedFrame from '../../../components/feature/AnimatedFrame';
import { useAnimReady } from '../../../context/AnimReadyContext';

export default function GiftCardSection() {
  const ready = useAnimReady();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { clipPath: 'inset(0 0 100% 0)', y: 60 });
      gsap.to(titleRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      gsap.set([descRef.current, btnRef.current], { opacity: 0, y: 24 });
      gsap.to([descRef.current, btnRef.current], {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: descRef.current, start: 'top 88%', toggleActions: 'play none none none' },
      });

      gsap.set(boxRef.current, { opacity: 0, y: 40 });
      gsap.to(boxRef.current, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: boxRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      gsap.set(visualRef.current, { opacity: 0, scale: 0.92 });
      gsap.to(visualRef.current, {
        opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: visualRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={sectionRef} className="w-full bg-cream py-24 md:py-32 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-serif font-light text-charcoal uppercase leading-none text-center mb-8 will-change-transform"
          style={{ fontSize: 'clamp(3rem, 7vw, 8rem)', letterSpacing: '-0.02em' }}
        >
          Trae a alguien<br />especial
        </h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
          <p ref={descRef} className="text-charcoal/60 text-sm leading-relaxed max-w-md will-change-transform">
            Algunos momentos piden compañía. Reserva una mesa para dos y convierte una noche cualquiera en un recuerdo que valga la pena.
          </p>
          <a
            ref={btnRef}
            href="https://wa.me/18097106646"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-charcoal text-cream text-[11px] tracking-[0.2em] uppercase px-8 py-4 hover:bg-charcoal/80 transition-colors cursor-pointer whitespace-nowrap self-start md:self-auto will-change-transform"
          >
            <i className="ri-whatsapp-line text-sm"></i>
            Reservar por WhatsApp
          </a>
        </div>

        {/* Bordered box */}
        <div ref={boxRef} className="relative border border-charcoal/15 p-10 md:p-14 will-change-transform">
          <AnimatedFrame inset={8} color="rgba(66,65,53,0.10)" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div className="flex flex-col gap-4">
              <p className="font-serif text-charcoal/30 leading-none uppercase" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.8rem)' }}>
                Porque hay personas
              </p>
              <p className="font-serif text-charcoal leading-none uppercase" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.8rem)' }}>
                que merecen una mesa especial.
              </p>
            </div>

            {/* Visual: mesa para dos */}
            <div ref={visualRef} className="flex-shrink-0 will-change-transform">
              <div
                className="w-72 h-44 relative overflow-hidden flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #424135 0%, #524f40 50%, #424135 100%)' }}
              >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 40%, #c49060 0%, transparent 65%)' }}></div>
                {/* Two wine glasses icon */}
                <div className="flex flex-col items-center gap-3 relative z-10">
                  <div className="flex items-end gap-6">
                    <svg viewBox="0 0 40 80" width="32" height="64" fill="none" stroke="#dfd3be" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                      <path d="M8 4 Q4 20 4 30 Q4 42 20 44 Q36 42 36 30 Q36 20 32 4 Z" />
                      <line x1="20" y1="44" x2="20" y2="68" />
                      <line x1="10" y1="68" x2="30" y2="68" />
                    </svg>
                    <svg viewBox="0 0 40 80" width="32" height="64" fill="none" stroke="#dfd3be" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                      <path d="M8 4 Q4 20 4 30 Q4 42 20 44 Q36 42 36 30 Q36 20 32 4 Z" />
                      <line x1="20" y1="44" x2="20" y2="68" />
                      <line x1="10" y1="68" x2="30" y2="68" />
                    </svg>
                  </div>
                  <div className="text-cream/40 text-[9px] tracking-[0.3em] uppercase mt-1">Civetta</div>
                </div>
                <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full border border-cream/5"></div>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full border border-cream/8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
