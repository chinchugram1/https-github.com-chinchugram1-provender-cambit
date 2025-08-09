"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Star,
  MapPin,
  Settings,
  Bell,
  Menu,
  LogOut,
  User,
  Gift,
  Clock,
  Zap,
} from "lucide-react"
import { logoutAction } from "@/app/actions/auth"

const navigation = [
  {
    name: "Dashboard",
    href: "/cliente/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Catálogo",
    href: "/cliente/catalogo",
    icon: ShoppingCart,
  },
  {
    name: "Mi Carrito",
    href: "/cliente/carrito",
    icon: ShoppingCart,
    badge: "3",
  },
  {
    name: "Nuevo Pedido",
    href: "/cliente/pedido/nuevo",
    icon: Package,
  },
  {
    name: "Mis Pedidos",
    href: "/cliente/pedido",
    icon: Package,
  },
  {
    name: "Pedidos en Camino",
    href: "/cliente/pedidos/en-camino",
    icon: Clock,
  },
  {
    name: "Historial",
    href: "/cliente/historial",
    icon: Package,
  },
  {
    name: "Promociones",
    href: "/cliente/promociones",
    icon: Gift,
  },
  {
    name: "Sucursales",
    href: "/cliente/sucursales",
    icon: MapPin,
  },
]

const premiumFeatures = [
  {
    name: "Pedido Inteligente",
    href: "/cliente/pedido-inteligente",
    icon: Zap,
    premium: true,
  },
  {
    name: "Reabastecimiento",
    href: "/cliente/reabastecimiento",
    icon: Star,
    premium: true,
  },
]

export default function ClienteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logoutAction()
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center px-4">
        <h1 className="text-xl font-bold text-[#0492C2]">PROVENDER</h1>
        <Badge variant="secondary" className="ml-2 text-xs">
          Cliente
        </Badge>
      </div>
      <nav className="flex flex-1 flex-col px-4 pb-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                        isActive ? "bg-[#0492C2] text-white" : "text-gray-700 hover:text-[#0492C2] hover:bg-gray-50"
                      }`}
                      onClick={() => mobile && setSidebarOpen(false)}
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {item.name}
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wide">
              Funciones Premium
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {premiumFeatures.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                      }`}
                      onClick={() => mobile && setSidebarOpen(false)}
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {item.name}
                      <Badge variant="outline" className="ml-auto text-xs border-purple-200 text-purple-600">
                        IA
                      </Badge>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
          <li className="mt-auto">
            <ul role="list" className="-mx-2 space-y-1">
              <li>
                <Link
                  href="/cliente/configuracion"
                  className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                    pathname === "/cliente/configuracion"
                      ? "bg-[#0492C2] text-white"
                      : "text-gray-700 hover:text-[#0492C2] hover:bg-gray-50"
                  }`}
                  onClick={() => mobile && setSidebarOpen(false)}
                >
                  <Settings className="h-6 w-6 shrink-0" />
                  Configuración
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-6 w-6 shrink-0" />
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )

  return (
    <div className="h-screen flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white">
          <Sidebar />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-72 flex flex-col flex-1">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <Sidebar mobile />
            </SheetContent>
          </Sheet>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-x-2">
                <div className="h-8 w-8 rounded-full bg-[#0492C2] flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold">Juan Pérez</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
