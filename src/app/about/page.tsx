"use client"
import { motion } from "motion/react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { KrishnaFooter } from "@/components/ui/modem-animated-footer"

const ARTISTS = [
  {
    name: "Abhi",
    role: "Lead Artist · Portrait Realism",
    years: "8 Years",
    bio: "Abhi's obsession with hyper-realistic portraits has made him the go-to artist for clients who want a face, memory, or moment captured with surgical precision. His black & grey work is marked by extraordinary depth and contrast — lifelike, not just tattooed.",
    specialty: ["Portrait Realism", "Black & Grey", "Custom Design"],
    img: "/artist/artist-abhishek.jpeg",
  },
  {
    name: "Vishal",
    role: "Senior Artist · Tribal & Geometric",
    years: "6 Years",
    bio: "Vishal's command of tribal geometry — Polynesian, Maori, and custom geometric — is unrivalled in Ahmedabad. His lines are razor-clean, his patterns balanced, and his cover-up transformations are nothing short of miraculous.",
    specialty: ["Tribal & Maori", "Geometric", "Cover-Up Art"],
    img: "/artist/artist-vishal.jpeg",
  },
]

const MILESTONES = [
  { year: "2016", event: "Studio Founded", desc: "Krishna Tattoo opens at Himalaya Mall, Ahmedabad" },
  { year: "2018", event: "1000 Pieces", desc: "Crossed 1,000 custom tattoos with zero flash art" },
  { year: "2020", event: "Vishal Joins", desc: "Tribal & geometric expertise added to the studio" },
  { year: "2022", event: "Cover-Up Mastery", desc: "Became Ahmedabad's most sought-after cover-up studio" },
  { year: "2024", event: "5000 Clients", desc: "Over 5,000 clients from across Gujarat and beyond" },
]

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[80vh] flex items-end pb-24 pt-36 px-6 lg:px-14 overflow-hidden" style={{ background: "#080808" }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/tattoo-gallery/tattoo-03.jpeg"
            alt="Studio"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.12) contrast(1.3) grayscale(0.2)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #080808 50%, transparent)" }} />
        </div>
        {/* Ambient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 70% 50%, rgba(232,255,0,0.05) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.p
            className="section-label flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
          >
            <span className="w-8 h-px" style={{ background: "var(--blue)" }} />
            Est. 2016 · Ahmedabad
          </motion.p>
          <motion.h1
            className="font-bold leading-[0.9] mb-8"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3.5rem,9vw,9rem)" }}
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-[#EDEDEA]">Our</span>
            <span className="block italic" style={{ color: "var(--blue)" }}>Story.</span>
          </motion.h1>
          <motion.p
            className="text-[#666] text-lg max-w-xl leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
          >
            Eight years of transforming the ordinary into the extraordinary. Two artists. One purpose.
            To turn the human body into a living gallery.
          </motion.p>
        </div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section className="py-28 px-6 lg:px-14" style={{ background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }} viewport={{ once: true }}
          >
            <div
              className="relative h-[500px] lg:h-[620px] overflow-hidden img-zoom"
            >
              <div
                className="absolute -top-3 -left-3 right-3 bottom-3 border pointer-events-none z-10"
                style={{ borderColor: "rgba(232,255,0,0.15)" }}
              />
              <img
                src="/tattoo-gallery/tattoo-01.jpeg"
                alt="Studio work"
                className="w-full h-full object-cover"
                style={{ filter: "contrast(1.15) brightness(0.8) grayscale(0.15)" }}
              />
            </div>
          </motion.div>

          <div className="space-y-8">
            <p className="section-label">Our Philosophy</p>
            <motion.h2
              className="font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem,4vw,3.8rem)" }}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }} viewport={{ once: true }}
            >
              No Flash Art.
              <br />
              <span className="italic" style={{ color: "var(--blue)" }}>Only Originals.</span>
            </motion.h2>
            <div className="blue-rule" />
            <p className="text-[#666] leading-relaxed text-[17px]">
              We don't pull designs from a folder. Every tattoo at Krishna Studio starts with a conversation —
              your story, your vision, your skin. We then spend days crafting a design that belongs to you alone.
            </p>
            <div className="blue-rule" />
            <p className="text-[#666] leading-relaxed text-[17px]">
              The result? A piece that doesn't just look good on day one. It ages with you, tells your story
              for a lifetime, and holds up against the finest ink in the world.
            </p>
            <div className="blue-rule" />
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[["8+", "Years"], ["5K+", "Clients"], ["100%", "Custom"]].map(([v, l]) => (
                <div key={l}>
                  <div className="font-bold text-2xl" style={{ color: "var(--blue)", fontFamily: "var(--font-playfair)" }}>{v}</div>
                  <div className="text-[#555] text-xs tracking-[0.25em] uppercase mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARTISTS ─── */}
      <section className="py-28 px-6 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="section-label">Meet the Artists</p>
            <h2
              className="mt-3 font-bold"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.2rem,5vw,4.5rem)" }}
            >
              <span className="text-[#EDEDEA]">The Hands </span>
              <span className="italic" style={{ color: "var(--blue)" }}>Behind the Ink</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {ARTISTS.map((a, i) => (
              <motion.div
                key={a.name}
                className="group"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden img-zoom mb-6" style={{ height: "420px" }}>
                  <img
                    src={a.img}
                    alt={a.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.05]"
                    style={{ filter: "grayscale(0.3) contrast(1.1) brightness(0.75)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div
                      className="inline-block px-3 py-1 text-[9px] font-semibold tracking-[0.25em] uppercase mb-3"
                      style={{ background: "var(--blue)", color: "#080808" }}
                    >
                      {a.years}
                    </div>
                    <h3
                      className="font-bold text-[#EDEDEA] text-4xl"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {a.name}
                    </h3>
                    <p className="text-[#888] text-sm mt-1">{a.role}</p>
                  </div>
                </div>
                <p className="text-[#666] leading-relaxed mb-5">{a.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {a.specialty.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 text-[10px] tracking-[0.2em] uppercase border"
                      style={{ borderColor: "rgba(232,255,0,0.25)", color: "var(--blue)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="py-28 px-6 lg:px-14" style={{ background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="section-label">Our Journey</p>
            <h2
              className="mt-3 font-bold"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.2rem,5vw,4.5rem)" }}
            >
              <span className="text-[#EDEDEA]">Eight Years, </span>
              <span className="italic" style={{ color: "var(--blue)" }}>One Studio</span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[5.5rem] top-0 bottom-0 w-px hidden md:block"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(232,255,0,0.3), transparent)" }}
            />

            <div className="space-y-0">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-7 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.05)" }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="md:w-[5.5rem] flex-shrink-0">
                    <span
                      className="font-bold text-xl"
                      style={{ color: "var(--blue)", fontFamily: "var(--font-playfair)" }}
                    >
                      {m.year}
                    </span>
                  </div>
                  {/* Dot */}
                  <div
                    className="hidden md:block w-2 h-2 rounded-full flex-shrink-0 -ml-1"
                    style={{ background: "var(--blue)", boxShadow: "0 0 8px rgba(232,255,0,0.5)" }}
                  />
                  <div className="md:ml-4">
                    <p
                      className="font-bold text-[#EDEDEA] text-lg"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {m.event}
                    </p>
                    <p className="text-[#555] text-sm mt-1">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 px-6 lg:px-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <p className="section-label mb-5">Start Your Journey</p>
          <h2
            className="font-bold leading-tight mb-8"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem,6vw,6rem)" }}
          >
            <span className="text-[#EDEDEA]">Your story</span>
            <br />
            <span className="italic" style={{ color: "var(--blue)" }}>deserves permanence.</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-10 py-4 text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300"
            style={{ background: "var(--blue)", color: "#080808" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EDEDEA")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--blue)")}
          >
            Book a Consultation
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <KrishnaFooter />
    </main>
  )
}
