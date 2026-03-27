import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../../../lib/gsap';
import AnimatedFrame from '../../../components/feature/AnimatedFrame';

const VIDEO_SRC = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2%2F68ab88ee4daaf51c42a59660_Amrit%20Palace%20%281%29-transcode.mp4';
const VIDEO_POSTER = 'https://cdn.prod.website-files.com/68a25157e0edb92947ffe4a2/69a5fe2eb039b97dd5da108d_amrit-poster.avif';

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Text block: slides from left
      gsap.set([titleRef.current, bodyRef.current, btnRef.current], { opacity: 0, x: -50 });
      gsap.to([titleRef.current, bodyRef.current, btnRef.current], {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Video container: scale up + slide from right
      gsap.set(videoWrapRef.current, { opacity: 0, x: 70, scale: 0.96 });
      gsap.to(videoWrapRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Video parallax scroll: slight zoom as scrolling through
      ScrollTrigger.create({
        trigger: videoWrapRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(videoWrapRef.current?.querySelector('video'), {
            scale: 1 + p * 0.08,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-charcoal w-full">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left: Text content */}
        <div ref={textRef} className="flex items-center lg:w-5/12 px-10 md:px-16 py-20 lg:py-24">
          <div>
            <h2
              ref={titleRef}
              className="font-serif text-cream font-light leading-tight mb-6 will-change-transform"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              El Alma<br />de Civetta
            </h2>
            <p ref={bodyRef} className="text-cream/60 text-sm leading-relaxed mb-10 max-w-sm will-change-transform">
              Desde nuestro espacio en los Cerros de Gurabo, cada detalle está pensado para hacer de tu visita un momento que recuerdes.
            </p>
            <Link
              ref={btnRef}
              to="/contacto"
              className="inline-flex items-center border border-cream/40 text-cream text-[11px] tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-cream hover:text-charcoal transition-all duration-300 cursor-pointer whitespace-nowrap will-change-transform"
            >
              Conócenos
            </Link>
          </div>
        </div>

        {/* Right: Video */}
        <div ref={videoWrapRef} className="relative lg:w-7/12 min-h-[400px] lg:min-h-0 overflow-hidden will-change-transform">
          <AnimatedFrame inset={20} color="rgba(255,255,255,0.18)" />
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            poster={VIDEO_POSTER}
            className="w-full h-full object-cover will-change-transform"
            style={{ minHeight: '400px' }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
