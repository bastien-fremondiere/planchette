import { Link } from 'react-router-dom'
import { useI18n } from '../../core/i18n/useI18n'

export function HomePage() {
  const { messages } = useI18n()
  const { home } = messages

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">{home.eyebrow}</span>
          <h1>{home.title}</h1>
          <p className="hero-text">{home.intro}</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/tools/a6-to-a4">
              {home.openFirstTool}
            </Link>
            <a className="button button-secondary" href="#tool-grid">
              {home.viewRoadmap}
            </a>
          </div>
        </div>
        <div className="hero-sheet" aria-hidden="true">
          <div className="sheet-card">
            <div className="sheet-grid">
              <div className="sheet-tile"></div>
              <div className="sheet-tile"></div>
              <div className="sheet-tile"></div>
              <div className="sheet-tile"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="info-strip">
        <div>
          <strong>{home.cards.webOnlyTitle}</strong>
          <p>{home.cards.webOnlyText}</p>
        </div>
        <div>
          <strong>{home.cards.mobileTitle}</strong>
          <p>{home.cards.mobileText}</p>
        </div>
        <div>
          <strong>{home.cards.expandTitle}</strong>
          <p>{home.cards.expandText}</p>
        </div>
      </section>

      <section className="tool-grid" id="tool-grid">
        <article className="tool-card">
          <span className="eyebrow">{home.firstTool.eyebrow}</span>
          <h2>{home.firstTool.name}</h2>
          <p>{home.firstTool.description}</p>
          <Link className="button button-primary" to="/tools/a6-to-a4">
            {home.firstTool.launch}
          </Link>
        </article>
        <article className="tool-card tool-card-muted">
          <span className="eyebrow">{home.soonCard.eyebrow}</span>
          <h2>{home.soonCard.title}</h2>
          <p>{home.soonCard.text}</p>
        </article>
      </section>
    </div>
  )
}