'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'HTML & CSS', 'WordPress', 'Redux', 'Express'];

export default function About3D() {
  const secRef = useRef<HTMLElement>(null);

    const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animaciones
      secRef.current?.querySelectorAll('.rv-wrap').forEach((wrap) => {
        const inner = wrap.querySelector('.rv');
        if (!inner) return;
        gsap.fromTo(inner,
          { y: '105%' },
          {
            y: '0%', duration: 1.1, ease: 'power4.out',
            scrollTrigger: { trigger: wrap, start: 'top 82%' },
          }
        );
      });

      // Fade items
      secRef.current?.querySelectorAll('.fade-up').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.08,
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });

    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="intro" ref={secRef} className="relative w-full overflow-hidden py-32 px-8 md:px-14 min-h-screen flex items-center bg-black">
      
      {/* ── FONDO DE LA SECCIÓN: AMBIENTE ESPACIAL (VIDEO 1) ── */}
      <div className="absolute inset-0 z-0 bg-[#020510] overflow-hidden">
        <video 
          src="/img/space-bg.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
        {/* Overlays para oscurecer el fondo y asegurar legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 md:hidden"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:block">
        
        {/* ── CONTENEDOR IZQUIERDO ESTILO PATRICK DAVID ── */}
        <div className="flex flex-col w-full md:w-[65%] relative z-10 pt-16 md:pt-0">

          {/* TÍTULO EN FUENTE CONDENSADA TIPO "ANTON" */}
          <div className="mb-12 flex flex-col items-start">
            <div className="rv-wrap overflow-hidden relative pt-4 pb-4">
              <h2 className="rv font-anton uppercase text-[5rem] md:text-[8rem] lg:text-[10rem] leading-[0.9] tracking-normal text-textMain translate-y-full will-change-transform transform scale-y-[1.1] origin-bottom">
                FRONTEND
              </h2>
            </div>
            <div className="rv-wrap overflow-hidden relative pb-4 -mt-4 md:-mt-6">
              <h2 className="rv font-anton uppercase text-[5rem] md:text-[8rem] lg:text-[10rem] leading-[0.9] tracking-normal text-textMain translate-y-full will-change-transform transform scale-y-[1.1] origin-bottom">
                DEVELOPER
              </h2>
            </div>
            <div className="text-left md:text-right w-full md:pr-12 mt-4 md:mt-2">
              <span className="text-brand text-xs md:text-sm font-bold tracking-widest uppercase">
                Gonzalo Calderón
              </span>
            </div>
          </div>

          {/* ── TEXTO DE DESCRIPCIÓN ALINEADO A LA DERECHA (COMO EN LA REFERENCIA) ── */}
          <div className="flex justify-end w-full">
            <div className="w-full md:w-[85%]">
              <div className="rv-wrap overflow-hidden mb-2 pt-2 pb-1">
                <p className="rv text-lg md:text-2xl font-black uppercase translate-y-full will-change-transform text-right md:text-left">
                  Uso mi pasión y habilidades
                </p>
              </div>

              <p className="fade-up text-sm font-medium uppercase leading-[1.6] text-textMuted mb-12 opacity-0 will-change-opacity text-right md:text-left">
                para crear productos digitales de alto impacto. Me dedico principalmente al desarrollo web como Fullstack developer especializado en Frontend. Soy versátil, perfeccionista y en busca de la excelencia. Trabajo con clientes nacionales e internacionales.
              </p>

              {/* Skills */}
              <div className="fade-up opacity-0 will-change-opacity border-t border-white/10 pt-8">
                <p className="text-brand text-[10px] font-black uppercase tracking-[0.4em] mb-5 text-right md:text-left">Tecnologías</p>
                <div className="grid grid-cols-2 gap-y-3">
                  {skills.map((s) => (
                    <div key={s} className="flex items-center gap-2.5 group justify-end md:justify-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand group-hover:scale-150 transition-transform shrink-0" />
                      <span className="text-[11px] font-black uppercase tracking-widest hover:text-brand transition-colors">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ── VIDEO PRINCIPAL DEL MUÑECO (A LA DERECHA) ── */}
        <div className="relative md:absolute md:right-[2%] md:top-1/2 md:transform md:-translate-y-1/2 w-full md:w-[50%] h-[50vh] md:h-[80vh] flex items-center justify-center pointer-events-none z-0 mt-8 md:mt-0">
          <video 
            src="/img/avatar.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full max-w-[400px] md:max-w-[600px] aspect-square object-cover opacity-100"
            style={{ 
              maskImage: 'radial-gradient(circle at center, black 45%, transparent 75%)', 
              WebkitMaskImage: 'radial-gradient(circle at center, black 45%, transparent 75%)' 
            }}
          />
        </div>

      </div>
    </section>
  );
}
