import { useRef, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../../../lib/gsap';

const CAT_IMG_1 = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68e46be43526b08d9492bd44_img-1.avif';
const CAT_IMG_2 = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68e46be3bdd582aff715479c_img-2.avif';
const CAT_IMG_3 = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68e46be4c3b9f44298ee4f60_img-3.avif';

const slides = [
  { img: CAT_IMG_1, title: 'Congelados Para Terminar en Casa', desc: 'Lleva nuestras catibías, lumpias y platos favoritos a casa, listos para terminar de preparar cuando quieras disfrutarlos.' },
  { img: CAT_IMG_2, title: 'Pedidos por WhatsApp', desc: 'Haz tu pedido directamente al 809-710-6646. Te ayudamos a armar la mejor opción para ti y los tuyos, sin complicaciones.' },
  { img: CAT_IMG_3, title: 'Pensado Para Compartir', desc: 'Nuestros productos están diseñados para ser experiencias compartidas. Cada bocado cuenta una historia y une a las personas.' },
];

export default function CateringSection() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title 1: clip-path + x from left (scrub for dramatic effect)
      gsap.set(title1Ref.current, { clipPath: 'inset(0 100% 0 0)', x: -60 });
      gsap.to(title1Ref.current, {
        clipPath: 'inset(0 0% 0 0)',
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: title1Ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      // Title 2: same but slight delay
      gsap.set(title2Ref.current, { clipPath: 'inset(0 100% 0 0)', x: -60 });
      gsap.to(title2Ref.current, {
        clipPath: 'inset(0 0% 0 0)',
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: { trigger: title1Ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      // Description fade
      gsap.set(descRef.current, { opacity: 0, y: 20 });
      gsap.to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: descRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      // Slider: fade + scale up on enter
      gsap.set(sliderRef.current, { opacity: 0, y: 50 });
      gsap.to(sliderRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sliderRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      // Scrub: title letter-spacing opens as scrolls through section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'center center',
        scrub: 1.5,
        onUpdate: (self) => {
          const ls = -0.02 + self.progress * 0.04;
          gsap.set([title1Ref.current, title2Ref.current], { letterSpacing: `${ls}em` });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-cream-light py-20 md:py-28">
      {/* Header text */}
      <div className="text-center px-6 mb-14 overflow-hidden">
        <h2
          ref={title1Ref}
          className="font-serif font-light text-charcoal uppercase leading-none mb-4 will-change-transform"
          style={{ fontSize: 'clamp(3rem, 8vw, 9rem)', letterSpacing: '-0.02em' }}
        >
          Para
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6">
          <span className="text-charcoal/50 text-[11px] tracking-[0.3em] uppercase italic">Pensado para</span>
          <h2
            ref={title2Ref}
            className="font-serif font-light text-charcoal uppercase leading-none will-change-transform"
            style={{ fontSize: 'clamp(3rem, 8vw, 9rem)', letterSpacing: '-0.02em' }}
          >
            Compartir
          </h2>
          <span className="text-charcoal/50 text-[11px] tracking-[0.3em] uppercase italic">y disfrutarlo donde vayas</span>
        </div>
        <p ref={descRef} className="text-charcoal/60 text-sm leading-relaxed max-w-xl mx-auto will-change-transform">
          Nuestros productos están pensados para que los disfrutes donde quieras. Ya sea en casa, en una reunión o en cualquier rincón especial — Civetta va contigo.
        </p>
      </div>

      {/* Slider */}
      <div ref={sliderRef} className="relative px-8 md:px-16 will-change-transform">
        <div className="flex gap-4 md:gap-6 overflow-hidden">
          {slides.map((slide, idx) => {
            const offset = (idx - current + slides.length) % slides.length;
            const visible = offset === 0 || offset === 1;
            return (
              <div
                key={slide.title}
                className={`flex-shrink-0 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`}
                style={{ width: 'calc(50% - 12px)' }}
              >
                <div className="w-full h-[380px] md:h-[480px] overflow-hidden mb-5">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h4 className="text-charcoal text-base font-medium tracking-wide mb-2">{slide.title}</h4>
                <p className="text-charcoal/55 text-xs leading-relaxed max-w-sm">{slide.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-4 mt-8">
          <button onClick={prev} className="w-11 h-11 flex items-center justify-center border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300 cursor-pointer">
            <i className="ri-arrow-left-line text-sm"></i>
          </button>
          <button onClick={next} className="w-11 h-11 flex items-center justify-center border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300 cursor-pointer">
            <i className="ri-arrow-right-line text-sm"></i>
          </button>
          <div className="flex gap-2 ml-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-px transition-all duration-300 cursor-pointer ${i === current ? 'w-8 bg-charcoal' : 'w-4 bg-charcoal/30'}`}
              ></button>
            ))}
          </div>
          <Link
            to="/menu"
            className="ml-auto text-[11px] tracking-[0.2em] uppercase text-charcoal border-b border-charcoal/40 pb-0.5 hover:border-charcoal transition-colors cursor-pointer whitespace-nowrap"
          >
            Ver Menú
          </Link>
        </div>
      </div>
    </section>
  );
}
