"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SucursalForm {
  nombre: string
  direccion: string
  telefono: string
  horario: string
  zona: string
  responsable: string
  email: string
  activa: boolean
}

const initialForm: SucursalForm = {
  nombre: "",
  direccion: "",
  telefono: "",
  horario: "",
  zona: "",
  responsable: "",
  email: "",
  activa: true,
}

export default function NuevaSucursalPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<SucursalForm>(initialForm)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular guardado
    setTimeout(() => {
      setLoading(false)
      alert("Sucursal creada correctamente")
      router.push("/cliente/sucursales")
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/cliente/sucursales"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nueva Sucursal</h1>
          <p className="text-gray-600">Agrega una nueva sucursal a tu empresa</p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Sucursal *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="zona" className="block text-sm font-medium text-gray-700 mb-2">
                Zona *
              </label>
              <select
                id="zona"
                name="zona"
                value={formData.zona}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                required
              >
                <option value="">Seleccionar zona</option>
                <option value="Centro">Centro</option>
                <option value="Norte">Norte</option>
                <option value="Sur">Sur</option>
                <option value="Oeste">Oeste</option>
                <option value="Este">Este</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
                Dirección *
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="horario" className="block text-sm font-medium text-gray-700 mb-2">
                Horario de Atención *
              </label>
              <input
                type="text"
                id="horario"
                name="horario"
                value={formData.horario}
                onChange={handleChange}
                placeholder="Ej: 8:00 - 20:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="responsable" className="block text-sm font-medium text-gray-700 mb-2">
                Responsable *
              </label>
              <input
                type="text"
                id="responsable"
                name="responsable"
                value={formData.responsable}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-provender-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado</h3>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="activa"
              name="activa"
              checked={formData.activa}
              onChange={handleChange}
              className="w-4 h-4 text-provender-primary bg-gray-100 border-gray-300 rounded focus:ring-provender-primary focus:ring-2"
            />
            <label htmlFor="activa" className="ml-2 text-sm font-medium text-gray-700">
              Sucursal activa
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-1">Las sucursales inactivas no podrán realizar pedidos</p>
        </div>

        {/* Botones */}
        <div className="flex space-x-4">
          <Link
            href="/cliente/sucursales"
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center"
          >
            Cancelar
          </Link>
          <button type="submit" disabled={loading} className="flex-1 btn-primary flex items-center justify-center">
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Crear Sucursal
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
