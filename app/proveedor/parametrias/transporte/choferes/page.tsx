"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, Trash2, User, Phone, Mail, Car, BadgeIcon as IdCard } from "lucide-react"
import Link from "next/link"

interface Chofer {
  id: string
  nombre: string
  apellido: string
  dni: string
  telefono: string
  email: string
  licencia: string
  vencimientoLicencia: string
  transportista: string
  vehiculoAsignado: string
  isActive: boolean
  entregas: number
  rating: number
  createdAt: string
}

const mockChoferes: Chofer[] = [
  {
    id: "1",
    nombre: "Juan",
    apellido: "Pérez",
    dni: "12345678",
    telefono: "+54 11 1111-1111",
    email: "juan.perez@email.com",
    licencia: "B1",
    vencimientoLicencia: "2025-06-15",
    transportista: "Transportes Rápidos SA",
    vehiculoAsignado: "Camión ABC123",
    isActive: true,
    entregas: 156,
    rating: 4.7,
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    nombre: "María",
    apellido: "González",
    dni: "23456789",
    telefono: "+54 11 2222-2222",
    email: "maria.gonzalez@email.com",
    licencia: "B2",
    vencimientoLicencia: "2024-12-20",
    transportista: "Logística Norte",
    vehiculoAsignado: "Furgón DEF456",
    isActive: true,
    entregas: 134,
    rating: 4.9,
    createdAt: "2023-01-20",
  },
  {
    id: "3",
    nombre: "Roberto",
    apellido: "Silva",
    dni: "34567890",
    telefono: "+54 11 3333-3333",
    email: "roberto.silva@email.com",
    licencia: "B1",
    vencimientoLicencia: "2024-08-10",
    transportista: "Distribuciones Sur",
    vehiculoAsignado: "Camioneta GHI789",
    isActive: false,
    entregas: 89,
    rating: 4.3,
    createdAt: "2023-02-01",
  },
]

const tiposLicencia = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"]
const transportistas = ["Transportes Rápidos SA", "Logística Norte", "Distribuciones Sur", "Express Oeste"]

export default function ChoferesPage() {
  const [choferes, setChoferes] = useState<Chofer[]>(mockChoferes)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingChofer, setEditingChofer] = useState<Chofer | null>(null)

  const totalEntregas = choferes.reduce((sum, c) => sum + c.entregas, 0)
  const activeChoferes = choferes.filter((c) => c.isActive).length
  const averageRating = choferes.reduce((sum, c) => sum + c.rating, 0) / choferes.length
  const licenciasVencidas = choferes.filter((c) => new Date(c.vencimientoLicencia) < new Date()).length

  const deleteChofer = (id: string) => {
    if (confirm("¿Estás seguro de que querés eliminar este chofer?")) {
      setChoferes(choferes.filter((c) => c.id !== id))
    }
  }

  const toggleChoferStatus = (id: string) => {
    setChoferes(choferes.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)))
  }

  const openModal = (chofer?: Chofer) => {
    if (chofer) {
      setEditingChofer(chofer)
    } else {
      setEditingChofer(null)
    }
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingChofer(null)
  }

  const isLicenseExpired = (vencimiento: string) => {
    return new Date(vencimiento) < new Date()
  }

  const isLicenseExpiringSoon = (vencimiento: string) => {
    const today = new Date()
    const expiry = new Date(vencimiento)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const nombre = formData.get("nombre") as string
    const apellido = formData.get("apellido") as string
    const dni = formData.get("dni") as string
    const telefono = formData.get("telefono") as string
    const email = formData.get("email") as string
    const licencia = formData.get("licencia") as string
    const vencimientoLicencia = formData.get("vencimientoLicencia") as string
    const transportista = formData.get("transportista") as string
    const vehiculoAsignado = formData.get("vehiculoAsignado") as string

    if (!nombre.trim() || !apellido.trim() || !dni || !telefono || !licencia || !vencimientoLicencia) {
      alert("Todos los campos obligatorios deben completarse")
      return
    }

    if (editingChofer) {
      // Actualizar chofer existente
      setChoferes(
        choferes.map((c) =>
          c.id === editingChofer.id
            ? {
                ...c,
                nombre,
                apellido,
                dni,
                telefono,
                email,
                licencia,
                vencimientoLicencia,
                transportista,
                vehiculoAsignado,
              }
            : c,
        ),
      )
      alert("Chofer actualizado correctamente")
    } else {
      // Crear nuevo chofer
      const newChofer: Chofer = {
        id: `CHOFER-${Date.now()}`,
        nombre,
        apellido,
        dni,
        telefono,
        email,
        licencia,
        vencimientoLicencia,
        transportista,
        vehiculoAsignado,
        isActive: true,
        entregas: 0,
        rating: 5.0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setChoferes([...choferes, newChofer])
      alert("Chofer creado correctamente")
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
          <h1 className="text-2xl font-bold text-gray-900">Choferes</h1>
          <p className="text-gray-600">Gestiona los conductores y sus licencias</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nuevo Chofer</span>
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Choferes</p>
              <p className="text-2xl font-bold text-gray-900">{choferes.length}</p>
            </div>
            <User className="w-8 h-8 text-provender-primary" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Activos</p>
              <p className="text-2xl font-bold text-green-600">{activeChoferes}</p>
            </div>
            <User className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Entregas</p>
              <p className="text-2xl font-bold text-gray-900">{totalEntregas}</p>
            </div>
            <Car className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Licencias Vencidas</p>
              <p className="text-2xl font-bold text-red-600">{licenciasVencidas}</p>
            </div>
            <IdCard className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Choferes List */}
      <div className="space-y-4">
        {choferes.map((chofer) => (
          <div key={chofer.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {chofer.nombre} {chofer.apellido}
                  </h3>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      chofer.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {chofer.isActive ? "Activo" : "Inactivo"}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{chofer.rating}</span>
                  </div>
                  {isLicenseExpired(chofer.vencimientoLicencia) && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Licencia Vencida</span>
                  )}
                  {isLicenseExpiringSoon(chofer.vencimientoLicencia) && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Vence Pronto</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <IdCard className="w-4 h-4" />
                    DNI: {chofer.dni}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {chofer.telefono}
                  </div>
                  {chofer.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {chofer.email}
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{chofer.transportista}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleChoferStatus(chofer.id)}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    chofer.isActive
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {chofer.isActive ? "Desactivar" : "Activar"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <span className="text-xs text-gray-500">Licencia</span>
                <p className="font-semibold text-gray-900">{chofer.licencia}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Vencimiento</span>
                <p
                  className={`font-semibold ${
                    isLicenseExpired(chofer.vencimientoLicencia)
                      ? "text-red-600"
                      : isLicenseExpiringSoon(chofer.vencimientoLicencia)
                        ? "text-yellow-600"
                        : "text-gray-900"
                  }`}
                >
                  {new Date(chofer.vencimientoLicencia).toLocaleDateString("es-AR")}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Vehículo</span>
                <p className="font-semibold text-gray-900">{chofer.vehiculoAsignado}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Entregas</span>
                <p className="font-semibold text-gray-900">{chofer.entregas}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Registrado el {new Date(chofer.createdAt).toLocaleDateString("es-AR")}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(chofer)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => deleteChofer(chofer.id)}
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
                {editingChofer ? "Editar Chofer" : "Nuevo Chofer"}
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      className="input-field"
                      placeholder="Juan"
                      defaultValue={editingChofer?.nombre || ""}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellido *</label>
                    <input
                      type="text"
                      name="apellido"
                      className="input-field"
                      placeholder="Pérez"
                      defaultValue={editingChofer?.apellido || ""}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">DNI *</label>
                  <input
                    type="text"
                    name="dni"
                    className="input-field"
                    placeholder="12345678"
                    defaultValue={editingChofer?.dni || ""}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    name="telefono"
                    className="input-field"
                    placeholder="+54 11 1111-1111"
                    defaultValue={editingChofer?.telefono || ""}
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
                    defaultValue={editingChofer?.email || ""}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Licencia *</label>
                    <select
                      name="licencia"
                      className="input-field"
                      defaultValue={editingChofer?.licencia || ""}
                      required
                    >
                      <option value="">Seleccionar</option>
                      {tiposLicencia.map((tipo) => (
                        <option key={tipo} value={tipo}>
                          {tipo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vencimiento *</label>
                    <input
                      type="date"
                      name="vencimientoLicencia"
                      className="input-field"
                      defaultValue={editingChofer?.vencimientoLicencia || ""}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transportista</label>
                  <select
                    name="transportista"
                    className="input-field"
                    defaultValue={editingChofer?.transportista || ""}
                  >
                    <option value="">Seleccionar transportista</option>
                    {transportistas.map((transportista) => (
                      <option key={transportista} value={transportista}>
                        {transportista}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehículo Asignado</label>
                  <input
                    type="text"
                    name="vehiculoAsignado"
                    className="input-field"
                    placeholder="Camión ABC123"
                    defaultValue={editingChofer?.vehiculoAsignado || ""}
                  />
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
                    {editingChofer ? "Actualizar" : "Crear"}
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
