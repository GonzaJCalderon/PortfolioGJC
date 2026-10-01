'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { label: 'Diseño UX/UI', email: 'gcalderondev@gmail.com?subject=🎨 Busco un Diseñador UX/UI. Hablemos' },
  { label: 'Desarrollo Frontend', email: 'gcalderondev@gmail.com?subject=👨‍💻 Busco un experto Frontend. Hablemos' },
  { label: 'Desarrollo Full Stack', email: 'gcalderondev@gmail.com?subject=🚀 Busco un Desarrollador Full Stack. Hablemos' },
  { label: 'Desarrollo WordPress', email: 'gcalderondev@gmail.com?subject=💼 Busco un Dev WordPress. Hablemos' },
  { label: 'Proyectos Nuevos', email: 'gcalderondev@gmail.com?subject=💡 Tengo un nuevo proyecto. Hablemos' },
];

const socials = [
  { abbr: 'IG', label: 'Instagram', href: 'https://www.instagram.com/gonzakata/' },
  { abbr: 'TW', label: 'Twitter / X', href: 'https://twitter.com/gonzakata' },
  { abbr: 'LI', label: 'LinkedIn', href: 'https://www.linkedin.com/in/gonzalojcalderon/' },
  { abbr: 'GH', label: 'GitHub', href: 'https://github.com/GonzaJCalderon' },
  { abbr: 'WA', label: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=5492634618172' },
];

export default function Footer() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal títulos
      secRef.current?.querySelectorAll('.rv-wrap').forEach(wrap => {
        const inner = wrap.querySelector('.rv');
        if (!inner) return;
        gsap.fromTo(inner, { y: '105%' }, {
          y: '0%', duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: wrap, start: 'top 82%' },
        });
      });

      // Botones de habilidades con stagger
      gsap.fromTo('.footer-skill', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: '.footer-skills', start: 'top 80%' },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="footer" ref={secRef} className="w-full bg-bgDark border-t border-white/10 overflow-hidden">

      {/* Marquee de tecnologías */}
      <div className="py-5 border-b border-white/8 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <span className="marquee-track text-[10px] font-black uppercase tracking-[0.4em] text-textMuted/50">
            React · Next.js · TypeScript · Node.js · NestJS · PostgreSQL · Supabase · Redux · Express · WordPress · HTML/CSS · React Native · React · Next.js · TypeScript · Node.js · NestJS · PostgreSQL · Supabase · Redux · Express · WordPress · HTML/CSS · React Native ·&nbsp;
          </span>
          <span className="marquee-track text-[10px] font-black uppercase tracking-[0.4em] text-textMuted/50" aria-hidden>
            React · Next.js · TypeScript · Node.js · NestJS · PostgreSQL · Supabase · Redux · Express · WordPress · HTML/CSS · React Native · React · Next.js · TypeScript · Node.js · NestJS · PostgreSQL · Supabase · Redux · Express · WordPress · HTML/CSS · React Native ·&nbsp;
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-14 py-32">

        {/* Título "Conectemos" */}
        <div className="mb-24">
          <div className="rv-wrap overflow-hidden">
            <h2 className="rv font-black uppercase tracking-tighter text-[clamp(3.5rem,10vw,9rem)] leading-[0.88] translate-y-full will-change-transform">
              Conectemos
            </h2>
          </div>
          <div className="rv-wrap overflow-hidden">
            <h2 className="rv font-black uppercase tracking-tighter text-[clamp(3.5rem,10vw,9rem)] leading-[0.88] text-brand translate-y-full will-change-transform">
              Ahora
            </h2>
          </div>
        </div>

        {/* Dos columnas */}
        <div className="flex flex-col md:flex-row gap-20">

          {/* Columna Izquierda — Botones de habilidades */}
          <div className="flex-1 footer-skills">
            <p className="text-textMuted text-[10px] font-black uppercase tracking-[0.4em] mb-8">Siempre interesado en</p>
            <div className="flex flex-col gap-3">
              {skills.map((s) => (
                <a
                  key={s.label}
                  href={`mailto:${s.email}`}
                  role="button"
                  className="footer-skill opacity-0 will-change-opacity group relative inline-flex max-w-max items-center gap-4 overflow-hidden border border-white/20 rounded-full px-8 py-4 hover:border-brand transition-colors duration-300"
                >
                  <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.25em] group-hover:text-bgDark transition-colors duration-300">
                    {s.label}
                  </span>
                  <svg className="relative z-10 w-3.5 h-3.5 shrink-0 group-hover:text-bgDark group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="currentColor" viewBox="0 0 17 17">
                    <path d="M14.875 13.357V3.643L1.518 17 0 15.482 13.357 2.125H3.643V0H17v13.357z" fillRule="nonzero" />
                  </svg>
                  <div className="absolute inset-0 bg-brand scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 rounded-full z-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Columna Derecha — Sociales + CV */}
          <div className="shrink-0 flex flex-col justify-between gap-12">
            <div>
              <p className="text-textMuted text-[10px] font-black uppercase tracking-[0.4em] mb-7">Redes sociales</p>
              <div className="flex flex-col gap-5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 hover:text-brand transition-colors"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.35em] text-textMuted w-7 shrink-0">{s.abbr}</span>
                    <span className="text-sm font-bold uppercase tracking-wide group-hover:translate-x-1.5 transition-transform block">{s.label}</span>
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-0.5 shrink-0" fill="currentColor" viewBox="0 0 17 17">
                      <path d="M14.875 13.357V3.643L1.518 17 0 15.482 13.357 2.125H3.643V0H17v13.357z" fillRule="nonzero" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Botón descargar CV */}
            <a
              href="/archivo.pdf"
              download="CV_Gonzalo_Calderon"
              role="button"
              className="group relative overflow-hidden border border-brand rounded-full px-10 py-5 text-center hover:border-white/30 transition-colors duration-300"
            >
              <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.25em] text-brand group-hover:text-bgDark transition-colors duration-300">
                Descargar CV
              </span>
              <div className="absolute inset-0 bg-brand scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 rounded-full z-0" />
            </a>
          </div>
        </div>

        {/* Pie */}
        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-textMuted">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em]">© {new Date().getFullYear()} Gonzalo Calderón</span>
          <span className="text-[10px] uppercase tracking-widest">Mendoza, Argentina</span>
          <span className="text-[10px] uppercase tracking-widest">Diseñado &amp; Desarrollado por GJC</span>
        </div>
      </div>
    </footer>
  );
}
