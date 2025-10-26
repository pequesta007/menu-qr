import './globals.css'
import React from 'react'

export const metadata = { title: 'Menu QR', description: 'Carta digital con QR' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="border-b bg-white">
          <div className="container flex items-center justify-between py-3">
            <a href="/" className="font-semibold">Menu QR</a>
            <nav className="flex items-center gap-4 text-sm">
              <a href="/employee" className="hover:underline">Empleado</a>
              <a href="/admin" className="hover:underline">Admin</a>
            </nav>
          </div>
        </header>
        <main className="container py-6">{children}</main>
        <footer className="py-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} Menu QR</footer>
      </body>
    </html>
  )
}
