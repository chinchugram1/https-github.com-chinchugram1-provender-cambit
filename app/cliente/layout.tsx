"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import {
  ShoppingCart,
  Gift,
  Menu,
  X,
  Home,
  MapPin,
  Settings,
  Building2,
  Crown,
  Brain,
  RefreshCw,
  History,
} from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  unit: string
  brand: string
  originalPrice?: number
  discount?: number
}

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userType, setUserType] = useState<"razon-social" | "sucursal">("sucursal")
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Obtener tipo de usuario del localStorage
    const type = localStorage.getItem("userType") as "razon-social" | "sucursal"
    if (type) {
      setUserType(type)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    router.push("/")
  }

  const navigationItems = [
    { name: "Dashboard", href: "/cliente/dashboard", icon: Home },
    { name: "Catálogo", href: "/cliente/catalogo", icon: ShoppingCart },
    { name: "Promociones", href: "/cliente/promociones", icon: Gift },
    { name: "Historial", href: "/cliente/historial", icon: History },
    { name: "En Camino", href: "/cliente/pedidos/en-camino", icon: MapPin },
  ]

  // Agregar navegación específica por tipo de usuario
  if (userType === "razon-social") {
    navigationItems.splice(4, 0, { name: "Sucursales", href: "/cliente/sucursales", icon: Building2 })
  }

  // Funcionalidades Premium
  const premiumItems = [
    { name: "Pedido Inteligente", href: "/cliente/pedido-inteligente", icon: Brain, premium: true },
    { name: "Reabastecimiento", href: "/cliente/reabastecimiento", icon: RefreshCw, premium: true },
  ]

  const bottomNavItems = [
    { name: "Inicio", href: "/cliente/dashboard", icon: Home },
    { name: "Catálogo", href: "/cliente/catalogo", icon: ShoppingCart },
    { name: "Promociones", href: "/cliente/promociones", icon: Gift },
    { name: "Historial", href: "/cliente/historial", icon: History },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/cliente/dashboard" className="flex items-center space-x-2">
              <Image src="/images/provender-logo.png" alt="ProVender" width={32} height={32} className="w-8 h-8" />
              <span className="text-xl font-bold text-[#0492C2]">PROVENDER</span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            {userType === "sucursal" && <span className="text-sm text-gray-600 hidden sm:block">Sucursal Centro</span>}
            <Link href="/cliente/carrito" className="relative p-2 hover:bg-gray-100 rounded-lg">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar para desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-64 lg:flex lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200 pt-16">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive ? "bg-[#0492C2] text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    />
                    {item.name}
                  </Link>
                )
              })}

              {/* Sección Premium */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <div className="px-2 mb-2">
                  <div className="flex items-center space-x-1">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                      PREMIUM
                    </span>
                  </div>
                </div>
                {premiumItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                          : "text-gray-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-purple-700"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-5 w-5 ${
                          isActive ? "text-white" : "text-purple-500 group-hover:text-purple-600"
                        }`}
                      />
                      {item.name}
                      {item.premium && <Crown className="ml-auto w-3 h-3 text-yellow-500" />}
                    </Link>
                  )
                })}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <Link
                  href="/cliente/configuracion"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === "/cliente/configuracion"
                      ? "bg-[#0492C2] text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Settings
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      pathname === "/cliente/configuracion" ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  Configuración
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </aside>

      {/* Sidebar móvil */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4 mb-5">
                <Image src="/images/provender-logo.png" alt="ProVender" width={32} height={32} className="w-8 h-8" />
                <span className="ml-2 text-xl font-bold text-[#0492C2]">PROVENDER</span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                        isActive ? "bg-[#0492C2] text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-4 flex-shrink-0 h-6 w-6 ${
                          isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      {item.name}
                    </Link>
                  )
                })}

                {/* Sección Premium Móvil */}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="px-2 mb-2">
                    <div className="flex items-center space-x-1">
                      <Crown className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                        PREMIUM
                      </span>
                    </div>
                  </div>
                  {premiumItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                            : "text-gray-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-purple-700"
                        }`}
                      >
                        <item.icon
                          className={`mr-4 flex-shrink-0 h-6 w-6 ${
                            isActive ? "text-white" : "text-purple-500 group-hover:text-purple-600"
                          }`}
                        />
                        {item.name}
                        {item.premium && <Crown className="ml-auto w-3 h-3 text-yellow-500" />}
                      </Link>
                    )
                  })}
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200">
                  <Link
                    href="/cliente/configuracion"
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      pathname === "/cliente/configuracion"
                        ? "bg-[#0492C2] text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Settings
                      className={`mr-4 flex-shrink-0 h-6 w-6 ${
                        pathname === "/cliente/configuracion" ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    />
                    Configuración
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <main className="lg:pl-64 pt-16">
        <div className="pb-20 lg:pb-4">{children}</div>
      </main>

      {/* Navegación inferior móvil */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-4 gap-1">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-1 text-xs ${
                  isActive ? "text-[#0492C2] bg-blue-50" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <item.icon className={`h-5 w-5 mb-1 ${isActive ? "text-[#0492C2]" : "text-gray-400"}`} />
                <span className="truncate">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
