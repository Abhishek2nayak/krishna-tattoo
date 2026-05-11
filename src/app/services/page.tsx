"use client"
import { motion } from "motion/react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { KrishnaFooter } from "@/components/ui/modem-animated-footer"
import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx"

const T = (n: number) => `/tattoo-gallery/tattoo-${String(n).padStart(2,"0")}.jpeg`

const SERVICE_SECTIONS = [
  {
    id: "god",
    n: "01",
    name: "God Tattoos",
    tagline: "Devotion etched in skin",
    subtitle: "From Shiva to Ganesha, Krishna to Durga — we render divine portraits with surgical realism that carries the full weight of faith.",
    duration: "3–8 hrs",
    img: T(1),
    galleryFilter: "God Tattoo",
  },
  {
    id: "portrait",
    n: "02",
    name: "Portrait Tattoos",
    tagline: "Faces that breathe on skin",
    subtitle: "Hyper-realistic portraits so precise they capture not just likeness but emotion — the specific way a person holds their eyes.",
    duration: "4–10 hrs",
    img: T(9),
    galleryFilter: "Portrait Tattoo",
  },
  {
    id: "minimal",
    n: "03",
    name: "Minimal Tattoos",
    tagline: "Less ink, more meaning",
    subtitle: "Delicate linework and fine-line art that prove restraint is its own mastery. Clean, precise, and built to last a lifetime.",
    duration: "1–3 hrs",
    img: T(7),
    galleryFilter: "Minimal Tattoo",
  },
  {
    id: "geometry",
    n: "04",
    name: "Geometry Tattoos",
    tagline: "Sacred shapes, precision lines",
    subtitle: "Mathematically balanced sacred geometry and mandalas. The most technically demanding discipline — flawless symmetry on living skin.",
    duration: "3–8 hrs",
    img: T(20),
    galleryFilter: "Geometry Tattoo",
  },
  {
    id: "flower",
    n: "05",
    name: "Flower Tattoos",
    tagline: "Botanical art in ink",
    subtitle: "From dark Japanese botanicals to delicate wildflowers — nature rendered permanently with extraordinary depth, shadow, and detail.",
    duration: "2–6 hrs",
    img: T(19),
    galleryFilter: "Flower Tattoo",
  },
]

const fxSections = SERVICE_SECTIONS.map((s) => ({
  id: s.id,
  background: s.img,
  leftLabel: (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#E8FF00", letterSpacing: "0.15em" }}>{s.n}</span>
      <span style={{ fontSize: "0.7rem", color: "rgba(240,240,240,0.4)", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontWeight: 500 }}>{s.tagline}</span>
    </div>
  ),
  title: s.name,
  rightLabel: (
    <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "rgba(240,240,240,0.5)", letterSpacing: "0.2em" }}>{s.duration}</span>
  ),
  subtitle: s.subtitle,
  ctaHref: `/gallery?filter=${s.galleryFilter}`,
  ctaLabel: `View ${s.name} Gallery`,
}))

export default function ServicesPage() {
  return (
    <main className="overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section
        className="relative min-h-[70vh] flex items-end pb-24 pt-36 px-6 lg:px-14 overflow-hidden"
        style={{ background: "#080808" }}
      >
        <div className="absolute inset-0">
          <img
            src={T(1)}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.1) contrast(1.3)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #080808 40%, rgba(8,8,8,0.6) 100%)" }}
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 70% at 80% 50%, rgba(232,255,0,0.05), transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.p
            className="section-label flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
          >
            <span className="w-8 h-px" style={{ background: "var(--blue)" }} />
            What We Offer
          </motion.p>
          <motion.h1
            className="font-bold leading-[0.9] mb-8"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3.5rem,9vw,9rem)" }}
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16,1,0.3,1] }}
          >
            <span className="block text-[#EDEDEA]">Five Ways</span>
            <span className="block italic" style={{ color: "var(--blue)" }}>We Create.</span>
          </motion.h1>
          <motion.p
            className="text-[#666] text-lg max-w-lg leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
          >
            Each service is a commitment — to your vision, your skin, and your story.
          </motion.p>
        </div>
      </section>

      {/* ─── FULLSCREEN SCROLL SERVICE SHOWCASE ─── */}
      <FullScreenScrollFX
        sections={fxSections}
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

      {/* ─── PROCESS ─── */}
      <section className="py-28 px-6 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="section-label">The Process</p>
            <h2
              className="mt-3 font-bold"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.2rem,5vw,4.5rem)" }}
            >
              <span className="text-[#EDEDEA]">From Idea </span>
              <span className="italic" style={{ color: "var(--blue)" }}>to Skin</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: "01", title: "Consultation", desc: "We sit with you, understand your vision, your story, and what the tattoo means to you." },
              { n: "02", title: "Design", desc: "Our artists craft a fully custom design — drawn from scratch, never from a template." },
              { n: "03", title: "Approval", desc: "You review the stencil on your skin before a single drop of ink is used." },
              { n: "04", title: "Execution", desc: "The tattoo is applied with surgical precision, in a sterile, professional environment." },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                className="relative pl-6 border-l"
                style={{ borderColor: "rgba(232,255,0,0.2)" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full"
                  style={{ background: "var(--blue)", boxShadow: "0 0 8px rgba(232,255,0,0.4)" }}
                />
                <span className="text-[#333] font-mono text-xs block mb-4">{step.n}</span>
                <h3
                  className="font-bold text-[#EDEDEA] text-xl mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#555] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6 lg:px-14 border-t text-center" style={{ background: "#0A0A0A", borderColor: "rgba(255,255,255,0.05)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
        >
          <p className="section-label mb-5">Ready?</p>
          <h2
            className="font-bold mb-8"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem,6vw,6rem)" }}
          >
            <span className="text-[#EDEDEA]">Book your </span>
            <span className="italic" style={{ color: "var(--blue)" }}>session</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-10 py-4 text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300"
            style={{ background: "var(--blue)", color: "#080808" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EDEDEA")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--blue)")}
          >
            Get in Touch
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <KrishnaFooter />
    </main>
  )
}
