"use client"

import { useState, useEffect, useRef } from "react"
import { VideoModal } from "@/components/video-modal"
import { AudioModal } from "@/components/audio-modal"
import { TextModal } from "@/components/text-modal"
import { GalleryModal } from "@/components/gallery-modal"
import { Flame } from "lucide-react"
import contentConfig from "@/config/content.json"
import type { ContentConfig } from "@/types/content"

const config = contentConfig as ContentConfig

export default function ParallaxLanding() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollLeft = containerRef.current.scrollLeft
        const scrollTop = containerRef.current.scrollTop
        const scrollWidth = containerRef.current.scrollWidth - containerRef.current.clientWidth
        const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight

        const horizontalProgress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0
        const verticalProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
        const progress = Math.max(horizontalProgress, verticalProgress)

        setScrollProgress(progress)
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (containerRef.current) {
        // Detectar si es principalmente scroll vertical
        const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX)

        if (isVerticalScroll) {
          e.preventDefault()
          // Convertir scroll vertical a horizontal con suavizado
          const scrollAmount = e.deltaY
          containerRef.current.scrollLeft += scrollAmount
        }
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      // Usar { passive: false } para permitir preventDefault en MacOS
      container.addEventListener("wheel", handleWheel, { passive: false })
      return () => {
        container.removeEventListener("scroll", handleScroll)
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [])

  const buttons = config.buttons

  const scrollToButton = (threshold: number) => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth - containerRef.current.clientWidth
      const targetScroll = (threshold / 100) * scrollWidth
      containerRef.current.scrollTo({ left: targetScroll, behavior: "smooth" })
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 400
      containerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      <div
        ref={containerRef}
        className="h-screen w-full overflow-x-scroll overflow-y-hidden snap-x snap-mandatory scroll-smooth"
      >
        <div className="fixed inset-0 -z-10">
          {config.background.type === "video" ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
              style={{
                transform: `translateX(${scrollProgress * 0.5}%)`,
              }}
            >
              <source src={config.background.src} type="video/mp4" />
            </video>
          ) : (
            <div
              className="h-full w-full absolute inset-0"
              style={{
                backgroundImage: `url('${config.background.src}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                transform: `translateX(${scrollProgress * 0.5}%)`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-background/80" />
        </div>

        {/* Mobile Navigation Bullets */}
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 flex flex-row gap-3 md:hidden">
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => scrollToButton(button.threshold)}
              className={`h-3 w-3 rounded-full border-2 transition-all ${
                scrollProgress >= button.threshold && scrollProgress < button.threshold + 20
                  ? "border-primary bg-primary scale-125"
                  : "border-muted-foreground/50 bg-transparent"
              }`}
              aria-label={`Ir a ${button.label}`}
            />
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary/10"
          aria-label="Desplazar a la izquierda"
          style={{
            opacity: scrollProgress > 0 ? 1 : 0.3,
            pointerEvents: scrollProgress > 0 ? "auto" : "none",
          }}
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary/10"
          aria-label="Desplazar a la derecha"
          style={{
            opacity: scrollProgress < 100 ? 1 : 0.3,
            pointerEvents: scrollProgress < 100 ? "auto" : "none",
          }}
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Content Sections */}
        <div className="flex h-screen">
          {buttons.map((button) => (
            <section
              key={button.id}
              className="relative flex h-full w-screen flex-shrink-0 items-center justify-center snap-start"
            >
              <div
                className={`transition-all duration-700 ${
                  scrollProgress >= button.threshold
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 translate-x-20 scale-95"
                }`}
              >
                <button
                  onClick={() => setActiveModal(button.id)}
                  className="group relative flex items-center justify-center h-32 w-32 rounded-full transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 120, 40, 0.3) 0%, rgba(255, 80, 20, 0.2) 100%)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Flame className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />

                  {/* Tooltip on hover */}
                  <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {button.label}
                  </span>
                </button>
              </div>
            </section>
          ))}

          <section className="relative flex h-full w-screen flex-shrink-0 items-center justify-center snap-start">
            <div
              className={`text-center transition-all duration-700 ${
                scrollProgress >= 80 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
              }`}
            >
              <Flame className="mx-auto h-16 w-16 text-primary mb-8 animate-pulse" />
              <h2 className="text-3xl font-light text-foreground mb-8">{config.credits.title}</h2>
              <div className="space-y-3 text-muted-foreground">
                {config.credits.names.map((name, index) => (
                  <p key={index} className="text-lg font-light">
                    {name}
                  </p>
                ))}
              </div>
              <p className="mt-12 text-sm font-light text-muted-foreground/60">{config.credits.subtitle}</p>
            </div>
          </section>
        </div>
      </div>

      <VideoModal isOpen={activeModal === "video"} onClose={() => setActiveModal(null)} config={config.modals.video} />
      <AudioModal isOpen={activeModal === "audio"} onClose={() => setActiveModal(null)} config={config.modals.audio} />
      <TextModal isOpen={activeModal === "text"} onClose={() => setActiveModal(null)} config={config.modals.text} />
      <GalleryModal
        isOpen={activeModal === "gallery"}
        onClose={() => setActiveModal(null)}
        config={config.modals.gallery}
      />
    </>
  )
}
