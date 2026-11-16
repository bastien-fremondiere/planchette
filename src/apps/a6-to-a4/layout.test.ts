import { describe, expect, it } from 'vitest'
import {
  buildPrintLayout,
  clampElementCount,
  clampMarginMm,
  fitImageInRect,
  guessGrid,
  mmToPt,
} from './layout'

describe('layout helpers', () => {
  it('clamps margins to the supported range', () => {
    expect(clampMarginMm(-4)).toBe(0)
    expect(clampMarginMm(11.6)).toBe(12)
    expect(clampMarginMm(80)).toBe(24)
  })

  it('clamps element count to at least 1', () => {
    expect(clampElementCount(0)).toBe(1)
    expect(clampElementCount(-5)).toBe(1)
    expect(clampElementCount(Number.NaN)).toBe(1)
    expect(clampElementCount(6.8)).toBe(6)
  })

  it('guesses balanced grids for portrait and landscape pages', () => {
    expect(guessGrid(1, 'portrait')).toEqual({ cols: 1, rows: 1 })
    expect(guessGrid(2, 'portrait')).toEqual({ cols: 1, rows: 2 })
    expect(guessGrid(2, 'landscape')).toEqual({ cols: 2, rows: 1 })
    expect(guessGrid(4, 'portrait')).toEqual({ cols: 2, rows: 2 })
    expect(guessGrid(6, 'portrait')).toEqual({ cols: 2, rows: 3 })
    expect(guessGrid(6, 'landscape')).toEqual({ cols: 3, rows: 2 })
    expect(guessGrid(9, 'portrait')).toEqual({ cols: 3, rows: 3 })
    expect(guessGrid(12, 'portrait')).toEqual({ cols: 3, rows: 4 })
    expect(guessGrid(12, 'landscape')).toEqual({ cols: 4, rows: 3 })
  })

  it('handles prime and non-rectangular counts without skinny strips', () => {
    expect(guessGrid(5, 'portrait')).toEqual({ cols: 2, rows: 3 })
    expect(guessGrid(5, 'landscape')).toEqual({ cols: 3, rows: 2 })
    expect(guessGrid(7, 'portrait')).toEqual({ cols: 2, rows: 4 })
    expect(guessGrid(7, 'landscape')).toEqual({ cols: 4, rows: 2 })
  })

  it('builds four slots on an A4 portrait page by default', () => {
    const layout = buildPrintLayout(10)

    expect(layout.page).toEqual({ width: 210, height: 297 })
    expect(layout.orientation).toBe('portrait')
    expect(layout.grid).toEqual({ cols: 2, rows: 2 })
    expect(layout.slots).toHaveLength(4)
    expect(layout.slotSizeMm.widthMm).toBe(90)
    expect(layout.slotSizeMm.heightMm).toBe(133.5)
  })

  it('builds 6 slots in 2x3 portrait and 3x2 landscape with identical slot sizes', () => {
    const portrait = buildPrintLayout(8, { count: 6, orientation: 'portrait' })
    expect(portrait.page).toEqual({ width: 210, height: 297 })
    expect(portrait.grid).toEqual({ cols: 2, rows: 3 })
    expect(portrait.slots).toHaveLength(6)
    expect(portrait.slotSizeMm.widthMm).toBeCloseTo(93)
    expect(portrait.slotSizeMm.heightMm).toBeCloseTo(265 / 3)

    const landscape = buildPrintLayout(8, { count: 6, orientation: 'landscape' })
    expect(landscape.page).toEqual({ width: 297, height: 210 })
    expect(landscape.grid).toEqual({ cols: 3, rows: 2 })
    expect(landscape.slots).toHaveLength(6)
    expect(landscape.slotSizeMm.widthMm).toBeCloseTo(265 / 3)
    expect(landscape.slotSizeMm.heightMm).toBeCloseTo(93)

    for (const slot of landscape.slots) {
      expect(slot.widthMm).toBeCloseTo(landscape.slotSizeMm.widthMm)
      expect(slot.heightMm).toBeCloseTo(landscape.slotSizeMm.heightMm)
    }
  })

  it('clamps margin gracefully for very dense grids', () => {
    const dense = buildPrintLayout(24, { count: 100, orientation: 'portrait' })

    expect(dense.slots).toHaveLength(100)
    expect(dense.slotSizeMm.widthMm).toBeGreaterThan(0)
    expect(dense.slotSizeMm.heightMm).toBeGreaterThan(0)
    expect(dense.marginMm).toBeLessThan(24)
  })

  it('fits a landscape image within a portrait cell', () => {
    const fitted = fitImageInRect(
      { xMm: 10, yMm: 10, widthMm: 90, heightMm: 130 },
      1600,
      900,
    )

    expect(fitted.widthMm).toBe(90)
    expect(fitted.heightMm).toBeCloseTo(50.625)
    expect(fitted.yMm).toBeCloseTo(49.6875)
  })

  it('converts millimeters to points', () => {
    expect(mmToPt(25.4)).toBeCloseTo(72)
  })
})
