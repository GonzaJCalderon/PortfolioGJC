'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const exp = [
  { role: 'Desarrollador Web Freelance', company: 'Proyectos independientes', proj: 'SinCelu — React, Next.js, NestJS', date: '2024 — Presente' },
  { role: 'Desarrollador Web', company: 'Ministerio de Seguridad — Gob. Mendoza', proj: 'Frontend & Backend', date: '2024' },
  { role: 'Secretario Privado / Comunicación', company: 'Municipalidad de Godoy Cruz', proj: 'Gestión & Comunicación', date: '2020 — 2022' },
  { role: 'Community Manager', company: 'Secretaría de Cultura — Gob. Mendoza', proj: 'Redes Sociales y Eventos', date: '2016 — 2020' },
];

const edu = [
  { title: 'Developer Fullstack', place: 'Soy Henry', date: '2023' },
  { title: 'Desarrollo Web', place: 'Coderhouse', date: '2022' },
  { title: 'Lic. Trabajo Social', place: 'Universidad Nacional de Cuyo', date: '2007 – 2014' },
];

export default function Experience() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal títulos agrupados para stagger
      const titleGroup = secRef.current?.querySelector('.title-group');
      if (titleGroup) {
        gsap.fromTo(titleGroup.querySelectorAll('.rv'), 
          { y: '105%' }, 
          {
            y: '0%', duration: 1.1, ease: 'power4.out', stagger: 0.12,
            scrollTrigger: { trigger: titleGroup, start: 'top 82%' },
          }
        );
      }

      // Filas de experiencia
      secRef.current?.querySelectorAll('.exp-row').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: i * 0.08,
          scrollTrigger: { trigger: el, start: 'top 87%' },
        });
      });

      // Cards de educación
      secRef.current?.querySelectorAll('.edu-card').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // === PARALLAX del fondo al hacer scroll ===
      gsap.to('.exp-bg-img', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: secRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="relative w-full bg-bgDark py-32 px-8 md:px-14 overflow-hidden">
      
      {/* ── FONDO BARROCO CON PARALLAX ── */}
      <div className="exp-bg-img absolute inset-0 z-0 scale-125 will-change-transform">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/img/baroque_hero.png')" }}
        />
        {/* Capas de velo oscuro para legibilidad (más fuerte a la derecha donde hay texto) */}
        <div className="absolute inset-0 bg-gradient-to-r from-bgDark/30 via-bgDark/70 to-bgDark/95" />
        <div className="absolute inset-0 bg-gradient-to-b from-bgDark via-transparent to-bgDark" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Título grande — igual al original "I AM HONORED TO WORK WITH SPECIAL PEOPLE" */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="title-group">
            <div className="rv-wrap overflow-hidden mb-2">
              <p className="rv text-[10px] font-black uppercase tracking-[0.4em] text-brand translate-y-full will-change-transform">Trayectoria</p>
            </div>
            <div className="rv-wrap overflow-hidden mb-1">
              <h2 className="rv font-black uppercase tracking-tighter text-5xl md:text-7xl leading-none translate-y-full will-change-transform">
                Me honra
              </h2>
            </div>
            <div className="rv-wrap overflow-hidden mb-1">
              <h2 className="rv font-black uppercase tracking-tighter text-5xl md:text-7xl leading-none translate-y-full will-change-transform">
                trabajar con
              </h2>
            </div>
            <div className="rv-wrap overflow-hidden">
              <h2 className="rv font-black uppercase tracking-tighter text-5xl md:text-7xl leading-none text-brand translate-y-full will-change-transform">
                gente increíble
              </h2>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end shrink-0">
            <span className="text-7xl font-black leading-none">4</span>
            <span className="text-brand text-[11px] font-black uppercase tracking-[0.3em]">años de</span>
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">experiencia</span>
          </div>
        </div>

        {/* Cabecera de tabla */}
        <div className="grid grid-cols-12 gap-4 border-b-2 border-white/10 pb-4 mb-1">
          <div className="col-span-12 md:col-span-4 text-[10px] font-black uppercase tracking-[0.3em] text-textMuted">Rol</div>
          <div className="col-span-12 md:col-span-4 text-[10px] font-black uppercase tracking-[0.3em] text-textMuted">Organización</div>
          <div className="col-span-12 md:col-span-4 text-[10px] font-black uppercase tracking-[0.3em] text-textMuted text-right">Proyecto · Fecha</div>
        </div>

        {/* Filas — hover con barrido brand */}
        {exp.map((e, i) => (
          <div
            key={i}
            className="exp-row opacity-0 will-change-opacity group relative grid grid-cols-12 gap-4 items-center py-7 border-b border-white/10 overflow-hidden"
          >
            {/* Fondo que sube en hover */}
            <div className="absolute inset-0 bg-brand translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />

            <div className="col-span-12 md:col-span-4 relative z-10 font-black uppercase text-lg md:text-2xl group-hover:text-bgDark transition-colors duration-300">
              {e.role}
            </div>
            <div className="col-span-12 md:col-span-4 relative z-10 font-bold uppercase text-sm text-brand group-hover:text-bgDark/70 transition-colors duration-300">
              {e.company}
            </div>
            <div className="col-span-12 md:col-span-4 relative z-10 flex flex-col items-start md:items-end">
              <span className="font-black uppercase text-sm group-hover:text-bgDark transition-colors duration-300">{e.proj}</span>
              <span className="text-[10px] tracking-widest text-textMuted mt-1 group-hover:text-bgDark/60 transition-colors duration-300">{e.date}</span>
            </div>
          </div>
        ))}

        {/* Marquee de tecnologías — como el "Also featured in" del original */}
        <div className="my-24 py-6 border-y border-white/10 overflow-hidden">
          <div className="flex whitespace-nowrap">
            <span className="marquee-track text-[11px] font-black uppercase tracking-[0.35em] text-textMuted/60">
              React — Next.js — TypeScript — Node.js — NestJS — PostgreSQL — Express — Redux — HTML &amp; CSS — WordPress — React Native — Supabase — React — Next.js — TypeScript — Node.js — NestJS — PostgreSQL — Express — Redux — HTML &amp; CSS — WordPress — React Native — Supabase —&nbsp;
            </span>
            <span className="marquee-track text-[11px] font-black uppercase tracking-[0.35em] text-textMuted/60" aria-hidden>
              React — Next.js — TypeScript — Node.js — NestJS — PostgreSQL — Express — Redux — HTML &amp; CSS — WordPress — React Native — Supabase — React — Next.js — TypeScript — Node.js — NestJS — PostgreSQL — Express — Redux — HTML &amp; CSS — WordPress — React Native — Supabase —&nbsp;
            </span>
          </div>
        </div>

        {/* Educación */}
        <div>
          <div className="rv-wrap overflow-hidden mb-12">
            <h3 className="rv font-black uppercase tracking-tighter text-3xl md:text-4xl translate-y-full will-change-transform">
              Educación
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {edu.map((d) => (
              <div key={d.title} className="edu-card opacity-0 will-change-opacity group border border-white/10 p-8 hover:border-brand transition-colors duration-300">
                <h4 className="text-lg font-black uppercase tracking-tight mb-3">{d.title}</h4>
                <p className="text-brand text-[10px] font-black uppercase tracking-[0.3em] mb-2">{d.place}</p>
                <p className="text-textMuted text-[10px] uppercase tracking-widest">{d.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
