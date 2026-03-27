import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import { useLenis } from '../../hooks/useLenis';

const menuSections = [
  {
    category: 'Casi Listos',
    subtitle: 'Congelados para terminar en casa',
    icon: 'ri-fire-line',
    items: [
      {
        name: 'Catibías',
        variants: 'Queso-Limón | Puerro y Hongos | Birria',
        desc: 'Nuestras catibías artesanales, congeladas y listas para terminar en casa. Tres sabores únicos para elegir.',
        prices: [{ label: '½ docena', price: '$540' }, { label: '1 docena', price: '$1,020' }],
      },
      {
        name: 'Lumpias',
        variants: 'Rollo Crocante de Cerdo y Vegetales',
        desc: 'Acompañado de Salsa de Tamarindo. Una fusión irresistible de texturas y sabores orientales con toque dominicano.',
        prices: [{ label: '4 uds.', price: '$495' }],
      },
      {
        name: 'Filetico de Cerdo',
        variants: 'Filetico de Cerdo a la Parrilla · Salsa Chimichurri',
        desc: 'Suave, jugoso y lleno de sabor. El chimichurri lo eleva a otro nivel.',
        prices: [{ label: '8 oz', price: '$415' }, { label: '16 oz', price: '$785' }],
      },
    ],
  },
  {
    category: 'Para Untar',
    subtitle: 'Ideales para compartir y disfrutar',
    icon: 'ri-bowl-line',
    items: [
      {
        name: 'Dips',
        variants: 'Pollo | Pollo y Tocineta | Pimiento Cheese',
        desc: 'Nuestros dips artesanales en tres sabores inigualables. Perfectos para acompañar en cualquier ocasión.',
        prices: [{ label: '8 oz', price: '$425' }, { label: '16 oz', price: '$800' }],
      },
      {
        name: 'Hummus',
        variants: 'Tapenade de Pistacho | Chorizo y Miel',
        desc: 'Hummus cremoso con toppings únicos. El de pistacho y el de chorizo con miel son dos experiencias completamente distintas.',
        prices: [{ label: '8 oz', price: '$425' }, { label: '16 oz', price: '$800' }],
      },
    ],
  },
  {
    category: 'Panetteria',
    subtitle: 'Horneado a diario con ingredientes selectos',
    icon: 'ri-cake-line',
    items: [
      {
        name: 'Croissants',
        variants: 'Mantequilla | Cereales | Chocolate',
        desc: 'Croissants artesanales horneados cada día. Tres variedades para todos los gustos — desde el clásico de mantequilla hasta el irresistible de chocolate.',
        prices: [{ label: '½ docena', price: '$780' }, { label: '1 docena', price: '$1,500' }],
      },
      {
        name: 'Galletas',
        variants: 'Romero y Sal | Pistacho y Naranja',
        desc: 'Combinaciones únicas que sorprenden a cada mordida. Para los que buscan algo diferente y especial.',
        prices: [{ label: '10 uds.', price: '$450' }, { label: '20 uds.', price: '$800' }],
      },
      {
        name: 'Mini Pasteles de Nata',
        variants: 'Receta artesanal de la casa',
        desc: 'Pequeñas delicias con masa crujiente y nata cremosa. Irresistibles para compartir o llevarte a casa.',
        prices: [{ label: '½ docena', price: '$520' }, { label: '1 docena', price: '$950' }],
      },
    ],
  },
  {
    category: 'Bebidas de Mañana',
    subtitle: 'Transformaremos tus mañanas',
    icon: 'ri-cup-line',
    items: [
      {
        name: 'Café de Especialidad',
        variants: 'Granos de origen selecto',
        desc: 'Nuestro café de especialidad preparado con maestría. El inicio perfecto para cualquier día.',
        prices: [{ label: 'Desde', price: '$120' }],
      },
      {
        name: 'Cappuccino Civetta',
        variants: 'Espresso · leche texturizada',
        desc: 'Nuestra firma. Espresso intenso con leche texturizada al vapor y nuestra presentación especial.',
        prices: [{ label: 'Unidad', price: '$180' }],
      },
      {
        name: 'Cold Brew de la Casa',
        variants: 'Infusión en frío 18 horas',
        desc: 'Suave, refrescante y con todo el carácter del buen café. Una experiencia diferente.',
        prices: [{ label: 'Unidad', price: '$220' }],
      },
    ],
  },
  {
    category: 'Bebidas de Tarde',
    subtitle: 'Le daremos el cierre a tus tardes',
    icon: 'ri-goblet-line',
    items: [
      {
        name: 'Gin Tónico Artesanal',
        variants: 'Gin premium · tónica artesanal · pepino · jengibre',
        desc: 'El cierre perfecto para tu tarde. Refrescante, elegante y artesanal.',
        prices: [{ label: 'Unidad', price: '$350' }],
      },
      {
        name: 'Mojito de Maracuyá',
        variants: 'Ron blanco · maracuyá · menta · soda',
        desc: 'Tropical, vibrante y absolutamente refrescante. Una fusión caribeña inigualable.',
        prices: [{ label: 'Unidad', price: '$320' }],
      },
      {
        name: 'Aperol Spritz',
        variants: 'Prosecco · Aperol · naranja',
        desc: 'Efervescente, elegante y perfecto para el ocaso. La tarde siempre termina mejor con un Spritz.',
        prices: [{ label: 'Unidad', price: '$380' }],
      },
    ],
  },
];

export default function MenuPage() {
  useLenis();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { clipPath: 'inset(0 0 100% 0)', y: 60 });
      gsap.to(titleRef.current, {
        clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3,
      });
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      gsap.to(subtitleRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.9,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="w-full min-h-screen bg-cream">
      <Navbar />

      {/* Hero */}
      <div ref={heroRef} className="bg-charcoal pt-40 pb-20 px-10 md:px-16 overflow-hidden">
        <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-6">
          C/ Dr. Lorenzo Pellerano #5, Cerros de Gurabo, STGO
        </p>
        <h1
          ref={titleRef}
          className="font-serif text-cream font-light leading-none uppercase will-change-transform mb-6"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 10rem)', letterSpacing: '-0.02em' }}
        >
          Nuestra<br />Carta
        </h1>
        <p ref={subtitleRef} className="text-cream/50 text-sm leading-relaxed max-w-md will-change-transform">
          Pensado para compartir y disfrutarlo donde vayas. Haz tu pedido directamente por WhatsApp al{' '}
          <a href="https://wa.me/18097106646" target="_blank" rel="noopener noreferrer" className="text-cream/80 underline hover:text-cream transition-colors">
            809-710-6646
          </a>
        </p>
      </div>

      {/* Menu Sections */}
      <div className="px-10 md:px-16 py-16">
        {menuSections.map((section, si) => (
          <MenuSection key={section.category} section={section} index={si} />
        ))}
      </div>

      {/* CTA */}
      <div className="bg-charcoal py-20 px-10 md:px-16 text-center">
        <h2 className="font-serif text-cream font-light text-4xl md:text-5xl uppercase leading-none mb-6">
          ¿Listo para pedir?
        </h2>
        <p className="text-cream/50 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
          Te ayudamos a armar la mejor opción para ti y los tuyos, sin complicaciones.
        </p>
        <a
          href="https://wa.me/18097106646"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border border-cream/40 text-cream text-[11px] tracking-[0.2em] uppercase px-10 py-4 hover:bg-cream hover:text-charcoal transition-all duration-300 cursor-pointer whitespace-nowrap"
        >
          <i className="ri-whatsapp-line text-base"></i>
          Pedir por WhatsApp
        </a>
      </div>

      <Footer />
    </main>
  );
}

function MenuSection({ section, index }: { section: (typeof menuSections)[0]; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0, x: -30 });
      gsap.to(titleRef.current, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      const cards = itemsRef.current?.querySelectorAll(':scope > div') ?? [];
      gsap.set(cards, { opacity: 0, y: 30 });
      gsap.to(cards, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: itemsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`mb-16 pb-16 ${index < menuSections.length - 1 ? 'border-b border-charcoal/10' : ''}`}
    >
      {/* Section header */}
      <div ref={titleRef} className="flex items-start gap-4 mb-10 will-change-transform">
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
          <i className={`${section.icon} text-charcoal/40 text-xl`}></i>
        </div>
        <div>
          <h2 className="font-serif text-charcoal uppercase leading-none font-light" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            {section.category}
          </h2>
          <p className="text-charcoal/45 text-xs tracking-[0.2em] uppercase mt-2 italic">{section.subtitle}</p>
        </div>
      </div>

      {/* Items grid */}
      <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-14">
        {section.items.map((item) => (
          <div
            key={item.name}
            className="border border-charcoal/10 p-6 hover:border-charcoal/30 transition-colors will-change-transform"
          >
            <div className="mb-3">
              <h3 className="text-charcoal text-sm font-medium tracking-wide uppercase mb-1">{item.name}</h3>
              <p className="text-charcoal/40 text-[11px] italic leading-relaxed">{item.variants}</p>
            </div>
            <p className="text-charcoal/55 text-xs leading-relaxed mb-5">{item.desc}</p>
            <div className="flex flex-wrap gap-3 pt-4 border-t border-charcoal/8">
              {item.prices.map((p) => (
                <div key={p.label} className="flex flex-col">
                  <span className="text-charcoal/40 text-[10px] uppercase tracking-wider">{p.label}</span>
                  <span className="text-charcoal text-sm font-medium">{p.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
