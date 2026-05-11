"use client"
import React from "react"
import Link from "next/link"
import { Phone, MapPin, ExternalLink } from "lucide-react"

interface FooterProps {
  brandName?: string
  brandDescription?: string
}

export const AnimatedFooter = ({
  brandName = "Krishna Tattoo",
  brandDescription = "Where ink meets artistry.",
}: FooterProps) => {
  const nav = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <footer className="relative overflow-hidden border-t" style={{ background: "#050505", borderColor: "rgba(255,255,255,0.06)" }}>
      {/* Giant background brand name */}
      <div
        className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none select-none overflow-hidden"
        style={{ height: "60%" }}
      >
        <span
          className="font-black tracking-tighter leading-none whitespace-nowrap"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(5rem, 18vw, 18rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.04)",
            letterSpacing: "-0.03em",
          }}
        >
          {brandName.toUpperCase()}
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pt-20 pb-10">
        {/* Top grid */}
        <div className="grid md:grid-cols-3 gap-12 pb-16 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {/* Brand col */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 border flex items-center justify-center"
                style={{ borderColor: "rgba(232,255,0,0.4)" }}
              >
                <span
                  className="font-black text-lg"
                  style={{ color: "var(--blue)", fontFamily: "var(--font-playfair)" }}
                >
                  K
                </span>
              </div>
              <div>
                <p className="text-[#EDEDEA] text-[11px] font-semibold tracking-[0.22em] uppercase leading-none">
                  {brandName}
                </p>
                <p className="text-[#444] text-[9px] tracking-[0.3em] uppercase mt-1">Ahmedabad</p>
              </div>
            </div>
            <p className="text-[#555] text-sm leading-relaxed max-w-xs">{brandDescription}</p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/krishna_tattoo_ahmdabad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border flex items-center justify-center transition-all duration-300 hover:border-[var(--blue)] hover:text-[var(--blue)]"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "#555" }}
              >
                <ExternalLink size={15} />
              </a>
              <a
                href="tel:8979335743"
                className="w-9 h-9 border flex items-center justify-center transition-all duration-300 hover:border-[var(--blue)] hover:text-[var(--blue)]"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "#555" }}
              >
                <Phone size={15} />
              </a>
              <a
                href="https://maps.google.com/?q=Himalaya+Mall+Drive+In+Road+Ahmedabad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border flex items-center justify-center transition-all duration-300 hover:border-[var(--blue)] hover:text-[var(--blue)]"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "#555" }}
              >
                <MapPin size={15} />
              </a>
            </div>
          </div>

          {/* Nav col */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: "var(--blue)" }}>
              Navigation
            </p>
            <ul className="space-y-3">
              {nav.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[#555] text-sm tracking-wide hover:text-[var(--blue)] transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: "var(--blue)" }}>
              Find Us
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-[#EDEDEA] text-sm">Himalaya Mall, Drive-In Road</p>
                <p className="text-[#555] text-sm">Ahmedabad, Gujarat</p>
              </div>
              <div>
                <a
                  href="tel:8979335743"
                  className="text-[#EDEDEA] text-sm hover:text-[var(--blue)] transition-colors"
                >
                  +91 8979335743
                </a>
              </div>
              <div>
                <a
                  href="https://instagram.com/krishna_tattoo_ahmdabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#555] text-sm hover:text-[var(--blue)] transition-colors"
                >
                  @krishna_tattoo_ahmdabad
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#333] text-xs tracking-wide">
            © {new Date().getFullYear()} Krishna Tattoo Ahmedabad. All rights reserved.
          </p>
          <p className="text-[#333] text-xs tracking-wide">8 Years of Permanent Artistry</p>
        </div>
      </div>
    </footer>
  )
}
