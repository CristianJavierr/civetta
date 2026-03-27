import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../../../lib/gsap';
import AnimatedFrame from '../../../components/feature/AnimatedFrame';

const MENU_ICON = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ab6aad6d37e1980d319ac9_menu-icon.png';
const FEATURED_IMG = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/68ac4c4fc4648b01d408500b_Featured%20Menu.avif';

const menuItems = [
  { name: 'Catibías', price: '½ doc. $540 | 1 doc. $1,020', desc: 'Queso-Limón | Puerro y Hongos | Birria. Nuestras catibías artesanales, congeladas para terminar en casa.' },
  { name: 'Lumpias', price: '4 uds. $495', desc: 'Rollo Crocante de Cerdo y Vegetales con Salsa de Tamarindo. Una fusión irresistible de texturas y sabores.' },
  { name: 'Filetico de Cerdo', price: '8 oz $415 | 16 oz $785', desc: 'Filetico de Cerdo a la Parrilla con Salsa Chimichurri. Suave, jugoso y lleno de sabor.' },
  { name: 'Dips', price: '8 oz $425 | 16 oz $800', desc: 'Pollo | Pollo y Tocineta | Pimiento Cheese. Perfectos para acompañar en cualquier ocasión.' },
  { name: 'Hummus Especial', price: '8 oz $425 | 16 oz $800', desc: 'Tapenade de Pistacho | Chorizo y Miel. Nuestro hummus con toppings únicos que lo hacen diferente.' },
  { name: 'Croissants', price: '½ doc. $780 | 1 doc. $1,500', desc: 'Mantequilla | Cereales | Chocolate. Croissants artesanales horneados a diario con ingredientes selectos.' },
  { name: 'Galletas Artesanales', price: '10 uds. $450 | 20 uds. $800', desc: 'Romero y Sal | Pistacho y Naranja. Combinaciones únicas para paladares exigentes.' },
  { name: 'Mini Pasteles de Nata', price: '½ doc. $520 | 1 doc. $950', desc: 'Pequeñas delicias de nata con masa crujiente. Irresistibles para compartir o llevarte a casa.' },
];

export default function FeaturedMenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const rightTitleRef = useRef<HTMLHeadingElement>(null);
  const rightTextRef = useRef<HTMLParagraphElement>(null);
  const rightBtnRef = useRef<HTMLAnchorElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Left title clip-path reveal
      gsap.set(titleRef.current, { clipPath: 'inset(0 0 100% 0)', y: 40 });
      gsap.to(titleRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      // Menu items stagger
      const items = itemsRef.current?.querySelectorAll(':scope > div') ?? [];
      gsap.set(items, { opacity: 0, y: 24 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: { trigger: itemsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });

      // Right: title, text, button
      gsap.set([rightTitleRef.current, rightTextRef.current, rightBtnRef.current], { opacity: 0, y: 30 });
      gsap.to([rightTitleRef.current, rightTextRef.current, rightBtnRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: rightTitleRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });

      // Image: zoom in as enters, parallax while scrolling
      gsap.set(imageRef.current, { scale: 1.12 });
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: imageWrapRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      ScrollTrigger.create({
        trigger: imageWrapRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          gsap.set(imageRef.current, { y: self.progress * 40 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-cream">
      <div className="flex flex-col lg:flex-row min-h-[700px]">
        {/* Left: Menu list */}
        <div className="lg:w-5/12 border-r border-charcoal/10 flex flex-col">
          <div className="px-10 md:px-14 pt-16 pb-6 flex items-center justify-between border-b border-charcoal/10">
            <h3
              ref={titleRef}
              className="font-serif font-light text-charcoal leading-none uppercase will-change-transform"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
            >
              Nuestra<br />Carta
            </h3>
            <span className="w-10 h-10 flex items-center justify-center">
              <img src={MENU_ICON} alt="Menu" className="w-6 h-6 object-contain" />
            </span>
          </div>

          <div ref={itemsRef} className="flex-1 divide-y divide-charcoal/8">
            {menuItems.map((item) => (
              <div key={item.name} className="px-10 md:px-14 py-5 will-change-transform">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-charcoal text-[13px] font-medium tracking-wide">{item.name}</span>
                  <span className="text-charcoal/60 text-[12px] ml-4 whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-charcoal/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="px-10 md:px-14 py-8 border-t border-charcoal/10">
            <Link
              to="/menu"
              className="inline-flex items-center bg-charcoal text-cream text-[11px] tracking-[0.2em] uppercase px-8 py-4 hover:bg-charcoal/80 transition-colors cursor-pointer whitespace-nowrap"
            >
              Ver Menú Completo
            </Link>
          </div>
        </div>

        {/* Right: Heading + Image */}
        <div className="lg:w-7/12 flex flex-col">
          <div className="px-10 md:px-14 lg:px-16 pt-16 pb-10">
            <h3
              ref={rightTitleRef}
              className="font-serif font-light text-charcoal leading-tight mb-6 will-change-transform"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
            >
              Sabor único.<br />Momentos perfectos.
            </h3>
            <p ref={rightTextRef} className="text-charcoal/60 text-sm leading-relaxed max-w-lg mb-8 will-change-transform">
              Cada plato en Civetta refleja nuestra pasión por los sabores auténticos — recetas pensadas para compartir, disfrutar en casa o llevar donde quieras. Desde nuestras catibías hasta los mini pasteles de nata, todo está hecho con ingredientes cuidadosamente seleccionados y mucho amor.
            </p>
            <a
              ref={rightBtnRef}
              href="https://wa.me/18097106646"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-charcoal text-cream text-[11px] tracking-[0.2em] uppercase px-8 py-4 hover:bg-charcoal/80 transition-colors cursor-pointer whitespace-nowrap will-change-transform"
            >
              Hacer un Pedido
            </a>
          </div>
          {/* Food image */}
          <div ref={imageWrapRef} className="relative flex-1 min-h-[350px] overflow-hidden">
            <AnimatedFrame inset={14} color="rgba(66,65,53,0.15)" />
            <img
              ref={imageRef}
              src={FEATURED_IMG}
              alt="Signature Indian dishes"
              className="w-full h-full object-cover object-top will-change-transform"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
