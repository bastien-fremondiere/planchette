import { describe, expect, it } from 'vitest'
import { buildPrintLayout, clampMarginMm, fitImageInRect, mmToPt } from './layout'

describe('layout helpers', () => {
  it('clamps margins to the supported range', () => {
    expect(clampMarginMm(-4)).toBe(0)
    expect(clampMarginMm(11.6)).toBe(12)
    expect(clampMarginMm(80)).toBe(24)
  })

  it('builds four slots on an A4 page', () => {
    const layout = buildPrintLayout(10)

    expect(layout.page.width).toBe(210)
    expect(layout.page.height).toBe(297)
    expect(layout.slots).toHaveLength(4)
    expect(layout.slotSizeMm.widthMm).toBe(90)
    expect(layout.slotSizeMm.heightMm).toBe(133.5)
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