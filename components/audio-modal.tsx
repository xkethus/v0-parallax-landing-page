"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipForward, SkipBack, Upload } from "lucide-react"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { AudioModalConfig } from "@/types/content"

interface AudioModalProps {
  isOpen: boolean
  onClose: () => void
  config: AudioModalConfig
}

export function AudioModal({ isOpen, onClose, config }: AudioModalProps) {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] flex flex-col bg-gradient-to-br from-orange-500/20 via-amber-600/15 to-yellow-500/20 backdrop-blur-xl border-orange-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-orange-400">{config.title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Current Track Display */}
          <div className="flex flex-col items-center gap-4 p-6 bg-black/20 rounded-lg">
            <div className="h-32 w-32 rounded-full bg-orange-500/20 flex items-center justify-center">
              <span className="text-6xl">🎵</span>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium">{config.playlist[currentTrack].title}</h3>
              <p className="text-sm text-muted-foreground">{config.playlist[currentTrack].duration}</p>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex flex-col gap-3">
            <div className="h-2 bg-black/30 rounded-full overflow-hidden">
              <div className="h-full w-2/5 bg-orange-500" />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button size="icon" variant="ghost" onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))}>
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-500/80 to-amber-600/80 hover:from-orange-500 hover:to-amber-600 border-none"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setCurrentTrack(Math.min(config.playlist.length - 1, currentTrack + 1))}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Playlist */}
          <ScrollArea className="flex-1">
            <div className="space-y-2">
              {config.playlist.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => setCurrentTrack(index)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    currentTrack === index
                      ? "bg-orange-500/20 border border-orange-500/50"
                      : "bg-black/20 hover:bg-black/30"
                  }`}
                >
                  <span className="font-medium">{track.title}</span>
                  <span className="text-sm text-muted-foreground">{track.duration}</span>
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Upload Button */}
          <Button className="w-full bg-gradient-to-br from-orange-500/80 to-amber-600/80 hover:from-orange-500 hover:to-amber-600 text-white border-none">
            <Upload className="mr-2 h-4 w-4" />
            Subir Audio
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
