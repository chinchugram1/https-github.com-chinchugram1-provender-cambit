"use client"

import { Package, Tag, Layers, Ruler, Plus, BarChart3, TrendingUp, ArrowLeft } from "lucide-react"
import Link from "next/link"

const productosSubsections = [
  {
    title: "Categorías",
    description: "Gestiona las categorías principales de productos",
    icon: Package,
    href: "/proveedor/parametrias/productos/categorias",
    stats: { total: 12, activas: 10, productos: 156 },
    color: "bg-blue-500",
    actions: [
      { label: "Ver todas", href: "/proveedor/parametrias/productos/categorias" },
      { label: "Nueva categoría", href: "/proveedor/parametrias/productos/categorias/nueva" },
    ],
  },
  {
    title: "Marcas",
    description: "Administra las marcas disponibles en tu catálogo",
    icon: Tag,
    href: "/proveedor/parametrias/productos/marcas",
    stats: { total: 25, activas: 23, productos: 143 },
    color: "bg-green-500",
    actions: [
      { label: "Ver todas", href: "/proveedor/parametrias/productos/marcas" },
      { label: "Nueva marca", href: "/proveedor/parametrias/productos/marcas/nueva" },
    ],
  },
  {
    title: "Subcategorías",
    description: "Define subcategorías específicas por marca y categoría",
    icon: Layers,
    href: "/proveedor/parametrias/productos/subcategorias",
    stats: { total: 34, activas: 28, productos: 89 },
    color: "bg-purple-500",
    actions: [
      { label: "Ver todas", href: "/proveedor/parametrias/productos/subcategorias" },
      { label: "Nueva subcategoría", href: "/proveedor/parametrias/productos/subcategorias/nueva" },
    ],
  },
  {
    title: "Unidades de Medida",
    description: "Configura las unidades de medida para productos",
    icon: Ruler,
    href: "/proveedor/parametrias/productos/unidades-medida",
    stats: { total: 6, activas: 5, productos: 156 },
    color: "bg-orange-500",
    actions: [
      { label: "Ver todas", href: "/proveedor/parametrias/productos/unidades-medida" },
      { label: "Nueva unidad", href: "/proveedor/parametrias/productos/unidades-medida/nueva" },
    ],
  },
]

export default function ProductosParametriasPage() {
  const totalParametros = productosSubsections.reduce((sum, section) => sum + section.stats.total, 0)
  const totalActivos = productosSubsections.reduce((sum, section) => sum + section.stats.activas, 0)
  const totalProductos = 156 // Total único de productos

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/proveedor/parametrias"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Parametrías de Productos</h1>
          <p className="text-gray-600">Gestiona categorías, marcas, subcategorías y unidades de medida</p>
        </div>
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
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalActivos}</p>
          <p className="text-sm text-gray-600">Parámetros Activos</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalProductos}</p>
          <p className="text-sm text-gray-600">Productos Asociados</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{productosSubsections.length}</p>
          <p className="text-sm text-gray-600">Secciones</p>
        </div>
      </div>

      {/* Subsecciones de Productos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {productosSubsections.map((section) => {
          const Icon = section.icon
          return (
            <div key={section.title} className="card">
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h3>
                  <p className="text-gray-600 text-sm">{section.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{section.stats.total}</p>
                  <p className="text-xs text-gray-600">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{section.stats.activas}</p>
                  <p className="text-xs text-gray-600">Activas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{section.stats.productos}</p>
                  <p className="text-xs text-gray-600">Productos</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  href={section.actions[0].href}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center"
                >
                  {section.actions[0].label}
                </Link>
                <Link
                  href={section.actions[1].href}
                  className="flex-1 btn-primary text-sm py-2 px-3 flex items-center justify-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>{section.actions[1].label.split(" ")[1]}</span>
                </Link>
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
            href="/proveedor/parametrias/productos/categorias/nueva"
            className="p-4 border border-gray-200 rounded-lg hover:border-provender-primary hover:bg-provender-primary/5 transition-colors"
          >
            <Package className="w-8 h-8 text-blue-500 mb-2" />
            <p className="font-medium text-gray-900">Nueva Categoría</p>
            <p className="text-sm text-gray-600">Agregar categoría de producto</p>
          </Link>

          <Link
            href="/proveedor/parametrias/productos/marcas/nueva"
            className="p-4 border border-gray-200 rounded-lg hover:border-provender-primary hover:bg-provender-primary/5 transition-colors"
          >
            <Tag className="w-8 h-8 text-green-500 mb-2" />
            <p className="font-medium text-gray-900">Nueva Marca</p>
            <p className="text-sm text-gray-600">Registrar nueva marca</p>
          </Link>

          <Link
            href="/proveedor/parametrias/productos/subcategorias/nueva"
            className="p-4 border border-gray-200 rounded-lg hover:border-provender-primary hover:bg-provender-primary/5 transition-colors"
          >
            <Layers className="w-8 h-8 text-purple-500 mb-2" />
            <p className="font-medium text-gray-900">Nueva Subcategoría</p>
            <p className="text-sm text-gray-600">Crear subcategoría</p>
          </Link>

          <Link
            href="/proveedor/parametrias/productos/unidades-medida/nueva"
            className="p-4 border border-gray-200 rounded-lg hover:border-provender-primary hover:bg-provender-primary/5 transition-colors"
          >
            <Ruler className="w-8 h-8 text-orange-500 mb-2" />
            <p className="font-medium text-gray-900">Nueva Unidad</p>
            <p className="text-sm text-gray-600">Agregar unidad de medida</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
