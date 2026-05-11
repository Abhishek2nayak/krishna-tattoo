"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"

interface TattooWork {
  title: string
  description: string
  year: string
  link: string
  image: string
}

const tattooWorks: TattooWork[] = [
  { title: "Hyper-Realism Portrait", description: "Lifelike portrait tattoo capturing every detail with precision.", year: "2024", link: "#", image: "https://images.unsplash.com/photo-1611501276652-a0000c7a3b5f?q=80&w=800&auto=format&fit=crop" },
  { title: "Black & Grey Sleeve", description: "Full sleeve with intricate black and grey shading.", year: "2024", link: "#", image: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e?q=80&w=800&auto=format&fit=crop" },
  { title: "Maori Tribal Chest", description: "Traditional Maori patterns with bold geometric lines.", year: "2023", link: "#", image: "https://images.unsplash.com/photo-1590246814883-55516d8b5e4e?q=80&w=800&auto=format&fit=crop" },
  { title: "Cover-up Masterpiece", description: "Complete transformation cover-up with floral design.", year: "2023", link: "#", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=800&auto=format&fit=crop" },
]

export function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor
    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current) }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full max-w-4xl mx-auto px-6 py-16">
      <div
        className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative w-[280px] h-[180px] rounded-xl overflow-hidden">
          {tattooWorks.map((work, index) => (
            <img key={work.title} src={work.image} alt={work.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
              style={{ opacity: hoveredIndex === index ? 1 : 0, filter: hoveredIndex === index ? "none" : "blur(10px)" }}
            />
          ))}
        </div>
      </div>
      <div className="space-y-0">
        {tattooWorks.map((work, index) => (
          <a key={work.title} href={work.link} className="group block"
            onMouseEnter={() => { setHoveredIndex(index); setIsVisible(true) }}
            onMouseLeave={() => { setHoveredIndex(null); setIsVisible(false) }}>
            <div className="relative py-5 border-t border-white/10 transition-all duration-300 ease-out">
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2">
                    <h3 className="text-white font-medium text-lg tracking-tight">
                      <span className="relative">
                        {work.title}
                        <span className={`absolute left-0 -bottom-0.5 h-px bg-purple-400 transition-all duration-300 ease-out ${hoveredIndex === index ? "w-full" : "w-0"}`} />
                      </span>
                    </h3>
                    <ArrowUpRight className={`w-4 h-4 text-purple-400 transition-all duration-300 ease-out ${hoveredIndex === index ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-2 translate-y-2"}`} />
                  </div>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">{work.description}</p>
                </div>
                <span className="text-xs font-mono text-gray-500 tabular-nums">{work.year}</span>
              </div>
            </div>
          </a>
        ))}
        <div className="border-t border-white/10" />
      </div>
    </section>
  )
}
