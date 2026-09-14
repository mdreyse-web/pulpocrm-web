import { useEffect, useRef, useState } from 'react'
import pulpo from '../assets/pulpo-neon.png'

/* ============================================================
   CONFIGURA AQUÍ — cambia estos valores y listo
   ============================================================ */
const CALENDAR_URL = 'https://calendar.app.google/MDfT4DtxW98LUuNj7'
const PRECIO_SETEO = '$15.000'
const PRECIO_MENSUAL = '$3.500'
const WHATSAPP_URL = 'https://wa.me/56975820965'
/* ============================================================ */

const calendarReady = !CALENDAR_URL.includes('TU_ID_AQUI')

/* ---------- scroll reveal hook ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.15 }
    )
    el.querySelectorAll('.reveal').forEach((n) => obs.observe(n))
    if (el.classList.contains('reveal')) obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ---------- wordmark con letras que rebotan ---------- */
function BounceWord({ word, className = '' }: { word: string; className?: string }) {
  return (
    <span className={className} aria-label={word}>
      {word.split('').map((ch, i) => (
        <span key={i} className="bounce-letter" aria-hidden>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

/* ---------- nav ---------- */
function Nav() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 120)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`nav-shell fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(94vw,1100px)] ${hidden ? 'nav-hidden' : ''}`}>
      <nav className="flex items-center justify-between rounded-full border border-[#a855f7]/25 bg-[#0e0816]/70 backdrop-blur-md px-5 py-2.5">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={pulpo} alt="Pulpo" className="h-8 w-8 object-contain" />
          <span className="font-mono2 text-sm tracking-[0.25em] text-[#d8b4fe]">PULPO&nbsp;CRM</span>
        </a>
        <div className="hidden md:flex items-center gap-7 font-mono2 text-xs tracking-widest text-[#9b8bb0]">
          <a href="#que-es" className="hover:text-[#d8b4fe] transition-colors">QUÉ ES</a>
          <a href="#datos" className="hover:text-[#d8b4fe] transition-colors">TUS DATOS</a>
          <a href="#plan" className="hover:text-[#d8b4fe] transition-colors">EL PLAN</a>
        </div>
        <a
          href="#agenda"
          className="rounded-full bg-[#a855f7] px-4 py-2 font-mono2 text-xs font-bold tracking-wider text-[#0e0816] transition-all hover:bg-[#c084fc] hover:shadow-[0_0_24px_rgba(168,85,247,0.6)]"
        >
          AGENDA 15 MIN
        </a>
      </nav>
    </header>
  )
}

/* ---------- marquee ---------- */
function Marquee({ items, slow = false, className = '' }: { items: string[]; slow?: boolean; className?: string }) {
  const row = [...items, ...items]
  return (
    <div className={`marquee ${className}`}>
      <div className={`marquee-track ${slow ? 'slow' : ''}`}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap font-display text-2xl md:text-4xl uppercase text-[#d8b4fe]/90 px-6 py-4">
            {t}
            <span className="ml-12 text-[#a855f7]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-8">
      {/* glow de fondo */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#a855f7]/15 blur-[140px]" />

      <div className="relative mx-auto grid w-[min(94vw,1200px)] items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono2 text-sm tracking-[0.35em] text-[#a855f7]">
            PULPO CRM<span className="cursor-blink">_</span>
          </p>
          <h1 className="font-display mt-6 uppercase leading-[0.92] text-[clamp(3.2rem,9vw,8.5rem)]">
            <span className="block neon-fill">Un CRM</span>
            <span className="block neon-stroke">que no</span>
            <span className="block neon-fill">te marea.</span>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-[#9b8bb0]">
            Cuentas, contactos, actividades y pipeline. <span className="text-[#f4eefb] font-semibold">Nada más.</span>{' '}
            Porque nada más necesitas para vender.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#agenda"
              className="rounded-full bg-[#a855f7] px-8 py-4 font-mono2 text-sm font-bold tracking-wider text-[#0e0816] transition-all hover:bg-[#c084fc] hover:shadow-[0_0_32px_rgba(168,85,247,0.7)] hover:-translate-y-0.5"
            >
              AGENDA 15 MIN →
            </a>
            <a
              href="#plan"
              className="rounded-full border border-[#a855f7]/50 px-8 py-4 font-mono2 text-sm tracking-wider text-[#d8b4fe] transition-all hover:border-[#c084fc] hover:bg-[#a855f7]/10"
            >
              VER EL (ÚNICO) PLAN
            </a>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <img src={pulpo} alt="Pulpo neón, la mascota de PulpoCRM" className="pulpo-float pulpo-wiggle mx-auto w-full max-w-[420px] cursor-pointer" />
        </div>
      </div>

      <Marquee
        className="mt-16 border-y border-[#a855f7]/20"
        items={['Sin 47 dashboards', 'Sin nube', 'Tus datos son tuyos', 'Un solo plan', 'Sin letra chica', 'Seteo gratis']}
      />
    </section>
  )
}

/* ---------- el problema ---------- */
function Problema() {
  const ref = useReveal<HTMLElement>()
  const absurdos = [
    '12 dashboards que nadie abre',
    'campos obligatorios para guardar un teléfono',
    '"módulos" que nunca vas a usar',
    'una certificación para anotar una visita',
  ]
  return (
    <section ref={ref} className="relative py-28 md:py-40">
      <div className="mx-auto w-[min(94vw,1100px)]">
        <p className="reveal font-mono2 text-xs tracking-[0.35em] text-[#a855f7]">EL PROBLEMA</p>
        <h2 className="reveal font-display mt-6 uppercase leading-[0.95] text-[clamp(2.4rem,6vw,5.5rem)]">
          Los CRM te venden <span className="neon-fill">complejidad</span> que no pediste.
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <ul className="reveal space-y-5">
            {absurdos.map((a) => (
              <li key={a} className="flex items-start gap-4 text-xl md:text-2xl">
                <span className="mt-1 font-mono2 text-[#a855f7]">✗</span>
                <span className="strike-item">{a}</span>
              </li>
            ))}
          </ul>
          <div className="reveal flex flex-col justify-center">
            <p className="text-xl md:text-2xl leading-relaxed text-[#9b8bb0]">
              Tú no quieres "una plataforma de engagement omnicanal". Quieres saber{' '}
              <span className="text-[#f4eefb] font-semibold">a quién visitas hoy</span>, qué le prometiste a quién, y
              dónde está cada negocio.
            </p>
            <p className="mt-6 font-mono2 text-sm tracking-widest text-[#d8b4fe]">ESO ES TODO. Y ESO ES PULPO.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- qué es: 4 tarjetas apiladas ---------- */
const FEATURES = [
  {
    n: '01',
    title: 'Cuentas',
    desc: 'Tus clientes y prospectos, ordenados. Sin fichas infinitas: lo esencial de cada empresa, a un clic.',
    tint: 'from-[#2a1544] to-[#170d24]',
  },
  {
    n: '02',
    title: 'Contactos',
    desc: 'Las personas detrás de cada cuenta. Quién decide, quién compra, quién te debe un correo.',
    tint: 'from-[#3b1d5e] to-[#1d102e]',
  },
  {
    n: '03',
    title: 'Actividades',
    desc: 'Visitas, llamadas y tareas. Qué hiciste, qué sigue, qué se te estaba pasando. Nada se pierde.',
    tint: 'from-[#4c2578] to-[#241238]',
  },
  {
    n: '04',
    title: 'Pipeline',
    desc: 'Tus negocios en etapas claras, de "primer contacto" a "ganado". Un vistazo y sabes cómo va el mes.',
    tint: 'from-[#5d2e92] to-[#2a1544]',
  },
  {
    n: '05',
    title: 'Proyectos',
    desc: 'Clientes, pipeline, ventas, datos: todo centralizado por proyecto, sin planillas paralelas.',
    tint: 'from-[#6d37ac] to-[#31184e]',
  },
  {
    n: '06',
    title: 'Campañas',
    desc: 'Correos masivos a tus cuentas y contactos, directo desde el CRM. Sin exportar listas a otra herramienta.',
    tint: 'from-[#7e3ec6] to-[#381b5a]',
  },
]

function QueEs() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="que-es" ref={ref} className="relative py-28 md:py-36">
      <div className="mx-auto w-[min(94vw,1100px)]">
        <p className="reveal font-mono2 text-xs tracking-[0.35em] text-[#a855f7]">QUÉ ES PULPO CRM</p>
        <h2 className="reveal font-display mt-6 uppercase leading-[0.95] text-[clamp(2.4rem,6vw,5.5rem)]">
          Seis cosas. <span className="neon-stroke">Contadas con los tentáculos…</span>{' '}
          <span className="neon-fill">¡y nos sobran!</span>
        </h2>

        <div className="mt-16">
          {FEATURES.map((f, i) => (
            <div
              key={f.n}
              className="sticky mb-6"
              style={{ top: `calc(96px + ${i * 28}px)` }}
            >
              <div
                className={`glow-card flex flex-col md:flex-row md:items-center gap-6 rounded-3xl bg-gradient-to-br ${f.tint} p-8 md:p-14 min-h-[300px]`}
              >
                <span className="font-display text-6xl md:text-8xl neon-stroke leading-none">{f.n}</span>
                <div>
                  <h3 className="font-display uppercase text-4xl md:text-6xl neon-fill">{f.title}</h3>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#c9b8dd]">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal mt-10 text-center font-mono2 text-sm tracking-widest text-[#9b8bb0]">
          ¿Y EL RESTO DE LOS MÓDULOS? <span className="text-[#d8b4fe]">NO EXISTEN. DE NADA.</span>
        </p>
      </div>
    </section>
  )
}

/* ---------- tus datos ---------- */
function Datos() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="datos" ref={ref} className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a855f7]/12 blur-[130px]" />
      <div className="relative mx-auto w-[min(94vw,1100px)] text-center">
        <p className="reveal font-mono2 text-xs tracking-[0.35em] text-[#a855f7]">PRIVACIDAD REAL</p>
        <h2 className="reveal font-display mt-8 uppercase leading-[0.92] text-[clamp(3rem,9vw,8rem)]">
          <span className="block neon-stroke">Sin nube.</span>
          <span className="block neon-fill">Tus datos</span>
          <span className="block neon-stroke">son tuyos.</span>
        </h2>
        <p className="reveal mx-auto mt-10 max-w-2xl text-xl leading-relaxed text-[#9b8bb0]">
          Pulpo no vive en el servidor de un tercero. Tu cartera de clientes no alimenta ningún algoritmo ajeno, no se
          vende, no se "anonimiza". <span className="text-[#f4eefb] font-semibold">Eres dueño del 100% de tu información</span>,
          como debe ser.
        </p>
        <div className="reveal mt-12 flex flex-wrap justify-center gap-3 font-mono2 text-xs tracking-widest">
          {['100% TUYO', 'SIN SUSCRIPCIÓN DE DATOS', 'SIN TERCEROS', 'SIN LETRA CHICA'].map((t) => (
            <span key={t} className="rounded-full border border-[#a855f7]/40 px-5 py-2.5 text-[#d8b4fe]">
              {t}
            </span>
          ))}
        </div>
      </div>
      <Marquee
        slow
        className="mt-20 border-y border-[#a855f7]/20"
        items={['Tus datos son tuyos', '100%', 'Sin nube', 'Tus datos son tuyos', '100%', 'Sin nube']}
      />
    </section>
  )
}

/* ---------- autónomos ---------- */
function Autonomos() {
  const ref = useReveal<HTMLElement>()
  const tareas = [
    'cotizar',
    'vender',
    'cobrar',
    'entregar',
    'responder correos',
    'recordar todo',
    'postular',
    'facturar',
  ]
  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute top-0 right-0 h-[400px] w-[600px] rounded-full bg-[#a855f7]/10 blur-[120px]" />
      <div className="relative mx-auto grid w-[min(94vw,1100px)] items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div className="reveal order-2 lg:order-1">
          <img
            src={pulpo}
            alt="Un pulpo haciendo mil tareas a la vez, como todo autónomo"
            className="pulpo-float pulpo-wiggle mx-auto w-full max-w-[360px] cursor-pointer"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="reveal font-mono2 text-xs tracking-[0.35em] text-[#a855f7]">HECHO PARA AUTÓNOMOS</p>
          <h2 className="reveal font-display mt-6 uppercase leading-[0.95] text-[clamp(2.4rem,6vw,5rem)]">
            Si trabajas por tu cuenta, <span className="neon-fill">ya eres un pulpo.</span>
          </h2>
          <p className="reveal mt-8 text-xl leading-relaxed text-[#9b8bb0]">
            Haces mil tareas a la vez:{' '}
            {tareas.map((t, i) => (
              <span key={t}>
                <span className="text-[#d8b4fe]">{t}</span>
                {i < tareas.length - 1 ? ', ' : '…'}
              </span>
            ))}{' '}
            y con un solo cerebro para todo.
          </p>
          <p className="reveal mt-6 text-xl leading-relaxed text-[#9b8bb0]">
            <span className="text-[#f4eefb] font-semibold">PulpoCRM llega a ordenarte los tentáculos:</span> cada
            cliente, cada promesa y cada negocio en su lugar, para que uses tus ocho brazos en vender y no en buscar
            ese correo que juraste haber guardado.
          </p>
          <p className="reveal mt-8 font-mono2 text-sm tracking-widest text-[#d8b4fe]">
            EL CRM IDEAL PARA AUTÓNOMOS. LITERALMENTE: ES UN PULPO.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ---------- comparación ---------- */
const COMPARE: { label: string; tipico: boolean; pulpo: boolean }[] = [
  { label: 'Lo entiendes el primer día', tipico: false, pulpo: true },
  { label: 'Solo lo que usas: cuentas, contactos, actividades, pipeline', tipico: false, pulpo: true },
  { label: 'Tus datos son 100% tuyos (sin nube)', tipico: false, pulpo: true },
  { label: 'Un solo plan, sin comparar tablas de precios', tipico: false, pulpo: true },
  { label: 'Dashboards infinitos que nadie mira', tipico: true, pulpo: false },
]

function Comparacion() {
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} className="py-28 md:py-36">
      <div className="mx-auto w-[min(94vw,1000px)]">
        <p className="reveal font-mono2 text-xs tracking-[0.35em] text-[#a855f7]">LA DIFERENCIA</p>
        <h2 className="reveal font-display mt-6 uppercase leading-[0.95] text-[clamp(2.4rem,6vw,5rem)]">
          CRM típico <span className="neon-stroke">vs.</span> <span className="neon-fill">Pulpo</span>
        </h2>

        <div className="reveal mt-14 overflow-hidden rounded-3xl border border-[#a855f7]/25">
          <div className="grid grid-cols-[1fr_110px_110px] md:grid-cols-[1fr_180px_180px] font-mono2 text-xs tracking-widest">
            <div className="p-4 md:p-6" />
            <div className="p-4 md:p-6 text-center text-[#9b8bb0] border-l border-[#a855f7]/15">CRM TÍPICO</div>
            <div className="p-4 md:p-6 text-center text-[#d8b4fe] border-l border-[#a855f7]/15 bg-[#a855f7]/10">PULPO</div>
          </div>
          {COMPARE.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1fr_110px_110px] md:grid-cols-[1fr_180px_180px] items-center ${i % 2 ? 'bg-[#170d24]/60' : ''}`}
            >
              <div className="p-4 md:p-6 text-base md:text-lg text-[#e6dcf5]">{row.label}</div>
              <div className="p-4 md:p-6 text-center text-2xl border-l border-[#a855f7]/15">
                {row.tipico ? <span className="text-[#9b8bb0]">✓</span> : <span className="text-[#5a4a6e]">✗</span>}
              </div>
              <div className="p-4 md:p-6 text-center text-2xl border-l border-[#a855f7]/15 bg-[#a855f7]/10">
                {row.pulpo ? (
                  <span className="text-[#ffeb85]" style={{ textShadow: '0 0 16px rgba(255,235,133,0.6)' }}>✓</span>
                ) : (
                  <span className="text-[#5a4a6e]">✗</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- el plan ---------- */
function Plan() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="plan" ref={ref} className="relative py-28 md:py-40">
      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#a855f7]/15 blur-[140px]" />
      <div className="relative mx-auto w-[min(94vw,900px)] text-center">
        <p className="reveal font-mono2 text-xs tracking-[0.35em] text-[#a855f7]">PLANES Y PRECIOS</p>
        <h2 className="reveal font-display mt-6 uppercase leading-[0.92] text-[clamp(3rem,8vw,7rem)]">
          <span className="neon-fill">Planes:</span> <span className="neon-stroke">uno.</span>
        </h2>
        <p className="reveal mt-6 text-xl text-[#9b8bb0]">
          Sí, leíste bien. <span className="text-[#f4eefb] font-semibold">Un solo plan.</span> Elegir un CRM ya es
          suficiente decisión por hoy.
        </p>

        <div className="reveal glow-card mx-auto mt-14 max-w-xl rounded-3xl p-10 md:p-14 text-left">
          <div className="flex items-center justify-between">
            <h3 className="font-display uppercase text-3xl md:text-4xl neon-fill">El Plan Pulpo</h3>
            <img src={pulpo} alt="" className="h-14 w-14 object-contain pulpo-float" />
          </div>

          <div className="mt-10 space-y-6">
            <div className="flex items-end justify-between border-b border-[#a855f7]/20 pb-6">
              <div>
                <p className="font-mono2 text-xs tracking-widest text-[#9b8bb0]">SETEO INICIAL · UNA SOLA VEZ</p>
                <p className="mt-1 text-sm text-[#9b8bb0]">Instalación, configuración y tus datos cargados</p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl md:text-3xl text-[#5a4a6e] line-through decoration-[#a855f7] decoration-2">
                  {PRECIO_SETEO}
                </p>
                <p
                  className="font-display text-4xl md:text-5xl text-[#ffeb85]"
                  style={{ textShadow: '0 0 20px rgba(255,235,133,0.5)' }}
                >
                  ¡GRATIS!
                </p>
              </div>
            </div>
            <div className="flex items-end justify-between border-b border-[#a855f7]/20 pb-6">
              <div>
                <p className="font-mono2 text-xs tracking-widest text-[#9b8bb0]">DESPUÉS · MENSUAL</p>
                <p className="mt-1 text-sm text-[#9b8bb0]">Bajísimo. En serio.</p>
              </div>
              <div className="text-right">
                <p className="font-display text-4xl md:text-5xl neon-fill">
                  {PRECIO_MENSUAL}
                  <span className="ml-1 font-mono2 text-sm text-[#9b8bb0]">/mes</span>
                </p>
                <p className="mt-1 font-mono2 text-[11px] tracking-wider text-[#9b8bb0]">
                  (4 USD SI ESTÁS FUERA DE CHILE)
                </p>
              </div>
            </div>
            <div className="flex items-end justify-between border-b border-[#a855f7]/20 pb-6">
              <div>
                <p className="font-mono2 text-xs tracking-widest text-[#9b8bb0]">O MEJOR AÚN · PAGO ANUAL</p>
                <p className="mt-1 text-sm text-[#9b8bb0]">Un pago al año y te olvidas</p>
              </div>
              <div className="text-right">
                <p className="font-display text-4xl md:text-5xl neon-fill">
                  $25.000
                  <span className="ml-1 font-mono2 text-sm text-[#9b8bb0]">/año</span>
                </p>
                <p className="mt-1 font-mono2 text-[11px] tracking-wider text-[#9b8bb0]">(33 USD)</p>
              </div>
            </div>
          </div>

          <ul className="mt-8 space-y-3 text-[#c9b8dd]">
            {[
              'Todo incluido: cuentas, contactos, actividades y pipeline',
              'Tus datos son tuyos desde el día uno',
              'Soporte directo con un humano (yo)',
              'Updates y mejoras gratis, para siempre',
              'Sin permanencia, sin sorpresas, sin "plan enterprise"',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="text-[#ffeb85]">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <a
            href="#agenda"
            className="mt-10 block rounded-full bg-[#a855f7] py-4 text-center font-mono2 text-sm font-bold tracking-wider text-[#0e0816] transition-all hover:bg-[#c084fc] hover:shadow-[0_0_32px_rgba(168,85,247,0.7)]"
          >
            QUIERO EL PLAN PULPO →
          </a>
        </div>

        <p className="reveal mt-8 font-mono2 text-xs tracking-widest text-[#9b8bb0]">
          ¿COMPARAR CON EL PLAN "PRO" Y EL "ENTERPRISE"? <span className="text-[#d8b4fe]">NO HAY. ESE ES EL CHISTE.</span>
        </p>
      </div>
    </section>
  )
}

/* ---------- agenda ---------- */
function Agenda() {
  const ref = useReveal<HTMLElement>()
  return (
    <section id="agenda" ref={ref} className="py-28 md:py-36">
      <div className="mx-auto w-[min(94vw,900px)]">
        <div className="text-center">
          <p className="reveal font-mono2 text-xs tracking-[0.35em] text-[#a855f7]">AGENDA</p>
          <h2 className="reveal font-display mt-6 uppercase leading-[0.95] text-[clamp(2.4rem,6vw,5rem)]">
            15 minutos <span className="neon-stroke">con un humano</span>
          </h2>
          <p className="reveal mx-auto mt-6 max-w-xl text-lg text-[#9b8bb0]">
            Sin demo guiada de 90 minutos ni "llamada de descubrimiento". Un cuarto de hora, te muestro Pulpo y
            resolvemos si te sirve. Elige tu hora aquí:
          </p>
        </div>

        <div className="reveal mt-12">
          {calendarReady ? (
            <div>
              <iframe
                src={CALENDAR_URL}
                title="Agenda una llamada de 15 minutos"
                className="h-[640px] w-full rounded-3xl border border-[#a855f7]/30 bg-white"
                loading="lazy"
              />
              <p className="mt-4 text-center font-mono2 text-xs tracking-widest text-[#9b8bb0]">
                ¿NO CARGA EL CALENDARIO?{' '}
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#d8b4fe] underline underline-offset-4 hover:text-[#c084fc]"
                >
                  ÁBRELO AQUÍ →
                </a>
              </p>
            </div>
          ) : (
            /* SLOT PARA GOOGLE CALENDAR — pega tu URL de "citas de Google Calendar"
               en la constante CALENDAR_URL al inicio de este archivo y este
               recuadro se reemplaza automáticamente por el calendario real. */
            <div className="cal-slot flex h-[420px] w-full flex-col items-center justify-center gap-5 rounded-3xl p-8 text-center">
              <img src={pulpo} alt="" className="h-20 w-20 object-contain pulpo-float" />
              <p className="font-display uppercase text-2xl md:text-3xl neon-stroke">Aquí va tu Google Calendar</p>
              <p className="max-w-md font-mono2 text-xs leading-relaxed tracking-wider text-[#9b8bb0]">
                SLOT RESERVADO — PEGA EL LINK DE TU AGENDA DE CITAS DE GOOGLE CALENDAR Y ESTE RECUADRO SE CONVIERTE EN
                TU CALENDARIO REAL
              </p>
            </div>
          )}
        </div>

        <p className="reveal mt-8 text-center text-[#9b8bb0]">
          ¿Prefieres escribir directo?{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-[#d8b4fe] underline underline-offset-4 hover:text-[#c084fc]">
            Hablemos por WhatsApp
          </a>
        </p>
      </div>
    </section>
  )
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-[#a855f7]/20 pt-20 pb-10">
      <div className="mx-auto w-[min(94vw,1200px)] text-center">
        <p className="font-display uppercase leading-none text-[clamp(3.5rem,12vw,11rem)] select-none">
          <BounceWord word="PULPO" className="neon-fill cursor-default" />{' '}
          <BounceWord word="CRM" className="neon-stroke cursor-default" />
        </p>
        <p className="mt-8 font-mono2 text-xs tracking-[0.3em] text-[#9b8bb0]">
          TODAS TUS VISITAS EN UN SOLO LUGAR, FÁCIL
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 font-mono2 text-xs tracking-widest text-[#9b8bb0]">
          <a href="#que-es" className="hover:text-[#d8b4fe] transition-colors">QUÉ ES</a>
          <span className="text-[#a855f7]">✦</span>
          <a href="#datos" className="hover:text-[#d8b4fe] transition-colors">TUS DATOS</a>
          <span className="text-[#a855f7]">✦</span>
          <a href="#plan" className="hover:text-[#d8b4fe] transition-colors">EL PLAN</a>
          <span className="text-[#a855f7]">✦</span>
          <a href="#agenda" className="hover:text-[#d8b4fe] transition-colors">AGENDA</a>
        </div>
        <p className="mt-10 font-mono2 text-[10px] tracking-widest text-[#5a4a6e]">
          © {new Date().getFullYear()} PULPO CRM — HECHO CON TENTÁCULOS
        </p>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Problema />
      <QueEs />
      <Autonomos />
      <Datos />
      <Comparacion />
      <Plan />
      <Agenda />
      <Footer />
    </main>
  )
}
