"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Truck, MapPin, History, Calendar, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TransportistaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {
    const type = localStorage.getItem("userType")
    if (type !== "transportista") {
      router.push("/")
      return
    }
    setUserType(type)
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0492C2]"></div>
      </div>
    )
  }

  const navigation = [
    {
      name: "Ruta de Hoy",
      href: "/transportista/ruta",
      icon: MapPin,
      current: pathname === "/transportista/ruta",
    },
    {
      name: "Próxima Ruta",
      href: "/transportista/proxima-ruta",
      icon: Calendar,
      current: pathname === "/transportista/proxima-ruta",
    },
    {
      name: "Historial",
      href: "/transportista/historial",
      icon: History,
      current: pathname === "/transportista/historial",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header móvil */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#0492C2] rounded-full flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#0492C2]">PROVENDER</h1>
              <p className="text-xs text-gray-500">Transportista</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="pb-20">{children}</main>

      {/* Navegación inferior fija */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="grid grid-cols-3">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`flex flex-col items-center justify-center py-3 px-2 text-xs font-medium transition-colors ${
                  item.current ? "text-[#0492C2] bg-blue-50" : "text-gray-500 hover:text-[#0492C2]"
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
