"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, Trash2, Truck, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

interface Transportista {
  id: string
  nombre: string
  empresa: string
  telefono: string
  email: string
  vehiculo: string
  patente: string
  zona: string
  isActive: boolean
  entregas: number
  rating: number
  createdAt: string
}

const mockTransportistas: Transportista[] = [
  {
    id: "1",
    nombre: "Carlos Mendez",
    empresa: "Transportes Rápidos SA",
    telefono: "+54 11 1234-5678",
    email: "carlos@transportes.com",
    vehiculo: "Camión",
    patente: "ABC123",
    zona: "Centro",
    isActive: true,
    entregas: 245,
    rating: 4.8,
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    nombre: "Ana Rodriguez",
    empresa: "Logística Norte",
    telefono: "+54 11 2345-6789",
    email: "ana@logisticanorte.com",
    vehiculo: "Furgón",
    patente: "DEF456",
    zona: "Norte",
    isActive: true,
    entregas: 189,
    rating: 4.6,
    createdAt: "2023-01-20",
  },
  {
    id: "3",
    nombre: "Miguel Torres",
    empresa: "Distribuciones Sur",
    telefono: "+54 11 3456-7890",
    email: "miguel@distrisur.com",
    vehiculo: "Camioneta",
    patente: "GHI789",
    zona: "Sur",
    isActive: true,
    entregas: 156,
    rating: 4.9,
    createdAt: "2023-02-01",
  },
  {
    id: "4",
    nombre: "Luis Gomez",
    empresa: "Express Oeste",
    telefono: "+54 11 4567-8901",
    email: "luis@expressoeste.com",
    vehiculo: "Camión",
    patente: "JKL012",
    zona: "Oeste",
    isActive: false,
    entregas: 98,
    rating: 4.2,
    createdAt: "2023-02-10",
  },
]

const zonas = ["Centro", "Norte", "Sur", "Este", "Oeste"]
const tiposVehiculo = ["Camión", "Furgón", "Camioneta", "Moto"]

export default function TransportistasPage() {
  const [transportistas, setTransportistas] = useState<Transportista[]>(mockTransportistas)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTransportista, setEditingTransportista] = useState<Transportista | null>(null)

  const totalEntregas = transportistas.reduce((sum, t) => sum + t.entregas, 0)
  const activeTransportistas = transportistas.filter((t) => t.isActive).length
  const averageRating = transportistas.reduce((sum, t) => sum + t.rating, 0) / transportistas.length

  const deleteTransportista = (id: string) => {
    if (confirm("¿Estás seguro de que querés eliminar este transportista?")) {
      setTransportistas(transportistas.filter((t) => t.id !== id))
    }
  }

  const toggleTransportistaStatus = (id: string) => {
    setTransportistas(transportistas.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t)))
  }

  const openModal = (transportista?: Transportista) => {
    if (transportista) {
      setEditingTransportista(transportista)
    } else {
      setEditingTransportista(null)
    }
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingTransportista(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const nombre = formData.get("nombre") as string
    const empresa = formData.get("empresa") as string
    const telefono = formData.get("telefono") as string
    const email = formData.get("email") as string
    const vehiculo = formData.get("vehiculo") as string
    const patente = formData.get("patente") as string
    const zona = formData.get("zona") as string

    if (!nombre.trim() || !telefono || !vehiculo || !zona) {
      alert("Todos los campos obligatorios deben completarse")
      return
    }

    if (editingTransportista) {
      // Actualizar transportista existente
      setTransportistas(
        transportistas.map((t) =>
          t.id === editingTransportista.id
            ? {
                ...t,
                nombre,
                empresa,
                telefono,
                email,
                vehiculo,
                patente,
                zona,
              }
            : t,
        ),
      )
      alert("Transportista actualizado correctamente")
    } else {
      // Crear nuevo transportista
      const newTransportista: Transportista = {
        id: `TRANS-${Date.now()}`,
        nombre,
        empresa,
        telefono,
        email,
        vehiculo,
        patente,
        zona,
        isActive: true,
        entregas: 0,
        rating: 5.0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setTransportistas([...transportistas, newTransportista])
      alert("Transportista creado correctamente")
    }

    closeModal()
  }

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
          <h1 className="text-2xl font-bold text-gray-900">Transportistas</h1>
          <p className="text-gray-600">Gestiona las empresas de transporte y sus conductores</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nuevo Transportista</span>
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Transportistas</p>
              <p className="text-2xl font-bold text-gray-900">{transportistas.length}</p>
            </div>
            <Truck className="w-8 h-8 text-provender-primary" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Activos</p>
              <p className="text-2xl font-bold text-green-600">{activeTransportistas}</p>
            </div>
            <Truck className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Entregas</p>
              <p className="text-2xl font-bold text-gray-900">{totalEntregas}</p>
            </div>
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rating Promedio</p>
              <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
            </div>
            <Truck className="w-8 h-8 text-provender-warm" />
          </div>
        </div>
      </div>

      {/* Transportistas List */}
      <div className="space-y-4">
        {transportistas.map((transportista) => (
          <div key={transportista.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{transportista.nombre}</h3>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      transportista.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transportista.isActive ? "Activo" : "Inactivo"}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{transportista.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{transportista.empresa}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {transportista.telefono}
                  </div>
                  {transportista.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {transportista.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleTransportistaStatus(transportista.id)}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    transportista.isActive
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {transportista.isActive ? "Desactivar" : "Activar"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <span className="text-xs text-gray-500">Vehículo</span>
                <p className="font-semibold text-gray-900">{transportista.vehiculo}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Patente</span>
                <p className="font-semibold text-gray-900">{transportista.patente}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Zona</span>
                <p className="font-semibold text-gray-900">{transportista.zona}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Entregas</span>
                <p className="font-semibold text-gray-900">{transportista.entregas}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Registrado el {new Date(transportista.createdAt).toLocaleDateString("es-AR")}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(transportista)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => deleteTransportista(transportista.id)}
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
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingTransportista ? "Editar Transportista" : "Nuevo Transportista"}
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    className="input-field"
                    placeholder="Ej: Carlos Mendez"
                    defaultValue={editingTransportista?.nombre || ""}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                  <input
                    type="text"
                    name="empresa"
                    className="input-field"
                    placeholder="Ej: Transportes Rápidos SA"
                    defaultValue={editingTransportista?.empresa || ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    name="telefono"
                    className="input-field"
                    placeholder="+54 11 1234-5678"
                    defaultValue={editingTransportista?.telefono || ""}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    placeholder="email@ejemplo.com"
                    defaultValue={editingTransportista?.email || ""}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehículo *</label>
                    <select
                      name="vehiculo"
                      className="input-field"
                      defaultValue={editingTransportista?.vehiculo || ""}
                      required
                    >
                      <option value="">Seleccionar</option>
                      {tiposVehiculo.map((tipo) => (
                        <option key={tipo} value={tipo}>
                          {tipo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patente</label>
                    <input
                      type="text"
                      name="patente"
                      className="input-field"
                      placeholder="ABC123"
                      defaultValue={editingTransportista?.patente || ""}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zona *</label>
                  <select name="zona" className="input-field" defaultValue={editingTransportista?.zona || ""} required>
                    <option value="">Seleccionar zona</option>
                    {zonas.map((zona) => (
                      <option key={zona} value={zona}>
                        {zona}
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
                    {editingTransportista ? "Actualizar" : "Crear"}
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
