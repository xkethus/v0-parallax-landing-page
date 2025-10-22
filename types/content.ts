export type BackgroundType = "image" | "video"
export type VideoType = "mp4" | "webm"
export type AudioType = "mp3" | "wav"
export type TextContentType = "fixed" | "txt"
export type ImageType = "jpg" | "png"

export interface BackgroundConfig {
  type: BackgroundType
  src: string
  fallback?: string
}

export interface ButtonConfig {
  id: string
  label: string
  threshold: number
}

export interface VideoItem {
  id: number
  title: string
  src: string
  type: VideoType
  poster?: string
}

export interface AudioItem {
  id: number
  title: string
  duration: string
  src: string
  type: AudioType
}

export interface TextConfig {
  title: string
  contentType: TextContentType
  content: string
  filePath?: string
}

export interface ImageItem {
  id: number
  src: string
  alt: string
  type: ImageType
}

export interface GalleryConfig {
  title: string
  images: ImageItem[]
}

export interface VideoModalConfig {
  title: string
  videos: VideoItem[]
}

export interface AudioModalConfig {
  title: string
  playlist: AudioItem[]
}

export interface CreditsConfig {
  title: string
  subtitle: string
  names: string[]
}

export interface ContentConfig {
  background: BackgroundConfig
  buttons: ButtonConfig[]
  modals: {
    video: VideoModalConfig
    audio: AudioModalConfig
    text: TextConfig
    gallery: GalleryConfig
  }
  credits: CreditsConfig
}
