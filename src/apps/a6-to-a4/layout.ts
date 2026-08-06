export const A4_PAGE_MM = {
  width: 210,
  height: 297,
} as const

export const MAX_MARGIN_MM = 24

export type RectMm = {
  xMm: number
  yMm: number
  widthMm: number
  heightMm: number
}

export type PrintLayout = {
  page: typeof A4_PAGE_MM
  marginMm: number
  gapMm: number
  slotSizeMm: {
    widthMm: number
    heightMm: number
  }
  slots: RectMm[]
}

export function clampMarginMm(marginMm: number): number {
  return Math.min(MAX_MARGIN_MM, Math.max(0, Math.round(marginMm)))
}

export function buildPrintLayout(marginMm: number): PrintLayout {
  const safeMarginMm = clampMarginMm(marginMm)
  const gapMm = safeMarginMm
  const slotWidthMm = (A4_PAGE_MM.width - safeMarginMm * 2 - gapMm) / 2
  const slotHeightMm = (A4_PAGE_MM.height - safeMarginMm * 2 - gapMm) / 2

  if (slotWidthMm <= 0 || slotHeightMm <= 0) {
    throw new Error('Margin leaves no printable space on the page.')
  }

  return {
    page: A4_PAGE_MM,
    marginMm: safeMarginMm,
    gapMm,
    slotSizeMm: {
      widthMm: slotWidthMm,
      heightMm: slotHeightMm,
    },
    slots: [
      { xMm: safeMarginMm, yMm: safeMarginMm, widthMm: slotWidthMm, heightMm: slotHeightMm },
      {
        xMm: safeMarginMm + slotWidthMm + gapMm,
        yMm: safeMarginMm,
        widthMm: slotWidthMm,
        heightMm: slotHeightMm,
      },
      {
        xMm: safeMarginMm,
        yMm: safeMarginMm + slotHeightMm + gapMm,
        widthMm: slotWidthMm,
        heightMm: slotHeightMm,
      },
      {
        xMm: safeMarginMm + slotWidthMm + gapMm,
        yMm: safeMarginMm + slotHeightMm + gapMm,
        widthMm: slotWidthMm,
        heightMm: slotHeightMm,
      },
    ],
  }
}

export function fitImageInRect(slot: RectMm, imageWidthPx: number, imageHeightPx: number): RectMm {
  const imageRatio = imageWidthPx / imageHeightPx
  const slotRatio = slot.widthMm / slot.heightMm

  if (imageRatio > slotRatio) {
    const heightMm = slot.widthMm / imageRatio
    return {
      xMm: slot.xMm,
      yMm: slot.yMm + (slot.heightMm - heightMm) / 2,
      widthMm: slot.widthMm,
      heightMm,
    }
  }

  const widthMm = slot.heightMm * imageRatio
  return {
    xMm: slot.xMm + (slot.widthMm - widthMm) / 2,
    yMm: slot.yMm,
    widthMm,
    heightMm: slot.heightMm,
  }
}

export function mmToPt(mm: number): number {
  return (mm * 72) / 25.4
}