"use client"

import { MapPin, Truck, User, AlertTriangle, Plus, BarChart3, TrendingUp, ArrowLeft } from "lucide-react"
import Link from "next/link"

const transporteSubsections = [
  {
    title: "Zonas",
    description: "Gestiona las zonas de entrega y cobertura",
    icon: MapPin,
    href: "/proveedor/parametrias/transporte/zonas",
    stats: { total: 8, activas: 7, entregas: 245 },
    color: "bg-blue-500",
    actions: [
      { label: "Ver todas", href: "/proveedor/parametrias/transporte/zonas" },
      { label: "Nueva zona", href: "/proveedor/parametrias/transporte/zonas/nueva" },
    ],
  },
  {
    title: "Transportistas",
    description: "Administra las empresas de transporte",
    icon: Truck,
    href: "/proveedor/parametrias/transporte/transportistas",
    stats: { total: 15, activas: 12, entregas: 189 },
    color: "bg-green-500",
    actions: [
      { label: "Ver todas", href: "/proveedor/parametrias/transporte/transportistas" },
      { label: "Nuevo transportista", href: "/proveedor/parametrias/transporte/transportistas/nuevo" },
    ],
  },
  {
    title: "Choferes",
    description: "Gestiona los choferes y conductores",
    icon: User,
    href: "/proveedor/parametrias/transporte/choferes",
    stats: { total: 23, activas: 18, entregas: 156 },
    color: "bg-purple-500",
    actions: [
      { label: "Ver todos", href: "/proveedor/parametrias/transporte/choferes" },
      { label: "Nuevo chofer", href: "/proveedor/parametrias/transporte/choferes/nuevo" },
    ],
  },
  {
    title: "Motivos de Rechazo",
    description: "Configura los motivos de rechazo de entregas",
    icon: AlertTriangle,
    href: "/proveedor/parametrias/transporte/motivos-rechazo",
    stats: { total: 12, activas: 10, usos: 34 },
    color: "bg-red-500",
    actions: [
      { label: "Ver todos", href: "/proveedor/parametrias/transporte/motivos-rechazo" },
      { label: "Nuevo motivo", href: "/proveedor/parametrias/transporte/motivos-rechazo/nuevo" },
    ],
  },
]

export default function TransporteParametriasPage() {
  const totalParametros = transporteSubsections.reduce((sum, section) => sum + section.stats.total, 0)
  const totalActivos = transporteSubsections.reduce((sum, section) => sum + section.stats.activas, 0)
  const totalEntregas = transporteSubsections.reduce((sum, section) => sum + section.stats.entregas, 0)

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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Parametrías de Transporte</h1>
          <p className="text-gray-600">Administra zonas, transportistas, choferes y motivos de rechazo</p>
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
            <Truck className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalEntregas}</p>
          <p className="text-sm text-gray-600">Entregas Realizadas</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{transporteSubsections.length}</p>
          <p className="text-sm text-gray-600">Secciones</p>
        </div>
      </div>

      {/* Subsecciones de Transporte */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {transporteSubsections.map((section) => {
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
                  <p className="text-xs text-gray-600">Activos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{section.stats.entregas || section.stats.usos}</p>
                  <p className="text-xs text-gray-600">
                    {section.title === "Motivos de Rechazo" ? "Usos" : "Entregas"}
                  </p>
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
            href="/proveedor/parametrias/transporte/zonas/nueva"
            className="p-4 border border-gray-200 rounded-lg hover:border-provender-primary hover:bg-provender-primary/5 transition-colors"
          >
            <MapPin className="w-8 h-8 text-blue-500 mb-2" />
            <p className="font-medium text-gray-900">Nueva Zona</p>
            <p className="text-sm text-gray-600">Agregar zona de entrega</p>
          </Link>

          <Link
            href="/proveedor/parametrias/transporte/transportistas/nuevo"
            className="p-4 border border-gray-200 rounded-lg hover:border-provender-primary hover:bg-provender-primary/5 transition-colors"
          >
            <Truck className="w-8 h-8 text-green-500 mb-2" />
            <p className="font-medium text-gray-900">Nuevo Transportista</p>
            <p className="text-sm text-gray-600">Registrar transportista</p>
          </Link>

          <Link
            href="/proveedor/parametrias/transporte/choferes/nuevo"
            className="p-4 border border-gray-200 rounded-lg hover:border-provender-primary hover:bg-provender-primary/5 transition-colors"
          >
            <User className="w-8 h-8 text-purple-500 mb-2" />
            <p className="font-medium text-gray-900">Nuevo Chofer</p>
            <p className="text-sm text-gray-600">Agregar chofer</p>
          </Link>

          <Link
            href="/proveedor/parametrias/transporte/motivos-rechazo/nuevo"
            className="p-4 border border-gray-200 rounded-lg hover:border-provender-primary hover:bg-provender-primary/5 transition-colors"
          >
            <AlertTriangle className="w-8 h-8 text-red-500 mb-2" />
            <p className="font-medium text-gray-900">Nuevo Motivo</p>
            <p className="text-sm text-gray-600">Agregar motivo de rechazo</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
