import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // <-- added weights
})

export const metadata: Metadata = {
  title: "PROVENDER - Gestión para Distribuidores",
  description: "Aplicación para distribuidores informales de Argentina",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} bg-gray-50`}>{children}</body>
    </html>
  )
}
