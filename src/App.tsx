import { HashRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import iconUrl from './assets/icon.svg'
import { HomePage } from './apps/home/HomePage'
import { A6ToA4ToolPage } from './apps/a6-to-a4/A6ToA4ToolPage'
import { LanguageSwitcher } from './core/ui/LanguageSwitcher'
import { useI18n } from './core/i18n/useI18n'

function AppShell() {
  const { messages } = useI18n()

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand-mark" to="/">
          <img className="brand-logo" src={iconUrl} alt={messages.app.brandAlt} />
          <span className="brand-copy">
            <strong>{messages.app.brandName}</strong>
            <span>{messages.app.brandTagline}</span>
          </span>
        </Link>
        <div className="header-actions">
          <LanguageSwitcher />
          <nav className="site-nav" aria-label={messages.app.primaryNavAria}>
            <NavLink className="nav-link" to="/">
              {messages.app.navHome}
            </NavLink>
            <NavLink className="nav-link" to="/tools/a6-to-a4">
              {messages.app.navA6ToA4}
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools/a6-to-a4" element={<A6ToA4ToolPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <p>{messages.app.footerNote}</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  )
}

export default App
