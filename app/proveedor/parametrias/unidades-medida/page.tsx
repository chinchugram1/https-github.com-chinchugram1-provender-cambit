"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Package, BarChart3 } from "lucide-react"
import Link from "next/link"

interface UnidadMedida {
  id: string
  nombre: string
  abreviacion: string
  descripcion: string
  activa: boolean
  productosAsociados: number
  fechaCreacion: string
}

const mockUnidadesMedida: UnidadMedida[] = [
  {
    id: "1",
    nombre: "Unidades",
    abreviacion: "un",
    descripcion: "Productos individuales",
    activa: true,
    productosAsociados: 45,
    fechaCreacion: "2024-01-10",
  },
  {
    id: "2",
    nombre: "Pack",
    abreviacion: "pk",
    descripcion: "Paquetes o sets de productos",
    activa: true,
    productosAsociados: 23,
    fechaCreacion: "2024-01-10",
  },
  {
    id: "3",
    nombre: "Cajón",
    abreviacion: "cj",
    descripcion: "Cajas grandes para mayoristas",
    activa: true,
    productosAsociados: 12,
    fechaCreacion: "2024-01-10",
  },
  {
    id: "4",
    nombre: "Litros",
    abreviacion: "lt",
    descripcion: "Productos líquidos",
    activa: true,
    productosAsociados: 18,
    fechaCreacion: "2024-01-10",
  },
  {
    id: "5",
    nombre: "Kilogramos",
    abreviacion: "kg",
    descripcion: "Productos vendidos por peso",
    activa: true,
    productosAsociados: 8,
    fechaCreacion: "2024-01-10",
  },
  {
    id: "6",
    nombre: "Docena",
    abreviacion: "doc",
    descripcion: "Conjunto de 12 unidades",
    activa: false,
    productosAsociados: 0,
    fechaCreacion: "2024-01-15",
  },
]

export default function UnidadesMedidaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todas")

  const filteredUnidades = mockUnidadesMedida.filter((unidad) => {
    const matchesSearch =
      unidad.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unidad.abreviacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unidad.descripcion.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      filterStatus === "todas" ||
      (filterStatus === "activas" && unidad.activa) ||
      (filterStatus === "inactivas" && !unidad.activa)

    return matchesSearch && matchesStatus
  })

  const totalUnidades = mockUnidadesMedida.length
  const unidadesActivas = mockUnidadesMedida.filter((u) => u.activa).length
  const totalProductos = mockUnidadesMedida.reduce((sum, u) => sum + u.productosAsociados, 0)

  const handleDelete = (id: string) => {
    const unidad = mockUnidadesMedida.find((u) => u.id === id)
    if (unidad?.productosAsociados > 0) {
      alert(
        `No se puede eliminar la unidad "${unidad.nombre}" porque tiene ${unidad.productosAsociados} productos asociados.`,
      )
      return
    }

    if (confirm("¿Estás seguro de que deseas eliminar esta unidad de medida?")) {
      // Aquí iría la lógica de eliminación
      alert("Unidad de medida eliminada correctamente")
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Unidades de Medida</h1>
          <p className="text-gray-600">Gestiona las unidades de medida para tus productos</p>
        </div>
        <Link href="/proveedor/parametrias/unidades-medida/nueva" className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Nueva Unidad
        </Link>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-provender-primary rounded-lg flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalUnidades}</p>
          <p className="text-sm text-gray-600">Total Unidades</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{unidadesActivas}</p>
          <p className="text-sm text-gray-600">Unidades Activas</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalProductos}</p>
          <p className="text-sm text-gray-600">Productos Asociados</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar unidades de medida..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="todas">Todas las unidades</option>
            <option value="activas">Solo activas</option>
            <option value="inactivas">Solo inactivas</option>
          </select>
        </div>
      </div>

      {/* Lista de Unidades */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Unidad</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Abreviación</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Descripción</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Productos</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Estado</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnidades.map((unidad) => (
                <tr key={unidad.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{unidad.nombre}</div>
                    <div className="text-sm text-gray-500">
                      Creada: {new Date(unidad.fechaCreacion).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                      {unidad.abreviacion}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{unidad.descripcion}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                      {unidad.productosAsociados}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        unidad.activa ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {unidad.activa ? "Activa" : "Inactiva"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Link
                        href={`/proveedor/parametrias/unidades-medida/${unidad.id}/editar`}
                        className="p-2 text-gray-600 hover:text-provender-primary hover:bg-gray-100 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(unidad.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                        disabled={unidad.productosAsociados > 0}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUnidades.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron unidades</h3>
            <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  )
}
