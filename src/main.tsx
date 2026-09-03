import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageProvider'

// Intellectual Property & Copyright Notice in Browser Console
if (typeof window !== 'undefined') {
  console.log(
    '%c ENVER EREN TATLIDIL // ARCHITECTURAL DIGITAL EXPERIENCES %c\n' +
    `© ${new Date().getFullYear()} Enver Eren Tatlıdil. All Rights Reserved.\n` +
    'Proprietary 3D Concrete Monolith Engine & Procedural Texture Architecture.\n' +
    'Unauthorized reproduction, decompilation, scraping, or code theft is strictly prohibited.',
    'background: #09090b; color: #f59e0b; font-weight: 900; font-size: 13px; padding: 6px 12px; border: 1px solid #27272a; font-family: monospace;',
    'color: #a1a1aa; font-size: 11px; font-family: monospace; line-height: 1.6;'
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
