import {
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useI18n } from '../../core/i18n/useI18n'
import {
  buildPrintLayout,
  clampElementCount,
  clampMarginMm,
  MAX_MARGIN_MM,
  type PageDimensionsMm,
  type PageOrientation,
} from './layout'
import { prepareImage, type PreparedImage } from './image'
import { buildPdfFileName, createA6ToA4Pdf } from './pdf'
import {
  compressionPresets,
  getCompressionPreset,
  type CompressionPresetId,
} from './presets'

type PreviewImage = PreparedImage & {
  previewUrl: string
}

const COUNT_PRESETS = [1, 2, 4, 6, 8, 9, 12] as const

export function A6ToA4ToolPage() {
  const { messages } = useI18n()
  const text = messages.toolA6ToA4

  const [file, setFile] = useState<File | null>(null)
  const [elementCount, setElementCount] = useState(4)
  const [countInput, setCountInput] = useState('4')
  const [orientation, setOrientation] = useState<PageOrientation>('portrait')
  const [marginMm, setMarginMm] = useState(8)
  const [presetId, setPresetId] = useState<CompressionPresetId>('balanced')
  const [preparedImage, setPreparedImage] = useState<PreviewImage | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isPreparing, setIsPreparing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const deferredMarginMm = useDeferredValue(marginMm)
  const layout = useMemo(
    () => buildPrintLayout(deferredMarginMm, { count: elementCount, orientation }),
    [deferredMarginMm, elementCount, orientation],
  )
  const preset = getCompressionPreset(presetId)
  const presetText = text.compressionOptions[presetId]
  const copiesSummary =
    layout.count === 1
      ? text.summary.copiesSingle
      : text.summary.copiesPlural.replace('{count}', String(layout.count))
  const gridLabel = `${layout.grid.cols} x ${layout.grid.rows}`

  useEffect(() => {
    if (!preparedImage) {
      return undefined
    }

    return () => {
      URL.revokeObjectURL(preparedImage.previewUrl)
    }
  }, [preparedImage])

  useEffect(() => {
    let cancelled = false
    let previewUrl = ''

    if (!file) {
      setPreparedImage(null)
      setErrorMessage(null)
      return undefined
    }

    setIsPreparing(true)
    setErrorMessage(null)

    void prepareImage(file, preset)
      .then((nextImage) => {
        previewUrl = URL.createObjectURL(nextImage.blob)

        if (cancelled) {
          URL.revokeObjectURL(previewUrl)
          return
        }

        startTransition(() => {
          setPreparedImage({
            ...nextImage,
            previewUrl,
          })
        })
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return
        }

        setPreparedImage(null)
        setErrorMessage(error instanceof Error ? error.message : text.errors.prepareFailed)
      })
      .finally(() => {
        if (!cancelled) {
          setIsPreparing(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [file, preset, text.errors.prepareFailed])

  const previewRects = useMemo(() => layout.slots, [layout])

  async function handleGeneratePdf() {
    if (!file || !preparedImage) {
      setErrorMessage(text.errors.chooseImage)
      return
    }

    setIsGenerating(true)
    setErrorMessage(null)

    try {
      const pdfBlob = await createA6ToA4Pdf({ image: preparedImage, layout })
      downloadBlob(pdfBlob, buildPdfFileName(file.name))
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : text.errors.pdfFailed)
    } finally {
      setIsGenerating(false)
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null

    if (!nextFile) {
      setFile(null)
      return
    }

    if (!nextFile.type.startsWith('image/')) {
      setErrorMessage(text.errors.invalidImageType)
      setFile(null)
      return
    }

    setFile(nextFile)
  }

  function handleCountInputChange(rawValue: string) {
    setCountInput(rawValue)
    const parsed = Number(rawValue)
    if (rawValue.trim() !== '' && Number.isFinite(parsed) && parsed >= 1) {
      setElementCount(clampElementCount(parsed))
    }
  }

  function handleCountBlur() {
    const clamped = clampElementCount(Number(countInput))
    setElementCount(clamped)
    setCountInput(String(clamped))
  }

  function handleSelectPresetCount(count: number) {
    setElementCount(count)
    setCountInput(String(count))
  }

  return (
    <div className="tool-page">
      <header className="tool-header">
        <span className="eyebrow">{text.eyebrow}</span>
        <h1>{text.title}</h1>
        <p>{text.intro}</p>
        <div className="meta-list" aria-label={text.summaryAria}>
          <div>
            <span className="meta-label">{text.summary.outputLabel}</span>
            <span className="meta-value">
              {orientation === 'landscape'
                ? text.summary.outputLandscape
                : text.summary.outputPortrait}
            </span>
          </div>
          <div>
            <span className="meta-label">{text.summary.copiesLabel}</span>
            <span className="meta-value">
              {copiesSummary} ({gridLabel})
            </span>
          </div>
          <div>
            <span className="meta-label">{text.summary.marginLabel}</span>
            <span className="meta-value">{layout.marginMm} mm</span>
          </div>
          <div>
            <span className="meta-label">{text.summary.compressionLabel}</span>
            <span className="meta-value">{presetText.label}</span>
          </div>
        </div>
      </header>

      <div className="preview-grid">
        <section className="panel">
          <fieldset className="field-set">
            <legend>{text.sourceImage.legend}</legend>
            <div className="uploader">
              <div className="field-label-row">
                <label htmlFor="source-image">{text.sourceImage.choose}</label>
                <span>{file?.name ?? text.sourceImage.noneSelected}</span>
              </div>
              <input id="source-image" type="file" accept="image/*" onChange={handleFileChange} />
              <p className="supporting-note">{text.sourceImage.note}</p>
            </div>
          </fieldset>

          <fieldset className="field-set">
            <legend>{text.layout.legend}</legend>
            <div className="field">
              <div className="field-label-row">
                <label htmlFor="element-count">{text.layout.countLabel}</label>
                <span>{gridLabel}</span>
              </div>
              <div className="count-input-row">
                <input
                  id="element-count"
                  type="number"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  value={countInput}
                  onChange={(event) => handleCountInputChange(event.target.value)}
                  onBlur={handleCountBlur}
                />
                <div className="count-presets" role="group" aria-label={text.layout.countLabel}>
                  {COUNT_PRESETS.map((presetCount) => (
                    <button
                      key={presetCount}
                      type="button"
                      className={
                        elementCount === presetCount ? 'count-chip is-active' : 'count-chip'
                      }
                      onClick={() => handleSelectPresetCount(presetCount)}
                    >
                      {presetCount}
                    </button>
                  ))}
                </div>
              </div>
              <p className="supporting-note">{text.layout.countHint}</p>
            </div>
            <div className="field">
              <div className="field-label-row">
                <span>{text.layout.orientationLabel}</span>
                <span>
                  {orientation === 'landscape' ? text.layout.landscape : text.layout.portrait}
                </span>
              </div>
              <div
                className="segmented-control"
                role="group"
                aria-label={text.layout.orientationLabel}
              >
                <button
                  type="button"
                  className={
                    orientation === 'portrait'
                      ? 'segmented-button is-active'
                      : 'segmented-button'
                  }
                  aria-pressed={orientation === 'portrait'}
                  onClick={() => setOrientation('portrait')}
                >
                  {text.layout.portrait}
                </button>
                <button
                  type="button"
                  className={
                    orientation === 'landscape'
                      ? 'segmented-button is-active'
                      : 'segmented-button'
                  }
                  aria-pressed={orientation === 'landscape'}
                  onClick={() => setOrientation('landscape')}
                >
                  {text.layout.landscape}
                </button>
              </div>
              <p className="supporting-note">{text.layout.orientationHint}</p>
            </div>
            <div className="field">
              <div className="field-label-row">
                <label htmlFor="margin">{text.layout.marginLabel}</label>
                <span>{layout.marginMm} mm</span>
              </div>
              <div className="slider-wrap">
                <input
                  id="margin"
                  type="range"
                  min="0"
                  max={String(MAX_MARGIN_MM)}
                  step="1"
                  value={marginMm}
                  onChange={(event) => setMarginMm(clampMarginMm(Number(event.target.value)))}
                />
                <small>{text.layout.marginHint}</small>
              </div>
            </div>
            <div className="field">
              <div className="field-label-row">
                <label htmlFor="compression">{text.layout.compressionLabel}</label>
                <span>{presetText.label}</span>
              </div>
              <select
                id="compression"
                value={presetId}
                onChange={(event) => setPresetId(event.target.value as CompressionPresetId)}
              >
                {compressionPresets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {text.compressionOptions[item.id].label}
                  </option>
                ))}
              </select>
              <p className="supporting-note">{presetText.description}</p>
            </div>
          </fieldset>

          <div className="tool-actions">
            <button
              className="button button-primary"
              type="button"
              onClick={handleGeneratePdf}
              disabled={!preparedImage || isPreparing || isGenerating}
            >
              {isGenerating ? text.actions.generating : text.actions.generate}
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => {
                setFile(null)
                setPreparedImage(null)
                setErrorMessage(null)
              }}
            >
              {text.actions.reset}
            </button>
          </div>

          <div className="status-row" aria-live="polite">
            {isPreparing ? <p className="status-text">{text.status.preparing}</p> : null}
          </div>

          {errorMessage ? <div className="error-card">{errorMessage}</div> : null}
        </section>

        <section className="preview-card">
          <div>
            <h2>{text.preview.title}</h2>
            <p>{text.preview.text}</p>
          </div>
          <div className={orientation === 'landscape' ? 'preview-shell is-landscape' : 'preview-shell'}>
            <div className="preview-sheet">
              {preparedImage ? null : (
                <div className="preview-empty">
                  <p className="empty-state">{text.preview.empty}</p>
                </div>
              )}
              {previewRects.map((slot, index) => (
                <div
                  className="preview-slot"
                  key={`${slot.xMm}-${slot.yMm}-${index}`}
                  style={toPreviewStyle(slot, layout.page)}
                >
                  {preparedImage ? (
                    <img
                      className="preview-image"
                      src={preparedImage.previewUrl}
                      alt=""
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div className="preview-meta">
            <div>
              <span className="summary-label">{text.preview.pageSizeLabel}</span>
              <span className="summary-value">
                {layout.page.width} x {layout.page.height} mm
              </span>
            </div>
            <div>
              <span className="summary-label">{text.preview.gridLabel}</span>
              <span className="summary-value">{gridLabel}</span>
            </div>
            <div>
              <span className="summary-label">{text.preview.slotSizeLabel}</span>
              <span className="summary-value">
                {Math.round(layout.slotSizeMm.widthMm)} x {Math.round(layout.slotSizeMm.heightMm)} mm
              </span>
            </div>
          </div>
        </section>
      </div>

      <section className="output-card">
        <h2>{text.output.title}</h2>
        <div className="summary-list">
          <div>
            <span className="summary-label">{text.output.placementLabel}</span>
            <span className="summary-value">
              {text.output.placementGrid
                .replace('{cols}', String(layout.grid.cols))
                .replace('{rows}', String(layout.grid.rows))}
            </span>
          </div>
          <div>
            <span className="summary-label">{text.output.backgroundLabel}</span>
            <span className="summary-value">{text.output.backgroundValue}</span>
          </div>
          <div>
            <span className="summary-label">{text.output.fitLabel}</span>
            <span className="summary-value">{text.output.fitValue}</span>
          </div>
          <div>
            <span className="summary-label">{text.output.handlingLabel}</span>
            <span className="summary-value">{text.output.handlingValue}</span>
          </div>
        </div>
        <p className="output-note">{text.output.note}</p>
      </section>
    </div>
  )
}

function toPreviewStyle(
  rect: {
    xMm: number
    yMm: number
    widthMm: number
    heightMm: number
  },
  page: PageDimensionsMm,
): React.CSSProperties {
  return {
    left: `${(rect.xMm / page.width) * 100}%`,
    top: `${(rect.yMm / page.height) * 100}%`,
    width: `${(rect.widthMm / page.width) * 100}%`,
    height: `${(rect.heightMm / page.height) * 100}%`,
  }
}

function downloadBlob(blob: Blob, fileName: string) {
  const objectUrl = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = objectUrl
  anchor.download = fileName
  anchor.click()
  URL.revokeObjectURL(objectUrl)
}