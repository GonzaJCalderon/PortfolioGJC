'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleLine1 = useRef<HTMLDivElement>(null);
  const titleLine2 = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // === ENTRADA DE PÁGINA ===
      const tl = gsap.timeline({ delay: 0.3, defaults: { ease: 'power4.out' } });

      tl.fromTo(titleLine1.current,  { y: '105%' }, { y: '0%', duration: 1.2 }, 0.1)
        .fromTo(titleLine2.current,  { y: '105%' }, { y: '0%', duration: 1.2 }, 0.22)
        .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.55)
        .fromTo(descRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.7)
        .fromTo(ctaRef.current,      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.85)
        .fromTo(badgeRef.current,    { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)' }, 0.6);

      // === PARALLAX del fondo al hacer scroll ===
      gsap.to('.hero-bg-img', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] w-full flex flex-col overflow-hidden bg-bgDark">

      {/* ── FONDO BARROCO CON PARALLAX ── */}
      <div className="hero-bg-img absolute inset-0 z-0 scale-110 will-change-transform">
        {/* Pintura barroca */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/img/baroque_hero.png')" }}
        />
        {/* Capas de velo oscuro para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-bgDark/80 via-bgDark/50 to-bgDark/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-bgDark/70 via-transparent to-bgDark/40" />
      </div>

      {/* ── NAVBAR ── */}
      <div className="relative z-20 flex items-start justify-between px-8 md:px-14 pt-10">
        <div>
          <a href="/" className="text-sm font-black uppercase tracking-widest block hover:text-brand transition-colors duration-300">
            Gonzalo Calderón
          </a>
          <span className="text-brand text-[10px] font-bold uppercase tracking-[0.35em]">
            Desarrollador Full Stack
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-10 pt-1">
          {[['Trabajos', '#cases'], ['Sobre mí', '#intro'], ['Contacto', '#footer']].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[11px] font-black uppercase tracking-[0.25em] text-textMuted hover:text-textMain transition-colors duration-300 relative group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>
        {/* Barra de progreso */}
        <div className="hidden md:block w-28 h-px bg-white/10 mt-3 overflow-hidden">
          <div id="progress-bar" className="h-full bg-brand w-0 transition-none" />
        </div>
      </div>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <div className="relative z-10 flex flex-col justify-end flex-1 px-8 md:px-14 pb-56 md:pb-64">

        {/* Badge "creativo" */}
        <div className="mb-5">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand/70">creativo</span>
        </div>

        {/* Título hero — Línea 1 */}
        <div className="overflow-hidden">
          <div ref={titleLine1} className="font-black uppercase leading-[0.95] tracking-tighter text-[clamp(2.8rem,14vw,13rem)] translate-y-full will-change-transform">
            GONZALO
          </div>
        </div>

        {/* Título hero — Línea 2 */}
        <div className="overflow-hidden mb-12 md:mb-16">
          <div ref={titleLine2} className="font-black uppercase leading-[0.95] tracking-tighter text-[clamp(2.8rem,14vw,13rem)] text-brand translate-y-full will-change-transform">
            CALDERÓN
          </div>
        </div>

        {/* Subtítulo + descripción + CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-8 max-w-5xl">
          <div className="flex-1">
            <p ref={subtitleRef} className="text-lg md:text-xl font-black uppercase tracking-widest mb-3 opacity-0">
              Developer Full Stack — Experto Frontend
            </p>
            <p ref={descRef} className="text-xs md:text-sm uppercase font-medium leading-relaxed text-textMuted max-w-md opacity-0">
              Creo productos digitales de alto impacto con React, Next.js, Node.js y NestJS. Desde Mendoza, Argentina.
            </p>
          </div>

          {/* CTA tipo bepatrickdavid — píldora con marquee */}
          <a
            ref={ctaRef}
            href="#footer"
            className="opacity-0 relative group overflow-hidden border border-white/25 rounded-full px-10 py-5 shrink-0 hover:border-brand transition-colors duration-300"
            role="button"
          >
            {/* Texto normal */}
            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.25em] group-hover:text-bgDark transition-colors duration-300 whitespace-nowrap">
              Contáctame
            </span>
            {/* Relleno en hover */}
            <div className="absolute inset-0 bg-brand scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-400 rounded-full z-0" />
            {/* Marquee en hover (overlay) */}
            <div className="absolute inset-0 flex items-center overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
              <div className="marquee-track whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-bgDark">
                Contáctame &mdash; Contáctame &mdash; Contáctame &mdash; Contáctame &mdash;&nbsp;
                Contáctame &mdash; Contáctame &mdash; Contáctame &mdash; Contáctame &mdash;&nbsp;
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* ── BADGE DE DISPONIBILIDAD (bottom-left) ── */}
      <div ref={badgeRef} className="absolute left-8 md:left-14 bottom-8 z-20 flex items-center gap-5 opacity-0">
        {/* SVG circular giratorio */}
        <div className="relative w-16 h-16 shrink-0">
          <svg className="animate-spin-slow w-full h-full" viewBox="0 0 64 64">
            <defs>
              <path id="circleText" d="M32,32 m-24,0 a24,24 0 1,1 48,0 a24,24 0 1,1 -48,0" />
            </defs>
            <text fill="#c6b5a3" fontSize="7" fontWeight="700" letterSpacing="2" fontFamily="monospace" textAnchor="start">
              <textPath href="#circleText">DISPONIBLE · FREELANCE · SEP · 2026 ·</textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
          </div>
        </div>
        {/* Texto */}
        <div className="flex flex-col leading-tight">
          <span className="text-2xl font-black uppercase tracking-tighter">Sep</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand">Disponible</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-textMuted">Para Trabajar</span>
        </div>
      </div>

      {/* ── SCROLL INDICATOR (bottom-right) ── */}
      <div className="absolute right-8 md:right-14 bottom-8 z-20 flex flex-col items-center gap-3">
        <div className="w-px h-14 bg-white/10 overflow-hidden">
          <div className="w-full h-1/2 bg-brand animate-scroll-indicator" />
        </div>
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-textMuted rotate-90 origin-center mt-2">scroll</span>
      </div>
    </section>
  );
}
