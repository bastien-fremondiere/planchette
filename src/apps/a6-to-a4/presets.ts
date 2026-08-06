export type CompressionPresetId = 'high' | 'balanced' | 'small'

export type CompressionPreset = {
  id: CompressionPresetId
  quality: number
  maxLongestEdgePx: number
}

export const compressionPresets: CompressionPreset[] = [
  {
    id: 'high',
    quality: 0.92,
    maxLongestEdgePx: 2000,
  },
  {
    id: 'balanced',
    quality: 0.8,
    maxLongestEdgePx: 1500,
  },
  {
    id: 'small',
    quality: 0.68,
    maxLongestEdgePx: 1100,
  },
]

export function getCompressionPreset(id: CompressionPresetId): CompressionPreset {
  return compressionPresets.find((preset) => preset.id === id) ?? compressionPresets[1]
}