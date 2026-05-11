"use client"
import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CarouselImage { src: string; alt: string }
interface HeroCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CarouselImage[]
}

export const FeatureCarousel = React.forwardRef<HTMLDivElement, HeroCarouselProps>(
  ({ images, className, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(Math.floor(images.length / 2))
    const handleNext = React.useCallback(() => setCurrentIndex((p) => (p + 1) % images.length), [images.length])
    const handlePrev = () => setCurrentIndex((p) => (p - 1 + images.length) % images.length)
    React.useEffect(() => {
      const timer = setInterval(handleNext, 4000)
      return () => clearInterval(timer)
    }, [handleNext])

    return (
      <div ref={ref} className={cn("relative w-full h-[350px] md:h-[450px] flex items-center justify-center", className)} {...props}>
        <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
          {images.map((image, index) => {
            const offset = index - currentIndex
            const total = images.length
            let pos = (offset + total) % total
            if (pos > Math.floor(total / 2)) pos = pos - total
            const isCenter = pos === 0
            const isAdjacent = Math.abs(pos) === 1
            return (
              <div key={index}
                className={cn('absolute w-48 h-80 md:w-64 md:h-[400px] transition-all duration-500 ease-in-out flex items-center justify-center')}
                style={{
                  transform: `translateX(${pos * 45}%) scale(${isCenter ? 1 : isAdjacent ? 0.85 : 0.7}) rotateY(${pos * -10}deg)`,
                  zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                  opacity: isCenter ? 1 : isAdjacent ? 0.4 : 0,
                  filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                  visibility: Math.abs(pos) > 1 ? 'hidden' : 'visible',
                }}>
                <img src={image.src} alt={image.alt} className="object-cover w-full h-full rounded-2xl border border-white/10 shadow-2xl" />
              </div>
            )
          })}
        </div>
        <button className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 z-20 bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={handlePrev}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 z-20 bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={handleNext}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    )
  }
)
FeatureCarousel.displayName = 'FeatureCarousel'
