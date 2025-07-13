import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/theme-provider'
import { RouterProvider } from 'react-router'
import Router from './Router/Router'
import AuthProvider from './Contexts/AuthProvider'
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <Toaster />
        <RouterProvider router={Router}></RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
