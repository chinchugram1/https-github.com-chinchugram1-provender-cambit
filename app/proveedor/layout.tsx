"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  Tag,
  Settings,
  Menu,
  X,
  MapPin,
  DollarSign,
  BarChart3,
  FileText,
  Crown,
  Target,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const regularNavigation = [
  { name: "Dashboard", href: "/proveedor/dashboard", icon: Home },
  { name: "Productos", href: "/proveedor/productos", icon: Package },
  { name: "Clientes", href: "/proveedor/clientes", icon: Users },
  { name: "Pedidos", href: "/proveedor/pedidos", icon: ShoppingCart },
  { name: "Promociones", href: "/proveedor/promociones", icon: Tag },
  { name: "Control de Precios", href: "/proveedor/control-precios", icon: DollarSign },
  { name: "Rutas", href: "/proveedor/rutas", icon: MapPin },
  { name: "Cuenta Corriente", href: "/proveedor/cuenta-corriente", icon: FileText },
  { name: "Parametrías", href: "/proveedor/parametrias", icon: Settings },
  { name: "Configuración", href: "/proveedor/configuracion", icon: Settings },
]

const premiumNavigation = [
  { name: "Rutas Inteligentes", href: "/proveedor/rutas-inteligentes", icon: MapPin, isPremium: true },
  { name: "Campañas Segmentadas", href: "/proveedor/campanas-segmentadas", icon: Target, isPremium: true },
  { name: "Stock Predictivo", href: "/proveedor/stock-predictivo", icon: Package, isPremium: true },
  { name: "Calendario Promociones", href: "/proveedor/calendario-promociones", icon: Calendar, isPremium: true },
  { name: "Reportería", href: "/proveedor/reportes", icon: BarChart3, isPremium: true },
]

export default function ProveedorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <h1 className="text-xl font-bold text-[#0492C2]">PROVENDER</h1>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
            {regularNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive ? "bg-[#0492C2] text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}

            {/* Separador Premium */}
            <div className="pt-4 pb-2">
              <div className="flex items-center px-2">
                <div className="flex-1 border-t border-gray-300"></div>
                <div className="px-3 text-xs font-medium text-gray-500 bg-gray-50 rounded-full flex items-center gap-1">
                  <Crown className="h-3 w-3 text-yellow-500" />
                  PREMIUM
                </div>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
            </div>

            {premiumNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md ${
                    isActive ? "bg-[#0492C2] text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Crown className="h-3 w-3 text-yellow-500" />
                    <Badge
                      variant="secondary"
                      className="text-xs px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 font-semibold"
                    >
                      PRO
                    </Badge>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col transition-transform duration-300 ${
          desktopSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-hidden">
          <div className="flex h-16 items-center px-4 border-b">
            <h1 className="text-xl font-bold text-[#0492C2]">PROVENDER</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
              className="ml-auto"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
            {regularNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive ? "bg-[#0492C2] text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                </Link>
              )
            })}

            {/* Separador Premium */}
            <div className="pt-4 pb-2">
              <div className="flex items-center px-2">
                <div className="flex-1 border-t border-gray-300"></div>
                <div className="px-3 text-xs font-medium text-gray-500 bg-gray-50 rounded-full flex items-center gap-1">
                  <Crown className="h-3 w-3 text-yellow-500" />
                  PREMIUM
                </div>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
            </div>

            {premiumNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md ${
                    isActive ? "bg-[#0492C2] text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Crown className="h-3 w-3 text-yellow-500" />
                    <Badge
                      variant="secondary"
                      className="text-xs px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 font-semibold"
                    >
                      PRO
                    </Badge>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${desktopSidebarOpen ? "lg:pl-64" : "lg:pl-0"}`}>
        <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menú</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`hidden lg:flex ${desktopSidebarOpen ? "lg:hidden" : ""}`}
            onClick={() => setDesktopSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menú</span>
          </Button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <span className="text-sm text-gray-700">Proveedor</span>
            </div>
          </div>
        </div>
        <main className="py-6">{children}</main>
      </div>
    </div>
  )
}
