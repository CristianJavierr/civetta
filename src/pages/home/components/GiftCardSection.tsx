import { useRef, useLayoutEffect } from 'react';
import { gsap } from '../../../lib/gsap';
import AnimatedFrame from '../../../components/feature/AnimatedFrame';

export default function GiftCardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title big reveal
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

      // Box: fade + scale
      gsap.set(boxRef.current, { opacity: 0, y: 40 });
      gsap.to(boxRef.current, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: boxRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      // Gift card: scale + rotate in
      gsap.set(cardRef.current, { opacity: 0, scale: 0.85, rotationY: -20 });
      gsap.to(cardRef.current, {
        opacity: 1, scale: 1, rotationY: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-cream py-24 md:py-32 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Main heading */}
        <h2
          ref={titleRef}
          className="font-serif font-light text-charcoal uppercase leading-none text-center mb-8 will-change-transform"
          style={{ fontSize: 'clamp(3rem, 7vw, 8rem)', letterSpacing: '-0.02em' }}
        >
          Regala una<br />Experiencia
        </h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
          <p ref={descRef} className="text-charcoal/60 text-sm leading-relaxed max-w-md will-change-transform">
            Dale a alguien especial el regalo de vivir Civetta. Un sorbo, un bocado, un momento único pensado para compartir y recordar.
          </p>
          <a
            ref={btnRef}
            href="https://wa.me/18097106646"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-charcoal text-cream text-[11px] tracking-[0.2em] uppercase px-8 py-4 hover:bg-charcoal/80 transition-colors cursor-pointer whitespace-nowrap self-start md:self-auto will-change-transform"
          >
            <i className="ri-whatsapp-line text-sm"></i>
            Consultar por WhatsApp
          </a>
        </div>

        {/* Bordered box */}
        <div ref={boxRef} className="relative border border-charcoal/15 p-10 md:p-14 will-change-transform">
          <AnimatedFrame inset={8} color="rgba(66,65,53,0.10)" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div className="flex flex-col gap-4">
              <p className="font-serif text-charcoal/30 leading-none uppercase" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.8rem)' }}>
                Comparte la experiencia.
              </p>
              <p className="font-serif text-charcoal leading-none uppercase" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.8rem)' }}>
                Regala sabores que recordarán.
              </p>
            </div>

            {/* Gift card visual */}
            <div ref={cardRef} className="flex-shrink-0 will-change-transform" style={{ perspective: '800px' }}>
              <div
                className="w-72 h-44 rounded-sm relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #424135 0%, #524f40 50%, #424135 100%)' }}
              >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #c49060 0%, transparent 60%)' }}></div>
                <div className="absolute top-5 left-6">
                  <div className="text-cream/30 text-[9px] tracking-[0.3em] uppercase mb-1">Gift Card</div>
                  <div className="font-serif text-cream text-xl font-light tracking-wider uppercase">Civetta</div>
                </div>
                <div className="absolute bottom-5 left-6 right-6">
                  <div className="w-full h-px bg-cream/10 mb-4"></div>
                  <div className="flex justify-between items-end">
                    <div className="text-cream/40 text-[9px] tracking-wider uppercase">Sorbo &amp; Bocado</div>
                    <div className="font-serif text-gold text-2xl font-light">CV</div>
                  </div>
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
