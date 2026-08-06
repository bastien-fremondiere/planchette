import { PDFDocument, rgb } from 'pdf-lib'
import { fitImageInRect, mmToPt, type PrintLayout } from './layout'
import type { PreparedImage } from './image'

type CreatePdfOptions = {
  image: PreparedImage
  layout: PrintLayout
}

export async function createA6ToA4Pdf({ image, layout }: CreatePdfOptions): Promise<Blob> {
  const pdf = await PDFDocument.create()
  const page = pdf.addPage([mmToPt(layout.page.width), mmToPt(layout.page.height)])
  const pageHeightPt = mmToPt(layout.page.height)
  const embeddedImage = await pdf.embedJpg(await image.blob.arrayBuffer())

  page.drawRectangle({
    x: 0,
    y: 0,
    width: mmToPt(layout.page.width),
    height: mmToPt(layout.page.height),
    color: rgb(1, 1, 1),
  })

  layout.slots.forEach((slot) => {
    const fitted = fitImageInRect(slot, image.width, image.height)

    page.drawImage(embeddedImage, {
      x: mmToPt(fitted.xMm),
      y: pageHeightPt - mmToPt(fitted.yMm + fitted.heightMm),
      width: mmToPt(fitted.widthMm),
      height: mmToPt(fitted.heightMm),
    })
  })

  const bytes = await pdf.save()
  const pdfBytes = new Uint8Array(bytes.length)
  pdfBytes.set(bytes)

  return new Blob([pdfBytes], { type: 'application/pdf' })
}

export function buildPdfFileName(sourceName: string): string {
  const trimmed = sourceName.replace(/\.[^.]+$/, '').trim() || 'planchette-export'
  const safeName = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return `${safeName || 'planchette-export'}-a4.pdf`
}