export const A4_PAGE_MM = {
  width: 210,
  height: 297,
} as const

export const MAX_MARGIN_MM = 24

export type PageOrientation = 'portrait' | 'landscape'

export type PageDimensionsMm = {
  width: number
  height: number
}

export type GridDimensions = {
  cols: number
  rows: number
}

export type RectMm = {
  xMm: number
  yMm: number
  widthMm: number
  heightMm: number
}

export type PrintLayout = {
  page: PageDimensionsMm
  orientation: PageOrientation
  count: number
  grid: GridDimensions
  marginMm: number
  gapMm: number
  slotSizeMm: {
    widthMm: number
    heightMm: number
  }
  slots: RectMm[]
}

export type BuildPrintLayoutOptions = {
  count?: number
  orientation?: PageOrientation
}

export function getPageDimensionsMm(orientation: PageOrientation = 'portrait'): PageDimensionsMm {
  return orientation === 'landscape'
    ? { width: A4_PAGE_MM.height, height: A4_PAGE_MM.width }
    : { width: A4_PAGE_MM.width, height: A4_PAGE_MM.height }
}

export function clampMarginMm(marginMm: number): number {
  if (!Number.isFinite(marginMm)) {
    return 0
  }

  return Math.min(MAX_MARGIN_MM, Math.max(0, Math.round(marginMm)))
}

export function clampElementCount(count: number): number {
  if (!Number.isFinite(count) || count < 1) {
    return 1
  }

  return Math.max(1, Math.floor(count))
}

export function guessGrid(
  count: number,
  orientation: PageOrientation = 'portrait',
): GridDimensions {
  const safeCount = clampElementCount(count)

  if (safeCount === 1) {
    return { cols: 1, rows: 1 }
  }

  const page = getPageDimensionsMm(orientation)
  let bestCols = 1
  let bestRows = safeCount
  let bestScore = Number.POSITIVE_INFINITY

  for (let cols = 1; cols <= safeCount; cols += 1) {
    const rows = Math.ceil(safeCount / cols)

    if (cols > 1 && Math.ceil(safeCount / (cols - 1)) === rows) {
      continue
    }

    const cellWidth = page.width / cols
    const cellHeight = page.height / rows
    const cellAspect = Math.max(cellWidth / cellHeight, cellHeight / cellWidth)
    const wasteRatio = (cols * rows - safeCount) / (cols * rows)
    const score = wasteRatio * 3.5 + Math.log(cellAspect)

    if (score < bestScore) {
      bestScore = score
      bestCols = cols
      bestRows = rows
    }
  }

  return { cols: bestCols, rows: bestRows }
}

export function buildPrintLayout(
  marginMm: number,
  options: BuildPrintLayoutOptions = {},
): PrintLayout {
  const orientation = options.orientation ?? 'portrait'
  const count = clampElementCount(options.count ?? 4)
  const page = getPageDimensionsMm(orientation)
  const grid = guessGrid(count, orientation)

  const requestedMarginMm = clampMarginMm(marginMm)
  const maxHorizontalMarginMm = Math.floor((page.width - grid.cols) / (grid.cols + 1))
  const maxVerticalMarginMm = Math.floor((page.height - grid.rows) / (grid.rows + 1))
  const maxAllowedMarginMm = Math.max(0, Math.min(maxHorizontalMarginMm, maxVerticalMarginMm))
  const safeMarginMm = Math.min(requestedMarginMm, maxAllowedMarginMm)
  const gapMm = safeMarginMm

  const slotWidthMm = (page.width - safeMarginMm * 2 - gapMm * (grid.cols - 1)) / grid.cols
  const slotHeightMm = (page.height - safeMarginMm * 2 - gapMm * (grid.rows - 1)) / grid.rows

  if (slotWidthMm <= 0 || slotHeightMm <= 0) {
    throw new Error('Margin leaves no printable space on the page.')
  }

  const slots: RectMm[] = []

  for (let index = 0; index < count; index += 1) {
    const col = index % grid.cols
    const row = Math.floor(index / grid.cols)

    slots.push({
      xMm: safeMarginMm + col * (slotWidthMm + gapMm),
      yMm: safeMarginMm + row * (slotHeightMm + gapMm),
      widthMm: slotWidthMm,
      heightMm: slotHeightMm,
    })
  }

  return {
    page,
    orientation,
    count,
    grid,
    marginMm: safeMarginMm,
    gapMm,
    slotSizeMm: {
      widthMm: slotWidthMm,
      heightMm: slotHeightMm,
    },
    slots,
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
