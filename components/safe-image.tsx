"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export function SafeImage({ src, alt, fallbackSrc = "/placeholder.svg", ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  // Handle image loading errors
  const handleError = () => {
    console.warn(`Image failed to load: ${String(src)}, using fallback`)
    setImgSrc(fallbackSrc)
  }

  // Clean up potentially problematic URLs
  const cleanSrc =
    typeof imgSrc === "string" && (imgSrc.startsWith("blob:") || imgSrc.includes("vusercontent.net"))
      ? fallbackSrc
      : imgSrc

  return <Image {...props} src={cleanSrc || "/placeholder.svg"} alt={alt} onError={handleError} />
}
