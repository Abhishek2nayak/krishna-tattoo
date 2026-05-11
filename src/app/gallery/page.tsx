"use client"
import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { X, ZoomIn } from "lucide-react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { KrishnaFooter } from "@/components/ui/modem-animated-footer"

const T = (n: number) => `/tattoo-gallery/tattoo-${String(n).padStart(2,"0")}.jpeg`

const CATEGORIES = ["All", "God Tattoo", "Portrait Tattoo", "Minimal Tattoo", "Geometry Tattoo", "Flower Tattoo"]

const GALLERY = [
  { id: 1,  cat: "God Tattoo",      title: "Divine Shiva",           artist: "Abhi",   img: T(1),  size: "tall"   },
  { id: 2,  cat: "God Tattoo",      title: "Ganesha Realism",        artist: "Abhi",   img: T(2),  size: "normal" },
  { id: 3,  cat: "God Tattoo",      title: "Krishna Portrait",       artist: "Vishal", img: T(4),  size: "tall"   },
  { id: 4,  cat: "God Tattoo",      title: "Durga Mata",             artist: "Vishal", img: T(6),  size: "normal" },
  { id: 5,  cat: "Portrait Tattoo", title: "Monochrome Face Study",  artist: "Abhi",   img: T(9),  size: "tall"   },
  { id: 6,  cat: "Portrait Tattoo", title: "The Warrior",            artist: "Vishal", img: T(18), size: "normal" },
  { id: 7,  cat: "Minimal Tattoo",  title: "Fine Line Art",          artist: "Abhi",   img: T(7),  size: "tall"   },
  { id: 8,  cat: "Minimal Tattoo",  title: "Delicate Ink",           artist: "Abhi",   img: T(10), size: "normal" },
  { id: 9,  cat: "Minimal Tattoo",  title: "Minimalist Linework",    artist: "Vishal", img: T(13), size: "normal" },
  { id: 10, cat: "Geometry Tattoo", title: "Sacred Geometry",        artist: "Vishal", img: T(20), size: "tall"   },
  { id: 11, cat: "Geometry Tattoo", title: "Geometric Mandala",      artist: "Vishal", img: T(16), size: "normal" },
  { id: 12, cat: "Flower Tattoo",   title: "Dark Rose Sleeve",       artist: "Vishal", img: T(19), size: "tall"   },
  { id: 13, cat: "Flower Tattoo",   title: "Japanese Botanicals",    artist: "Vishal", img: T(14), size: "normal" },
  { id: 14, cat: "Flower Tattoo",   title: "Rose Cover-Up",          artist: "Vishal", img: T(12), size: "normal" },
]

function GalleryContent() {
  const searchParams = useSearchParams()
  const initialFilter = searchParams.get("filter") || "All"
  const validFilter = CATEGORIES.includes(initialFilter) ? initialFilter : "All"

  const [activeFilter, setActiveFilter] = useState(validFilter)
  const [modal, setModal] = useState<typeof GALLERY[0] | null>(null)

  const filtered = activeFilter === "All" ? GALLERY : GALLERY.filter((g) => g.cat === activeFilter)

  return (
    <main className="overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section
        className="relative min-h-[65vh] flex items-end pb-24 pt-36 px-6 lg:px-14 overflow-hidden"
        style={{ background: "#080808" }}
      >
        <div className="absolute inset-0">
          <img
            src={T(3)}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.1) contrast(1.4) grayscale(0.3)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #080808 50%, rgba(8,8,8,0.5))" }}
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 75% 50%, rgba(232,255,0,0.06), transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.p
            className="section-label flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
          >
            <span className="w-8 h-px" style={{ background: "var(--blue)" }} />
            Our Masterpieces
          </motion.p>
          <motion.h1
            className="font-bold leading-[0.9] mb-8"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3.5rem,9vw,9rem)" }}
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16,1,0.3,1] }}
          >
            <span className="block text-[#EDEDEA]">The Work</span>
            <span className="block italic" style={{ color: "var(--blue)" }}>Speaks.</span>
          </motion.h1>
        </div>
      </section>

      {/* ─── FILTER BAR ─── */}
      <div
        className="sticky top-[60px] z-30 px-6 lg:px-14 py-4 border-b"
        style={{ background: "rgba(8,8,8,0.96)", backdropFilter: "blur(24px)", borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveFilter(c)}
              className="flex-shrink-0 px-5 py-2 text-[10px] tracking-[0.22em] uppercase font-semibold transition-all duration-300 border"
              style={{
                background: activeFilter === c ? "var(--blue)" : "transparent",
                color: activeFilter === c ? "#080808" : "#555",
                borderColor: activeFilter === c ? "var(--blue)" : "rgba(255,255,255,0.08)",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ─── MASONRY GRID ─── */}
      <section className="py-16 px-6 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group relative break-inside-avoid mb-4 cursor-pointer img-zoom overflow-hidden"
                  onClick={() => setModal(item)}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ height: item.size === "tall" ? "480px" : "340px" }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      style={{ filter: "contrast(1.1) brightness(0.78) grayscale(0.1)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div
                      className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ borderColor: "rgba(232,255,0,0.5)", color: "var(--blue)" }}
                    >
                      <ZoomIn size={14} />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                      <p className="section-label mb-1">{item.cat}</p>
                      <p className="text-[#EDEDEA] font-bold text-base" style={{ fontFamily: "var(--font-playfair)" }}>
                        {item.title}
                      </p>
                      <p className="text-[#888] text-xs mt-0.5">{item.artist}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ─── LIGHTBOX MODAL ─── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
          >
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }} />
            <motion.div
              className="relative max-w-3xl w-full z-10"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 w-10 h-10 border flex items-center justify-center transition-all duration-300 hover:border-[var(--blue)] hover:text-[var(--blue)]"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "#888" }}
                onClick={() => setModal(null)}
              >
                <X size={16} />
              </button>
              <div className="relative overflow-hidden" style={{ maxHeight: "75vh" }}>
                <img
                  src={modal.img}
                  alt={modal.title}
                  className="w-full h-full object-contain"
                  style={{ filter: "contrast(1.1) brightness(0.9)" }}
                />
              </div>
              <div
                className="px-5 py-4 border-t flex items-center justify-between"
                style={{ background: "#0D0D0D", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div>
                  <p className="section-label">{modal.cat}</p>
                  <p
                    className="text-[#EDEDEA] font-bold mt-1"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {modal.title}
                  </p>
                </div>
                <p className="text-[#555] text-sm">{modal.artist}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CTA ─── */}
      <section
        className="py-24 px-6 lg:px-14 text-center border-t"
        style={{ background: "#0A0A0A", borderColor: "rgba(255,255,255,0.05)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
        >
          <p className="section-label mb-5">Like What You See?</p>
          <h2
            className="font-bold mb-8"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem,6vw,6rem)" }}
          >
            <span className="text-[#EDEDEA]">Your piece </span>
            <span className="italic" style={{ color: "var(--blue)" }}>awaits.</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-10 py-4 text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300"
            style={{ background: "var(--blue)", color: "#080808" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EDEDEA")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--blue)")}
          >
            Book a Session
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <KrishnaFooter />
    </main>
  )
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div style={{ background: "#080808", minHeight: "100vh" }} />}>
      <GalleryContent />
    </Suspense>
  )
}
