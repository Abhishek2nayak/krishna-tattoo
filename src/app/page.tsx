"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { KrishnaFooter } from "@/components/ui/modem-animated-footer"
import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx"

// ── Local images ─────────────────────────────────────────────────────────────
const T = (n: number) => `/tattoo-gallery/tattoo-${String(n).padStart(2, "0")}.jpeg`

const IMG = {
  // named aliases for semantic use
  portrait1: T(1), sleeve1: T(2), tribal1: T(3), coverup1: T(4),
  custom1: T(5), portrait2: T(6), sleeve2: T(7), tribal2: T(8),
  custom2: T(9), portrait3: T(10), tribal3: T(11), coverup2: T(12),
  custom3: T(13), sleeve3: T(14), portrait4: T(15), tribal4: T(16),
  custom4: T(17), coverup3: T(18), sleeve4: T(19), custom5: T(20),
  artist: "/artist/artist-abhishek.jpeg",
  artist2: "/artist/artist-vishal.jpeg",
}

// scrolling wall columns
const COL1 = [IMG.portrait1, IMG.tribal1, IMG.sleeve2, IMG.custom3]
const COL2 = [IMG.tribal2, IMG.coverup1, IMG.portrait2, IMG.sleeve3]
const COL3 = [IMG.custom1, IMG.portrait3, IMG.tribal3, IMG.coverup2]

const WORKS = [
  { n: "01", title: "Divine Shiva", cat: "God Tattoo", artist: "Abhi", img: T(1) },
  { n: "02", title: "Monochrome Portrait", cat: "Portrait Tattoo", artist: "Abhi", img: T(9) },
  { n: "03", title: "Fine Line Art", cat: "Minimal Tattoo", artist: "Vishal", img: T(7) },
  { n: "04", title: "Sacred Geometry", cat: "Geometry Tattoo", artist: "Vishal", img: T(20) },
  { n: "05", title: "Dark Rose Sleeve", cat: "Flower Tattoo", artist: "Vishal", img: T(19) },
]

const HOME_SERVICES = [
  { id: "god", n: "01", title: "God Tattoos", tagline: "Devotion etched in skin", subtitle: "Divine portraits from Shiva to Ganesha, rendered with surgical realism and deep reverence.", img: T(1), galleryFilter: "God Tattoo" },
  { id: "portrait", n: "02", title: "Portrait Tattoos", tagline: "Faces that breathe on skin", subtitle: "Hyper-realistic portraits capturing emotion, not just likeness. Our signature artistry.", img: T(9), galleryFilter: "Portrait Tattoo" },
  { id: "minimal", n: "03", title: "Minimal Tattoos", tagline: "Less ink, more meaning", subtitle: "Delicate linework and fine-line art. Restraint is its own mastery — clean, precise, timeless.", img: T(7), galleryFilter: "Minimal Tattoo" },
  { id: "geometry", n: "04", title: "Geometry Tattoos", tagline: "Sacred shapes, precise lines", subtitle: "Mathematically balanced sacred geometry and mandala work — the pinnacle of technical tattooing.", img: T(20), galleryFilter: "Geometry Tattoo" },
  { id: "flower", n: "05", title: "Flower Tattoos", tagline: "Botanical art in ink", subtitle: "From dark Japanese botanicals to delicate wildflowers — nature made permanent with extraordinary depth.", img: T(19), galleryFilter: "Flower Tattoo" },
]

const homeFxSections = HOME_SERVICES.map((s) => ({
  id: s.id,
  background: s.img,
  leftLabel: (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#E8FF00", letterSpacing: "0.15em" }}>{s.n}</span>
      <span style={{ fontSize: "0.7rem", color: "rgba(240,240,240,0.4)", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontWeight: 500 }}>{s.tagline}</span>
    </div>
  ),
  title: s.title,
  rightLabel: (
    <Link href={`/gallery?filter=${s.galleryFilter}`} style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(232,255,0,0.7)", letterSpacing: "0.2em", textDecoration: "none" }}
      onClick={(e) => e.stopPropagation()}>
      VIEW →
    </Link>
  ),
  subtitle: s.subtitle,
  ctaHref: `/gallery?filter=${s.galleryFilter}`,
  ctaLabel: `View ${s.title} Gallery`,
}))

const CAROUSEL = [T(1), T(9), T(7), T(20), T(19), T(4)]

// ── Count-up ────────────────────────────────────────────────────────────────
function useCountUp(target: number, active: boolean) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now(); const dur = 1800; let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      setV(Math.floor(target * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target])
  return v
}

// ── Cursor image preview ────────────────────────────────────────────────────
function CursorPreview({ images, idx }: { images: string[]; idx: number | null }) {
  const el = useRef<HTMLDivElement>(null)
  const raw = useRef({ x: 0, y: 0 })
  const sm = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const mv = (e: MouseEvent) => { raw.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener("mousemove", mv)
    let id: number
    const tick = () => {
      sm.current.x += (raw.current.x - sm.current.x) * 0.11
      sm.current.y += (raw.current.y - sm.current.y) * 0.11
      if (el.current) el.current.style.transform = `translate3d(${sm.current.x + 26}px,${sm.current.y - 155}px,0)`
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(id) }
  }, [])
  return (
    <div ref={el} className="pointer-events-none fixed top-0 left-0 will-change-transform"
      style={{ zIndex: 250, width: 290, height: 192, opacity: idx !== null ? 1 : 0, transition: "opacity 0.2s" }}>
      <div className="relative w-full h-full overflow-hidden">
        {images.map((src, i) => (
          <img key={i} src={src} alt="" className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: idx === i ? 1 : 0, transform: `scale(${idx === i ? 1 : 1.06})`, transition: "opacity 0.36s, transform 0.36s", filter: "contrast(1.2) brightness(0.82)" }} />
        ))}
        <div className="absolute inset-0" style={{ border: "1px solid rgba(232,255,0,0.5)" }} />
      </div>
    </div>
  )
}

// ── Scrolling image column ──────────────────────────────────────────────────
function ImageColumn({ images, cls }: { images: string[]; cls: string }) {
  const doubled = [...images, ...images]
  return (
    <div className="flex-1 overflow-hidden">
      <div className={cls}>
        {doubled.map((src, i) => (
          <div key={i} className="w-full overflow-hidden" style={{ aspectRatio: "3/4", marginBottom: "4px" }}>
            <img src={src} alt="" className="w-full h-full object-cover"
              style={{ filter: "contrast(1.15) brightness(0.75) grayscale(0.1)" }} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 3D Carousel ─────────────────────────────────────────────────────────────
function TattooCarousel() {
  const [cur, setCur] = useState(2)
  const next = () => setCur(c => (c + 1) % CAROUSEL.length)
  const prev = () => setCur(c => (c - 1 + CAROUSEL.length) % CAROUSEL.length)
  useEffect(() => { const t = setInterval(next, 4200); return () => clearInterval(t) }, [])
  return (
    <section className="py-20 overflow-hidden" style={{ background: "#060606" }}>
      <div className="px-6 lg:px-14 max-w-7xl mx-auto mb-10 flex items-center justify-between">
        <p className="section-label">Featured Work</p>
        <div className="flex gap-2">
          {[prev, next].map((fn, i) => (
            <button key={i} onClick={fn}
              className="w-9 h-9 border flex items-center justify-center transition-all duration-300"
              style={{ borderColor: "rgba(255,255,255,0.1)", color: "#444" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--blue)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--blue)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "#444" }}>
              {i === 0 ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
            </button>
          ))}
        </div>
      </div>
      <div className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center" style={{ perspective: "1100px" }}>
        {CAROUSEL.map((src, i) => {
          const total = CAROUSEL.length
          let offset = (i - cur + total) % total
          if (offset > total / 2) offset -= total
          const isC = offset === 0; const isA = Math.abs(offset) === 1
          return (
            <div key={i} className="absolute overflow-hidden transition-all duration-500 ease-in-out"
              style={{ width: isC ? "260px" : "200px", height: isC ? "380px" : "300px", transform: `translateX(${offset * 46}%) rotateY(${offset * -15}deg)`, zIndex: isC ? 10 : isA ? 5 : 1, opacity: isC ? 1 : isA ? 0.38 : 0, filter: isC ? "none" : "blur(4px)", visibility: Math.abs(offset) > 1 ? "hidden" : "visible" }}>
              <img src={src} alt="" className="w-full h-full object-cover" style={{ filter: "contrast(1.15) brightness(0.82)" }} />
              {isC && <div className="absolute inset-0" style={{ border: "1px solid rgba(232,255,0,0.45)" }} />}
            </div>
          )
        })}
      </div>
      <div className="flex justify-center gap-2 mt-8">
        {CAROUSEL.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} className="transition-all duration-300"
            style={{ width: cur === i ? "24px" : "6px", height: "6px", background: cur === i ? "var(--blue)" : "rgba(255,255,255,0.12)" }} />
        ))}
      </div>
    </section>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [worksIdx, setWorksIdx] = useState<number | null>(null)
  const [statsOn, setStatsOn] = useState(false)
  const [time, setTime] = useState("")
  const statsRef = useRef<HTMLDivElement>(null)

  const clients = useCountUp(5000, statsOn)
  const pieces = useCountUp(3200, statsOn)
  const yrs = useCountUp(8, statsOn)

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setTime(`${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`)
    }
    tick(); const intv = setInterval(tick, 1000)
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true) }, { threshold: 0.3 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => { clearInterval(intv); obs.disconnect() }
  }, [])

  return (
    <main className="overflow-x-hidden">

      <CursorPreview images={WORKS.map(w => w.img)} idx={worksIdx} />

      {/* ══════════════════════════════════════════════════════
          HERO — split layout
          LEFT : brand typography + CTA
          RIGHT: three-column live-scrolling image wall
      ══════════════════════════════════════════════════════ */}
      <section className="overflow-hidden" style={{ height: "100svh", background: "#060606", display: "flex" }}>

        {/* ── Left panel ── */}
        <div className="flex flex-col justify-between py-28 px-8 lg:px-14 w-full md:w-[52%] shrink-0">

          {/* Top meta */}
          <motion.div className="flex items-center justify-between text-[10px] tracking-[0.32em] uppercase"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.9 }}>
            <div className="flex items-center gap-3" style={{ color: "#2e2e2e" }}>
              <span className="status-dot animate-blink" />
              Open · Mon–Sat
            </div>
            <span className="mono hidden sm:block" style={{ color: "var(--blue)" }}>{time || "—"} IST</span>
          </motion.div>

          {/* Main headline */}
          <div>
            <motion.p className="section-label flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
              <span className="w-6 h-px" style={{ background: "var(--blue)" }} />
              Est. 2016 · Ahmedabad
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3.8rem, 9.5vw, 11rem)", lineHeight: 0.87, fontWeight: 400, color: "#EDEDEA", letterSpacing: "-0.025em" }}
                initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
                KRISHNA
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3.8rem, 9.5vw, 11rem)", lineHeight: 0.87, fontWeight: 700, fontStyle: "italic", color: "var(--blue)", letterSpacing: "-0.025em" }}
                initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.78, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
                TATTOO
              </motion.h1>
            </div>

            <motion.p className="mt-7 text-[15px] leading-relaxed max-w-sm" style={{ color: "#3a3a3a" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.9 }}>
              Eight years of permanent artistry.<br />
              No flash. No copies. Only yours.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4 mt-9"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45, duration: 0.8 }}>
              <Link href="/contact" className="btn-brutal">Book a Session <ArrowUpRight size={13} /></Link>
              <Link href="/gallery" className="btn-ghost">View Gallery</Link>
            </motion.div>
          </div>

          {/* Bottom stats */}
          <motion.div className="flex items-center gap-8 lg:gap-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 0.9 }}>
            {[["8+", "Years"], ["5K+", "Clients"], ["100%", "Custom"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, color: "var(--blue)", lineHeight: 1 }}>{v}</div>
                <div className="text-[9px] tracking-[0.35em] uppercase mt-1" style={{ color: "#2a2a2a" }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right panel: live scrolling image wall ── */}
        <motion.div
          className="hidden md:flex flex-1 gap-[4px] overflow-hidden"
          style={{ position: "relative" }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>

          <ImageColumn images={COL1} cls="col-scroll-1" />
          <ImageColumn images={COL2} cls="col-scroll-2" />
          <ImageColumn images={COL3} cls="col-scroll-3" />

          {/* Left edge fade — blends into the text panel */}
          <div className="absolute inset-y-0 left-0 w-20 pointer-events-none"
            style={{ background: "linear-gradient(to right, #060606, transparent)" }} />
          {/* Top/bottom fades */}
          <div className="absolute inset-x-0 top-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #060606, transparent)" }} />
          <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(to top, #060606, transparent)" }} />
        </motion.div>

        {/* Mobile: bottom image strip (md hidden) */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 h-[220px] overflow-hidden">
          <div className="flex gap-2 h-full px-6">
            {[IMG.portrait1, IMG.sleeve1, IMG.tribal1, IMG.coverup1].map((src, i) => (
              <div key={i} className="flex-1 overflow-hidden" style={{ borderRadius: "3px" }}>
                <img src={src} alt="" className="w-full h-full object-cover" style={{ filter: "contrast(1.15) brightness(0.75)" }} />
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 top-0 h-12 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #060606, transparent)" }} />
        </div>

      </section>

      {/* ══════════════════
          TICKER
      ══════════════════ */}
      <div className="py-[14px] overflow-hidden border-y" style={{ background: "var(--blue)", borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(4).fill(null).map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-8 text-[11px] tracking-[0.32em] uppercase font-bold shrink-0" style={{ color: "#080808" }}>
              <span>★ God Tattoos</span><span>★ Portrait Tattoos</span><span>★ Minimal Tattoos</span>
              <span>★ Geometry Tattoos</span><span>★ Flower Tattoos</span><span>★ 8 Years</span><span>★ 5000+ Clients</span><span>★ Ahmedabad</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SELECTED WORKS — project-showcase hover
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-14 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label mb-3">Selected Works</p>
              <motion.h2 className="display leading-[0.92]" style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "#EDEDEA" }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                The Work.<br /><span className="italic" style={{ color: "var(--blue)" }}>The Proof.</span>
              </motion.h2>
            </div>
            <Link href="/gallery" className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase transition-colors duration-300" style={{ color: "#383838" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--blue)")} onMouseLeave={e => (e.currentTarget.style.color = "#383838")}>
              View All <ArrowUpRight size={12} />
            </Link>
          </div>
          {WORKS.map((w, i) => (
            <motion.div key={w.n} className="group border-t cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.05)" }}
              onMouseEnter={() => setWorksIdx(i)} onMouseLeave={() => setWorksIdx(null)}
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: i * 0.06 }} viewport={{ once: true }}>
              <div className="py-6 flex items-center gap-6 lg:gap-10">
                <span className="mono text-xs w-8 shrink-0 transition-colors duration-300" style={{ color: worksIdx === i ? "var(--blue)" : "#222" }}>{w.n}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="display truncate transition-colors duration-300" style={{ fontSize: "clamp(1.5rem,3.4vw,3rem)", color: worksIdx === i ? "#fff" : "#EDEDEA" }}>{w.title}</h3>
                  <p className="text-[11px] tracking-[0.2em] uppercase mt-1 transition-colors duration-300" style={{ color: worksIdx === i ? "#555" : "#222" }}>{w.cat} · {w.artist}</p>
                </div>
                <div className="shrink-0 w-8 h-8 border flex items-center justify-center transition-all duration-300"
                  style={{ borderColor: worksIdx === i ? "var(--blue)" : "rgba(255,255,255,0.06)", color: worksIdx === i ? "var(--blue)" : "#181818" }}>
                  <ArrowUpRight size={12} />
                </div>
              </div>
              <div className="h-px transition-all duration-500" style={{ width: worksIdx === i ? "100%" : "0%", background: "var(--blue)" }} />
            </motion.div>
          ))}
          <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }} />
        </div>
      </section>

      {/* ══════════════════════════
          3D CAROUSEL
      ══════════════════════════ */}
      <TattooCarousel />

      {/* ══════════════════════════════════════════
          ARTISTS — editorial, photo-only
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-14 overflow-hidden" style={{ background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <p className="section-label">The Artists</p>
            <Link href="/about" className="flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase transition-colors duration-300" style={{ color: "#383838" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--blue)")} onMouseLeave={e => (e.currentTarget.style.color = "#383838")}>
              Full Story <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "Abhi", role: "Portrait Realism · Black & Grey", years: "8 Yrs", img: IMG.artist },
              { name: "Vishal", role: "Tribal · Geometric · Cover-Up", years: "6 Yrs", img: IMG.artist2 },
            ].map((a, i) => (
              <motion.div key={a.name} className="group relative overflow-hidden img-zoom cursor-pointer" style={{ height: "500px" }}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.12 }} viewport={{ once: true }}>
                <img src={a.img} alt={a.name}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.05]"
                  style={{ filter: "grayscale(0.4) contrast(1.1) brightness(0.68)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent" />
                {/* Top-right corner tag */}
                <div className="absolute top-6 right-6 px-3 py-1 text-[9px] font-bold tracking-[0.3em] uppercase" style={{ background: "var(--blue)", color: "#080808" }}>{a.years}</div>
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.6rem,5vw,4.8rem)", fontWeight: 700, color: "#EDEDEA", lineHeight: 0.95, letterSpacing: "-0.02em" }}>{a.name}</h3>
                  <p className="text-[11px] tracking-[0.22em] uppercase mt-2" style={{ color: "#444" }}>{a.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════
          STATS STRIP
      ══════════════════════ */}
      <section ref={statsRef} className="py-12 px-6 lg:px-14 border-y overflow-hidden"
        style={{ background: "#060606", borderColor: "rgba(255,255,255,0.04)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-3">
          {[
            { v: `${yrs}+`, l: "Years" },
            { v: `${clients.toLocaleString()}+`, l: "Clients" },
            { v: `${pieces.toLocaleString()}+`, l: "Pieces" },
          ].map((s, i) => (
            <motion.div key={i} className="text-center py-4 border-r last:border-r-0" style={{ borderColor: "rgba(255,255,255,0.04)" }}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
              <div style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem,6vw,5.5rem)", fontWeight: 900, lineHeight: 1, color: "var(--blue)" }}>{s.v}</div>
              <div className="text-[10px] tracking-[0.38em] uppercase mt-1" style={{ color: "#282828" }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES — full-screen scroll showcase
      ══════════════════════════════════════════ */}
      <div style={{ background: "#060606" }}>
        <div className="px-6 lg:px-14 pt-20 pb-4 max-w-7xl mx-auto flex items-end justify-between">
          <div>
            <p className="section-label mb-3">What We Do</p>
            <motion.h2 className="display leading-[0.92]" style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)", color: "#EDEDEA" }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              Five Ways<br /><span className="italic" style={{ color: "var(--blue)" }}>We Create.</span>
            </motion.h2>
          </div>
          <Link href="/services" className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase transition-colors duration-300" style={{ color: "#383838" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--blue)")} onMouseLeave={e => (e.currentTarget.style.color = "#383838")}>
            All Services <ArrowUpRight size={12} />
          </Link>
        </div>
        <FullScreenScrollFX
          sections={homeFxSections}
          showProgress
          durations={{ change: 0.65, snap: 800 }}
          bgTransition="fade"
          parallaxAmount={3}
          colors={{
            text: "rgba(237,237,234,0.95)",
            overlay: "rgba(0,0,0,0.52)",
            pageBg: "#060606",
            stageBg: "#060606",
          }}
          gap={0}
          gridPaddingX={3.5}
        />
      </div>

      {/* ══════════════════════════════
          IMAGE MOSAIC — 6-panel grid
      ══════════════════════════════ */}
      <section className="overflow-hidden" style={{ background: "#0A0A0A" }}>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-[3px]">
          {[IMG.portrait2, IMG.tribal2, IMG.sleeve3, IMG.sleeve4, IMG.coverup2, IMG.custom4].map((src, i) => (
            <motion.div key={i} className="relative overflow-hidden group cursor-pointer"
              style={{ height: i % 2 === 0 ? "300px" : "255px" }}
              initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: i * 0.05 }} viewport={{ once: true }}>
              <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                style={{ filter: "contrast(1.18) brightness(0.68) grayscale(0.12)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(232,255,0,0.1)" }} />
            </motion.div>
          ))}
        </div>
        <div className="px-6 lg:px-14 py-5 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <p className="section-label">Gallery Preview</p>
          <Link href="/gallery" className="flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase transition-colors duration-300" style={{ color: "#383838" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--blue)")} onMouseLeave={e => (e.currentTarget.style.color = "#383838")}>
            Full Gallery <ArrowUpRight size={12} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA — image backdrop, minimal
      ══════════════════════════════ */}
      <section className="relative py-36 px-6 lg:px-14 overflow-hidden" style={{ background: "#060606" }}>
        <div className="absolute inset-0">
          <img src={IMG.portrait4} alt="Krishna Tattoo Studio Ahmedabad" className="w-full h-full object-cover" style={{ filter: "brightness(0.06) contrast(1.4) grayscale(0.25)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, #060606 85%)" }} />
        </div>
        <motion.div className="relative z-10 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
          <p className="section-label mb-5">Get Inked</p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.8rem,9vw,9rem)", fontWeight: 400, color: "#EDEDEA", lineHeight: 0.93, letterSpacing: "-0.02em" }} className="mb-10">
            Book your<br />
            <span style={{ fontStyle: "italic", fontWeight: 700, color: "var(--blue)" }}>session.</span>
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-brutal">Book a Consultation <ArrowUpRight size={14} /></Link>
            <a href="tel:8979335743" className="btn-ghost">+91 8979 335 743</a>
          </div>
        </motion.div>
      </section>

      <KrishnaFooter />
    </main>
  )
}
