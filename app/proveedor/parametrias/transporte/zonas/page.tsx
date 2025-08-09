"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, Trash2, MapPin, Package, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

interface Zone {
  id: string
  name: string
  description: string
  coverage: string[]
  deliveryTime: string
  cost: number
  isActive: boolean
  clientCount: number
  deliveryCount: number
  createdAt: string
}

const mockZones: Zone[] = [
  {
    id: "1",
    name: "Centro",
    description: "Zona céntrica de la ciudad",
    coverage: ["Microcentro", "San Nicolás", "Monserrat"],
    deliveryTime: "2-4 horas",
    cost: 500,
    isActive: true,
    clientCount: 25,
    deliveryCount: 145,
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Norte",
    description: "Zona norte de la ciudad",
    coverage: ["Belgrano", "Núñez", "Palermo"],
    deliveryTime: "4-6 horas",
    cost: 750,
    isActive: true,
    clientCount: 18,
    deliveryCount: 89,
    createdAt: "2023-01-20",
  },
  {
    id: "3",
    name: "Sur",
    description: "Zona sur de la ciudad",
    coverage: ["San Telmo", "Barracas", "La Boca"],
    deliveryTime: "3-5 horas",
    cost: 650,
    isActive: true,
    clientCount: 22,
    deliveryCount: 112,
    createdAt: "2023-02-01",
  },
  {
    id: "4",
    name: "Oeste",
    description: "Zona oeste de la ciudad",
    coverage: ["Caballito", "Flores", "Almagro"],
    deliveryTime: "4-6 horas",
    cost: 700,
    isActive: true,
    clientCount: 15,
    deliveryCount: 67,
    createdAt: "2023-02-10",
  },
  {
    id: "5",
    name: "Este",
    description: "Zona este de la ciudad",
    coverage: ["Puerto Madero", "Retiro"],
    deliveryTime: "2-3 horas",
    cost: 800,
    isActive: false,
    clientCount: 8,
    deliveryCount: 23,
    createdAt: "2023-03-01",
  },
]

export default function ZonasPage() {
  const [zones, setZones] = useState<Zone[]>(mockZones)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingZone, setEditingZone] = useState<Zone | null>(null)

  const totalClients = zones.reduce((sum, zone) => sum + zone.clientCount, 0)
  const totalDeliveries = zones.reduce((sum, zone) => sum + zone.deliveryCount, 0)
  const activeZones = zones.filter((zone) => zone.isActive).length
  const averageCost = Math.round(zones.reduce((sum, zone) => sum + zone.cost, 0) / zones.length)

  const deleteZone = (id: string) => {
    if (confirm("¿Estás seguro de que querés eliminar esta zona?")) {
      setZones(zones.filter((z) => z.id !== id))
    }
  }

  const toggleZoneStatus = (id: string) => {
    setZones(zones.map((zone) => (zone.id === id ? { ...zone, isActive: !zone.isActive } : zone)))
  }

  const openModal = (zone?: Zone) => {
    if (zone) {
      setEditingZone(zone)
    } else {
      setEditingZone(null)
    }
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingZone(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const nombre = formData.get("nombre") as string
    const descripcion = formData.get("descripcion") as string
    const tiempoEntrega = formData.get("tiempoEntrega") as string
    const costo = Number(formData.get("costo"))
    const cobertura = (formData.get("cobertura") as string)
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s)

    if (!nombre.trim() || !tiempoEntrega || !costo) {
      alert("Todos los campos obligatorios deben completarse")
      return
    }

    if (editingZone) {
      // Actualizar zona existente
      setZones(
        zones.map((zone) =>
          zone.id === editingZone.id
            ? {
                ...zone,
                name: nombre,
                description: descripcion,
                deliveryTime: tiempoEntrega,
                cost: costo,
                coverage: cobertura,
              }
            : zone,
        ),
      )
      alert("Zona actualizada correctamente")
    } else {
      // Crear nueva zona
      const newZone: Zone = {
        id: `ZONE-${Date.now()}`,
        name: nombre,
        description: descripcion,
        coverage: cobertura,
        deliveryTime: tiempoEntrega,
        cost: costo,
        isActive: true,
        clientCount: 0,
        deliveryCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setZones([...zones, newZone])
      alert("Zona creada correctamente")
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
          <h1 className="text-2xl font-bold text-gray-900">Zonas de Entrega</h1>
          <p className="text-gray-600">Gestiona las zonas de cobertura y entrega</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nueva Zona</span>
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Zonas</p>
              <p className="text-2xl font-bold text-gray-900">{zones.length}</p>
            </div>
            <MapPin className="w-8 h-8 text-provender-primary" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Zonas Activas</p>
              <p className="text-2xl font-bold text-green-600">{activeZones}</p>
            </div>
            <Package className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Clientes</p>
              <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Entregas Realizadas</p>
              <p className="text-2xl font-bold text-gray-900">{totalDeliveries}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-provender-warm" />
          </div>
        </div>
      </div>

      {/* Zones List */}
      <div className="space-y-4">
        {zones.map((zone) => (
          <div key={zone.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{zone.name}</h3>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      zone.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {zone.isActive ? "Activa" : "Inactiva"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{zone.description}</p>
                <div className="flex flex-wrap gap-1">
                  {zone.coverage.map((area) => (
                    <span
                      key={area}
                      className="bg-provender-light/20 text-provender-primary text-xs px-2 py-1 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleZoneStatus(zone.id)}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    zone.isActive
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {zone.isActive ? "Desactivar" : "Activar"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <span className="text-xs text-gray-500">Tiempo de Entrega</span>
                <p className="font-semibold text-gray-900">{zone.deliveryTime}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Costo de Envío</span>
                <p className="font-semibold text-gray-900">${zone.cost}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Clientes</span>
                <p className="font-semibold text-gray-900">{zone.clientCount}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Entregas</span>
                <p className="font-semibold text-gray-900">{zone.deliveryCount}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Creada el {new Date(zone.createdAt).toLocaleDateString("es-AR")}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(zone)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => deleteZone(zone.id)}
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">{editingZone ? "Editar Zona" : "Nueva Zona"}</h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    className="input-field"
                    placeholder="Ej: Centro"
                    defaultValue={editingZone?.name || ""}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    name="descripcion"
                    className="input-field resize-none"
                    rows={3}
                    placeholder="Describe la zona de cobertura..."
                    defaultValue={editingZone?.description || ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Áreas de Cobertura</label>
                  <input
                    type="text"
                    name="cobertura"
                    className="input-field"
                    placeholder="Ej: Microcentro, San Nicolás, Monserrat"
                    defaultValue={editingZone?.coverage.join(", ") || ""}
                  />
                  <p className="text-xs text-gray-500 mt-1">Separar con comas</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tiempo de Entrega *</label>
                    <input
                      type="text"
                      name="tiempoEntrega"
                      className="input-field"
                      placeholder="Ej: 2-4 horas"
                      defaultValue={editingZone?.deliveryTime || ""}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Costo de Envío *</label>
                    <input
                      type="number"
                      name="costo"
                      className="input-field"
                      placeholder="500"
                      defaultValue={editingZone?.cost || ""}
                      required
                    />
                  </div>
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
                    {editingZone ? "Actualizar" : "Crear"}
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
