import { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../../../lib/gsap';

const STAR_ICON = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab6f5c7f6ef175306f18bb_star-icon.png';
const GOOGLE_ICON = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab6f5c31e3e7b0a84252b6_google-icon.png';

const reviews = [
  { text: 'El mejor café de Santiago, sin duda. El ambiente es increíble y cada bocado es una experiencia única.', author: 'María P.', platform: 'Google' },
  { text: 'Las catibías son una maravilla. Nunca había probado algo tan delicioso y original. ¡Regreso cada semana!', author: 'Carlos R.', platform: 'Instagram' },
  { text: 'Civetta se ha convertido en mi lugar favorito. El café de especialidad y los croissants son perfectos para comenzar el día.', author: 'Ana L.', platform: 'Google' },
  { text: 'El ambiente es único en Santiago. Los cócteles de la tarde son espectaculares y la atención es de primera.', author: 'Roberto M.', platform: 'Google' },
  { text: 'Los hummus con toppings de pistacho son increíbles. Un lugar que mezcla sabores de manera magistral.', author: 'Sofía V.', platform: 'Instagram' },
  { text: 'Pedí los mini pasteles de nata para una reunión y todos quedaron encantados. ¡Definitivamente lo repetiré!', author: 'Laura G.', platform: 'Google' },
  { text: 'Un lugar que transforma la experiencia gastronómica en Santiago. Cada visita es una sorpresa deliciosa.', author: 'Diego F.', platform: 'Google' },
  { text: 'Las lumpias de cerdo con salsa de tamarindo son adictivas. Ya lo he recomendado a todos mis amigos.', author: 'Paola N.', platform: 'Instagram' },
];

// Duplicate enough times to fill wide tracks
const rowA = [...reviews, ...reviews, ...reviews];
const rowB = [...reviews, ...reviews, ...reviews].reverse();

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div
      className="flex-shrink-0 bg-white border border-charcoal/8 p-7 mx-3"
      style={{ width: '340px' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="w-3.5 h-3.5 flex items-center justify-center">
              <img src={STAR_ICON} alt="star" className="w-3.5 h-3.5 object-contain" />
            </span>
          ))}
        </div>
        <span className="text-[10px] text-charcoal/40 uppercase tracking-wider">{review.platform}</span>
      </div>
      <p className="text-charcoal/75 text-sm leading-relaxed mb-6 italic">&quot;{review.text}&quot;</p>
      <div>
        <div className="text-[10px] text-charcoal/35 uppercase tracking-wider mb-0.5">Author</div>
        <div className="text-charcoal text-sm font-medium">{review.author}</div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ratingNumRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── Title reveal ──────────────────────────────────────────
      gsap.set(titleRef.current, { clipPath: 'inset(0 0 100% 0)', y: 50 });
      gsap.to(titleRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // ── Rating counter ────────────────────────────────────────
      gsap.set(ratingNumRef.current, { opacity: 0 });
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 4.9,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => {
          if (ratingNumRef.current) {
            ratingNumRef.current.textContent = counter.val.toFixed(1);
          }
        },
        onStart: () => gsap.set(ratingNumRef.current, { opacity: 1 }),
        scrollTrigger: {
          trigger: ratingNumRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // ── Stars stagger ─────────────────────────────────────────
      const stars = headerRef.current?.querySelectorAll('.star-item') ?? [];
      gsap.set(stars, { opacity: 0, scale: 0.6 });
      gsap.to(stars, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // ── Scroll-driven horizontal slide ────────────────────────
      // Row 1: slides LEFT while scrolling down
      gsap.fromTo(
        row1Ref.current,
        { x: 0 },
        {
          x: -500,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      // Row 2: slides RIGHT while scrolling down (opposite)
      gsap.fromTo(
        row2Ref.current,
        { x: -500 },
        {
          x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-cream-light py-20 md:py-28 overflow-hidden">
      {/* Header */}
      <div
        ref={headerRef}
        className="px-10 md:px-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14"
      >
        <h2
          ref={titleRef}
          className="font-serif font-light text-charcoal leading-none will-change-transform"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
        >
          Lo Que Dicen<br />Nuestros Clientes
        </h2>

        <div className="flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="star-item w-4 h-4 flex items-center justify-center will-change-transform">
                  <img src={STAR_ICON} alt="star" className="w-4 h-4 object-contain" />
                </span>
              ))}
            </div>
            <span className="w-5 h-5 flex items-center justify-center">
              <img src={GOOGLE_ICON} alt="Google" className="w-5 h-5 object-contain" />
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span
              ref={ratingNumRef}
              className="font-serif text-charcoal font-light will-change-transform"
              style={{ fontSize: '3.2rem', lineHeight: 1 }}
            >
              4.9
            </span>
            <span className="text-charcoal/40 text-sm">/5</span>
            <div>
              <div className="text-charcoal text-sm font-medium">Excelente</div>
              <div className="text-charcoal/45 text-xs mt-0.5">Basado en 500+ reseñas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1 — slides LEFT on scroll */}
      <div className="overflow-hidden mb-4">
        <div ref={row1Ref} className="flex will-change-transform">
          {rowA.map((review, idx) => (
            <ReviewCard key={`r1-${idx}`} review={review} />
          ))}
        </div>
      </div>

      {/* Row 2 — slides RIGHT on scroll (opposite) */}
      <div className="overflow-hidden">
        <div ref={row2Ref} className="flex will-change-transform">
          {rowB.map((review, idx) => (
            <ReviewCard key={`r2-${idx}`} review={review} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-10 md:px-16 mt-12 flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-charcoal/60 text-sm">
          ¿Ya visitaste Civetta y tuviste una experiencia memorable?
        </p>
        <a
          href="https://wa.me/18097106646"
          target="_blank"
          rel="noopener noreferrer"
          className="text-charcoal text-sm border-b border-charcoal/40 pb-0.5 hover:border-charcoal transition-colors cursor-pointer whitespace-nowrap"
        >
          ¡Déjanos tu reseña!
        </a>
      </div>
    </section>
  );
}
