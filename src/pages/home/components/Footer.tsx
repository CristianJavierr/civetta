import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../../lib/gsap';

export default function Footer() {
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Grid columns stagger in
      const cols = gridRef.current?.querySelectorAll(':scope > div') ?? [];
      gsap.set(cols, { opacity: 0, y: 40 });
      gsap.to(cols, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      // Logo fade
      gsap.set(logoRef.current, { opacity: 0, y: 20 });
      gsap.to(logoRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: logoRef.current, start: 'top 90%', toggleActions: 'play none none none' },
      });

      // Big text reveal
      gsap.set(bigTextRef.current, { clipPath: 'inset(0 100% 0 0)' });
      gsap.to(bigTextRef.current, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: bigTextRef.current, start: 'top 95%', toggleActions: 'play none none none' },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-[#f7f2e8] border-t border-charcoal/10">
      <div className="px-10 md:px-16 pt-16 pb-10">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mb-12">
          {/* Ubicación */}
          <div className="will-change-transform">
            <div className="text-[10px] text-charcoal/40 uppercase tracking-[0.25em] mb-5">Ubicación</div>
            <div>
              <div className="text-charcoal text-sm font-medium mb-1">Civetta</div>
              <div className="text-charcoal/55 text-xs leading-relaxed">
                C/ Dr. Lorenzo Pellerano #5<br />
                Cerros de Gurabo<br />
                Santiago, R.D.
              </div>
            </div>
            <div className="mt-4">
              <a
                href="https://maps.google.com/?q=C/+Dr.+Lorenzo+Pellerano+5,+Cerros+de+Gurabo,+Santiago"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/55 text-xs hover:text-charcoal transition-colors cursor-pointer underline"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>

          {/* Horario */}
          <div className="will-change-transform">
            <div className="text-[10px] text-charcoal/40 uppercase tracking-[0.25em] mb-5">Horario</div>
            <div className="text-charcoal/55 text-xs leading-relaxed">
              Lun–Vie 7:30 AM — 8:00 PM<br />
              Sáb–Dom 8:00 AM — 9:00 PM
            </div>
          </div>

          {/* Contacto */}
          <div className="will-change-transform">
            <div className="text-[10px] text-charcoal/40 uppercase tracking-[0.25em] mb-5">Contacto</div>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/18097106646"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/55 text-xs hover:text-charcoal transition-colors cursor-pointer flex items-center gap-2"
              >
                <i className="ri-whatsapp-line"></i>
                809-710-6646
              </a>
              <a
                href="https://www.instagram.com/civettasb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/55 text-xs hover:text-charcoal transition-colors cursor-pointer flex items-center gap-2"
              >
                <i className="ri-instagram-line"></i>
                @civettasb
              </a>
            </div>
          </div>

          {/* Descubrir */}
          <div className="flex flex-col gap-8 will-change-transform">
            <div>
              <div className="text-[10px] text-charcoal/40 uppercase tracking-[0.25em] mb-5">Descubrir</div>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Inicio', to: '/' },
                  { label: 'Menú', to: '/menu' },
                  { label: 'Contacto', to: '/contacto' },
                ].map(({ label, to }) => (
                  <Link key={label} to={to} className="text-charcoal/55 text-xs hover:text-charcoal transition-colors cursor-pointer">{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-charcoal/40 uppercase tracking-[0.25em] mb-5">Redes</div>
              <div className="flex flex-col gap-2.5">
                <a href="https://www.instagram.com/civettasb" target="_blank" rel="noopener noreferrer" className="text-charcoal/55 text-xs hover:text-charcoal transition-colors cursor-pointer">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        {/* Center logo text */}
        <div ref={logoRef} className="flex flex-col items-center mb-12 will-change-transform">
          <span className="font-serif text-charcoal/70 text-3xl tracking-[0.3em] uppercase font-light">Civetta</span>
          <span className="text-charcoal/35 text-[9px] tracking-[0.4em] uppercase mt-1">Sorbo &amp; Bocado</span>
        </div>

        {/* Action links */}
        <div className="flex flex-wrap gap-6 justify-center mb-12">
          {[
            { label: 'Ver Menú', href: '/menu' },
            { label: 'Pedir por WhatsApp', href: 'https://wa.me/18097106646' },
            { label: 'Cómo Llegar', href: 'https://maps.google.com/?q=C/+Dr.+Lorenzo+Pellerano+5,+Cerros+de+Gurabo,+Santiago' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="text-[11px] text-charcoal/60 uppercase tracking-[0.18em] border-b border-charcoal/25 pb-0.5 hover:text-charcoal hover:border-charcoal transition-all cursor-pointer whitespace-nowrap"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Big text reveal */}
        <div className="overflow-hidden border-t border-charcoal/10 pt-6">
          <div
            ref={bigTextRef}
            className="font-serif text-charcoal/10 uppercase leading-none font-light tracking-tighter select-none will-change-transform"
            style={{ fontSize: 'clamp(4rem, 12vw, 14rem)' }}
          >
            Civetta
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-charcoal/10 mt-4">
          <span className="text-[10px] text-charcoal/35 tracking-wider">© {year} Civetta Sorbo &amp; Bocado</span>
          <span className="text-[10px] text-charcoal/35 tracking-wider">Todos los derechos reservados</span>
          <span className="text-[10px] text-charcoal/35 tracking-wider">Santiago, República Dominicana</span>
        </div>
      </div>
    </footer>
  );
}
