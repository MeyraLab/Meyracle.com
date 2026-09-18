import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import './index.css'
import { Home } from './pages/Home'
import { About, NotFound, Privacy, Terms } from './pages/AboutLegal'
import { ProductsIndex, VenturePage } from './pages/Ventures'
import { Pricing } from './pages/Pricing'
import { applyTheme, getInitialTheme } from './theme'

applyTheme(getInitialTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsIndex />} />
        <Route path="/products/vibe-coding" element={<Navigate to="/" replace />} />
        <Route path="/products/:slug" element={<VenturePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/store" element={<Navigate to="/" replace />} />
        <Route path="/product/:id" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/legal/privacy" element={<Navigate to="/privacy" replace />} />
        <Route path="/legal/terms" element={<Navigate to="/terms" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)


