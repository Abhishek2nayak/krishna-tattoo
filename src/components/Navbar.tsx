"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] h-[1px]">
        <div
          className="h-full transition-all duration-75 ease-linear"
          style={{ width: `${progress}%`, background: "var(--blue)" }}
        />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#080808]/96 backdrop-blur-2xl border-b border-white/[0.05]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-5 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div
              className="w-9 h-9 border flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[var(--blue)]"
              style={{ borderColor: "rgba(232,255,0,0.45)" }}
            >
              <Image
                src="/logo.png"
                alt="Krishna Tattoo Ahmedabad Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-[#EDEDEA] text-[11px] font-semibold tracking-[0.22em] uppercase leading-none">
                Krishna Tattoo
              </p>
              <p className="text-[#555] text-[9px] tracking-[0.35em] uppercase mt-[3px]">Ahmedabad</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-9">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 relative ${
                  pathname === link.href ? "text-[var(--blue)]" : "text-[#777] hover:text-[#EDEDEA]"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-[3px] left-0 right-0 h-px" style={{ background: "var(--blue)" }} />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:block px-6 py-2.5 text-[10px] font-semibold tracking-[0.25em] uppercase transition-all duration-300 border hover:bg-[var(--blue)] hover:text-[#080808] hover:border-[var(--blue)]"
              style={{ color: "var(--blue)", borderColor: "rgba(232,255,0,0.45)" }}
            >
              Book Now
            </Link>
            <button
              className="md:hidden text-[#EDEDEA] p-1.5 hover:text-[var(--blue)] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: mobileOpen ? "320px" : "0px",
            background: "#0A0A0A",
            borderTop: mobileOpen ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}
        >
          <div className="px-6 py-6 space-y-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-[11px] tracking-[0.2em] uppercase py-2 border-b transition-colors ${
                  pathname === link.href
                    ? "border-[var(--blue)]/20"
                    : "border-white/5 text-[#777] hover:text-[#EDEDEA]"
                }`}
                style={pathname === link.href ? { color: "var(--blue)" } : {}}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block mt-4 py-3 text-center text-[10px] font-semibold tracking-[0.25em] uppercase border transition-all duration-300"
              style={{ color: "var(--blue)", borderColor: "rgba(232,255,0,0.4)" }}
            >
              Book Now
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
