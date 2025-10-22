"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Upload, Maximize } from "lucide-react"
import { useState } from "react"
import type { VideoModalConfig } from "@/types/content"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  config: VideoModalConfig
}

export function VideoModal({ isOpen, onClose, config }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const currentVideo = config.videos[currentVideoIndex]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col bg-gradient-to-br from-orange-500/20 via-amber-600/15 to-yellow-500/20 backdrop-blur-xl border-orange-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-orange-400">{config.title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Video Player */}
          <div className="relative flex-1 bg-black/50 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <video className="w-full h-full object-contain" poster={currentVideo.poster}>
                <source src={currentVideo.src} type={`video/${currentVideo.type}`} />
              </video>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-orange-500" />
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>

                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {config.videos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {config.videos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    currentVideoIndex === index
                      ? "bg-orange-500/30 border border-orange-500/50"
                      : "bg-black/20 hover:bg-black/30"
                  }`}
                >
                  {video.title}
                </button>
              ))}
            </div>
          )}

          {/* Upload Button */}
          <Button className="w-full bg-gradient-to-br from-orange-500/80 to-amber-600/80 hover:from-orange-500 hover:to-amber-600 text-white border-none">
            <Upload className="mr-2 h-4 w-4" />
            Subir Video
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
