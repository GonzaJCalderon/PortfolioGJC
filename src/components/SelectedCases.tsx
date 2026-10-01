'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'case-1',
    index: '01',
    title: 'Casa de los Títeres',
    role: 'Diseño UX/UI, Desarrollo',
    desc: 'Sistema Integral de Gestión (ERP) para una asociación cultural de artistas. Múltiples roles, gestión de eventos, miembros y finanzas.',
    image: '/img/casa_titeres.png',
    href: 'https://www.casatiteres.com.ar/',
    isExternal: true,
  },
  {
    id: 'case-2',
    index: '02',
    title: 'Eat & Run',
    role: 'Desarrollo Full Stack',
    desc: 'Aplicación web Full-Stack completa para el rubro gastronómico. Pedidos online, panel de cocina en tiempo real y gestión de menús.',
    image: '/img/eat_and_run.png',
    href: 'https://www.eatandrun.com.ar/',
    isExternal: true,
  },
  {
    id: 'case-3',
    index: '03',
    title: 'SinCelu',
    role: 'Diseño UX/UI, Desarrollo',
    desc: 'Plataforma para gestión de experiencia cultural de la Municipalidad de Godoy Cruz. Sistema con múltiples paneles, QR, email y métricas en tiempo real.',
    image: '/img/sincelu.png',
    href: 'https://sincelu-godoycruz.netlify.app/',
    isExternal: true,
  },
];

export default function SelectedCases() {
  const secRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Título agrupado
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

      // Tarjetas de proyecto
      secRef.current?.querySelectorAll('.project-row').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 82%' },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="cases" ref={secRef} className="w-full bg-bgLight py-32 px-8 md:px-14">
      <div className="max-w-7xl mx-auto">

        <div className="title-group">
          {/* Encabezado */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full border border-brand/30 flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-brand" />
            </div>
            <div className="rv-wrap overflow-hidden">
              <p className="rv text-[10px] font-black uppercase tracking-[0.4em] text-brand translate-y-full will-change-transform">
                Casos Seleccionados
              </p>
            </div>
          </div>

          <div className="rv-wrap overflow-hidden mb-24">
            <h2 className="rv font-black uppercase tracking-tighter text-5xl md:text-7xl leading-none translate-y-full will-change-transform">
              Mis Proyectos
            </h2>
          </div>
        </div>

        {/* Grid de proyectos — layout alternado fiel al original */}
        <div className="flex flex-col">
          {projects.map((p, idx) => (
            <div
              key={p.id}
              className={`project-row opacity-0 will-change-opacity grid grid-cols-12 gap-x-6 gap-y-12 items-center mb-24 md:mb-36`}
            >
              {/* Texto — alterna lado */}
              <div className={`col-span-12 md:col-span-4 flex flex-col gap-4 ${idx % 2 !== 0 ? 'md:col-start-9 md:order-last' : ''}`}>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand/60">{p.index}</span>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">{p.title}</h3>
                <div className="w-6 h-0.5 bg-brand" />
                <p className="text-[10px] font-black uppercase tracking-widest text-brand">{p.role}</p>
                <p className="text-xs font-medium uppercase leading-relaxed text-textMuted">{p.desc}</p>
                <a
                  href={p.href}
                  target={p.isExternal ? '_blank' : '_self'}
                  rel={p.isExternal ? 'noopener noreferrer' : undefined}
                  className="group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-widest mt-2 hover:text-brand transition-colors"
                >
                  <span>Ver proyecto</span>
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 17 17">
                    <path d="M14.875 13.357V3.643L1.518 17 0 15.482 13.357 2.125H3.643V0H17v13.357z" fillRule="nonzero" />
                  </svg>
                </a>
              </div>

              {/* Imagen con hover overlay */}
              <div
                className={`col-span-12 md:col-span-8 group relative aspect-[16/9] overflow-hidden cursor-pointer ${idx % 2 !== 0 ? 'md:col-start-1' : 'md:col-start-5'}`}
                onClick={() => setOpen(open === p.id ? null : p.id)}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width:768px)100vw,66vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                {/* Overlay de hover */}
                <div className="absolute inset-0 bg-bgDark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                    <p className="text-[11px] font-black uppercase tracking-widest text-brand mb-1">{p.role}</p>
                    <p className="text-sm font-medium uppercase text-textMuted">{p.desc}</p>
                  </div>
                </div>
                {/* Número grande decorativo */}
                <div className="absolute top-2 right-4 text-[120px] md:text-[180px] font-black text-white/4 leading-none select-none pointer-events-none">
                  {p.index}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA final — "Yes, these are some buttons" */}
        <div className="mt-8 pt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-textMuted/70">Sí, estos son</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-textMuted/70">algunos botones</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-end">
            {/* Botón principal — relleno desde abajo */}
            <a
              href="mailto:gcalderondev@gmail.com"
              role="button"
              className="relative group overflow-hidden border border-white/25 rounded-full px-10 py-5 hover:border-brand transition-colors duration-300"
            >
              <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.25em] group-hover:text-bgDark transition-colors duration-300">
                Contáctame
              </span>
              <div className="absolute inset-0 bg-brand scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 rounded-full z-0" />
            </a>
            {/* Botón secundario */}
            <button
              className="relative group overflow-hidden border border-white/10 rounded-full px-10 py-5 hover:border-white/30 transition-colors duration-300"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.25em] text-textMuted group-hover:text-textMain transition-colors duration-300">
                Ver otros trabajos
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
