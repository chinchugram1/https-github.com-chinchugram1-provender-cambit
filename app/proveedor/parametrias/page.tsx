"use client"

import { Package, Truck, BarChart3, Users, Settings, ChevronRight } from "lucide-react"
import Link from "next/link"

const parametriasSections = [
  {
    title: "Productos",
    description: "Gestiona categorías, marcas, subcategorías y unidades de medida",
    icon: Package,
    href: "/proveedor/parametrias/productos",
    subsections: [
      { name: "Categorías", count: 12 },
      { name: "Marcas", count: 25 },
      { name: "Subcategorías", count: 34 },
      { name: "Unidades de Medida", count: 6 },
    ],
    color: "bg-blue-500",
    totalItems: 77,
  },
  {
    title: "Transporte",
    description: "Administra zonas, transportistas, choferes y motivos de rechazo",
    icon: Truck,
    href: "/proveedor/parametrias/transporte",
    subsections: [
      { name: "Zonas", count: 8 },
      { name: "Transportistas", count: 15 },
      { name: "Choferes", count: 23 },
      { name: "Motivos de Rechazo", count: 12 },
    ],
    color: "bg-green-500",
    totalItems: 58,
  },
]

export default function ParametriasPage() {
  const totalParametros = parametriasSections.reduce((sum, section) => sum + section.totalItems, 0)
  const totalSubsecciones = parametriasSections.reduce((sum, section) => sum + section.subsections.length, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Parametrías del Sistema</h1>
        <p className="text-gray-600">Configura y gestiona los parámetros básicos de tu sistema</p>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-provender-primary rounded-lg flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalParametros}</p>
          <p className="text-sm text-gray-600">Total Parámetros</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{parametriasSections.length}</p>
          <p className="text-sm text-gray-600">Secciones Principales</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalSubsecciones}</p>
          <p className="text-sm text-gray-600">Subsecciones</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">156</p>
          <p className="text-sm text-gray-600">Items Asociados</p>
        </div>
      </div>

      {/* Secciones Principales */}
      <div className="space-y-6">
        {parametriasSections.map((section) => {
          const Icon = section.icon
          return (
            <div key={section.title} className="card">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-gray-600 mb-4">{section.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-gray-600">Total: {section.totalItems}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">{section.subsections.length} subsecciones</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href={section.href} className="btn-primary flex items-center space-x-2">
                  <span>Gestionar</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Subsecciones */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {section.subsections.map((subsection) => (
                  <div key={subsection.name} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{subsection.name}</p>
                        <p className="text-sm text-gray-600">{subsection.count} elementos</p>
                      </div>
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-700">{subsection.count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Acciones Rápidas */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/proveedor/parametrias/productos/categorias"
            className="p-4 border border-gray-200 rounded-lg hover:border-provender-primary hover:bg-provender-primary/5 transition-colors"
          >
            <Package className="w-8 h-8 text-blue-500 mb-2" />
            <p className="font-medium text-gray-900">Gestionar Categorías</p>
            <p className="text-sm text-gray-600">Administrar categorías de productos</p>
          </Link>

          <Link
            href="/proveedor/parametrias/productos/marcas"
            className="p-4 border border-gray-200 rounded-lg hover:border-provender-primary hover:bg-provender-primary/5 transition-colors"
          >
            <Package className="w-8 h-8 text-green-500 mb-2" />
            <p className="font-medium text-gray-900">Gestionar Marcas</p>
            <p className="text-sm text-gray-600">Administrar marcas de productos</p>
          </Link>

          <Link
            href="/proveedor/parametrias/transporte/zonas"
            className="p-4 border border-gray-200 rounded-lg hover:border-provender-primary hover:bg-provender-primary/5 transition-colors"
          >
            <Truck className="w-8 h-8 text-purple-500 mb-2" />
            <p className="font-medium text-gray-900">Gestionar Zonas</p>
            <p className="text-sm text-gray-600">Configurar zonas de entrega</p>
          </Link>

          <Link
            href="/proveedor/parametrias/transporte/transportistas"
            className="p-4 border border-gray-200 rounded-lg hover:border-provender-primary hover:bg-provender-primary/5 transition-colors"
          >
            <Truck className="w-8 h-8 text-orange-500 mb-2" />
            <p className="font-medium text-gray-900">Gestionar Transportistas</p>
            <p className="text-sm text-gray-600">Administrar transportistas</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
