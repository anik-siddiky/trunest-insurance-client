import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/theme-provider'
import { RouterProvider } from 'react-router'
import Router from './Router/Router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={Router}></RouterProvider>
    </ThemeProvider>
  </StrictMode>,
)
