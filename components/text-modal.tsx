"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload, RefreshCw } from "lucide-react"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { TextConfig } from "@/types/content"

interface TextModalProps {
  isOpen: boolean
  onClose: () => void
  config: TextConfig
}

const loremTexts = [
  "En el principio era la flama, y la flama era con el tiempo, y la flama era el tiempo. Ella nos observa desde el origen de todas las cosas, guardiana silenciosa de los secretos que el universo susurra en la oscuridad.",
  "Las memorias danzan como chispas en la noche eterna. Cada recuerdo es una llama que arde con la intensidad de mil soles, iluminando los rincones más oscuros de nuestra existencia.",
  "Somos hijos del fuego primordial, nacidos de las cenizas de estrellas antiguas. La flama nos mira y reconoce en nosotros su propia esencia, reflejada en el espejo del tiempo infinito.",
  "En cada latido del corazón, en cada respiración, la memoria de la flama persiste. Es el eco de un pasado inmemorial que resuena en el presente, guiándonos hacia un futuro incandescente.",
]

export function TextModal({ isOpen, onClose, config }: TextModalProps) {
  const [currentText, setCurrentText] = useState(0)

  const randomizeText = () => {
    setCurrentText(Math.floor(Math.random() * loremTexts.length))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] bg-gradient-to-br from-orange-500/20 via-amber-600/15 to-yellow-500/20 backdrop-blur-xl border-orange-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-orange-400">{config.title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full rounded-lg bg-black/20 p-6">
            <div className="prose prose-invert max-w-none">
              {config.contentType === "fixed" ? (
                <div className="text-base leading-relaxed text-foreground/90 whitespace-pre-line">{config.content}</div>
              ) : (
                <>
                  <p className="text-lg leading-relaxed text-foreground/90">{loremTexts[currentText]}</p>
                  <div className="mt-8 space-y-4">
                    <p className="text-base leading-relaxed text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                      mollit anim id est laborum.
                    </p>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                      totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                      dicta sunt explicabo.
                    </p>
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="flex gap-3 pt-4 shrink-0">
          {config.contentType !== "fixed" && (
            <Button
              variant="outline"
              className="flex-1 border-orange-500/50 hover:bg-orange-500/10 bg-transparent text-foreground"
              onClick={randomizeText}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Texto Aleatorio
            </Button>
          )}
          <Button className="flex-1 bg-gradient-to-br from-orange-500/80 to-amber-600/80 hover:from-orange-500 hover:to-amber-600 text-white border-none">
            <Upload className="mr-2 h-4 w-4" />
            Subir Texto
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
