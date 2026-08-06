import type { CompressionPreset } from './presets'

export type PreparedImage = {
  blob: Blob
  width: number
  height: number
  mimeType: 'image/jpeg'
}

export async function prepareImage(file: File, preset: CompressionPreset): Promise<PreparedImage> {
  const image = await loadImage(file)
  const longestEdge = Math.max(image.naturalWidth, image.naturalHeight)
  const scale = Math.min(1, preset.maxLongestEdgePx / longestEdge)
  const width = Math.max(1, Math.round(image.naturalWidth * scale))
  const height = Math.max(1, Math.round(image.naturalHeight * scale))
  const canvas = document.createElement('canvas')

  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Canvas rendering is not available in this browser.')
  }

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, width, height)
  context.drawImage(image, 0, 0, width, height)

  const blob = await canvasToBlob(canvas, preset.quality)

  return {
    blob,
    width,
    height,
    mimeType: 'image/jpeg',
  }
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  const sourceUrl = URL.createObjectURL(file)

  try {
    return await new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => resolve(image)
      image.onerror = () => reject(new Error('The selected file could not be decoded as an image.'))
      image.src = sourceUrl
    })
  } finally {
    URL.revokeObjectURL(sourceUrl)
  }
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Unable to encode the image for PDF export.'))
          return
        }

        resolve(blob)
      },
      'image/jpeg',
      quality,
    )
  })
}