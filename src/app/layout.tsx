import type { Metadata } from "next"
import { Playfair_Display, DM_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
})

const SITE_URL = "https://krishnatattoo.in"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Krishna Tattoo Ahmedabad | Best Custom Tattoo Studio",
    template: "%s | Krishna Tattoo Ahmedabad",
  },
  description:
    "Krishna Tattoo — Ahmedabad's premier custom tattoo studio. 8+ years, 5000+ clients, 100% original designs. Experts in portrait realism, black & grey, tribal & Maori, sleeve tattoos and cover-up artistry. Himalaya Mall, Drive-In Road, Ahmedabad.",
  keywords: [
    "tattoo studio ahmedabad",
    "best tattoo artist ahmedabad",
    "custom tattoo ahmedabad",
    "portrait tattoo ahmedabad",
    "black and grey tattoo ahmedabad",
    "tribal tattoo artist ahmedabad",
    "cover up tattoo ahmedabad",
    "sleeve tattoo ahmedabad",
    "tattoo near me ahmedabad",
    "krishna tattoo ahmedabad",
    "maori tattoo ahmedabad",
    "realistic tattoo ahmedabad",
    "tattoo parlour ahmedabad",
    "tattoo shop ahmedabad",
    "drive in road tattoo",
    "himalaya mall tattoo",
    "gujarat tattoo studio",
  ],
  authors: [{ name: "Krishna Tattoo Ahmedabad" }],
  creator: "Krishna Tattoo Ahmedabad",
  publisher: "Krishna Tattoo Ahmedabad",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Krishna Tattoo Ahmedabad",
    title: "Krishna Tattoo Ahmedabad | Best Custom Tattoo Studio",
    description:
      "8+ years of permanent artistry. Portrait realism, black & grey, tribal & Maori, cover-ups and bespoke sleeves. 5000+ custom tattoos. Ahmedabad's most trusted studio.",
    images: [
      {
        url: "/tattoo-gallery/tattoo-01.jpeg",
        width: 1200,
        height: 630,
        alt: "Krishna Tattoo Ahmedabad — Custom Tattoo Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishna Tattoo Ahmedabad | Best Custom Tattoo Studio",
    description:
      "8+ years of permanent artistry. Portrait realism, tribal, cover-ups & bespoke sleeves. 5000+ clients. Ahmedabad.",
    images: ["/tattoo-gallery/tattoo-01.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "tattoo studio",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: "Krishna Tattoo Ahmedabad",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/tattoo-gallery/tattoo-01.jpeg`,
  description:
    "Ahmedabad's premier custom tattoo studio — 8+ years, 5000+ clients. Experts in portrait realism, black & grey, tribal & Maori, sleeves and cover-ups.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Himalaya Mall, Drive-In Road",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380052",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 23.0419,
    longitude: 72.539,
  },
  telephone: "+91-99999-99999",
  priceRange: "₹₹₹",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "11:00",
      closes: "20:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "312",
    bestRating: "5",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tattoo Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Tattoo Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Portrait Realism Tattoo" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cover-Up Tattoo" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tribal & Maori Tattoo" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Black & Grey Realism" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bespoke Sleeve Design" } },
    ],
  },
  sameAs: ["https://instagram.com/krishnatattoo_ahmedabad"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body
        className="bg-[#080808] text-[#EDEDEA] antialiased"
        style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', -apple-system, sans-serif)" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
