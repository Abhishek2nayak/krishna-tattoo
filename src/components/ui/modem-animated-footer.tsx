"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera, Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const ModemAnimatedFooter = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative w-full mt-0 overflow-hidden", className)}>
      <footer className="border-t bg-background mt-20 relative" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[40rem] relative p-4 py-10">
          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-2 flex flex-col items-center flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                    {brandName}
                  </span>
                </div>
                <p className="text-muted-foreground font-semibold text-center w-full max-w-sm sm:w-96 px-4 sm:px-0">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-3 gap-4">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-6 h-6 hover:scale-110 duration-300">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-muted-foreground max-w-full px-4">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      className="hover:text-foreground duration-300 hover:font-semibold tracking-widest uppercase text-xs"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 md:mt-24 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0">
            <p className="text-base text-muted-foreground text-center md:text-left text-xs tracking-widest uppercase">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <Link
                  href={creatorUrl}
                  target="_blank"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 hover:font-medium tracking-widest uppercase"
                >
                  Crafted by {creatorName}
                </Link>
              </nav>
            )}
          </div>
        </div>

        {/* Large background watermark */}
        <div
          className="bg-gradient-to-b from-foreground/20 via-foreground/10 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-40 md:bottom-32 font-extrabold tracking-tighter pointer-events-none select-none text-center px-4"
          style={{
            fontSize: "clamp(3rem, 12vw, 10rem)",
            maxWidth: "95vw",
            fontFamily: "var(--font-playfair)",
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Bottom logo badge */}
        <div className="absolute hover:border-foreground duration-400 bottom-24 md:bottom-20 rounded-3xl  left-1/2  flex items-center justify-center p-3 -translate-x-1/2 z-10" style={{ borderColor: "rgba(232,255,0,0.25)" }}>
          <div className="w-10 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 rounded-2xl flex items-center justify-center " style={{ background: "#0a0a0a13", width: "max-content" }}>
            {brandIcon || (
              <Image src="/logo.png" alt="Krishna Tattoo" width={200} height={200} className="w-full h-full object-contain p-1" />
            )}
          </div>
        </div>

        {/* Divider line */}
        <div className="absolute bottom-32 sm:bottom-34 backdrop-blur-sm h-px bg-gradient-to-r from-transparent via-border to-transparent w-full left-1/2 -translate-x-1/2" style={{ background: "linear-gradient(90deg, transparent, rgba(232,255,0,0.3), transparent)" }} />

        {/* Bottom shadow */}
        <div className="bg-gradient-to-t from-background via-background/80 blur-[1em] to-background/40 absolute bottom-28 w-full h-24" />
      </footer>
    </section>
  );
};

// Pre-configured for Krishna Tattoo
export const KrishnaFooter = () => (
  <ModemAnimatedFooter
    brandName="Krishna Tattoo"
    brandDescription="Eight years of permanent artistry. Himalaya Mall, Drive-In Road, Ahmedabad."
    socialLinks={[
      { icon: <Camera className="w-5 h-5" />, href: "https://instagram.com", label: "Instagram" },
      { icon: <Phone className="w-5 h-5" />, href: "tel:+919999999999", label: "Call Us" },
      { icon: <Mail className="w-5 h-5" />, href: "mailto:krishnatattoo@gmail.com", label: "Email" },
      { icon: <MapPin className="w-5 h-5" />, href: "https://maps.google.com", label: "Location" },
    ]}
    navLinks={[
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ]}
  />
);
