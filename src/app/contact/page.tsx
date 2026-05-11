"use client"
import { useState } from "react"
import { motion } from "motion/react"
import { Phone, MapPin, Clock, Send, CheckCircle, ExternalLink } from "lucide-react"
import { KrishnaFooter } from "@/components/ui/modem-animated-footer"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1400)
  }

  const info = [
    {
      icon: Phone,
      label: "Call / WhatsApp",
      value: "+91 8979335743",
      href: "tel:8979335743",
    },
    {
      icon: ExternalLink,
      label: "Instagram",
      value: "@krishna_tattoo_ahmdabad",
      href: "https://instagram.com/krishna_tattoo_ahmdabad",
    },
    {
      icon: MapPin,
      label: "Studio Location",
      value: "Himalaya Mall, Drive-In Road, Ahmedabad",
      href: "https://maps.google.com/?q=Himalaya+Mall+Drive+In+Road+Ahmedabad",
    },
    {
      icon: Clock,
      label: "Studio Hours",
      value: "Mon – Sat · 11 AM – 8 PM",
      href: null,
    },
  ]

  const services = [
    "Custom Tattoo",
    "Portrait Realism",
    "Cover-Up",
    "Tribal / Maori",
    "Black & Grey",
    "Bespoke Design",
  ]

  return (
    <main className="overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section
        className="relative min-h-[60vh] flex items-end pb-24 pt-36 px-6 lg:px-14 overflow-hidden"
        style={{ background: "#080808" }}
      >
        <div className="absolute inset-0">
          <img
            src="/tattoo-gallery/tattoo-09.jpeg"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.1) contrast(1.3) grayscale(0.3)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #080808 55%, rgba(8,8,8,0.5))" }}
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 60% at 75% 50%, rgba(232,255,0,0.05), transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.p
            className="section-label flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
          >
            <span className="w-8 h-px" style={{ background: "var(--blue)" }} />
            Reach Us
          </motion.p>
          <motion.h1
            className="font-bold leading-[0.9] mb-6"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3.5rem,9vw,9rem)" }}
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16,1,0.3,1] }}
          >
            <span className="block text-[#EDEDEA]">Let's</span>
            <span className="block italic" style={{ color: "var(--blue)" }}>Talk Ink.</span>
          </motion.h1>
          <motion.p
            className="text-[#666] text-lg max-w-md leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
          >
            Every great tattoo starts with a conversation. Tell us about your vision — we'll take it from there.
          </motion.p>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="py-24 px-6 lg:px-14" style={{ background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24">

          {/* Left: Info */}
          <div>
            <p className="section-label mb-8">Studio Information</p>
            <div className="space-y-0">
              {info.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="py-6 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="flex gap-5 items-start">
                    <div
                      className="w-10 h-10 border flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ borderColor: "rgba(232,255,0,0.25)", color: "var(--blue)" }}
                    >
                      <item.icon size={16} />
                    </div>
                    <div>
                      <p className="text-[#444] text-[10px] tracking-[0.25em] uppercase mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-[#EDEDEA] text-base hover:text-[var(--blue)] transition-colors duration-300"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#EDEDEA] text-base">{item.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }} />
            </div>

            {/* Map iframe */}
            <div className="mt-8 relative overflow-hidden" style={{ height: "260px" }}>
              <iframe
                title="Krishna Tattoo Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5456!2d72.5270!3d23.0417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f1c9a99a9b%3A0x1!2sHimalaya+Mall%2C+Drive+In+Rd%2C+Ahmedabad!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="w-full h-full"
                style={{
                  border: 0,
                  filter: "invert(0.9) hue-rotate(180deg) brightness(0.85) contrast(1.1)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div
                className="absolute inset-0 pointer-events-none border"
                style={{ borderColor: "rgba(232,255,0,0.15)" }}
              />
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <p className="section-label mb-8">Send a Message</p>
            {sent ? (
              <motion.div
                className="flex flex-col items-center justify-center text-center py-20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="w-16 h-16 border flex items-center justify-center mb-6"
                  style={{ borderColor: "rgba(232,255,0,0.4)", color: "var(--blue)" }}
                >
                  <CheckCircle size={28} />
                </div>
                <h3
                  className="font-bold text-2xl text-[#EDEDEA] mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Message Received
                </h3>
                <p className="text-[#555] max-w-xs leading-relaxed">
                  We'll get back to you within 24 hours to discuss your vision and book your session.
                </p>
                <button
                  className="mt-8 text-[10px] tracking-[0.25em] uppercase transition-colors"
                  style={{ color: "var(--blue)" }}
                  onClick={() => setSent(false)}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "Full name", required: true },
                  { id: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+91 XXXXX XXXXX", required: true },
                ].map((f) => (
                  <div key={f.id}>
                    <label className="text-[10px] tracking-[0.25em] uppercase text-[#444] block mb-2">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      required={f.required}
                      value={form[f.id as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                      className="w-full px-5 py-4 text-sm text-[#EDEDEA] placeholder-[#333] border bg-transparent outline-none transition-all duration-300 focus:border-[var(--blue)]"
                      style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
                    />
                  </div>
                ))}

                <div>
                  <label className="text-[10px] tracking-[0.25em] uppercase text-[#444] block mb-2">Service Interested In</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-5 py-4 text-sm text-[#EDEDEA] border outline-none transition-all duration-300 focus:border-[var(--blue)] appearance-none cursor-pointer"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                      background: "#111",
                      color: form.service ? "#EDEDEA" : "#333",
                    }}
                  >
                    <option value="" disabled style={{ color: "#333" }}>Select a service</option>
                    {services.map((s) => (
                      <option key={s} value={s} style={{ background: "#111", color: "#EDEDEA" }}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.25em] uppercase text-[#444] block mb-2">Tell Us Your Vision</label>
                  <textarea
                    rows={5}
                    placeholder="Describe your tattoo idea, placement, size, and any reference images you have in mind..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-5 py-4 text-sm text-[#EDEDEA] placeholder-[#333] border bg-transparent outline-none transition-all duration-300 focus:border-[var(--blue)] resize-none"
                    style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full py-4 flex items-center justify-center gap-2 text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300 disabled:opacity-60"
                  style={{ background: loading ? "rgba(232,255,0,0.6)" : "var(--blue)", color: "#080808" }}
                  onMouseEnter={(e) => { if (!loading) (e.currentTarget.style.background = "#EDEDEA") }}
                  onMouseLeave={(e) => { if (!loading) (e.currentTarget.style.background = "var(--blue)") }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full inline-block"
                        style={{ animation: "spin 0.8s linear infinite" }}
                      />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <Send size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-[#333] text-xs text-center leading-relaxed">
                  Or reach us directly on{" "}
                  <a
                    href="tel:8979335743"
                    className="transition-colors"
                    style={{ color: "var(--blue)" }}
                  >
                    +91 8979335743
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <KrishnaFooter />
    </main>
  )
}
