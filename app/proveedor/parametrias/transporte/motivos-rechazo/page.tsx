"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, Trash2, AlertTriangle, BarChart3 } from "lucide-react"
import Link from "next/link"

interface MotivoRechazo {
  id: string
  nombre: string
  descripcion: string
  categoria: string
  isActive: boolean
  usos: number
  createdAt: string
}

const mockMotivosRechazo: MotivoRechazo[] = [
  {
    id: "1",
    nombre: "Cliente ausente",
    descripcion: "El cliente no se encuentra en el domicilio",
    categoria: "Cliente",
    isActive: true,
    usos: 45,
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    nombre: "Dirección incorrecta",
    descripcion: "La dirección proporcionada no existe o es incorrecta",
    categoria: "Dirección",
    isActive: true,
    usos: 23,
    createdAt: "2023-01-20",
  },
  {
    id: "3",
    nombre: "Falta de dinero",
    descripcion: "El cliente no tiene el dinero para pagar el pedido",
    categoria: "Pago",
    isActive: true,
    usos: 18,
    createdAt: "2023-02-01",
  },
  {
    id: "4",
    nombre: "Productos dañados",
    descripcion: "Los productos llegaron en mal estado",
    categoria: "Producto",
    isActive: true,
    usos: 12,
    createdAt: "2023-02-10",
  },
  {
    id: "5",
    nombre: "Horario inadecuado",
    descripcion: "El cliente no puede recibir en el horario de entrega",
    categoria: "Horario",
    isActive: true,
    usos: 34,
    createdAt: "2023-02-15",
  },
  {
    id: "6",
    nombre: "Pedido cancelado",
    descripcion: "El cliente decidió cancelar el pedido",
    categoria: "Cliente",
    isActive: false,
    usos: 8,
    createdAt: "2023-03-01",
  },
]

const categorias = ["Cliente", "Dirección", "Pago", "Producto", "Horario", "Transporte", "Otro"]

export default function MotivosRechazoPage() {
  const [motivos, setMotivos] = useState<MotivoRechazo[]>(mockMotivosRechazo)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingMotivo, setEditingMotivo] = useState<MotivoRechazo | null>(null)

  const totalUsos = motivos.reduce((sum, m) => sum + m.usos, 0)
  const activosMotivos = motivos.filter((m) => m.isActive).length
  const motivoMasUsado = motivos.reduce((max, motivo) => (motivo.usos > max.usos ? motivo : max), motivos[0])

  const deleteMotivo = (id: string) => {
    if (confirm("¿Estás seguro de que querés eliminar este motivo de rechazo?")) {
      setMotivos(motivos.filter((m) => m.id !== id))
    }
  }

  const toggleMotivoStatus = (id: string) => {
    setMotivos(motivos.map((m) => (m.id === id ? { ...m, isActive: !m.isActive } : m)))
  }

  const openModal = (motivo?: MotivoRechazo) => {
    if (motivo) {
      setEditingMotivo(motivo)
    } else {
      setEditingMotivo(null)
    }
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingMotivo(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const nombre = formData.get("nombre") as string
    const descripcion = formData.get("descripcion") as string
    const categoria = formData.get("categoria") as string

    if (!nombre.trim() || !categoria) {
      alert("Todos los campos obligatorios deben completarse")
      return
    }

    if (editingMotivo) {
      // Actualizar motivo existente
      setMotivos(
        motivos.map((m) =>
          m.id === editingMotivo.id
            ? {
                ...m,
                nombre,
                descripcion,
                categoria,
              }
            : m,
        ),
      )
      alert("Motivo de rechazo actualizado correctamente")
    } else {
      // Crear nuevo motivo
      const newMotivo: MotivoRechazo = {
        id: `MOTIVO-${Date.now()}`,
        nombre,
        descripcion,
        categoria,
        isActive: true,
        usos: 0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setMotivos([...motivos, newMotivo])
      alert("Motivo de rechazo creado correctamente")
    }

    closeModal()
  }

  // Agrupar por categoría para estadísticas
  const motivosPorCategoria = motivos.reduce(
    (acc, motivo) => {
      if (!acc[motivo.categoria]) {
        acc[motivo.categoria] = { count: 0, usos: 0 }
      }
      acc[motivo.categoria].count++
      acc[motivo.categoria].usos += motivo.usos
      return acc
    },
    {} as Record<string, { count: number; usos: number }>,
  )

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/proveedor/parametrias/transporte"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Motivos de Rechazo</h1>
          <p className="text-gray-600">Gestiona los motivos por los cuales se rechazan las entregas</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nuevo Motivo</span>
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Motivos</p>
              <p className="text-2xl font-bold text-gray-900">{motivos.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-provender-primary" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Activos</p>
              <p className="text-2xl font-bold text-green-600">{activosMotivos}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Usos</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsos}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Más Usado</p>
              <p className="text-lg font-bold text-gray-900">{motivoMasUsado?.nombre}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-provender-warm" />
          </div>
        </div>
      </div>

      {/* Estadísticas por Categoría */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas por Categoría</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(motivosPorCategoria).map(([categoria, stats]) => (
            <div key={categoria} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">{categoria}</h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Motivos: {stats.count}</span>
                <span className="text-gray-600">Usos: {stats.usos}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivos List */}
      <div className="space-y-4">
        {motivos.map((motivo) => (
          <div key={motivo.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{motivo.nombre}</h3>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      motivo.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {motivo.isActive ? "Activo" : "Inactivo"}
                  </span>
                  <span className="bg-provender-light/20 text-provender-primary text-xs px-2 py-1 rounded-full">
                    {motivo.categoria}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{motivo.descripcion}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleMotivoStatus(motivo.id)}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    motivo.isActive
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {motivo.isActive ? "Desactivar" : "Activar"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <span className="text-xs text-gray-500">Categoría</span>
                <p className="font-semibold text-gray-900">{motivo.categoria}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Veces Usado</span>
                <p className="font-semibold text-gray-900">{motivo.usos}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Estado</span>
                <p className={`font-semibold ${motivo.isActive ? "text-green-600" : "text-red-600"}`}>
                  {motivo.isActive ? "Activo" : "Inactivo"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Creado el {new Date(motivo.createdAt).toLocaleDateString("es-AR")}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(motivo)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => deleteMotivo(motivo.id)}
                  className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingMotivo ? "Editar Motivo de Rechazo" : "Nuevo Motivo de Rechazo"}
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    className="input-field"
                    placeholder="Ej: Cliente ausente"
                    defaultValue={editingMotivo?.nombre || ""}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    name="descripcion"
                    className="input-field resize-none"
                    rows={3}
                    placeholder="Describe el motivo de rechazo..."
                    defaultValue={editingMotivo?.descripcion || ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría *</label>
                  <select
                    name="categoria"
                    className="input-field"
                    defaultValue={editingMotivo?.categoria || ""}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    {editingMotivo ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
