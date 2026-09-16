import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Home } from './pages/Home'
import { ProductDetail } from './pages/ProductDetail'
import { About, NotFound, Privacy, Terms } from './pages/AboutLegal'
import { ProductsIndex, VenturePage } from './pages/Ventures'
import { applyTheme, getInitialTheme } from './theme'

applyTheme(getInitialTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsIndex />} />
        <Route path="/products/:slug" element={<VenturePage />} />
        <Route path="/store" element={<App />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/legal/privacy" element={<Privacy />} />
        <Route path="/legal/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
