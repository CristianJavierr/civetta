import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../../../lib/gsap';
import AnimatedFrame from '../../../components/feature/AnimatedFrame';

const COCKTAIL_1 = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ac50267055b2ef13a16065_cocktails-1.avif';
const COCKTAIL_2 = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ac5027270c47ed176e5cd7_cocktails-2.avif';

const drinks = [
  { name: 'Café de Especialidad', price: 'desde $120', desc: 'Granos de origen selecto, preparados con maestría para transformar cada mañana en algo especial.' },
  { name: 'Cappuccino Civetta', price: '$180', desc: 'Espresso intenso con leche texturizada al vapor. Nuestra firma para empezar el día con fuerza.' },
  { name: 'Cold Brew de la Casa', price: '$220', desc: 'Infusión en frío por 18 horas. Suave, refrescante y con todo el carácter del buen café.' },
  { name: 'Gin Tónico Artesanal', price: '$350', desc: 'Gin premium con tónica artesanal, pepino y jengibre. El cierre perfecto para tu tarde.' },
  { name: 'Mojito de Maracuyá', price: '$320', desc: 'Ron blanco, maracuyá fresco, menta y soda. Tropical, vibrante y absolutamente refrescante.' },
  { name: 'Aperol Spritz', price: '$380', desc: 'Prosecco, aperol y naranja. Efervescente y elegante para cerrar la tarde con estilo.' },
];

export default function DrinksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const imgColRef = useRef<HTMLDivElement>(null);
  const img1WrapRef = useRef<HTMLDivElement>(null);
  const img2WrapRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.set(titleRef.current, { clipPath: 'inset(0 0 100% 0)', y: 50 });
      gsap.to(titleRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      gsap.to(subtitleRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: subtitleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      // Drink items stagger from left
      const dItems = itemsRef.current?.querySelectorAll(':scope > div') ?? [];
      gsap.set(dItems, { opacity: 0, x: -30 });
      gsap.to(dItems, {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: itemsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });

      gsap.set(btnRef.current, { opacity: 0, y: 20 });
      gsap.to(btnRef.current, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: btnRef.current, start: 'top 90%', toggleActions: 'play none none none' },
      });

      // Image 1: parallax up — always visible, drifts upward on scroll
      gsap.fromTo(img1Ref.current,
        { yPercent: 4, scale: 1.08 },
        {
          yPercent: -4,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: imgColRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Image 2: parallax down — opposite direction, always visible
      gsap.fromTo(img2Ref.current,
        { yPercent: -4, scale: 1.08 },
        {
          yPercent: 4,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: imgColRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-warm-beige">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Drinks list */}
        <div className="lg:w-1/2 px-10 md:px-14 lg:px-16 py-20 lg:py-24 flex flex-col justify-between">
          <div>
            <h3
              ref={titleRef}
              className="font-serif font-light text-charcoal uppercase leading-none mb-8 will-change-transform"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              Bebidas Que<br />Completan<br />Tu Momento
            </h3>
            <p ref={subtitleRef} className="text-charcoal/60 text-sm leading-relaxed mb-10 max-w-sm will-change-transform">
              Desde café de especialidad para tus mañanas hasta cócteles artesanales para cerrar tus tardes — cada bebida en Civetta es una experiencia.
            </p>
          </div>

          <div ref={itemsRef} className="divide-y divide-charcoal/10 mb-10">
            {drinks.map((drink) => (
              <div key={drink.name} className="py-4 will-change-transform">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-charcoal text-[13px] font-medium tracking-wide">{drink.name}</span>
                  <span className="text-charcoal/55 text-xs ml-4 whitespace-nowrap">{drink.price}</span>
                </div>
                <p className="text-charcoal/45 text-xs leading-relaxed">{drink.desc}</p>
              </div>
            ))}
          </div>

          <Link
            ref={btnRef}
            to="/menu"
            className="inline-flex items-center bg-charcoal text-cream text-[11px] tracking-[0.2em] uppercase px-8 py-4 hover:bg-charcoal/80 transition-colors cursor-pointer whitespace-nowrap self-start will-change-transform"
          >
            Ver Menú
          </Link>
        </div>

        {/* Right: Cocktail images */}
        <div ref={imgColRef} className="relative lg:w-1/2 flex flex-col sm:flex-row lg:flex-col gap-2 min-h-[500px] will-change-transform">
          <AnimatedFrame inset={16} color="rgba(66,65,53,0.12)" />

          <div ref={img1WrapRef} className="flex-1 overflow-hidden" style={{ minHeight: '280px' }}>
            <img
              ref={img1Ref}
              src={COCKTAIL_1}
              alt="Amrit Palace cocktails"
              className="w-full h-full object-cover object-center will-change-transform"
              style={{ display: 'block' }}
            />
          </div>

          <div ref={img2WrapRef} className="flex-1 overflow-hidden" style={{ minHeight: '280px' }}>
            <img
              ref={img2Ref}
              src={COCKTAIL_2}
              alt="Amrit Palace drinks"
              className="w-full h-full object-cover object-center will-change-transform"
              style={{ display: 'block' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
