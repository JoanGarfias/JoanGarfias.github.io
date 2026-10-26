// Anchos de las variantes WebP que genera scripts/optimize-images.mjs (nunca mayores al original)
export const IMAGE_WIDTHS = [480, 960, 1600]

export const imageWidths = (originalWidth: number) => {
  const widths = IMAGE_WIDTHS.filter(w => w < originalWidth)
  return [...widths, Math.min(originalWidth, IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1]!)]
}

// /projects/tiven/1.png → /_optimized/projects/tiven/1-960.webp
export const optimizedSrc = (src: string, width: number) =>
  `/_optimized${src.replace(/\.[a-z]+$/i, '')}-${width}.webp`
