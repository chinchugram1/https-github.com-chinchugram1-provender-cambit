"use client"

import { useState } from "react"
import { Building, MapPin, Phone, Clock, Plus, Eye, Edit, Users, Package, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Sucursal {
  id: string
  nombre: string
  direccion: string
  telefono: string
  horario: string
  zona: string
  activa: boolean
  pedidosMes: number
  totalGastado: number
  ultimoPedido: string
}

const mockSucursales: Sucursal[] = [
  {
    id: "SUC-001",
    nombre: "Sucursal Centro",
    direccion: "Av. Corrientes 1234, CABA",
    telefono: "+54 11 4567-8901",
    horario: "8:00 - 20:00",
    zona: "Centro",
    activa: true,
    pedidosMes: 12,
    totalGastado: 15420,
    ultimoPedido: "2024-01-18",
  },
  {
    id: "SUC-002",
    nombre: "Sucursal Norte",
    direccion: "Av. Cabildo 5678, CABA",
    telefono: "+54 11 4567-8902",
    horario: "9:00 - 19:00",
    zona: "Norte",
    activa: true,
    pedidosMes: 8,
    totalGastado: 9850,
    ultimoPedido: "2024-01-16",
  },
  {
    id: "SUC-003",
    nombre: "Sucursal Sur",
    direccion: "Av. Rivadavia 9012, CABA",
    telefono: "+54 11 4567-8903",
    horario: "8:30 - 19:30",
    zona: "Sur",
    activa: false,
    pedidosMes: 0,
    totalGastado: 0,
    ultimoPedido: "2024-01-10",
  },
]

export default function SucursalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterZona, setFilterZona] = useState("todas")

  const filteredSucursales = mockSucursales.filter((sucursal) => {
    const matchesSearch =
      sucursal.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sucursal.direccion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesZona = filterZona === "todas" || sucursal.zona.toLowerCase() === filterZona.toLowerCase()
    return matchesSearch && matchesZona
  })

  const totalSucursales = mockSucursales.length
  const sucursalesActivas = mockSucursales.filter((s) => s.activa).length
  const totalPedidosMes = mockSucursales.reduce((sum, s) => sum + s.pedidosMes, 0)
  const totalGastadoMes = mockSucursales.reduce((sum, s) => sum + s.totalGastado, 0)

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Gestión de Sucursales</h1>
        <p className="text-gray-600">Administra todas las sucursales de tu empresa</p>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="w-10 h-10 bg-provender-primary rounded-lg flex items-center justify-center mx-auto mb-2">
            <Building className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalSucursales}</p>
          <p className="text-sm text-gray-600">Total Sucursales</p>
        </div>

        <div className="card text-center">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Users className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{sucursalesActivas}</p>
          <p className="text-sm text-gray-600">Activas</p>
        </div>

        <div className="card text-center">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Package className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalPedidosMes}</p>
          <p className="text-sm text-gray-600">Pedidos este mes</p>
        </div>

        <div className="card text-center">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalGastadoMes.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total gastado</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar sucursales..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
          value={filterZona}
          onChange={(e) => setFilterZona(e.target.value)}
        >
          <option value="todas">Todas las zonas</option>
          <option value="centro">Centro</option>
          <option value="norte">Norte</option>
          <option value="sur">Sur</option>
          <option value="oeste">Oeste</option>
        </select>
      </div>

      {/* Lista de Sucursales */}
      <div className="space-y-4">
        {filteredSucursales.map((sucursal) => (
          <div key={sucursal.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    sucursal.activa ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  <Building className={`w-6 h-6 ${sucursal.activa ? "text-green-600" : "text-gray-400"}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{sucursal.nombre}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      sucursal.activa ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {sucursal.activa ? "Activa" : "Inactiva"}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/cliente/sucursales/${sucursal.id}`}
                  className="p-2 text-gray-600 hover:text-provender-primary hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </Link>
                <Link
                  href={`/cliente/sucursales/${sucursal.id}/editar`}
                  className="p-2 text-gray-600 hover:text-provender-primary hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{sucursal.direccion}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{sucursal.telefono}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{sucursal.horario}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Building className="w-4 h-4" />
                <span className="text-sm">Zona {sucursal.zona}</span>
              </div>
            </div>

            {/* Estadísticas de la sucursal */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{sucursal.pedidosMes}</p>
                <p className="text-xs text-gray-600">Pedidos este mes</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">${sucursal.totalGastado.toLocaleString()}</p>
                <p className="text-xs text-gray-600">Total gastado</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">
                  {new Date(sucursal.ultimoPedido).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-600">Último pedido</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSucursales.length === 0 && (
        <div className="text-center py-12">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron sucursales</h3>
          <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}

      {/* Botón flotante para agregar sucursal */}
      <Link
        href="/cliente/sucursales/nueva"
        className="fixed bottom-24 right-4 w-14 h-14 bg-provender-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-provender-accent transition-colors"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  )
}
