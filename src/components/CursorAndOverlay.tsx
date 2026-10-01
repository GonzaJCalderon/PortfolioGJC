'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // ── 1. LENIS SMOOTH SCROLL ──
    let lenis: any;
    (async () => {
      const { default: Lenis } = await import('lenis');
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time: number) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    })();

    // ── 2. ANIMACIÓN DE APERTURA (fiel a bepatrickdavid.com) ──
    //  Secuencia:
    //  [0.0s] Pantalla completamente negra + nombre/cargo centrado
    //  [0.2s] Contador sube de 0 → 100 en ~1.8s
    //  [2.0s] Panel superior sube (clip-path / translateY)
    //  [2.3s] Panel inferior baja
    //  [2.5s] Hero elements fly in con stagger
    const counter = counterRef.current;
    const loader = loaderRef.current;

    // Contar de 0 a 100
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      delay: 0.2,
      onUpdate() {
        if (counter) counter.textContent = String(Math.round(obj.val)).padStart(3, '0');
      },
      onComplete() {
        // Loader sale: los dos paneles se separan (arriba y abajo)
        const tl = gsap.timeline();

        // Panel superior sale hacia arriba, inferior hacia abajo
        tl.to('.loader-top', {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
        }, 0)
          .to('.loader-bottom', {
            yPercent: 100,
            duration: 0.9,
            ease: 'power4.inOut',
          }, 0)
          .to(loader, {
            pointerEvents: 'none',
            duration: 0,
          }, 0.9)
          // Los textos del hero entran con stagger
          .from('.hero-line', {
            y: '110%',
            duration: 1.1,
            ease: 'power4.out',
            stagger: 0.12,
          }, 0.55)
          .from('.hero-fade', {
            opacity: 0,
            y: 30,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
          }, 0.75);
      }
    });

    // ── 3. CUSTOM CURSOR ──
    const cur = document.getElementById('cur');
    const curf = document.getElementById('cur-f');
    let mx = 0, my = 0, fx = 0, fy = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      gsap.set(cur, { x: mx, y: my });
    };
    const raf = () => {
      fx += (mx - fx) * 0.10;
      fy += (my - fy) * 0.10;
      gsap.set(curf, { x: fx, y: fy });
      requestAnimationFrame(raf);
    };
    raf();
    window.addEventListener('mousemove', onMouseMove);

    // Hover cursor
    const onEnter = () => cur?.classList.add('big');
    const onLeave = () => cur?.classList.remove('big');
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // ── 4. PROGRESS BAR ──
    const bar = document.getElementById('progress-bar');
    const onScroll = () => {
      if (!bar) return;
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      lenis?.destroy();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* ── LOADER OVERLAY (dos paneles que se separan) ── */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[9990] pointer-events-auto flex flex-col"
      >
        {/* Panel superior (mitad de pantalla) */}
        <div className="loader-top relative flex-1 bg-bgDark flex flex-col items-start justify-end px-8 md:px-14 pb-6 overflow-hidden">
          {/* Nombre + cargo como en el original */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand">Gonzalo Calderón</span>
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-textMuted">Desarrollador Full Stack</span>
          </div>
        </div>

        {/* Panel inferior (mitad de pantalla) */}
        <div className="loader-bottom relative flex-1 bg-bgDark flex flex-col items-end justify-start px-8 md:px-14 pt-6 overflow-hidden">
          {/* Contador estilo Patrick David */}
          <div className="flex items-baseline gap-2">
            <span
              ref={counterRef}
              className="text-[8rem] md:text-[12rem] font-black tabular-nums leading-none text-textMain/10 select-none"
              aria-hidden
            >000</span>
          </div>
        </div>

        {/* Línea separadora central */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-px h-px bg-white/10" />
      </div>

      {/* ── CUSTOM CURSOR ── */}
      <div id="cur" />
      <div id="cur-f" />

      {/* ── CONTENIDO ── */}
      {children}
    </>
  );
}
