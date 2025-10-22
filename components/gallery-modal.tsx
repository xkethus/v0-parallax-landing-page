"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { GalleryConfig } from "@/types/content"

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  config: GalleryConfig
}

export function GalleryModal({ isOpen, onClose, config }: GalleryModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollY(scrollRef.current.scrollTop)
      }
    }

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll)
      return () => scrollElement.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] bg-gradient-to-br from-orange-500/20 via-amber-600/15 to-yellow-500/20 backdrop-blur-xl border-orange-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-orange-400">{config.title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full" ref={scrollRef}>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 pr-4">
              {config.images.map((image, index) => (
                <div
                  key={image.id}
                  className="break-inside-avoid mb-4"
                  style={{
                    transform: `translateY(${scrollY * (0.05 * (index % 3))}px)`,
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg group cursor-pointer">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-sm font-medium">{image.alt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="pt-4 shrink-0">
          <Button className="w-full bg-gradient-to-br from-orange-500/80 to-amber-600/80 hover:from-orange-500 hover:to-amber-600 text-white border-none">
            <Upload className="mr-2 h-4 w-4" />
            Subir Imagen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
