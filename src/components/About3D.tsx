'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'HTML & CSS', 'WordPress', 'Redux', 'Express'];

export default function About3D() {
  const secRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const setupVideo = (vid: HTMLVideoElement | null) => {
      if (!vid) return;
      vid.playbackRate = 0.5;
      const handleTimeUpdate = () => {
        if (vid.duration > 0 && vid.currentTime >= vid.duration - 0.2) {
          vid.currentTime = 0.1;
        }
      };
      vid.addEventListener('timeupdate', handleTimeUpdate);
      return () => vid.removeEventListener('timeupdate', handleTimeUpdate);
    };

    const cleanupDesktop = setupVideo(desktopVideoRef.current);
    const cleanupMobile = setupVideo(mobileVideoRef.current);

    return () => {
      if (cleanupDesktop) cleanupDesktop();
      if (cleanupMobile) cleanupMobile();
    };
  }, []);

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
    <section id="intro" ref={secRef} className="relative w-full overflow-hidden pt-32 pb-8 md:py-32 px-8 md:px-14 min-h-screen flex items-center bg-black">
      
      {/* ── FONDO DE LA SECCIÓN: VIDEO PRE-COMPUESTO (AVATAR + ESPACIO) ── */}
      <div className="absolute inset-0 z-0 bg-[#020510] overflow-hidden">
        <div ref={videoWrapperRef} className="w-full h-full relative">
          {/* VIDEO DESKTOP (Horizontal) */}
          <video 
            ref={desktopVideoRef}
            src="/img/avatar.mp4" 
            autoPlay loop muted playsInline
            className="hidden md:block w-full h-full object-cover object-right opacity-100"
          />
          {/* VIDEO MOBILE (Vertical) achicado y pegado a la derecha/abajo */}
          <video 
            ref={mobileVideoRef}
            src="/img/avatar-mobile.mp4" 
            autoPlay loop muted playsInline
            className="block md:hidden absolute right-[-5%] bottom-0 w-full h-full object-cover object-bottom opacity-100 scale-[0.75] origin-bottom-right"
            style={{ 
              WebkitMaskImage: 'radial-gradient(circle at 80% 80%, black 50%, transparent 90%)', 
              maskImage: 'radial-gradient(circle at 80% 80%, black 50%, transparent 90%)' 
            }}
          />
        </div>
        {/* Overlays: Solo oscurecemos la mitad izquierda donde va el texto, dejamos la derecha intacta */}
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#020510] via-[#020510]/90 to-transparent w-[75%] md:w-[60%]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:block">
        
        {/* ── CONTENEDOR IZQUIERDO ESTILO PATRICK DAVID ── */}
        <div className="flex flex-col w-full md:w-[65%] relative z-10 pt-12 md:pt-0">

          {/* TÍTULO EN FUENTE CONDENSADA TIPO "ANTON" */}
          <div className="mb-4 md:mb-12 flex flex-col items-start w-max">
            <div className="rv-wrap overflow-hidden relative pt-4 pb-4">
              <h2 className="rv font-anton uppercase text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] leading-[0.9] tracking-normal text-textMain translate-y-full will-change-transform transform scale-y-[1.1] origin-bottom">
                FRONTEND
              </h2>
            </div>
            <div className="rv-wrap overflow-hidden relative pb-4 -mt-4 md:-mt-6">
              <h2 className="rv font-anton uppercase text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] leading-[0.9] tracking-normal text-textMain translate-y-full will-change-transform transform scale-y-[1.1] origin-bottom">
                DEVELOPER
              </h2>
            </div>
            <div className="text-right w-full pr-4 md:pr-20 mt-1 md:mt-2 relative">
              <span className="text-brand text-xs md:text-sm font-bold tracking-widest uppercase relative inline-block">
                Gonzalo Calderón
                
                {/* FLECHA DELICADA TIPO "PATRICK DAVID" */}
                <div className="absolute left-[70%] md:left-[90%] top-[90%] md:top-[10%] w-[50px] md:w-[70px] h-[40px] md:h-[50px] pointer-events-none">
                  <svg viewBox="0 0 70 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white/50 overflow-visible">
                    {/* Trazo ultra sutil y corto */}
                    <path d="M 0,25 Q 30,40 65,10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
                    {/* Punta de la flecha */}
                    <path d="M 52,12 L 67,8 L 60,22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Texto escrito a mano minúsculo */}
                    <text x="5" y="45" fill="currentColor" fontSize="8" fontFamily="cursive" transform="rotate(-5 5 45)">
                      ¡sí, ese soy yo!
                    </text>
                  </svg>
                </div>
              </span>
            </div>
          </div>

          {/* ── TEXTO DE DESCRIPCIÓN ALINEADO A LA IZQUIERDA Y CONTROLADO ── */}
          <div className="flex justify-start w-full mt-6 md:mt-4">
            <div className="w-[85%] md:w-[85%] pr-[5%] md:pr-0">
              <div className="rv-wrap overflow-hidden mb-2 pt-2 pb-1">
                <p className="rv text-lg md:text-2xl font-black uppercase translate-y-full will-change-transform text-left">
                  Uso mi pasión y habilidades
                </p>
              </div>

              <p className="fade-up text-sm font-medium uppercase leading-[1.6] text-white/95 drop-shadow-md mb-12 opacity-0 will-change-opacity text-left">
                para crear productos digitales de alto impacto. Me dedico principalmente al desarrollo web como Fullstack developer especializado en Frontend. Soy versátil, perfeccionista y en busca de la excelencia. Trabajo con clientes nacionales e internacionales.
              </p>

              {/* Skills */}
              <div className="fade-up opacity-0 will-change-opacity border-t border-white/10 pt-8">
                <p className="text-brand text-[10px] font-black uppercase tracking-[0.4em] mb-5 text-left">Tecnologías</p>
                <div className="grid grid-cols-2 gap-y-3">
                  {skills.map((s) => (
                    <div key={s} className="flex items-center gap-2.5 group justify-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand group-hover:scale-150 transition-transform shrink-0" />
                      <span className="text-[11px] font-black uppercase tracking-widest hover:text-brand transition-colors">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
